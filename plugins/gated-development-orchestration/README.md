# Gated Development Orchestration Plugin 4.4.0

GDO 4.4 keeps the established v3 lifecycle, Human TAKEOVER, correction/evidence-economy rules, and concise lifecycle comments while adding lightweight targeted development checks inside active Implementation rounds.

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

## Targeted development checks

A targeted development check is a lightweight Implementation-side feedback dispatch for one exact candidate and one bounded question. Typical use is a native/runtime observation that Implementation cannot efficiently execute itself, such as a GIS restart check.

The loop is:

`think -> build/commit -> targeted check -> feedback -> fix/repeat`

It remains the same Implementation round. Interim candidate checks are **DEVELOPMENT FEEDBACK ONLY** and may be executed by a human, Codex, MiniMax, another testing agent, or an authorized harness.

The markers are:
- `<!-- gated-development:targeted-check-request:v1 -->`
- `<!-- gated-development:targeted-check-result:v1 -->`

A targeted-check PASS is not Evidence, does not satisfy an AC/proof obligation by itself, and cannot produce REVIEW READY or PASS. After the final stabilized candidate is handed off normally, an independent formal Evidence / Testing round is still required.

## Evidence-ready Implementation

For product-code work continuing to Evidence, Implementation owns:
- actual authorized repository changes;
- necessary durable tests/fixtures/observation hooks;
- AC-to-proof mapping;
- a committed runnable verification recipe;
- exact ending commit and handoff.

Checks actually performed during Implementation are recorded separately from verification assigned to Evidence. Evidence-owned runtime execution is not automatically an Implementation limitation.

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
