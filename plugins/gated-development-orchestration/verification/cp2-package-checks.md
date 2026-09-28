# GDO 4.7 CP2 package checks

This document records the package-level verification boundary for the CP2 repeated-blocker and verification-method economy contract. It is Implementation-time verification only and has no Evidence / Independent Review / PASS authority.

## Authority

- CP2 checkpoint: `kelvin-wat/actions-runner#16`
- Discovery architecture lock: `kelvin-wat/actions-runner@70fc5add92377b5a11d5c8722bcdff77575baa88:docs/GDO-CP2-EVIDENCE-ECONOMY-ARCHITECTURE.md`
- GDO starting baseline: `556741847740fc5d9eade183cc0e4df7b4854332` (4.6.0)
- Verified runner CP2A candidate: `kelvin-wat/actions-runner@85b0017232602429c2d12b75836d271f443d117c`

## Package checks

Run from the repository root:

```text
node plugins/gated-development-orchestration/scripts/check-gdo-v4.mjs
```

The checker must prove:

- manifest/load-contract/role metadata agree on 4.7.0;
- v3 lifecycle markers and sole Independent Review PASS authority remain present;
- CP2 is opt-in through `gdo-proof-history-policy/v1`;
- the deterministic guard result set is exactly `ALLOW | METHOD_DEVELOPMENT_REQUIRED | TRIAGE_REQUIRED`;
- changed method fingerprint alone cannot bypass a reached repeated-BLOCKED threshold;
- targeted-check and Discovery-Probe method readiness remains development/discovery feedback only;
- Evidence documents durable proof history and bounded mechanical invocation correction;
- strict Evidence documents the runner-owned `--mechanical-correction` path and proof-history sidecar;
- Independent Review treats METHOD READY as non-acceptance feedback and inspects override/correction provenance when material;
- no new GDO round or persistent worker is introduced;
- load budgets remain within the explicitly increased 4.7 anti-bloat ceilings.

## #335 contract simulation expected by runner

The package contract matches the runner regression model for AquaTwin #335 Rounds 7–11:

| Point | Control result / route |
| --- | --- |
| First same-proof method BLOCKED | formal Evidence may continue normally |
| Second consecutive same-proof method BLOCKED, relevant source unchanged | threshold reached |
| Another unproven method idea/fingerprint | `METHOD_DEVELOPMENT_REQUIRED` |
| Deterministic fixture/harness development | Implementation + targeted check |
| Native/runtime uncertainty | Discovery + optional Probe |
| Durable genuinely different METHOD READY | one fresh formal Evidence round may be `ALLOW` |
| Product defect | Implementation |
| Behavior unknown | Discovery |
| Contract contradiction | Definition through Governance |
| Ambiguous classification | Governance Triage |

METHOD READY never satisfies the acceptance proof. The fresh Evidence round must independently execute the method.

## Compatibility

Frozen/pre-CP2 campaigns do not gain synthetic proof history. Existing Evidence Admission, fresh Evidence sessions, proof reuse/economy, Human TAKEOVER, exactly-once publication, duplicate suppression, and sole Independent Review PASS authority remain controlling.
