# Gated Development Orchestration Plugin 4.7.2

GDO 4.7.2 keeps the established v3 lifecycle, Human TAKEOVER, Evidence Admission, proof reuse, targeted development checks, Discovery Probes and concise lifecycle comments while retaining prior evidence/probe safeguards and adding checkpoint-sizing plus targeted-check apparatus discipline.

## Normal loading

A worker loads:
1. the package manifest;
2. `skills/gdo-workflow/SKILL.md`;
3. exactly one active role skill;
4. only conditional references required by that role/mode.

Roles:
- `gdo-definition`
- `gdo-discovery`
- `gdo-implementation`
- `gdo-evidence`
- `gdo-independent-review`

The historical `skills/gated-development-orchestration/SKILL.md` path is a thin compatibility shim. Its old `references/` directory remains available for frozen v3-era provenance but is not routine v4 input.

## Preserved protocol

GDO 4 does not add a round or change the durable lifecycle markers. Governance still owns Definition, Discovery and Independent Review; Implementation uses its separate persistent ChatGPT thread; each Evidence round uses a fresh session. Only Independent Review may PASS.

The existing `:v3` markers, thread identities, evidence outcomes, reuse rules, tiny-repair boundary, human activation, and `execution-contract:v1` strict schema remain compatible.

## Human actor takeover

A human may replace the normal actor in-place for Definition, Discovery, Implementation, or Evidence / Testing by posting `<!-- gated-development:actor-override:v1 -->` for one exact dispatch. TAKEOVER is non-dispatching and terminal for that dispatch; returning work to automation requires a new continuation/new dispatch ID.

Takeover changes the actor, not the contract. `Contract effect: NONE` is mandatory. Original intent, ACs, architecture/source-of-truth, review base, and work-order version remain controlling until an explicit human-authorized Definition/amendment changes them. Independent Review is not actor-overridable and remains sole PASS authority.

## Correction completeness and Evidence economy

Evidence may continue independent useful authorized checks after a substantive failure when safe, so one round can characterize a bounded failure cluster instead of reflexively stopping at the first symptom. This expands diagnosis, not scope.

A correction finding is the minimum demonstrated problem boundary. Implementation resolves explicit findings, traces the demonstrated root cause/failure class, inspects directly coupled manifestations, adds focused regression coverage where practical, and avoids unrelated cleanup/refactor.

A fresh Evidence round is not a fresh campaign. Previously valid proof remains reusable unless a concrete applicability/provenance/freshness reason invalidates it; a new candidate SHA alone is not enough. Later rounds execute the smallest sufficient set: failed, blocked/missing, concretely invalidated, explicitly fresh, and directly affected regression obligations.

## Lifecycle comment discipline

Lifecycle comments should make the round's story obvious at a glance: **Reason → What happened → Findings/fix → Proof impact → Result/next**.

The rule is **compress prose, never provenance**. Keep exact identities, SHAs, machine outcomes/routes, affected AC/proof IDs, correction boundaries, proof disposition, and durable references. Reference rather than repeat unchanged AC text, architecture prose, recipe bodies, raw logs, and previously accepted evidence.

Evidence → Implementation keeps the richer 4.2 correction packet. Implementation → Evidence keeps root cause/failure class, directly coupled paths inspected, focused regression coverage, and retained/affected proof. Shorter comments must never make the next worker guess.

## Pre-Implementation sizing

Before activating Implementation, Definition should confirm the checkpoint is one coherent engineering/product claim with a clear primary ownership path and a reasonable route to one evidence-ready candidate in one persistent Implementation round. Split when there are multiple meaningful independently reviewable product states/claims or substantial separately ownable verification/runtime infrastructure in addition to the product change.

Do not split merely because the diff is large, one coherent claim spans several layers/files, tests are numerous, or formal Evidence will be broad. If Implementation later reveals that the activated checkpoint was materially oversized in this sense, return to Definition for decomposition rather than carrying the round indefinitely.

## Discovery probes

A Discovery Probe is a lightweight executable experiment inside an active Discovery round. It exists for the narrow case where source/document/native inspection cannot confidently answer a material question that must be resolved before Governance can recommend an architecture/product direction.

The markers are:
- `<!-- gated-development:discovery-probe-request:v1 -->`
- `<!-- gated-development:discovery-probe-result:v1 -->`

