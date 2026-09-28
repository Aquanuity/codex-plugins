---
name: gdo-discovery
description: GDO Discovery role for source-backed investigation, architecture/ownership tracing, source-of-truth and architecture-lock decisions, and downstream routing.
compatibility: Load with gdo-workflow from the same package commit.
metadata:
  version: "4.6.0"
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
4. If a material question still cannot be answered confidently by inspection and an executable observation would materially distinguish the alternatives, issue one bounded Discovery Probe under the contract below and continue Discovery from the result.
5. Record source-backed findings and rejected alternatives when they materially affect downstream choices.
6. Create or amend durable source-of-truth / architecture-lock material when the finding must guide later workers.
7. Obtain explicit human approval before a newly discovered material product/architecture direction becomes controlling. Human performance of Discovery, by takeover or otherwise, does not itself amend the controlling contract.
8. Decide the truthful outgoing route.

Do not perform substantive implementation merely to avoid a Discovery return.

## Discovery probes

A Discovery Probe is an executable observation inside the current Discovery round. It answers **one bounded material uncertainty** that inspection alone cannot resolve confidently. It is not a new round, not Implementation, and not Evidence.

Use a probe only when:
- the unresolved fact materially affects the architecture/product recommendation;
- source/document/native inspection is insufficient;
- the minimal experiment can be bounded;
- the observation is more useful than further speculation.

A single probe may include multiple tightly coupled observations when all are necessary to distinguish the same alternatives. Do not split one coherent experiment merely to force one observation per dispatch.

Allowed probe work may include a disposable harness, temporary instrumentation, isolated prototype, native/runtime/MCP/browser observation, hardware experiment, or equivalent bounded mechanism. It must not become an excuse to implement the checkpoint in Governance.

### Canonical probe request

```markdown
<!-- gated-development:discovery-probe-request:v1 -->
<!-- gated-development:governance-thread:v1 id=<UUID> -->
<!-- gated-development:implementation-thread:v1 id=<UUID> -->
## Discovery probe

- Checkpoint: <ID>
- Parent Discovery dispatch: <dispatch id>
- Probe ID: <stable unique id within this Discovery round>
- Source identity: <exact SHA / durable harness identity / N/A>
- Execution surface: <required client/runtime/surface | ANY>
- Runtime identity required: <YES | NO>
- Executor: <AUTO | HUMAN>
- Question: <one bounded uncertainty>
- Why source inspection is insufficient: <concise reason>
- Experiment: <minimal experiment; may include tightly coupled observations>
- Expected useful outcomes: <observations that distinguish the alternatives>
- Artifact requested: <none or exact screenshot/log/result>
- Probe implementation disposition: <NONE | EPHEMERAL | AUTHORIZED_RESEARCH_ARTIFACT>
- Classification: DISCOVERY FEEDBACK ONLY
```

`AUTO` allows the configured lightweight executor. `HUMAN` launches no automated probe worker.

`Execution surface` is part of the question when client/runtime behavior matters. `Source identity` and runtime/client identity are separate provenance facts; do not collapse them.

`AUTHORIZED_RESEARCH_ARTIFACT` is valid only when the active Discovery contract explicitly authorizes a durable research artifact as a deliverable. Otherwise probe code is normally `EPHEMERAL` and remains outside the product branch or is removed before Discovery completes.

### Canonical probe result

```markdown
<!-- gated-development:discovery-probe-result:v1 -->
<!-- gated-development:governance-thread:v1 id=<UUID> -->
<!-- gated-development:implementation-thread:v1 id=<UUID> -->
## Discovery probe result

- Checkpoint: <ID>
- Parent Discovery dispatch: <dispatch id>
- Probe ID: <same ID as request>
- Probe request: <request comment URL or id>
- Source identity tested: <exact SHA / durable harness identity / N/A>
- Execution surface: <actual client/runtime/surface>
- Runtime identity: <exact identity when required/available, otherwise N/A>
- Executor: <AUTO | HUMAN>
- Probe status: <COMPLETED | BLOCKED | INCONCLUSIVE>
- Observation: <concise factual result; structured sub-observations allowed>
- Artifact: <durable reference or none>
- Final probe implementation disposition: <NONE | DISCARDED | PRESERVED_RESEARCH_ARTIFACT:<ref>>
- Classification: DISCOVERY FEEDBACK ONLY
```

Do not use PASS/FAIL or an Evidence `Outcome:` field. `COMPLETED` means the requested observation was obtained; Governance still interprets what it means.

The result returns to the **same persistent Governance Discovery worker** and Discovery continues. A Human TAKEOVER of Discovery may issue an AUTO subordinate probe, but the result must not revive or dispatch the superseded automated Governance worker; it remains durable GitHub feedback for the human-owned round.

### Probe guardrails

- Probe observations are source/architecture evidence, not acceptance Evidence.
- A probe cannot satisfy an AC, REVIEW READY, Independent Review, or PASS.
- A probe cannot amend intent, scope, ACs, architecture, or source-of-truth by itself.
- If a probe happens to demonstrate a plausible implementation, normal Implementation must adopt/recreate/review it under an authorized Implementation round.
- Throwaway code must not silently become production code.
- If the probe reveals a material checkpoint/product contradiction, route Discovery -> Definition.
- Record exact source, execution surface, and runtime identity where meaningful.
- Human TAKEOVER changes the actor only and remains otherwise unchanged.

Governance Triage may identify the need for a probe while classifying a blocker, but Triage is not a round and cannot own or issue the probe. It must route to Discovery first. Only the active Discovery round may emit `discovery-probe-request:v1`.

## Durable Discovery result

There is no new executable Discovery marker in GDO v4. Preserve v3 protocol semantics.

A Discovery comment/document should be delta-oriented and identify:
- checkpoint and Discovery round;
- questions investigated;
- exact sources/commits/native behavior inspected;
- findings;
- decisions and unresolved items;
- source-of-truth/architecture-lock path and commit when created;
- whether checkpoint intent remains valid;
- requested next round;
- durable source-of-truth references rather than copied source text.

Prefer concise headings such as **Reason / Findings / Decision / Impact / Next**. Do not repeat unchanged checkpoint or architecture text merely for completeness.

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
