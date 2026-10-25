/* Runtime behavior smoke test for the Astro build.
   Loads dist/index.html in jsdom, stubs matchMedia/ResizeObserver,
   executes the bundled module scripts (as classic scripts — they have
   no imports), then simulates the original script.js interactions.
   Usage: NODE_PATH=/tmp/verify/node_modules node verify/smoke.js <dist/index.html> */
import { JSDOM } from 'jsdom';
import fs from 'fs';

const html = fs.readFileSync(process.argv[2], 'utf8');
const dom = new JSDOM(html, { url: 'http://localhost/', runScripts: 'dangerously' });
const { window } = dom;
const { document } = window;

/* --- environment stubs (must exist before scripts run) --- */
const mq = { desktop: true, hover: true };
window.matchMedia = (query) => ({
  media: query,
  get matches() {
    if (query.includes('min-width: 769px')) return mq.desktop;
    if (query.includes('hover')) return mq.hover;
    return false;
  },
  addEventListener() {}, removeEventListener() {},
  addListener() {}, removeListener() {},
});
window.ResizeObserver = class { observe() {} unobserve() {} disconnect() {} };

/* --- execute bundled behavior modules --- */
const modules = [...document.querySelectorAll('script[type="module"]')];
for (const s of modules) window.eval(s.textContent);

/* --- helpers --- */
let pass = 0, fail = 0;
const check = (name, cond) => {
  if (cond) { pass++; console.log(`  ✔ ${name}`); }
  else { fail++; console.log(`  ✘ ${name}`); }
};
const $ = (sel) => document.querySelector(sel);
const click = (el) => el.dispatchEvent(new window.MouseEvent('click', { bubbles: true }));
const mouse = (el, type) => el.dispatchEvent(new window.MouseEvent(type, { bubbles: type !== 'mouseenter' && type !== 'mouseleave' }));
const key = (k) => document.dispatchEvent(new window.KeyboardEvent('keydown', { key: k, bubbles: true }));
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const nav = $('#globalNav');
const mega = $('#megaMenuContainer');
const curtain = $('#menuCurtain');
const trigger = (id) => $(`[data-target="${id}"]`);
const panel = (id) => document.getElementById(id);

