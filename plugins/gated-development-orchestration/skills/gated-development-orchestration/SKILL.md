---
name: gated-development-orchestration
description: Coordinate checkpoint development through pinned source documents, frozen GitHub work orders, local Codex execution, GitHub-routed return review, and independent ChatGPT review. Use for gate creation, activation, implementation, evidence review, bounded corrections, and review routing. Choose the current role before acting; reading or reviewing this skill does not authorize a checkpoint or a GitHub write.
compatibility: Requires access to the complete skill references and relevant GitHub sources. Implementation requires an authorized local git environment and configured tools. ChatGPT Chat orchestration does not require access to the user's local filesystem.
metadata:
  version: "1.4.1"
  workflow: "github-codex-gated-development"
---

# Gated Development Orchestration

## Purpose and role selection

Use one shared workflow contract, not separately maintained Codex and ChatGPT variants.

**ChatGPT Chat / Pro normally acts as orchestrator and independent reviewer. Local Codex normally acts as implementer.**

Select the role from the current human request and authorized execution context:

- launcher-delivered activation/correction -> implementer
- routed evidence review request -> reviewer
- planning/discussion -> orchestrator/read-only until write authority exists

A checkpoint implementation run must never promote itself to its own independent reviewer.

| Role | Owns | Must not do |
|---|---|---|
| Human / product owner | Intent, scope, architecture decisions, activation authority, cancellation and overrides; supplies the current ChatGPT thread ID for executable activation/correction routing | Nothing in this skill delegates final product authority away from the human |
| Orchestrator / reviewer | Source tracing, source-of-truth documents, issue topology, activation, fresh remote review, correction orders, acceptance records, review routing | Treat Codex summaries or Actions success as proof; silently replace ChatGPT review with Codex/Work/API review; invent or infer a thread ID |
| Codex implementer | Exact work-order preflight, bounded implementation/analysis, verification, authorized commit/push, evidence or blocker publication | Self-approve, activate the next gate, directly invoke the ChatGPT bridge, invent/change a ChatGPT thread ID |
| Implementation launcher | Validate basic delivery and start Codex | Decide scope, branch policy, architecture, gate validity, acceptance, or repository repair |
| Review transport | Recognize review-target comments and route them to the declared ChatGPT thread | Judge evidence, issue PASS/correction, or reinterpret the case |

GitHub is the durable coordination record. Comment markers define message type and routing intent; the thread marker identifies a ChatGPT destination only.

## References to load

- [Authority and lifecycle](references/authority-and-lifecycle.md)
- [Gate and issue templates](references/gate-issue-templates.md)
- [Evidence and review](references/evidence-and-review.md)
- [Automation handoff](references/automation-handoff.md)
- [Model selection](references/model-selection.md)

Read the references required for the current phase. Record the skill version and source actually used when reporting an automated run or review.

## Core invariants

1. The pinned source-of-truth defines feature meaning and architecture. The frozen gate body plus matching activation authorize only the current slice.
2. Keep checkpoints as checkpoints. Corrections stay in the same gate only while objective, architecture and maximum path boundary remain valid.
3. A valid activation is also the execution trigger. A valid correction work order is also the correction trigger. No extra dispatch comment is required.
4. PASS accepts the current checkpoint; it does not itself authorize an unactivated successor.
5. Codex implements and reports; ChatGPT independently inspects remote evidence. Codex never issues its own independent PASS.
6. Preserve the original gate starting SHA/review base through corrections. Only correction execution start changes.
7. Implementation/documentation: verify -> commit -> normal authorized push -> confirm remote containment -> evidence -> stop.
8. Analysis-only: no repository writes/commit/push.
9. Do not merge, rebase, pull, reset, clean, force-push, switch worktrees, create branches, or repair repository state unless the case explicitly authorizes that operation.
10. Discovered cleanup/defects/future work are not automatically authorized.
11. Launch success, CLI exit, a posted URL, or evidence is not acceptance.
12. Preserve history; never fabricate SHAs, hashes, issue numbers, tool outcomes, credentials, runtime settings, verification, or ChatGPT thread IDs.
13. The implementation runner is transport-only. It must not add case rules that are absent from the case/skill.
14. The ChatGPT thread marker is routing metadata only. It does not grant scope, activation, correction, or acceptance authority.
15. Codex never invokes the ChatGPT return bridge. It posts GitHub evidence/blocker and stops.
16. Every new executable activation and correction requires exactly one human-supplied current ChatGPT thread ID.
17. If the human has not supplied that thread ID for the executable activation/correction, ChatGPT must ask for it and must not publish the executable comment until it is provided.
18. Missing routing metadata is fail-closed for new work. Do not silently downgrade a new activation/correction to manual return review.
19. Never use a Codex session/thread ID as a ChatGPT conversation destination.

## ChatGPT thread routing

Every new executable activation or correction requires exactly one:

```text
<!-- gated-development:chatgpt-thread:v1 id=<UUID> -->
```

### Human-supplied routing requirement

The thread ID comes from the human.

Before publishing an executable activation or correction:

1. If the human already supplied a valid current ChatGPT thread UUID for this exact executable comment in the current conversation, use it.
2. Otherwise ask the human to provide the current ChatGPT thread ID.
3. Validate only the UUID shape; do not reinterpret, normalize to another ID, or replace it.
4. If the human does not provide a valid thread ID, stop. The gate may remain READY, but it cannot be activated and a correction cannot be dispatched.

