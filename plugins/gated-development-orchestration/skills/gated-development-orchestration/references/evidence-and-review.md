# Evidence and Independent Review Reference

Use when Codex reports, ChatGPT independently reviews, a blocker is triaged, or a correction is issued.

## Current plugin contract

Use the currently installed **`gated-development-orchestration@aquanuity`** plugin for implementation reporting and independent review mechanics.

Historical gate/activation text that names an older plugin version, repository, commit, or `SKILL.md` URL is provenance only. It does not control the current implementation/review workflow and is not a blocker. Report the actual installed plugin version/source used when observable, but do not turn that report into a new gate pin.

## Evidence is not acceptance

Actions success, CLI exit `0`, Codex summaries, and evidence URLs are not PASS. The reviewer independently fetches remote evidence.

## Verification failure classification

A failed required build/test/check during implementation is not automatically a terminal blocker.

Before publishing a blocker, Codex classifies the cause:

1. **Active implementation defect within primary paths** — repair it within the authorized scope, architecture, and repository operations, then rerun the failed prerequisite and dependent verification.
2. **Bounded incidental repair outside primary paths** — the active work introduced or exposed a directly necessary compile/test/verification repair and every [incidental repair condition](../SKILL.md#bounded-incidental-repair) holds. Record the diagnosis, make the smallest mechanical fix, reverify, disclose it, and continue the same execution without another dispatch.
3. **Other authorized baseline/environment handling** — apply only an already-authorized, truthful resolution. Do not hide the condition or expand into unrelated maintenance.
4. **True blocker** — a repair fails the incidental conditions, violates explicit hard exclusions, or requires unauthorized scope/repository repair, a material design decision, unavailable required tool/environment/access, unsafe runtime ownership, or an external/baseline defect with no authorized resolution. Preserve work, state the specific unmet condition, publish a blocker, and stop.

When a prerequisite build fails, dependent tests stop until that prerequisite is repaired. This pauses the dependent verification sequence; it does not stop the implementation session when an in-scope repair is available.

Do not publish a blocker merely because the first verification attempt failed. A repaired transient failure may be recorded in evidence as diagnostic history, but final required verification must still be rerun.

## Codex evidence comment

A valid triggering work order contains exactly one ChatGPT thread marker. Reproduce it exactly on the second line. The human supplies the route at activation; a correction normally reuses it. Codex copies its own trigger's marker, including an explicitly human-authorized replacement, without asking for a fresh ID or selecting another destination.

```markdown
<!-- gated-development:codex-evidence:v2 -->
<!-- gated-development:chatgpt-thread:v1 id=<copied exact UUID> -->
## Codex gate evidence

Status: Evidence posted. **Not PASS.**

### Work order
- Gate: `<id>`
- Gate type: `implementation | documentation | analysis-only`
- Work-order version: `<executed version>`
- Activation comment: `<actual URL>`
- Source-of-truth commit: `<SHA or case-specific equivalent>`
- Original gate starting SHA: `<original SHA>`
- Review diff base: `<same original SHA>`
- Correction review comment: `<URL or N/A>`
- Required execution starting SHA: `<initial/correction SHA>`

### Execution correlation
- Triggering comment: `<exact URL>`
- Actions run: `<actual run URL or N/A — manual>`
- Automation request ID: `<supplied ID or N/A — manual>`
- Workflow plugin identity: `gated-development-orchestration@aquanuity`
- Installed skill package version used: `<actual when observable>`
- Installed skill source used: `<actual when observable>`
- Requested reasoning effort/source: `<resolved value and runner-default|case-override when exposed>`
- Runtime model/reasoning observed: `<actual or not exposed>`

### Repository state
- Starting branch/SHA/worktree:
- Ending SHA:
- Expected remote branch:
- Push attempted/result:
- Remote availability:

### Changed files
- `<path — primary authorized work | qualifying incidental repair | separately human-authorized change>`

### Implemented or analyzed scope
- ...

### Acceptance evidence by criterion
| Criterion | Evidence | Codex assessment |
|---|---|---|
| `AC-1` | ... | SATISFIED / NOT SATISFIED / NOT TESTED |

### Verification
| Command or inspection | Outcome | Notes |
|---|---|---|
| `...` | PASS / FAIL / NOT RUN | ... |

### Material diagnostic failures repaired during execution
- `<failure, cause, authorized repair, successful rerun; or none>`

### Incidental repairs outside primary paths
`NONE` or one row per off-list repair. Include the pre-edit diagnosis; do not hide these under generic scope confirmations.

| Path / repair | Gate-related failure and why repair was necessary | Why mechanical, minimal, and behavior-preserving; hard exclusions checked | Verification rerun and actual outcome |
|---|---|---|---|
| `<path and smallest change>` | `<cause introduced/exposed by active work>` | `<qualification evidence, including cumulative scope>` | `<command/inspection and result>` |

### Unresolved evidence or blockers
- ...

### Explicit confirmations
- No unauthorized product/scope changes: `YES | NO`
- All off-list incidental repairs disclosed and qualified: `YES | NO | N/A`
- No next-gate work: `YES | NO`
- Required verification complete: `YES | NO`

### Submission outcome
`COMPLETE EVIDENCE | PARTIAL EVIDENCE WITH BLOCKERS`

Awaiting independent review. Not PASS.
```

If a newly delivered activation/correction lacks exactly one valid thread marker, Codex must not execute the work or invent routing. Publish a blocker when possible and stop.

## Blocker comment

Use this only after establishing a true blocker, not for a repairable active-implementation defect, a qualifying incidental repair, or a historical plugin-version mismatch. File-list omission alone is not a blocker. A correction's reuse of an established routing ID is also not a blocker.

```markdown
<!-- gated-development:blocker:v2 -->
<!-- gated-development:chatgpt-thread:v1 id=<copied exact UUID from valid trigger> -->
## Gate blocked before completion

- Gate: `<id>`
- Work-order version: `<version>`
- Triggering comment: `<actual URL>`
- Actions run: `<actual run URL or N/A — manual>`
- Automation request ID: `<request ID or N/A — manual>`
- Workflow plugin identity: `gated-development-orchestration@aquanuity`
- Installed skill version/source used: `<actual when observable>`

### Blocker classification
`unauthorized scope/path | architecture/product decision | repository-state repair | unavailable environment/tool/access | unsafe runtime ownership | unresolvable external/baseline defect | routing/preflight | other`

### Blocker
- ...

### Diagnosis performed
- Why this cannot be repaired within the active gate:
- Primary-path or incidental repair attempted/considered:
- Specific incidental-repair condition not satisfied or explicit hard exclusion preventing repair:

### Work already performed
- ...

### Required decision or resume condition
- ...

Execution is blocked. The gate remains Not PASS.
```

Do not classify an old case line naming `Gated Development Orchestration 1.x` or an old plugin repository as a blocker. Use the current installed plugin instead.

For a malformed trigger with no valid routing marker, the blocker cannot invent one; post without a fabricated routing line if GitHub reporting is still possible.

## Independent review

A routed review request is only a pointer. Use the currently installed plugin and independently fetch:

1. exact evidence comment;
2. gate issue/body;
3. activation or correction;
4. pinned product source-of-truth;
5. ending commit and expected remote branch;
6. original-base-to-ending range;
7. correction delta where applicable;
8. required verification evidence;
9. each immutable acceptance criterion.

Do not trust the evidence report's PASS-like statements without remote confirmation.

Do not switch to a historical plugin package because the gate/evidence text names one. Historical plugin metadata is provenance only; current installed plugin mechanics govern review.

During review, distinguish a historical transient failure that was repaired and successfully reverified from an unresolved blocker. A first-attempt compile/test failure does not invalidate a gate when final required verification passes and the repair was authorized, including qualifying incidental repair.

Independently inspect every off-list change and its cumulative effect against all incidental-repair conditions, hard exclusions, and final checks. Neither absence from the primary file list nor Codex's `incidental` label decides acceptance. Reject semantic/design expansion and weakened tests; a qualifying mechanical repair is not a scope violation. Missing qualification/verification evidence is not proof of qualification.

Resolve routing from the applicable activation/correction chain and confirm that the exact evidence copied its triggering marker. This is reuse of known gate metadata, not inference of the reviewer's current conversation ID. Evidence cannot authorize an unsolicited routing change; stale/superseded evidence must not reset a newer human-authorized destination.

## Review outcomes

### PASS

```markdown
<!-- gated-development:review:v2 status=pass -->
## Independent gate review — PASS

- Gate: `<id>`
- Work-order version reviewed: `<n>`
- Activation comment: `<URL>`
- Reviewed evidence comment: `<URL>`
- Original review diff base: `<B>`
- Accepted ending commit: `<E or N/A for analysis-only>`
- Remote branch inspected: `<R or N/A>`
- Workflow plugin identity: `gated-development-orchestration@aquanuity`
- Reviewer installed skill version/source: `<actual when observable>`

### Acceptance criteria
| Criterion | Result | Evidence |
|---|---|---|
| `AC-1` | PASS | ... |

This checkpoint is accepted. A successor executes only through its own authorized activation.
```

PASS does not need a thread marker because it does not route implementation or review.

### Correction required

A correction-required comment is executable and must contain exactly one valid routing marker. **Reuse the established gate routing ID from the applicable activation/correction chain without asking the human to submit it again.** A valid activation has already established the destination for the gate's correction cycles.

Only an explicit human request supplying a replacement destination changes the route. Record that request in the correction prose, put only the new ID in the single marker, and use it for subsequent evidence/blocker and corrections. A reviewer being in another conversation does not itself change the route.

If the route is absent or conflicting and cannot be recovered from the applicable chain, report the routing problem and ask for clarification before publishing an executable correction. Do not turn this exceptional recovery into a fresh-ID requirement on every round. All existing correction-scope and authority rules still apply.

To override the runner default `max` for this correction round, include exactly one optional field in the executable correction:

```text
- Execution reasoning effort: `<minimal|low|medium|high|xhigh|max>`
```

The override applies only to this correction. Omit it for `max`; later corrections do not inherit it. Unlike reasoning effort, the routing ID is inherited.

```markdown
<!-- gated-development:review:v2 status=correction-required -->
<!-- gated-development:chatgpt-thread:v1 id=<established gate routing UUID; reuse unless human explicitly replaces it> -->
## Independent gate review — NOT PASS / correction required

### Correction manifest
- Gate: `<id>`
- Gate type: `implementation | documentation | analysis-only`
- Correction work-order version: `<prior highest + 1>`
- Activation comment: `<URL>`
- Reviewed evidence comment: `<URL>`
- Required branch: `<same branch>`
- Expected remote branch: `<remote>/<branch>`
- Required correction starting SHA: `<reviewed ending SHA/baseline>`
- Prior reviewed ending SHA: `<same>`
- Original gate starting SHA: `<B>`
- Review diff base: `<B>`
- Source-of-truth document: `<path>`
- Source-of-truth commit: `<SHA>`
- Push policy: `agent | none`
- Workflow: current installed `gated-development-orchestration@aquanuity`
- Execution reasoning effort: `<optional: minimal|low|medium|high|xhigh|max; omit for max>`

### Blocking findings
1. ...

### Authorized correction
- ...
- Primary correction paths and explicit hard exclusions: `<bounded list>`
- The current plugin's incidental repair allowance applies only to work necessary for this correction; no unrelated gate work is reopened.

### Required verification
1. ...

This finalized correction is the execution authorization and trigger. No additional dispatch is required.
```

Do not pin/inherit a plugin version/source in the correction.

### Verification blocked

```markdown
<!-- gated-development:review:v2 status=verification-blocked -->
## Independent gate review — VERIFICATION BLOCKED

- Gate: `<id>`
- Work-order version under review: `<n>`
- Submitted evidence comment: `<URL or unavailable>`
- Last independently verified SHA/baseline: `<value>`

### Unavailable or unverifiable evidence
- ...

### Resume condition
- ...

No PASS or implementation FAIL is issued while required evidence cannot be independently inspected.
```

`VERIFICATION_BLOCKED` is for missing/unobtainable review evidence or a true unresolved verification blocker. It is not a substitute for fixing a repairable compile/test failure during implementation. PASS and verification-blocked comments do not clear or change the gate's established route.

## Review routing boundary

The review workflow transports the request to the exact ChatGPT thread declared by the marker copied from the triggering work order. It does not perform the review or choose a fallback destination. The reviewer must use fresh GitHub/remote evidence and the current installed plugin, and may issue PASS, correction-required, or verification-blocked according to the case. Routine corrections reuse the gate's established route; they do not pause for repeated human UUID input.
