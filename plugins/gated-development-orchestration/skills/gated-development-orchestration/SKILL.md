---
name: gated-development-orchestration
description: Coordinate human-verifiable checkpoint development through Definition, Discovery, Implementation, Evidence / Testing, and Independent Review rounds. Use one persistent Governance ChatGPT thread for Definition, Discovery, and Independent Review; one separate persistent Implementation ChatGPT thread for actual product implementation; and a fresh Codex session for every Evidence / Testing round. GitHub is the authoritative workflow ledger and carries both persistent ChatGPT thread IDs through lifecycle comments.
compatibility: Requires access to the complete skill references and relevant GitHub sources. Repository implementation requires an authorized working environment. Evidence / Testing requires a fresh Codex execution environment when the checkpoint calls for runtime/build/test evidence.
metadata:
  version: "3.1.0"
  workflow: "github-gated-development-v3"
---

# Gated Development Orchestration

## Purpose

GDO v3 separates product intent, architectural discovery, implementation, proof, and final acceptance into explicit rounds with specialized workers.

The stable worker model is:

~~~text
Governance ChatGPT thread
  Definition
  Discovery
  Independent Review

Implementation ChatGPT thread
  Implementation

Fresh Codex session every time
  Evidence / Testing
~~~

GitHub is the durable workflow ledger. Thread/session memory is useful context, never authority.

## Product hierarchy and work lifecycle

~~~text
Product hierarchy:
Parent Feature
  -> top-level Checkpoint
       -> optional engineering sub-checkpoints (CP4A / CP4B / CP4C / CP4D)

Work lifecycle:
Definition / Discovery / Implementation / Evidence / Testing / Independent Review Rounds
  -> operate against the relevant feature, checkpoint, or sub-checkpoint
~~~

A parent feature captures the overall product intent.

A top-level Checkpoint is a reasonably substantial, coherent, human-verifiable product milestone. It is not a class/file/layer milestone. At a checkpoint boundary, a human should be able to inspect or exercise the product and decide whether development is on track.

A sub-checkpoint such as CP4A, CP4B, CP4C, or CP4D may decompose engineering work underneath the human-verifiable parent checkpoint. Sub-checkpoints may be technical, but they must remain bounded and meaningful. They do not replace the parent checkpoint product outcome.

A Round is workflow activity, not another level of product decomposition. Rounds may operate at the parent-feature level during Definition, at a top-level checkpoint, or at a bounded sub-checkpoint as appropriate.

Read rounds-and-checkpoints.md for the canonical definitions.

## Canonical rounds

1. Definition Round
   - architecture discussion;
   - feature and intent discussion;
   - scope and product boundaries;
   - parent issue and human-verifiable checkpoint plan.

2. Discovery Round
   - research and investigation;
   - native/current behavior tracing;
   - ownership and architecture tracing;
   - source-of-truth documentation;
   - architecture-lock documentation.

3. Implementation Round
   - actual product/code changes and necessary durable tests/fixtures/verification recipes;
   - satisfies the active checkpoint or implementation sub-checkpoint;
   - performed by the separate Implementation ChatGPT thread.

4. Evidence / Testing Round
   - build, integration, live, UI, E2E, and acceptance evidence as applicable;
   - starts a fresh Codex session every round;
   - Codex may perform only tightly bounded tiny repair;
   - substantive repair returns to Implementation.

5. Independent Review Round
   - step back from the pinpoint implementation path;
   - independently re-fetch the checkpoint, source-of-truth, remote code, diff, and evidence;
   - judge whether the right product change landed in the intended architecture and is sufficiently proven;
   - only this round may issue checkpoint PASS.

## Worker identities

### Governance ChatGPT thread

Persistent for the feature/checkpoint context.

Owns:
- Definition;
- Discovery;
- Independent Review;
- checkpoint shaping and amendment;
- source-of-truth and architecture-lock work;
- routing decisions after evidence/review;
- human-facing decisions and approval requests.

It must not perform substantive product implementation that it will later independently review.

### Implementation ChatGPT thread

Persistent for implementation rounds.

Owns:
- actual product implementation;
- substantive correction rounds;
- code changes needed to satisfy acceptance criteria;
- evidence-ready durable tests, fixtures, observation hooks, AC-to-proof mapping, and runnable verification recipes;
- implementation records and handoff to Evidence / Testing.

It may inspect architecture/source-of-truth but must not silently redefine them.

### Evidence / Testing Codex session

A fresh Codex session starts for every Evidence / Testing round.

Owns:
- build/test/live/E2E execution;
- evidence collection;
- exact tested-commit recording;
- tightly bounded tiny repair followed by rerun;
- evidence record and routing outcome.

It does not own product definition, architecture changes, substantive implementation, or PASS.

## Core invariants

