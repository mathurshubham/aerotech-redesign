import assert from "node:assert/strict";
import { test } from "node:test";

import { signGateCookie, verifyGateCookie } from "./cookie";

const SECRET = "test-secret-at-least-32-characters-long!!";
const OTHER_SECRET = "a-completely-different-secret-value-here";

test("signs and verifies a fresh cookie value", async () => {
  const expiry = Date.now() + 60_000;
  const value = await signGateCookie(SECRET, expiry);
  assert.equal(await verifyGateCookie(SECRET, value), true);
});

test("rejects a tampered signature", async () => {
  const expiry = Date.now() + 60_000;
  const value = await signGateCookie(SECRET, expiry);
  const [version, expiryStr, signature] = value.split(".");
  const tampered = `${version}.${expiryStr}.${flipLastChar(signature)}`;
  assert.equal(await verifyGateCookie(SECRET, tampered), false);
});

test("rejects a value signed with a different secret", async () => {
  const expiry = Date.now() + 60_000;
  const value = await signGateCookie(OTHER_SECRET, expiry);
  assert.equal(await verifyGateCookie(SECRET, value), false);
});

test("rejects an expired cookie", async () => {
  const expiry = Date.now() - 1_000; // already expired
  const value = await signGateCookie(SECRET, expiry);
  assert.equal(await verifyGateCookie(SECRET, value), false);
});

test("rejects malformed values", async () => {
  assert.equal(await verifyGateCookie(SECRET, undefined), false);
  assert.equal(await verifyGateCookie(SECRET, ""), false);
  assert.equal(await verifyGateCookie(SECRET, "not-a-cookie"), false);
  assert.equal(await verifyGateCookie(SECRET, "v2.123.abc"), false);
  assert.equal(await verifyGateCookie(SECRET, "v1.not-a-number.abc"), false);
});

function flipLastChar(value: string): string {
  const last = value.at(-1) ?? "A";
  const flipped = last === "A" ? "B" : "A";
  return value.slice(0, -1) + flipped;
}
