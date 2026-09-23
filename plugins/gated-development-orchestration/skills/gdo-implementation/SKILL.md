---
name: gdo-implementation
description: GDO Implementation role for actual authorized repository changes, durable tests, committed verification recipe, exact ending commit, and Evidence handoff.
compatibility: Load with gdo-workflow from the same package commit. Product-code Evidence handoff also loads the shared verification-recipe contract.
metadata:
  version: "4.2.0"
  role: "Implementation"
---

# GDO Implementation

Required: load `../gdo-workflow/SKILL.md` from the same snapshot. For product-code work that continues to Evidence, also load `../gdo-workflow/references/verification-recipe.md`. Do not load Evidence operator internals.

## Question

Did we make the authorized product change and leave it evidence-ready?

## Capability bootstrap

Inspect current tools before claiming inability. For GitHub-backed work, use authorized GitHub read/write capability to inspect and modify the repository, commit, update the branch, and post the handoff. No local terminal/worktree is not by itself an Implementation blocker.

Missing repository-write capability and missing runtime/test execution are different facts. Capability does not widen checkpoint authority.

## Owns

- actual product/code/docs changes within activated scope;
- substantive correction rounds;
- necessary durable tests, fixtures, and observation hooks;
- original AC-to-proof mapping;
- a committed runnable verification recipe for a product-code Evidence handoff;
- exact remotely inspectable ending commit;
- Implementation record.

Implementation does not redefine product intent/architecture, approve its own coverage, treat its own tests as independent acceptance, or issue PASS. This remains true when the actor is human: Human TAKEOVER changes the actor, not the contract.

If material product/architecture meaning becomes unresolved, stop and route DISCOVERY REQUIRED.

## Human actor

A valid Human TAKEOVER may replace the Implementation ChatGPT for the same authorized round. The human may inspect, edit, commit/push, test, and prepare the normal Implementation handoff within existing authority. If human work changes source identity, record the exact starting/ending SHAs and changed paths. If the work contradicts the activated intent/architecture, it is not legalized by being human-authored; route to Definition/re-authorization before it can be accepted.

Before any irreversible repository write or lifecycle publication, an automated Implementation worker must re-fetch the issue and stop if a later valid TAKEOVER claims its exact dispatch.

## Correction-round completeness

When Evidence or Independent Review routes a substantive defect back to Implementation, the incoming finding is the minimum demonstrated problem boundary, not an instruction to patch only one literal assertion or line.

Within the still-authorized checkpoint contract:
1. resolve every explicit incoming finding;
2. determine the demonstrated root cause or coherent failure class where reasonably possible;
3. inspect directly coupled manifestations that share that cause/path;
4. make the smallest coherent correction that closes that bounded failure class;
5. add or update durable regression coverage for the cause/class where practical;
6. identify which acceptance/proof obligations are actually affected by the correction;
7. avoid unrelated cleanup/refactors that would expand risk or invalidate otherwise reusable proof.

Do not speculate beyond the activated scope or architecture. "Directly coupled" is not permission to redesign neighboring systems. If closing the failure class requires a material intent/architecture change, route through Discovery/Definition rather than smuggling it into a correction.

A correction may invalidate prior proof only where the changed source/input/behavior materially affects what that proof established. Preserve and identify unaffected proof for Evidence reuse.

## Evidence-ready completion

`READY FOR EVIDENCE / TESTING` requires:
1. authorized implementation is committed;
2. necessary durable tests/fixtures/observation hooks are committed or adequate existing ones are identified;
3. every original AC is mapped to expected behavior and proof;
4. a runnable recipe is committed/identified under the verification-recipe contract;
5. exact ending commit and branch are remotely verified;
6. actual Implementation limitations are disclosed;
7. checks actually performed are separated from verification assigned to Evidence.

A commands-only issue comment does not replace the committed recipe.

Evidence-owned build/Vitest/Playwright/live/browser execution is a normal workflow boundary, not automatically an Implementation limitation. Useful Implementation-time testing is allowed. A check expressly required during Implementation by current authority remains required or must be truthfully unresolved.

## Known implementation limitations

Use this only for unmet Implementation obligations: e.g. required repository write denied, required durable test/recipe cannot be committed, authoritative input inaccessible, or an expressly required Implementation check could not be completed.

Do not list ordinary Evidence-owned execution merely to sound cautious.

## Canonical Implementation record

```markdown
<!-- gated-development:implementation-record:v3 -->
<!-- gated-development:actor:v1 actor=human --> <!-- include only for human actor -->
<!-- gated-development:governance-thread:v1 id=<UUID> -->
<!-- gated-development:implementation-thread:v1 id=<UUID> -->
## Implementation Round <n>

- Checkpoint: <ID>
- Dispatch ID: <id>
- Starting commit: <sha>
- Ending commit: <sha>
- Branch: <branch>
- Changed paths: <paths>
- Acceptance criteria implemented: <AC IDs>
- Recipe: <repository-relative path at ending commit>
- Known implementation limitations: <none or exact unmet obligation>
- Outcome: READY FOR EVIDENCE / TESTING
- Requested next round: Evidence / Testing

### Implementation summary
...

### Correction completeness
- Explicit findings resolved: ...
- Root cause / bounded failure class: ...
- Directly coupled paths inspected: ...
- Regression coverage added/updated: ...
- Proof obligations affected by this correction: ...
- Previously valid proof expected to remain reusable: ...

### Evidence-ready deliverables
- Durable tests/fixtures/observation paths: ...
- AC-to-proof map: <verbatim AC -> scenario/assertion -> observable result>
- Execution inputs: ...
- Required artifacts: ...

### Checks actually performed during Implementation
<supporting checks and observed results only>

### Verification assigned to Evidence
- <fresh/reused/recovered obligation and required proof>

### Retain/reuse
- <specific still-valid prior proof and why>

### Closure condition
REVIEW READY only after Evidence satisfies the authorized proof obligations and original AC mapping.
```

For DISCOVERY REQUIRED, DEFINITION REQUIRED, or BLOCKED, serialize the exact allowed Outcome plainly and explain the unresolved fact. Do not pretend READY if evidence-ready deliverables are missing.

## Strict execution

Strict helper opt-in is separate from recipe creation. Only after the implementation and recipe exist may an authorized post-commit lifecycle trigger carry the existing `execution-contract:v1` marker with real commit/path/SHA-256 values. Package version alone never opts a request into strict mode.

## Stop

After posting the truthful Implementation record, stop. A fresh Evidence worker owns independent execution/proof.
