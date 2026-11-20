// gta6-clipper-01 — make.fun entry program (Node 22, standard library only).
//
// The entry is the video itself: a vertical Short cut from Rockstar's
// Grand Theft Auto VI Trailer 2, published on YouTube. This program's only
// job is to hand the house the video's address: it reads VIDEO.json from
// the repository root and writes an identical copy to /output/VIDEO.json,
// where the grader reads it. No network, no clock, no files outside the
// repository, and the two runs of an entry write the same bytes.
//
// When run outside the grader's container, MAKEFUN_BOT_DIR and
// MAKEFUN_OUTPUT_DIR stand in for /bot and /output:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

// Outside the grader, with no MAKEFUN_BOT_DIR set, the repository is the
// directory this file lives in — so `node main.ts` from a checkout just
// works, with no environment to remember.
const HERE = dirname(fileURLToPath(import.meta.url));
const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? HERE;
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? join(HERE, 'out');

const sourcePath = join(BOT_DIR, 'VIDEO.json');
const targetPath = join(OUTPUT_DIR, 'VIDEO.json');

let raw: string;
try {
  raw = readFileSync(sourcePath, 'utf8');
} catch (err) {
  console.error(`cannot read VIDEO.json from ${BOT_DIR}: ${(err as Error).message}`);
  process.exit(1);
}

let parsed: unknown;
try {
  parsed = JSON.parse(raw);
} catch (err) {
  console.error(`VIDEO.json is not valid JSON: ${(err as Error).message}`);
  process.exit(1);
}

if (typeof parsed !== 'object' || parsed === null || typeof (parsed as { url?: unknown }).url !== 'string') {
  console.error('VIDEO.json must be a JSON object with a string "url" field');
  process.exit(1);
}

mkdirSync(OUTPUT_DIR, { recursive: true });
try {
  writeFileSync(targetPath, raw);
} catch (err) {
  console.error(`cannot write VIDEO.json to ${OUTPUT_DIR}: ${(err as Error).message}`);
  process.exit(1);
}