A probe owns one bounded uncertainty, although its minimal experiment may include several tightly coupled observations needed to distinguish the alternatives. Before dispatch, Discovery must establish that apparatus, fixtures, build/package steps, execution entrypoint, runtime/deployment prerequisites, and cleanup path have no known blocker to reaching the material observation. Preparing or repairing those prerequisites remains Discovery work, not a probe, and readiness does not require knowing the behavior under investigation. If a probe stops before the material observation because of apparatus failure, repair and re-establish readiness before another probe; never use successive probe dispatches as a build/debug loop. Requests bind source identity separately from the required execution surface/runtime. Results use `COMPLETED | BLOCKED | INCONCLUSIVE`, never PASS/FAIL.

Probe code is normally disposable/ephemeral and must not silently become production implementation. Probe observations are **DISCOVERY FEEDBACK ONLY**: they can inform source-of-truth/architecture recommendations but cannot amend the checkpoint contract, satisfy acceptance criteria, replace formal Evidence, or PASS.

Governance Triage does not own probes. Triage may identify that an executable observation is required, but it must first route to Discovery; only the active Discovery worker may issue the probe. A Human-owned Discovery may still use an AUTO subordinate probe, while result delivery must not revive the superseded automated Governance worker.

## Targeted development checks

A targeted development check is a lightweight Implementation-side feedback dispatch for one exact candidate and one bounded question. Typical use is a native/runtime observation that Implementation cannot efficiently execute itself, such as a GIS restart check. Before dispatch, Implementation separates the candidate behavior being checked from the apparatus used to reach it and ensures no known unrelated harness, transport, fixture, environment, or setup blocker prevents the intended observation. Build/compile/test execution may itself be the bounded observation and need not be pre-proven.

The loop is:

`think -> build/commit -> targeted check -> feedback -> fix/repeat`

It remains the same Implementation round. Interim candidate checks are **DEVELOPMENT FEEDBACK ONLY**. Requests declare `Executor: AUTO | HUMAN`: AUTO lets transport choose the configured lightweight backend (OpenAI/MiniMax today, another authorized backend later); HUMAN launches no automated test worker and lets the human perform the bounded check directly.

The markers are:
- `<!-- gated-development:targeted-check-request:v1 -->`
- `<!-- gated-development:targeted-check-result:v1 -->`

A targeted-check PASS is not Evidence, does not satisfy an AC/proof obligation by itself, and cannot produce REVIEW READY or PASS. If a check stops before the intended candidate observation because of apparatus/setup failure, repair that apparatus inside Implementation before another dispatch; do not use successive targeted checks as a harness/transport/debug loop. Repeated checks should follow a materially relevant candidate correction or a newly exposed bounded candidate question; an unchanged/unfixed apparatus failure alone is not enough. After the final stabilized candidate is handed off normally, an independent formal Evidence / Testing round is still required.

For CP2 method development only, targeted checks or Discovery Probes may also bind a stable proof ID, canonical method descriptor/fingerprint, and `Method readiness: READY | NOT_READY | INCONCLUSIVE`. READY means the method is executable enough to return to formal Evidence; it is not acceptance proof.

## Evidence-ready Implementation

For product-code work continuing to Evidence, Implementation owns:
- actual authorized repository changes;
- necessary durable tests/fixtures/observation hooks;
- AC-to-proof mapping;
- a committed runnable verification recipe;
- exact ending commit and handoff.

Checks actually performed during Implementation are recorded separately from verification assigned to Evidence. Evidence-owned runtime execution is not automatically an Implementation limitation.

## CP2 repeated-blocker economy

A new proof ledger opts in with `proofHistory.schema = gdo-proof-history-policy/v1`. The runner then reconstructs durable per-proof Evidence history from GitHub, and after two consecutive same-proof method/fixture BLOCKED attempts with relevant source unchanged it suppresses another unproven formal Evidence launch. A new method fingerprint by itself is insufficient; a durable READY result or bounded human re-entry override is required.

This is a non-round control mechanism. It adds no sixth GDO round or persistent worker and has no PASS authority. Method development uses existing Implementation targeted checks or Discovery Probes. Mechanical invocation correction inside active Evidence is limited to one frozen-allowlist non-semantic correction with the original attempt preserved; no retry-until-green.

## Evidence modes

Evidence loads exactly one operator mode:
- legacy/manual;
- strict `execution-contract:v1`.

Strict mode remains opt-in and does not follow from package version.

## Package contract

`load-contract.json` is the machine-readable role/load map. `scripts/check-gdo-v4.mjs` checks version agreement, entrypoint/link presence, migration coverage, role isolation, canonical markers, and load budgets.

GDO 4 migration authority and rollout progress are tracked in:
https://github.com/kelvin-wat/actions-runner/issues/2

CP1 package work order:
https://github.com/kelvin-wat/actions-runner/issues/3

CP2 role-aware dispatch work order:
https://github.com/kelvin-wat/actions-runner/issues/4
