# CP1 role-scoped package verification recipe

Mode: legacy/manual. This recipe does not opt the request into strict `execution-contract:v1`.

## Source

Run from a clean checkout of the exact CP1 candidate commit.

## Step CP1-1 — package contract

Working directory:
`plugins/gated-development-orchestration`

Command:
```text
node scripts/check-gdo-v4.mjs
```

Required result:
- exit 0;
- output contains `GDO_V4_PACKAGE_CHECK_OK`;
- preserve the emitted core/load byte totals;
- all referenced files exist;
- manifest and all entrypoint versions agree;
- core and role load budgets pass;
- invariants I1–I28 are mapped;
- no role imports an unrelated role by default;
- compatibility shim routes to the v4 core.

## Step CP1-2 — repository integrity

From repository root:
```text
git diff --check <CP1-base>..<candidate>
git diff --stat <CP1-base>..<candidate>
```

Inspect the complete diff. Confirm no runner/AquaTwin product files are present and historical v3 reference files were not rewritten as fake v4 history.

## Step CP1-3 — source-addressability

At the exact candidate commit, fetch through the same GitHub/connector surface used by ordinary ChatGPT:
- plugin manifest;
- workflow core;
- each of the five role skills;
- compatibility shim;
- load-contract.json;
- both Evidence operator files;
- verification-recipe contract.

Required result: every path resolves from one consistent commit. Installed-plugin loading is a separate observation if that surface is unavailable.

## Step CP1-4 — bounded behavior fixtures

Inspect the committed role text against these cases:
1. GitHub write available, no local runtime -> Implementation remains capable; runtime proof is assigned to Evidence.
2. Missing committed recipe -> Implementation cannot truthfully use READY FOR EVIDENCE / TESTING.
3. Expressly required Implementation-time check not run -> disclose unresolved; do not silently move it to Evidence.
4. Zero-test/weak proof -> Evidence cannot REVIEW READY.
5. Reusable bound proof -> fresh Evidence session does not force rerun.
6. Material architecture unknown -> Discovery, not implementation guess.
7. Unknown role -> routing error, not guessed role.

Static fixtures are not live-worker transcripts.

## Closure

Report actual commands/results and unexecuted checks separately. CP1 implementation checks do not constitute independent acceptance.
