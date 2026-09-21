# GDO 4 migration map

Authority: runner issue https://github.com/kelvin-wat/actions-runner/issues/2 and its Design record 1.

This file is maintenance evidence, not routine worker input. Baseline is GDO 3.1.2 at `974e4d88387b85eebb1c1cc9be892cac191331da`.

## Invariants 1–28

| ID | v4 canonical owner |
|---|---|
| I1 | CORE authority hierarchy |
| I2 | CORE GitHub-over-memory rule |
| I3 | Definition checkpoint quality |
| I4 | Definition checkpoint quality |
| I5 | Definition decomposition |
| I6 | CORE activation authority; Definition activation procedure |
| I7 | CORE material-change rule; Definition re-authorization |
| I8 | CORE worker table |
| I9 | CORE worker table |
| I10 | CORE fresh Evidence worker |
| I11 | Evidence tiny-repair boundary |
| I12 | CORE transition; Discovery procedure |
| I13 | CORE transition; Definition procedure |
| I14 | CORE sole Independent Review PASS |
| I15 | CORE sole Independent Review PASS |
| I16 | CORE sole Independent Review PASS |
| I17 | Independent Review fresh remote truth |
| I18 | CORE identity semantics |
| I19 | CORE record envelope; automation transports |
| I20 | CORE provenance meaning; automation idempotency; Evidence session identity |
| I21 | CORE preserve history |
| I22 | CORE artifact default; Evidence artifact handling |
| I23 | CORE factuality rule |
| I24 | Evidence reuse/applicability |
| I25 | Evidence selected operator ledger/closure |
| I26 | CORE terminal publication rule; Evidence stop; automation implementation |
| I27 | CORE canonical token serialization |
| I28 | CORE capability bootstrap; role-specific capability use |

All 28 baseline invariants are retained or merged; no ID is intentionally dropped.

## Baseline source families

| v3 source | v4 destination |
|---|---|
| `SKILL.md` purpose/workers/transitions/source | `skills/gdo-workflow/SKILL.md` |
| checkpoint quality/human verification | `skills/gdo-definition/SKILL.md` |
| Discovery authority/procedure | `skills/gdo-discovery/SKILL.md` |
| Implementation authority/handoff | `skills/gdo-implementation/SKILL.md` |
| Evidence authority/reuse/tiny repair/outcomes | `skills/gdo-evidence/SKILL.md` + selected operator |
| Independent Review inputs/scope/outcomes | `skills/gdo-independent-review/SKILL.md` |
| `rounds-and-checkpoints.md` | CORE summary + Definition/Discovery role procedures |
| `authority-and-lifecycle.md` | CORE authority/identity + role permissions |
| `discovery-checkpoints.md` | Discovery |
| `gate-issue-templates.md` | CORE envelope + role-local record templates |
| `evidence-and-review.md` | Evidence + Independent Review |
| `execution-artifacts.md` | Evidence; maintainer-only transport details remain historical until CP2 |
| `evidence-execution-contract.md` recipe schema | `skills/gdo-workflow/references/verification-recipe.md` |
| `evidence-execution-contract.md` strict operator | `skills/gdo-evidence/references/strict-operator.md` |
| `chatgpt-capabilities.md` | CORE bootstrap + Implementation/Review behavior |
| `automation-handoff.md` | CP2 runner transport; not routine CP1 role input |
| `model-selection.md` | human-selected runtime remains provenance; no role gains authority from model tier |

## Compatibility

The old `skills/gated-development-orchestration/SKILL.md` path is a v4 shim. Its historical `references/` files remain byte-preserved for frozen-record interpretation but are not the default v4 load set.

Protocol markers stay `:v3`; strict recipe marker/schema stay `execution-contract:v1` / `gdo-evidence-recipe/v1`. Package major version does not migrate active requests.
