# Aquanuity Codex Plugins

Aquanuity's plugin marketplace. The catalog lives at `.agents/plugins/marketplace.json`.

## Available plugins

| Plugin | Version | Purpose |
| --- | --- | --- |
| [Gated Development Orchestration](plugins/gated-development-orchestration/README.md) | 4.0.0 | Coordinate human-verifiable product checkpoints with a lean workflow core, dedicated role skills, fresh Evidence sessions, and independent review. |

Marketplace identifier: `aquanuity`.

## Install in Codex

```sh
codex plugin marketplace add Aquanuity/codex-plugins --ref main
codex plugin add gated-development-orchestration@aquanuity
```

After installation/update, start a new task to pick up the current plugin package and connect GitHub where the workflow requires repository authority.

## GDO 4 package layout

```text
plugins/gated-development-orchestration/
  .codex-plugin/plugin.json
  .app.json
  load-contract.json
  README.md
  skills/
    gdo-workflow/SKILL.md
    gdo-definition/SKILL.md
    gdo-discovery/SKILL.md
    gdo-implementation/SKILL.md
    gdo-evidence/SKILL.md
    gdo-independent-review/SKILL.md
    gated-development-orchestration/SKILL.md   # compatibility shim
```

Normal v4 work loads the workflow core plus exactly one active role skill and only justified conditional references. The v3 lifecycle markers and durable worker model remain compatible; package v4 changes instruction architecture, not checkpoint protocol semantics.

Migration/rollout authority: https://github.com/kelvin-wat/actions-runner/issues/2
