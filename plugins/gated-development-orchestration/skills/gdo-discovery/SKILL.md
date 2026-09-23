---
name: gdo-discovery
description: GDO Discovery role for source-backed investigation, architecture/ownership tracing, source-of-truth and architecture-lock decisions, and downstream routing.
compatibility: Load with gdo-workflow from the same package commit.
metadata:
  version: "4.1.0"
  role: "Discovery"
---

# GDO Discovery

Required: load `../gdo-workflow/SKILL.md` from the same package snapshot. Do not load Implementation, Evidence, or Review instructions unless the workflow later routes there.

## Question

What is actually true, and what implementation direction is authoritative?

## Use Discovery for material uncertainty

Examples:
- intended/native behavior is uncertain;
- owner/layer/service/call path is unclear;
- architecture or persistence/public-contract semantics are unresolved;
- competing implementation directions materially change product architecture;
- current source-of-truth is absent or contradicted.

Ordinary code reading needed to implement an already-authorized design is not automatically a separate Discovery round.

Discovery may occur at any checkpoint number. It is not exclusively CP1.

## Procedure

1. Re-fetch the current checkpoint, activation/amendments, source-of-truth, repository/native behavior, and relevant predecessor authority.
2. Separate observed facts from hypotheses.
3. Trace ownership, call paths, dependencies, constraints, and existing behavior needed to answer the material questions.
4. Record source-backed findings and rejected alternatives when they materially affect downstream choices.
5. Create or amend durable source-of-truth / architecture-lock material when the finding must guide later workers.
6. Obtain explicit human approval before a newly discovered material product/architecture direction becomes controlling. Human performance of Discovery, by takeover or otherwise, does not itself amend the controlling contract.
7. Decide the truthful outgoing route.

Do not perform substantive implementation merely to avoid a Discovery return.

## Durable Discovery result

There is no new executable Discovery marker in GDO v4. Preserve v3 protocol semantics.

A Discovery comment/document should identify:
- checkpoint and Discovery round;
- questions investigated;
- exact sources/commits/native behavior inspected;
- findings;
- decisions and unresolved items;
- source-of-truth/architecture-lock path and commit when created;
- whether checkpoint intent remains valid;
- requested next round.

The next executable dispatch still uses the existing authorized lifecycle record type rather than inventing a Discovery marker.

## Routing

- Discovery -> Implementation when product intent remains truthful and material uncertainty is resolved.
- Discovery -> Definition when findings materially invalidate intended feature/checkpoint direction.
- Discovery -> Independent Review when the Discovery artifact itself is the checkpoint deliverable.

Examples requiring Definition:
- assumed subsystem cannot own the intended capability;
- native behavior contradicts the planned product contract;
- checkpoint decomposition no longer represents the intended product milestones.

A local implementation-path adjustment under unchanged product intent normally remains Discovery -> Implementation.

## Guardrails

- GitHub/source truth outranks thread memory.
- Do not turn a normal implementation bug into “Discovery” to avoid repair.
- Do not invent product authority from research alone.
- Do not issue PASS.
- Preserve current routing IDs and historical review bases.
