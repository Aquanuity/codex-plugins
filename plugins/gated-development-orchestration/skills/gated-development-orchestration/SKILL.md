---
name: gated-development-orchestration
description: Coordinate checkpoint development through pinned product source documents, frozen GitHub work orders, local Codex execution, GitHub-routed return review, and independent ChatGPT review. Use for gate creation, activation, implementation, evidence review, bounded corrections, and review routing. Choose the current role before acting; reading or reviewing this skill does not authorize a checkpoint or a GitHub write.
compatibility: Requires access to the complete skill references and relevant GitHub sources. Implementation requires an authorized local git environment and configured tools. ChatGPT Chat orchestration does not require access to the user's local filesystem.
metadata:
  version: "1.4.4"
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
| Codex implementer | Exact work-order preflight, bounded implementation/analysis, verification, in-scope repair of its own implementation, authorized commit/push, evidence or blocker publication | Self-approve, activate the next gate, directly invoke the ChatGPT bridge, invent/change a ChatGPT thread ID |
| Implementation launcher | Validate basic delivery and start Codex | Decide scope, branch policy, architecture, gate validity, acceptance, verification diagnosis, or repository repair |
| Review transport | Recognize review-target comments and route them to the declared ChatGPT thread | Judge evidence, issue PASS/correction, or reinterpret the case |

GitHub is the durable coordination record. Comment markers define message type and routing intent; the thread marker identifies a ChatGPT destination only.

## Current installed plugin authority

The workflow plugin identity is **`gated-development-orchestration@aquanuity`**. Its version/source is intentionally **not frozen into a gate**.

For orchestration, implementation, correction, blocker handling, and independent review, use the currently installed Gated Development Orchestration plugin and its current references at the time that role acts.

Rules:

- Freeze product intent, product source-of-truth commits, branch/baseline, scope/path boundaries, acceptance criteria, and executable work orders as required by the case.
- Do **not** freeze a Gated Development Orchestration version, marketplace repository SHA, plugin package commit, or historical `SKILL.md` URL into the controlling case.
- Do **not** copy a predecessor gate's plugin version/source into a new gate or activation.
- If historical gate/activation/evidence text names an older Gated Development Orchestration version or repository pin, treat that text as provenance only. It does not override the currently installed plugin and is not a reason to fetch/use the historical skill.
- A plugin update may change workflow mechanics for later actions on an already-open gate. It does not rewrite or broaden the gate's frozen product scope, product source pin, repository authority, acceptance criteria, or prior history.
- Report the actual installed plugin version/source used for implementation or review when it is observable, for traceability only. That report is not a work-order pin.
- If the current installed plugin is unavailable in an execution surface that requires it, do not silently substitute an old repository copy; report the missing workflow capability.

This separates **product/work-order freezing** from **workflow-plugin evolution**.

## References to load

- [Authority and lifecycle](references/authority-and-lifecycle.md)
- [Gate and issue templates](references/gate-issue-templates.md)
- [Evidence and review](references/evidence-and-review.md)
- [Automation handoff](references/automation-handoff.md)
- [Model selection](references/model-selection.md)

Read the references required for the current phase from the currently installed plugin. Record the actual installed skill version/source used when reporting an automated run or review when observable.

## Core invariants

