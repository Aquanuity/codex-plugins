# Aquanuity Codex Plugins

Aquanuity's Codex plugin marketplace. The catalog lives at [`.agents/plugins/marketplace.json`](.agents/plugins/marketplace.json) and follows the [official Codex marketplace format](https://learn.chatgpt.com/docs/enterprise/plugin-management#supported-formats).

## Available plugins

| Plugin | Version | Purpose |
| --- | --- | --- |
| [Gated Development Orchestration](plugins/gated-development-orchestration/README.md) | 1.4.2 | Coordinate checkpoint development through GitHub work orders, Codex implementation, and independent ChatGPT review. |

The marketplace identifier is `aquanuity`. Gated Development Orchestration is the first catalog entry.

## Install in Codex

Use a Codex CLI version that supports `codex plugin`:

```sh
codex plugin marketplace add Aquanuity/codex-plugins --ref main
codex plugin add gated-development-orchestration@aquanuity
```

Check discovery with:

```sh
codex plugin list --marketplace aquanuity --available --json
```

After installation, start a new Codex task to pick up the plugin. Connect GitHub when prompted and grant access to the repositories where you intend to use the workflow.

For a local checkout, register its repository root instead:

```sh
git clone https://github.com/Aquanuity/codex-plugins.git
codex plugin marketplace add ./codex-plugins
codex plugin add gated-development-orchestration@aquanuity
```

### Workspace import

Workspace admins can use **Admin > Plugins > Add > Import marketplace** with source [Aquanuity/codex-plugins](https://github.com/Aquanuity/codex-plugins), an empty **Path**, and branch `main`. Review installation and app access settings after import. See [OpenAI's import instructions](https://learn.chatgpt.com/docs/enterprise/plugin-management#configure-a-marketplace-sync).

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
      authority-and-lifecycle.md
      automation-handoff.md
      evidence-and-review.md
      gate-issue-templates.md
      model-selection.md
```

The catalog's `source.path` resolves from the repository root. Plugin version, display information, skills, and app references remain in the plugin manifest.

## Version 1.4.2 behavior

Every new executable activation or correction requires the current ChatGPT thread ID, explicitly supplied for that comment. If it has not been supplied, the orchestrator must ask the human. Without a valid ID, it cannot publish the activation or correction.

Codex preserves the supplied routing marker in its evidence or blocker. The plugin includes the workflow contract and GitHub app reference; the implementation launcher and ChatGPT return transport require separate setup. See the [automation handoff](plugins/gated-development-orchestration/skills/gated-development-orchestration/references/automation-handoff.md).

Version 1.4.2 also fixes verification-failure handling: a failed required build/test/check is not automatically a blocker. Codex diagnoses the failure, repairs self-introduced defects when the fix remains inside the authorized gate, and reruns verification. Only failures that cannot be resolved within the authorized scope/environment become blockers. Dependent tests wait for their prerequisite build to pass rather than running against stale binaries.

## Package provenance

Version 1.4.2 is maintained directly in this marketplace repository. The plugin manifest and `SKILL.md` metadata are the authoritative package-version declarations. `.gitattributes` disables line-ending conversion for the plugin package.

To add another plugin, place its complete package under `plugins/<plugin-name>/` and append an entry to the marketplace catalog. Match the entry name to the plugin manifest and use `./plugins/<plugin-name>` as its local source path.
