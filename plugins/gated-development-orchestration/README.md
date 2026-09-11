# Gated Development Orchestration Plugin 1.4.2

This plugin wraps the shared **Gated Development Orchestration 1.4.2** skill for both ChatGPT Chat / Pro orchestration-review and local Codex implementation.

## Included

- `.codex-plugin/plugin.json` — plugin manifest
- `.app.json` — existing GitHub app reference; unchanged
- `skills/gated-development-orchestration/` — shared workflow contract

## 1.4.2 behavior

Implementation and independent review are routed by GitHub comment markers:

- `gated-development:activation:v1` -> Codex implementation
- `gated-development:review:v2 status=correction-required` -> Codex correction
- `gated-development:codex-evidence:v2` -> independent ChatGPT review transport
- `gated-development:blocker:v2` -> blocker record; may be routed to ChatGPT when blocker triage is configured
- PASS / verification-blocked / state comments -> durable ledger only

Every new executable activation and correction requires a ChatGPT thread routing marker. During activation or correction authoring, ChatGPT must ask the human for the current ChatGPT thread ID unless it has already been explicitly supplied for that exact executable comment. If the human does not provide a valid thread ID, the activation/correction cannot be published.

ChatGPT must not infer, invent, reuse from another conversation, or substitute a Codex session/thread ID. Codex copies the supplied marker unchanged into its evidence or blocker. The external review workflow then returns the review request to that exact ChatGPT conversation.

### Verification failures are repair feedback, not automatic blockers

A failed required build, test, or verification check must be diagnosed before Codex decides to stop.

- If the active implementation caused the failure and the fix stays inside the authorized scope, path boundary, architecture, and repository operations, Codex fixes it and reruns the failed prerequisite and dependent verification.
- Dependent tests do not run against stale binaries after a failed build, but the implementation session continues while an authorized repair exists.
- Codex reports a blocker only when resolution requires unauthorized scope/path/repository repair, a product or architecture decision, unavailable required environment/tool/access, unsafe runtime ownership, or an external/baseline defect with no authorized in-gate resolution.

Gate authors must not use blanket stop language such as `stop on required verification failure`. Stop conditions describe why further work is unsafe or unauthorized, not the fact that a verification command returned nonzero.

The thread marker is transport metadata only. It never grants product scope, implementation permission, correction authority, or acceptance.

## Launcher separation

The AquaTwin implementation runner is intentionally transport-only: it validates the delivery origin/basic shape and starts Codex. Case rules remain in the issue, source-of-truth documents, repository instructions, and this skill.

The ChatGPT return workflow is separate from the Codex launcher. Codex never directly invokes the ChatGPT bridge. The launcher also does not decide whether a failing build/test is repairable; that diagnosis belongs to Codex under the active gate.

## Compatibility

No MCP server is declared by this plugin. Existing GitHub app configuration remains subject to normal user/workspace connection and permission controls.
