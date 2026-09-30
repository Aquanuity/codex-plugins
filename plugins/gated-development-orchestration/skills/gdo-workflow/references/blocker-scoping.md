# Scoped blockers and pre-finalization audit

Applies to every active GDO role and actor. Load this reference from the same package snapshot when an operation fails/is unavailable, or before an incomplete handoff. It explains the workflow core; it introduces no new round, startup gate, outcome, publisher, or acceptance authority.

## Block only the dependent work

A blocker applies only to work that depends on it. Preserve the failed attempt, identify the affected operation, then reassess the remaining authorized obligations. Continue the obligations that are independent, meaningful, safe, executable, and within existing scope and resource bounds. This is required, not merely permission to aggregate defects.

Dependencies include authority, exact source/build identity, required observations/provenance, fixtures and shared state, artifact capture, and safe restoration. Separate names do not establish independence. An unavailable optional attachment does not block sufficient observations; unavailable required capture does block conclusions that require it. Do not replace an unavailable interface/build/fixture with an unauthorized substitute or claim equivalent proof.

Use the existing task/closure ledger. For each remaining obligation identify its prerequisite or shared-state dependency, whether it can proceed, and the concrete reason for any deferral. Group items only when they have the same dependency and identify all affected IDs. Unknown dependency or safety must be resolved before that item executes, not assumed safe. Uncertainty about one item does not block known-independent items.

A failed assertion is an observed result, not an unattempted test. Preserve it; do not retry until green. Do not rerun satisfied unrelated proof or expand the campaign to find something else to do. Work may be unhelpful when it cannot add valid coverage or bounded diagnosis; inconvenience or the inability to achieve overall PASS is not enough.

## Audit before ending, handing off, or freezing

Before finalizing a result, handing off, preparing/finally freezing publication, or ending an incomplete round:

1. Refresh the applicable authority and enumerate remaining authorized obligations from the existing ledger.
2. Identify actual dependencies on each blocker; continue all useful independent work within the original bounds.
3. Preserve observations, failed attempts, artifact identities and state/restoration records.
4. Account for every item not executed and record the whole-round stop basis.

A whole-round stop is justified only when no useful independent authorized work can proceed within the controlling bounds, current authority/safety requires stopping, or a genuine terminal lifecycle condition applies. Do not manufacture the terminal condition by prematurely selecting BLOCKED, freezing an incomplete result, or posting an early handoff. A mandatory failed admission/re-entry gate is not permission to start the suppressed role. A wait for an already-dispatched dependency is a nonterminal pause where supported, not completion or authority to redispatch.

Human stop/takeover, revoked authority, unsafe shared state, and existing terminal handoff rules retain precedence. Perform only separately authorized safe shutdown/reconciliation; never continue ordinary work by relabeling it cleanup. Apply this rule inside the active role, not by absorbing its successor or an unrelated infrastructure project.

## Execution, artifacts, and delivery are separate

Before any final freeze/submission, known publication unavailability blocks delivery and transitions requiring it, not independent execution with valid local capture and restoration. Finish that work and retain the fullest truthful local bundle, inventory, hashes and source/run identities. Do not bypass the publisher, invent receipts/URLs, or claim recipient access.

Artifact completeness for executed work is distinct from completeness of the required campaign bundle. Complete logs for prerequisite tests do not mean the live matrix or its artifacts are complete. Execution completion is distinct from test success and proof closure. Unpublished or inaccessible proof is not delivered REVIEW READY or PASS.

After preparation freezes evidence, do not mutate the frozen bytes/outcome. Uncertain submission requires reconciliation under the same identity, not assumed failure, new testing against that frozen outcome, or blind retry. Durable queue acknowledgement / terminal publication remains STOP. The remaining-work audit belongs before that boundary; this reference does not reopen it.

## Stop-report additions

Put this information in the existing record/linked ledger, without duplicating machine fields or creating a dispatch marker:

- Blocked operation and observed failure.
- Dependent obligations, with IDs and the specific prerequisite/shared-state reason.
- Independent work actually completed after the blocker.
- Every remaining unexecuted obligation and why it cannot usefully, safely, and lawfully proceed; identify any scope/time/cost limit relied on.
- Whole-round stop basis and its authority/terminal reference when applicable.
- Execution progress and findings: what ran, failed, remained unexecuted, or reused valid proof.
- Artifact completeness: preserved executed-work records, missing campaign artifacts, exact local/durable references and provenance gaps.
- Publication/delivery: not attempted, unavailable, frozen, uncertain, acknowledged, or delivered as actually observed; actual recipient access.

Do not assert completion while executable independent obligations remain. If an audit helper is unavailable, keep the required semantic audit in the existing record; do not turn that helper's absence into another whole-round blocker.
