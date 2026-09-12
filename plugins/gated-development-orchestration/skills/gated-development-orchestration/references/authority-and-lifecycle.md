# Authority and Lifecycle Reference

Use when defining gate authority, freezing/hashing work orders, interpreting state, corrections, routing metadata, verification failures, runtime overrides, plugin authority, bounded incidental repair, or acceptance.

## Artifact authority

| Artifact | Authority |
|---|---|
| Source-of-truth document | Feature meaning, behavior, architecture, ownership, non-goals, gate sequence |
| Parent issue | Overall tracking and accepted checkpoints |
| Frozen gate body | Initial product/repository work order |
| Activation comment | Execution authorization/trigger for current gate; establishes the human-supplied routing thread; optional per-round runtime override |
| Correction-required comment | Independent failed-review decision and narrow correction authorization/trigger; reuses the gate route unless the human explicitly replaces it; optional per-round runtime override |
| Current installed `gated-development-orchestration@aquanuity` plugin | Current workflow mechanics for orchestration, implementation, evidence, correction, blocker handling, and review |
| Commits and full gate diff | Actual implementation truth |
| Codex evidence/blocker | Implementer report; never acceptance |
| Independent review | PASS, correction-required, verification-blocked |
| Launcher records | Delivery/runtime facts only |
| Artifact bundle and publisher receipt | Supporting execution bytes and publication identity; never independent acceptance or a new work order |
| ChatGPT thread routing marker | Human-supplied at activation and reused through the gate; review transport destination only, no product authority |
| Chat | Discussion/human decisions until written to durable GitHub/source records |

## Version meanings

- Skill package version: the version currently installed when a role acts; **not frozen by the gate**
- Plugin identity: `gated-development-orchestration@aquanuity`
- Marker version: e.g. `activation:v1`, `review:v2`
- Work-order version: gate execution/correction sequence
- Checkpoint identity: CP1, CP2, etc.
- Thread-routing marker version: `chatgpt-thread:v1`

These are independent.

## Plugin authority and non-freezing rule

The workflow plugin evolves independently of a feature gate.

Freeze the feature/product/repository case, not the Gated Development Orchestration package version or source location.

Rules:

- Do not make a plugin version, marketplace repo SHA, package commit, or historical `SKILL.md` URL controlling authority in a gate/activation/correction.
- A historical line such as `Gated Development Orchestration 1.4.0, nivlekwat/myPlugins@...` is provenance only under the current contract. It does not require using that historical package.
- Do not block because historical case text names a different plugin version/source from the current installation.
- Use the current installed `gated-development-orchestration@aquanuity` plugin for workflow mechanics each time orchestration, implementation, correction, or review occurs.
- A later plugin version may change workflow mechanics for subsequent actions on an open gate, but it does not rewrite the gate's product source pin, scope/path limits, branch/baseline, acceptance criteria, or historical records.
- Report the actual installed plugin version/source used when observable, but treat that as execution/review provenance only.

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

Executable authority still comes from activation/correction plus the controlling case. A routing UUID is not a per-round approval token.

The human supplies the current ChatGPT thread UUID at activation. Ask when it has not been supplied; without a valid UUID, do not publish the activation. The activation establishes the gate's routing thread for subsequent evidence, blocker, review, and correction cycles.

Every executable correction must include exactly one marker, but normally **reuses the established gate routing ID without asking the human again**. Resolve it from the applicable activation/correction chain and verify that the reviewed evidence copied its trigger. Do not take an arbitrary comment or another gate's route as authority.

Only an explicit human request supplying a replacement destination changes the route. Record that request and the replacement marker in the next applicable activation/correction, without editing prior comments or adding a second marker. From that work order onward, later evidence/blocker and corrections use the replacement. Merely reviewing in another chat is not a routing change. Evidence or a stale report cannot independently select or restore a destination.

If the gate route is missing or conflicting, recover it from the applicable chain before asking for clarification. If it cannot be established, withhold the executable correction and ask the human; never fabricate a route or silently fall back. Do not infer the thread ID from Codex metadata or substitute a fixed/default destination.

## Runtime override authority

Runtime reasoning effort is execution metadata, not product authority.

The canonical optional executable field is:

```text
- Execution reasoning effort: `<minimal|low|medium|high|xhigh|max>`
```

Rules:

- omission means the runner default `max`;
- exactly one override field is allowed per executable activation/correction;
- the override applies only to that execution round;
- later corrections do not inherit an earlier override;
- duplicate or unsupported values are malformed delivery;
- changing reasoning effort does not broaden scope, paths, architecture, repository operations, verification, or acceptance authority.

Thread routing persists across correction rounds; reasoning-effort overrides do not. Do not confuse these two contracts.

## Freezing and history

The gate body may be edited while draft/ready. On activation, treat the controlling product/repository body and activation as frozen according to the case. Preserve old comments. Use new comments for evidence, review, correction, amendment, supersession, and cancellation.

The plugin version/source is explicitly outside that freeze. A gate body hash may physically include a historical workflow-version line, but that line is non-authoritative workflow provenance under the current plugin contract.

