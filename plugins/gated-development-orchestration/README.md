# Gated Development Orchestration Plugin 1.4.6

This plugin wraps the shared **Gated Development Orchestration 1.4.6** skill for both ChatGPT Chat / Pro orchestration-review and local Codex implementation.

## Included

- `.codex-plugin/plugin.json` — plugin manifest
- `.app.json` — existing GitHub app reference; unchanged
- `skills/gated-development-orchestration/` — shared workflow contract

## 1.4.6 behavior

Implementation and independent review are routed by GitHub comment markers:

- `gated-development:activation:v1` -> Codex implementation
- `gated-development:review:v2 status=correction-required` -> Codex correction
- `gated-development:codex-evidence:v2` -> independent ChatGPT review transport
- `gated-development:blocker:v2` -> blocker record; may be routed to ChatGPT when blocker triage is configured
- PASS / verification-blocked / state comments -> durable ledger only

### Supply the routing ID at activation; reuse it thereafter

Every executable activation and correction still requires exactly one ChatGPT thread routing marker. **The human supplies the ID at activation, not again for every correction.** Ask for it when activating if it has not been supplied; without a valid supplied ID, do not activate.

The activation establishes the gate's review-routing thread. Codex copies its triggering marker unchanged into evidence/blocker. The reviewer resolves the applicable activation/correction chain, verifies evidence propagation, and reuses the established marker in subsequent corrections without asking for fresh UUID input.

Only an explicit human request supplying a replacement destination changes the route. Record it in the next applicable activation/correction with exactly one new marker; from that work order onward, evidence/blocker and later corrections use the replacement. Do not change destination merely because review occurs in another chat, and do not let stale evidence reset a newer route.

If a correction's route is genuinely missing or ambiguous, recover it from the applicable chain or ask for clarification before publishing. Never invent a route, substitute a Codex thread ID or a fixed default, or silently fall back to manual delivery. Existing gate history remains unchanged; open gates with a valid established route can reuse it under this contract.

```text
Activation: human supplies A
  -> Codex evidence A -> review A
  -> correction A -> Codex evidence A -> review A
  -> later corrections continue with A

Explicit human change to B:
  -> next applicable correction B -> evidence B -> review B
  -> later corrections continue with B
```

The routing ID is metadata, not repeated approval. Correction scope, execution authority, and independent review remain governed by the existing workflow. No new marker format, workflow, or dispatch is introduced.

### Bounded incidental repair authority

Version 1.4.5 treats listed paths as the **primary authorized path boundary**, not an automatic stop for every omitted file. Codex may make a minimal adjacent off-list repair without another approval round when the active work introduced or exposed it, it is required to compile/test/verify the authorized gate, it is mechanical/low-risk, and it introduces no product-behavior, architecture, ownership, public-contract, persistence/authorization, dependency/framework, or repository/build-policy expansion.

Codex records why the repair qualifies before editing, makes the smallest coherent change, reruns prerequisite/dependent checks without weakening them, and explicitly lists the off-list repair and results in evidence. The reviewer independently checks qualification and cumulative scope. A missing import, explicit generic argument, fixture wiring, or test compile/link item can qualify; a small diff alone is not permission.

Explicit read-only/protected/no-touch restrictions and human denials still win. Analysis-only gates stay no-write. Repository-state repair, unsafe runtime changes, unrelated cleanup, or material design decisions still require authorization. If qualification cannot be established, report the specific blocker rather than only `file not pre-approved`. No new runner flag, workflow, or dispatch is added.

See [the full incidental repair rule](skills/gated-development-orchestration/SKILL.md#bounded-incidental-repair).

### Current installed plugin, not a frozen gate pin

The workflow plugin identity is:

```text
gated-development-orchestration@aquanuity
```

Version 1.4.4 makes plugin evolution explicit:

- product/source-of-truth commits, gate scope, branch/baseline, path boundaries, acceptance criteria, and executable work orders may be frozen as required;
- the Gated Development Orchestration **plugin version/source is not frozen by the gate**;
- each orchestration, implementation, correction, blocker, and review action uses the currently installed `gated-development-orchestration@aquanuity` plugin;
- do not copy/pin a predecessor gate's plugin version, marketplace repo SHA, package commit, or historical `SKILL.md` URL;
- historical plugin version/source lines in old gate records are provenance only and must not force Codex or ChatGPT to use an obsolete package;
- evidence/review may report the actual installed plugin version/source used for traceability, but that report does not pin later actions.

A plugin update changes workflow mechanics for subsequent actions without rewriting the gate's frozen product/repository authority.

### Per-round reasoning effort

AquaTwin's Codex runner defaults each executable activation/correction to `max` reasoning effort.

To override one specific round, put exactly one of these fields in that activation or correction comment:

```text
- Execution reasoning effort: `<minimal|low|medium|high|xhigh|max>`
```

Examples:

```text
- Execution reasoning effort: `xhigh`
- Execution reasoning effort: `high`
```

If the field is omitted, the runner uses `max`. The override applies only to that executable comment; later corrections do not inherit it. Duplicate or unsupported values are malformed delivery.

Routing is inherited; reasoning-effort overrides are not. A correction reusing thread A still uses `max` when its effort field is omitted.

### Verification failures are repair feedback, not automatic blockers

A failed required build, test, or verification check must be diagnosed before Codex decides to stop.

- If the repair fits primary authorized paths or qualifies for bounded incidental repair without changing the authorized product scope, architecture, or repository operations, Codex fixes it and reruns the failed prerequisite and dependent verification.
- Dependent tests do not run against stale binaries after a failed build, but the implementation session continues while an authorized repair exists.
- Codex reports a blocker only when resolution requires unauthorized scope/path/repository repair, a product or architecture decision, unavailable required environment/tool/access, unsafe runtime ownership, or an external/baseline defect with no authorized in-gate resolution.

Gate authors must not use blanket stop language such as `stop on required verification failure`. Stop conditions describe why further work is unsafe or unauthorized, not the fact that a verification command returned nonzero.

The thread marker and reasoning-effort field are transport/runtime metadata only. Neither grants product scope, implementation permission, correction authority, or acceptance.

## Launcher separation

The AquaTwin implementation runner is intentionally transport-only: it validates the delivery origin/basic shape, resolves the optional reasoning-effort field, and starts Codex. Case rules remain in the issue, source-of-truth documents, repository instructions, and the currently installed skill.

The ChatGPT return workflow is separate from the Codex launcher. Codex never directly invokes the ChatGPT bridge. The launcher also does not decide whether a failing build/test is repairable; that diagnosis belongs to Codex under the active gate/current plugin.

## Compatibility

No MCP server is declared by this plugin. Existing GitHub app configuration remains subject to normal user/workspace connection and permission controls.
