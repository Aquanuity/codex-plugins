# Legacy / Manual Evidence Operator

Use this mode when the triggering lifecycle record has no supported strict `execution-contract:v1` marker. Do not invent a strict receipt.

## Closure ledger

Before expensive execution, create a round-local non-git ledger from current GitHub authority. Keep a short ACTIVE TASK and one mandatory item IN PROGRESS at a time.

For every mandatory obligation record:
- exact authority/AC;
- mode: REUSE, RECOVER, or EXECUTE;
- action;
- required proof/artifact/provenance;
- status: PENDING, IN PROGRESS, SATISFIED, or truthfully blocked.

Attempted is not satisfied.

For a later Evidence round, seed this ledger from prior inspectable proof instead of rebuilding every obligation as EXECUTE. Record retained/recovered/invalidated state and the concrete reason for any invalidation. A new round/session or source SHA alone does not reset satisfied unrelated proof.

## Execute one obligation at a time

Before each expensive command, identify which obligation it closes. After the action:
- record exact command/action, cwd and relevant nonsecret configuration;
- record actual result and run identity;
- preserve required logs/reports/screenshots/attachments/downloads/hashes before another repetition can overwrite them;
- inspect enough to confirm artifacts belong to the intended run;
- mark SATISFIED only when the named proof exists and is usable.

Use unique output/report paths for repeated runs.

After a substantive failure, preserve it and continue only independent authorized obligations whose result remains meaningful and safe. Skip/mark blocked any obligation that depends on the failed behavior or invalid state. Aggregate related demonstrated failures when useful; do not continue merely to search speculatively outside the campaign.

## Preserve the contract

Do not silently:
- change timeout/retry counts;
- weaken assertions/selectors;
- substitute a different fixture/runtime and call it equivalent;
- force product state solely to satisfy an assertion;
- retry until green.

If a deviation is required, cite explicit authority and identify the proof as different from the original contract.

Distinguish preflight/startup failure, nonzero test result, timeout, incomplete artifacts, and environment blocker. Do not infer an environment is impossible from one setup attempt; after repeated materially equivalent failures, use an authorized different path or report BLOCKED rather than looping.

## Closure audit

Before selecting Outcome:
1. re-fetch the trigger and current checkpoint authority;
2. read the ledger line by line;
3. verify every mandatory item against its exact proof/run identity;
4. inspect the review bundle/inventory for required artifacts;
5. confirm original AC mapping has not drifted.

REVIEW READY is forbidden while a mandatory item is pending, attempted-but-unproven, ambiguous, stale, or missing required provenance.

## Reuse

Retain prior proof under the Evidence role's applicability rules. Identify reused source/round/artifact and why relevant inputs remain valid. A changed candidate SHA is not by itself an invalidation reason. Identify rejected/invalidated stale or unbound proof separately with the concrete reason, and execute only the smallest sufficient affected set.

## Publication

Keep generated artifacts outside git unless required. Redact secrets/private client material not required for review. Use the authorized publication helper/path where configured. After queue acknowledgement, stop; uncertain queue state is reconciled, not blindly retried.