1. The pinned **product** source-of-truth defines feature meaning and architecture. The frozen gate body plus matching activation authorize only the current slice.
2. The Gated Development Orchestration plugin version/source is not gate authority and is not frozen; use the currently installed `gated-development-orchestration@aquanuity` workflow contract.
3. Keep checkpoints as checkpoints. Corrections stay in the same gate only while objective, architecture and maximum path boundary remain valid.
4. A valid activation is also the execution trigger. A valid correction work order is also the correction trigger. No extra dispatch comment is required.
5. PASS accepts the current checkpoint; it does not itself authorize an unactivated successor.
6. Codex implements and reports; ChatGPT independently inspects remote evidence. Codex never issues its own independent PASS.
7. Preserve the original gate starting SHA/review base through corrections. Only correction execution start changes.
8. Implementation/documentation: implement -> verify -> repair in-scope failures -> re-verify -> commit -> normal authorized push -> confirm remote containment -> evidence -> stop.
9. Analysis-only: no repository writes/commit/push.
10. Do not merge, rebase, pull, reset, clean, force-push, switch worktrees, create branches, or repair repository state unless the case explicitly authorizes that operation.
11. Discovered cleanup/defects/future work are not automatically authorized.
12. Launch success, CLI exit, a posted URL, or evidence is not acceptance.
13. Preserve history; never fabricate SHAs, hashes, issue numbers, tool outcomes, credentials, runtime settings, verification, or ChatGPT thread IDs.
14. The implementation runner is transport-only. It must not add case rules that are absent from the case/current plugin.
15. The ChatGPT thread marker is routing metadata only. It does not grant scope, activation, correction, or acceptance authority.
16. Codex never invokes the ChatGPT return bridge. It posts GitHub evidence/blocker and stops.
17. Every new executable activation and correction requires exactly one human-supplied current ChatGPT thread ID.
18. If the human has not supplied that thread ID for the executable activation/correction, ChatGPT must ask for it and must not publish the executable comment until it is provided.
19. Missing routing metadata is fail-closed for new work. Do not silently downgrade a new activation/correction to manual return review.
20. Never use a Codex session/thread ID as a ChatGPT conversation destination.
21. A required build/test/verification failure is not automatically a blocker. Diagnose its cause first.
22. If the active implementation introduced the failure and the repair fits the authorized scope, paths, architecture, and repository operations, Codex must repair it and rerun the failed verification.
23. A dependent verification step may pause after its prerequisite build/check fails, but the implementation session continues while an in-scope repair remains available.
24. Stop and report a blocker only when resolving the failure requires unauthorized scope/path/repository operations, a product or architecture decision, unsafe runtime ownership, unavailable required tool/environment/access, or an external/baseline defect that cannot be resolved within the active gate.
25. Runtime reasoning effort is per executable activation/correction. The standardized override field is `- Execution reasoning effort: <minimal|low|medium|high|xhigh|max>`; omission uses the runner default `max`.

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

Under the current plugin contract, a newly received activation/correction without exactly one valid thread marker is not a valid executable work order.

The implementer must not perform checkpoint/correction work from that malformed trigger. It should publish a concise GitHub blocker when possible and stop. It must not invent a routing marker.

Historical pre-1.4.1 records remain historical and are not edited merely to retrofit routing metadata.

## Orchestrator path

### Define and prepare

Inspect repository behavior and architecture. Separate current behavior from desired behavior. Define ownership, boundaries, non-goals, verification, and independently reviewable checkpoints.

For strict bridge/refactor work, existing behavior is the acceptance oracle unless the gate explicitly authorizes behavior change.

Prepare the gate using the exact templates. Keep scope, product source pin, branch/baseline, verification and stop conditions explicit. Refer to the workflow as the current installed `gated-development-orchestration@aquanuity`; do not write a plugin version/repository SHA pin into the case.

When drafting stop conditions, do **not** use a blanket rule such as `stop on required verification failure`. Required verification failures caused by the active implementation are expected development feedback and remain repairable inside the gate when the repair is authorized. Stop conditions should describe the unresolved condition that makes further in-scope work impossible or unauthorized.

### Activate

After human authorization and prerequisite readiness:

1. finalize the exact gate body;
2. fetch the final GitHub body and hash it where the case requires;
3. if the human has not already supplied the current ChatGPT thread ID for this activation, ask for it;
4. validate the supplied UUID shape;
5. if this activation needs a non-default reasoning effort, include exactly one standardized `Execution reasoning effort` field described under Runtime configuration; otherwise omit it and use `max`;
6. publish a new activation comment containing the activation marker followed immediately by the supplied thread routing marker;
7. let the configured launcher perform the handoff.

Do not add or inherit a frozen plugin version/source line in the activation. If useful, identify the workflow only as the current installed `gated-development-orchestration@aquanuity`.

If step 3/4 is not satisfied, **do not activate**. Keep the gate READY and tell the human that activation requires the current ChatGPT thread ID.

Posting the activation is the real handoff. Do not append another dispatch comment.

## Implementer path

### Revalidate the case

Use the currently installed Gated Development Orchestration plugin and its current references. Read repository instructions, the exact triggering comment, relevant issue history, pinned **product** source, and actual repository state.

If historical case text names an older Gated Development Orchestration version/repository/commit, do not treat that historical workflow reference as controlling and do not fetch the old skill merely because it appears in the frozen case. It is provenance only. The current installed plugin governs workflow mechanics; the frozen case continues to govern feature scope and repository authority.