1. Human product authority remains final.
2. GitHub checkpoint state is authoritative over all ChatGPT/Codex thread memory.
3. A top-level checkpoint is a human-verifiable product stage, not a mechanical coding milestone.
4. A checkpoint should be substantial enough to matter and bounded enough to review as one coherent claim.
5. Engineering decomposition belongs under the checkpoint as A/B/C/D sub-checkpoints when needed.
6. Human activation authorizes execution of the current checkpoint contract.
7. Material redefinition after activation requires explicit human re-authorization.
8. Definition, Discovery, and Independent Review share the Governance ChatGPT thread.
9. Implementation uses a separate persistent Implementation ChatGPT thread.
10. Every Evidence / Testing round starts a fresh Codex session.
11. Codex tiny repair is narrowly bounded; substantive repair returns to Implementation.
12. Material architecture/product uncertainty returns to Discovery.
13. Material invalidation of checkpoint intent/scope returns to Definition.
14. Only Independent Review may issue PASS.
15. Implementation does not skip directly to PASS.
16. Evidence / Testing does not issue PASS.
17. Independent Review independently fetches remote truth and does not accept worker summaries as proof.
18. Thread IDs are routing/context metadata, not product authority.
19. Both persistent ChatGPT thread IDs propagate through v3 lifecycle comments.
20. Session/dispatch identities are provenance and idempotency metadata.
21. Preserve lifecycle history; do not rewrite old comments to simulate a different sequence.
22. Generated logs remain execution artifacts unless explicitly required in git.
23. Do not fabricate SHAs, IDs, tests, approvals, routing, or outcomes.
24. A fresh Evidence / Testing session means fresh worker context, not automatic re-execution of every previously valid check; reuse prior proof only under the canonical evidence-reuse rules.
25. Evidence / Testing must maintain an explicit closure ledger and perform a final requirement-by-requirement closure audit; attempted work is not complete until the required proof exists and is inspected.
26. Automated Evidence publication is terminal after queue acknowledgement: freeze the evidence/outcome, stop execution, do not mutate/repackage/requeue, and recover transport only from the same frozen publication identity.

## Round transitions

Definition may transition to:
- Discovery;
- Implementation, after human activation.

Discovery may transition to:
- Definition, when findings materially invalidate the expected direction;
- Implementation;
- Independent Review, when Discovery itself is the checkpoint deliverable.

Implementation may transition to:
- Discovery, when material architectural/product uncertainty appears;
- Evidence / Testing, when implementation is ready for proof.

Evidence / Testing may transition to:
- Implementation, when a substantive defect exceeds Codex tiny-repair authority;
- Discovery, when testing exposes a material architectural/system unknown;
- Independent Review, when required evidence is complete.

Independent Review may transition to:
- Definition, when the checkpoint intent/scope itself is fundamentally wrong;
- Discovery;
- Implementation;
- Evidence / Testing;
- PASS.

There is intentionally no normal Implementation -> Independent Review shortcut for product-code checkpoints and no Evidence / Testing -> PASS shortcut.

## Checkpoint activation

A checkpoint can be DEFINED or READY without being executable.

Human activation means the current intent, scope, authoritative inputs, acceptance criteria, verification expectations, and routing state are approved for the next executable round.

For v3, do not reuse v2 executable markers. v3 uses distinct markers so an old v2 runner cannot route a v3 checkpoint to the wrong worker.

## v3 routing metadata

Every v3 lifecycle record that can lead to another worker dispatch carries exactly one Governance thread marker and exactly one Implementation thread marker:

~~~text
<!-- gated-development:governance-thread:v1 id=<UUID> -->
<!-- gated-development:implementation-thread:v1 id=<UUID> -->
~~~

The first executable activation must have both persistent IDs established. Later records propagate both unchanged unless the human explicitly authorizes a thread rebind.

A thread rebind is prospective and does not rewrite history.

A Codex Evidence / Testing record may additionally record its fresh round-scoped session/run identity. That identity is provenance only.

## v3 transport markers

Canonical first-line markers:

~~~text
<!-- gated-development:activation:v3 -->
<!-- gated-development:implementation-record:v3 -->
<!-- gated-development:evidence:v3 -->
<!-- gated-development:review:v3 status=correction-required -->
<!-- gated-development:review:v3 status=verification-blocked -->
<!-- gated-development:review:v3 status=discovery-required -->
<!-- gated-development:review:v3 status=definition-required -->
<!-- gated-development:review:v3 status=pass -->
<!-- gated-development:thread-rebind:v3 -->
~~~

The v3 automation contract is defined in automation-handoff.md.

## Checkpoint quality rule

A top-level checkpoint must answer yes to all of these:

- Can a human inspect or exercise a meaningful product state here?
- Is the state coherent rather than intentionally half-wired?
- Is it substantial enough to represent meaningful progress?
- Is it bounded enough for one independent reviewer to understand the claim?
- Can acceptance criteria and verification prove the product outcome?

Bad top-level checkpoints are internal-only milestones such as creating a class, DTO, helper, registration, or one file.

Those may be sub-checkpoint tasks.

## Human verification

Every top-level checkpoint must be designed so the human can stop at that boundary and manually check whether the feature is on track.

