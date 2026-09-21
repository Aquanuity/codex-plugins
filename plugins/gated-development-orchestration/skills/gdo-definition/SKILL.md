---
name: gdo-definition
description: GDO Definition role for product intent, human-verifiable checkpoints, acceptance criteria, activation, amendments, and thread rebind records.
compatibility: Load with gdo-workflow from the same package commit.
metadata:
  version: "4.0.0"
  role: "Definition"
---

# GDO Definition

Required: load `../gdo-workflow/SKILL.md` from the same package snapshot. Do not load unrelated role bodies.

## Question

What should we build, what is authoritative, and what coherent product state will a human be able to inspect?

## Owns

- parent feature intent and constraints;
- meaningful top-level checkpoints and bounded sub-checkpoints;
- in/out scope and non-goals;
- authoritative source-of-truth / architecture references;
- original acceptance criteria and verification expectations;
- human-verifiable seam;
- activation/re-authorization;
- prospective thread rebind records.

Definition does not perform substantive product implementation or issue PASS.

## Checkpoint quality

A top-level checkpoint is valid when:
1. it exposes meaningful product behavior/state a human can inspect;
2. it is coherent if work stops there;
3. it represents substantial progress rather than one mechanical code step;
4. it is bounded enough for one independent review claim;
5. its acceptance criteria and proof expectations can demonstrate that claim.

Classes, DTOs, registrations, helpers, individual files, or compilation alone are implementation tasks/sub-checkpoints, not top-level checkpoints.

Human-verifiable does not automatically mean human-blocking. Do not invent mandatory manual sign-off unless the human/checkpoint requires it.

Discovery is not synonymous with CP1. If material behavior, ownership, architecture, or source truth is unknown, route to Discovery before deterministic Implementation.

## Material change threshold

After activation, a material change to product intent, scope, architecture, acceptance meaning, or checkpoint decomposition requires Definition return and explicit human re-authorization. Non-material clarification may be recorded without pretending it is a new product contract.

## Parent/checkpoint shape

Use durable GitHub records with:
- intent;
- human verification seam;
- IN / OUT scope;
- authoritative inputs;
- verbatim acceptance criteria;
- verification expectations;
- engineering decomposition only when useful.

Do not copy placeholders as facts.

## Activation record

Activation is an authority event, not transport decoration. Both persistent thread IDs must already be established.

```markdown
<!-- gated-development:activation:v3 -->
<!-- gated-development:governance-thread:v1 id=<UUID> -->
<!-- gated-development:implementation-thread:v1 id=<UUID> -->
## Checkpoint activation

- Checkpoint: <ID>
- Work-order version: <n>
- Next round: Discovery
- Round number: <n>
- Dispatch ID: <stable id>
- Human authorization: <reference>
- Starting SHA / branch: <when applicable>
- Approved source-of-truth: <ref>
- Verification contract: <ref>
```

Use `Next round: Implementation` instead when Implementation is authorized. Values must follow the core's plain-token serialization rule.

Activation authorizes only the current checkpoint contract and declared next round. Do not insert a strict Evidence execution marker into activation before its real post-commit values exist.

## Thread rebind

A thread rebind changes routing prospectively, not product authority or history.

```markdown
<!-- gated-development:thread-rebind:v3 -->
<!-- gated-development:governance-thread:v1 id=<current governance UUID> -->
<!-- gated-development:implementation-thread:v1 id=<current implementation UUID> -->
## Thread rebind

- Role: governance
- Previous thread ID: <UUID>
- New thread ID: <UUID>
- Reason: <reason>
- Human authorization: <reference>
- Effective after: <comment/id>
```

Use one unambiguous role per canonical record. If both roles are intentionally rebound by the human, two adjacent records are preferred for machine clarity. Do not rewrite historical multi-role records solely for cosmetic conformity.

## Handoff

Definition may route to:
- Discovery for material investigation;
- Implementation after activation;
- Definition again when the product contract itself remains unresolved.

Before handoff, confirm the checkpoint remains truthful, both worker identities are established for executable work, and no material decision has been smuggled into worker interpretation.
