# Automation Handoff Reference

This is the shared automation contract for ChatGPT orchestration/review, local Codex implementation, the transport-only implementation runner, the artifact publisher, and the review-only return workflow.

## Current workflow plugin

Use the shared **`gated-development-orchestration@aquanuity`** workflow contract from the source selected in [Workflow source by execution surface](../SKILL.md#workflow-source-by-execution-surface): Codex uses its currently installed plugin; ordinary ChatGPT Chat / Pro uses the current repository package. Load all required references from that same selected source.

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

Marker versions, loaded workflow version, checkpoint identity, and work-order version are separate concepts.

## Thread routing marker

Every executable activation/correction requires exactly one:

```text
<!-- gated-development:chatgpt-thread:v1 id=<UUID> -->
```

This marker is transport metadata only. The human supplies its ID at activation; subsequent correction rounds reuse it. It is not a per-round authorization token.

### Orchestrator and reviewer

At activation, ask for the human-supplied current ChatGPT thread ID if it has not already been supplied for that activation. Validate UUID shape. Without a valid supplied ID, do not activate. The activation establishes the gate's review-routing thread.

For every newly authored executable activation/correction, also select and state the per-round Codex reasoning effort under [Runtime reasoning selection](#runtime-reasoning-selection). `xhigh` is the normal choice; `max` is a deliberate escalation. Do not rely on the launcher's historical omitted-field fallback for new work.

For subsequent corrections:

- read the applicable activation/correction chain and check that the exact evidence copied its triggering marker;
- reuse the established gate routing marker unchanged; do not ask the human to resupply or reconfirm it for each correction;
- re-evaluate the reasoning effort for the correction and state exactly one `Execution reasoning effort` field; routine bounded corrections normally use `xhigh`, while a genuinely difficult/root-cause correction may use `max`;
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
- use the reasoning effort already applied by the launcher; do not self-relaunch or rewrite the work order to change reasoning effort after startup;
- treat `xhigh` as a fully valid normal execution level, not as a blocker or permission to request Max before doing authorized work;
- copy the exact triggering marker unchanged into evidence or blocker, including any replacement explicitly recorded by the orchestrator;
- do not invent, infer, normalize, replace, or select a different thread ID;
- do not invoke the ChatGPT bridge directly;
- if the marker is absent/multiple/malformed, do not execute the gate; report a blocker when possible and stop;
- do not fetch/use an old plugin package merely because historical case text names one.

### Review transport

The review workflow extracts exactly one marker from evidence/blocker and sets the local bridge's explicit ChatGPT thread target. It sends a compact review request containing repository, issue, and exact evidence URL. The prompt instructs ordinary ChatGPT to resolve Aquanuity/codex-plugins main and load the current package manifest, SKILL.md, and required review references from that same commit, as defined in [Workflow source by execution surface](../SKILL.md#workflow-source-by-execution-surface). ChatGPT reports the loaded source/version and independently verifies the case; it does not require installed-plugin access. This changes reviewer instruction loading only; Codex workers keep their installed-plugin source.

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
- whether a particular round deserved `xhigh` or `max`

Those belong to ChatGPT/orchestrator selection plus Codex following the case and current installed plugin. The implementer preflight rejects a malformed/missing thread marker before development work begins.

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

A launch acknowledgment is not implementation completion or PASS. These are local run records, not a list of files to commit or blindly upload. Use a redacted, explicitly selected snapshot; final process records may not exist before publication dispatch.

## Visible console

Future executions may display readable live progress while preserving raw logs. Console visibility is presentation, not authorization or isolation policy.

Closing the execution console may interrupt its attached Codex process. A read-only viewer may be closed safely when it is explicitly implemented as view-only.

## Runtime reasoning selection

### Current authoring policy

Every newly authored executable activation/correction must contain exactly one standardized field:

```text
- Execution reasoning effort: `<minimal|low|medium|high|xhigh|max>`
```

Normal Gated Development Orchestration selection is:

- `xhigh` — default for normal checkpoint implementation and routine bounded corrections;
- `max` — explicit escalation for unusually difficult discovery/root-cause/architectural reconciliation, a repeated material failure after a reasonable `xhigh` attempt, or a human-requested Max round.

Do not choose `max` merely because a gate is important, touches multiple files, or has strict verification. Full selection criteria live in [Model selection](model-selection.md).

The human may explicitly choose another supported value for a round. Otherwise current workflow authoring should state `xhigh` or `max`; it must not omit the field and depend on fallback behavior.

### Runner compatibility behavior

The existing AquaTwin launcher still has a mechanical omitted-field fallback for historical already-authored comments:

```text
model_reasoning_effort=max
```

Runner behavior:

- one supported field -> that value with source `case-override`;
- omitted field -> `max` with source `runner-default` for backward compatibility;
- more than one field -> malformed delivery;
- unsupported value -> malformed delivery / no valid override.

A correction does not inherit reasoning effort from the activation or an earlier correction. Current workflow authoring re-selects and states the value on every executable correction.

The runner records the resolved value in its delivery record and inserts a run-local Codex shim that applies the resolved `model_reasoning_effort` to `codex exec`.

This is runtime configuration, not scope or acceptance authority. The runner does not decide whether `xhigh` or `max` is appropriate, and Codex does not self-relaunch to change it after startup.

## Artifact publication transport

For AquaTwin automated runs, load [Execution artifacts and publication](execution-artifacts.md). Codex prepares the authored report and closed review ZIP under the existing run's `publication` directory, writes the checksum/redaction readiness record last, then calls:

```powershell
gh workflow run codex-artifact-publish.yml --repo Aquanuity/AquaTwin --ref dev -f "request_id=$requestId"
```

The fixed workflow uses the original launcher `request_id`, not its finished job's artifact context. It derives fixed filenames and issue/routing correlation from the saved `request.json` on the same machine. It validates transport identity/readiness, snapshots inputs, suppresses duplicate publication, uploads one immutable bundle with 30-day requested retention, appends actual publisher run/artifact ID/URL/digests/expiration, and posts the terminal report. No branch/scope/acceptance policy moves into the publisher.

The comment must be posted with the trusted user's stored local `gh` login or optional `AT_EVIDENCE_TOKEN`, not the job's `GITHUB_TOKEN`, so the existing evidence-comment review trigger can fire. The publisher preserves the report's first two marker lines, never invokes ChatGPT, and exits after publication. A blocker remains a blocker; the current review workflow's evidence-only filter does not automatically triage it.

Codex stops after publication dispatch acknowledgment and reports queued/unconfirmed, not a fabricated evidence URL. Do not also post the terminal comment, wait for review, or keep the original launcher job open. The publisher's run owns the artifact; its run ID differs from the original launcher run. Its receipt is publication proof, not gate acceptance.

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
  -> activation + marker A + explicit xhigh/max reasoning selection
  -> Codex using current installed plugin at the selected runtime effort
  -> implement / verify / repair primary-path or qualifying incidental failures / re-verify
  -> prepare redacted report/bundle + readiness; dispatch artifact publisher and stop
  -> publisher uploads artifact, then posts evidence + marker A copied unchanged
  -> review workflow -> ChatGPT thread A
  -> independent ChatGPT review using current repository workflow source
      -> PASS (ledger only)
      OR
      -> correction-required + reused marker A + newly selected xhigh/max effort
          -> Codex -> bundle/publication handoff -> published evidence + marker A -> review workflow -> thread A
          -> repeat bounded correction/review under existing gate authority

Only on explicit human request to change destination to B:
  -> next applicable correction records the request + one marker B + its own reasoning selection
  -> Codex -> bundle/publication handoff -> published evidence + marker B -> review workflow -> thread B
  -> later corrections reuse B without asking again
```

Routing is inherited through the gate's current activation/correction chain; evidence alone cannot change it. Missing or ambiguous routing requires recovery/clarification, not an invented fallback.

Reasoning effort is independently selected for each executable round. Routine work normally uses `xhigh`; a difficult round may use `max`. Reusing a routing ID does not reuse the previous reasoning effort.

Plugin package version/source is likewise resolved from the current installation for each action; it is not inherited from the activation or prior correction.

This avoids generic `Target:` fields. Message type plus routing marker is sufficient. Removing repeated UUID prompts does not relax correction scope, cancellation, or independent-review requirements.

## Publication and retry

Evidence/blocker publication must be confirmed from GitHub, not inferred from successful publisher dispatch. The artifact publisher owns the final comment when that route is used; Codex must not duplicate it. On ambiguous publication, read the issue before retrying. The publisher receipt marker suppresses duplicate publication for the same immutable request/evidence/bundle. Retry publication only; do not rerun implementation, reactivate, or issue a correction merely to repair reporting. Unreferenced artifacts from interrupted attempts expire normally. See the execution-artifact contract for identity conflicts and retry recovery.

For a valid execution, evidence/blocker must contain the copied thread marker. If routing metadata is missing, automatic review delivery must fail closed rather than choose a fallback destination.

Evidence may report the actual installed plugin version/source used for traceability, but that report does not pin the next action.

## Artifact retention and review

Keep the issue summary/acceptance as durable history. Raw bundles request 30 days and are fetched on demand for material verification, not demanded by default. Essential missing proof still blocks review; an upload or digest is not PASS. The publisher removes only its temporary snapshot, not the original Windows logs. Local cleanup needs separate authorization and must not touch active runs or project data.

## Security and secrets

Keep local bridge mechanics local:

- local script path
- named pipe path
- browser/session connection details
- authentication material

Only the human-supplied ChatGPT thread UUID needs to travel in GitHub comments for routing.

Never publish cookies, tokens, credential files, or secrets.

## Boundaries

The thread marker is not cryptographic authentication. The review workflow still validates the GitHub event/sender it trusts. A shared GitHub identity does not prove ChatGPT vs Codex authorship; role behavior comes from the current workflow contract loaded for the execution surface and independent verification.
