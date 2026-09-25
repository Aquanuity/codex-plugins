---
name: gdo-workflow
description: Core GDO authority, lifecycle, worker separation, routing, and bounded role loading. Load with exactly one active role skill.
compatibility: Preserves existing v3 lifecycle markers and worker identities.
metadata:
  version: "4.6.0"
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

## Lifecycle comment discipline

Lifecycle comments are control-plane delta records, not copies of the checkpoint, recipe, source-of-truth, or raw Evidence bundle.

**Compress prose, never provenance.** Reference authoritative unchanged context; explicitly serialize changed state.

For executable/result records, make the round's main story easy to scan:
1. **Reason** — why this round occurred or what it needed to close.
2. **What happened** — implementation performed, verification executed, or decision made.
3. **Findings / correction** — what failed, what was fixed, or what was learned.
4. **Proof impact** — affected, retained/reused, recovered, invalidated, blocked/missing proof as applicable.
5. **Result / next** — exact Outcome/status and next round or closure.

Minimum sufficient handoff still includes exact checkpoint/work-order identity, dispatch identity, relevant source/tested SHAs and branch, machine Outcome/status/next-round fields, changed or affected AC/proof IDs, durable recipe/artifact/source references, and any blocker/limitation that changes downstream work.

Do not write vague summaries such as "fixed it", "tests passed", or "most evidence remains". Do not make the next worker guess which finding, proof, source identity, or authority is meant.

Do not repeat unchanged AC text, architecture prose, recipe bodies, raw logs, command output, or previously accepted evidence when a precise durable reference exists. Definition/checkpoint authority remains detailed when it creates or materially amends the contract; later lifecycle comments should normally be delta-oriented.

## Discovery probes

A Discovery Probe is a lightweight Discovery-side feedback dispatch, not a GDO round, not Implementation, not Evidence / Testing, and not acceptance proof.

Use it only while a Discovery round is active and one material uncertainty cannot be answered confidently from source/document/native inspection alone. The observation must materially affect the Discovery recommendation. Do not use a probe to move ordinary implementation work into Governance.

Canonical request marker:
`<!-- gated-development:discovery-probe-request:v1 -->`

Canonical result marker:
`<!-- gated-development:discovery-probe-result:v1 -->`

Both records carry the existing governance and implementation thread markers. They preserve the parent Discovery authority and do not change checkpoint scope, architecture, acceptance criteria, work-order version, or lifecycle round number.

A request binds one bounded uncertainty, a stable Probe ID, source identity, required execution surface, whether exact runtime identity is required, `Executor: AUTO | HUMAN`, why inspection is insufficient, the minimal experiment, expected useful outcomes, requested artifact, and probe-implementation disposition. One bounded uncertainty may require multiple tightly coupled observations when all are necessary to distinguish the alternatives.

A result records the exact request/probe identity, source identity actually tested, actual execution surface/runtime, `COMPLETED | BLOCKED | INCONCLUSIVE`, factual observations, artifacts, and final probe-code disposition. It returns to the same persistent Governance Discovery worker.

Probe observations are source/architecture evidence only. They do not amend intent/ACs/architecture by themselves, cannot satisfy an acceptance criterion, cannot become REVIEW READY, and cannot PASS. If a probe happens to demonstrate a plausible implementation, normal Implementation must adopt/recreate/review it under an authorized Implementation round.

Probe code is normally EPHEMERAL and outside the product branch or removed before Discovery completion. `AUTHORIZED_RESEARCH_ARTIFACT` is allowed only when the active Discovery contract explicitly authorizes a durable research artifact as a deliverable.

A Human TAKEOVER of Discovery may issue an AUTO subordinate probe. That does not revive the automated Governance worker: the result remains durable GitHub feedback for the human-owned Discovery unless a new continuation is explicitly issued.

Governance Triage may identify that a bounded executable observation is needed, but Triage never owns or dispatches the probe. It must route to Discovery first; only an active Discovery round may issue a Discovery Probe.

## Targeted development checks

A targeted development check is a lightweight Implementation-side feedback dispatch, not a GDO round, not Evidence / Testing, and not acceptance proof.

Use it only while an Implementation round remains active and a specific candidate needs one bounded observation that Implementation cannot efficiently obtain itself (for example a native GIS restart/check, one browser behavior, one hardware/runtime observation, or one narrow automated command).

Canonical request marker:
`<!-- gated-development:targeted-check-request:v1 -->`

Canonical result marker:
`<!-- gated-development:targeted-check-result:v1 -->`

