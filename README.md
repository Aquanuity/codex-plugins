# Aquanuity Codex Plugins

Aquanuity's Codex plugin marketplace. The catalog lives at [`.agents/plugins/marketplace.json`](.agents/plugins/marketplace.json) and follows the [official Codex marketplace format](https://learn.chatgpt.com/docs/enterprise/plugin-management#supported-formats).

## Available plugins

| Plugin | Version | Purpose |
| --- | --- | --- |
| [Gated Development Orchestration](plugins/gated-development-orchestration/README.md) | 1.4.9 | Coordinate checkpoint development through GitHub work orders, Codex implementation, and independent ChatGPT review. |

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
      execution-artifacts.md
```

The catalog's `source.path` resolves from the repository root. Plugin version, display information, skills, and app references remain in the plugin manifest.

## Version 1.4.9 behavior

Version 1.4.9 adds an explicit **Extra High vs Max execution policy** for Codex work. New executable activations and corrections no longer rely on an omitted-field default:

- `xhigh` (Extra High) is the normal choice for standard checkpoint implementation and routine bounded corrections.
- `max` is an escalation for materially harder rounds: repeated unresolved work after a reasonable `xhigh` attempt, difficult causal debugging, ambiguous behavior/ownership across several subsystems, unusually deep cross-layer reconciliation, or an explicit human request for Max.
- Max is not selected simply because a checkpoint is important, spans many files, or has strict verification.
- Every newly authored executable activation/correction states exactly one `Execution reasoning effort` field.
- Effort is re-selected for each correction; it is not inherited with the routing ID.
- Codex runs at the launcher-applied effort and does not self-relaunch to change it.

The AquaTwin launcher keeps its existing omitted-field `max` fallback only so historical already-posted work orders remain compatible. Current v1.4.9 authoring explicitly states the intended effort, ensuring new Codex runs start at the selected level without rewriting history. See [Model selection](plugins/gated-development-orchestration/skills/gated-development-orchestration/references/model-selection.md).

Ordinary ChatGPT Chat / Pro loads the current workflow directly from this repository; Codex keeps using its currently installed plugin. ChatGPT resolves `main` once per action and reads the manifest, `SKILL.md`, and required references from that same commit. It reports the loaded version/source without freezing the snapshot for later gates or claiming a plugin was installed. Missing repository access or required references remains a precise capability block. See [Workflow source by execution surface](plugins/gated-development-orchestration/skills/gated-development-orchestration/SKILL.md#workflow-source-by-execution-surface).

Version 1.4.7 keeps generated run logs/reports out of git and adds artifact-backed publication. For automated AquaTwin runs, Codex stages one redacted review bundle plus an authored evidence report under its existing request directory, then dispatches the dedicated artifact publisher. That short upload job appends actual artifact references and posts the single terminal comment; neither the original dispatcher nor Codex waits for independent review.

Artifacts request 30-day retention. Reviewers fetch raw files only when needed for material proof; required acceptance checks remain binding. Publication has duplicate suppression and publication-only retry. Personal GitHub credentials preserve the downstream issue-comment trigger; local Windows cleanup is separate from artifact expiration. See the [complete execution-artifact contract](plugins/gated-development-orchestration/skills/gated-development-orchestration/references/execution-artifacts.md). The publisher workflow/helper live in AquaTwin, not in this plugin package.

Version 1.4.6 establishes **gate-level routing reuse**. The human supplies the ChatGPT thread ID at activation. Ask if it is absent and do not activate without a valid ID. Subsequent corrections reuse the established gate routing marker without asking the human to resubmit or reconfirm it each round.

Codex preserves its triggering marker in evidence/blocker; the reviewer resolves it from the applicable activation/correction chain and reuses it. Only an explicit human request supplying a replacement destination changes the route. Record that replacement in the next applicable work order, and propagate it through subsequent evidence and corrections. Missing or conflicting routing requires recovery or human clarification, never a fabricated or default destination. Earlier comments remain history.

The plugin includes the workflow contract and GitHub app reference; the implementation launcher and ChatGPT return transport require separate setup. Routing reuse does not change the existing marker format or require another workflow/dispatch. See the [automation handoff](plugins/gated-development-orchestration/skills/gated-development-orchestration/references/automation-handoff.md).

Version 1.4.5 adds **bounded incidental repair authority**: the planned file list is a primary boundary, not an automatic stop for a necessary adjacent compile/test fix. Codex may repair a problem introduced or exposed by the active gate outside that list only when it is directly necessary, mechanical/low-risk, minimal, and does not expand product behavior, architecture, ownership, public contracts, persistence/authorization semantics, dependencies/frameworks, or repository/build policy. Explicit protected/read-only paths, no-write gates, and human prohibitions still apply.

Codex must record the diagnosis before editing, reverify without weakening tests, and disclose every off-list repair and actual outcome in evidence. ChatGPT independently reviews the qualification and cumulative scope. No new runner flag, workflow, or dispatch is needed. See the [complete repair rule](plugins/gated-development-orchestration/skills/gated-development-orchestration/SKILL.md#bounded-incidental-repair).

The workflow-version rules introduced in 1.4.4 remain: gates no longer pin a Gated Development Orchestration package version/source. The stable workflow identity is `gated-development-orchestration@aquanuity`, and each action loads the current workflow from the source selected for its execution surface. Historical plugin pins in older gate records are provenance only and must not force use of obsolete packages or become blockers. Product source commits, gate scope, branch/baseline, path boundaries, acceptance criteria, and work-order history remain frozen according to the case.

The verification-failure rules from 1.4.2 remain: a failed required build/test/check is not automatically a blocker. Codex diagnoses the failure, repairs self-introduced defects when the fix remains inside the authorized gate, and reruns verification. Only failures that cannot be resolved within the authorized scope/environment become blockers. Dependent tests wait for their prerequisite build to pass rather than running against stale binaries.

## Package provenance

Version 1.4.9 is maintained directly in this marketplace repository. The plugin manifest and `SKILL.md` metadata identify the currently published package version. Gate work orders intentionally do not freeze that version; Codex resolves the installed plugin while ordinary ChatGPT resolves the current repository package.

`.gitattributes` disables line-ending conversion for the plugin package.

To add another plugin, place its complete package under `plugins/<plugin-name>/` and append an entry to the marketplace catalog. Match the entry name to the plugin manifest and use `./plugins/<plugin-name>` as its local source path.
