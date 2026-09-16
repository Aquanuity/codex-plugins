---
name: gated-development-orchestration
description: Coordinate discovery, checkpoint development, local Codex execution, routed return-to-ChatGPT, and independent implementation review. Use for parent planning, discovery checkpoints, source-of-truth creation/amendment, implementation gate creation/activation, evidence review, bounded corrections, surprise-discovery routing, and review return. Choose the current role before acting; reading this skill does not itself authorize a GitHub write or checkpoint execution.
compatibility: Requires access to the complete skill references and relevant GitHub sources. Codex implementation requires an authorized local git environment and configured tools. ChatGPT Chat orchestration/review does not require access to the user's local filesystem.
metadata:
  version: "2.0.0"
  workflow: "github-codex-gated-development"
---

# Gated Development Orchestration

## Purpose

Use one shared workflow contract across ChatGPT orchestration/discovery/review and Codex implementation.

The v2 division of labor is intentional:

```text
ChatGPT: discover -> specify -> decompose -> independently judge
Codex: execute -> verify -> repair implementation defects -> report
Unexpected material uncertainty: return to ChatGPT discovery, not upward through Codex reasoning tiers
```

**ChatGPT Chat / Pro normally owns feature discovery, source-of-truth work, checkpoint preparation, and independent implementation review. Local Codex normally owns execution of discovery-complete implementation/documentation work orders.**

Discovery is a checkpoint type/mode, not a checkpoint number. CP1 is often discovery, but CP1 is not required to be discovery and discovery may occur anywhere later in the feature.

## Role selection

Select the role from the current human request and execution context:

- parent/feature discussion, source tracing, discovery, checkpoint design -> ChatGPT orchestrator/discovery;
- launcher-delivered implementation activation/reactivation/correction -> Codex implementer;
- routed normal implementation evidence -> ChatGPT independent reviewer;
- routed evidence with `Submission outcome: DISCOVERY REQUIRED` -> ChatGPT discovery orchestrator, not normal PASS/correction review.

| Role | Owns | Must not do |
|---|---|---|
| Human / product owner | Product intent, material architecture decisions, discovery approval, source-of-truth approval, activation, cancellation, explicit routing/runtime overrides | Nothing in this workflow removes final product authority from the human |
| ChatGPT orchestrator / discovery | Parent issue shaping, repository/native-behavior discovery, source-of-truth drafting/amendment, checkpoint decomposition, execution-readiness, activation/reactivation, discovery child checkpoints | Pretend its own discovery proposal is human-approved product truth; hide material uncertainty inside an implementation gate |
| ChatGPT independent reviewer | Fresh remote implementation review, PASS/correction/verification-blocked, correction work orders, discovery detection during review | Treat Codex summaries/Actions success/prior chat assumptions as proof |
| Codex implementer | Exact work-order preflight, bounded implementation, verification, in-scope/incidental repair, authorized commit/push, routed evidence/blocker publication | Invent product/architecture decisions, self-approve, create/approve discovery outcomes, change ChatGPT route, self-relaunch to change reasoning effort |
| Implementation launcher | Validate delivery shape and start Codex with selected runtime effort | Decide scope, architecture, discovery sufficiency, acceptance, repair qualification, or reasoning-tier appropriateness |
| Artifact publisher | Upload prepared bundle and post authored report | Implement, decide acceptance/discovery, change routing, or wait for ChatGPT |
| Review transport | Route eligible evidence to the declared ChatGPT thread | Judge evidence or reinterpret the case |

GitHub remains the durable coordination record.

## Workflow source by execution surface

The workflow identity is **`gated-development-orchestration@aquanuity`**. Its version/source is not frozen into product gates.

- **Codex:** load the currently installed plugin's `SKILL.md` and required references. Do not replace the installed plugin with a historical repository copy because a gate mentions one.
- **Ordinary ChatGPT Chat / Pro:** resolve current `Aquanuity/codex-plugins` `main`, then load the package manifest, this `SKILL.md`, and phase-required references from that same commit.

For ChatGPT independent implementation review, load at minimum:

- `authority-and-lifecycle.md`
- `evidence-and-review.md`
- `automation-handoff.md`
- `execution-artifacts.md`
- `gate-issue-templates.md` when authoring a correction/reactivation record
- `model-selection.md` before authoring executable Codex work
- `discovery-checkpoints.md` whenever planned or surprise discovery is involved

