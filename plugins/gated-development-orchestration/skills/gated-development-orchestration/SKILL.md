---
name: gated-development-orchestration
description: Coordinate checkpoint development through pinned product source documents, frozen GitHub work orders, local Codex execution, GitHub-routed return review, and independent ChatGPT review. Use for gate creation, activation, implementation, evidence review, bounded corrections, and review routing. Choose the current role before acting; reading or reviewing this skill does not authorize a checkpoint or a GitHub write.
compatibility: Requires access to the complete skill references and relevant GitHub sources. Implementation requires an authorized local git environment and configured tools. ChatGPT Chat orchestration does not require access to the user's local filesystem.
metadata:
  version: "1.4.9"
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
| Human / product owner | Intent, scope, architecture decisions, activation authority, cancellation and overrides; supplies the ChatGPT thread ID at activation and explicitly authorizes any later destination change | Nothing in this skill delegates final product authority away from the human |
| Orchestrator / reviewer | Source tracing, source-of-truth documents, issue topology, activation, fresh remote review, correction orders, acceptance records, review routing, per-round Codex reasoning-effort selection | Treat Codex summaries or Actions success as proof; silently replace ChatGPT review with Codex/Work/API review; invent or infer a thread ID |
| Codex implementer | Exact work-order preflight, bounded implementation/analysis, verification, in-scope and qualifying incidental repair, authorized commit/push, evidence/blocker authoring and publication handoff | Self-approve, activate the next gate, directly invoke the ChatGPT bridge, invent/change a ChatGPT thread ID, self-relaunch to change reasoning effort |
| Implementation launcher | Validate basic delivery and start Codex | Decide scope, branch policy, architecture, gate validity, acceptance, verification diagnosis, repository repair, or whether a round deserves Extra High vs Max |
| Artifact publisher | Upload the prepared review bundle and post the authored report with actual artifact references | Implement, rerun verification, change routing, decide acceptance, or wait for ChatGPT |
| Review transport | Recognize review-target comments and route them to the declared ChatGPT thread | Judge evidence, issue PASS/correction, or reinterpret the case |

GitHub is the durable coordination record. Comment markers define message type and routing intent; the thread marker identifies a ChatGPT destination only.

## Workflow source by execution surface

The workflow plugin identity is **`gated-development-orchestration@aquanuity`**. Its version/source is intentionally **not frozen into a gate**.

Select the source by execution surface, while keeping one shared workflow contract:

- **Codex:** load the currently installed `gated-development-orchestration@aquanuity` plugin's `SKILL.md` and required references. This includes implementation and corrections. Do not replace the installed plugin with a repository copy.
- **Ordinary ChatGPT Chat / Pro:** load the current package from [Aquanuity/codex-plugins on main](https://github.com/Aquanuity/codex-plugins/tree/main/plugins/gated-development-orchestration), using available GitHub access. An installed plugin is not required for ChatGPT orchestration or independent review.

For each ChatGPT action, resolve `main` to its current commit, then fetch these files from that same commit under `plugins/gated-development-orchestration/`:

1. `.codex-plugin/plugin.json` for package identity/version;
2. `skills/gated-development-orchestration/SKILL.md`;
3. the references required for the current phase, resolving their paths relative to that skill directory.

For independent review, load `authority-and-lifecycle.md`, `evidence-and-review.md`, `automation-handoff.md`, and `execution-artifacts.md` from the skill's `references/` directory; also load `gate-issue-templates.md` when preparing a review/correction record. Load `model-selection.md` before authoring any executable activation or correction, because reasoning effort is an explicit per-round selection. Follow further references needed for a material decision. Do not substitute the README, a directory listing, remembered instructions, or search snippets for the actual files.

Keep one source snapshot within an action. Resolve the current source again for later actions; the recorded commit is provenance, not a gate-wide version pin. Report the loaded version and source truthfully: installed package path/version for Codex when observable; repository, resolved commit, and loaded file paths for ChatGPT. Repository loading does not install a plugin or grant GitHub access.

Rules:

- Freeze product intent, product source-of-truth commits, branch/baseline, scope/path boundaries, acceptance criteria, and executable work orders as required by the case.
- Do **not** freeze a Gated Development Orchestration version, marketplace repository SHA, plugin package commit, or historical `SKILL.md` URL into the controlling case.
- Do **not** copy a predecessor gate's plugin version/source into a new gate or activation.
- If historical gate/activation/evidence text names an older Gated Development Orchestration version or repository pin, treat that text as provenance only. It does not override the current workflow source selected above and is not a reason to fetch/use the historical skill.
- A plugin update may change workflow mechanics for later actions on an already-open gate. It does not rewrite or broaden the gate's frozen product scope, product source pin, repository authority, acceptance criteria, or prior history.
- Report the actual workflow version/source loaded for implementation or review, for traceability only. That report is not a work-order pin.
- If Codex cannot load the installed plugin, or ChatGPT cannot fetch the current repository package or a required reference, report the exact missing workflow capability. Missing installed-plugin access alone is not a ChatGPT review blocker.

This separates **product/work-order freezing** from **workflow-plugin evolution**.

## References to load

- [Authority and lifecycle](references/authority-and-lifecycle.md)
- [Gate and issue templates](references/gate-issue-templates.md)
- [Evidence and review](references/evidence-and-review.md)
- [Automation handoff](references/automation-handoff.md)
- [Model selection](references/model-selection.md) — required before authoring an executable activation/correction and when evaluating a human runtime-effort instruction
- [Execution artifacts and publication](references/execution-artifacts.md) — required when preparing, publishing, retrieving, or retrying run evidence

Read the references required for the current phase from the source selected above. Record the actual loaded workflow version/source when reporting an automated run or review.

## Core invariants

1. The pinned **product** source-of-truth defines feature meaning and architecture. The frozen gate body plus matching activation authorize only the current slice.
2. The Gated Development Orchestration plugin version/source is not gate authority and is not frozen; use the current `gated-development-orchestration@aquanuity` contract from the source selected for the execution surface.
3. Keep checkpoints as checkpoints. Corrections stay in the same gate only while objective, architecture, primary paths plus qualifying incidental repairs, and explicit hard exclusions remain valid.
4. A valid activation is also the execution trigger. A valid correction work order is also the correction trigger. No extra dispatch comment is required.
5. PASS accepts the current checkpoint; it does not itself authorize an unactivated successor.
6. Codex implements and reports; ChatGPT independently inspects remote evidence. Codex never issues its own independent PASS.
7. Preserve the original gate starting SHA/review base through corrections. Only correction execution start changes.
8. Implementation/documentation: implement -> verify -> repair in-scope failures -> re-verify -> commit -> normal authorized push -> confirm remote containment -> evidence -> stop.
9. Analysis-only: no repository writes/commit/push.
10. Do not merge, rebase, pull, reset, clean, force-push, switch worktrees, create branches, or repair repository state unless the case explicitly authorizes that operation.
11. Unrelated cleanup/defects/future work are not authorized. Necessary adjacent repairs must satisfy the bounded incidental repair rule below.
12. Launch success, CLI exit, a posted URL, or evidence is not acceptance.
13. Preserve history; never fabricate SHAs, hashes, issue numbers, tool outcomes, credentials, runtime settings, verification, or ChatGPT thread IDs.
14. The implementation runner is transport-only. It must not add case rules that are absent from the case/current plugin.
15. The ChatGPT thread marker is routing metadata only. It does not grant scope, activation, correction, or acceptance authority.
16. Codex never invokes the ChatGPT return bridge. It authors the evidence/blocker and uses the configured publication transport; the terminal GitHub comment remains the review handoff.
17. Every executable activation and correction requires exactly one valid ChatGPT thread marker. The human supplies the routing ID at activation; subsequent correction rounds reuse the established gate routing ID unchanged.
18. Ask for the thread ID before activation when it has not been supplied. Do not ask again for routine corrections; change the established destination only on an explicit human request supplying a replacement ID.
19. Missing or ambiguous routing is fail-closed. Recover it from the applicable gate activation/correction chain or ask the human if it cannot be established; never invent a destination or silently downgrade to manual return review.
20. Never use a Codex session/thread ID as a ChatGPT conversation destination.
21. A required build/test/verification failure is not automatically a blocker. Diagnose its cause first.
22. If a failure is repairable within primary authorized paths or qualifies for bounded incidental repair below, Codex must fix it and rerun verification rather than stop merely because a check failed or a file was not listed.
23. A dependent verification step may pause after its prerequisite build/check fails, but the implementation session continues while an in-scope repair remains available.
24. Stop and report a blocker only when resolving the failure requires unauthorized scope/path/repository operations, a product or architecture decision, unsafe runtime ownership, unavailable required tool/environment/access, or an external/baseline defect that cannot be resolved within the active gate.
25. Runtime reasoning effort is selected independently for each executable activation/correction. New work orders authored under the current workflow state exactly one `Execution reasoning effort` field: normally `xhigh` (Extra High), with `max` reserved for the escalation conditions in `model-selection.md` unless the human explicitly selects another supported value. Do not rely on omission for new work; historical omitted fields remain compatible with the launcher's existing `max` fallback.
26. Bounded incidental repairs outside primary listed paths are authorized only under the conditions below; explicitly protected paths, product scope, and independent review remain binding.
27. Generated run logs/reports are execution artifacts, not repository source. Keep them out of git unless a particular durable artifact is explicitly required; publish a redacted review bundle outside the repository.
28. Artifact upload precedes the single terminal evidence comment. Queued publication, artifact upload, and publisher success are not checkpoint PASS. Retry publication without rerunning implementation.

## ChatGPT thread routing

Every executable activation or correction requires exactly one:

```text
<!-- gated-development:chatgpt-thread:v1 id=<UUID> -->
```

### Establish the gate routing thread at activation

The human supplies the current ChatGPT thread ID when activating the gate. If it has already been explicitly supplied for this activation, use it; otherwise ask for it. Validate the UUID shape and include it in the activation. Without a valid supplied ID, keep the gate READY and do not publish the executable activation.

That activation marker establishes the gate's review-routing thread. The ID is routing metadata, not a per-round approval token. Supplying it once is sufficient for subsequent evidence, blocker, review, and correction cycles for that gate.

Do not invent the activation destination, infer it from Codex/project metadata, or select an ID from another gate, conversation, or a fixed test default.

### Reuse through correction rounds

Before issuing a correction, read the applicable activation/correction and the exact evidence being reviewed. Resolve the established routing marker from that gate's current work-order chain and confirm the evidence copied its triggering marker. Reuse that marker unchanged in the correction. **Do not ask the human to resupply or reconfirm the same ID for each correction.**

The authoritative route is the activation's human-supplied ID, as changed only by an explicit human-authorized replacement recorded in a subsequent applicable work order. Use the latest applicable route in that chain, not an arbitrary older comment. Evidence and blocker comments propagate the route; they cannot independently change it. A stale/superseded report must not restore an earlier destination.

A reviewer working in a different conversation still reuses the established gate route unless the human explicitly requests a destination change. Merely opening another chat, changing plugin version, or beginning another correction round does not select a new destination.

### Explicit destination change

The human may explicitly supply a replacement ChatGPT thread ID for subsequent review. The orchestrator validates it, records the human-requested routing change in the next applicable activation/correction comment, and places exactly one thread marker containing the new ID there. Do not add a second old-ID marker.

From that work order onward, evidence/blocker and later corrections use the replacement ID. Preserve earlier comments as history. No frozen product scope, source pin, baseline, verification, or acceptance authority changes with routing.

### Placement and propagation

Activation:

```text
<!-- gated-development:activation:v1 -->
<!-- gated-development:chatgpt-thread:v1 id=<human-supplied activation thread UUID> -->
```

Correction:

```text
<!-- gated-development:review:v2 status=correction-required -->
<!-- gated-development:chatgpt-thread:v1 id=<established gate routing UUID; reuse unless human explicitly replaces it> -->
```

Rules:

- Put the marker immediately after the executable activation/correction marker; do not require it in the parent or frozen gate issue body.
- Codex copies the exact triggering marker unchanged into terminal evidence or blocker. It never selects a replacement or calls the return bridge.
- The reviewer reuses the applicable gate routing marker in every executable correction unless recording an explicit human replacement.
- PASS and verification-blocked comments do not need a marker because they do not launch implementation; they do not clear or change the gate route.
- Thread routing is inherited across correction rounds. Reasoning effort is not inherited: current workflow authoring explicitly selects and states it for every executable round.

### Malformed, missing, or conflicting routing

A newly received executable activation/correction without exactly one valid marker is malformed. The implementer must not execute it or invent a marker; publish a concise GitHub blocker when possible and stop.

For correction authoring, first recover the established route from the applicable gate chain. If no valid route can be established, or conflicting markers cannot be resolved, do not publish the executable correction; report the specific routing problem and ask the human to supply or clarify the destination. This is recovery from missing/ambiguous routing, not a routine per-round input requirement.

A destination reported busy or unavailable is a transport problem, not permission to choose another chat. Historical records remain unchanged. An open gate with a valid established route may reuse it under this contract even if older skill prose required a fresh ID for every correction. Historical markerless records do not authorize invented routing.

## Bounded incidental repair

The listed files are the **primary authorized path boundary**, not by themselves an absolute fence. In an activated implementation/documentation gate or correction, Codex may make a minimal adjacent repair outside that list without new authorization **only when all of the following are established before editing**:

1. **Necessary and directly related:** the active work introduced or exposed the problem, and the repair is required to compile, test, or verify that already-authorized work. An unrelated defect noticed along the way is not enough.
2. **Mechanical and low-risk:** the repair has no material product or architecture decision and no competing design choice that needs human judgment. A small diff alone does not establish this.
3. **Smallest coherent change:** change only the directly necessary lines/files. Do not bundle cleanup, refactoring, or future work, or split a material redesign into nominally incidental edits.
4. **No semantic expansion:** the repair does not change product behavior beyond the already-authorized gate, architecture, ownership, public contracts, persistence/authorization semantics, dependencies, packages, frameworks, or repository/build policy.
5. **Existing prohibitions remain binding:** do not touch explicitly read-only/protected/no-touch files, override a human prohibition on incidental repairs, perform unauthorized repository-state repair, or mutate an unsafe runtime/test project. Analysis-only/no-write gates remain no-write.
6. **Verifiable without weakening the check:** rerun the failed prerequisite and dependent verification. Do not delete/skip tests, weaken assertions, suppress errors, change acceptance criteria, or claim success merely to obtain a green result.

A missing import, an explicit generic type argument, a test call updated to an already-authorized signature, a focused fixture wiring fix, or an existing test-project compile/link item may qualify. These are examples, not automatic exemptions: each must satisfy every condition above. New save semantics, a public API redesign, a new package/framework, unrelated subsystem work, or an explicit read-only-file change requires human authorization even if only one line changes.

Before the repair, record a brief diagnosis and why it qualifies in the run notes; this is not a new GitHub dispatch/approval step. Apply the minimal fix, rerun verification, and disclose every off-list repair in terminal evidence: paths, failure/cause, necessity, why it is mechanical and behavior-preserving, and actual verification results. Evaluate the cumulative repair scope, not just each edit in isolation.

If any condition fails or cannot be established, preserve work and report the precise blocker/decision needed. **Do not stop solely because a necessary repair's file was omitted from the primary list.** A qualifying repair stays in the same execution and work-order version; it is not an independent review correction round and never constitutes self-approval.

For existing gates, a generic legacy label such as `maximum path boundary` is not by itself a prohibition on this bounded repair rule. Explicit case-specific read-only/no-touch restrictions and human denials still take precedence. Do not edit the frozen issue body or source pin to disguise an off-list change. Frozen product scope, branch/baseline, allowed repository operations, acceptance criteria, and prior history remain unchanged.

## Orchestrator path

### Define and prepare

Inspect repository behavior and architecture. Separate current behavior from desired behavior. Define ownership, boundaries, non-goals, verification, and independently reviewable checkpoints.

For strict bridge/refactor work, existing behavior is the acceptance oracle unless the gate explicitly authorizes behavior change.

Prepare the gate using the exact templates. Keep scope, product source pin, branch/baseline, verification and stop conditions explicit. Refer to the workflow as the current `gated-development-orchestration@aquanuity` contract with source selected by execution surface; do not write a plugin version/repository SHA pin into the case.

Draft a **Primary authorized path boundary**, include the bounded incidental repair allowance, and separately name any explicit read-only/protected exclusions. Do not make every unlisted file a blocker by boilerplate. Keep machine-generated run logs out of the planned repository deliverables; use the execution-artifact contract for review bundles and name any genuinely required durable exception explicitly.

When drafting stop conditions, do **not** use a blanket rule such as `stop on required verification failure`. Required verification failures caused by the active implementation are expected development feedback and remain repairable inside the gate when the repair is authorized. Stop conditions should describe the unresolved condition that makes further in-scope work impossible or unauthorized.

Reasoning effort is not frozen into the gate body. Select it immediately before each executable activation/correction from the actual round difficulty using [Model selection](references/model-selection.md).

### Activate

After human authorization and prerequisite readiness:

1. finalize the exact gate body;
2. fetch the final GitHub body and hash it where the case requires;
3. if the human has not already supplied the current ChatGPT thread ID for this activation, ask for it;
4. validate the supplied UUID shape;
5. load the current model-selection policy and select the execution reasoning effort for this activation: use `xhigh` normally, use `max` only when the round meets the escalation criteria, or honor a human-selected supported value; include exactly one explicit `Execution reasoning effort` field;
6. publish a new activation comment containing the activation marker followed immediately by the supplied thread routing marker and the selected effort in the activation manifest; this establishes the gate route to reuse in subsequent correction rounds;
7. let the configured launcher perform the handoff.

Do not add or inherit a frozen plugin version/source line in the activation. If useful, identify the workflow only as the current installed `gated-development-orchestration@aquanuity`.

If step 3/4 is not satisfied, **do not activate**. Keep the gate READY and tell the human that activation requires the current ChatGPT thread ID.

Posting the activation is the real handoff. Do not append another dispatch comment. Do not omit the effort field to obtain the historical runner default when authoring current work.

## Implementer path

### Revalidate the case

Use the currently installed Gated Development Orchestration plugin and its current references. Read repository instructions, the exact triggering comment, relevant issue history, pinned **product** source, and actual repository state.

If historical case text names an older Gated Development Orchestration version/repository/commit, do not treat that historical workflow reference as controlling and do not fetch the old skill merely because it appears in the frozen case. It is provenance only. The current installed plugin governs workflow mechanics; the frozen case continues to govern feature scope and repository authority.

The launcher only transported the instruction. Codex owns semantic preflight under the case/current plugin. If the case authorizes bootstrap branch/worktree creation or other repository setup, follow the case; if not, do not invent it.

Verify that the triggering comment contains exactly one valid ChatGPT thread marker. Missing or multiple markers block execution. An inherited correction marker is valid; no fresh human UUID submission is required for that round.

Read the launcher-applied reasoning effort when exposed. For current v1.4.9-authored work this should normally come from the explicit trigger field. Historical executable comments without the field may still arrive through the launcher's backward-compatible `max` fallback; absence in such historical work is not by itself a scope blocker.

Codex must not self-relaunch, rewrite the triggering work order, or change its own effort after startup. Running at `xhigh` is not a reason to stop or ask for Max before attempting the authorized work. If a later independent review identifies a materially deeper correction, that future executable correction may select `max`.

Stop and report when the trigger is edited/mismatched, superseded/cancelled/accepted, routing is malformed, scope conflicts, repository state violates the case, or a true blocker under the verification rules below is established. **Do not block because a historical gate workflow version/source differs from the current installed plugin.**

### Execute

Perform only the authorized checkpoint/correction. Preserve native behavior for bridge/refactor work. Review the complete gate range and correction delta as applicable.

Run the required verification and classify failures before deciding whether to stop:

1. **Active implementation defect within primary paths** — fix it within the authorized scope/architecture, then rerun the failed prerequisite and dependent checks. Do not publish a blocker merely because the first verification attempt failed.
2. **Qualifying incidental repair outside primary paths** — diagnose the gate-related failure against every bounded incidental repair condition above. If all hold, make the smallest repair, reverify, disclose it, and continue the same execution without a new activation/correction.
3. **Other baseline/external condition with an authorized resolution** — use only an already-authorized, truthful resolution. Do not hide baseline defects or treat incidental repair as permission for unrelated cleanup.
4. **True blocker** — resolution fails the incidental-repair conditions and requires unauthorized behavior/protected-path changes, a product or architecture decision, repository repair outside the case, unavailable required tool/environment/access, unsafe runtime takeover, or an external/baseline defect with no authorized resolution. Preserve work, report the exact unmet condition, and stop.

When a build fails, do not run dependent tests against stale binaries. Repair and rebuild first when the failure is in-scope. Stopping the dependent sequence is not the same as stopping the implementation session.

### Publish

Author one terminal evidence or blocker using the standard markers. For AquaTwin runs with a valid launcher request, follow [Execution artifacts and publication](references/execution-artifacts.md): prepare `publication/evidence.md`, one redaction-reviewed `review-bundle.zip`, and a checksum `ready.json`; dispatch `codex-artifact-publish.yml` on `dev` with only the existing request ID. The publisher uploads the bundle and posts the authored report with actual artifact run/ID/URL/digests/expiration. Do not also post the terminal comment yourself.

Copy the exact triggering ChatGPT thread marker unchanged as the second line of the evidence/blocker comment.

Evidence must separately disclose every qualifying incidental repair outside primary paths, including its necessity, minimality, preserved behavior, and verification results. An omitted file is not automatically unauthorized, but calling a change incidental does not prove that it qualifies.

Evidence should report final required verification plus any material failed attempts that affected diagnosis. A transient self-introduced compile/test failure that was repaired and reverified is development history, not a blocker.

Report the actual current installed plugin version/source used and launcher-applied reasoning effort/source when observable. Do not restate a historical case pin as the controlling skill, and do not present the requested effort as proof of correctness.

After publisher dispatch acknowledgment, return **publication queued, not yet confirmed posted**, the request ID, actual publisher run URL if available, and local evidence path; then stop. Do not wait for the publisher or ChatGPT, invent its future artifact/comment IDs, or require `completed.json`/`final.txt` that will exist only after your own process exits. Once publication is independently confirmed, the actual comment URL is the report reference. Legacy/manual/malformed-trigger publication limitations must be reported explicitly; do not fabricate a request or silently commit logs as a fallback. **Do not call the ChatGPT return bridge yourself.**

## Reviewer path

Load the workflow using [Workflow source by execution surface](#workflow-source-by-execution-surface). Ordinary ChatGPT reviewers fetch the current repository package and required review references; Codex continues to use its installed plugin. A routed review request identifies an issue/evidence comment but does not prove the evidence.

Independently fetch:

- gate issue
- exact evidence comment
- activation/correction
- pinned product source
- remote ending commit/branch
- full gate diff and correction delta
- required verification evidence
- acceptance criteria

Historical skill-version/source references in gate or evidence text are provenance, not review authority. Review under the current workflow source selected for the execution surface while preserving the gate's frozen product/work-order authority.

Independently inspect every off-list change against the bounded incidental repair conditions, including cumulative scope, protected paths, and final verification. Do not reject solely for absence from the primary path list, and do not accept solely because Codex labels it incidental.

Start with the concise issue evidence and fresh remote source/diff. Do not demand all raw logs by default or ask that they be committed. Fetch the exact referenced publisher-run artifact only when needed for a material claim or an explicitly required acceptance check. Verify the appropriate outer-archive/inner-bundle digest and read only relevant material. Artifacts remain implementer-supplied evidence, not acceptance. Missing essential proof still requires verification-blocked; optional log expiry alone does not. See [Execution artifacts and publication](references/execution-artifacts.md).

Issue one of:

- PASS
- correction-required
- verification-blocked

For correction-required:

1. prepare the complete bounded correction work order;
2. resolve the established gate routing marker from the applicable activation/correction chain and checked evidence; reuse it unchanged without asking for the ID again;
3. only if the human explicitly requested a different destination, validate and record that supplied replacement; if the established route is missing or ambiguous and cannot be recovered, ask for clarification and withhold the executable correction;
4. load the current model-selection policy and explicitly choose this correction's reasoning effort: use `xhigh` for routine well-bounded corrections, `max` for a materially deeper/root-cause round that meets the escalation criteria, or a different supported value only when the human explicitly selects it; never inherit the previous round's effort;
5. include exactly one standardized `Execution reasoning effort` field and publish the complete correction with exactly one routing marker immediately after the correction executable marker.

Do not freeze or inherit a plugin version/source in the correction comment.

Do not issue a correction marker merely to solve delivery/access/publication problems. Reusing a route does not authorize unbounded correction scope, a successor gate, or self-approval; the existing authority and independent-review rules still apply.

## Runtime configuration

### Per-round reasoning selection

Every newly authored executable activation/correction under the current workflow explicitly states:

```text
- Execution reasoning effort: `<minimal|low|medium|high|xhigh|max>`
```

The normal policy is:

- **Extra High (`xhigh`)** — default for normal checkpoint implementation and routine bounded corrections, including substantial work whose objective, architecture/ownership, paths, acceptance criteria, and verification are clear;
- **Max (`max`)** — deliberate escalation when the round materially benefits from extra exploration/checking, such as a repeated material failure after a reasonable `xhigh` attempt, difficult causal debugging, ambiguous ownership/behavior across several subsystems, unusually deep cross-layer reconciliation, or an explicit human request for Max.

Do not select Max solely because the task is important, touches many files, has strict verification, or because older workflow versions defaulted the launcher to Max. Full criteria are in [Model selection](references/model-selection.md).

Rules:

- New activations/corrections must state exactly one effort field; do not rely on an omitted-field default.
- Re-evaluate the effort independently for every correction. Routing is inherited; reasoning effort is not.
- A routine correction after `max` normally returns to `xhigh` unless the correction itself still warrants Max.
- A difficult correction after `xhigh` may escalate to `max` without changing any product/repository authority.
- If the human explicitly selects another supported value, honor that current instruction.
- Supported values remain `minimal`, `low`, `medium`, `high`, `xhigh`, and `max`.
- Duplicate fields or unsupported values make delivery malformed; do not guess or silently normalize.
- This field changes runtime reasoning effort only. It does not grant scope, architecture, repository, correction, or acceptance authority.

### Legacy runner fallback

The existing AquaTwin launcher retains a mechanical backward-compatible fallback for historical executable comments that contain no field:

```text
model_reasoning_effort=max
```

This fallback is not the current authoring policy. New v1.4.9 activations/corrections explicitly state the selected effort so Codex starts with the intended level.

The launcher records the resolved effort and whether it came from `runner-default` or `case-override`, then applies it to the Codex execution. Codex does not self-relaunch to change it after startup. Report actual/exposed runtime configuration truthfully; do not infer success from the requested effort.

## Terminal outcomes

Asynchronous artifact publication:

```text
Evidence publication queued. Not yet confirmed posted. Not PASS.
Automation request ID: <actual request_id>
Publisher run: <actual URL if returned; otherwise not yet resolved>
Local evidence: <actual path>
```

Codex evidence (only after confirmed publication):

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
Report publication blocked or unconfirmed. Not PASS.
State whether no comment was attempted, a comment is confirmed posted, or the outcome is ambiguous. Check before retrying publication only.
Local report: <actual saved path or unavailable>
```

Activation routing missing:

```text
BLOCKED — human-supplied ChatGPT thread ID is required for activation.
Executable activation was not published.
```

Correction routing unresolved:

```text
BLOCKED — the established gate routing thread is missing or ambiguous and could not be recovered.
Executable correction was not published. Human routing clarification is required.
```

Reviewer outcomes:

- `PASS — accepted commit <SHA>`
- `PASS — analysis evidence <reference>`
- `NOT PASS — correction required`
- `VERIFICATION BLOCKED`
