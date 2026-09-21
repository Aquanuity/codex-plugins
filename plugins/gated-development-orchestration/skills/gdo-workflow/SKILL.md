---
name: gdo-workflow
description: Core GDO authority, lifecycle, worker separation, routing, and bounded role loading. Load with exactly one active role skill.
compatibility: Preserves existing v3 lifecycle markers and worker identities.
metadata:
  version: "4.0.0"
  protocol: "github-gated-development-v3"
---

# GDO Workflow Core

## Bootstrap

Inspect current tools/connectors before claiming inability. For GitHub-backed work, use authorized GitHub read/write capability when available; no local shell/worktree does not imply no repository write. Capability never expands authority.

Source:
- package: https://github.com/Aquanuity/codex-plugins/tree/main/plugins/gated-development-orchestration
- core: https://github.com/Aquanuity/codex-plugins/blob/main/plugins/gated-development-orchestration/skills/gdo-workflow/SKILL.md

Resolve the package once per action. Load manifest + this core + exactly one active role from the same commit, plus only required conditional references. Do not load all roles or mix snapshots. Governance Triage starts with core only.

## Authority

1. Explicit current human instruction.
2. Activated checkpoint contract/amendments.
3. Approved source-of-truth / architecture lock.
4. Accepted predecessors.
5. Current repository/native behavior where not superseded.
6. Worker interpretation.

GitHub authority outranks thread/session memory. Preserve history.

## Workers

Hierarchy: Parent Feature -> human-verifiable Checkpoint -> optional bounded engineering sub-checkpoints.

- Governance ChatGPT: Definition, Discovery, Independent Review.
- Separate persistent Implementation ChatGPT: Implementation.
- Fresh session each Evidence / Testing round.

IDs are routing/provenance, not authority. Only Independent Review may PASS.

## Shared rules

- Human activation authorizes executable work. Material intent/scope/architecture/acceptance change -> Definition + human re-authorization.
- Material architecture/product uncertainty -> Discovery; material checkpoint invalidation -> Definition.
- Never fabricate SHAs, IDs, approvals, runtime/model identity, tests, artifacts, outcomes, or proof.
- Fresh Evidence context does not force full reruns; apply Evidence reuse rules.
- Evidence tiny repair is mechanical only; substantive repair -> Implementation.
- Execution artifacts stay outside git unless required as a repository deliverable.
- Publication acknowledgement is terminal for Evidence; recovery keeps the frozen publication identity.
- Check capability before declaring an authorized operation unavailable; capability does not create authority.
- Frozen requests keep their original contract/mode unless explicitly amended.

## Transitions

Definition -> Discovery | Implementation after activation.
Discovery -> Definition | Implementation | Independent Review when Discovery is the deliverable.
Implementation -> Discovery | Evidence / Testing.
Evidence / Testing -> Implementation | Discovery | Independent Review.
Independent Review -> Definition | Discovery | Implementation | Evidence / Testing | PASS.

BLOCKED from Implementation/Evidence -> Governance Triage. Triage is not a round and cannot PASS; classify first, then load only the selected continuation role.

## Shared record envelope

Dispatchable records carry exactly one governance and one implementation marker:
`<!-- gated-development:governance-thread:v1 id=<UUID> -->`
`<!-- gated-development:implementation-thread:v1 id=<UUID> -->`

Existing first-line markers remain:
- `<!-- gated-development:activation:v3 -->`
- `<!-- gated-development:implementation-record:v3 -->`
- `<!-- gated-development:evidence:v3 -->`
- `<!-- gated-development:review:v3 status=correction-required -->`
- `<!-- gated-development:review:v3 status=verification-blocked -->`
- `<!-- gated-development:review:v3 status=discovery-required -->`
- `<!-- gated-development:review:v3 status=definition-required -->`
- `<!-- gated-development:review:v3 status=pass -->`
- `<!-- gated-development:thread-rebind:v3 -->`

Machine enum/token values are plain serialization: no emphasis/backticks/quotes or trailing punctuation. Example: `- Next round: Implementation`.

Do not invent executable markers or reinterpret v3 semantics because the package is v4.

## Role paths

- Definition: ../gdo-definition/SKILL.md
- Discovery: ../gdo-discovery/SKILL.md
- Implementation: ../gdo-implementation/SKILL.md
- Evidence / Testing: ../gdo-evidence/SKILL.md
- Independent Review: ../gdo-independent-review/SKILL.md

Unknown/contradictory role is a routing error; do not guess.

## Stop

Perform only the active role and its handoff. Do not absorb the next role merely because its files are available.
