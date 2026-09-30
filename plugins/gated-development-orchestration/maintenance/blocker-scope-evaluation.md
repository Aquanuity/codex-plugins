# GDO 4.7.4 blocker-scope verification

## Change boundary

The workflow core owns dependency-scoped blocking and the mandatory pre-finalization audit. Every active role conditionally loads one shared reference on a blocked operation or incomplete handoff. Role guidance and both Evidence operators apply the same rule. Admission/re-entry gates, source authority, safety, independent Evidence, and terminal publication remain unchanged. Human TAKEOVER publication support is not part of this change.

The reported #409 Evidence R2 incident motivates the publication-outage fixture: prerequisite checks had completed, publication was unavailable before finalization, and remaining live work was deferred. The controlling handoff explicitly required retaining the complete bundle if delivery failed. The synthetic fixture does not claim to reproduce the laptop or prove any AquaTwin acceptance criterion.

## Two different kinds of tests

`node --test tests/blocker-scope.test.mjs` runs deterministic reference and mutation traces against isolated mock operations. It verifies that the grader observes execution, rejects abandoned independent work, rejects dependent/unsafe/out-of-scope work, preserves original attempts, separates artifact completeness/delivery, and respects terminal states. It also exercises the model-loop adapter with mocked responses and verifies missing credentials are NOT_RUN. These tests are **not live model-compliance results**.

`scripts/eval-blocker-agent.mjs` is the opt-in model-backed evaluation. It loads the actual workflow core, active role, selected Evidence operator and material shared reference from a single local package snapshot. The model receives task facts and simulated tool observations, not expected action sequences. The harness executes the mock tools and grades the resulting trace, not the model's completion claims. Each case starts a fresh context; no product files, real UI, GitHub writes, or lifecycle dispatches are exposed.

The harness records package version, exact loaded-file SHA-256 hashes, requested and response-reported model, reasoning setting, request IDs, usage, tool trace, per-case findings, and repetitions. It does not save private model reasoning. Running a model evaluation requires an explicit model and a normal `OPENAI_API_KEY` in the process environment. No credential is checked into this package. There is no automatic paid evaluation or implicit model selection.

Example from this package root (use an already-authorized model):

```sh
node scripts/eval-blocker-agent.mjs --model MODEL_ID --repeat 3 --max-calls 256 --out /new/evaluation/output
```

Use `--cases publication-outage,unavailable-ui,failed-build,individual-test-failure` for a bounded subset. The fixed API endpoint is the OpenAI Responses API; the adapter follows the official function-calling protocol at https://developers.openai.com/api/docs/guides/function-calling. It has per-call timeouts, per-case turn bounds, and a global call budget. Missing credentials produce NOT_RUN with exit 3; API failures or incomplete runs never count as a pass. Do not infer general model reliability from reference traces or one successful sample. Run baseline and candidate snapshots with the same model/settings/repetitions and compare both unsafe-continuation and premature-stop rates.

## Fixture coverage

The suite covers publication unavailability before freeze, unavailable required UI, failed builds, individual assertion failure, contamination of shared state, unavailable evidence capture, unavailable restoration, Definition/Discovery/Implementation/Review scoped blockers, publication frozen/uncertain/acknowledged, revoked authority, redundant work, and out-of-role infrastructure repair. Expected independent actions and forbidden dependent actions are separate grader-only data.

A failed test can leave its executed-work records complete while the required campaign is incomplete. A complete local campaign bundle is not delivered evidence. Choosing BLOCKED or preparing an early frozen outcome is not an acceptable way to skip the audit. No new production dependency database, scheduler, round, JSON lifecycle field, or mandatory audit executable is introduced.

## Release validation record

Record the actual CI and model evaluation results in the PR/release record. Do not describe the model behavior as verified unless a MODEL_EVALUATION report exists. Retain unsuccessful traces as regressions; do not rewrite history or silently omit failed cases. Actual laptop execution and publication remain separate validation surfaces.
