---
name: gdo-implementation
description: GDO Implementation role for actual authorized repository changes, durable tests, committed verification recipe, exact ending commit, and Evidence handoff.
compatibility: Load with gdo-workflow from the same package commit. Product-code Evidence handoff also loads the shared verification-recipe contract.
metadata:
  version: "4.7.3"
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

## Targeted development feedback loop

During an active Implementation round, use targeted development checks when a correction needs a narrow runtime/native observation that Implementation cannot efficiently execute itself. Before dispatch, separate the candidate behavior being checked from the apparatus used to reach it. There must be no known unrelated harness, transport, fixture, environment, or setup blocker preventing the intended observation. When build/compile/test execution itself is the bounded question, that execution is the observation and need not be pre-proven.

The loop is intentionally asymmetric:

`think -> build/commit candidate -> one targeted check -> feedback -> think/fix -> repeat`

The executor may be a human, Codex, MiniMax, another testing agent, or an authorized local harness. The executor does not become the Evidence role. Use `Executor: AUTO` when runner transport should choose the configured lightweight backend; use `Executor: HUMAN` when the human will perform the bounded check directly without launching an automated testing worker.

Requirements:
1. keep the same active Implementation round and checkpoint authority;
2. commit or otherwise durably identify the exact candidate before requesting the check;
3. ask one bounded question whose answer can materially guide the current correction;
4. provide only the setup/action needed for that question rather than the full Evidence campaign;
5. treat PASS/FAIL/BLOCKED as development feedback only;
6. after feedback, either continue correcting, request another bounded check, or publish the normal final Implementation record when engineering-stable;
7. do not claim Evidence coverage, REVIEW READY, or PASS from targeted checks;
8. if feedback exposes material architecture/product uncertainty, leave the loop and route Discovery/Definition under normal rules;
9. if the check stops before the intended candidate observation because of apparatus/setup failure, repair the apparatus inside the active Implementation round and re-establish readiness before another check;
10. do not use successive targeted checks as a harness/transport/debug loop.

A targeted check can be repeated against successive candidate SHAs inside one Implementation round after a materially relevant candidate correction or when a newly exposed bounded candidate question requires external observation. An unchanged or unfixed apparatus failure alone is not sufficient reason for another dispatch. Interim candidates do not need canonical Implementation handoff records.

### Observation sufficiency and recipient access

Use existing Check/Expected/Artifact requested fields to specify decisive data; prefer captured output inline. No attachment/full log is required when inline data suffices. Report values and unexpected/contradictory results separately from interpretation; disclose limits and truncation/redaction; protect secrets. Captured output/Limitations sections may follow canonical fields without duplicates.

A local file is not delivered unless recipient access is established; disclose local-only/unknown access, never invent URLs. Inspect data needed for correction conclusions. Missing required captures leave dependent conclusions unresolved; optional missing files do not block sufficient data or imply product FAIL. Recover captures under original identity through authorized publication, not reruns or frozen-result edits. No new statuses, mandatory uploads, or acceptance Evidence; frozen contracts stay unchanged.

### Canonical targeted-check request

```markdown
<!-- gated-development:targeted-check-request:v1 -->
<!-- gated-development:governance-thread:v1 id=<UUID> -->
<!-- gated-development:implementation-thread:v1 id=<UUID> -->
## Targeted development check

- Checkpoint: <ID>
- Parent implementation dispatch: <dispatch id>
- Check ID: <stable unique id within this Implementation round>
- Candidate commit: <exact sha>
- Branch: <branch>
- Executor: <AUTO | HUMAN>
- Check: <one bounded question>
- Expected: <specific expected observation>
- Setup / action: <minimal steps or command>
- Artifact requested: <minimum inline data or exact file needed; none when unnecessary>
- Proof ID: <stable proof ID> <!-- CP2 method-development only -->
- Method descriptor: <canonical stable JSON descriptor> <!-- CP2 method-development only -->
- Method fingerprint: <lowercase SHA-256 of descriptor> <!-- CP2 method-development only -->
- Classification: DEVELOPMENT FEEDBACK ONLY
```

