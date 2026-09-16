# Evidence and Independent Review Reference

Use when Codex reports implementation evidence, returns `DISCOVERY REQUIRED`, ChatGPT independently reviews implementation, a true blocker is triaged, or a correction is issued.

## Current workflow contract

Use the current `gated-development-orchestration@aquanuity` workflow source selected by execution surface. Historical plugin-version references are provenance only.

Read `discovery-checkpoints.md` whenever evidence says `DISCOVERY REQUIRED` or review exposes material unresolved product/architecture discovery.

Read `execution-artifacts.md` for AquaTwin evidence publication, bundle/redaction/checksum, retry, and artifact inspection rules.

## Evidence is not acceptance

Actions success, CLI exit `0`, Codex summaries, artifact presence, publisher success, and evidence URLs are not PASS. ChatGPT independently inspects the remote case.

## Verification / discovery classification during implementation

Before terminal reporting, Codex classifies what it encountered:

1. **Implementation defect within primary paths** — fix/reverify.
2. **Qualifying bounded incidental repair** — diagnose, minimally repair, reverify, disclose.
3. **Execution-only difficult technical problem** — continue authorized diagnosis under the selected runtime effort; report a true blocker only when no authorized resolution remains.
4. **Material discovery required** — stop before inventing product/architecture/ownership/acceptance meaning and publish routed `DISCOVERY REQUIRED` evidence.
5. **True blocker** — unauthorized scope/path/repository operation, unavailable required environment/tool/access, unsafe runtime ownership, or other condition with no authorized implementation/discovery-return resolution.

A failed first build/test is not automatically a blocker or discovery request.

## Normal Codex evidence

A valid triggering Codex work order contains exactly one ChatGPT route marker. Reproduce it exactly on the second line.

```markdown
<!-- gated-development:codex-evidence:v2 -->
<!-- gated-development:chatgpt-thread:v1 id=<copied exact UUID> -->
## Codex gate evidence

Status: Evidence posted. **Not PASS.**

### Work order
- Gate: `<id>`
- Gate type: `implementation | documentation | analysis-only`
- Work-order version: `<executed version>`
- Triggering activation/reactivation/correction: `<URL>`
- Source-of-truth commit: `<approved SHA>`
- Original gate starting SHA: `<B>`
- Review diff base: `<B>`
- Required execution starting SHA: `<SHA>`
- Discovery amendment/reactivation reference: `<URL or N/A>`

### Execution correlation
- Actions run: `<actual URL or N/A>`
- Automation request ID: `<actual ID or N/A>`
- Workflow plugin identity: `gated-development-orchestration@aquanuity`
- Installed workflow version/source used: `<actual when observable>`
- Requested reasoning effort/source: `<resolved value/source when exposed>`
- Runtime model/reasoning observed: `<actual or not exposed>`

### Repository state
- Starting branch/SHA/worktree:
- Ending SHA:
- Expected remote branch:
- Push attempted/result:
- Remote availability:

### Changed files
- `<path — primary authorized | qualifying incidental | separately human-authorized>`

### Implemented scope
- ...

### Acceptance evidence
| Criterion | Evidence | Codex assessment |
|---|---|---|
| `AC-1` | ... | SATISFIED / NOT SATISFIED / NOT TESTED |

### Verification
| Command / inspection | Outcome | Notes |
|---|---|---|
| `...` | PASS / FAIL / NOT RUN | ... |

### Material diagnostic failures repaired
- `<failure/cause/repair/rerun or none>`

### Incidental repairs outside primary paths
`NONE` or one row per qualifying repair.

| Path / repair | Gate-related necessity | Why mechanical/minimal/behavior-preserving | Verification rerun |
|---|---|---|---|
| ... | ... | ... | ... |

### Unresolved evidence / blockers
- ...

### Explicit confirmations
- No unauthorized product/scope decisions: `YES | NO`
- No unresolved material discovery silently decided by Codex: `YES | NO`
- All incidental repairs disclosed: `YES | NO | N/A`
- Required verification complete: `YES | NO`
- No next-gate work: `YES | NO`

### Submission outcome
`COMPLETE EVIDENCE | PARTIAL EVIDENCE WITH BLOCKERS`

Awaiting independent review. Not PASS.
```

## Routed discovery-required evidence

Use the same `codex-evidence:v2` marker specifically so the existing evidence-return path sends the report to the established ChatGPT conversation.

```markdown
<!-- gated-development:codex-evidence:v2 -->
<!-- gated-development:chatgpt-thread:v1 id=<copied exact UUID> -->
## Codex gate evidence — discovery required

Status: Implementation paused. **Not PASS.**

### Work order
- Gate: `<id>`
- Work-order version: `<n>`
- Triggering comment: `<URL>`
- Source-of-truth document/commit: `<path / SHA>`
- Original gate starting SHA / review base: `<B>`

### Execution correlation
- Actions run / request ID:
- Workflow version/source used:
- Requested reasoning effort/source:

### Repository state
- Starting branch/SHA:
- Current/ending SHA:
- Commit/push state:

### Discovery required
- Concrete question(s):
- Repository/native evidence exposing the unknown:
- Why continuing requires a material product/architecture/ownership/acceptance decision rather than ordinary implementation diagnosis:
- Work already completed:
- Verification state:
- Acceptance criteria / paths affected:

### Explicit confirmations
- Codex stopped before inventing the missing decision: `YES`
- This is not being reported merely because debugging is difficult: `YES`

### Submission outcome
`DISCOVERY REQUIRED`
```

