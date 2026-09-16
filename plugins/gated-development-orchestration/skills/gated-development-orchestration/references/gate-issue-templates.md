# Gate and Issue Templates

Use for new v2 work. Preserve older frozen records as history.

## Workflow identity

Use the current `gated-development-orchestration@aquanuity` contract selected by execution surface. Do not pin the workflow plugin version/source into a feature gate.

## Parent feature issue

The parent tracks the feature and checkpoint topology. Discovery may appear at any checkpoint number.

```markdown
<!-- gated-development:parent:v2 -->
# [AREA] Feature title

## Objective
...

## Initial context / source of truth
- Existing document: `<path or none yet>`
- Approved document commit: `<SHA or N/A until discovery>`
- Working branch: `<branch>`

## Gate plan
| Gate | Type | Scope | Issue | State | Accepted commit/evidence |
|---|---|---|---|---|---|
| CP1 | discovery / implementation / ... | ... | #... | READY | ... |
| CP2 | ... | ... | #... | ... | ... |
```

Do not assume CP1 is discovery. If discovery is foreseeable later, insert a discovery checkpoint where it belongs.

## Discovery checkpoint

Use when research/investigation/source-of-truth work must be completed before deterministic implementation.

```markdown
<!-- gated-development:gate:v2 -->
# [AREA][DISCOVERY] <Gate ID> — Discovery title

## Gate manifest
- Parent issue: `#<number>`
- Gate ID: `<CPn or linked child such as CP4.D1>`
- Gate type: `discovery`
- Execution owner: `ChatGPT Chat / Pro`
- Recommended reasoning: `Extra High / Pro unless human selects otherwise`
- Originating implementation gate: `<N/A for planned discovery | gate ID for surprise discovery>`
- Source-of-truth document: `<path to create/amend>`
- Starting source-of-truth commit: `<SHA or N/A>`
- Working branch: `<branch>`
- Workflow: current `gated-development-orchestration@aquanuity`

## Discovery objective
...

## Questions to resolve
1. ...

## Sources / behavior to inspect
- ...

## Authorized discovery work
- repository/native-behavior investigation;
- architecture/ownership tracing;
- product clarification with human;
- source-of-truth drafting/amendment as authorized;
- downstream checkpoint decomposition.

## Non-goals
- ...

## Expected durable output
- Source-of-truth: `<path>`
- Resulting commit: `<to be recorded>`
- Updated checkpoint plan: `<expected>`

## Completion criteria
- material questions answered with evidence;
- unresolved questions explicitly listed;
- proposed product/architecture decisions identified;
- source-of-truth written/amended as authorized;
- downstream implementation gates are execution-ready at the appropriate level;
- explicit human approval obtained for material product/architecture/source-of-truth decisions.
```

A discovery checkpoint is not sent to Codex just because it has a CP number.

## Implementation / documentation gate

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
- Source-of-truth commit: `<human-approved SHA>`
- Push policy: `agent | none`
- Required commit message: `<message or N/A>`
- Durable evidence destination: `<issue or authorized path>`
- Execution artifacts: outside git per current publication contract
- Workflow: current `gated-development-orchestration@aquanuity`

## Objective
...

## Execution-readiness statement
- Material product behavior / ownership / architecture / acceptance questions required for this gate are resolved by the approved source-of-truth.
- If implementation unexpectedly exposes a new material discovery question, use routed `DISCOVERY REQUIRED` evidence instead of inventing the decision or escalating Codex merely to discover product truth.

## Authorized work
...

## Primary authorized path boundary
- `<planned paths>`

This is the primary file list, not an absolute fence. Minimal adjacent repairs may qualify under the bounded incidental-repair rule.

## Explicit hard exclusions
- `<protected/no-touch paths or operations; none if no additional exclusions>`

## Prohibited work
...

## Acceptance criteria
- `AC-1` — ...

## Required verification
1. ...

## Verification/discovery handling
- Failed verification is not automatically a blocker; diagnose and repair authorized implementation defects.
- Do not run dependent tests against stale binaries after a failed prerequisite build.
- If the failure exposes a material product/architecture/ownership/acceptance unknown, stop before deciding it and return `DISCOVERY REQUIRED` evidence.
- Stop for a true blocker only when no authorized implementation repair/discovery-return path applies.
```

## Codex activation

Initial activation requires the human-supplied ChatGPT thread UUID. New v2 work explicitly states Codex reasoning effort; normal implementation starts at `medium`.

```markdown
<!-- gated-development:activation:v1 -->
<!-- gated-development:chatgpt-thread:v1 id=<human-supplied UUID> -->
## Gate activated

- Gate: `<id>`
- Work-order version: `1`
- Gate issue: `<URL>`
- Gate body hash algorithm: `sha256`
- Gate body hash: `<digest>`
- Gate type: `implementation | documentation | analysis-only`
- Source-of-truth document: `<path>`
- Source-of-truth commit: `<approved SHA>`
- Required branch: `<branch>`
- Expected remote branch: `<remote>/<branch>`
- Original gate starting SHA: `<SHA>`
- Review diff base: `<same SHA>`
- Push policy: `agent | none`
- Execution reasoning effort: `<medium normally; high/xhigh/max only under model-selection policy or explicit human choice>`
- Activated by: `<human or authorized orchestrator>`

This activation authorizes Codex execution. No additional dispatch is required.
```

