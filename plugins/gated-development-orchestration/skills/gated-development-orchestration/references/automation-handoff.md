# Automation Handoff Reference

This is the shared automation contract for ChatGPT orchestration/discovery/review, local Codex implementation, the transport-only implementation runner, the artifact publisher, and the return-to-ChatGPT workflow.

## Current workflow plugin

Use current `gated-development-orchestration@aquanuity` from the execution-surface source defined in `SKILL.md`. Product gates do not pin the workflow package version/source.

## Routing by first-line marker

| First-line marker | Destination | Meaning |
|---|---|---|
| `<!-- gated-development:activation:v1 -->` | Codex | Execute initial activation or approved post-discovery reactivation |
| `<!-- gated-development:review:v2 status=correction-required -->` | Codex | Execute bounded implementation correction |
| `<!-- gated-development:codex-evidence:v2 -->` | ChatGPT return transport | Normal independent review **or** discovery-required return, determined by report content |
| `<!-- gated-development:blocker:v2 -->` | Blocker transport when configured | True blocker triage; not the v2 discovery-return path |
| PASS / verification-blocked / amendment/state markers | Ledger/control only | Do not launch Codex or ChatGPT review by themselves |

## ChatGPT thread routing marker

Every executable Codex activation/reactivation/correction requires exactly one:

```text
<!-- gated-development:chatgpt-thread:v1 id=<UUID> -->
```

The human supplies the ID on initial gate activation. Corrections and reactivations reuse the established route unless the human explicitly supplies a replacement.

Codex copies the exact triggering marker into normal evidence, discovery-required evidence, or blocker. It never selects a different destination.

## Discovery return uses existing evidence transport

v2 deliberately does **not** introduce a new transport marker for surprise discovery.

When Codex encounters material discovery, it publishes:

```text
<!-- gated-development:codex-evidence:v2 -->
<!-- gated-development:chatgpt-thread:v1 id=<copied UUID> -->
...
Submission outcome: DISCOVERY REQUIRED
```

The normal evidence return workflow routes that report to the declared ChatGPT thread. ChatGPT reads the report and switches from normal independent review into discovery orchestration.

This preserves compatibility with evidence-only return transports that already recognize `codex-evidence:v2`.

The transport must not decide whether discovery is valid; it only routes. ChatGPT independently checks the classification.

## Implementation transport

The implementation runner is deliberately dumb.

It may validate:

- repository/sender/event identity;
- issue/comment IDs;
- supported executable first-line marker;
- nonempty instruction;
- local launch prerequisites;
- duplicate delivery of the exact same comment;
- reasoning-effort field shape/value.

It must not decide:

- feature/gate validity;
- discovery sufficiency;
- source-of-truth authority;
- scope/path/architecture;
- branch creation/repair policy;
- verification sufficiency;
- incidental-repair qualification;
- PASS/correction/discovery validity;
- whether Medium/High/XHigh/Max was the right human/orchestrator choice.

### Supported executable markers

The existing launcher supports:

- activation marker for initial activation and post-discovery reactivation;
- correction-required marker for bounded implementation corrections.

Post-discovery resume intentionally reuses `activation:v1`, so no new launcher marker is required. The work-order version and discovery-amendment reference distinguish reactivation from the original activation.

## Runtime reasoning selection

Every current v2 Codex activation/reactivation/correction explicitly contains:

```text
- Execution reasoning effort: `<minimal|low|medium|high|xhigh|max>`
```

Normal selection:

- `medium` — ordinary execution-ready implementation/correction/reactivation;
- `high` — elevated implementation complexity;
- `xhigh` — difficult implementation/debugging with already-known product meaning;
- `max` — exceptional technical execution escalation or explicit human request;
- material discovery — return to ChatGPT rather than using Max as a discovery substitute.

The launcher applies the explicit value to Codex and records the resolved effort/source.

Historical executable comments without a field may continue using the runner's old `max` fallback. That is backward compatibility, not current authoring policy.

Codex does not self-relaunch to change reasoning effort after startup.

## Detached execution

GitHub Actions may end after startup acknowledgment while Codex continues in its own process/console. Launch acknowledgment is not completion or PASS.

Durable local run records may include request/prompt/event/stderr/progress/start/completion/error/publication files. These remain execution artifacts, not default repository deliverables.

## Artifact publication

For AquaTwin automated runs, follow `execution-artifacts.md`.

Codex authors the terminal report and redaction-reviewed bundle, writes readiness/checksums, dispatches the fixed artifact publisher with the existing request ID, then stops after dispatch acknowledgment.

The publisher uploads the immutable bundle and posts the authored report with actual artifact metadata. It does not change report type, implementation scope, discovery classification, routing, or acceptance.

A discovery-required report is published through this same mechanism as normal Codex evidence.

## Return-to-ChatGPT workflow

Minimum path:

```text
codex-evidence:v2
  -> extract exactly one ChatGPT thread marker
  -> route repository + issue + exact evidence URL to that thread
  -> ChatGPT fetches evidence independently
  -> if normal evidence: independent implementation review
     if Submission outcome == DISCOVERY REQUIRED: discovery orchestration
```

Do not copy the entire report into transport unless necessary; the ChatGPT recipient should fetch the exact GitHub evidence.

Codex never directly calls the ChatGPT bridge.

## Normal implementation loop

```text
ChatGPT prepares execution-ready gate
  -> human activates with route A + explicit Codex effort (normally medium)
  -> Codex executes / verifies / repairs
  -> publisher posts evidence + route A
  -> return workflow -> ChatGPT thread A
  -> independent review
       -> PASS
       OR
       -> correction + route A + newly selected effort
           -> Codex -> evidence -> review -> repeat
```

## Surprise-discovery loop

```text
implementation gate active with route A
  -> Codex encounters material unforeseen discovery
  -> stops before deciding product/architecture meaning
  -> codex-evidence:v2 + route A + Submission outcome: DISCOVERY REQUIRED
  -> return workflow -> ChatGPT thread A
  -> ChatGPT validates discovery need
  -> create linked <Gate>.D<n> discovery checkpoint
  -> ChatGPT Extra High / Pro investigates
  -> source-of-truth amendment + human approval when material
  -> discovery amendment record
       -> if original gate remains truthful:
            new activation:v1 (reactivation) + route A + new work-order version + explicit effort
            -> Codex resumes
       -> otherwise:
            supersede old gate and create replacement gate(s)
```

No fresh UUID is required for the discovery return or reactivation unless the human explicitly changes the destination.

## Reasoning and discovery separation

The runner does not infer discovery from reasoning level. The orchestration contract does not treat Max as automatic permission for architecture/product discovery.

If a gate is not execution-ready before activation, ChatGPT creates/completes discovery first. If unexpected discovery appears after activation, Codex uses the routed evidence path.

## Duplicate delivery / publication retry

Suppress duplicate launch for the exact same executable comment according to the existing runner contract. A new post-discovery activation is a new comment/work-order version and is therefore a distinct authorized execution.

Evidence publication must be confirmed from GitHub. Retry publication only; do not reactivate, rerun Codex, or create a correction merely to repair report transport.

## Security

Keep local bridge mechanics/authentication local. Only the human-supplied ChatGPT thread UUID needs to travel in GitHub comments for routing.

Never publish cookies, tokens, credentials, or secret connection material.

## Boundaries

The routing marker is metadata, not cryptographic authentication or product authority. Shared GitHub identity does not prove author role. Role behavior comes from the current workflow contract and independent verification.