For AquaTwin automated runs, publish this through the same artifact-backed evidence path as normal evidence. Do not use a special direct ChatGPT call and do not invent a new route.

## ChatGPT handling of `DISCOVERY REQUIRED`

A routed discovery-required report is not a request for ordinary PASS/correction review.

ChatGPT:

1. loads the current workflow plus `discovery-checkpoints.md`;
2. independently fetches the gate, exact report, trigger, approved source-of-truth, and relevant remote code;
3. confirms that the issue is genuinely material discovery rather than a repairable implementation defect;
4. creates a linked discovery child checkpoint such as `<Gate>.D1` when discovery is warranted;
5. investigates in ChatGPT Extra High / Pro;
6. records/amends source-of-truth as authorized and obtains human approval for material decisions;
7. reactivates the original gate or supersedes/replaces it under the discovery rules.

If ChatGPT determines Codex misclassified an ordinary implementation defect as discovery, it may issue a bounded correction/resume work order rather than creating artificial discovery.

## True blocker comment

Use blocker only when neither normal implementation repair nor discovery-return is the correct path.

```markdown
<!-- gated-development:blocker:v2 -->
<!-- gated-development:chatgpt-thread:v1 id=<copied exact UUID from valid trigger> -->
## Gate blocked before completion

- Gate: `<id>`
- Work-order version: `<version>`
- Triggering comment: `<URL>`
- Workflow identity/version/source: `<actual>`

### Blocker classification
`unauthorized scope/path | repository-state repair | unavailable environment/tool/access | unsafe runtime ownership | unresolvable external/baseline defect | routing/preflight | other`

### Blocker
- ...

### Diagnosis
- Why normal implementation repair does not apply:
- Why discovery-return does not apply:
- Specific authority/tool/environment needed:

### Work performed / repository state
- ...

### Resume condition
- ...

Execution blocked. Not PASS.
```

For a malformed trigger with no valid route, never fabricate a routing line.

## Independent implementation review

For normal implementation evidence, ChatGPT independently fetches and verifies:

1. gate issue/body;
2. exact evidence;
3. triggering activation/reactivation/correction;
4. approved source-of-truth;
5. remote ending commit/branch;
6. original-base-to-ending diff;
7. correction/reactivation delta when applicable;
8. required verification evidence;
9. every acceptance criterion;
10. linked discovery checkpoint/amendment when the gate previously paused for discovery.

Fresh remote inspection is required even when the same ChatGPT conversation originally planned the gate or performed discovery.

Inspect off-list changes against the bounded incidental-repair rule. Do not accept because Codex labels a change incidental, and do not reject solely because a file was omitted from the primary list.

### PASS

```markdown
<!-- gated-development:review:v2 status=pass -->
## Independent gate review — PASS

- Gate: `<id>`
- Work-order version reviewed: `<n>`
- Triggering work order: `<URL>`
- Reviewed evidence: `<URL>`
- Original review diff base: `<B>`
- Accepted ending commit: `<E or N/A>`
- Remote branch inspected: `<R or N/A>`
- Workflow source/version loaded: `<actual>`
- Discovery amendment reviewed: `<reference or N/A>`

### Acceptance criteria
| Criterion | Result | Evidence |
|---|---|---|
| `AC-1` | PASS | ... |

This checkpoint is accepted. A successor executes only through its own authorized path.
```

### Correction required

Use only when the review finding is implementation-ready and does not require new material discovery.

Normal correction reasoning is `medium`; select `high`/`xhigh`/`max` only for execution-ready technical complexity under `model-selection.md`.

```markdown
<!-- gated-development:review:v2 status=correction-required -->
<!-- gated-development:chatgpt-thread:v1 id=<established gate UUID> -->
## Independent gate review — NOT PASS / correction required

### Correction manifest
- Gate: `<id>`
- Correction work-order version: `<prior + 1>`
- Reviewed evidence: `<URL>`
- Required correction starting SHA: `<reviewed ending SHA>`
- Original gate starting SHA / review base: `<B>`
- Approved source-of-truth commit: `<SHA>`
- Execution reasoning effort: `<medium normally>`

### Blocking findings
1. ...

### Authorized correction
- ...

### Required verification
1. ...

This correction is the execution authorization/trigger. No additional dispatch is required.
```

If the review finding exposes a material unresolved product/architecture question, use discovery rather than a Max correction.

### Verification blocked

```markdown
<!-- gated-development:review:v2 status=verification-blocked -->
## Independent gate review — VERIFICATION BLOCKED

- Gate: `<id>`
- Work-order version: `<n>`
- Evidence: `<URL or unavailable>`
- Last independently verified SHA/baseline: `<value>`

### Unavailable / unverifiable evidence
- ...

### Resume condition
- ...

No PASS is issued while required evidence cannot be independently established.
```

## Artifact references

Begin with concise issue evidence and fresh remote source/diff. Fetch raw artifacts only when needed for a material claim or explicit acceptance requirement. Verify the appropriate artifact/bundle identity and digests when bytes are used. Artifact upload/checksum is not independent proof that tests passed.

Publication/access failures are not implementation corrections. Retry publication only for the same frozen inputs; do not rerun implementation to recover an upload.
