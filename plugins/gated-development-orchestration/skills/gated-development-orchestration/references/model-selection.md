# Model Selection and Runtime Reference

Model advice, runtime configuration, and permission to execute are different things.

## AquaTwin automated Codex default

The automated AquaTwin launcher defaults Codex reasoning effort to:

```text
model_reasoning_effort=max
```

unless the executable activation/correction explicitly supplies a supported reasoning-effort override.

The launcher default is mechanical runtime configuration. It does not decide scope, architecture, verification, repository operations, or acceptance.

## Executable per-round override contract

Use this exact standardized field in an activation or correction comment when a non-default reasoning effort is wanted for that execution:

```text
- Execution reasoning effort: `<minimal|low|medium|high|xhigh|max>`
```

Examples:

```text
- Execution reasoning effort: `xhigh`
- Execution reasoning effort: `high`
- Execution reasoning effort: `max`
```

Rules:

- If the field is omitted, the runner uses `max`.
- Exactly one field is allowed per executable activation/correction.
- Supported values are `minimal`, `low`, `medium`, `high`, `xhigh`, and `max`.
- The override applies only to that single execution round.
- A later correction does not inherit a previous activation/correction override. State the field again when that later round should use a non-default effort.
- Duplicate fields or unsupported values are malformed delivery; do not infer or silently fall back.
- Runtime effort never changes product authority, scope, architecture, verification, repository permissions, or acceptance criteria.

The runner records the resolved effort as `reasoning_effort` and records whether it came from `runner-default` or `case-override`.

## Reporting runtime

Report actual runtime model/reasoning only when exposed by a reliable runtime source or by the launcher record. Do not infer it from task duration or skill prose.

A launcher-recorded `reasoning_effort=max` is evidence of the requested runtime setting, not evidence that the model reasoned correctly.

## Human/model preference

When the human explicitly selects a model or reasoning level, use that current instruction instead of historical advice.

Do not turn model recommendations into product authority. A stronger model does not replace remote inspection or acceptance criteria.

## ChatGPT independent review

Use the human-selected ChatGPT Chat / Pro conversation identified by the required human-supplied routing marker for independent review.

Do not silently delegate the review back to the implementing Codex session, ChatGPT Work, or another unapproved surface.
