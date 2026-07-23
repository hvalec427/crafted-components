#!/usr/bin/env node
import * as p from '@clack/prompts';
import { readdirSync, readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function getSnippets() {
  return readdirSync(__dirname, { withFileTypes: true })
    .filter((e) => e.isDirectory())
    .map((e) => e.name);
}

async function main() {
  p.intro('Crafted Components — copy a snippet');

  const snippets = getSnippets();

  if (snippets.length === 0) {
    p.outro('No snippets found.');
    process.exit(0);
  }

  const snippet = await p.select({
    message: 'Which snippet?',
    options: snippets.map((s) => ({ value: s, label: s })),
  });

  if (p.isCancel(snippet)) {
    p.cancel('Cancelled.');
    process.exit(0);
  }

  const destination = await p.text({
    message: 'Copy to (directory or full file path):',
    placeholder: './src/components/',
    defaultValue: './src/components/',
  });

  if (p.isCancel(destination)) {
    p.cancel('Cancelled.');
    process.exit(0);
  }

  const rename = await p.text({
    message: `Rename component? (leave blank to keep "${snippet}")`,
    placeholder: snippet,
  });

  if (p.isCancel(rename)) {
    p.cancel('Cancelled.');
    process.exit(0);
  }

  const newName = rename.trim() || snippet;
  const srcFile = join(__dirname, snippet, `${snippet}.tsx`);
  const dest = resolve(destination.trim());
  const destFile = dest.endsWith('.tsx') ? dest : join(dest, `${newName}.tsx`);

  let content = readFileSync(srcFile, 'utf8');

  if (newName !== snippet) {
    content = content.replaceAll(snippet, newName);
  }

  if (!existsSync(dirname(destFile))) {
    mkdirSync(dirname(destFile), { recursive: true });
  }

  writeFileSync(destFile, content, 'utf8');

  p.outro(`Copied to ${destFile}${newName !== snippet ? ` as "${newName}"` : ''}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
