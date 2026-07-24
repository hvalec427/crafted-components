#!/usr/bin/env node
import * as p from '@clack/prompts';
import { readdirSync, readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname, resolve } from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function getSnippets() {
  return readdirSync(__dirname, { withFileTypes: true })
    .filter((e) => e.isDirectory())
    .map((e) => e.name);
}

async function promptSnippetConfig(configPath) {
  const { default: fields } = await import(pathToFileURL(configPath).href);
  const values = {};

  for (const field of fields) {
    let answer;

    if (field.type === 'select') {
      answer = await p.select({
        message: field.message,
        options: field.options.map((o) => ({
          value: o,
          label: o,
          hint: o === field.default ? 'default' : undefined,
        })),
        initialValue: field.default,
      });
    } else {
      answer = await p.text({
        message: field.message,
        defaultValue: String(field.default),
        placeholder: String(field.default),
      });
    }

    if (p.isCancel(answer)) {
      p.cancel('Cancelled.');
      process.exit(0);
    }

    values[field.key] = { value: answer || String(field.default), type: field.type, default: field.default };
  }

  return values;
}

function applyConfig(content, configValues) {
  let result = content;
  for (const [key, { value, type, default: def }] of Object.entries(configValues)) {
    if (type === 'number') {
      result = result.replace(`${key}: ${def}`, `${key}: ${value}`);
    } else {
      result = result.replace(`${key}: '${def}'`, `${key}: '${value}'`);
    }
  }
  return result;
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

  const configPath = join(__dirname, snippet, 'config.mjs');
  let configValues = {};
  if (existsSync(configPath)) {
    configValues = await promptSnippetConfig(configPath);
  }

  const srcFile = join(__dirname, snippet, `${snippet}.tsx`);
  const dest = resolve(destination.trim());
  const destFile = dest.endsWith('.tsx') ? dest : join(dest, `${newName}.tsx`);

  let content = readFileSync(srcFile, 'utf8');

  if (newName !== snippet) {
    content = content.replaceAll(snippet, newName);
  }

  if (Object.keys(configValues).length > 0) {
    content = applyConfig(content, configValues);
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
