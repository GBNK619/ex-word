// One Word From Your Ex — make.fun entry (u-brave-eagle-12-one-word-from-your-ex-cfd97ba2).
// Writes exactly one word — the word the entrant's ex would use to describe them —
// to MAKEFUN_OUTPUT_DIR/entry.txt.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const WORD = "Expensive";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, WORD + "\n", "utf8");

// Read-back validation: the written file must be byte-identical to the word
// we intended, a single word of 1–24 characters (the competition gate).
const back = readFileSync(outPath, "utf8");
if (back !== WORD + "\n") {
  throw new Error(`read-back mismatch: wrote ${JSON.stringify(WORD)}, read ${JSON.stringify(back)}`);
}
if (WORD.length < 1 || WORD.length > 24 || /\s/.test(WORD)) {
  throw new Error(`word fails the gate: ${JSON.stringify(WORD)} (${WORD.length} chars)`);
}
console.log(`wrote ${outPath}: ${JSON.stringify(WORD)} (${WORD.length} chars) — read-back verified`);
