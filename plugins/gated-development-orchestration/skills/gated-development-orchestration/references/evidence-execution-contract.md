# Evidence-ready Implementation and Deterministic Execution — GDO 3.1

## Responsibility, not another round

Governance defines the approved ACs and proof expectations. Implementation supplies product code and necessary durable tests, fixtures, observation hooks and an executable recipe. Evidence independently checks coverage, executes/reuses/recovers proof, diagnoses failures and selects an Evidence outcome. Independent Review alone judges acceptance and issues PASS.

Do not add a mandatory test-design round or ask an economical Evidence worker to invent a substantive acceptance campaign. Existing adequate tests should be reused. Discovery/documentation checkpoints do not require artificial browser tests. A missing durable acceptance scenario normally returns IMPLEMENTATION REQUIRED; an unresolved expected behavior returns DISCOVERY REQUIRED. An obvious mechanical repair retains the existing tiny-repair boundary and must be disclosed and reverified.

Implementation can hand off committed, executable tests without claiming to have run them where the required environment is unavailable. Its own results remain supporting evidence, not independent acceptance. An AC-to-proof map must identify expected behavior, not only a filename.

## Prospective opt-in and authority

The 3.1 helper is an opt-in pilot until the cross-repository rollout and fresh Windows verification are independently accepted. Do not advertise deployment merely because the plugin version changed. No existing request is rewritten or silently upgraded. Human/GitHub authority remains above a recipe or helper result.

After committing the recipe and implementation, an authorized lifecycle trigger can contain exactly one line:

~~~text
<!-- gated-development:execution-contract:v1 commit=<40-lowercase-hex> path=<repository-relative-recipe.json> sha256=<64-lowercase-hex> -->
~~~

Values are real, independently checked values, never these placeholders. The ending commit belongs in this post-commit marker, not inside the recipe that would need to predict its own commit hash. Both persistent thread IDs and the canonical v3 first-line marker remain unchanged. The helper derives its contract from the frozen trigger; the publisher checks that trigger against GitHub. Missing markers retain the historical publication path. Malformed/duplicate/unsupported markers fail closed, never as legacy.

A recipe amendment needs explicit current authority. Material product/acceptance/architecture changes still return to Definition and human re-authorization. Do not remove an obligation to obtain green validation. New requests retain their own original contract and publication identity through recovery.

## Recipe v1

The executable schema is `gdo-evidence-recipe/v1`; the reference implementation is `kelvin-wat/actions-runner/scripts/gdo_evidence.py`. The small v1 surface uses JSON and Python's standard library, with a Node entrypoint. Prerequisites: Node supported by the existing runner, Python 3.11+, Git, and the recipe's declared test tools. Dependencies are not installed implicitly. `GDO_PYTHON` may identify an interpreter. Missing prerequisites are blockers, not a fallback to model-maintained proof.

A recipe contains:

- `repository`, numeric `issue`, and `checkpoint` identity;
- `criteria`: the complete original AC-ID-to-verbatim-text map;
- ordered `steps`, each with unique `id`, mapped `criteria`, explicit `command` argv, repository-relative `cwd`, positive `timeout_seconds`, optional nonsecret `env`, declared dependency/configuration `inputs`, and concrete output requirements;
- `files`: named required outputs with `path` and `type` (`bytes`, `text`, `json`, `png`); JSON may require keys, exact observations and nonempty equal JSON-pointer values;
- optional `playwright`: original JSON report path, exact nonzero test count, committed configuration path, and required attachment-name policies;
- optional `bindings`: a staged file must match a named output from an earlier verified build step;
- optional observation `package` policies: a direct-file `entry_pointer`, actual package files bound to named build outputs, and optional before/after hash-map pointers.

Allowed expansion tokens are `{source}`, `{attempt}` and `{python}`. Use absolute paths after expansion; invoke executables/script hosts explicitly, not `.cmd`/`.bat` or shell-text commands. Nonsecret environment overrides are recipe-owned. Configurations and selectors are committed inputs; ephemeral directory parameters do not authorize changing assertions, retries or timeouts. Configure the test runner's output/report paths under `{attempt}`. The Playwright v1 collector requires one worker, one passing result per expected test and retry zero; it validates original report identity and timestamps. Other approved test configurations need an explicitly reviewed adapter/contract, not a silent override.

Build digests are computed from actual verified outputs, not invented or copied from an unrelated runtime. Base and graph fixtures are distinct inputs. Runtime validation checks the actual package referenced by the observation, not merely a separate staging directory. The helper verifies tracked source identity and declared dependency inputs before/after execution. Use a clean isolated checkout at the authorized commit and preserve recipe bytes (for Windows, set appropriate `eol=lf` attributes or disable checkout conversion in the isolated source).

