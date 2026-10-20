/* DOM parity harness: original index.html vs Astro build output.
   Serializes both bodies to normalized outline lines and diffs them.
   Skips script/style/link (the build moves those to <head>).
   Usage: NODE_PATH=/tmp/verify/node_modules node verify/dom-diff.js <original.html> <built.html> */
const { JSDOM } = require('jsdom');
const fs = require('fs');

const SKIP = new Set(['SCRIPT', 'STYLE', 'LINK', 'TEMPLATE']);
const BOOL_ATTRS = new Set(['inert', 'hidden', 'disabled']);

function serialize(node, depth, out) {
  for (const child of node.childNodes) {
    if (child.nodeType === 3) {
      const text = child.textContent.replace(/\s+/g, ' ').trim();
      if (text) out.push(`${'  '.repeat(depth)}#text "${text}"`);
      continue;
    }
    if (child.nodeType !== 1) continue;
    if (SKIP.has(child.tagName)) continue;
    const attrs = [...child.attributes]
      .map((a) => {
        let v = a.value;
        if (a.name === 'class') v = v.split(/\s+/).filter(Boolean).sort().join(' ');
        if (BOOL_ATTRS.has(a.name)) v = '';
        return `${a.name}="${v}"`;
      })
      .sort()
      .join(' ');
    out.push(`${'  '.repeat(depth)}<${child.tagName.toLowerCase()}${attrs ? ' ' + attrs : ''}>`);
    serialize(child, depth + 1, out);
  }
  return out;
}

function bodyLines(file) {
  const dom = new JSDOM(fs.readFileSync(file, 'utf8'));
  const doc = dom.window.document;
  const htmlAttrs = [...doc.documentElement.attributes].map((a) => `${a.name}="${a.value}"`).sort();
  return { lines: serialize(doc.body, 0, []), htmlAttrs, doc };
}

const A = bodyLines(process.argv[2]);
const B = bodyLines(process.argv[3]);

console.log(`html attrs  original: ${A.htmlAttrs.join(' ')}`);
console.log(`html attrs  built   : ${B.htmlAttrs.join(' ')}`);
console.log(`body nodes  original: ${A.lines.length}  built: ${B.lines.length}`);

// line diff with small resync window (trees expected identical)
let diffs = 0;
for (let i = 0, j = 0; i < A.lines.length || j < B.lines.length;) {
  const a = A.lines[i], b = B.lines[j];
  if (a === b) { i++; j++; continue; }
  diffs++;
  if (diffs <= 25) {
    console.log(`--- DIFF @orig:${i} built:${j}`);
    console.log(`  original: ${a ?? '<EOF>'}`);
    console.log(`  built   : ${b ?? '<EOF>'}`);
  }
  let resynced = false;
  for (let k = 1; k <= 6 && !resynced; k++) {
    if (A.lines[i + k] === b) { for (let m = 0; m < k; m++) console.log(`  orig-only: ${A.lines[i + m]}`); i += k; resynced = true; }
    else if (a === B.lines[j + k]) { for (let m = 0; m < k; m++) console.log(`  built-only: ${B.lines[j + m]}`); j += k; resynced = true; }
  }
  if (!resynced) { i++; j++; }
}
console.log(diffs === 0 ? '\nBODY DOM: IDENTICAL ✔' : `\nBODY DOM: ${diffs} diff region(s) ✘`);

// behavior surface: ids + data-targets the scripts depend on
const requiredIds = ['globalNav','megaMenuContainer','themeToggle','mobileMenuToggle','mobileMenu','mobileMenuContent','desktopSearchInput','mobileSearchInput','main','menuCurtain','nav-status','skip-link','panel-overview','panel-components','panel-patterns','panel-documentation','panel-search','hero-title','featured-title'];
const missing = requiredIds.filter((id) => !B.doc.getElementById(id));
console.log(`required ids present: ${requiredIds.length - missing.length}/${requiredIds.length}${missing.length ? ' — MISSING: ' + missing.join(', ') : ' ✔'}`);
const targets = [...B.doc.querySelectorAll('[data-target]')].map((el) => el.getAttribute('data-target'));
console.log(`data-target triggers: ${targets.join(', ')}`);
const ariaIssues = [...B.doc.querySelectorAll('[data-target]')].filter((el) => el.getAttribute('aria-expanded') !== 'false' || el.getAttribute('aria-controls') !== el.getAttribute('data-target'));
console.log(`trigger aria wiring: ${ariaIssues.length === 0 ? 'OK ✔' : 'BROKEN ✘ ' + ariaIssues.length}`);
const inertEls = [...B.doc.querySelectorAll('[inert]')].map((el) => el.id);
console.log(`inert at rest: ${inertEls.join(', ')}`);
