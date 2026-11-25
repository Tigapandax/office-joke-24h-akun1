import { readFileSync } from "node:fs";

// Read the single joke line (strip one trailing newline only).
const raw = readFileSync(new URL("./one-line.txt", import.meta.url), "utf8");
const line = raw.endsWith("\n") ? raw.slice(0, -1) : raw;

function fail(reason: string): never {
  console.error(`FAIL: ${reason}`);
  process.exit(1);
}

// 1. Must not be empty or only whitespace.
if (line.trim().length === 0) fail("empty line");
// 2. At most 200 characters, per the bounty cap.
if (line.length > 200) fail(`${line.length}/200 characters`);
// 3. Exactly one line: no embedded newline or carriage return.
if (line.includes("\n") || line.includes("\r")) fail("not a single line");
// 4. No leading or trailing space.
if (line !== line.trim()) fail("leading or trailing space");
// 5. Must end with terminal punctuation.
if (!/[.!?]$/.test(line)) fail("line must end with terminal punctuation");
// 6. No doubled spaces inside the line.
if (line.includes("  ")) fail("double space inside line");

console.log(line);
console.log(`OK: ${line.length}/200 characters, single line.`);
