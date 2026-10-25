import fs from 'node:fs';
import path from 'node:path';

const dist = path.resolve('dist');
if (!fs.existsSync(path.join(dist, 'index.html'))) {
  console.error('No production output found. Run `pnpm run build` first.');
  process.exit(1);
}

function htmlFiles(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = path.join(directory, entry.name);
    return entry.isDirectory() ? htmlFiles(entryPath) : entry.name.endsWith('.html') ? [entryPath] : [];
  });
}

function outputPath(urlPath) {
  const relativePath = decodeURIComponent(urlPath).replace(/^\/+/, '');
  const directPath = path.join(dist, relativePath);
  const candidates = path.extname(relativePath)
    ? [directPath]
    : [path.join(directPath, 'index.html'), `${directPath}.html`];
  return candidates.find((candidate) => fs.existsSync(candidate));
}

const failures = [];
const pages = htmlFiles(dist);
let checkedLinks = 0;

for (const page of pages) {
  const html = fs.readFileSync(page, 'utf8');
  const pagePath = `/${path.relative(dist, page).replaceAll(path.sep, '/')}`;
  const pageUrl = new URL(pagePath, 'https://site.test');
  const isRedirect = /<meta name="robots" content="noindex">/.test(html);
  const mainLandmarks = [...html.matchAll(/<main\b([^>]*)>/gi)];

  if (!isRedirect && (mainLandmarks.length !== 1 || !/\btabindex="-1"/.test(mainLandmarks[0]?.[1] ?? ''))) {
    failures.push(`${path.relative(dist, page)} (expected one focusable main landmark)`);
  }

  const ids = [...html.matchAll(/\sid=(["'])(.*?)\1/g)].map((match) => match[2]);
  if (new Set(ids).size !== ids.length) {
    failures.push(`${path.relative(dist, page)} (duplicate id attribute)`);
  }

  for (const [, attributes] of html.matchAll(/<img\b([^>]*)>/gi)) {
    if (!/\balt=(["'])/.test(attributes) || !/\bwidth=(["'])/.test(attributes) || !/\bheight=(["'])/.test(attributes)) {
      failures.push(`${path.relative(dist, page)} (image missing alt text or intrinsic dimensions)`);
      break;
    }
  }

  for (const [, attributes] of html.matchAll(/<input\b([^>]*)>/gi)) {
    const hasAriaLabel = /\baria-label=(["'])/.test(attributes) ||
      /\baria-labelledby=(["'])/.test(attributes);
    const id = attributes.match(/\bid=(["'])(.*?)\1/)?.[2];
    const hasLabel = id && new RegExp(`<label\\b[^>]*\\bfor=(["'])${id}\\1`).test(html);
    if (!hasAriaLabel && !hasLabel) {
      failures.push(`${path.relative(dist, page)} (input missing an accessible label)`);
    }
  }

  for (const [, attributes, body] of html.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/gi)) {
    const visibleText = body
      .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '')
      .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, '')
      .replace(/<[^>]+>/g, ' ')
      .replace(/&(?:nbsp|amp|lt|gt|quot|#39);/g, ' ')
      .trim();
    if (!visibleText && !/\baria-label=(["'])/.test(attributes)) {
      failures.push(`${path.relative(dist, page)} (link has no accessible name)`);
    }
  }

  for (const [, , rawHref] of html.matchAll(/\bhref=(["'])(.*?)\1/g)) {
    const href = rawHref.replaceAll('&amp;', '&');
    const target = new URL(href, pageUrl);
    if (target.origin !== pageUrl.origin) continue;

    checkedLinks += 1;
    const targetFile = outputPath(target.pathname);
    if (!targetFile) {
      failures.push(`${path.relative(dist, page)} -> ${href} (missing file)`);
      continue;
    }

    if (target.hash) {
      const targetHtml = fs.readFileSync(targetFile, 'utf8');
      const id = decodeURIComponent(target.hash.slice(1));
      const escapedId = id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      if (!new RegExp(`\\bid=(["'])${escapedId}\\1`).test(targetHtml)) {
        failures.push(`${path.relative(dist, page)} -> ${href} (missing anchor #${id})`);
      }
    }
  }
}

const requiredRoutes = [
  '/info/support',
  '/info/contact',
  '/info/about',
  '/blog/news',
  '/blog/guides',
  '/projects/releases',
  '/projects/help/documentations',
  '/projects/help/faqs',
  '/search',
  '/search-index.json',
];

for (const route of requiredRoutes) {
  if (!outputPath(route)) failures.push(`${route} (required route missing)`);
}

for (const legacyRoute of ['/about', '/contact']) {
  const redirectFile = outputPath(legacyRoute);
  if (!redirectFile || !fs.readFileSync(redirectFile, 'utf8').includes('/info/')) {
    failures.push(`${legacyRoute} (legacy redirect missing)`);
  }
}

if (failures.length) {
  console.error(`Route/link check failed (${failures.length} issue(s)):`);
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log(`Checked ${checkedLinks} local links across ${pages.length} generated pages.`);
console.log('All required routes, legacy redirects, and local link targets resolve.');
