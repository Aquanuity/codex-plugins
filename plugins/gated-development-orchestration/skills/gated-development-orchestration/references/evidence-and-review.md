# Evidence and Independent Review Reference

Use when Codex reports, ChatGPT independently reviews, a blocker is triaged, or a correction is issued.

## Evidence is not acceptance

Actions success, CLI exit `0`, Codex summaries, and evidence URLs are not PASS. The reviewer independently fetches remote evidence.

## Verification failure classification

A failed required build/test/check during implementation is not automatically a terminal blocker.

Before publishing a blocker, Codex classifies the cause:

1. **Active implementation defect** — the current gate introduced the failure and the repair fits the authorized scope, path boundary, architecture, and repository operations. Repair it and rerun the failed prerequisite and dependent verification. This is normal implementation work.
2. **Authorized baseline/environment handling** — an external/baseline condition has an already-authorized, truthful in-gate resolution. Apply only that authorized resolution and report it; do not hide the condition.
3. **True blocker** — resolution requires unauthorized paths/scope/repository repair, a product or architecture decision, unavailable required tool/environment/access, unsafe runtime ownership, or an external/baseline defect with no authorized in-gate resolution. Preserve work, publish a blocker, and stop.

When a prerequisite build fails, dependent tests stop until that prerequisite is repaired. This pauses the dependent verification sequence; it does not stop the implementation session when an in-scope repair is available.

Do not publish a blocker merely because the first verification attempt failed. A repaired transient failure may be recorded in evidence as diagnostic history, but final required verification must still be rerun.

## Codex evidence comment

A valid v1.4.3 triggering work order contains exactly one ChatGPT thread marker. Reproduce it exactly on the second line.

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
- Skill package version used: `<actual>`
- Skill source used: `<actual>`
- Requested reasoning effort/source: `<resolved value and runner-default|case-override when exposed>`
- Runtime model/reasoning observed: `<actual or not exposed>`

### Repository state
- Starting branch/SHA/worktree:
- Ending SHA:
- Expected remote branch:
- Push attempted/result:
- Remote availability:

### Changed files
- ...

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

### Unresolved evidence or blockers
- ...

### Explicit confirmations
- No out-of-scope implementation: `YES | NO`
- No next-gate work: `YES | NO`
- Required verification complete: `YES | NO`

### Submission outcome
`COMPLETE EVIDENCE | PARTIAL EVIDENCE WITH BLOCKERS`

Awaiting independent review. Not PASS.
```

If a newly delivered v1.4.3 activation/correction lacks exactly one valid thread marker, Codex must not execute the work or invent routing. Publish a blocker when possible and stop.

## Blocker comment

Use this only after establishing a true blocker, not for a repairable active-implementation defect.

```markdown
<!-- gated-development:blocker:v2 -->
<!-- gated-development:chatgpt-thread:v1 id=<copied exact UUID from valid trigger> -->
## Gate blocked before completion

- Gate: `<id>`
- Work-order version: `<version>`
- Triggering comment: `<actual URL>`
- Actions run: `<actual run URL or N/A — manual>`
- Automation request ID: `<request ID or N/A — manual>`
- Skill version/source: `<actual>`

### Blocker classification
`unauthorized scope/path | architecture/product decision | repository-state repair | unavailable environment/tool/access | unsafe runtime ownership | unresolvable external/baseline defect | routing/preflight | other`

### Blocker
- ...

### Diagnosis performed
- Why this cannot be repaired within the active gate:
- In-scope repair attempted or considered:

### Work already performed
- ...

### Required decision or resume condition
- ...

Execution is blocked. The gate remains Not PASS.
```

For a malformed trigger with no valid routing marker, the blocker cannot invent one; post without a fabricated routing line if GitHub reporting is still possible.

## Independent review

A routed review request is only a pointer. Independently fetch:

1. exact evidence comment;
2. gate issue/body;
3. activation or correction;
4. pinned source-of-truth;
5. ending commit and expected remote branch;
6. original-base-to-ending range;
7. correction delta where applicable;
8. required verification evidence;
9. each immutable acceptance criterion.

Do not trust the evidence report's PASS-like statements without remote confirmation.

During review, distinguish a historical transient failure that was repaired and successfully reverified from an unresolved blocker. A first-attempt compile/test failure does not invalidate a gate when the final required verification passes and the repair stayed within scope.

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
- Reviewer skill version/source: `<actual>`

### Acceptance criteria
| Criterion | Result | Evidence |
|---|---|---|
| `AC-1` | PASS | ... |

This checkpoint is accepted. A successor executes only through its own authorized activation.
```

PASS does not need a thread marker because it does not route implementation or review.

### Correction required

A correction-required comment is executable and therefore requires a human-supplied current reviewer thread ID.

If the human has not already supplied that ID for the correction, ask for it. Without a valid UUID, do not publish the executable correction.

To override the runner default `max` for this correction round, include exactly one optional field in the executable correction:

```text
- Execution reasoning effort: `<minimal|low|medium|high|xhigh|max>`
```

The override applies only to this correction. Omit it for `max`; later corrections do not inherit it.

```markdown
<!-- gated-development:review:v2 status=correction-required -->
<!-- gated-development:chatgpt-thread:v1 id=<human-supplied current reviewer thread UUID> -->
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
- Execution reasoning effort: `<optional: minimal|low|medium|high|xhigh|max; omit for max>`

### Blocking findings
1. ...

### Authorized correction
- ...

### Required verification
1. ...

This finalized correction is the execution authorization and trigger. No additional dispatch is required.
```

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

`VERIFICATION_BLOCKED` is for missing/unobtainable review evidence or a true unresolved verification blocker. It is not a substitute for fixing a repairable compile/test failure during implementation.

## Review routing boundary

The review workflow transports the request to the exact ChatGPT thread declared by the copied human-supplied marker. It does not perform the review or choose a fallback destination. The reviewer must use fresh GitHub/remote evidence and may issue PASS, correction-required, or verification-blocked according to the case.