### Canonical targeted-check result

```markdown
<!-- gated-development:targeted-check-result:v1 -->
<!-- gated-development:governance-thread:v1 id=<UUID> -->
<!-- gated-development:implementation-thread:v1 id=<UUID> -->
## Targeted development check result

- Checkpoint: <ID>
- Parent implementation dispatch: <dispatch id>
- Check ID: <same id as request>
- Targeted check request: <request comment URL or id>
- Candidate tested: <exact sha>
- Executor: <AUTO | HUMAN>
- Result: <PASS | FAIL | BLOCKED>
- Observation: <actual decisive data, interpretation limits, and any delivery limitation>
- Artifact: <inline data location, recipient-accessible reference, or none/unavailable with reason>
- Proof ID: <same stable proof ID> <!-- CP2 method-development only -->
- Method descriptor: <same canonical stable JSON descriptor> <!-- CP2 method-development only -->
- Method fingerprint: <same lowercase SHA-256> <!-- CP2 method-development only -->
- Method readiness: <READY | NOT_READY | INCONCLUSIVE> <!-- CP2 method-development only -->
- Classification: DEVELOPMENT FEEDBACK ONLY
```

A result returns to the same persistent Implementation worker. It does not end the Implementation round. The worker should use it immediately as engineering feedback and avoid publishing `READY FOR EVIDENCE / TESTING` until the bounded correction is reasonably stabilized.

When a repeated CP2 Evidence blocker has routed verification-method development here, use the additive Proof ID / Method descriptor / Method fingerprint fields. The result must state `Method readiness: READY | NOT_READY | INCONCLUSIVE`. A changed fingerprint without durable READY does not justify another formal Evidence round. READY closes only the method-development question; fresh Evidence must still execute the acceptance proof independently.

## Evidence Admission feedback continuation

An Implementation-owned Admission `NOT_READY` is control-plane readiness feedback inside the **same active Implementation round**. Fetch the rejected Implementation record and Admission receipt, fix only the bounded readiness defect, preserve unrelated product code/proof content, commit any needed correction, and republish the canonical READY record with the same round number. Do not manufacture a new Implementation round merely because Admission rejected the handoff.

Infrastructure-owned `NOT_READY` is not Implementation work unless the repair actually requires candidate changes; it creates no lifecycle round. `TRIAGE_REQUIRED` belongs to Governance Triage. Admission never supplies acceptance proof.

## Evidence-ready completion

For new admission-enabled product-code handoffs, include `<!-- gated-development:evidence-admission:v1 -->` and commit a `gdo-proof-ledger/v1` file beside or referenced by the verification recipe. The marker is explicit opt-in; never add it retroactively to a frozen request.

`READY FOR EVIDENCE / TESTING` requires:
1. authorized implementation is committed;
2. necessary durable tests/fixtures/observation hooks are committed or adequate existing ones are identified;
3. every original AC is mapped to expected behavior and proof;
4. a runnable recipe is committed/identified under the verification-recipe contract;
5. exact ending commit and branch are remotely verified;
6. actual Implementation limitations are disclosed;
7. checks actually performed are separated from verification assigned to Evidence;
8. when admission-enabled, the proof ledger maps every mandatory current proof obligation to a stable proof ID, executable verification method, required fixture/runtime inputs, and material freshness/reuse policy;
9. when admission-enabled, declared admission-only checks are safe readiness checks and do not substitute for acceptance testing;
10. when CP2 proof history is enabled, the proof ledger carries `proofHistory: { "schema": "gdo-proof-history-policy/v1", "repeatedBlockedThreshold": 2 }` (or another explicitly authorized bounded threshold) and preserves the existing stable proof IDs rather than inventing a parallel blocker identity.

A commands-only issue comment does not replace the committed recipe. For admission-enabled handoffs, prose AC mapping does not replace the committed proof ledger.

