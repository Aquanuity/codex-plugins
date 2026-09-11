# Gate and Issue Templates

Use for new work. Preserve older frozen records as history.

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

The frozen gate body defines the case. Routing metadata stays out of the body.

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

## Objective
...

## Authorized work
...

## Prohibited work
...

## Acceptance criteria
- `AC-1` — ...

## Required verification
1. ...

## Verification failure handling
- A failed required build/test/check is not automatically a blocker.
- Diagnose the failure before deciding whether to stop.
- If the active implementation caused the failure and the repair remains inside authorized scope, paths, architecture, and repository operations, fix it and rerun the failed prerequisite plus dependent verification.
- Do not run dependent tests against stale binaries after a failed build.
- Stop only when resolution requires unauthorized scope/path/repository operations, a product or architecture decision, unavailable required environment/tool/access, unsafe runtime ownership, or an external/baseline defect with no authorized in-gate resolution.

## Stop conditions
Stop and report only when continued work is unsafe or unauthorized, for example:
- activation/body/source pin mismatch;
- cancellation, supersession, acceptance, or competing execution;
- repository preflight conflict that the gate does not authorize Codex to repair;
- resolving a verification failure requires an unauthorized path, scope, architecture/product decision, repository repair, unavailable required environment/tool/access, unsafe runtime ownership, or an unresolvable external/baseline defect.

Do not write `stop on required verification failure` as a blanket rule. A self-introduced compile/test failure that is repairable within the active gate is implementation work, not a blocker.
```

## Activation comment

Before posting an activation, ChatGPT must have the human-supplied current ChatGPT thread ID for this activation. If it has not already been supplied in the current conversation, ask for it. If no valid UUID is provided, keep the gate READY and do not post the executable activation.

```markdown
<!-- gated-development:activation:v1 -->
<!-- gated-development:chatgpt-thread:v1 id=<human-supplied current ChatGPT thread UUID> -->
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
- Activated by: `<human or authorized orchestrator>`

This activation authorizes execution and triggers the configured Codex launcher. No separate dispatch is required.
```

A new v1.4.2 activation without exactly one valid thread marker is invalid and must not be published.

## Correction-required comment

Before posting an executable correction, ChatGPT must have the human-supplied current reviewer ChatGPT thread ID for that correction. Ask if it has not already been supplied. Without it, do not publish the correction trigger.

```markdown
<!-- gated-development:review:v2 status=correction-required -->
<!-- gated-development:chatgpt-thread:v1 id=<human-supplied current reviewer ChatGPT thread UUID> -->
## Independent gate review — NOT PASS / correction required

<complete bounded correction work order>
```

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

## Routing rules

- Parent and gate issue bodies do not carry the ChatGPT routing ID.
- Every new executable activation/correction carries exactly one human-supplied thread marker.
- If the human has not supplied a valid current thread ID, ChatGPT asks for it and cannot activate/correct until it is supplied.
- Codex copies the thread marker unchanged into evidence/blocker.
- A newly received v1.4.2 activation/correction with no marker or multiple markers is invalid and must not execute.
- PASS/state comments do not need the thread marker.
- Do not add a generic `Target: Codex` or `Target: ChatGPT` field. First-line marker plus thread marker is the routing contract.
- Preserve old comments; do not edit history to retrofit routing metadata.