Manual human sign-off is not automatically required after every checkpoint unless the checkpoint or human says so. Human-verifiable and human-blocking are separate concepts.

## Discovery authority

Discovery is not tied to CP1.

Foreseeable discovery should be planned before deterministic implementation.

Unexpected material uncertainty from Implementation, Evidence / Testing, or Independent Review returns to Discovery rather than being hidden inside implementation effort.

If discovery materially changes checkpoint intent, route to Definition and obtain human re-authorization.

## Implementation authority

The Implementation ChatGPT thread performs actual code/product writes needed to satisfy the checkpoint.

It may make ordinary implementation choices within the approved architecture.

It must stop and return to Discovery when continuing would require a new material product/architecture/ownership decision.

It posts an implementation record identifying at minimum:
- checkpoint/sub-checkpoint;
- implementation round number;
- starting and ending commit;
- changed paths;
- implemented acceptance criteria;
- known limitations;
- next requested round;
- both persistent ChatGPT thread IDs.

Implementation must leave the checkpoint evidence-ready. Existing adequate tests should be reused; missing runtime access is reported, not replaced by fabricated execution. Substantive missing test coverage returns to Implementation. Read references/evidence-execution-contract.md for the 3.1 responsibility and opt-in execution contract; no extra round is introduced.

## Evidence / Testing authority

Each Evidence / Testing round starts from a fresh Codex session and an exact implementation commit.

Codex may make a tiny repair only when all are true:
- directly required to execute/complete the planned evidence;
- mechanical and low risk;
- no product/architecture/ownership/public-contract decision;
- smallest coherent repair;
- no material expansion of changed paths/behavior;
- affected verification is rerun;
- repair is explicitly disclosed.

Examples may include an obvious compile typo, missing using/import, narrow test-fixture mistake, or equivalent mechanical defect.

Anything substantial returns to the Implementation ChatGPT thread.

A fresh Evidence / Testing session isolates worker context and authority; it does not by itself invalidate prior proof. Apply the evidence-reuse and bounded-rerun rules in evidence-and-review.md so later rounds execute only the proof that is affected, missing, invalid, stale, ambiguous, explicitly required fresh, or otherwise not safely reusable.

For automated publication, the Evidence worker owns the evidence substance, required proof selection, redaction judgment, and v3 outcome. For explicitly opted-in 3.1 contracts the helper owns mechanical attempt state, artifact collection, bundle assembly and closure validation; historical requests retain their original path. Deterministic transport code owns publication serialization: routing markers, canonical Outcome line, SHA-256 digests, readiness metadata, structural preflight, and publisher queueing. The worker must not manually construct transport metadata that code can derive from the frozen dispatch request.

For legacy/manual execution, before starting expensive verification the Evidence worker must create a durable round-local closure ledger from the exact current GitHub authority. It must update that ledger after each required action and re-audit it immediately before choosing an outcome. `REVIEW READY` is forbidden while any mandatory item is pending, attempted-but-unproven, ambiguous, or missing a required artifact/provenance binding.

Keep the active execution state small: place a short current-task summary at the top of the ledger and keep only one mandatory item `IN PROGRESS` at a time. This is the authoritative working checklist for the session after the long GitHub source material has been read.

After deterministic publication reports queued/already queued/already published, the Evidence round is terminal. The worker must stop immediately. It must not continue testing, change the evidence body/bundle/outcome, call the publisher workflow directly, or create another publication for the same request.

For a 3.1 strict request, the helper-created plan/receipts are the mechanical ledger; keep a short ACTIVE TASK interpretation note, not a duplicate hand-maintained execution history. REVIEW READY requires both independent coverage judgment and deterministic validation of the final bundle. Missing/unsupported contracts, helpers or evidence never silently fall back. Mechanical validation does not establish semantic test adequacy or PASS.

## Independent Review authority

Independent Review uses the Governance ChatGPT thread but is independent from the implementation worker.

Review independently fetches:
- parent/checkpoint;
- activation/amendments;
- source-of-truth and architecture lock;
- implementation record;
- tested commit and any tiny-repair delta;
- remote complete diff;
- evidence;
- every acceptance criterion.

It asks:

Did we build the right thing, in the right place, in the intended way, and prove it sufficiently?

Only this round can issue PASS.

## Workflow source

The workflow identity is gated-development-orchestration@aquanuity.

Codex should use its currently installed plugin where available.

Ordinary ChatGPT Chat should resolve current Aquanuity/codex-plugins main for each workflow action and load the manifest, SKILL.md, and required references from the same commit.

Product/source-of-truth commits and checkpoint contracts may be pinned. The workflow package itself is current-by-execution-surface unless a human explicitly requires otherwise.

## References

- rounds-and-checkpoints.md
- authority-and-lifecycle.md
- discovery-checkpoints.md
- gate-issue-templates.md
- evidence-and-review.md
- automation-handoff.md
- model-selection.md
- execution-artifacts.md
- evidence-execution-contract.md

Load references required by the active round before authoring executable workflow records.
