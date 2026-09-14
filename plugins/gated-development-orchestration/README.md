# Gated Development Orchestration Plugin 1.4.9

This plugin wraps the shared **Gated Development Orchestration 1.4.9** skill for both ChatGPT Chat / Pro orchestration-review and local Codex implementation.

## Included

- `.codex-plugin/plugin.json` — plugin manifest
- `.app.json` — existing GitHub app reference; unchanged
- `skills/gated-development-orchestration/` — shared workflow contract

## 1.4.9 behavior

Version 1.4.9 makes Codex reasoning effort an **explicit per-round orchestration decision** instead of relying on the launcher's historical Max fallback.

For every newly authored executable activation and correction:

- **Extra High (`xhigh`) is the normal choice** for standard checkpoint implementation and routine bounded corrections.
- **Max (`max`) is an escalation level**, used when the round materially benefits from deeper exploration/checking: repeated unresolved work after a reasonable `xhigh` attempt, difficult root-cause debugging, ambiguous ownership/behavior across several subsystems, unusually deep cross-layer reconciliation, or an explicit human request for Max.
- Max is not selected merely because a task is important, spans many files, or has strict verification.
- The selected effort is written explicitly into the activation/correction with `- Execution reasoning effort: ...`.
- Corrections re-select effort independently. Routing is inherited through the gate; reasoning effort is not.
- Codex executes at the launcher-applied effort and does not self-relaunch to change it after startup.

The AquaTwin launcher retains its existing omitted-field `max` fallback only for compatibility with historical already-authored work orders. New v1.4.9 work must not rely on omission. This lets new Codex runs start at the intended reasoning level while preserving older GitHub history.

See [Model selection and runtime](skills/gated-development-orchestration/references/model-selection.md), [Gate and issue templates](skills/gated-development-orchestration/references/gate-issue-templates.md), and [Automation handoff](skills/gated-development-orchestration/references/automation-handoff.md).

### Current repository workflow source

Ordinary ChatGPT Chat / Pro loads the shared workflow directly from this repository's current `main` package. Codex workers continue loading their currently installed plugin. For each ChatGPT action, resolve `main`, then read the manifest, `SKILL.md`, and required references from the same commit. Report the actual version, repository commit, and loaded paths; do not claim installed-plugin access. See [Workflow source by execution surface](skills/gated-development-orchestration/SKILL.md#workflow-source-by-execution-surface) for exact paths and required review references.

Implementation and independent review are routed by GitHub comment markers:

- `gated-development:activation:v1` -> Codex implementation
- `gated-development:review:v2 status=correction-required` -> Codex correction
- `gated-development:codex-evidence:v2` -> independent ChatGPT review transport
- `gated-development:blocker:v2` -> blocker record; may be routed to ChatGPT when blocker triage is configured
- PASS / verification-blocked / state comments -> durable ledger only

### Keep generated logs out of git

Version 1.4.7 adds artifact-backed evidence publication. Codex prepares one redacted review bundle and concise report outside the repository, then dispatches `codex-artifact-publish.yml` in AquaTwin with its existing automation request ID. The separate publisher uploads the bundle, appends actual run/artifact ID/URL/digests/expiration, and posts the terminal report before exiting. The original implementation dispatcher still exits immediately, and Codex does not wait for ChatGPT or duplicate the terminal comment.

The publisher requests 30-day artifact retention, suppresses duplicate report publication, and uses trusted personal GitHub credentials so the evidence comment triggers the existing review workflow. Generated logs/reports are not committed by default. Reviewers inspect raw artifacts only for a material claim or required acceptance check; essential proof is never waived. Publication failures are retried without rerunning implementation. GitHub artifact expiry does not clean up Windows logs or authorize project-file deletion.

See [Execution artifacts and publication](skills/gated-development-orchestration/references/execution-artifacts.md) for fixed filenames, readiness schema, dispatch command, credential requirements, retrieval, and cleanup. Blocker reports remain blockers; automatic return triage depends on the separately configured review filter. This update does not repair the local ChatGPT adapter.

### Supply the routing ID at activation; reuse it thereafter

Every executable activation and correction still requires exactly one ChatGPT thread routing marker. **The human supplies the ID at activation, not again for every correction.** Ask for it when activating if it has not been supplied; without a valid supplied ID, do not activate.

The activation establishes the gate's review-routing thread. Codex copies its triggering marker unchanged into evidence/blocker. The reviewer resolves the applicable activation/correction chain, verifies evidence propagation, and reuses the established marker in subsequent corrections without asking for fresh UUID input.

Only an explicit human request supplying a replacement destination changes the route. Record it in the next applicable activation/correction with exactly one new marker; from that work order onward, evidence/blocker and later corrections use the replacement. Do not change destination merely because review occurs in another chat, and do not let stale evidence reset a newer route.

