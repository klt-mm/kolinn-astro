/* CSS parity harness: original style.css vs Astro-bundled dist CSS.
   Checks: every selector survives, every --kds-* custom property is
   defined, every @keyframes name is present, and declaration counts
   are in the same ballpark.
   Usage: node verify/css-diff.js <original.css> <dist-dir/_astro> */
const fs = require('fs');
const path = require('path');

const strip = (css) => css.replace(/\/\*[\s\S]*?\*\//g, '');
// normalize for minifier rewrites: quote-stripping in attr selectors, ::pseudo → :pseudo
const norm = (s) =>
  s
    .replace(/\s*,\s*/g, ',')
    .replace(/\s+/g, ' ')
    .replace(/\[([\w-]+)=["']?([\w-]+)["']?\]/g, '[$1=$2]')
    .replace(/::(before|after|first-line|first-letter)/g, ':$1')
    .replace(/\s*([+>~])\s*/g, '$1')
    .trim();

function parseRules(css) {
  // walk chars, collect selector->{decls} pairs at any depth, skip @-rule prelude blocks
  const rules = [];
  const keyframes = new Set();
  let i = 0;
  const stack = [];
  let buf = '';
  while (i < css.length) {
    const c = css[i];
    if (c === '{') {
      const header = norm(buf);
      buf = '';
      if (/^@keyframes\s+([\w-]+)/.test(header)) {
        keyframes.add(RegExp.$1);
        stack.push('keyframes');
      } else if (header.startsWith('@')) {
        stack.push('at');
      } else if (stack[stack.length - 1] === 'keyframes') {
        stack.push('stop'); // 50%, from, to...
      } else {
        stack.push('rule:' + header);
      }
    } else if (c === '}') {
      const top = stack.pop();
      if (top && top.startsWith('rule:')) {
        rules.push({ selector: top.slice(5), body: norm(buf) });
      }
      buf = '';
    } else {
      buf += c;
    }
    i++;
  }
  return { rules, keyframes };
}

const origCss = strip(fs.readFileSync(process.argv[2], 'utf8'));
const distDir = process.argv[3];
const cssFiles = fs.readdirSync(distDir).filter((f) => f.endsWith('.css'));
const builtCss = cssFiles.map((f) => strip(fs.readFileSync(path.join(distDir, f), 'utf8'))).join('\n');
console.log(`dist css files: ${cssFiles.join(', ')} (${(builtCss.length / 1024).toFixed(1)} KB)`);

const O = parseRules(origCss);
const B = parseRules(builtCss);
const builtNorm = norm(builtCss);

// 1. selectors
const missingSel = [];
for (const r of O.rules) {
  // keyframe stops are normalized away by minifiers (from→0%); skip bare stops
  if (/^(from|to|\d+%)$/.test(r.selector)) continue;
  if (!builtNorm.includes(norm(r.selector))) missingSel.push(r.selector);
}
console.log(`selectors: ${O.rules.length} original rules → ${missingSel.length} missing in build`);
missingSel.slice(0, 20).forEach((s) => console.log(`  MISSING: ${s}`));

// 2. custom properties
const propsOf = (css) => [...css.matchAll(/(--[\w-]+)\s*:/g)].map((m) => m[1]);
const oProps = new Set(propsOf(origCss));
const bProps = new Set(propsOf(builtCss));
const missingProps = [...oProps].filter((p) => !bProps.has(p));
console.log(`custom props: ${oProps.size} defined in original → missing in build: ${missingProps.length ? missingProps.join(', ') : 'none ✔'}`);

// 3. keyframes
const missingKf = [...O.keyframes].filter((k) => !B.keyframes.has(k) && !builtNorm.includes(k));
console.log(`keyframes: ${[...O.keyframes].join(', ')} → missing: ${missingKf.length ? missingKf.join(', ') : 'none ✔'}`);

// 4. declaration volume (sanity)
const declCount = (css) => (css.match(/[;{}]/g) || []).length;
console.log(`decl-ish chars — original: ${declCount(origCss)}  built (incl. fonts): ${declCount(builtCss)}`);

// 5. spot-check theme-critical rules exist verbatim-ish
const spotChecks = [
  '[data-theme="dark"]',
  ':root:not([data-theme="light"])',
  '[data-theme="auto"] .icon-auto,[data-theme="light"] .icon-sun,[data-theme="dark"] .icon-moon',
  '.global-nav.is-open .mega-menu-container',
  '.mobile-accordion-header[aria-expanded="true"] + .mobile-accordion-content',
  '.hamburger[aria-expanded="true"] .hamburger-line:nth-child(1)',
  '.mega-panel.is-active li:nth-child(8),.mobile-accordion-inner.is-animating li:nth-child(8)',
];
for (const s of spotChecks) {
  console.log(`spot: ${builtNorm.includes(norm(s)) ? '✔' : '✘'} ${s}`);
}

console.log(missingSel.length === 0 && missingProps.length === 0 && missingKf.length === 0 ? '\nCSS: FULL PARITY ✔' : '\nCSS: DIFFERENCES FOUND ✘');