Do not attempt to discover the thread ID from Codex metadata, project identifiers, prior GitHub comments, another ChatGPT conversation, a fixed default, or a previously successful test.

### Placement

Activation:

```text
<!-- gated-development:activation:v1 -->
<!-- gated-development:chatgpt-thread:v1 id=<human-supplied current ChatGPT thread UUID> -->
```

Correction:

```text
<!-- gated-development:review:v2 status=correction-required -->
<!-- gated-development:chatgpt-thread:v1 id=<human-supplied current reviewer ChatGPT thread UUID> -->
```

Rules:

- Put the marker immediately after the executable activation/correction marker.
- Do not require it in the frozen issue body.
- Codex copies the exact marker unchanged into terminal evidence or blocker.
- Codex must not invent, infer, normalize, substitute, or select a thread ID.
- PASS and verification-blocked review comments do not need a thread marker because they do not launch implementation.
- A correction-required comment requires a new human-supplied current reviewer thread ID; do not automatically reuse the original activation ID unless the human explicitly supplies that same ID.

### Malformed or missing routing

Under skill version 1.4.1, a newly received activation/correction without exactly one valid thread marker is not a valid executable work order.

The implementer must not perform checkpoint/correction work from that malformed trigger. It should publish a concise GitHub blocker when possible and stop. It must not invent a routing marker.

Historical pre-1.4.1 records remain historical and are not edited merely to retrofit routing metadata.

## Orchestrator path

### Define and prepare

Inspect repository behavior and architecture. Separate current behavior from desired behavior. Define ownership, boundaries, non-goals, verification, and independently reviewable checkpoints.

For strict bridge/refactor work, existing behavior is the acceptance oracle unless the gate explicitly authorizes behavior change.

Prepare the gate using the exact templates. Keep scope, source pin, branch/baseline, verification and stop conditions explicit.

### Activate

After human authorization and prerequisite readiness:

1. finalize the exact gate body;
2. fetch the final GitHub body and hash it where the case requires;
3. if the human has not already supplied the current ChatGPT thread ID for this activation, ask for it;
4. validate the supplied UUID shape;
5. publish a new activation comment containing the activation marker followed immediately by the supplied thread routing marker;
6. let the configured launcher perform the handoff.

If step 3/4 is not satisfied, **do not activate**. Keep the gate READY and tell the human that activation requires the current ChatGPT thread ID.

Posting the activation is the real handoff. Do not append another dispatch comment.

## Implementer path

### Revalidate the case

Read repository instructions, this skill/references, the exact triggering comment, relevant issue history, pinned source, and actual repository state.

The launcher only transported the instruction. Codex owns semantic preflight under the case. If the case authorizes bootstrap branch/worktree creation or other repository setup, follow the case; if not, do not invent it.

For a v1.4.1 activation/correction, verify that the triggering comment contains exactly one valid ChatGPT thread marker. Missing or multiple markers block execution.

Stop and report when the trigger is edited/mismatched, superseded/cancelled/accepted, routing is malformed, scope conflicts, repository state violates the case, or required evidence cannot be established.

### Execute

Perform only the authorized checkpoint/correction. Run exact required verification. Preserve native behavior for bridge/refactor work. Review the complete gate range and correction delta as applicable.

### Publish

Post one terminal evidence or blocker using the standard markers.

Copy the exact triggering ChatGPT thread marker unchanged as the second line of the evidence/blocker comment.

After publication, return the report URL and stop. **Do not call the ChatGPT return bridge yourself.**

## Reviewer path

A routed review request identifies an issue/evidence comment but does not prove the evidence.

Independently fetch:

- gate issue
- exact evidence comment
- activation/correction
- pinned source
- remote ending commit/branch
- full gate diff and correction delta
- required verification evidence
- acceptance criteria

Issue one of:

- PASS
- correction-required
- verification-blocked

For correction-required:

1. prepare the complete bounded correction work order;
2. if the human has not already supplied the current reviewer ChatGPT thread ID for this correction, ask for it;
3. do not publish the executable correction until a valid UUID is supplied;
4. include the supplied routing marker immediately after the correction executable marker.

Do not issue a correction marker merely to solve delivery/access/publication problems.

## Runtime configuration

Automated AquaTwin Codex execution defaults to `model_reasoning_effort=max` unless the executable case explicitly supplies a supported reasoning-effort override.

Runtime configuration is separate from product authority. The runner may apply the default mechanically; it must not infer which reasoning level a case deserves.

## Terminal outcomes

Codex evidence:

```text
Evidence posted. Awaiting independent review. Not PASS.
Report: <actual evidence URL>
```

Codex blocker:

```text
Blocked: <concise reason>. Not PASS.
Report: <actual blocker URL>
```

Publication failure:

```text
Report publication blocked. No GitHub comment was posted. Not PASS.
Local report: <actual saved path or unavailable>
```

Activation/correction routing missing:

```text
BLOCKED — current ChatGPT thread ID is required.
Executable activation/correction was not published.
```

Reviewer outcomes:

- `PASS — accepted commit <SHA>`
- `PASS — analysis evidence <reference>`
- `NOT PASS — correction required`
- `VERIFICATION BLOCKED`
