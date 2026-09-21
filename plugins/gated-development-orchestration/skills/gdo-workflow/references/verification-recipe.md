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

Implementation authors the proof surface and recipe. Evidence independently judges coverage and executes/reuses/recovers proof. Independent Review judges acceptance.

A recipe cannot weaken current checkpoint authority, remove a required green validation, silently change assertions/timeouts/retries/fixtures, or grant PASS.

## Amendments

Relevant recipe/input changes require authorized lifecycle handling appropriate to their semantic impact. Preserve frozen request/publication identities; do not rewrite an active request to demonstrate a newer execution mode.