## Routed surprise-discovery evidence

Codex uses the existing evidence marker so the configured evidence-return transport can reach the same ChatGPT thread.

```markdown
<!-- gated-development:codex-evidence:v2 -->
<!-- gated-development:chatgpt-thread:v1 id=<copied exact UUID> -->
## Codex gate evidence — discovery required

Status: Implementation paused. **Not PASS.**

### Work order
- Gate: `<id>`
- Work-order version: `<n>`
- Triggering comment: `<URL>`
- Source-of-truth commit: `<SHA>`

### Repository state
- Starting branch/SHA:
- Current/ending SHA:
- Commit/push state:

### Discovery required
- Concrete question(s):
- Evidence exposing the unknown:
- Why continuing requires a material product/architecture/ownership/acceptance decision rather than ordinary implementation diagnosis:
- Work already completed:
- Verification state:
- Acceptance criteria/paths affected:

### Explicit confirmation
- Codex stopped before inventing the missing product/architecture decision: `YES`

### Submission outcome
`DISCOVERY REQUIRED`
```

Follow the normal artifact publication contract for automated AquaTwin runs.

## Linked surprise-discovery sub-checkpoint

When ChatGPT receives routed `DISCOVERY REQUIRED`, create a discovery checkpoint such as:

```text
CP4.D1
```

Link it to the suspended implementation gate. Do not rewrite the frozen implementation gate body.

## Discovery amendment record

After discovery and human approval, record the resolution before deciding resume/supersede.

```markdown
<!-- gated-development:amendment:v1 kind=discovery -->
## Discovery amendment

- Originating implementation gate: `<CPn>`
- Discovery checkpoint: `<CPn.Dm issue/reference>`
- Prior source-of-truth commit: `<SHA>`
- Approved source-of-truth commit: `<SHA>`
- Resolved questions / human-approved decisions:
  - ...
- Acceptance/path/verification effects:
  - ...
- Original gate objective remains truthful: `YES | NO`
- Human approval reference: `<comment/message/reference>`
- Resolution: `REACTIVATE ORIGINAL GATE | SUPERSEDE AND REPLACE`
```

This is ledger/control only; it does not itself launch Codex.

## Reactivation after discovery

If the amendment says the original gate remains truthful, use a new `activation:v1` comment. This reuses the existing launcher protocol.

```markdown
<!-- gated-development:activation:v1 -->
<!-- gated-development:chatgpt-thread:v1 id=<established gate UUID; reuse unless human explicitly replaces it> -->
## Gate reactivated after discovery

- Gate: `<id>`
- Work-order version: `<prior + 1>`
- Reactivation reason: `approved discovery resolution`
- Discovery checkpoint: `<CPn.Dm reference>`
- Discovery amendment: `<reference>`
- Source-of-truth document: `<path>`
- Source-of-truth commit: `<new approved SHA>`
- Required resume starting SHA: `<actual current/ending SHA>`
- Original gate starting SHA: `<unchanged original B>`
- Review diff base: `<unchanged original B>`
- Required branch: `<branch>`
- Expected remote branch: `<remote>/<branch>`
- Push policy: `<same authorized policy>`
- Execution reasoning effort: `<medium normally now that discovery is resolved>`

This reactivation authorizes resumed execution. No separate dispatch is required.
```

If discovery materially changes the gate objective/architecture/scope, do not use reactivation. Mark the old gate superseded and create replacement implementation gate(s).

## Correction-required comment

For normal implementation review findings that are execution-ready and do not require new discovery:

```markdown
<!-- gated-development:review:v2 status=correction-required -->
<!-- gated-development:chatgpt-thread:v1 id=<established gate UUID> -->
## Independent gate review — NOT PASS / correction required

### Correction manifest
- Gate: `<id>`
- Gate type: `implementation | documentation | analysis-only`
- Correction work-order version: `<prior + 1>`
- Reviewed evidence: `<URL>`
- Required correction starting SHA: `<reviewed ending SHA>`
- Original gate starting SHA: `<B>`
- Review diff base: `<B>`
- Source-of-truth commit: `<approved controlling SHA>`
- Execution reasoning effort: `<medium normally; escalate only for execution-ready technical complexity>`

### Blocking findings
1. ...

### Authorized correction
- ...

### Required verification
1. ...

This finalized correction authorizes execution and triggers Codex. No additional dispatch is required.
```

If the review finding exposes material discovery, create discovery instead of asking Codex Max to decide the missing product truth.

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

## Routing / runtime rules

- Discovery gates do not require a Codex routing marker unless they originate from an already-routed implementation return and the route is being recorded for correlation.
- Every executable Codex activation/reactivation/correction carries exactly one valid ChatGPT thread marker.
- Initial activation requires the human-supplied current thread ID; corrections/reactivations reuse it without fresh human input unless explicitly changed.
- Every current executable Codex comment carries exactly one reasoning-effort field; `medium` is normal.
- Codex copies the triggering route into normal evidence, discovery-required evidence, or blocker.
- Preserve old comments; do not edit history to retrofit v2 semantics.
