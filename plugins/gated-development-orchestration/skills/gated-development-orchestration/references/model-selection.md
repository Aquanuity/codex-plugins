# Model Selection and Runtime Reference

Model advice, runtime configuration, and permission to execute are different things.

## Gated Development reasoning policy

For executable Codex work, **Extra High** is the normal reasoning level. The runtime token for Extra High is:

```text
xhigh
```

Use **Max** (`max`) as an escalation level for rounds that materially benefit from additional exploration, checking, or revision. Max is not the routine default simply because a gate is important, spans several files, or has strict verification.

### Use Extra High (`xhigh`) by default

Select `xhigh` for normal checkpoint implementation and ordinary bounded corrections, including work that is substantial but has a clear objective, architecture/ownership, path boundary, acceptance criteria, and verification plan.

Typical `xhigh` work includes:

- well-specified MCP/API bridge additions that mirror known native behavior;
- focused implementation across a known set of layers;
- routine test/verification repair inside the active gate;
- straightforward correction rounds such as a missing guard, test, mapping, validation, or narrowly identified defect;
- most checkpoint work where independent ChatGPT review will still verify the remote result.

### Escalate to Max (`max`) deliberately

Select `max` when the current round has a material reasoning difficulty that justifies the additional usage, such as one or more of these conditions:

- an `xhigh` attempt on the same material problem did not resolve it, or independent review identified a deeper root-cause problem rather than a routine correction;
- correct behavior or ownership must be discovered across multiple subsystems with plausible competing implementation paths;
- a broad/cross-layer refactor or migration requires reconciling several interacting contracts and the existing behavior is not sufficiently specified to make the path routine;
- debugging is causally difficult, nondeterministic, internally inconsistent, or repeatedly failing despite a reasonable `xhigh` attempt;
- the work requires unusually deep architectural or behavioral reconciliation while remaining inside already-authorized product scope;
- the human explicitly requests Max for that execution round.

Do **not** select `max` merely because:

- the checkpoint is high priority or high consequence;
- the diff is expected to touch many files;
- verification is strict or extensive;
- the previous workflow historically defaulted the runner to `max`;
- more reasoning sounds safer in the abstract.

A higher reasoning level never expands product scope, architecture authority, repository permissions, or acceptance criteria.

## Executable per-round selection contract

For every **newly authored** executable activation or correction under this workflow, include exactly one standardized reasoning-effort field:

```text
- Execution reasoning effort: `<minimal|low|medium|high|xhigh|max>`
```

The workflow's normal selection is `xhigh` or `max` according to the policy above. If the human explicitly selects another supported runtime effort for that round, honor that current instruction.

Examples:

```text
- Execution reasoning effort: `xhigh`
- Execution reasoning effort: `max`
```

Rules:

- New activations and corrections authored under the current workflow must state the field explicitly; do not rely on an omitted-field default.
- Select `xhigh` unless the current round satisfies a Max escalation condition or the human explicitly chooses a different supported value.
- Re-evaluate the effort for every correction round. Routing metadata is inherited through the gate; reasoning effort is not.
- A routine correction after a prior `max` round normally returns to `xhigh` unless the correction itself still warrants Max.
- A difficult correction after an `xhigh` round may be escalated to `max` without changing any other gate authority.
- Exactly one field is allowed per executable activation/correction.
- Supported values remain `minimal`, `low`, `medium`, `high`, `xhigh`, and `max`.
- Duplicate fields or unsupported values are malformed delivery; do not infer or silently fall back.
- Runtime effort never changes product authority, scope, architecture, verification, repository permissions, or acceptance criteria.

## Legacy runner fallback

The existing AquaTwin launcher retains its mechanical fallback:

```text
model_reasoning_effort=max
```

when an executable historical activation/correction contains no reasoning-effort field. This preserves compatibility with already-posted work orders created before the explicit-selection rule.

**Do not use that fallback when authoring new work under this workflow.** A current activation/correction should carry the selected effort explicitly so Codex starts with the intended setting.

The launcher records the resolved effort as `reasoning_effort` and records whether it came from `runner-default` or `case-override`.

## Codex behavior after launch

Codex executes at the effort supplied by the launcher. It must not self-relaunch, rewrite the work order, or change its own reasoning effort merely because the task feels easier or harder after startup.

Running at `xhigh` is not itself a blocker. Codex should continue authorized implementation, diagnosis, repair, and verification. If independent review later determines that a deeper correction warrants Max, the next executable correction can select `max` explicitly.

## Reporting runtime

Report actual runtime model/reasoning only when exposed by a reliable runtime source or by the launcher record. Do not infer it from task duration or skill prose.

A launcher-recorded `reasoning_effort=xhigh` or `reasoning_effort=max` is evidence of the requested runtime setting, not evidence that the model reasoned correctly.

## Human/model preference

When the human explicitly selects a model or reasoning level, use that current instruction instead of historical advice, subject to supported runtime values.

Do not turn model recommendations into product authority. A stronger model does not replace remote inspection or acceptance criteria.

## ChatGPT independent review

Use the human-selected ChatGPT Chat / Pro conversation identified by the required human-supplied routing marker for independent review.

Do not silently delegate the review back to the implementing Codex session, ChatGPT Work, or another unapproved surface.