If a correction's route is genuinely missing or ambiguous, recover it from the applicable chain or ask for clarification before publishing. Never invent a route, substitute a Codex thread ID or a fixed default, or silently fall back to manual delivery. Existing gate history remains unchanged; open gates with a valid established route can reuse it under this contract.

```text
Activation: human supplies A + explicit reasoning selection
  -> Codex evidence A -> review A
  -> correction A + newly selected reasoning effort -> Codex evidence A -> review A
  -> later corrections continue with A but independently select effort

Explicit human change to B:
  -> next applicable correction B -> evidence B -> review B
  -> later corrections continue with B
```

The routing ID is metadata, not repeated approval. Correction scope, execution authority, and independent review remain governed by the existing workflow. Routing reuse itself introduces no new executable marker or development dispatch; the artifact publisher is a separate publication transport.

### Bounded incidental repair authority

Version 1.4.5 treats listed paths as the **primary authorized path boundary**, not an automatic stop for every omitted file. Codex may make a minimal adjacent off-list repair without another approval round when the active work introduced or exposed it, it is required to compile/test/verify the authorized gate, it is mechanical/low-risk, and it introduces no product-behavior, architecture, ownership, public-contract, persistence/authorization, dependency/framework, or repository/build-policy expansion.

Codex records why the repair qualifies before editing, makes the smallest coherent change, reruns prerequisite/dependent checks without weakening them, and explicitly lists the off-list repair and results in evidence. The reviewer independently checks qualification and cumulative scope. A missing import, explicit generic argument, fixture wiring, or test compile/link item can qualify; a small diff alone is not permission.

Explicit read-only/protected/no-touch restrictions and human denials still win. Analysis-only gates stay no-write. Repository-state repair, unsafe runtime changes, unrelated cleanup, or material design decisions still require authorization. If qualification cannot be established, report the specific blocker rather than only `file not pre-approved`. No new runner flag, workflow, or dispatch is added.

See [the full incidental repair rule](skills/gated-development-orchestration/SKILL.md#bounded-incidental-repair).

### Current workflow source, not a frozen gate pin

The workflow plugin identity is:

```text
gated-development-orchestration@aquanuity
```

Version 1.4.4 makes plugin evolution explicit:

- product/source-of-truth commits, gate scope, branch/baseline, path boundaries, acceptance criteria, and executable work orders may be frozen as required;
- the Gated Development Orchestration **plugin version/source is not frozen by the gate**;
- each action uses the current `gated-development-orchestration@aquanuity` contract: installed plugin in Codex, current repository package in ordinary ChatGPT;
- do not copy/pin a predecessor gate's plugin version, marketplace repo SHA, package commit, or historical `SKILL.md` URL;
- historical plugin version/source lines in old gate records are provenance only and must not force Codex or ChatGPT to use an obsolete package;
- evidence/review may report the actual loaded workflow version/source used for traceability, but that report does not pin later actions.

A plugin update changes workflow mechanics for subsequent actions without rewriting the gate's frozen product/repository authority.

### Explicit per-round reasoning effort

The standardized field remains:

```text
- Execution reasoning effort: `<minimal|low|medium|high|xhigh|max>`
```

Under v1.4.9, **new activations/corrections always state it explicitly**. `xhigh` is the ordinary default selection; `max` is the deliberate escalation tier. A human may explicitly choose another supported value for a round.

The launcher's old omitted-field `max` behavior remains only for backward compatibility with historical comments. Do not intentionally omit the field from new executable work.

### Verification failures are repair feedback, not automatic blockers

A failed required build, test, or verification check must be diagnosed before Codex decides to stop.

- If the repair fits primary authorized paths or qualifies for bounded incidental repair without changing the authorized product scope, architecture, or repository operations, Codex fixes it and reruns the failed prerequisite and dependent verification.
- Dependent tests do not run against stale binaries after a failed build, but the implementation session continues while an authorized repair exists.
- Codex reports a blocker only when resolution requires unauthorized scope/path/repository repair, a product or architecture decision, unavailable required environment/tool/access, unsafe runtime ownership, or an external/baseline defect with no authorized in-gate resolution.

Gate authors must not use blanket stop language such as `stop on required verification failure`. Stop conditions describe why further work is unsafe or unauthorized, not the fact that a verification command returned nonzero.

The thread marker and reasoning-effort field are transport/runtime metadata only. Neither grants product scope, implementation permission, correction authority, or acceptance.

## Launcher separation

The AquaTwin implementation runner is intentionally transport-only: it validates the delivery origin/basic shape, resolves the reasoning-effort field when present, and starts Codex. Case rules remain in the issue, source-of-truth documents, repository instructions, and the currently installed skill.

The ChatGPT return workflow is separate from the Codex launcher. Codex never directly invokes the ChatGPT bridge. The launcher also does not decide whether a failing build/test is repairable; that diagnosis belongs to Codex under the active gate/current plugin.

## Compatibility

No MCP server is declared by this plugin. Existing GitHub app configuration remains subject to normal user/workspace connection and permission controls.
