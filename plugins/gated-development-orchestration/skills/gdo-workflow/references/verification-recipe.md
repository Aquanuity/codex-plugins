# Verification Recipe Contract

This is the shared authoring contract between Implementation and Evidence. It is not an extra round.

## Required for product-code Evidence handoff

Implementation must identify a committed runnable recipe at the ending commit. A GitHub comment containing commands is explanation, not a substitute for the committed recipe.

Reuse an adequate existing script/config/recipe rather than creating a bespoke framework merely to satisfy GDO.

A legacy/manual recipe may be a committed repository script/config/instruction file that unambiguously defines:
- checkpoint/repository identity;
- AC-to-proof mapping;
- ordered commands/actions and working directories;
- nonsecret required environment/configuration/fixtures;
- timeouts/retries/selectors/assertions that must not drift;
- expected executed/collected result;
- required reports/attachments/observations/provenance;
- reuse/freshness requirements where applicable.

Evidence must be able to execute the intended campaign without inventing substantive tests or acceptance meaning.

The recipe describes the authorized proof surface; it is not a blanket instruction to rerun every step in every later Evidence round. Current GDO reuse/recovery rules govern later-round economy. A correction should update recipe/tests only where the proof surface actually changed, while preserving inspectable unchanged obligations for reuse.

## Evidence Admission and Proof Ledger v1

New opt-in handoffs reference one committed `gdo-proof-ledger/v1` at the exact ending commit; frozen/unmarked work is unchanged. Candidate identity is bound by the Implementation record's proof-ledger `path@ending-sha` reference and by reading that ledger from the exact ending commit; the ledger declares `candidateBinding: "containing-commit"` rather than embedding its own impossible self-referential Git SHA. The ledger also binds repository/checkpoint/work-order, branch, recipe path + lowercase SHA-256, stable proofs, readiness checks, and `semanticAdmission`.

Each proof declares unique `id`, `criteria`, boolean `required` (plus a condition when false), `mode`, executable `method {type,ref}`, nonsecret `fixtures`, and `freshness`. The ledger cannot make an authority-required proof optional.

The canonical v1 top-level fields are `recipePath`, `recipeSha256`, and `admissionChecks`; do not invent nested `recipe` objects or aliases such as `readinessChecks`. A `source-path-exists` admission check uses `path`, not `ref`.

Admission checks are readiness only: `command`, `source-path-exists`, `filesystem-path-exists`, `env-present`, or `numeric-bound`; `onFailure` is `NOT_READY` or `TRIAGE_REQUIRED`. Deterministic failure cannot be overridden by AI. `semanticAdmission` is `none | optional | required` and is never acceptance proof. Use `none` by default unless an explicitly configured/authorized semantic-admission provider exists; do not set `required` merely as a caution flag.

Evidence keeps the same proof IDs across RETAIN/RECOVER/EXECUTE/INVALIDATED dispositions. Admission-enabled publication uses `gated-development:lifecycle-publication-request:v1 type=implementation` + `gdo-lifecycle-implementation/v1`; runner code renders the canonical Implementation record.

### Optional CP2 proof-history policy

New campaigns that explicitly opt into repeated-blocker economy add this field to the existing `gdo-proof-ledger/v1` object:

```json
{
  "proofHistory": {
    "schema": "gdo-proof-history-policy/v1",
    "repeatedBlockedThreshold": 2
  }
}
```

Absence means legacy/GDO 4.6 behavior. Never add the policy retroactively to a frozen campaign or rewrite historical Evidence records.

For CP2 method development, verification-method identity is explicit, not model-inferred: use a canonical stable descriptor containing only proof/method ID, execution surface, fixture/harness identity, normalized invocation/bounds shape, relevant runtime identity class, and assertion/claim identity. Exclude timestamps, temp paths and secrets. Its lowercase SHA-256 is the method fingerprint. Fingerprint inequality proves only that the descriptor changed; it does not prove the new method is ready.

Targeted-check/Discovery-Probe METHOD READY feedback is development/readiness evidence only. It never satisfies the proof ledger's acceptance obligation; a fresh formal Evidence worker must execute the method against the bound candidate.

## Strict execution-contract v1

Strict mode additionally requires the existing post-commit marker:

`<!-- gated-development:execution-contract:v1 commit=<40-lowercase-hex> path=<repository-relative-recipe.json> sha256=<64-lowercase-hex> -->`

The strict recipe schema remains `gdo-evidence-recipe/v1`. Do not invent a v2 schema merely for GDO 4.

Strict v1 uses JSON with:
- repository, issue, checkpoint;
- complete verbatim AC map;
- ordered steps with unique IDs, criteria, argv command, cwd, positive timeout, optional nonsecret env, declared inputs and concrete output requirements;
- required output files/types;
- optional Playwright, binding, and package-observation policies supported by the existing helper.

Real marker values are computed only after implementation/recipe commit. Package version never opts a request into strict mode. Missing/malformed/unsupported strict markers fail closed rather than silently becoming legacy.

## Separation of responsibilities

Implementation authors the proof surface and recipe. During correction rounds, Implementation also identifies the bounded failure class, directly affected proof obligations, and unaffected proof expected to remain reusable. Evidence independently judges that applicability and executes/reuses/recovers the smallest sufficient proof set. Independent Review judges acceptance.

A recipe cannot weaken current checkpoint authority, remove a required green validation, silently change assertions/timeouts/retries/fixtures, or grant PASS.

## Amendments

Relevant recipe/input changes require authorized lifecycle handling appropriate to their semantic impact. Preserve frozen request/publication identities; do not rewrite an active request to demonstrate a newer execution mode.