Evidence-owned build/Vitest/Playwright/live/browser execution is a normal workflow boundary, not automatically an Implementation limitation. Useful Implementation-time testing is allowed. When only one narrow observation is needed for stabilization, prefer a targeted development check over prematurely ending the Implementation round solely to obtain formal Evidence feedback. A check expressly required during Implementation by current authority remains required or must be truthfully unresolved.

## Known implementation limitations

Use this only for unmet Implementation obligations: e.g. required repository write denied, required durable test/recipe cannot be committed, authoritative input inaccessible, or an expressly required Implementation check could not be completed.

Do not list ordinary Evidence-owned execution merely to sound cautious.

## Admission-enabled structured publication

For a new Evidence Admission handoff, commit the proof ledger per verification-recipe, then submit `<!-- gated-development:lifecycle-publication-request:v1 type=implementation -->` plus one `gdo-lifecycle-implementation/v1` JSON object carrying the canonical facts, bound ledger, exact READY outcome, and `admission_enabled: true`. Runner injects request identity and renders the canonical record. Do not add v3 markers/request ID or post a second canonical record. Legacy handoffs are unchanged.

## Canonical Implementation record

Keep the lifecycle comment delta-oriented. Preserve machine/provenance fields and the 4.2 correction packet; reference unchanged checkpoint authority, AC wording, recipe body, and prior Evidence rather than repeating them.

```markdown
<!-- gated-development:implementation-record:v3 -->
<!-- gated-development:evidence-admission:v1 --> <!-- generated by the schema-aware publisher for admission-enabled handoffs -->
<!-- gated-development:actor:v1 actor=human --> <!-- include only for human actor -->
<!-- gated-development:governance-thread:v1 id=<UUID> -->
<!-- gated-development:implementation-thread:v1 id=<UUID> -->
## Implementation Round <n>

- Checkpoint: <ID>
- Work-order version: <n when defined>
- Dispatch ID: <id>
- Starting commit: <sha>
- Ending commit: <sha>
- Branch: <branch>
- Changed paths: <concise paths>
- Affected ACs / proof obligations: <IDs>
- Recipe: <repository-relative path@ending-sha>
- Proof ledger: <repository-relative gdo-proof-ledger/v1 path@ending-sha> <!-- admission-enabled only -->
- Known implementation limitations: <none or exact unmet obligation>
- Outcome: READY FOR EVIDENCE / TESTING
- Requested next round: Evidence / Testing

### Reason
<initial authorized objective or incoming Evidence/Review finding>

### What changed
<concise implementation delta>

### Correction packet
<!-- required for correction rounds; omit only when not a correction -->
- Explicit findings resolved: ...
- Root cause / bounded failure class: ...
- Directly coupled paths inspected: ...
- Regression coverage added/updated: ...

### Proof disposition
- Rerun / newly affected: ...
- Retain/reuse: ...
- Invalidated + concrete reason: <none or ...>

### Checks performed
<actual Implementation-time checks and observed results only>

### References
- Checkpoint authority: <issue/comment>
- Recipe: <path@ending SHA>
- Incoming finding/evidence: <comment/artifact when applicable>
```

Do not paste verbatim AC text unless wording itself changed or is disputed. Do not paste recipe commands or raw test logs into the lifecycle comment when the referenced durable source/artifact is sufficient.

For DISCOVERY REQUIRED, DEFINITION REQUIRED, or BLOCKED, serialize the exact allowed Outcome plainly and make Reason, unresolved finding, authority/provenance, and next route explicit. Do not pretend READY if evidence-ready deliverables are missing.

## Strict execution

Strict helper opt-in is separate from recipe creation. Only after the implementation and recipe exist may an authorized post-commit lifecycle trigger carry the existing `execution-contract:v1` marker with real commit/path/SHA-256 values. Package version alone never opts a request into strict mode.

## Stop

After posting the truthful Implementation record, stop. A fresh Evidence worker owns independent execution/proof.
