# Gated Development Orchestration Plugin 4.1.0

GDO 4.1 keeps the established v3 lifecycle protocol and bounded role-scoped package, and adds durable human actor takeover without changing checkpoint authority.

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