Historical plugin version/source text is provenance only. Freeze product/work-order authority, not workflow package provenance.

## References

- [Authority and lifecycle](references/authority-and-lifecycle.md)
- [Discovery checkpoints and return-to-ChatGPT](references/discovery-checkpoints.md)
- [Gate and issue templates](references/gate-issue-templates.md)
- [Evidence and independent review](references/evidence-and-review.md)
- [Automation handoff](references/automation-handoff.md)
- [Model selection and runtime](references/model-selection.md)
- [Execution artifacts and publication](references/execution-artifacts.md)

Load the references required for the current phase. Report the actually loaded workflow version/source when implementation/review evidence calls for it.

## Core invariants

1. Human-approved product intent and the approved source-of-truth commit define feature meaning/architecture.
2. Discovery is not tied to CP1; any checkpoint may be `discovery` when material uncertainty must be resolved.
3. Foreseeable material discovery belongs in a discovery checkpoint before Codex implementation.
4. Unexpected material discovery during Codex execution returns to ChatGPT through routed `DISCOVERY REQUIRED` evidence; Codex does not solve missing product/architecture truth by selecting Max.
5. A discovery checkpoint/sub-checkpoint is normally executed by ChatGPT Extra High / Pro; material source-of-truth/product decisions require explicit human approval before controlling downstream work.
6. Codex implementation gates should be execution-ready before activation. Ordinary repository reading remains Codex work; material product/architecture/ownership/acceptance decisions do not.
7. Normal Codex implementation reasoning is `medium`. Escalate to `high`, `xhigh`, or `max` only for execution-ready technical difficulty under `model-selection.md` or explicit human instruction.
8. Every current Codex activation/reactivation/correction explicitly states one reasoning-effort field. Do not rely on omission except historical compatibility.
9. A valid activation/reactivation/correction is the Codex execution trigger. No generic dispatch comment is required.
10. Codex implements/reports; ChatGPT independently reviews remote implementation evidence. Codex never accepts its own work.
11. Preserve original implementation-gate review base through ordinary corrections and valid post-discovery reactivation. Supersede rather than disguise a materially different gate.
12. Implementation/documentation execution: preflight -> implement -> verify -> repair authorized failures -> reverify -> commit/push as authorized -> confirm remote containment -> publish evidence -> stop.
13. Analysis-only gates remain no-write.
14. Discovery gates may write designated source-of-truth/documentation only when the human authorizes those writes.
15. Do not merge, rebase, pull, reset, clean, force-push, switch worktrees, create branches, or repair repository state unless the case explicitly authorizes the operation.
16. Unrelated cleanup/defects/future work remain unauthorized. Necessary adjacent repairs must satisfy bounded incidental-repair rules.
17. Launch success, evidence publication, artifact upload, or CLI success is not PASS.
18. Preserve history; never fabricate SHAs, hashes, issue numbers, tool outcomes, routing IDs, runtime settings, approvals, or verification.
19. ChatGPT thread routing metadata grants no product/scope authority.
20. Every executable Codex activation/reactivation/correction requires exactly one valid ChatGPT route marker. Reuse the established route unless the human explicitly replaces it.
21. A failed required verification is not automatically a blocker. Diagnose first.
22. Repair implementation defects in-scope or through qualifying incidental repair and rerun verification.
23. Stop for true blockers or material discovery that cannot truthfully be resolved in the implementation lane.
24. Generated run logs/reports stay outside git unless explicitly required; use artifact publication.
25. Publication retries do not rerun implementation.

## Discovery checkpoints

Read [Discovery checkpoints and return-to-ChatGPT](references/discovery-checkpoints.md) whenever uncertainty is material.

### Planned discovery

When discovery is foreseeable, create a gate with:

```text
Gate type: discovery
Execution owner: ChatGPT Chat / Pro
```

The gate identifies questions, sources, expected source-of-truth output, non-goals, and completion criteria. ChatGPT investigates and may draft/write the designated source-of-truth when authorized. Material results require human approval before downstream implementation depends on them.

Do not activate Codex just because the discovery gate is named CP1/CP3/etc.

### Execution-readiness before Codex

