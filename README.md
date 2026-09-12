# Aquanuity Codex Plugins

Aquanuity's Codex plugin marketplace. The catalog lives at [`.agents/plugins/marketplace.json`](.agents/plugins/marketplace.json) and follows the [official Codex marketplace format](https://learn.chatgpt.com/docs/enterprise/plugin-management#supported-formats).

## Available plugins

| Plugin | Version | Purpose |
| --- | --- | --- |
| [Gated Development Orchestration](plugins/gated-development-orchestration/README.md) | 1.4.5 | Coordinate checkpoint development through GitHub work orders, Codex implementation, and independent ChatGPT review. |

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

## Version 1.4.5 behavior

Every new executable activation or correction requires the current ChatGPT thread ID, explicitly supplied for that comment. If it has not been supplied, the orchestrator must ask the human. Without a valid ID, it cannot publish the activation or correction.

Codex preserves the supplied routing marker in its evidence or blocker. The plugin includes the workflow contract and GitHub app reference; the implementation launcher and ChatGPT return transport require separate setup. See the [automation handoff](plugins/gated-development-orchestration/skills/gated-development-orchestration/references/automation-handoff.md).

Version 1.4.5 adds **bounded incidental repair authority**: the planned file list is a primary boundary, not an automatic stop for a necessary adjacent compile/test fix. Codex may repair a problem introduced or exposed by the active gate outside that list only when it is directly necessary, mechanical/low-risk, minimal, and does not expand product behavior, architecture, ownership, public contracts, persistence/authorization semantics, dependencies/frameworks, or repository/build policy. Explicit protected/read-only paths, no-write gates, and human prohibitions still apply.

Codex must record the diagnosis before editing, reverify without weakening tests, and disclose every off-list repair and actual outcome in evidence. ChatGPT independently reviews the qualification and cumulative scope. No new runner flag, workflow, or dispatch is needed. See the [complete repair rule](plugins/gated-development-orchestration/skills/gated-development-orchestration/SKILL.md#bounded-incidental-repair).

The workflow-version rules introduced in 1.4.4 remain: gates no longer pin a Gated Development Orchestration package version/source. The stable workflow identity is `gated-development-orchestration@aquanuity`, and each orchestration/implementation/review action uses the currently installed plugin. Historical plugin pins in older gate records are provenance only and must not force use of obsolete packages or become blockers. Product source commits, gate scope, branch/baseline, path boundaries, acceptance criteria, and work-order history remain frozen according to the case.

The runner's per-round reasoning override field remains:

```text
- Execution reasoning effort: `<minimal|low|medium|high|xhigh|max>`
```

Omit it to use the runner default `max`. An override applies only to the activation/correction comment that contains it and is not inherited by later correction rounds.

The verification-failure rules from 1.4.2 remain: a failed required build/test/check is not automatically a blocker. Codex diagnoses the failure, repairs self-introduced defects when the fix remains inside the authorized gate, and reruns verification. Only failures that cannot be resolved within the authorized scope/environment become blockers. Dependent tests wait for their prerequisite build to pass rather than running against stale binaries.

## Package provenance

Version 1.4.5 is maintained directly in this marketplace repository. The plugin manifest and `SKILL.md` metadata identify the currently published package version. Gate work orders intentionally do not freeze that version; execution/review resolves the current installed plugin.

`.gitattributes` disables line-ending conversion for the plugin package.

To add another plugin, place its complete package under `plugins/<plugin-name>/` and append an entry to the marketplace catalog. Match the entry name to the plugin manifest and use `./plugins/<plugin-name>` as its local source path.
