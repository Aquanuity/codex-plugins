# Rounds and Checkpoints Reference

## Product hierarchy and work lifecycle

The product decomposition hierarchy is:

~~~text
Parent Feature
  -> top-level Checkpoint
       -> optional engineering sub-checkpoints such as CP4A / CP4B / CP4C / CP4D
~~~

Rounds are orthogonal workflow activity, not children in that product hierarchy. A Definition, Discovery, Implementation, Evidence / Testing, or Independent Review Round operates against the relevant feature, checkpoint, or sub-checkpoint.

These concepts are deliberately different.

## Parent Feature

The parent captures the overall product objective, context, major constraints, and checkpoint plan.

Definition normally creates or materially revises the parent.

## Top-level Checkpoint

A top-level Checkpoint is a bounded, independently governed, reasonably substantial, human-verifiable product milestone.

It defines:
- intended product outcome;
- in-scope and important out-of-scope behavior;
- authoritative source-of-truth/architecture inputs;
- acceptance criteria;
- verification expectations;
- required product-visible/manual verification seam.

The checkpoint should leave the product in a coherent state that a human can inspect or exercise and say whether development is on track.

### Top-level checkpoint test

A candidate checkpoint is valid when:
1. there is meaningful product behavior/state to inspect;
2. it is coherent if development stops at that boundary;
3. it represents substantial progress rather than one code-mechanical step;
4. it is narrow enough for one independent review claim;
5. its acceptance criteria and evidence can prove that claim.

### Invalid top-level checkpoint examples

Do not make top-level checkpoints from:
- one class added;
- DTOs complete;
- provider registered;
- helper extracted;
- one layer wired;
- compilation complete.

Those are implementation tasks or sub-checkpoints.

## Sub-checkpoints

A meaningful parent checkpoint may be split into CP4A / CP4B / CP4C / CP4D or equivalent engineering slices.

Sub-checkpoints:
- are worker-manageable;
- may be technical;
- remain bounded and explicit;
- directly support the parent checkpoint;
- do not replace parent product verification;
- should not become one-file/task-list noise.

The parent checkpoint remains the product gate.

## Round

A Round is a workflow work cycle. Depending on the phase, it may operate against the parent feature, a top-level checkpoint, or a bounded engineering sub-checkpoint.

Canonical rounds:
- Definition Round;
- Discovery Round;
- Implementation Round;
- Evidence / Testing Round;
- Independent Review Round.

Rounds may repeat.

## Definition Round

Question: What should we build?

Work may include:
- product intent;
- feature behavior;
- architecture discussion;
- scope/non-goals;
- parent issue;
- checkpoint decomposition.

Definition does not need to settle every code detail.

## Discovery Round

Question: What is actually true, and what implementation direction is authoritative?

Work may include:
- repository/native behavior research;
- ownership and call-path tracing;
- dependency/architecture investigation;
- edge cases and constraints;
- source-of-truth documentation;
- architecture-lock documentation.

Discovery may occur at any checkpoint number.

## Implementation Round

Question: Did we make the required product changes?

The separate Implementation ChatGPT thread performs real implementation work against approved Definition/Discovery authority.

If it encounters a material product/architecture unknown, it returns to Discovery.

## Evidence / Testing Round

Question: Can we demonstrate that the implementation works as required?

Every round starts a fresh Codex session.

Evidence can include:
- build;
- unit/integration tests;
- UI/live tests;
- E2E;
- screenshots/logs/output;
- exact acceptance-criterion proof.

Codex may do only tightly bounded tiny repair. Substantive repair returns to Implementation.

## Independent Review Round

Question: Did we build the right thing correctly and prove it?

The Governance ChatGPT thread independently re-fetches remote truth and reviews the whole checkpoint rather than merely retesting a pinpoint defect.

Only this round may PASS a checkpoint.

## Canonical transitions

Definition -> Discovery | Implementation after human activation.

Discovery -> Definition | Implementation | Independent Review.

Implementation -> Discovery | Evidence / Testing.

Evidence / Testing -> Implementation | Discovery | Independent Review.

Independent Review -> Definition | Discovery | Implementation | Evidence / Testing | PASS.

## Human activation and re-authorization

Activation authorizes the current checkpoint contract for execution.

A material Definition change after activation requires human re-authorization before substantive execution continues.

## Human-verifiable does not automatically mean human-blocking

Every top-level checkpoint must provide a manual verification seam.

A checkpoint does not automatically require explicit human sign-off after every PASS unless the human or checkpoint says it does.