Before activation, ChatGPT asks whether the work order has resolved material:

- intended behavior/acceptance oracle;
- owner/layer/service;
- architecture and non-goals;
- public/persistence/authorization semantics as relevant;
- scope/path/exclusion boundaries;
- acceptance criteria and verification.

If a foreseeable unknown would require Codex to choose product/architecture meaning, create/finish discovery first.

### Unexpected discovery during Codex

Codex stops before inventing the missing decision and publishes existing routed evidence:

```text
<!-- gated-development:codex-evidence:v2 -->
<!-- gated-development:chatgpt-thread:v1 id=<copied UUID> -->
...
Submission outcome: DISCOVERY REQUIRED
```

The report contains the concrete unknown, evidence exposing it, work completed, current repository state, affected criteria, and why continuing would require material discovery.

Because this uses `codex-evidence:v2`, the existing evidence-return transport can route it to the declared ChatGPT conversation.

### Discovery sub-checkpoint

On routed `DISCOVERY REQUIRED`, ChatGPT:

1. re-fetches the active gate/evidence/source truth;
2. creates a linked discovery child checkpoint, normally `<Gate>.D<n>`;
3. investigates in ChatGPT Extra High / Pro;
4. drafts/amends source-of-truth and downstream plan when needed;
5. obtains human approval for material decisions;
6. either reactivates the original gate or supersedes it.

Do not rewrite the frozen active gate to hide the detour.

### Reactivation after approved discovery

If the original objective remains truthful, record a durable discovery amendment and publish a **new `activation:v1` comment** for the same gate with incremented work-order version, established route, approved source-of-truth commit, resume SHA, discovery reference, and explicitly selected Codex reasoning effort (normally `medium`).

If discovery materially changes objective/architecture/product scope, supersede the old gate and create replacement implementation gate(s).

## ChatGPT thread routing

Every executable Codex activation/reactivation/correction contains exactly one:

```text
<!-- gated-development:chatgpt-thread:v1 id=<UUID> -->
```

### Initial activation

The human supplies the current ChatGPT thread UUID when first activating the implementation gate. If it has already been explicitly supplied for that activation, use it. Otherwise ask for it. Without a valid supplied ID, keep the gate READY and do not publish an executable activation.

### Reuse

Corrections and post-discovery reactivations reuse the established gate route. Do not repeatedly ask the human for the same UUID.

Only an explicit human request supplying a replacement ID changes the destination. Record that prospectively in the next applicable executable comment. Preserve earlier history.

Codex copies the exact triggering marker unchanged into evidence/blocker/discovery-required evidence. It never chooses a replacement.

## Bounded incidental repair

The primary authorized path list is not automatically an absolute fence. During activated implementation/documentation work, Codex may make a minimal adjacent repair outside the list only when all of these hold before editing:

1. the active work introduced/exposed the problem and the repair is directly necessary to compile/test/verify that authorized work;
2. the repair is mechanical/low-risk with no material product/architecture decision;
3. it is the smallest coherent change;
4. it does not expand product behavior, ownership, public contracts, persistence/authorization semantics, dependencies/frameworks, or repository/build policy;
5. no explicit protected/read-only/no-touch restriction is violated;
6. verification is rerun without weakening checks.

Record the diagnosis, repair minimally, reverify, and disclose every off-list repair in evidence.

If the needed change reveals material unknown behavior/architecture/ownership, it is not an incidental-repair excuse: use discovery-required.

## Orchestrator path

### Parent / feature preparation

ChatGPT inspects enough product/repository context to define the feature objective, known constraints, initial source-of-truth location, and checkpoint plan.

A parent issue may place discovery anywhere. CP1 is often discovery because early uncertainty is common, but do not encode CP1 as special workflow authority.

### Discovery gate preparation/execution

Use the discovery template. Investigate, author proposed source-of-truth, and derive downstream gates. Record actual findings rather than guesses. Obtain human approval for material product/architecture truth.

### Implementation gate preparation

Derive the gate from the approved source-of-truth. Define objective, scope, primary paths, exclusions, acceptance criteria, verification, branch/baseline, and stop/discovery conditions.

A gate should be execution-ready before activation. If not, create/complete discovery instead of raising Codex reasoning to compensate.

