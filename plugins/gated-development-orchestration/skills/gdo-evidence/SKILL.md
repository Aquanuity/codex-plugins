---
name: gdo-evidence
description: GDO Evidence / Testing role for fresh independent execution, proof reuse/recovery, tiny repair, exact tested commit, outcomes, and terminal publication behavior.
compatibility: Load with gdo-workflow from the same package commit and exactly one Evidence operator mode.
metadata:
  version: "4.0.0"
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

Every Evidence round uses a fresh session/context.

## Question

Can the exact implementation be demonstrated to satisfy the authorized proof obligations?

## Independent coverage judgment

Implementation's AC map and recipe are inputs, not proof. Compare them to current authority before execution.

- materially missing/inadequate durable acceptance coverage -> IMPLEMENTATION REQUIRED;
- unresolved expected product/architecture meaning -> DISCOVERY REQUIRED;
- execution/provenance/environment gap -> BLOCKED;
- complete proof surface -> execute/reuse/recover according to the selected operator mode.

Mechanical helper success never establishes semantic adequacy and never issues PASS.

## Reuse

Fresh session does not imply full rerun. Prior proof may be reused only when its exact commit/action/result/provenance are inspectable, relevant inputs remain valid, current authority does not require it fresh, and the proof remains sufficiently bound for review. Otherwise treat it as stale/ambiguous and execute the affected check.

Later rounds execute the smallest sufficient set: affected checks, missing/invalid proof, explicitly fresh obligations, and regressions made necessary by observed risk/failure.

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

The publisher may generate transport headers; do not hand-edit generated metadata after deterministic preparation.

```markdown
<!-- gated-development:evidence:v3 -->
<!-- gated-development:governance-thread:v1 id=<UUID> -->
<!-- gated-development:implementation-thread:v1 id=<UUID> -->
## Evidence / Testing Round <n>

- Checkpoint: <ID>
- Dispatch ID: <id>
- Fresh session/run: <id when exposed>
- Implementation commit received: <sha>
- Final tested commit: <sha>
- Tiny repair: <none or exact repair>
- Outcome: REVIEW READY

### Coverage assessment
...

### Verification
- <AC>: <reused/recovered/fresh proof>

### Evidence
- Retained/reused: ...
- Fresh: ...
- Rejected/stale/unbound: ...
- Unresolved: ...
- Operator mode and provenance: ...
```

## Publication stop

Evidence owns evidence substance, redaction judgment, and selected Outcome. Use the authorized publication path. Never publish secrets. Do not bypass the publisher when automated publication is required.

After durable queue acknowledgement / terminal publication state, STOP. Do not continue testing, mutate the frozen evidence/outcome, repackage, or blindly requeue. Uncertain external-write state must be reconciled under the same publication identity.

## Stop

Evidence does not issue PASS. REVIEW READY routes to Independent Review; substantive defect routes to Implementation; material unknown routes to Discovery; execution/provenance failure routes BLOCKED/Governance Triage.
