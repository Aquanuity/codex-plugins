# Discovery Checkpoints Reference

## Purpose

Discovery resolves material uncertainty before deterministic implementation continues.

Discovery is a Round and may also be the primary work of a top-level checkpoint.

It is never tied exclusively to CP1.

## Discovery triggers

Use Discovery when a worker must determine material:
- intended behavior;
- native/current product behavior;
- architecture;
- ownership/layer/service;
- source-of-truth;
- acceptance meaning;
- persistence/authorization/public-contract semantics;
- implementation direction where competing choices change product architecture.

Ordinary code reading needed to implement a known design is not automatically Discovery.

## Planned Discovery

Definition may create a checkpoint whose main product is an approved source-of-truth or architecture lock.

Typical progression:

~~~text
Definition
  -> Discovery
  -> Independent Review
  -> PASS
~~~

No Implementation round is required when Discovery itself is the checkpoint deliverable.

## Discovery before Implementation

When Definition can foresee material unknowns, finish Discovery before activating Implementation.

Do not ask the Implementation worker or Codex evidence worker to invent missing product truth.

## Surprise Discovery from Implementation

Implementation posts an implementation-record:v3 with outcome DISCOVERY REQUIRED and both persistent thread IDs.

Governance ChatGPT:
1. fetches the checkpoint and implementation record fresh;
2. investigates;
3. creates/amends source-of-truth and architecture lock as needed;
4. obtains human approval for material decisions;
5. decides whether the checkpoint remains truthful.

Then:
- if still truthful -> reactivate/resume Implementation;
- if materially changed -> return to Definition and re-authorize or supersede.

## Surprise Discovery from Evidence / Testing

Testing can reveal that failure is not merely a code defect.

Codex posts evidence:v3 with outcome DISCOVERY REQUIRED and stops before making a material design decision.

Governance ChatGPT investigates.

Do not classify a normal implementation bug as Discovery merely to avoid repair.

## Discovery from Independent Review

Review may find that:
- implementation followed a flawed architectural assumption;
- source-of-truth is incomplete;
- acceptance criteria do not match product intent;
- the checkpoint landed in the wrong owner/layer.

Route:
- unresolved architecture/source truth -> Discovery;
- fundamentally wrong checkpoint intent/scope -> Definition.

## Discovery -> Definition threshold

Return to Definition only when findings materially invalidate the expected feature/checkpoint direction.

Examples:
- the intended capability cannot live in the assumed subsystem;
- the native product behavior contradicts the planned product contract;
- the parent/checkpoint decomposition no longer represents the right product milestones.

A local implementation-path adjustment under unchanged product intent normally stays Discovery -> Implementation.

## Source-of-truth and architecture lock

Discovery should produce durable artifacts sufficient for later workers.

Use a source-of-truth document and/or architecture-lock document when architecture/behavior is substantial.

Record:
- findings;
- authoritative source paths/native behavior;
- decisions;
- rejected alternatives where material;
- boundaries/non-goals;
- downstream implications;
- approved commit.

## Human approval

Material product/architecture truth discovered by ChatGPT does not become controlling merely because ChatGPT wrote it.

Obtain explicit human approval before downstream execution depends on a material new direction.

## Discovery and checkpoints

Top-level checkpoints remain human-verifiable product milestones.

A Discovery checkpoint is human-verifiable when the human can inspect the resulting source-of-truth/architecture lock and determine that the design is correct enough to proceed.

Engineering Discovery sub-checkpoints may be used when an implementation checkpoint encounters a bounded unknown.
