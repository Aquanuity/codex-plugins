# Authority and Lifecycle Reference

Use when defining gate authority, freezing/hashing work orders, interpreting state, corrections, routing metadata, verification failures, or acceptance.

## Artifact authority

| Artifact | Authority |
|---|---|
| Source-of-truth document | Feature meaning, behavior, architecture, ownership, non-goals, gate sequence |
| Parent issue | Overall tracking and accepted checkpoints |
| Frozen gate body | Initial work order |
| Activation comment | Execution authorization/trigger for current gate |
| Correction-required comment | Independent failed-review decision and narrow correction authorization/trigger |
| Commits and full gate diff | Actual implementation truth |
| Codex evidence/blocker | Implementer report; never acceptance |
| Independent review | PASS, correction-required, verification-blocked |
| Launcher records | Delivery/runtime facts only |
| ChatGPT thread routing marker | Human-supplied review transport destination only; no product authority |
| Chat | Discussion/human decisions until written to durable GitHub/source records |

## Version meanings

- Skill package version: `1.4.2`
- Marker version: e.g. `activation:v1`, `review:v2`
- Work-order version: gate execution/correction sequence
- Checkpoint identity: CP1, CP2, etc.
- Thread-routing marker version: `chatgpt-thread:v1`

These are independent.

## Routing authority

The thread marker:

```text
<!-- gated-development:chatgpt-thread:v1 id=<UUID> -->
```

identifies where independent review should return. It does not:

- activate a gate;
- authorize implementation;
- broaden/narrow scope;
- authorize repository operations;
- establish evidence validity;
- issue PASS;
- prove who authored a comment.

Executable authority still comes from activation/correction plus the controlling case.

For every new v1.4.2 executable activation/correction, the human must supply the current ChatGPT thread UUID. ChatGPT asks for it if it has not already been supplied for that executable comment. Without a valid UUID, the activation/correction is not published and no execution authority is created.

Do not infer the thread ID from Codex metadata, reuse another conversation's ID, or substitute a fixed/default destination.

## Freezing and history

The gate body may be edited while draft/ready. On activation, treat the controlling body/activation as frozen according to the case. Preserve old comments. Use new comments for evidence, review, correction, amendment, supersession, and cancellation.

Do not rewrite history merely to add a missing thread marker. Historical pre-1.4.1 executions that lack routing metadata remain historical and may require manual review. That historical exception does not authorize creating new markerless activations/corrections.

## Gate types

### Implementation/documentation

Require remotely reviewable ending evidence according to the case. Codex implements, verifies, repairs authorized self-introduced defects, re-verifies, commits, normally pushes as authorized, posts evidence, and stops.

### Analysis-only

No repository writes, commits, or pushes. Review baseline/evidence/no-write compliance.

## Verification failures and blocker authority

Verification exists to find defects in the active work. Therefore a required build/test/check failure is not itself a state transition to BLOCKED.

Codex owns first-line diagnosis while implementing:

- **In-scope implementation defect:** caused by the active gate's changes and repairable within the frozen scope/path/architecture/repository-operation boundary. Codex fixes it and reruns verification. No new authorization or correction comment is needed.
- **True blocker:** cannot be resolved without unauthorized paths/scope/repository repair, a product or architecture decision, unavailable required environment/tool/access, unsafe runtime ownership, or an external/baseline defect with no authorized in-gate resolution. Codex preserves work, posts a blocker, and stops.

A failed prerequisite build may stop dependent tests from running against stale output. That does not stop the implementation session when the prerequisite can be repaired in-scope.

A gate body must not convert every required verification failure into a blocker with blanket wording such as `stop on required verification failure`. Stop conditions describe the unresolved reason further work is unsafe or unauthorized.

The frozen gate may narrow repair authority further, but it should not contradict this distinction by treating an ordinary self-introduced implementation defect as an external blocker. If an older frozen gate does contain such contradictory blanket wording, Codex follows that historical work order; the orchestrator should correct future gate drafting rather than silently rewrite frozen history.

## State model

```text
DRAFT -> READY -> ACTIVATED -> IN_PROGRESS -> EVIDENCE_POSTED -> UNDER_REVIEW
                                                               |
                                   +---------------------------+------------------+
                                   |                           |                  |
                         CORRECTION_REQUIRED                  PASS       VERIFICATION_BLOCKED
                                   |
                              IN_PROGRESS
```

SUPERSEDED and CANCELLED may occur through authorized state records.

A READY gate remains READY when the human has not supplied the current ChatGPT thread ID. Missing routing information is not grounds to publish a partial activation.

A repairable verification failure remains `IN_PROGRESS`; it does not become `VERIFICATION_BLOCKED` merely because a build or test initially failed.

## Correction invariants

Keep the original gate review base fixed. A correction starts from the reviewed prior ending SHA/baseline and authorizes only the narrow repair.

Every new executable correction requires a human-supplied current reviewer thread marker. Codex copies it into the next evidence/blocker. Without that marker, do not publish the correction trigger.

## Independence

Independence requires fresh remote inspection, not a different GitHub username. The implementing Codex session cannot accept its own work.

A review transport waking the human-selected ChatGPT conversation does not weaken independence because the reviewer still re-fetches and verifies the remote case itself.
