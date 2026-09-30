#!/usr/bin/env node
import assert from 'node:assert/strict';
import fs from 'node:fs';
import test from 'node:test';

const root = new URL('../', import.meta.url);
for (const [role, prefix, classification, status] of [
  ['gdo-discovery', 'discovery-probe', 'DISCOVERY FEEDBACK ONLY', '- Probe status: <COMPLETED | BLOCKED | INCONCLUSIVE>'],
  ['gdo-implementation', 'targeted-check', 'DEVELOPMENT FEEDBACK ONLY', '- Result: <PASS | FAIL | BLOCKED>'],
]) {
  const text = fs.readFileSync(new URL(`skills/${role}/SKILL.md`, root), 'utf8');
  const section = text.split('### Observation sufficiency and recipient access\n')[1]?.split('\n### Canonical')[0];
  test(`${role}: specifies minimum data without a mandatory attachment`, () => {
    assert.ok(section, 'sufficiency guidance must be in the loaded role body');
    assert.match(section, /parent specifies the minimum observed values/);
    assert.match(section, /existing .*Artifact requested fields/);
    assert.match(section, /Prefer decisive captured output inline/);
    assert.match(section, /separate attachment is not required/i);
    assert.match(section, /not a new bundle, mandatory upload, proof ledger, or acceptance Evidence gate/);
  });
  test(`${role}: preserves observations, counterexamples, and disclosure`, () => {
    assert.match(section, /actual observations separately from interpretation/);
    assert.match(section, /unexpected\/contradictory/);
    assert.match(section, /Redact secrets/);
    assert.match(section, /truncation\/redaction/);
    assert.match(section, /Captured output or Limitations sections/);
    assert.match(section, /without duplicating machine fields/);
  });
  test(`${role}: distinguishes receiver access, optional files, and recovery`, () => {
    assert.match(section, /file saved locally is not automatically delivered/);
    assert.match(section, /actual receiving worker is established/);
    assert.match(section, /Unknown access is not confirmed delivery/);
    assert.match(section, /optional missing attachment does not block/);
    assert.match(section, /existing status meanings/);
    assert.match(section, /Recover or deliver the existing capture under its original/);
    assert.match(section, /does not authorize a rerun/);
    assert.match(section, /mutation of a frozen result/);
    assert.match(section, /Existing frozen requests keep their contract/);
  });
  test(`${role}: preserves v1 envelopes, status meanings, and field names`, () => {
    for (const kind of ['request', 'result']) {
      const marker = `<!-- gated-development:${prefix}-${kind}:v1 -->`;
      const block = text.slice(text.indexOf(marker)).split('```')[0];
      assert.ok(text.includes(marker));
      assert.ok(block.startsWith(marker + '\n<!-- gated-development:governance-thread:v1 id=<UUID> -->\n<!-- gated-development:implementation-thread:v1 id=<UUID> -->'));
      assert.equal((block.match(/^- Classification:/gm) || []).length, 1);
      assert.ok(block.includes(`- Classification: ${classification}`));
    }
    assert.ok(text.includes(status));
    assert.match(text, /- Artifact requested: <minimum inline data or exact file needed; none when unnecessary>/);
    assert.match(text, /- Observation: <actual decisive data, interpretation limits, and any delivery limitation>/);
    assert.match(text, /- Artifact: <inline data location, recipient-accessible reference, or none\/unavailable with reason>/);
  });
}
