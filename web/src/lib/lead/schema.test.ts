import { test } from "node:test";
import assert from "node:assert/strict";
import { LeadInputSchema, LEAD_TOPICS } from "./schema";

const base = {
  name: "Jane Doe",
  email: "Jane@Example.com",
  topic: LEAD_TOPICS[0],
  ts: Date.now() - 5000,
};

test("accepts a valid lead and lowercases the email", () => {
  const result = LeadInputSchema.safeParse(base);
  assert.equal(result.success, true);
  if (result.success) {
    assert.equal(result.data.email, "jane@example.com");
  }
});

test("the schema has no honeypot field — that check happens in the server action before parsing", () => {
  assert.equal("website" in LeadInputSchema.shape, false);
});

test("rejects a submission faster than 3 seconds", () => {
  const result = LeadInputSchema.safeParse({ ...base, ts: Date.now() });
  assert.equal(result.success, false);
});

test("accepts a submission exactly at the 3 second timing gate", () => {
  const result = LeadInputSchema.safeParse({ ...base, ts: Date.now() - 3000 });
  assert.equal(result.success, true);
});

test("rejects a topic outside the known enum", () => {
  const result = LeadInputSchema.safeParse({ ...base, topic: "not-a-real-service" });
  assert.equal(result.success, false);
});

test("rejects an invalid email", () => {
  const result = LeadInputSchema.safeParse({ ...base, email: "not-an-email" });
  assert.equal(result.success, false);
});

test("'other' is a valid topic", () => {
  const result = LeadInputSchema.safeParse({ ...base, topic: "other" });
  assert.equal(result.success, true);
});
