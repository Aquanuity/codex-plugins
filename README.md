# Aquanuity Codex Plugins

Aquanuity's Codex plugin marketplace. The catalog lives at [`.agents/plugins/marketplace.json`](.agents/plugins/marketplace.json).

## Available plugins

| Plugin | Version | Purpose |
| --- | --- | --- |
| [Gated Development Orchestration](plugins/gated-development-orchestration/README.md) | 3.0.0 | Coordinate human-verifiable product checkpoints through specialized ChatGPT Definition/Discovery/Implementation/Review rounds and fresh Codex Evidence / Testing rounds. |

The marketplace identifier is `aquanuity`.

## Install in Codex

```sh
codex plugin marketplace add Aquanuity/codex-plugins --ref main
codex plugin add gated-development-orchestration@aquanuity
```

Check discovery with:

```sh
codex plugin list --marketplace aquanuity --available --json
```

After installation/update, start a new Codex task to pick up the current plugin package. Connect GitHub and grant access to repositories where the workflow will be used.

## Package layout

```text
.agents/plugins/marketplace.json
plugins/gated-development-orchestration/
  .codex-plugin/plugin.json
  .app.json
  README.md
  skills/gated-development-orchestration/
    SKILL.md
    references/
      rounds-and-checkpoints.md
      authority-and-lifecycle.md
      discovery-checkpoints.md
      automation-handoff.md
      evidence-and-review.md
      gate-issue-templates.md
      model-selection.md
      execution-artifacts.md
```

## Version 3.0.0 behavior

GDO v3 makes **Round**, **Checkpoint**, and **worker identity** first-class concepts.

### Worker model

```text
Governance ChatGPT thread
  Definition
  Discovery
  Independent Review

Implementation ChatGPT thread
  Implementation

Fresh Codex session every round
  Evidence / Testing
```

The two ChatGPT thread IDs persist through the checkpoint lifecycle and are propagated through GitHub comments. Every Evidence / Testing round starts a new Codex session.

GitHub remains authoritative; worker memory and thread/session IDs are context/routing only.

### Human-verifiable checkpoints

Top-level checkpoints are meaningful, reasonably substantial product stages where a human can stop and inspect the UI/product to decide whether development is on track.

Mechanical engineering milestones such as “class created” or “provider registered” are not top-level checkpoints. A substantial product checkpoint may be decomposed into engineering sub-checkpoints such as CP4A/CP4B/CP4C/CP4D.

### Canonical rounds

- Definition Round
- Discovery Round
- Implementation Round
- Evidence / Testing Round
- Independent Review Round

Only Independent Review may issue PASS.

### v3 routing safety

v3 intentionally uses new first-line lifecycle markers. Existing v2 AquaTwin automation routed implementation activations to Codex; v3 assigns substantive implementation to a separate ChatGPT thread. New markers therefore fail closed until the runner transport is migrated.

See the [v3 plugin README](plugins/gated-development-orchestration/README.md) and [shared workflow skill](plugins/gated-development-orchestration/skills/gated-development-orchestration/SKILL.md).

## Package provenance

Version 3.0.0 is maintained directly in this marketplace repository. Product/source-of-truth commits and checkpoint contracts may be frozen; workflow package source remains current-by-execution-surface unless explicitly overridden by the human.

`.gitattributes` disables line-ending conversion for the plugin package.
