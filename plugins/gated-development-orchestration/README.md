# Gated Development Orchestration Plugin 3.1.0

GDO v3 coordinates development around **human-verifiable product checkpoints** and five explicit Rounds.

## 3.1: evidence-ready implementation and deterministic execution

Implementation owns necessary durable tests/fixtures/observability, an AC-to-proof map and a runnable recipe. A fresh Evidence worker independently evaluates and executes/reuses/recovers proof; the local helper owns mechanical attempt tracking, collection and bundle validation. Independent Review still judges semantic sufficiency and alone grants PASS.

Strict execution is a **prospective opt-in pilot**, not a default-mode migration or a deployment claim. Existing requests retain their frozen contracts. Read the canonical [Evidence execution contract](skills/gated-development-orchestration/references/evidence-execution-contract.md) before adding a strict marker. Runner, publisher and fresh Windows pilot verification must be independently accepted before production activation. No extra mandatory round, model mandate, CP4E reopening or CP5 activation is introduced.

## Worker architecture

```text
Governance ChatGPT thread
  Definition Round
  Discovery Round
  Independent Review Round

Implementation ChatGPT thread
  Implementation Round

Fresh Codex session each time
  Evidence / Testing Round
```

The Governance and Implementation ChatGPT threads persist through the checkpoint lifecycle. Every Evidence / Testing round starts a fresh Codex session.

GitHub is the durable authoritative ledger and carries both persistent ChatGPT thread IDs through dispatchable lifecycle comments.

## Checkpoints

A top-level checkpoint is a reasonably substantial, coherent product state that a human can inspect or exercise and say “this is right” before development continues.

Top-level checkpoints are not:
- one class;
- one DTO;
- registration/plumbing;
- one source layer;
- compile completion.

When a meaningful checkpoint is too large for one implementation pass, decompose it into bounded engineering sub-checkpoints such as CP4A/CP4B/CP4C/CP4D. The parent checkpoint remains the product gate.

Rounds are not another level of product decomposition. The product hierarchy is Feature -> top-level Checkpoint -> optional engineering sub-checkpoints; Rounds are workflow activity applied to the relevant feature/checkpoint/sub-checkpoint.

See [Rounds and Checkpoints](skills/gated-development-orchestration/references/rounds-and-checkpoints.md).

## Canonical rounds

### Definition

Defines product intent, architecture discussion, scope, parent issue, and human-verifiable checkpoint plan.

### Discovery

Investigates repository/native behavior, ownership, architecture, constraints, source-of-truth documentation, and architecture lock.

Discovery may happen anywhere; it is not synonymous with CP1.

### Implementation

The separate Implementation ChatGPT thread performs actual product/code writes to satisfy the approved checkpoint or sub-checkpoint.

### Evidence / Testing

A fresh Codex session runs build/test/live/UI/E2E verification and gathers durable evidence. Codex may perform only tightly bounded tiny repair. Substantive repair returns to Implementation.

### Independent Review

The Governance ChatGPT thread steps back from the local implementation tactic, independently fetches the checkpoint, source-of-truth, remote diff, and evidence, and judges the whole checkpoint.

Only Independent Review may issue PASS.

## Canonical transitions

```text
Definition -> Discovery | Implementation

Discovery -> Definition | Implementation | Independent Review

Implementation -> Discovery | Evidence / Testing

Evidence / Testing -> Implementation | Discovery | Independent Review

Independent Review ->
  Definition | Discovery | Implementation | Evidence / Testing | PASS
```

Material Definition changes after activation require human re-authorization.

## Routing

Every dispatchable v3 lifecycle record carries:

```text
<!-- gated-development:governance-thread:v1 id=<UUID> -->
<!-- gated-development:implementation-thread:v1 id=<UUID> -->
```

Thread IDs are routing/context metadata, not product authority.

A thread replacement is recorded prospectively with a v3 thread-rebind record.

Every dispatch also gets a stable dispatch identity for idempotency. Codex session/run IDs are round-scoped provenance only.

## v3 markers

```text
<!-- gated-development:activation:v3 -->
<!-- gated-development:implementation-record:v3 -->
<!-- gated-development:evidence:v3 -->
<!-- gated-development:review:v3 status=correction-required -->
<!-- gated-development:review:v3 status=verification-blocked -->
<!-- gated-development:review:v3 status=discovery-required -->
<!-- gated-development:review:v3 status=definition-required -->
<!-- gated-development:review:v3 status=pass -->
<!-- gated-development:thread-rebind:v3 -->
```

These are deliberately distinct from v2. The old AquaTwin runner routes v2 activations/corrections to Codex implementation; v3 routes substantive implementation to ChatGPT. Reusing the old markers would risk dispatching the wrong worker.

## Package contents

- `.codex-plugin/plugin.json`
- `.app.json`
- `skills/gated-development-orchestration/SKILL.md`
- references:
  - `rounds-and-checkpoints.md`
  - `authority-and-lifecycle.md`
  - `discovery-checkpoints.md`
  - `gate-issue-templates.md`
  - `evidence-and-review.md`
  - `automation-handoff.md`
  - `model-selection.md`
  - `execution-artifacts.md`
  - `evidence-execution-contract.md`

## Workflow source

Codex uses the currently installed `gated-development-orchestration@aquanuity` plugin where available.

Ordinary ChatGPT Chat resolves the current package from `Aquanuity/codex-plugins` `main` for each workflow action and loads the manifest, skill, and round-required references from the same commit.

Product/source-of-truth commits and activated checkpoint authority can be pinned. Workflow package provenance is not product authority.

## Automation migration

v3 requires the runner transport to understand:
- two persistent ChatGPT destinations;
- ChatGPT implementation dispatch;
- fresh Codex Evidence / Testing dispatch;
- v3 evidence/review return routing;
- thread rebind and dispatch idempotency.

Keep machine-local state limited to authentication, ephemeral runtime receipts, and environment-specific configuration. Critical transport code should be repository-backed so the runner can be rebuilt from source.
