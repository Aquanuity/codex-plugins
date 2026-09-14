# Gate and Issue Templates

Use for new work. Preserve older frozen records as history.

## Workflow plugin identity

Use the shared **`gated-development-orchestration@aquanuity`** workflow contract from the source selected in [Workflow source by execution surface](../SKILL.md#workflow-source-by-execution-surface): Codex uses its currently installed plugin; ordinary ChatGPT Chat / Pro uses the current repository package. Load all required references from that same selected source.

Do not pin a Gated Development Orchestration version, marketplace repository SHA, plugin package commit, or historical `SKILL.md` URL into a gate, activation, or correction. Do not copy a predecessor gate's plugin pin. Historical plugin version/source text is provenance only and does not override the current workflow source selected for the execution surface.

## Parent feature issue

No ChatGPT thread ID is required in the parent issue body.

```markdown
<!-- gated-development:parent:v2 -->
# [AREA] Feature title

## Objective
...

## Source of truth
- Document: `<path>`
- Approved document commit: `<SHA>`
- Working branch: `<branch>`

## Gate plan
| Gate | Scope | Issue | State | Accepted commit or evidence |
|---|---|---|---|---|
| CP1 | ... | #... | READY | ... |
```

## Gate issue

The frozen gate body defines the product/repository case. Routing metadata and runtime reasoning selection stay out of the body because they are selected at executable activation/correction time. Plugin version/source is not part of the frozen authority.

```markdown
<!-- gated-development:gate:v2 -->
# [AREA][GATE] Gate title

## Gate manifest
- Parent issue: `#<number or none>`
- Gate ID: `<feature>-CP<n>`
- Gate type: `implementation | documentation | analysis-only`
- Work-order version: `1`
- Initial status: `READY`
- Required branch: `<branch>`
- Expected remote branch: `<remote>/<branch>`
- Original gate starting SHA: `<SHA>`
- Review diff base: `<same SHA>`
- Source-of-truth document: `<path>`
- Source-of-truth commit: `<SHA or case-specific bootstrap value>`
- Push policy: `agent | none`
- Required commit message: `<message or N/A>`
- Durable evidence destination: `<issue or authorized path>`
- Execution artifacts: outside git; for automated AquaTwin runs use `codex-artifact-publish.yml` with the launcher request ID, per the current plugin publication contract
- Workflow: current `gated-development-orchestration@aquanuity` contract; source selected by execution surface (version/source intentionally not frozen)

## Objective
...

## Authorized work
...

## Primary authorized path boundary
- `<planned implementation/test/documentation paths>`

This is the primary file list, not an absolute fence. For implementation/documentation work, a minimal adjacent off-list repair is authorized without another activation only when it is required to compile/test/verify the active work, introduced or exposed by that work, mechanical/low-risk, and the smallest coherent fix. It must not expand product behavior, architecture, ownership, public contracts, persistence/authorization semantics, dependencies, frameworks, or repository/build policy. Reverify and explicitly disclose it in evidence under the current plugin's bounded incidental repair rule.

## Explicit hard exclusions
- `<case-specific read-only/protected/no-touch paths or operations; none if no additional exclusions>`

These exclusions override incidental repair authority. Analysis-only/no-write gates still permit no repository writes. Do not weaken verification or acceptance criteria to avoid a blocker.

## Prohibited work
...

## Acceptance criteria
- `AC-1` — ...

## Required verification
1. ...

## Verification failure handling
- A failed required build/test/check is not automatically a blocker.
- Diagnose the failure before deciding whether to stop.
- Fix failures repairable within primary paths or through qualifying bounded incidental repair; rerun the failed prerequisite plus dependent verification. Do not stop solely because a necessary mechanical repair was omitted from the primary file list.
- Do not run dependent tests against stale binaries after a failed build.
- Stop only when resolution requires unauthorized scope/path/repository operations, a product or architecture decision, unavailable required environment/tool/access, unsafe runtime ownership, or an external/baseline defect with no authorized in-gate resolution.

## Stop conditions
Stop and report only when continued work is unsafe or unauthorized, for example:
- activation/body/product-source pin mismatch;
- cancellation, supersession, acceptance, or competing execution;
- repository preflight conflict that the gate does not authorize Codex to repair;
- resolving a verification failure fails the bounded incidental repair conditions, violates an explicit hard exclusion, or needs unauthorized scope, a material design decision, repository repair, unavailable required environment/tool/access, unsafe runtime ownership, or an unresolvable external/baseline defect.

Do not write `stop on required verification failure` as a blanket rule. A self-introduced compile/test failure that is repairable within the active gate is implementation work, not a blocker.

A historical Gated Development Orchestration version/source mismatch is not a stop condition. Use the current installed plugin.

A qualifying incidental repair continues in the same execution/work-order version. Record the diagnosis before editing and list all off-list repairs and verification results in evidence; do not rewrite the frozen case to include them.
```

## Evidence storage and publication

Do not list generated logs, test output, or machine run reports as repository deliverables by default. Keep the issue summary substantive; package relevant redacted evidence in one external review bundle. Name a particular durable repository artifact only when explicitly required by the case/human.

For automated AquaTwin runs, use [Execution artifacts and publication](execution-artifacts.md): Codex prepares `publication/evidence.md`, `review-bundle.zip`, and `ready.json` under the launcher's existing request directory, dispatches the fixed artifact publisher with only `request_id`, and stops with a queued/unconfirmed status. The publisher uploads and posts the single terminal report with actual artifact references. It does not add another development activation or correction, and it does not decide acceptance.

Do not pre-post terminal evidence or fabricate artifact fields. The evidence/blocker templates below describe the authored report; its original first two routing lines remain unchanged when the publisher appends upload metadata. If publication is unavailable or ambiguous, report that accurately and recover publication only; do not commit logs as a fallback or issue an implementation correction to retrieve them. Raw logs are fetched by reviewers only when material proof requires them.

## Runtime reasoning selection

For every newly authored executable activation or correction, include exactly one field:

```text
- Execution reasoning effort: `<minimal|low|medium|high|xhigh|max>`
```

Use the policy in [Model selection](model-selection.md):

- `xhigh` (Extra High) is the normal choice for checkpoint implementation and routine bounded corrections.
- `max` is an explicit escalation for unusually difficult discovery/root-cause/architectural reconciliation, a repeated material failure after a reasonable `xhigh` attempt, or a human-requested Max round.
- Do not choose `max` merely because the gate is important, spans many files, or has strict verification.
- Re-select the effort for every correction. Routing is inherited; reasoning effort is not.
- If the human explicitly chooses another supported effort for the current round, honor it.

Historical executable comments that omit the field remain compatible with the AquaTwin runner's existing `max` fallback. **Do not rely on omission for newly authored work.**

## Activation comment

Before posting an activation, ChatGPT must have the human-supplied current ChatGPT thread ID for this activation. If it has not already been supplied in the current conversation, ask for it. If no valid UUID is provided, keep the gate READY and do not post the executable activation.

The activation establishes the gate's routing thread. Subsequent correction rounds reuse this ID without asking the human again, unless the human explicitly supplies a replacement destination.

Before posting, select the execution reasoning effort. Use `xhigh` unless this activation meets the Max escalation criteria or the human explicitly chooses another supported value. State the selected value explicitly in the activation.

```markdown
<!-- gated-development:activation:v1 -->
<!-- gated-development:chatgpt-thread:v1 id=<human-supplied activation thread UUID> -->
## Gate activated

- Gate: `<id>`
- Work-order version: `1`
- Gate issue: `<canonical issue URL>`
- Gate body hash algorithm: `sha256`
- Gate body hash: `<digest>`
- Gate type: `implementation | documentation | analysis-only`
- Source-of-truth document: `<path or case-specific controlling source>`
- Source-of-truth commit: `<SHA or case-specific bootstrap value>`
- Required branch: `<branch>`
- Expected remote branch: `<remote>/<branch>`
- Original gate starting SHA: `<SHA>`
- Review diff base: `<same SHA>`
- Push policy: `agent | none`
- Workflow: current installed `gated-development-orchestration@aquanuity`
- Execution reasoning effort: `<xhigh normally; max only when escalation criteria apply; another supported value only when explicitly selected>`
- Activated by: `<human or authorized orchestrator>`

This activation authorizes execution and triggers the configured Codex launcher. Apply the current plugin's bounded incidental repair rule within this gate, subject to its explicit hard exclusions. No separate dispatch is required.
```

Do not add a plugin version, repository SHA, package commit, or old skill URL to the activation.

A new activation under the current plugin contract without exactly one valid thread marker is invalid and must not be published. A newly authored activation should also carry exactly one explicit reasoning-effort field; do not intentionally omit it to obtain a launcher default.

## Correction-required comment

Resolve the established gate routing marker from the applicable activation/correction chain and verify that the reviewed evidence copied its trigger. **Reuse that marker unchanged; do not ask the human to resupply the thread ID for this correction.** Only an explicit human request supplying a replacement destination changes the ID.

If the applicable route cannot be established because it is missing or conflicting, first inspect the gate chain, then ask the human for clarification if still unresolved. Withhold the executable correction only for that actual routing problem, not lack of fresh per-round UUID input.

Re-evaluate reasoning effort for the correction. Routine, well-bounded corrections normally use `xhigh`. Use `max` when the correction requires materially deeper root-cause/discovery reasoning, especially after an `xhigh` attempt did not resolve the same material problem. State the selection explicitly; do not inherit the prior round's effort.

```markdown
<!-- gated-development:review:v2 status=correction-required -->
<!-- gated-development:chatgpt-thread:v1 id=<established gate routing UUID; reuse unless human explicitly replaces it> -->
## Independent gate review — NOT PASS / correction required

### Correction manifest
- Gate: `<id>`
- Correction work-order version: `<prior highest + 1>`
- Workflow: current installed `gated-development-orchestration@aquanuity`
- Execution reasoning effort: `<xhigh normally; max when escalation criteria apply; another supported value only when explicitly selected>`

<complete bounded correction work order, including primary correction paths and explicit hard exclusions>

Qualifying incidental repairs may support this correction only; they do not reopen unrelated gate work or override explicit hard exclusions.
```

For a human-requested destination change, use only the new UUID in the single marker and record the request in the comment prose. From that correction onward, Codex evidence/blocker and later corrections inherit the replacement. Do not insert both old and new routing markers or edit the earlier activation.

The correction's reasoning effort applies only to that correction execution. The next correction must select its own value again. A prior `max` does not force later `max`; a difficult follow-up may escalate from `xhigh` to `max`. Routing is inherited; reasoning effort is not.

Do not freeze/inherit a plugin version/source in the correction.

## Codex evidence

```markdown
<!-- gated-development:codex-evidence:v2 -->
<!-- gated-development:chatgpt-thread:v1 id=<copied exactly from trigger> -->
## Codex gate evidence
...
```

## Codex blocker

```markdown
<!-- gated-development:blocker:v2 -->
<!-- gated-development:chatgpt-thread:v1 id=<copied exactly from trigger> -->
## Gate blocked before completion
...
```

## PASS

```markdown
<!-- gated-development:review:v2 status=pass -->
## Independent gate review — PASS
...
```

## Verification blocked

```markdown
<!-- gated-development:review:v2 status=verification-blocked -->
## Independent gate review — VERIFICATION BLOCKED
...
```

## Routing and workflow rules

- Parent and gate issue bodies do not carry the ChatGPT routing ID.
- Every executable activation/correction carries exactly one valid thread marker.
- Activation requires the human-supplied current thread ID; ask when absent and do not activate without it.
- Corrections reuse the established gate routing ID without fresh human input. Only an explicit human-supplied replacement changes the route for subsequent cycles.
- Every newly authored executable activation/correction states exactly one reasoning-effort field. Select `xhigh` normally and `max` only under the escalation policy; re-select it each round.
- Codex copies the exact triggering thread marker unchanged into evidence/blocker. Evidence does not independently authorize rerouting.
- A newly received activation/correction with no marker or multiple markers is invalid and must not execute.
- Recover missing/ambiguous correction routing from the applicable gate chain or ask for clarification; never guess a destination, restore a stale route, or silently fall back.
- PASS/state comments do not need the thread marker and do not change the established route.
- Do not add a generic `Target: Codex` or `Target: ChatGPT` field. First-line marker plus thread marker is the routing contract.
- Preserve old comments; do not edit history to retrofit routing metadata or reasoning fields.
- Workflow plugin identity is `gated-development-orchestration@aquanuity`; version/source resolve from the current installation at execution/review time and are not frozen by the case.
