import { createHash } from 'node:crypto';
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const outputDirectory = fileURLToPath(new URL('../dist/', import.meta.url));
const headersPath = fileURLToPath(new URL('../dist/_headers', import.meta.url));
const hashSources = {
  scripts: new Set(),
  styles: new Set(),
  styleAttributes: new Set(),
};
const htmlFiles = [];

async function collectHtmlFiles(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) {
      await collectHtmlFiles(path);
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      htmlFiles.push(path);
    }
  }
}

function addHashes(html, tagName, destination) {
  const tagPattern = new RegExp(`<${tagName}\\b([^>]*)>([\\s\\S]*?)<\\/${tagName}>`, 'gi');

  for (const [, attributes, content] of html.matchAll(tagPattern)) {
    if (tagName === 'script' && /\bsrc\s*=/.test(attributes)) continue;

    const digest = createHash('sha256').update(content).digest('base64');
    destination.add(`'sha256-${digest}'`);
  }
}

function addStyleAttributeHashes(html, path) {
  for (const [tag] of html.matchAll(/<[a-z][^>]*>/gi)) {
    if (!/\sstyle\s*=/i.test(tag)) continue;

    const match = tag.match(/\sstyle\s*=\s*(?:"([^"]*)"|'([^']*)')/i);
    if (!match) {
      throw new Error(`Unquoted style attributes are disallowed by CSP: ${path}`);
    }

    const content = match[1] ?? match[2];
    const digest = createHash('sha256').update(content).digest('base64');
    hashSources.styleAttributes.add(`'sha256-${digest}'`);
  }
}

await collectHtmlFiles(outputDirectory);
if (htmlFiles.length === 0) {
  throw new Error('No generated HTML files found in dist/.');
}

for (const path of htmlFiles) {
  const html = await readFile(path, 'utf8');
  if (/<[a-z][^>]*\son[a-z]+\s*=/i.test(html)) {
    throw new Error(`Inline event-handler attributes are disallowed by CSP: ${path}`);
  }
  addHashes(html, 'script', hashSources.scripts);
  addHashes(html, 'style', hashSources.styles);
  addStyleAttributeHashes(html, path);
}

let headers = await readFile(headersPath, 'utf8');
for (const [placeholder, hashes] of [
  ['__CSP_SCRIPT_HASHES__', hashSources.scripts],
  ['__CSP_STYLE_HASHES__', hashSources.styles],
  ['__CSP_STYLE_ATTR_HASHES__', hashSources.styleAttributes],
]) {
  if (!headers.includes(placeholder)) {
    throw new Error(`Missing ${placeholder} placeholder in dist/_headers.`);
  }
  headers = headers.replace(placeholder, [...hashes].sort().join(' '));
}

await writeFile(headersPath, headers);
console.log(
  `Generated CSP hashes for ${hashSources.scripts.size} inline scripts and ` +
    `${hashSources.styles.size} style blocks and ${hashSources.styleAttributes.size} ` +
    `style attributes across ${htmlFiles.length} pages.`
);
