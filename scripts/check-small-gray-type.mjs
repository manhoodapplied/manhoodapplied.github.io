import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const css = await readFile(path.join(root, 'src', 'styles', 'global.css'), 'utf8');
const match = css.match(/\.eyebrow\s*\{([^}]*)\}/);

if (!match) throw new Error('Missing global .eyebrow role.');
if (!/font-family:\s*var\(--body\)/.test(match[1])) {
  throw new Error('Website eyebrows must use Inter through var(--body), never League Gothic.');
}
if (!/font-weight:\s*600\s*;/.test(match[1])) {
  throw new Error('Website eyebrows must remain Inter Semibold (600).');
}

console.log('Typography gate passed: website eyebrows use Inter Semibold (600).');
