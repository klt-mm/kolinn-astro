/* Contact form smoke test: validation + demo submit (jsdom). */
import { JSDOM } from 'jsdom';
import fs from 'fs';

const dom = new JSDOM(fs.readFileSync(process.argv[2], 'utf8'), {
  url: 'http://localhost/',
  runScripts: 'dangerously',
});
const { window } = dom;
const { document } = window;
window.matchMedia = (q) => ({ media: q, matches: false, addEventListener() {}, removeEventListener() {} });
window.ResizeObserver = class { observe() {} unobserve() {} disconnect() {} };
for (const s of document.querySelectorAll('script[type="module"]')) window.eval(s.textContent);

let pass = 0, fail = 0;
const check = (name, cond) => { cond ? (pass++, console.log(`  ✔ ${name}`)) : (fail++, console.log(`  ✘ ${name}`)); };
const $ = (s) => document.querySelector(s);
const form = $('#contactForm');
const status = $('#formStatus');
const setVal = (id, v) => { const el = document.getElementById(id); el.value = v; el.dispatchEvent(new window.Event('input', { bubbles: true })); };

console.log('[contact form] empty submit → invalid states');
form.dispatchEvent(new window.SubmitEvent('submit', { bubbles: true, cancelable: true }));
check('3 required fields flagged', document.querySelectorAll('.field[data-invalid="true"]').length === 3);
check('error status line', status.textContent.includes('3 field(s)') && status.getAttribute('data-error') === 'true');
check('aria-invalid set', $('#cf-name').getAttribute('aria-invalid') === 'true');
check('focus moved to first invalid', document.activeElement === $('#cf-name'));

console.log('[contact form] invalid email');
setVal('cf-name', 'Ada Lovelace');
setVal('cf-message', 'Hello from the analytical engine.');
setVal('cf-email', 'not-an-email');
form.dispatchEvent(new window.SubmitEvent('submit', { bubbles: true, cancelable: true }));
check('only email flagged', document.querySelectorAll('.field[data-invalid="true"]').length === 1 && $('#cf-email').closest('.field').hasAttribute('data-invalid'));

console.log('[contact form] typing clears invalid on input');
setVal('cf-email', 'ada@example.com');
check('email field cleared', !$('#cf-email').closest('.field').hasAttribute('data-invalid'));

console.log('[contact form] valid submit → queued + reset');
form.dispatchEvent(new window.SubmitEvent('submit', { bubbles: true, cancelable: true }));
check('success status', status.textContent.includes('message queued') && !status.hasAttribute('data-error'));
check('form reset', $('#cf-name').value === '' && $('#cf-message').value === '');
check('no invalid fields remain', document.querySelectorAll('.field[data-invalid="true"]').length === 0);

console.log(`\nRESULT: ${pass} passed, ${fail} failed ${fail === 0 ? '✔' : '✘'}`);
process.exit(fail ? 1 : 0);