The launcher only transported the instruction. Codex owns semantic preflight under the case/current plugin. If the case authorizes bootstrap branch/worktree creation or other repository setup, follow the case; if not, do not invent it.

Verify that the triggering comment contains exactly one valid ChatGPT thread marker. Missing or multiple markers block execution.

Stop and report when the trigger is edited/mismatched, superseded/cancelled/accepted, routing is malformed, scope conflicts, repository state violates the case, or a true blocker under the verification rules below is established. **Do not block because a historical gate workflow version/source differs from the current installed plugin.**

### Execute

Perform only the authorized checkpoint/correction. Preserve native behavior for bridge/refactor work. Review the complete gate range and correction delta as applicable.

Run the required verification and classify failures before deciding whether to stop:

1. **Active implementation defect** — the current gate's code/documentation caused the failure and the repair is within authorized scope/path/architecture. Fix it, then rerun the failed prerequisite and its dependent checks. Do not publish a blocker merely because the first verification attempt failed.
2. **Baseline/external defect, but locally resolvable without unauthorized change** — use an already-authorized valid workaround only when the case permits it and report it truthfully. Do not hide baseline defects.
3. **True blocker** — resolution requires an unauthorized path or behavior, architecture/product decision, repository repair outside the case, unavailable required tool/environment/access, unsafe runtime takeover, or an external/baseline defect with no authorized resolution. Preserve work, report the blocker, and stop.

When a build fails, do not run dependent tests against stale binaries. Repair and rebuild first when the failure is in-scope. Stopping the dependent sequence is not the same as stopping the implementation session.

### Publish

Post one terminal evidence or blocker using the standard markers.

Copy the exact triggering ChatGPT thread marker unchanged as the second line of the evidence/blocker comment.

Evidence should report final required verification plus any material failed attempts that affected diagnosis. A transient self-introduced compile/test failure that was repaired and reverified is development history, not a blocker.

Report the actual current installed plugin version/source used when observable. Do not restate a historical case pin as the controlling skill.

After publication, return the report URL and stop. **Do not call the ChatGPT return bridge yourself.**

## Reviewer path

Use the currently installed Gated Development Orchestration plugin. A routed review request identifies an issue/evidence comment but does not prove the evidence.

Independently fetch:

- gate issue
- exact evidence comment
- activation/correction
- pinned product source
- remote ending commit/branch
- full gate diff and correction delta
- required verification evidence
- acceptance criteria

Historical skill-version/source references in gate or evidence text are provenance, not review authority. Review under the current installed plugin while preserving the gate's frozen product/work-order authority.

Issue one of:

- PASS
- correction-required
- verification-blocked

For correction-required:

1. prepare the complete bounded correction work order;
2. if the human has not already supplied the current reviewer ChatGPT thread ID for this correction, ask for it;
3. do not publish the executable correction until a valid UUID is supplied;
4. if this correction round needs a non-default reasoning effort, include exactly one standardized `Execution reasoning effort` field; otherwise omit it and use `max`;
5. include the supplied routing marker immediately after the correction executable marker.

Do not freeze or inherit a plugin version/source in the correction comment.

Do not issue a correction marker merely to solve delivery/access/publication problems.

## Runtime configuration

Automated AquaTwin Codex execution defaults to:

```text
model_reasoning_effort=max
```

unless the executable activation/correction contains exactly one supported per-round override field.

### Per-round reasoning-effort override

Use this exact standardized field in the executable activation or correction comment:

```text
- Execution reasoning effort: `<minimal|low|medium|high|xhigh|max>`
```

Examples:

```text
- Execution reasoning effort: `xhigh`
- Execution reasoning effort: `high`
- Execution reasoning effort: `max`
```

Rules:

- Omit the field to use the runner default `max`.
- Exactly one field is allowed in an executable activation/correction.
- Supported values are `minimal`, `low`, `medium`, `high`, `xhigh`, and `max`.
- The override applies only to that single activation/correction execution.
- A correction does not inherit an earlier activation or correction override. If a later correction needs a different effort, state the field again in that correction comment.
- Duplicate fields or unsupported values make the delivery malformed; do not guess or silently fall back.
- This field changes runtime reasoning effort only. It does not grant scope, architecture, repository, correction, or acceptance authority.

The launcher records the resolved effort and whether it came from `runner-default` or `case-override`, then applies it to the Codex execution. Report actual/exposed runtime configuration truthfully; do not infer success from the requested effort.

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
