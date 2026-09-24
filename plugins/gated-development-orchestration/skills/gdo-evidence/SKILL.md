---
name: gdo-evidence
description: GDO Evidence / Testing role for fresh independent execution, proof reuse/recovery, tiny repair, exact tested commit, outcomes, and terminal publication behavior.
compatibility: Load with gdo-workflow from the same package commit and exactly one Evidence operator mode.
metadata:
  version: "4.5.0"
  role: "Evidence / Testing"
---

# GDO Evidence / Testing

Required:
1. load `../gdo-workflow/SKILL.md` from the same snapshot;
2. fetch the exact trigger/current GitHub authority;
3. select exactly one operator mode:
   - legacy/manual: `references/legacy-operator.md`;
   - strict execution-contract marker present and supported: `references/strict-operator.md`.

Strict mode also loads `../gdo-workflow/references/verification-recipe.md`. Do not load Definition/Implementation/Review role bodies.

Every automated Evidence round uses a fresh session/context. A valid Human TAKEOVER may replace the automated Evidence actor in-place when human/native interaction is required; it keeps the same checkpoint, proof obligations, source identity rules, reuse rules, and outcomes.

## Question

Can the exact implementation be demonstrated to satisfy the authorized proof obligations?

## Human actor

Human Evidence may perform live/native testing, investigation, environment work, artifact collection, and the same bounded Evidence duties authorized for the round. Human Evidence does not gain PASS authority and cannot relax the recipe/ACs merely because automation could not execute them.

If Human Evidence changes product source, disclose the change and route through the normal authority rules; proof for the old candidate does not silently transfer. Automated Evidence must re-fetch current actor authority before publication, and deterministic publication should fail closed when a later Human TAKEOVER claims the dispatch.

## Discovery probes and targeted development checks are not Evidence

Issue comments marked `discovery-probe-request:v1` or `discovery-probe-result:v1` are Discovery-side source/architecture feedback. They may explain how an architecture/source-of-truth decision was reached, but they do not independently satisfy an acceptance criterion, proof obligation, Evidence freshness requirement, REVIEW READY, or PASS.

A Discovery Probe result may inform what the authorized contract becomes only through the normal Discovery recommendation plus any required explicit human approval/amendment. Never import a probe observation into the Evidence ledger as acceptance proof.

## Targeted development checks are not Evidence

Issue comments marked `targeted-check-request:v1` or `targeted-check-result:v1` are Implementation-side development feedback. They may explain how a candidate was stabilized or help focus formal verification, but they do not independently satisfy an acceptance criterion, proof obligation, Evidence freshness requirement, REVIEW READY, or PASS.

A formal Evidence worker must verify the final handed-off candidate under the normal Evidence authority/reuse rules. Do not import a targeted-check PASS into the proof ledger as if it were Evidence.

## Independent coverage judgment

Implementation's AC map and recipe are inputs, not proof. Compare them to current authority before execution.

- materially missing/inadequate durable acceptance coverage -> IMPLEMENTATION REQUIRED;
- unresolved expected product/architecture meaning -> DISCOVERY REQUIRED;
- execution/provenance/environment gap -> BLOCKED;
- complete proof surface -> execute/reuse/recover according to the selected operator mode.

Mechanical helper success never establishes semantic adequacy and never issues PASS.

## Defect aggregation

A substantive failure does not automatically end useful Evidence execution. Record the failure precisely, then continue other authorized checks only when their results remain independent, meaningful, and safe to obtain.

Continue when doing so can characterize the bounded failure cluster or close unaffected obligations without corrupting state or creating misleading proof. Do not continue a check that depends on the failed behavior, uses invalidated fixture/state, risks destructive contamination, or would add material cost without useful diagnostic value; mark it blocked by the demonstrated failure instead.

Aggregate related demonstrated failures into one bounded IMPLEMENTATION REQUIRED packet when practical. Do not expand the campaign merely to hunt speculative defects outside current authority.

Defect aggregation expands diagnosis, not automatic rerun scope.

## Reuse and later-round economy

A fresh Evidence round is not a fresh campaign. Prior proof may be reused only when its exact commit/action/result/provenance are inspectable, relevant inputs remain valid, current authority does not require it fresh, and the proof remains sufficiently bound for review.

