# Automation Handoff Reference

This is the shared automation contract for ChatGPT orchestration/review, local Codex implementation, the transport-only implementation runner, and the review-only return workflow.

## Routing by first-line marker

| First-line marker | Destination | Meaning |
|---|---|---|
| `<!-- gated-development:activation:v1 -->` | Codex | Execute authorized checkpoint |
| `<!-- gated-development:review:v2 status=correction-required -->` | Codex | Execute authorized correction |
| `<!-- gated-development:codex-evidence:v2 -->` | ChatGPT review transport | Request independent review |
| `<!-- gated-development:blocker:v2 -->` | ChatGPT blocker transport when configured | Request blocker triage |
| `<!-- gated-development:review:v2 status=pass -->` | Ledger only | Accepted checkpoint |
| `<!-- gated-development:review:v2 status=verification-blocked -->` | Ledger only | Review could not complete |
| state/amendment markers | Ledger/control only | Do not independently launch Codex or ChatGPT review |

Marker versions, skill version, checkpoint identity, and work-order version are separate concepts.

## Thread routing marker

Every new executable activation/correction requires exactly one:

```text
<!-- gated-development:chatgpt-thread:v1 id=<UUID> -->
```

This marker is transport metadata only.

### Orchestrator

The human supplies the current ChatGPT thread ID.

Before publishing an activation or correction:

- use the thread ID only when the human explicitly supplied it for the current executable comment;
- if it has not been supplied, ask the human for it;
- validate UUID shape only;
- if it is not provided, do not publish the executable activation/correction;
- do not infer, invent, reuse from another conversation, or substitute a Codex session/thread ID.

There is no silent manual-return fallback for new v1.4.1 activations/corrections.

### Codex

A v1.4.1 triggering activation/correction must contain exactly one thread marker.

- verify exactly one marker is present before implementation;
- copy the exact marker unchanged into evidence or blocker;
- do not invent, infer, normalize, replace, or select a different thread ID;
- do not invoke the ChatGPT bridge directly;
- if the marker is absent/multiple/malformed, do not execute the gate; report a blocker when possible and stop.

### Review transport

The review workflow extracts exactly one marker from evidence/blocker and sets the local bridge's explicit ChatGPT thread target. It sends a compact review request containing repository, issue, and exact evidence URL. ChatGPT then fetches and independently verifies the case.

The review transport must:

- fail closed when the marker is absent, duplicated, malformed, or rejected;
- pass the UUID as the explicit ChatGPT destination;
- never substitute a fixed/default target;
- never reinterpret a Codex session/thread ID as the ChatGPT destination.

The review transport must not decide PASS/correction/verification-blocked itself.

## Implementation transport

The AquaTwin implementation runner is deliberately dumb.

It may validate:

- correct repository
- correct configured account/sender
- issue-comment-created event
- issue/comment IDs
- supported executable first-line marker
- nonempty instruction
- local launch prerequisites
- duplicate delivery of the exact same GitHub comment

It should not enforce case-specific rules such as:

- source-of-truth field names
- branch existence/creation policy
- starting SHA
- upstream/remote state
- worktree cleanliness
- gate/body hashes
- work-order sequencing
- allowed paths
- verification sufficiency
- checkpoint lifecycle validity

Those belong to Codex following the case and skill. The v1.4.1 implementer preflight rejects a malformed/missing thread marker before development work begins.

## Detached execution

GitHub Actions ends after startup acknowledgment. Codex continues independently in its own visible PowerShell console.

Durable local run records may include:

- `request.json`
- `prompt.txt`
- `codex-events.jsonl`
- `codex-stderr.log`
- `progress.log`
- `final.txt`
- `started.json`
- `completed.json`
- `error.json`

A launch acknowledgment is not implementation completion or PASS.

## Visible console

Future executions may display readable live progress while preserving raw logs. Console visibility is presentation, not authorization or isolation policy.

Closing the execution console may interrupt its attached Codex process. A read-only viewer may be closed safely when it is explicitly implemented as view-only.

## Runtime default

The automated AquaTwin launcher applies:

```text
model_reasoning_effort=max
```

unless the executable case explicitly overrides reasoning effort.

This is a runtime default, not a scope or acceptance rule. The runner does not decide whether a lower/higher effort is appropriate.

## Review-only return workflow

The review workflow should have an allowlist, not interpret arbitrary comments.

Minimum production path:

```text
codex-evidence
    -> extract exactly one chatgpt-thread marker
    -> call local ChatGPT bridge for that explicit thread
    -> send repository + issue + exact evidence URL
    -> exit
```

Do not copy the entire evidence report into the transport message unless necessary. The reviewer should fetch it independently from GitHub.

Codex never calls the review bridge. GitHub evidence is the boundary between implementation and independent review.

## Correction loop

```text
ChatGPT asks human for activation thread ID
  -> activation + supplied marker
  -> Codex
  -> evidence + same marker
  -> review workflow
  -> ChatGPT independent review
      -> PASS (ledger only)
      OR
      -> ChatGPT asks human for current reviewer thread ID
      -> correction-required + supplied current marker
          -> Codex
          -> new evidence + same marker
          -> review workflow
```

This avoids generic `Target:` fields. Message type plus routing marker is sufficient.

## Publication and retry

Evidence/blocker publication must be confirmed from the GitHub tool/API result. On ambiguous publication, check before retrying. Retry publication only; do not rerun implementation merely to repair reporting.

For a valid v1.4.1 execution, evidence/blocker must contain the copied thread marker. If routing metadata is missing, automatic review delivery must fail closed rather than choose a fallback destination.

## Security and secrets

Keep local bridge mechanics local:

- local script path
- named pipe path
- browser/session connection details
- authentication material

Only the human-supplied ChatGPT thread UUID needs to travel in GitHub comments for routing.

Never publish cookies, tokens, credential files, or secrets.

## Boundaries

The thread marker is not cryptographic authentication. The review workflow still validates the GitHub event/sender it trusts. A shared GitHub identity does not prove ChatGPT vs Codex authorship; role behavior comes from the workflow contract and independent verification.
