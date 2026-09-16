# Discovery Checkpoints and Return-to-ChatGPT

Discovery is a workflow mode, not a checkpoint number.

CP1 is often a discovery checkpoint because uncertainty is usually highest at the beginning of a feature, but CP1 is not required to be discovery and discovery is not limited to CP1. Any point in the gate plan may contain a discovery checkpoint when product behavior, architecture, ownership, acceptance meaning, or implementation direction must be investigated before deterministic implementation can continue.

## Ownership

**ChatGPT Chat / Pro owns discovery work.** Use Extra High reasoning or the human-selected Pro surface for substantial discovery unless the human explicitly chooses otherwise.

Discovery work may include:

- repository and native-behavior investigation;
- tracing ownership and architectural boundaries;
- comparing plausible implementation paths;
- product/behavior clarification with the human;
- determining the acceptance oracle and non-goals;
- researching external constraints needed for the feature;
- creating or amending the detailed source-of-truth document;
- decomposing the remaining work into implementation checkpoints.

The human/product owner retains final product and architecture authority. A ChatGPT-authored discovery result does not become controlling product truth merely because ChatGPT wrote it. Human approval is required before a new or materially amended source-of-truth is treated as authoritative for downstream implementation.

Codex normally consumes discovery-complete work orders. Do not use a higher Codex reasoning level as a substitute for unresolved product or architecture discovery.

## Planned discovery checkpoints

When material discovery is foreseeable before an implementation checkpoint is activated, create a separate discovery checkpoint in the gate plan before that implementation work.

Use gate type:

```text
discovery
```

A planned discovery checkpoint:

1. is owned/executed by ChatGPT Chat / Pro rather than the Codex implementation launcher;
2. states the questions to resolve, sources to inspect, intended source-of-truth output, non-goals, and completion criteria;
3. may write/update the designated source-of-truth document when the human authorizes repository/document writes;
4. records the resulting source-of-truth commit and downstream gate-plan changes;
5. requires explicit human approval before its product/architecture decisions become controlling for later implementation gates.

Do not publish a Codex activation merely because a discovery item has a CP number.

CP1 is a common example:

```text
Parent feature issue
  -> CP1 discovery (ChatGPT Extra High / Pro)
  -> detailed approved source-of-truth
  -> CP2+ implementation gates
```

But equally valid plans include:

```text
CP1 implementation
CP2 implementation
CP3 discovery
CP4 implementation
```

or any other sequence supported by the feature.

## Execution-readiness test

Before activating a Codex implementation gate, ChatGPT should determine whether it is execution-ready.

An implementation gate is execution-ready when the work order resolves the material questions needed for Codex to implement without making new product/architecture decisions, including as applicable:

- intended behavior and acceptance oracle;
- relevant ownership/service/layer;
- architecture and non-goals;
- primary paths and explicit exclusions;
- public/persistence/authorization semantics;
- acceptance criteria and verification plan.

Repository exploration is still normal implementation work. The gate need not predict every line of code. The boundary is **material discovery**, not ordinary code reading.

If a foreseeable unresolved question would materially affect product behavior, architecture, ownership, or acceptance, do not compensate by selecting Codex Max. Create/complete discovery first.

## Unexpected discovery during Codex implementation

Implementation can reveal facts that were not reasonably foreseeable during gate preparation. When Codex encounters a material unknown that requires discovery rather than ordinary implementation diagnosis, it must stop before making the product/architecture decision itself.

Examples include:

- the supposedly authoritative native paths implement materially different semantics;
- the expected owner is not actually authoritative and choosing a replacement requires architecture judgment;
- the source-of-truth conflicts with current product behavior in a way that requires a product decision;
- acceptance meaning cannot be determined from the frozen case;
- continuing would require selecting among materially different behavioral/architectural approaches.

This is different from a difficult implementation bug. If intended behavior and architecture are already known, Codex should diagnose and repair the implementation under the reasoning policy rather than manufacture a discovery checkpoint merely because debugging is hard.

### Routed discovery-required evidence

Use the existing evidence transport so the established ChatGPT UUID routes the case back to the same conversation without a new protocol.

Codex publishes terminal evidence with the existing first two lines:

```text
<!-- gated-development:codex-evidence:v2 -->
<!-- gated-development:chatgpt-thread:v1 id=<copied exactly from triggering work order> -->
```

The evidence must state:

```text
Submission outcome: DISCOVERY REQUIRED
```

and include:

- active gate and work-order version;
- exact triggering activation/correction;
- current branch/starting/ending SHA and whether any authorized work was already committed/pushed;
- the concrete discovery question(s);
- repository evidence that exposed the unknown;
- why continuing would require a product/architecture/acceptance decision rather than ordinary implementation diagnosis;
- work already completed and verification state;
- affected acceptance criteria/paths;
- explicit confirmation that Codex stopped before inventing the missing decision.

The artifact publication and routing rules remain unchanged. `DISCOVERY REQUIRED` is Not PASS and is not an implementation correction request.

## ChatGPT handling of unexpected discovery

When routed discovery-required evidence arrives, ChatGPT does not begin a normal PASS/correction review. It switches to discovery orchestration:

1. independently fetch the gate, trigger, discovery-required evidence, relevant remote source, and current source-of-truth;
2. preserve the active implementation gate and its history; do not rewrite the frozen gate body;
3. create a linked discovery sub-checkpoint under the active gate, normally named `<Gate>.D<n>` (for example `CP4.D1`), for the material discovery;
4. perform the investigation in ChatGPT Extra High / Pro;
5. create/amend the source-of-truth and downstream plan when appropriate and authorized;
6. obtain explicit human approval for material product/architecture/source-of-truth decisions;
7. decide whether the original implementation gate can validly resume or must be superseded.

The discovery sub-checkpoint is a durable child record, not a hidden chat-only detour.

## Resolution of a discovery sub-checkpoint

### Resume the original implementation gate

The original gate may resume only when the discovery result preserves its objective and can be incorporated without disguising a materially different gate.

Record a durable discovery amendment containing:

- originating implementation gate and discovery sub-checkpoint;
- prior and resulting source-of-truth commit(s);
- resolved questions/decisions;
- whether acceptance criteria, primary paths, exclusions, or verification changed;
- why the original gate objective remains valid;
- explicit human approval reference.

Then publish a **new activation comment using the existing `activation:v1` marker** for the original gate with:

- incremented work-order version;
- the established ChatGPT routing UUID reused unchanged unless the human explicitly replaces it;
- reference to the discovery amendment/sub-checkpoint;
- current controlling source-of-truth commit;
- required resume starting SHA;
- an explicitly selected Codex reasoning effort, normally `medium` for a now execution-ready gate.

The existing activation marker is intentionally reused so current implementation launchers do not need a new resume protocol. This is a reactivation after approved discovery, not a rewrite of the original activation.

Preserve the original review diff base unless the human explicitly supersedes the gate. Review the complete gate range including pre-discovery and post-reactivation work.

### Supersede instead of resume

If discovery materially changes the gate objective, architecture, product behavior, or scope such that the old gate no longer truthfully describes the work, do not stretch a reactivation or correction to cover it.

Mark the old gate superseded and create replacement implementation checkpoint(s) from the approved discovery result. Preserve the old implementation/evidence as history.

## Reasoning-level interaction

Discovery need and Codex reasoning difficulty are different dimensions.

- **Discovery needed:** return to ChatGPT discovery, regardless of whether Codex could theoretically spend more compute guessing.
- **Execution-ready but ordinary implementation:** Codex `medium` normally.
- **Execution-ready with greater implementation/debugging complexity:** Codex `high` or `xhigh` as appropriate.
- **Execution-ready exceptional debugging/reconciliation after lower tiers are inadequate:** Codex `max` may be appropriate.

Max is not the normal escape hatch for missing product knowledge.

## Review after resumed implementation

Once implementation resumes and posts complete evidence, the normal independent ChatGPT review path applies. The reviewer must inspect:

- the original gate and review base;
- pre-discovery implementation work;
- discovery-required evidence;
- child discovery checkpoint and approved amendment/source-of-truth;
- reactivation work order;
- final remote diff and verification.

The same ChatGPT conversation may have performed planning/discovery and later review, but review independence from Codex still requires fresh remote inspection rather than relying on prior chat reasoning or Codex claims.
