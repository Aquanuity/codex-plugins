# Strict Evidence Operator — execution-contract v1

Use only when the frozen triggering lifecycle record contains exactly one supported `execution-contract:v1` marker and compatible helper prerequisites exist. Also load the shared verification-recipe contract.

Strict mode does not change worker authority, acceptance semantics, tiny-repair limits, or PASS ownership.

## Initialize

Use the existing deterministic Evidence helper from the runner repository. Resolve the frozen recipe path/commit/SHA-256 from the trigger. Verify:
- exact clean source commit;
- recipe bytes/hash and schema;
- required dependencies/configuration/fixtures;
- supported runtime prerequisites.

Missing prerequisites or malformed/unsupported contract are blockers, not permission to fall back silently.

The helper-generated plan/attempt receipts are the mechanical ledger. Keep only a short worker ACTIVE TASK for semantic coverage/reuse decisions; do not duplicate attempt state by hand.

## Run / recover

For each authorized step, use the helper-owned process/attempt lifecycle. It owns cwd/environment, terminal process state, logs and unique attempt identity.

Do not:
- attach one startup receipt to a later process;
- evaluate partial output as terminal proof;
- delete/retry uncertain owned processes without reconciliation;
- alter recipe assertions/selectors/timeouts/retries via ephemeral configuration.

Recovery/import must preserve original proof identity and identical relevant contract/source inputs. Legacy evidence without original helper receipts is not relabeled as fresh strict proof.

## Collection and validation

The helper collects allowed-root artifacts and content hashes. Original reports remain preserved. Referenced body/path attachments must resolve. Empty output, zero executed tests, stale report identity, missing attachment, package mismatch, or incomplete inventory cannot satisfy closure.

For Playwright v1, preserve the helper's exact result/retry/attachment expectations. Unsupported reporter/artifact forms must be reported, not guessed equivalent.

Runtime/package proof binds the actual opened/observed package bytes to verified build outputs; a staging directory alone is insufficient.

## Bundle and outcome

The Evidence worker owns semantic coverage assessment, redaction, narrative, and selected Outcome. The helper owns mechanical closure/bundle assembly.

REVIEW READY requires both:
- independent semantic coverage judgment; and
- successful deterministic validation of every mandatory contract obligation.

A blocked/implementation-required/discovery-required report may preserve failed attempts and unresolved items truthfully.

## Publication

Author only the worker-controlled evidence body. Use the existing strict publication preparation adapter; do not hand-edit generated `evidence.md`, `ready.json`, attempt receipts, or inventory after preparation.

The publisher independently revalidates staged bytes. A worker-written boolean never replaces raw validation.

After queue acknowledgement/published terminal receipt, STOP. Recovery of publication transport reuses the same frozen request/outcome/digests. Never call the publisher workflow directly when the established helper owns queueing.
