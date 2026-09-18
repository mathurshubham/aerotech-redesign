import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";

import { OG_AQUA, OG_INK } from "./og-colors";

const css = readFileSync(join(process.cwd(), "src/app/globals.css"), "utf8");

function token(name: string) {
  const match = css.match(new RegExp(`--${name}:\\s*(#[0-9a-fA-F]{6})`));
  assert.ok(match, `--${name} not found in globals.css`);
  return match[1].toLowerCase();
}

test("OG_INK tracks --mist-900 (--ink)", () => {
  assert.equal(OG_INK.toLowerCase(), token("mist-900"));
});

test("OG_AQUA tracks --aqua-400", () => {
  assert.equal(OG_AQUA.toLowerCase(), token("aqua-400"));
});
