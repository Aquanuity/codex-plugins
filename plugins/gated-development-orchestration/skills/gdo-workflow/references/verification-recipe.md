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

For a new product-code handoff that opts into Evidence Admission, the Implementation record carries `<!-- gated-development:evidence-admission:v1 -->` and references one committed JSON proof ledger at the exact ending commit. Frozen or legacy requests without the marker are unchanged.

The ledger schema identifier is exactly `gdo-proof-ledger/v1`. It binds repository, checkpoint, work-order version, exact candidate, branch, recipe path/hash, stable proof IDs, fixtures/runtime prerequisites, freshness/reuse policy, and any admission-only readiness checks.

Minimum proof item fields:
- `id`: stable and unique inside the checkpoint;
- `criteria`: one or more AC/claim IDs;
- `required`: boolean, with a concrete condition when false;
- `mode`: automated, live, source, integration, or another explicit verification mode;
- `method`: executable recipe step/hook reference, not vague prose;
- `fixtures`: declared nonsecret prerequisite identifiers;
- `freshness`: fresh, reusable, or an explicit conditional policy.

The ledger also carries `recipePath` and lowercase SHA-256 of the exact recipe bytes at the candidate. A mandatory proof may not be made optional by the ledger when checkpoint authority requires it.

Admission-only checks are generic runner-readiness checks, not acceptance tests. Supported v1 check types are:
- `command`: exact argv + cwd + positive timeout; exit 0 means ready;
- `source-path-exists`: repository-relative path must exist in the candidate tree;
- `filesystem-path-exists`: declared runner/fixture prerequisite path exists;
- `env-present`: named environment prerequisite exists; never serialize its value;
- `numeric-bound`: compare a declared numeric actual to a limit using `<=`, `<`, `>=`, `>`, `==`, or `!=`.

Each admission check may use `onFailure: NOT_READY` (default) or `TRIAGE_REQUIRED`. A deterministic failed check cannot be overridden by AI. `semanticAdmission` is `none`, `optional`, or `required`; any semantic admission remains non-accepting and cannot execute or close proof obligations.

The proof ledger is static proof-plan authority. Runtime Evidence records bind the same proof IDs to RETAIN/RECOVER/EXECUTE/INVALIDATED plus durable evidence references; they do not rewrite the committed plan.

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