### Activate / reactivate

Before posting executable Codex work:

1. confirm gate/work-order/source-of-truth readiness;
2. confirm/resolve required branch/base/body hash fields according to the case;
3. establish/reuse the ChatGPT route;
4. select Codex reasoning from `model-selection.md` — normally `medium`;
5. publish the activation/reactivation comment with one route marker and one reasoning-effort field;
6. allow the configured launcher to hand off.

A post-discovery reactivation also references the child discovery/amendment, approved source commit, and resume starting SHA.

## Codex implementer path

### Revalidate

Use the currently installed plugin. Read repository instructions, exact triggering executable comment, relevant gate/history, approved product source, and actual repository state.

Verify one valid route marker and the launcher-applied reasoning effort when exposed. Historical marker/effort exceptions do not authorize invention.

### Execute

Perform only the authorized implementation/correction/reactivation slice. Preserve native behavior when required.

Classify failures/unknowns:

1. **implementation defect within primary paths** -> fix/reverify;
2. **qualifying incidental repair** -> diagnose/fix/reverify/disclose;
3. **execution-only difficult technical problem** -> continue authorized diagnosis at the selected effort;
4. **material discovery required** -> stop before making the missing product/architecture decision; publish routed `DISCOVERY REQUIRED` evidence;
5. **true blocker** -> preserve work, publish blocker, stop.

Do not run dependent tests against stale binaries after prerequisite build failure.

Codex must not self-relaunch or rewrite the work order to change its reasoning level.

### Publish

For normal complete/partial implementation evidence, follow `evidence-and-review.md` and `execution-artifacts.md`.

For discovery-required return, still use `codex-evidence:v2` with the copied route marker and `Submission outcome: DISCOVERY REQUIRED`. This is intentional so existing review transport can route the case back to ChatGPT.

For AquaTwin automated publication, prepare the authored evidence, redaction-reviewed bundle, and readiness record, dispatch the artifact publisher with the existing request ID, then stop after dispatch acknowledgment. Do not call the ChatGPT bridge directly.

## Independent reviewer path

For normal implementation evidence, ChatGPT independently fetches:

- gate issue;
- exact evidence;
- triggering activation/reactivation/correction;
- approved source-of-truth;
- remote ending commit/branch;
- full original-base-to-ending diff and correction/reactivation delta;
- required verification evidence;
- acceptance criteria;
- any discovery amendment/child gate when applicable.

Do not trust Codex summaries, artifact presence, or prior planning assumptions as proof.

Outcomes remain:

- PASS
- correction-required
- verification-blocked

If a review finding itself exposes material unresolved product/architecture discovery, create discovery rather than issuing a Max correction that asks Codex to invent the answer.

For a routine bounded correction, select `medium` normally. Use `high`/`xhigh`/`max` only for execution-ready technical complexity under the model policy.

## Runtime reasoning summary

Current Codex executable comments include:

```text
- Execution reasoning effort: `<minimal|low|medium|high|xhigh|max>`
```

Policy:

- `medium` — normal implementation/correction/reactivation;
- `high` — elevated execution complexity;
- `xhigh` — difficult execution/debugging with known product meaning;
- `max` — exceptional execution escalation after lower tiers are inadequate or explicit human request;
- unresolved discovery — return to ChatGPT, not Max.

The launcher's historical omitted-field `max` fallback may remain for old comments; v2 authoring does not rely on it.

## Terminal outcomes

Normal queued publication:

```text
Evidence publication queued. Not yet confirmed posted. Not PASS.
Automation request ID: <actual request_id>
Publisher run: <actual URL if available>
Local evidence: <actual path>
```

Normal evidence after confirmed post:

```text
Evidence posted. Awaiting independent review. Not PASS.
Report: <actual evidence URL>
```

Discovery-required evidence:

```text
Discovery required. Implementation paused. Not PASS.
Report: <actual evidence URL or publication state>
Return route: <copied ChatGPT thread marker in the report>
```

True blocker:

```text
Blocked: <concise reason>. Not PASS.
Report: <actual blocker URL or publication state>
```

Reviewer outcomes:

- `PASS — accepted commit <SHA>`
- `PASS — analysis evidence <reference>`
- `NOT PASS — correction required`
- `VERIFICATION BLOCKED`