Do not rewrite history merely to update plugin metadata or add a missing thread marker. Historical records remain historical. New actions use the current installed plugin.

Historical pre-1.4.1 executions that lack routing metadata may require manual review. That historical exception does not authorize creating new markerless activations/corrections. An open gate with a valid established route may reuse it under the current contract; the obsolete requirement to resubmit an ID for each correction is not a blocker. Record an explicit human routing change prospectively, not by editing frozen history.

## Gate types

### Implementation/documentation

Require remotely reviewable ending evidence according to the case. Codex implements, verifies, repairs authorized self-introduced defects, re-verifies, commits, normally pushes as authorized, posts evidence, and stops.

### Analysis-only

No repository writes, commits, or pushes. Review baseline/evidence/no-write compliance.

## Primary paths and incidental repair authority

For implementation/documentation gates and their corrections, the planned file list is the **primary authorized path boundary**. The current plugin authorizes the minimal adjacent repair outside it only when every condition in [Bounded incidental repair](../SKILL.md#bounded-incidental-repair) holds: directly necessary for active-gate verification, introduced or exposed by that work, mechanical/low-risk, smallest coherent change, no semantic/architecture/contract/dependency/policy expansion, no protected-path violation, and meaningful re-verification.

A qualifying repair remains `IN_PROGRESS` in the same execution and work-order version. It needs neither a new activation nor a correction dispatch. Record the pre-edit diagnosis, disclose every off-list path and its verification in evidence, and retain independent review. Qualification is a bounded implementation decision, not permission to change acceptance criteria or self-approve.

Omission from the primary list, or a generic legacy `maximum path boundary` heading, is not alone a blocker. Explicit case-specific read-only/protected/no-touch restrictions, human prohibitions on incidental repairs, analysis-only/no-write status, and repository-operation restrictions remain binding. These require explicit human authorization to change. Evaluate cumulative scope; do not chain small repairs into a redesign or unrelated cleanup.

The allowance does not change frozen product intent, product source commits, branch/baseline, acceptance criteria, or history. Do not edit a frozen body/hash to conceal incidental changes. If a proposed repair fails any qualification or its safety cannot be established, stop and report the specific boundary or decision needed rather than merely saying the file was not pre-approved.

## Verification failures and blocker authority

Verification exists to find defects in the active work. Therefore a required build/test/check failure is not itself a state transition to BLOCKED.

Codex owns first-line diagnosis while implementing:

- **Authorized repair:** an active implementation defect within primary paths, or an off-list repair satisfying every bounded incidental repair condition above. Codex fixes it and reruns verification in the same execution; no new authorization or correction comment is needed. Off-list repairs must be disclosed.
- **True blocker:** fails the incidental-repair qualification and cannot be resolved without protected-path changes, unauthorized scope/repository repair, a product or architecture decision, unavailable required environment/tool/access, unsafe runtime ownership, or an external/baseline defect with no authorized in-gate resolution. Codex preserves work, posts a blocker, and stops.

A failed prerequisite build may stop dependent tests from running against stale output. That does not stop the implementation session when the prerequisite can be repaired in-scope.

A gate body must not convert every required verification failure into a blocker with blanket wording such as `stop on required verification failure`. Stop conditions describe the unresolved reason further work is unsafe or unauthorized.

If historical gate wording conflicts with a newer workflow mechanic, use the current installed plugin for generic workflow behavior while preserving the gate's product-specific authority. Do not use an obsolete plugin pin to revive superseded workflow mechanics.

## Evidence publication and storage authority

Generated logs/reports are temporary execution artifacts, not default repository deliverables. Follow [Execution artifacts and publication](execution-artifacts.md): Codex owns the authored report and selected/redacted bundle; the configured publisher uploads and posts it without taking product or review authority. A valid launcher request authorizes that publication handoff, not new implementation.

Publisher dispatch/queue or upload alone does not mean `EVIDENCE_POSTED`. Only a confirmed terminal GitHub comment does. Publication transport failure does not authorize another implementation/correction cycle; inspect existing receipts and retry publication only. The original gate identity, review base, routing chain, and acceptance criteria remain unchanged.

Keep concise issue evidence and acceptance durable. Raw artifact retention is 30 days as configured and subject to repository limits; do not delete on PASS or commit logs to defeat expiry. Review raw material only when needed for material verification, without weakening required proof. Local Windows logs have separate cleanup authority; never infer permission to delete source/project/active-run data from artifact expiry.

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

Every executable correction carries the established gate routing marker, reused unchanged without fresh human input unless the human explicitly replaces the destination. Codex copies that correction's exact marker into the next evidence/blocker, and subsequent corrections continue using it. Withhold a correction only when its routing cannot be established, not merely because the human has not repeated the UUID for that round.

A correction may also carry its own `Execution reasoning effort` override. It applies only to that correction round and must be restated on any later correction that needs a non-default effort.

Do not freeze/inherit a plugin version/source in a correction. Use the current installed plugin.

## Independence

Independence requires fresh remote inspection, not a different GitHub username. The implementing Codex session cannot accept its own work.

A review transport waking the human-selected ChatGPT conversation does not weaken independence because the reviewer still re-fetches and verifies the remote case itself.
