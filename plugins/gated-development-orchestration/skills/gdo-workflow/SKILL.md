---
name: gdo-workflow
description: Core GDO authority, lifecycle, worker separation, routing, and bounded role loading. Load with exactly one active role skill.
compatibility: Preserves existing v3 lifecycle markers and worker identities.
metadata:
  version: "4.1.0"
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

## Human actor takeover

A human may replace the normal actor **in-place** for Definition, Discovery, Implementation, or Evidence / Testing. Governance Triage and Independent Review are not actor-overridable.

Takeover changes the actor, never the checkpoint contract. It does not amend intent, scope, acceptance criteria, architecture/source-of-truth, review base, or work-order version. Contradictory work remains contradictory until an explicit human-authorized Definition/amendment changes the controlling contract.

Canonical non-dispatch authority record:

```markdown
<!-- gated-development:actor-override:v1 -->
- Target dispatch: <exact dispatch id>
- Active round: <Definition | Discovery | Implementation | Evidence / Testing>
- Actor: Human
- Mode: TAKEOVER
- Contract effect: NONE
- Source identity: <sha or N/A>
- Reason: <bounded reason>
- Human authorization: <reference>
```

A valid TAKEOVER terminally suppresses that exact automated dispatch. Returning the same work to automation requires Governance to issue a new continuation with a new dispatch ID; do not revive the claimed dispatch. Governance Triage may issue a planned continuation dispatch ID for the human to claim before any worker launches.

When a human completes a taken-over round, use the same durable result/handoff the replaced actor would have used. Lifecycle records may add the non-dispatch provenance marker `<!-- gated-development:actor:v1 actor=human -->`.

Automated workers must re-fetch current GitHub actor authority immediately before irreversible repository writes or lifecycle publication. If a later valid TAKEOVER claims their exact dispatch, stop without publishing the superseded result.

## Shared rules

- Human activation authorizes executable work. Material intent/scope/architecture/acceptance change -> Definition + explicit human re-authorization. Actor takeover alone never supplies that amendment authority.
- Material architecture/product uncertainty -> Discovery; material checkpoint invalidation -> Definition.
- Never fabricate SHAs, IDs, approvals, runtime/model identity, tests, artifacts, outcomes, or proof.
- Fresh Evidence context does not force full reruns; apply Evidence reuse rules.
- Evidence tiny repair is mechanical only; substantive repair -> Implementation.
- Execution artifacts stay outside git unless required as a repository deliverable.
- Publication acknowledgement is terminal for Evidence; recovery keeps the frozen publication identity.
- Check capability before declaring an authorized operation unavailable; capability does not create authority.
- Frozen requests keep their original contract/mode unless explicitly amended.
- Human-selected model/reasoning may be used when supported; it never expands authority. Record actual runtime identity only when reliably exposed.

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

Existing dispatchable first-line markers remain:
- `<!-- gated-development:activation:v3 -->`
- `<!-- gated-development:implementation-record:v3 -->`
- `<!-- gated-development:evidence:v3 -->`
- `<!-- gated-development:review:v3 status=correction-required -->`
- `<!-- gated-development:review:v3 status=verification-blocked -->`
- `<!-- gated-development:review:v3 status=discovery-required -->`
- `<!-- gated-development:review:v3 status=definition-required -->`
- `<!-- gated-development:review:v3 status=pass -->`
- `<!-- gated-development:thread-rebind:v3 -->`

Non-dispatch authority/provenance markers:
- `<!-- gated-development:actor-override:v1 -->`
- `<!-- gated-development:actor:v1 actor=human -->`

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
