# Model Selection and Runtime Reference

## v3 principle

Worker role and reasoning level are separate decisions.

v3 first assigns the correct worker:
- Governance ChatGPT thread for Definition, Discovery, Independent Review;
- Implementation ChatGPT thread for Implementation;
- fresh Codex session for Evidence / Testing.

Do not use a stronger reasoning tier to compensate for routing work to the wrong worker.

## Governance ChatGPT

Definition and Discovery may require deep product/architecture reasoning.

Independent Review may require deep cross-checking of intent, source-of-truth, diff, and evidence.

Use the human-selected ChatGPT surface/reasoning configuration. Stronger reasoning does not grant product authority and does not replace human approval for material Definition changes.

## Implementation ChatGPT

Implementation receives an execution-ready checkpoint/sub-checkpoint and performs actual code/product writes.

Use the human-selected ChatGPT implementation surface. If material architecture/product meaning is unresolved, return to Discovery rather than merely increasing reasoning effort.

## Evidence / Testing Codex

Every Evidence / Testing round is a fresh Codex session.

Normal evidence work should use a cost-conscious execution level sufficient to:
- build;
- run tests;
- perform live/E2E checks;
- diagnose evidence failures;
- make only qualifying tiny repair.

Escalation may be appropriate for technically difficult test diagnosis, but it never expands tiny-repair authority.

If testing reveals a substantive product defect, return to Implementation.

If it reveals a material architecture/system unknown, return to Discovery.

## Runtime reporting

Record actual model/reasoning/session data only when exposed by a reliable runtime source.

Do not infer runtime from elapsed time, output style, or workflow prose.

Runtime configuration is provenance, not evidence that the work is correct.

## Human preference

Explicit human model/reasoning selection for a round takes precedence over workflow defaults when supported and when it does not conflict with higher-authority safety/repository constraints.