Both records carry the existing governance and implementation thread markers. They preserve the parent Implementation authority and do not change checkpoint scope, architecture, acceptance criteria, work-order version, or lifecycle round number.

A request must bind one exact candidate/source identity, one bounded check, and `Executor: AUTO | HUMAN`. `AUTO` means the transport may choose any configured authorized lightweight testing backend; `HUMAN` means no automated check worker is required and the human may perform the bounded check directly. A result must bind the exact request/check identity, exact candidate actually tested, PASS/FAIL/BLOCKED result, concise observation, and artifact/reference when useful.

Targeted-check PASS means only that the requested development observation passed. It MUST NOT be serialized or interpreted as Evidence outcome, proof-ledger closure, REVIEW READY, Independent Review, or checkpoint PASS.

Implementation may issue repeated targeted checks inside the same Implementation round while stabilizing the bounded failure class. The final candidate still requires the normal Implementation handoff and an independent formal Evidence / Testing round.

## Evidence Admission

Opt-in READY handoffs marked `gated-development:evidence-admission:v1` bind candidate/branch, recipe and `gdo-proof-ledger/v1`, then pass a non-round runner gate. Only `ADMITTED` launches fresh Evidence; `NOT_READY | TRIAGE_REQUIRED` do not. Deterministic failure beats optional AI. Admission is never acceptance proof; unmarked handoffs stay legacy.

Admission-enabled Implementation submits `gated-development:lifecycle-publication-request:v1 type=implementation` + `gdo-lifecycle-implementation/v1`; runner renders the canonical record. Details: Implementation + verification-recipe.

## Shared rules

- Human activation authorizes executable work. Material intent/scope/architecture/acceptance change -> Definition + explicit human re-authorization. Actor takeover alone never supplies that amendment authority.
- Material architecture/product uncertainty -> Discovery; material checkpoint invalidation -> Definition.
- Never fabricate SHAs, IDs, approvals, runtime/model identity, tests, artifacts, outcomes, or proof.
- A fresh Evidence round is not a fresh campaign. Retain still-valid proof unless a concrete applicability/provenance/freshness reason invalidates it; a new source SHA alone is not sufficient invalidation.
- Evidence defect aggregation may broaden useful diagnosis within the authorized campaign, but never automatically broadens rerun scope.
- Correction scope is the bounded demonstrated defect/acceptance failure, not merely the first observed symptom; Implementation must close the directly implicated failure class without speculative scope expansion.
- Evidence tiny repair is mechanical only; substantive repair -> Implementation.
- Execution artifacts stay outside git unless required as a repository deliverable.
- Publication acknowledgement is terminal for Evidence; recovery keeps the frozen publication identity.
- Check capability before declaring an authorized operation unavailable; capability does not create authority.
- Frozen requests keep their original contract/mode unless explicitly amended.
- Human-selected model/reasoning may be used when supported; it never expands authority. Record actual runtime identity only when reliably exposed.
- Evidence Admission receipts and proof-ledger readiness are not acceptance Evidence. A fresh admitted Evidence worker still owns independent execution/proof.

## Transitions

Definition -> Discovery | Implementation after activation.
Discovery -> Definition | Implementation | Independent Review when Discovery is the deliverable.
Implementation -> Discovery | Evidence / Testing. An admission-enabled READY handoff reaches Evidence / Testing only after the non-round Admission step returns ADMITTED.
Evidence / Testing -> Implementation | Discovery | Independent Review.
Independent Review -> Definition | Discovery | Implementation | Evidence / Testing | PASS.

BLOCKED from Implementation/Evidence -> Governance Triage. Triage is not a round and cannot PASS; classify first, then load only the selected continuation role. Triage may record that Discovery likely needs an executable probe, but it cannot own/dispatch that probe; route to Discovery first.

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

Control-plane publication request marker (not a lifecycle transition):
- `<!-- gated-development:lifecycle-publication-request:v1 type=implementation -->`

Sub-round discovery/engineering feedback markers:
- `<!-- gated-development:discovery-probe-request:v1 -->`
- `<!-- gated-development:discovery-probe-result:v1 -->`
- `<!-- gated-development:targeted-check-request:v1 -->`
- `<!-- gated-development:targeted-check-result:v1 -->`

These may dispatch lightweight testing/feedback transport but are not lifecycle transitions or Evidence records.

Admission control marker carried inside an Implementation record:
- `<!-- gated-development:evidence-admission:v1 -->`

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