The runnable example is `actions-runner/examples/evidence-pilot/recipe.json`. Its issue 0 is explicitly a local test fixture, not a production activation. Adapt identifiers and proof obligations under actual Governance authority; do not copy sample values as facts.

## Execution and state

~~~text
init -> run/recover -> collect -> validate -> bundle -> publication preparation
~~~

`init` verifies the recipe against its Git blob and marker, checks exact clean source, and writes a durable plan. `run --step <id>` launches one recipe command and owns its process/attempt identity, cwd/environment, logs and terminal exit. It does not choose a new campaign or retry.

Each attempt has its own directory and original identity. Preflight failures, startup failures, nonzero exits, timeouts and incomplete artifacts are distinct from validated completion. A recovery requires a distinct attempt or an import retaining the original identity. Do not attach a startup receipt to a later process or evaluate partial output as a terminal failure. The helper waits for the exact owned child; uncertain/orphaned processes and stale locks require reconciliation, not guessed completion or automatic deletion.

The helper collects only allowed-root artifacts and stores actual bytes under content hashes. Original reports are preserved; embedded bodies and filesystem attachments must both resolve. Empty hashes do not match, zero executed tests do not pass, and inventories do not prove their own completeness. The ZIP is reopened and validated against its contract, selected attempts, attachment references, package mappings and object bytes. PNG v1 validation supports bounded non-interlaced PNGs; an unsupported format must be reported, not claimed decoded.

The helper's attempt records and inventory are the mechanical ledger. Keep a short ACTIVE TASK note for independent reasoning/coverage decisions; do not create another handwritten copy of every attempt state. Full logs remain files; inspect them when diagnosing a concrete issue.

## Recovery and reuse

Fresh Evidence context does not invalidate proof. Apply the existing relevant-input and explicit-freshness tests before reuse. V1 `recover --original-run <root> --step <id>` imports valid helper-produced proof at identical contract/source inputs, preserving original request, command, attempt, timing and artifact identities. It does not reexecute commands.

Legacy artifacts without original helper receipts are not fabricated into strict receipts. Their reuse can remain explicitly qualified under the existing workflow, or receive separately reviewed import tooling. A change in relevant inputs/recipe requires an authorized reuse assessment; the helper is not a semantic diff oracle. Do not reopen accepted CP4E or relabel R12/R13/R14 as new tests to pilot 3.1.

## Readiness, partial reports and publication

The Evidence worker owns the semantic coverage assessment, redaction review, narrative and selected outcome. For strict mode the helper owns bundle assembly and mechanical closure. REVIEW READY requires BOTH independent coverage judgment and all contract obligations mechanically satisfied. Validation is necessary, not sufficient; no code here issues PASS.

Use `bundle --outcome <outcome>`. A blocked/correction/discovery report may preserve failed history and unresolved obligations. Before initialization is possible, `bundle --outcome BLOCKED --reason <observed blocker>` can produce an explicitly preflight-only record with no completion claims. A running/uncertain owned process must first be reconciled; do not freeze while evidence is changing.

Author only `publication/evidence-body.md`, then use `prepare-gdo-v31-publication.mjs prepare` with the existing redaction and queue flags. It validates strict closure before delegating serialization/queue state to the existing 3.0.5 owner. AquaTwin's publisher independently fetches the exact dispatch-runtime validator from repository source and revalidates the staged ZIP before upload/posting. A worker-written boolean is never sufficient. Digests are checked again against the frozen publication.

Existing queue-claim, acknowledgment, duplicate-suppression and terminal-publication rules remain. After acknowledgment STOP; do not execute, repackage, change outcome or requeue. A new recovery round never mutates the previous publication.

## Limits and rollout

These are safeguards against ordinary execution mistakes, not an attestation system against an actor able to alter the recipe, validator or host. Tests can still be semantically weak. Independent Review must inspect the full claim, appropriate source/diff, authority, test adequacy and material raw proof.

Deployment order after separate review: runner helper and tests; AquaTwin loader/publisher adapter; plugin 3.1 instructions; then explicit strict opt-in for a new request. Validate the Windows parser/launcher and a real direct-file browser pilot before calling deployment accepted. Legacy requests require neither Python nor recipe migration merely because new code is available. No new storage service, model mandate, mandatory full rerun, broader implementation authority or CP5 activation is introduced.
