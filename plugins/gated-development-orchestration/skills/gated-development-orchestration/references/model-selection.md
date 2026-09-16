# Model Selection and Runtime Reference

Model advice, runtime configuration, workflow ownership, and permission to execute are different things.

## Reasoning allocation in v2

Gated Development Orchestration v2 intentionally spends stronger reasoning on **discovery/specification and independent review**, while normal Codex implementation consumes an already execution-ready work order.

Typical allocation:

```text
ChatGPT discovery / checkpoint definition: Extra High or Pro
Codex normal implementation: medium
ChatGPT independent implementation review: Extra High or Pro
```

This is a workflow default, not a claim that one reasoning level is universally superior.

## Codex implementation reasoning policy

### Medium (`medium`) — normal default

Select `medium` for a normal execution-ready implementation checkpoint or routine bounded correction.

An execution-ready gate has already resolved the material product/architecture questions. Codex still reads code, traces local implementation details, writes code, verifies, diagnoses ordinary failures, and performs qualifying incidental repairs.

Typical Medium work includes:

- implementing a well-specified MCP/API bridge against known native behavior;
- wiring known owners/services/layers according to a frozen source-of-truth;
- implementing clearly bounded UI/service/API/test changes;
- routine compile/test repair caused by the active implementation;
- straightforward review corrections with a concrete finding and bounded expected behavior.

### High (`high`) — elevated implementation complexity

Select `high` when the gate is discovery-complete but implementation is noticeably more complex than routine Medium work, for example:

- several interacting implementation layers must be coordinated;
- difficult but bounded test/build diagnosis is likely;
- there are multiple code-level approaches but the product behavior/architecture is already fixed;
- a correction requires broader implementation reasoning without reopening product discovery.

### Extra High (`xhigh`) — difficult implementation/debugging

Select `xhigh` when the gate remains execution-ready but requires substantial implementation-time reasoning, such as:

- difficult root-cause debugging with known intended behavior;
- complex cross-layer implementation reconciliation under already-defined architecture;
- repeated implementation failure at Medium/High where the missing work is technical execution, not product discovery;
- a difficult correction whose product meaning is clear but whose implementation cause is not.

### Max (`max`) — exceptional execution escalation

Select `max` only when the work is still discovery-complete and the execution/debugging problem is exceptionally difficult, such as:

- a reasonable `xhigh` implementation/debugging attempt did not resolve the same material technical problem;
- known intended behavior must be reconciled across unusually complex runtime interactions without making a new product/architecture decision;
- the human explicitly requests Max for that execution round.

Do **not** select Max merely because:

- the checkpoint is important or high consequence;
- the diff touches many files;
- verification is extensive;
- the feature is architecturally important but already well specified;
- unresolved product/architecture discovery remains.

If the reason for wanting Max is that intended behavior, ownership, architecture, acceptance meaning, or source-of-truth is not actually known, follow [Discovery checkpoints and return-to-ChatGPT](discovery-checkpoints.md) instead of escalating Codex.

## ChatGPT discovery/review reasoning

Material discovery checkpoints should normally run in ChatGPT Chat at Extra High or on the human-selected Pro surface. The same applies to independent implementation review when the human wants the normal high-assurance path.

This includes discovery checkpoints that happen to be CP1 and discovery checkpoints/sub-checkpoints created later in the feature.

Reasoning selection does not transfer product authority from the human. Discovery conclusions that materially define product behavior/architecture/source-of-truth require human approval before becoming controlling.

## Executable per-round Codex field

For every newly authored Codex activation, reactivation, or correction, include exactly one standardized field:

```text
- Execution reasoning effort: `<minimal|low|medium|high|xhigh|max>`
```

Normal current-work selection is `medium`.

Examples:

```text
- Execution reasoning effort: `medium`
- Execution reasoning effort: `high`
- Execution reasoning effort: `xhigh`
- Execution reasoning effort: `max`
```

Rules:

- Current activations/reactivations/corrections must state the field explicitly; do not rely on omission.
- Select `medium` unless the current execution-ready round has concrete technical complexity justifying `high`, `xhigh`, or `max`, or the human explicitly selects another supported value.
- Re-evaluate the effort for every executable round. Routing metadata may persist; reasoning effort does not.
- A prior `max` never makes later `max` sticky. A now-clear bounded correction/reactivation normally returns to `medium`.
- Exactly one field is allowed per executable comment.
- Supported values remain `minimal`, `low`, `medium`, `high`, `xhigh`, and `max`.
- Duplicate fields or unsupported values are malformed delivery; do not infer or silently normalize.
- Runtime effort never changes product authority, scope, architecture, verification, repository permissions, or acceptance criteria.

## Discovery is not a Codex reasoning tier

Before activation, ChatGPT applies the execution-readiness test from `discovery-checkpoints.md`.

During execution, Codex distinguishes:

- **implementation difficulty** — stay in the implementation lane and diagnose/repair at the selected effort;
- **material discovery required** — stop before inventing the missing decision and return routed `DISCOVERY REQUIRED` evidence to ChatGPT.

Do not self-escalate from Medium/High/XHigh to Max to answer an unresolved product/architecture question.

## Legacy runner fallback

The existing AquaTwin launcher may still mechanically fall back to:

```text
model_reasoning_effort=max
```

when a historical executable comment contains no reasoning-effort field.

That behavior exists only for backward compatibility with already-posted work orders. **Do not use omission as the current authoring policy.** v2-authored Codex work explicitly states the selected effort.

The launcher records the resolved effort as `reasoning_effort` and the source such as `runner-default` or `case-override`.

## Codex behavior after launch

Codex executes at the effort supplied by the launcher. It must not rewrite the work order, relaunch itself, or change its reasoning effort after startup.

If unexpected material discovery appears, use the routed discovery-required evidence path. If the problem is execution-only, continue normal authorized diagnosis/repair and report a true blocker only under the workflow's blocker rules.

## Reporting runtime

Report actual runtime model/reasoning only when exposed by a reliable runtime source or launcher record. Do not infer it from task duration or prose.

A recorded reasoning effort is evidence of the requested runtime setting, not evidence that the implementation is correct.

## Human preference

When the human explicitly selects a supported Codex reasoning level or ChatGPT surface for a round, use that current instruction unless it conflicts with a higher-authority safety/repository constraint.

Do not turn model recommendations into product authority. Stronger reasoning does not replace source-of-truth, verification, or independent remote review.
