# Strict Evidence Operator — execution-contract v1

Use only when the frozen triggering lifecycle record contains exactly one supported `execution-contract:v1` marker and compatible helper prerequisites exist. Also load the shared verification-recipe contract.

Strict mode does not change worker authority, acceptance semantics, tiny-repair limits, or PASS ownership.

## Initialize

Use the existing deterministic Evidence helper from the runner repository: `scripts/gdo_evidence.py` (https://github.com/kelvin-wat/actions-runner/blob/main/scripts/gdo_evidence.py). Publication preparation uses `scripts/prepare-gdo-v31-publication.mjs` when the active runner contract requires it. Resolve the frozen recipe path/commit/SHA-256 from the trigger. Verify:
- exact clean source commit;
- recipe bytes/hash and schema;
- required dependencies/configuration/fixtures;
- supported runtime prerequisites.

Missing prerequisites or malformed/unsupported contract are blockers, not permission to fall back silently.

The helper-generated plan/attempt receipts are the mechanical ledger. Keep only a short worker ACTIVE TASK for semantic coverage/reuse decisions; do not duplicate attempt state by hand.

For later rounds, reconstruct applicability from prior proof before choosing new execution. Where helper-supported recovery/import can preserve exact proof identity and relevant inputs, use it rather than mechanically rerunning an unchanged obligation. A fresh session or changed candidate SHA alone does not require re-execution; explicit freshness, concrete invalidation, or affected behavior does.

## Run / recover

For each authorized step, use the helper-owned process/attempt lifecycle. It owns cwd/environment, terminal process state, logs and unique attempt identity.

Do not:
- attach one startup receipt to a later process;
- evaluate partial output as terminal proof;
- delete/retry uncertain owned processes without reconciliation;
- alter recipe assertions/selectors/timeouts/retries via ephemeral configuration.

Recovery/import must preserve original proof identity and identical relevant contract/source inputs. Legacy evidence without original helper receipts is not relabeled as fresh strict proof.

### Mechanical invocation correction

When the frozen recipe declares an allowed mechanical correction and the failure is strictly non-semantic, use the helper's `run --mechanical-correction <receipt.json>` path rather than legacy recovery. The receipt must identify the original failed attempt, one allowed correction class/reason, and the exact token replacement(s). The helper preserves the original attempt and validates source fingerprint, proof/claim identity, assertion/contract fingerprint, and original/corrected method fingerprints.

Only one corrected attempt is permitted for the obligation. Never use mechanical correction to change product source, expected behavior, assertion/bound, fixture meaning, acceptance criteria, or material runtime interpretation, and never retry until green. If the helper rejects the correction or meaning is ambiguous, route out under normal GDO authority.

After a substantive failure, the Evidence worker may continue other independent authorized steps only when their results remain meaningful and safe. Dependent steps stay blocked rather than being forced through invalid state. Related demonstrated failures may be aggregated into one Implementation-required packet; this does not authorize speculative campaign expansion.

## Collection and validation

The helper collects allowed-root artifacts and content hashes. Original reports remain preserved. Referenced body/path attachments must resolve. Empty output, zero executed tests, stale report identity, missing attachment, package mismatch, or incomplete inventory cannot satisfy closure.

For Playwright v1, preserve the helper's exact result/retry/attachment expectations. Unsupported reporter/artifact forms must be reported, not guessed equivalent.

Runtime/package proof binds the actual opened/observed package bytes to verified build outputs; a staging directory alone is insufficient.

## Bundle and outcome

The Evidence worker owns semantic coverage assessment, redaction, narrative, and selected Outcome. The helper owns mechanical closure/bundle assembly.

REVIEW READY requires both:
- independent semantic coverage judgment; and
- successful deterministic validation of every mandatory contract obligation through applicable fresh, recovered, or retained proof under the current contract.

A later round does not require every recipe step to be freshly executed when unchanged proof is valid and current GDO reuse/recovery rules permit retention. If the frozen strict contract explicitly requires fresh execution for an obligation, that freshness remains controlling.

A blocked/implementation-required/discovery-required report may preserve failed attempts and unresolved items truthfully.

## CP2 proof-history publication

For a request whose admitted proof ledger enabled `gdo-proof-history-policy/v1`, also create the runner-required `publication/proof-history.json` sidecar using the durable proof IDs and actual round dispositions. The deterministic publisher validates it and owns the issue-level `gated-development:evidence-proof-history:v1` marker. METHOD READY references may explain why this round was allowed but do not count as proof.

## Publication

Author only the worker-controlled evidence body. Use the existing strict publication preparation adapter; do not hand-edit generated `evidence.md`, `ready.json`, attempt receipts, proof-history marker, or inventory after preparation.

The publisher independently revalidates staged bytes. A worker-written boolean never replaces raw validation.

After queue acknowledgement/published terminal receipt, STOP. Recovery of publication transport reuses the same frozen request/outcome/digests. Never call the publisher workflow directly when the established helper owns queueing.
