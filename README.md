# Aquanuity Codex Plugins

Aquanuity's Codex plugin marketplace. The catalog lives at [`.agents/plugins/marketplace.json`](.agents/plugins/marketplace.json).

## Available plugins

| Plugin | Version | Purpose |
| --- | --- | --- |
| [Gated Development Orchestration](plugins/gated-development-orchestration/README.md) | 2.0.0 | Coordinate ChatGPT discovery/specification, bounded Codex implementation, routed discovery return, and independent ChatGPT review. |

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

After installation/update, start a new Codex task to pick up the current plugin package. Connect GitHub and grant access to the repositories where the workflow will be used.

For a local checkout:

```sh
git clone https://github.com/Aquanuity/codex-plugins.git
codex plugin marketplace add ./codex-plugins
codex plugin add gated-development-orchestration@aquanuity
```

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
      discovery-checkpoints.md
      automation-handoff.md
      evidence-and-review.md
      gate-issue-templates.md
      model-selection.md
      execution-artifacts.md
```

## Version 2.0.0 behavior

v2 introduces a first-class **discovery checkpoint** model and changes how reasoning is allocated across the workflow.

### Discovery can happen anywhere

CP1 is frequently discovery, but neither CP1 nor any other checkpoint number has special discovery authority. Any foreseeable material discovery may be inserted into the gate plan. Unexpected material discovery during implementation becomes a linked child discovery checkpoint such as `CP4.D1`.

ChatGPT Chat / Pro normally performs discovery at Extra High / Pro: repository/native-behavior investigation, ownership/architecture tracing, product clarification, source-of-truth authoring/amendment, and downstream checkpoint decomposition. Material product/architecture decisions remain subject to explicit human approval.

### Codex is normally the execution lane

Implementation gates should be discovery-complete before activation. Normal Codex execution reasoning is `medium`; `high`, `xhigh`, and `max` are reserved for increasing levels of **technical execution difficulty**.

Max is not a substitute for unresolved product/architecture discovery.

### Surprise discovery returns through the existing UUID route

Codex publishes `codex-evidence:v2` with the exact triggering ChatGPT thread marker and:

```text
Submission outcome: DISCOVERY REQUIRED
```

The existing evidence return reaches the same ChatGPT conversation. ChatGPT creates/executes a linked discovery child checkpoint, records the approved result, then either reactivates the original gate with a new `activation:v1` work-order version or supersedes it and creates replacement implementation gates.

### Existing safeguards retained

v2 keeps current-by-surface workflow loading, gate-level ChatGPT route reuse, bounded incidental repair, verification-failure diagnosis, artifact-backed evidence publication, remote independent implementation review, and non-self-approval boundaries.

See the [v2 plugin README](plugins/gated-development-orchestration/README.md) and the [shared workflow skill](plugins/gated-development-orchestration/skills/gated-development-orchestration/SKILL.md).

## Package provenance

Version 2.0.0 is maintained directly in this marketplace repository. Product gates intentionally do not freeze the workflow package version/source; the current contract is resolved by execution surface while product/work-order authority remains frozen according to the case.

`.gitattributes` disables line-ending conversion for the plugin package.