A newer candidate/source SHA by itself does not invalidate unrelated proof. In later rounds reconstruct the prior proof ledger and classify each obligation as:
- RETAIN/REUSE — prior proof remains applicable;
- RECOVER — valid proof exists but must be recovered/rebound without re-execution;
- EXECUTE — failed, previously blocked/missing, explicitly fresh, or materially affected by the correction;
- INVALIDATED — prior proof no longer applies, with a concrete source/input/behavior/provenance reason.

Later rounds execute the smallest sufficient set: previously failed proof, previously blocked/missing proof, concretely invalidated proof, explicitly fresh obligations, and regressions directly made necessary by the correction or observed risk. Do not mechanically rerun the original campaign because the round/session or SHA changed.

If a broader rerun is required, state the concrete invalidation reason for the affected retained proof.

## Tiny repair

Evidence may repair only an obvious directly blocking mechanical defect that is low risk, local, introduces no material product/architecture/ownership/public-contract decision, is the smallest coherent repair, is disclosed, and is followed by affected verification.

Examples: compile typo, missing import, narrow fixture mistake. If reasonable engineers could debate product behavior or architecture, route IMPLEMENTATION REQUIRED.

Record implementation commit received, repair commit/paths/reason, rerun, and final tested commit.

## Evidence outcome

Allowed plain-token outcomes:
- REVIEW READY
- IMPLEMENTATION REQUIRED
- DISCOVERY REQUIRED
- BLOCKED

`REVIEW READY` means every mandatory current proof obligation is satisfied and inspectable, the original ACs remain mapped, and strict mechanical closure is satisfied when strict mode applies. It is not PASS.

## Evidence record

The publisher may generate transport headers; do not hand-edit generated metadata after deterministic preparation. Keep the lifecycle comment concise and put raw detail in the review bundle/artifact.

```markdown
<!-- gated-development:evidence:v3 -->
<!-- gated-development:actor:v1 actor=human --> <!-- include only for human actor -->
<!-- gated-development:governance-thread:v1 id=<UUID> -->
<!-- gated-development:implementation-thread:v1 id=<UUID> -->
## Evidence / Testing Round <n>

- Checkpoint: <ID>
- Work-order version: <n when defined>
- Dispatch ID: <id>
- Fresh Codex session/run: <id when exposed>
- Implementation commit received: <sha>
- Final tested commit: <sha>
- Tiny repair: <none or exact repair>
- Affected ACs / proof obligations: <IDs>
- Outcome: <REVIEW READY | IMPLEMENTATION REQUIRED | DISCOVERY REQUIRED | BLOCKED>

### Reason
<what this Evidence round needed to prove or close>

### What ran
- Retained/reused: ...
- Recovered without re-execution: ...
- Fresh/re-executed: ...
- Previously blocked/missing now executed: ...

### Result / findings
<concise outcomes; identify failures and dependent blocked checks>

### Correction packet
<!-- required for IMPLEMENTATION REQUIRED -->
- Demonstrated findings / failure cluster: ...
- Affected ACs / proof obligations: ...
- Dependent checks blocked by findings: ...
- Bounded correction boundary: ...
- Implicated path/cause only when directly supported by evidence; otherwise leave root-cause determination to Implementation.

### Proof disposition
- Retain/reuse: ...
- Invalidated prior proof + concrete reason: <none or ...>
- Rejected/stale/unbound: ...
- Unresolved / blocked: ...

### Evidence references
- Review bundle/artifact: <reference>
- Recipe: <path@tested SHA>
- Prior proof reused/recovered: <references as needed>
```

Do not paste raw logs, screenshots, command output, recipe bodies, or unchanged AC text into the issue comment when durable referenced artifacts/sources contain them. The comment must still be sufficient to identify the failure/correction boundary and proof disposition without guesswork.

## Publication stop

Evidence owns evidence substance, redaction judgment, and selected Outcome. Use the authorized publication path. Never publish secrets. Do not bypass the publisher when automated publication is required.

After durable queue acknowledgement / terminal publication state, STOP. Do not continue testing, mutate the frozen evidence/outcome, repackage, or blindly requeue. Uncertain external-write state must be reconciled under the same publication identity.

## Stop

Evidence does not issue PASS. REVIEW READY routes to Independent Review; substantive defect routes to Implementation; material unknown routes to Discovery; execution/provenance failure routes BLOCKED/Governance Triage.
