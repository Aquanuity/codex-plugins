# Gated Development Orchestration Plugin 2.0.0

This package provides the shared **Gated Development Orchestration v2.0.0** contract for ChatGPT Chat / Pro orchestration-discovery-review and local Codex implementation.

## v2 architecture

v2 separates discovery/product reasoning from deterministic implementation:

```text
ChatGPT: discover -> specify -> decompose -> independently judge
Codex: execute -> verify -> repair -> report
Unexpected material uncertainty: return to ChatGPT discovery
```

### Discovery is not CP1-specific

`discovery` is a first-class gate type that may appear anywhere in the checkpoint plan.

CP1 is commonly discovery because early feature uncertainty is often high, but:

- CP1 does not have to be discovery;
- discovery is not limited to CP1;
- foreseeable later discovery should be inserted as its own discovery checkpoint;
- surprise discovery during implementation becomes a linked child checkpoint such as `CP4.D1`.

ChatGPT Chat / Pro normally executes discovery at Extra High / Pro, investigating repository/native behavior, ownership, architecture, product meaning, acceptance oracle, and source-of-truth. Material product/architecture/source-of-truth decisions require human approval before controlling downstream implementation.

See [Discovery checkpoints and return-to-ChatGPT](skills/gated-development-orchestration/references/discovery-checkpoints.md).

### Codex normally runs at Medium

Once an implementation gate is discovery-complete and execution-ready, Codex normally starts at:

```text
- Execution reasoning effort: `medium`
```

Escalation is for **technical implementation difficulty**, not missing product knowledge:

- `medium` — normal implementation/correction/reactivation;
- `high` — elevated implementation complexity;
- `xhigh` — difficult implementation/debugging under known intended behavior;
- `max` — exceptional technical escalation after lower tiers are inadequate or explicit human request;
- unresolved discovery — return to ChatGPT instead of using Max as a discovery substitute.

See [Model selection and runtime](skills/gated-development-orchestration/references/model-selection.md).

### Foreseeable discovery

If an implementation checkpoint will require material architecture/behavior/ownership discovery, create and complete a discovery checkpoint first. Do not activate Codex with Max to compensate for a work order that is not execution-ready.

### Surprise discovery during Codex execution

Codex stops before inventing the missing product/architecture decision and publishes normal routed evidence:

```text
<!-- gated-development:codex-evidence:v2 -->
<!-- gated-development:chatgpt-thread:v1 id=<copied UUID> -->
...
Submission outcome: DISCOVERY REQUIRED
```

The existing evidence-return workflow therefore reaches the same ChatGPT conversation without a new transport protocol.

ChatGPT creates a linked discovery child checkpoint (normally `<Gate>.D<n>`), investigates at Extra High / Pro, records/amends source-of-truth as authorized, and obtains human approval for material decisions.

Then either:

- the original gate remains truthful -> record a discovery amendment and publish a new `activation:v1` comment with incremented work-order version, same route, approved source commit, resume SHA, and explicit Codex effort (normally Medium); or
- discovery materially changes the gate -> supersede it and create replacement implementation gate(s).

The frozen gate is never silently rewritten to hide discovery.

## Existing v1 mechanics retained

v2 retains the useful mechanics developed in v1:

- workflow source is current-by-execution-surface rather than frozen into product gates;
- human-supplied ChatGPT route is established on initial activation and reused through corrections/reactivations;
- bounded incidental repair for mechanical gate-related verification fixes;
- verification failures are diagnosed rather than automatically becoming blockers;
- artifact-backed evidence publication keeps generated logs out of git;
- Codex never self-approves or directly invokes the ChatGPT bridge;
- ChatGPT implementation review independently fetches remote code/diff/evidence.

## Package contents

- `.codex-plugin/plugin.json` — manifest/version
- `.app.json` — GitHub app reference
- `skills/gated-development-orchestration/SKILL.md` — shared contract
- references:
  - `authority-and-lifecycle.md`
  - `discovery-checkpoints.md`
  - `gate-issue-templates.md`
  - `evidence-and-review.md`
  - `automation-handoff.md`
  - `model-selection.md`
  - `execution-artifacts.md`

## Workflow source

Codex uses the currently installed `gated-development-orchestration@aquanuity` plugin. Ordinary ChatGPT Chat / Pro resolves the current package from `Aquanuity/codex-plugins` `main` for each action and loads the manifest, skill, and phase-required references from the same repository commit.

Product/source-of-truth commits, implementation gate scope, branch/base, acceptance criteria, and work-order history may be frozen. The workflow package version/source is provenance, not product authority.

## Compatibility

The implementation launcher does not need a new post-discovery marker: v2 reuses `activation:v1` for reactivation and `codex-evidence:v2` for discovery return.

Historical executable comments without an explicit reasoning field may continue using the existing launcher fallback. New v2-authored Codex work always states reasoning effort explicitly.

No MCP server is declared by this plugin. GitHub access remains subject to normal connection/permission controls.
