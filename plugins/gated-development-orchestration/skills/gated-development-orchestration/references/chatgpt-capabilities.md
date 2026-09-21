# ChatGPT Capability Contract

## Purpose

Fresh ChatGPT workers must use the capabilities actually available on their current execution surface. They must not infer that a GDO action is impossible merely because a local terminal, worktree, or filesystem is absent.

Before declaring a required GDO action unavailable, the worker must inspect the available tools/connectors and determine whether the required operation can be performed through an authorized connected capability.

## Canonical GDO discovery anchors

For ordinary ChatGPT work, use these GitHub URLs as discovery anchors:

- Package root: https://github.com/Aquanuity/codex-plugins/tree/main/plugins/gated-development-orchestration
- Manifest: https://github.com/Aquanuity/codex-plugins/blob/main/plugins/gated-development-orchestration/.codex-plugin/plugin.json
- Skill: https://github.com/Aquanuity/codex-plugins/blob/main/plugins/gated-development-orchestration/skills/gated-development-orchestration/SKILL.md
- References directory: https://github.com/Aquanuity/codex-plugins/tree/main/plugins/gated-development-orchestration/skills/gated-development-orchestration/references

These URLs are discovery pointers, not workflow pins. Resolve `Aquanuity/codex-plugins` `main` to its current commit first, then fetch the manifest, `SKILL.md`, and all round-required references from that same commit.

Do not substitute remembered instructions or a historical installed copy when current repository source is required.

## AquaTwin / GitHub default

For AquaTwin repository and workflow work, the preferred connected capability is the **GitHub connector**.

Use it, when authorized, for operations such as:
- fetch issues, comments, branches, commits, diffs, files, pull requests, Actions runs, jobs, and logs;
- create or update issue comments and workflow ledger records;
- create repository blobs/trees/commits/branches for authorized implementation;
- create or update pull requests and merge them when explicitly authorized;
- inspect remote ending commits and repository state after writes.

Do not hard-code internal connector function names into durable workflow records. Resolve the current GitHub capability exposed by the ChatGPT execution surface.

The connector does not have to be explicitly @mentioned by the human for the worker to use it when it is already available and the requested GDO action requires GitHub access.

## Required capability discovery

For every ordinary ChatGPT GDO round:

1. Resolve current GDO from the canonical GitHub discovery anchors above.
2. Fetch current GitHub authority.
3. Inspect the current ChatGPT tool/connector surface before claiming an operation is unavailable.
4. Map the requested round to the required capability.
5. Use an available authorized capability directly.
6. Only report a tooling blocker after confirming the required operation is genuinely absent or denied.
7. When blocked, identify the exact missing operation, not a vague statement such as "I cannot edit the repository."

A fresh chat must not rely on prior thread memory about which connectors exist.

## Worker capability expectations

### Governance — Definition / Discovery

Preferred capabilities:
- GitHub read for authoritative repository/issues/history;
- GitHub issue/comment/document writes when authorized;
- web research when the question materially depends on external/current public information.

A lack of local filesystem access does not prevent Governance work when the GitHub connector exposes the required reads/writes.

### Implementation ChatGPT

Required for repository-backed implementation:
- GitHub authoritative read;
- GitHub repository write sufficient to create the authorized code/test/docs change and durable commit;
- GitHub issue/comment write for the implementation record.

When those GitHub write operations are available, Implementation must perform the actual authorized repository change. It must not stop at a patch, prompt, payload, or "implementation is impossible" solely because a local terminal/worktree is unavailable.

Absence of local execution capability is different from absence of implementation capability. Implementation may:
- edit and commit through GitHub;
- truthfully report builds/tests that could not be run locally;
- leave the checkpoint evidence-ready for the dedicated Evidence / Testing environment.

If repository writes are unavailable after capability discovery, report the exact missing capability and do not fabricate a commit.

### Independent Review

Preferred capabilities:
- GitHub authoritative read;
- GitHub diff/file/commit inspection;
- GitHub Actions/job/log/artifact inspection when relevant;
- GitHub issue/comment write for the review outcome.

Independent Review does not require a local worktree merely to inspect remote truth.

### Evidence / Testing

Evidence / Testing remains a fresh Codex/runner execution environment under the existing GDO worker model. Ordinary ChatGPT connector availability does not replace required runtime/build/live/E2E execution.

## Capability versus authority

Capability does not grant authority.

A connector may technically support a write that the activated checkpoint does not authorize. Workers must satisfy both:
- **authority** — the human/checkpoint permits the action; and
- **capability** — the current execution surface can perform it.

Do not widen scope because a tool can do more.

## Dispatch expectation

ChatGPT dispatch messages should remind fresh workers to:
- resolve GDO from the canonical GitHub URLs and current `main`;
- inspect available connected tools;
- use the GitHub connector for authoritative AquaTwin reads and authorized repository/ledger writes;
- distinguish missing local execution from missing implementation capability;
- avoid declaring the round impossible until the required connector operation has been checked.
