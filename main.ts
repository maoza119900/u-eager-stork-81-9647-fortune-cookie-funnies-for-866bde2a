// Fortune Cookie Funnies for Engineers
// u-eager-stork-81-9647-fortune-cookie-funnies-for-866bde2a
//
// Writes the entry — one fortune cookie line for a software engineer — to
// $MAKEFUN_OUTPUT_DIR/entry.txt (default /output).
//
// Deterministic: no clock, no randomness, no network, no file reads.
// The output is byte-identical on every run.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry line. 88 characters, single line, no trailing newline.
const ENTRY =
  "The bug you cannot reproduce will reproduce itself in production, on a Friday, at 5 p.m.";

// The competition gate: /output/entry.txt must be UTF-8 text of 1 to 120
// characters, not only whitespace.
const MIN_CHARS = 1;
const MAX_CHARS = 120;

function checkGate(text: string): void {
  const length = [...text].length;
  if (length < MIN_CHARS || length > MAX_CHARS) {
    throw new Error(
      `entry is ${length} characters, outside the gate of ${MIN_CHARS}-${MAX_CHARS}`,
    );
  }
  if (text.trim().length === 0) {
    throw new Error("entry is only whitespace");
  }
}

function main(): void {
  // Self-check the gate before writing anything, so a bad entry can never
  // reach the output file.
  checkGate(ENTRY);
  const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outputDir, { recursive: true });
  writeFileSync(join(outputDir, "entry.txt"), ENTRY, "utf8");
}

main();