(async () => {
  console.log(`modules executed: ${modules.length}`);

  console.log('\n[1] rest state');
  check('mega container inert + aria-hidden', mega.hasAttribute('inert') && mega.getAttribute('aria-hidden') === 'true');
  check('no panel active', !$('.mega-panel.is-active'));
  check('curtain hidden', !curtain.classList.contains('is-visible'));

  console.log('\n[2] click activation (Overview)');
  click(trigger('panel-overview'));
  check('panel-overview is-active', panel('panel-overview').classList.contains('is-active'));
  check('trigger aria-expanded=true', trigger('panel-overview').getAttribute('aria-expanded') === 'true');
  check('trigger is-active class', trigger('panel-overview').classList.contains('is-active'));
  check('nav is-open + curtain visible', nav.classList.contains('is-open') && curtain.classList.contains('is-visible'));
  // jsdom 29 doesn't reflect the `inert` IDL attribute (browsers do); assert the property the script drives
  check('container exposed (inert=false prop, aria-hidden=false)', mega.inert === false && mega.getAttribute('aria-hidden') === 'false');
  check('flyout height written', mega.style.height !== '');

  console.log('\n[3] hover intent switches panel (Components)');
  mouse(trigger('panel-components'), 'mouseenter');
  await sleep(150);
  check('panel-components active', panel('panel-components').classList.contains('is-active'));
  check('overview deactivated', !panel('panel-overview').classList.contains('is-active'));
  check('only one trigger expanded', document.querySelectorAll('[data-target][aria-expanded="true"]').length === 1);

  console.log('\n[4] search is click-only');
  mouse(trigger('panel-search'), 'mouseenter');
  await sleep(150);
  check('hover did NOT open search', !panel('panel-search').classList.contains('is-active'));
  click(trigger('panel-search'));
  check('click opened search', panel('panel-search').classList.contains('is-active'));
  click(trigger('panel-search'));
  check('second click toggled closed', !nav.classList.contains('is-open') && !$('.mega-panel.is-active'));

  console.log('\n[5] Escape restores focus');
  click(trigger('panel-patterns'));
  key('Escape');
  check('menu closed on Escape', !nav.classList.contains('is-open') && mega.style.height === '0px');
  check('focus restored to source trigger', document.activeElement === trigger('panel-patterns'));
  check('triggers reset', document.querySelectorAll('[data-target][aria-expanded="true"]').length === 0);

  console.log('\n[6] mouseleave grace + outside click + scroll close');
  click(trigger('panel-overview'));
  mouse(nav, 'mouseleave');
  await sleep(320);
  check('closed after grace period', !nav.classList.contains('is-open'));
  click(trigger('panel-overview'));
  click($('#main'));
  check('outside click closes', !nav.classList.contains('is-open'));
  click(trigger('panel-overview'));
  window.dispatchEvent(new window.Event('scroll'));
  check('scroll closes', !nav.classList.contains('is-open'));

  console.log('\n[7] theme cycle auto → light → dark → auto');
  const t = $('#themeToggle');
  check('boot theme = auto', document.documentElement.getAttribute('data-theme') === 'auto');
  check('boot aria-label', t.getAttribute('aria-label') === 'Switch to light theme');
  click(t);
  check('→ light', document.documentElement.getAttribute('data-theme') === 'light' && t.getAttribute('aria-label') === 'Switch to dark theme');
  click(t);
  check('→ dark', document.documentElement.getAttribute('data-theme') === 'dark' && t.getAttribute('aria-label') === 'Use system theme');
  click(t);
  check('→ auto + persisted', document.documentElement.getAttribute('data-theme') === 'auto' && window.localStorage.getItem('theme') === 'auto');

  console.log('\n[8] mobile sheet (breakpoint flip)');
  mq.desktop = false;
  const burger = $('#mobileMenuToggle');
  const sheet = $('#mobileMenu');
  const content = $('#mobileMenuContent');
  click(burger);
  check('sheet open (is-open, aria)', sheet.classList.contains('is-open') && sheet.getAttribute('aria-hidden') === 'false');
  check('burger morph state', burger.getAttribute('aria-expanded') === 'true' && burger.getAttribute('aria-label') === 'Close menu');
  check('background inert (main + footer)', $('#main').inert === true && $('.site-footer').inert === true);
  check('body scroll locked', document.body.style.overflow === 'hidden' && document.body.style.paddingRight !== '');

  console.log('\n[9] accordion single-open + stagger class');
  const headers = [...document.querySelectorAll('.mobile-accordion-header')];
  click(headers[0]);
  check('first open', headers[0].getAttribute('aria-expanded') === 'true');
  check('is-animating on inner', headers[0].nextElementSibling.querySelector('.mobile-accordion-inner').classList.contains('is-animating'));
  click(headers[1]);
  check('single-open enforced', headers[0].getAttribute('aria-expanded') === 'false' && headers[1].getAttribute('aria-expanded') === 'true');
  check('stagger class moved', !headers[0].nextElementSibling.querySelector('.mobile-accordion-inner').classList.contains('is-animating') && headers[1].nextElementSibling.querySelector('.mobile-accordion-inner').classList.contains('is-animating'));
  click(headers[1]);
  check('toggle closed', headers[1].getAttribute('aria-expanded') === 'false');

  console.log('\n[10] link click dismisses + Escape closes sheet');
  click(burger); // reopen sheet
  click(headers[0]); // open an accordion so the link is realistically reachable
  const firstLink = content.querySelector('.mobile-accordion-inner a');
  click(firstLink);
  check('sheet closed after link click', !sheet.classList.contains('is-open') && document.body.style.overflow === '');
  check('focus back on burger', document.activeElement === burger);
  click(burger);
  key('Escape');
  check('Escape closes sheet', !sheet.classList.contains('is-open') && document.activeElement === burger);
  check('sheet inert at rest', sheet.inert === true && sheet.getAttribute('aria-hidden') === 'true');

  console.log(`\nRESULT: ${pass} passed, ${fail} failed ${fail === 0 ? '— ALL BEHAVIORS INTACT ✔' : '✘'}`);
  process.exit(fail === 0 ? 0 : 1);
})();
