# Automation Handoff Reference

This is the shared automation contract for ChatGPT orchestration/review, local Codex implementation, the transport-only implementation runner, and the review-only return workflow.

## Current workflow plugin

Workflow mechanics come from the currently installed **`gated-development-orchestration@aquanuity`** plugin.

The gate/activation/correction must not freeze a plugin package version, marketplace repository SHA, package commit, or historical `SKILL.md` URL. Historical plugin references in GitHub records are provenance only; they do not redirect the runner, Codex, or reviewer to an old package.

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

Marker versions, installed skill version, checkpoint identity, and work-order version are separate concepts.

## Thread routing marker

Every executable activation/correction requires exactly one:

```text
<!-- gated-development:chatgpt-thread:v1 id=<UUID> -->
```

This marker is transport metadata only. The human supplies its ID at activation; subsequent correction rounds reuse it. It is not a per-round authorization token.

### Orchestrator and reviewer

At activation, ask for the human-supplied current ChatGPT thread ID if it has not already been supplied for that activation. Validate UUID shape. Without a valid supplied ID, do not activate. The activation establishes the gate's review-routing thread.

For subsequent corrections:

- read the applicable activation/correction chain and check that the exact evidence copied its triggering marker;
- reuse the established gate routing marker unchanged; do not ask the human to resupply or reconfirm it for each correction;
- change the destination only when the human explicitly requests a replacement and supplies its ID; record that request and exactly one replacement marker in the next applicable work order;
- propagate the replacement from that work order onward, without rewriting earlier comments;
- recover missing/conflicting routing from the applicable chain or ask for clarification if it cannot be established; do not publish an executable correction with unresolved routing;
- never invent a route, borrow another gate's ID, infer a destination from Codex/project metadata, or restore a stale route from superseded evidence;
- do not freeze/inherit a plugin version/source in the executable comment.

A change in reviewer conversation or plugin version is not a human routing override. There is no silent manual-return fallback, and a busy/unavailable destination does not authorize selecting another chat.

### Codex

A triggering activation/correction must contain exactly one thread marker.

- use the current installed `gated-development-orchestration@aquanuity` plugin;
- verify exactly one marker is present before implementation; an inherited correction marker is valid without fresh human UUID input;
- copy the exact triggering marker unchanged into evidence or blocker, including any replacement explicitly recorded by the orchestrator;
- do not invent, infer, normalize, replace, or select a different thread ID;
- do not invoke the ChatGPT bridge directly;
- if the marker is absent/multiple/malformed, do not execute the gate; report a blocker when possible and stop;
- do not fetch/use an old plugin package merely because historical case text names one.

### Review transport

The review workflow extracts exactly one marker from evidence/blocker and sets the local bridge's explicit ChatGPT thread target. It sends a compact review request containing repository, issue, and exact evidence URL. ChatGPT then fetches and independently verifies the case using the current installed plugin.

The review transport must:

- fail closed when the marker is absent, duplicated, malformed, or rejected;
- pass the UUID as the explicit ChatGPT destination;
- never substitute a fixed/default target;
- never reinterpret a Codex session/thread ID as the ChatGPT destination.

The review transport must not decide PASS/correction/verification-blocked itself. Routing reuse changes comment authoring, not the transport marker format, send-once behavior, or runner policy. No new workflow or dispatch is needed.

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
- the optional standardized reasoning-effort field shape/value

It should not enforce case-specific rules such as:

- source-of-truth field names
- branch existence/creation policy
- starting SHA
- upstream/remote state
- worktree cleanliness
- gate/body hashes
- work-order sequencing
- primary-path and incidental-repair qualification
- verification sufficiency
- verification-failure diagnosis
- checkpoint lifecycle validity
- plugin-version/source matching against historical case text

Those belong to Codex following the case and current installed plugin. The implementer preflight rejects a malformed/missing thread marker before development work begins.

A GitHub Actions job or launcher must not turn a failing build/test exit code into a gate-level blocker decision. The detached Codex process diagnoses verification failures and decides whether to repair within primary paths, perform a qualifying incidental repair, or report a true blocker under the current skill/case.

Incidental repair is an implementer decision under [the current plugin rule](../SKILL.md#bounded-incidental-repair), not a new runner permission flag or dispatch. It needs no extra Actions job, activation, or correction round. Codex records its diagnosis, makes only a qualifying minimal repair, reruns checks, and discloses off-list changes in evidence. ChatGPT independently reviews that qualification. Explicit protected paths, no-write gates, and repository/runtime restrictions still apply.

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

## Runtime default and per-round override

The automated AquaTwin launcher defaults to:

```text
model_reasoning_effort=max
```

An executable activation/correction may override that single round with exactly one standardized field:

```text
- Execution reasoning effort: `<minimal|low|medium|high|xhigh|max>`
```

Runner behavior:

- omitted field -> `max` with source `runner-default`;
- one supported field -> that value with source `case-override`;
- more than one field -> malformed delivery;
- unsupported value -> malformed delivery / no valid override;
- the override is per executable comment and is not inherited by later corrections.

The runner records the resolved value in its delivery record and inserts a run-local Codex shim that applies the resolved `model_reasoning_effort` to `codex exec`.

This is runtime configuration, not scope or acceptance authority. The runner does not decide whether a lower/higher effort is appropriate.

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
Human supplies routing thread A at activation
  -> activation + marker A (+ optional per-round reasoning override)
  -> Codex using current installed plugin
  -> implement / verify / repair primary-path or qualifying incidental failures / re-verify
  -> evidence + marker A copied unchanged
  -> review workflow -> ChatGPT thread A
  -> independent review using current installed plugin
      -> PASS (ledger only)
      OR
      -> correction-required + reused marker A (no fresh UUID request)
          -> Codex -> new evidence + marker A -> review workflow -> thread A
          -> repeat bounded correction/review under existing gate authority

Only on explicit human request to change destination to B:
  -> next applicable correction records the request + one marker B
  -> Codex -> evidence + marker B -> review workflow -> thread B
  -> later corrections reuse B without asking again
```

Routing is inherited through the gate's current activation/correction chain; evidence alone cannot change it. Missing or ambiguous routing requires recovery/clarification, not an invented fallback.

A correction reasoning override is independent of the activation or prior correction. Omit it to use `max` for that round. Reusing a routing ID does not reuse the previous reasoning-effort override.

Plugin package version/source is likewise resolved from the current installation for each action; it is not inherited from the activation or prior correction.

This avoids generic `Target:` fields. Message type plus routing marker is sufficient. Removing repeated UUID prompts does not relax correction scope, cancellation, or independent-review requirements.

## Publication and retry

Evidence/blocker publication must be confirmed from the GitHub tool/API result. On ambiguous publication, check before retrying. Retry publication only; do not rerun implementation merely to repair reporting.

For a valid execution, evidence/blocker must contain the copied thread marker. If routing metadata is missing, automatic review delivery must fail closed rather than choose a fallback destination.

Evidence may report the actual installed plugin version/source used for traceability, but that report does not pin the next action.

## Security and secrets

Keep local bridge mechanics local:

- local script path
- named pipe path
- browser/session connection details
- authentication material

Only the human-supplied ChatGPT thread UUID needs to travel in GitHub comments for routing.

Never publish cookies, tokens, credential files, or secrets.

## Boundaries

The thread marker is not cryptographic authentication. The review workflow still validates the GitHub event/sender it trusts. A shared GitHub identity does not prove ChatGPT vs Codex authorship; role behavior comes from the current installed workflow contract and independent verification.
