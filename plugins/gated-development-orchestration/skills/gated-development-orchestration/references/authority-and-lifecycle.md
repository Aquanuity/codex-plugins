# Authority and Lifecycle Reference

Use when defining feature/gate authority, discovery checkpoints, source-of-truth approval, activation/reactivation, corrections, routing metadata, runtime effort, blocker/discovery return, plugin authority, incidental repair, or acceptance.

## Artifact authority

| Artifact | Authority |
|---|---|
| Human/product-owner decisions | Final product intent, architecture choices, discovery approval, activation/cancellation, destination changes, and explicit overrides |
| Source-of-truth document at an approved commit | Feature meaning, behavior, architecture, ownership, non-goals, and downstream checkpoint meaning |
| Parent issue | Overall feature tracking and checkpoint topology |
| Discovery checkpoint/sub-checkpoint | Investigation questions, findings, proposed source-of-truth changes, and downstream decomposition; does not become product authority until human-approved where material |
| Frozen implementation/documentation gate body | Initial product/repository work order for that implementation slice |
| Activation/reactivation comment | Codex execution authorization/trigger for the current work-order version; establishes/reuses the ChatGPT route and carries explicit reasoning effort |
| Correction-required comment | Independent failed-review decision plus narrow correction authorization/trigger; reuses the gate route and carries explicit reasoning effort |
| Discovery amendment record | Human-approved durable record connecting a discovery sub-checkpoint to an active gate and any new controlling source-of-truth commit |
| Current `gated-development-orchestration@aquanuity` contract | Current workflow mechanics for orchestration, discovery, implementation, evidence, correction, return routing, and review |
| Commits and full gate diff | Actual repository implementation truth |
| Codex evidence/blocker | Implementer report; never acceptance |
| `DISCOVERY REQUIRED` Codex evidence | Routed request for ChatGPT discovery orchestration; Not PASS and not itself a product decision |
| Independent implementation review | PASS, correction-required, verification-blocked |
| Launcher records | Delivery/runtime facts only |
| Artifact bundle/publisher receipt | Supporting execution bytes/publication identity; never independent acceptance |
| ChatGPT thread routing marker | Human-supplied at initial activation and reused through the gate; transport destination only |
| Chat discussion | Discussion/proposed decisions until written to the appropriate durable record and human-approved when required |

## Workflow source and version

The workflow identity is `gated-development-orchestration@aquanuity`.

Use the shared current contract from the execution-surface rules in `SKILL.md`: Codex uses its currently installed plugin; ordinary ChatGPT Chat / Pro loads the current repository package.

Do not freeze a plugin version, marketplace SHA, package commit, or historical skill URL into a product gate. Historical workflow versions are provenance only. Product source commits, gate scope, branch/baseline, acceptance criteria, and prior history remain authoritative according to the case.

## Discovery authority

Discovery is a gate mode, not a checkpoint number. CP1 is commonly discovery but has no exclusive discovery status.

A discovery checkpoint may occur anywhere when unresolved product behavior, architecture, ownership, acceptance meaning, or implementation direction must be investigated before deterministic implementation can continue.

ChatGPT Chat / Pro normally executes discovery. The human/product owner retains final product and architecture authority.

Material discovery conclusions must not silently become controlling source-of-truth. When discovery creates or materially amends product/architecture truth, record the resulting commit/decision and obtain explicit human approval before downstream implementation gates depend on it.

See `discovery-checkpoints.md` for planned discovery, unexpected discovery, child discovery checkpoints, and resume/supersede rules.

## Gate types

### `discovery`

ChatGPT-owned investigation/research/source-of-truth checkpoint. May perform authorized document/repository writes needed to produce the approved discovery result. Does not launch Codex merely because it is a checkpoint.

Typical output: approved source-of-truth document/commit plus downstream checkpoint plan.

### `implementation`

Codex executes an execution-ready bounded implementation work order after human activation. Ends in remotely reviewable implementation evidence and independent ChatGPT review.

### `documentation`

Codex may execute bounded documentation work when the task is deterministic and implementation-like. If the documentation is itself discovery/source-of-truth architecture work, use `discovery` instead.

### `analysis-only`

No repository writes, commits, or pushes. Used for bounded analysis that is not creating/amending authoritative source-of-truth.

## Execution-readiness authority

Before a Codex implementation gate is activated, ChatGPT determines whether material discovery has been resolved sufficiently for deterministic implementation.

A gate need not specify every line of code. Codex still reads the repository and performs ordinary implementation reasoning. The dividing line is whether Codex would need to make a new material product/architecture/ownership/acceptance decision.

If such a decision is foreseeably unresolved, create/complete discovery first instead of selecting Max.

## Routing authority

The thread marker:

```text
<!-- gated-development:chatgpt-thread:v1 id=<UUID> -->
```

identifies the ChatGPT return destination. It does not activate a gate, broaden scope, establish evidence validity, or issue PASS.

The human supplies the UUID on the first Codex activation for a gate. Subsequent corrections/reactivations reuse the established route unless the human explicitly supplies a replacement. Evidence copies the exact triggering marker.

Missing/conflicting routing is fail-closed. Recover from the applicable activation/correction/reactivation chain or ask the human; never invent or borrow a destination.

## Runtime reasoning authority

For current Codex work, the executable comment carries exactly one:

```text
- Execution reasoning effort: `<minimal|low|medium|high|xhigh|max>`
```

The normal implementation default is `medium`. `high`, `xhigh`, and `max` are technical-execution escalations under `model-selection.md`; discovery need is routed back to ChatGPT instead of being treated as a Codex reasoning tier.

Rules:

- current activations/reactivations/corrections explicitly state the field;
- effort applies only to that execution round;
- later rounds re-select it independently;
- changing effort changes no product/repository authority;
- duplicate/unsupported values are malformed delivery;
- historical comments without the field may still use the launcher's legacy `max` fallback for backward compatibility.

## Activation and reactivation

### Initial activation

A valid implementation/documentation activation:

- references the frozen gate/body as required by the case;
- contains exactly one valid ChatGPT thread marker;
- contains exactly one explicit Codex reasoning effort;
- authorizes that work-order version and triggers Codex.

### Reactivation after discovery

When surprise discovery interrupts an active gate and the approved discovery result preserves the original gate objective, ChatGPT may reactivate the same gate using a **new `activation:v1` comment** rather than editing the original gate/activation.

The reactivation must include:

- incremented work-order version;
- same established ChatGPT route unless explicitly changed by the human;
- discovery sub-checkpoint/amendment reference;
- currently approved source-of-truth commit;
- required resume starting SHA;
- explicit Codex reasoning effort, normally `medium` after discovery makes the work execution-ready.

Reactivation does not erase pre-discovery work. Preserve the original gate review diff base for final review unless the gate is superseded.

If discovery materially changes the gate objective/architecture/product scope such that the old gate no longer truthfully describes the work, do not reactivate it; supersede and create replacement gate(s).

## Freezing and amendments

Implementation/documentation gate bodies become frozen when activated according to the case. Preserve old comments and bodies.

Do not rewrite a frozen gate because discovery later changes understanding. Use a linked discovery sub-checkpoint plus a durable discovery amendment record.

A discovery amendment should identify:

- originating gate;
- discovery child checkpoint;
- prior/new source-of-truth commit;
- resolved decisions;
- any affected paths/criteria/verification;
- why resume is valid or why supersession is required;
- explicit human approval when material product/architecture truth changed.

## Primary paths and bounded incidental repair

For implementation/documentation gates, the listed paths are the primary authorized boundary, not an automatic stop for every omitted file.

Codex may make a minimal adjacent off-list repair in the same execution only when every bounded incidental-repair condition in `SKILL.md` holds: directly necessary to verify active work, introduced/exposed by that work, mechanical/low-risk, smallest coherent change, no semantic/architecture/public-contract/dependency/policy expansion, no protected-path violation, and meaningful re-verification.

An off-list repair does not authorize discovery or product decisions. If the needed change exposes a material product/architecture unknown, use the discovery-required path instead.

## Verification failures and blocker authority

A failed build/test/check is development feedback, not automatically a blocker.

Codex owns first-line diagnosis:

- **implementation defect within primary paths** -> fix and rerun;
- **qualifying bounded incidental repair** -> record diagnosis, repair, rerun, disclose;
- **execution-only difficult diagnosis** -> continue under the selected reasoning level and report a true blocker only when no authorized resolution exists;
- **material discovery required** -> stop before inventing the decision and publish routed `DISCOVERY REQUIRED` evidence;
- **true blocker** -> preserve work and report the exact unauthorized/unavailable condition.

A prerequisite build failure may pause dependent tests; it does not stop the implementation session when an authorized repair remains available.

## Discovery-required state

Unexpected material discovery during Codex execution changes the active gate from normal implementation progress to a discovery hold.

Conceptual state:

```text
ACTIVATED -> IN_PROGRESS
                |
                +-> DISCOVERY_REQUIRED
                       |
                       +-> linked <Gate>.D<n> discovery (ChatGPT)
                               |
                               +-> human-approved discovery resolution
                                      |
                                      +-> REACTIVATED -> IN_PROGRESS
                                      OR
                                      +-> SUPERSEDED -> replacement gate(s)
```

Codex communicates this using routed `codex-evidence:v2` with `Submission outcome: DISCOVERY REQUIRED`, not by silently escalating to Max.

## Normal implementation state model

```text
DRAFT -> READY -> ACTIVATED -> IN_PROGRESS -> EVIDENCE_POSTED -> UNDER_REVIEW
                                                               |
                                   +---------------------------+------------------+
                                   |                           |                  |
                         CORRECTION_REQUIRED                  PASS       VERIFICATION_BLOCKED
                                   |
                              IN_PROGRESS
```

Discovery gates have their own ChatGPT/human approval path and do not require Codex activation.

SUPERSEDED and CANCELLED may occur through authorized state records.

## Correction invariants

Keep the original gate review base fixed through ordinary corrections and valid post-discovery reactivation.

A correction starts from the reviewed prior ending SHA/baseline and authorizes only the bounded repair. It carries the established gate route and its own explicitly selected reasoning effort, normally `medium` when the finding is well specified.

If an independent review finding itself requires material product/architecture discovery, do not disguise that as a Max correction. Create discovery first, then issue a corrected/reactivated execution-ready work order.

## Discovery result versus independent review

Discovery work and implementation review are different functions.

ChatGPT may perform discovery/planning and later review Codex implementation in the same conversation. Review independence means independence from the implementing Codex result: fetch the remote case/diff/evidence fresh and do not accept Codex claims or prior chat assumptions as proof.

The human remains the approval authority for material discovery/source-of-truth decisions. A ChatGPT discovery agent should not self-approve new product intent simply because it generated the proposal.

## Evidence publication and storage

Generated logs/reports remain execution artifacts, not default repository deliverables. Follow `execution-artifacts.md` for publication, redaction, bundle identity, artifact retention, retry, and on-demand inspection.

Publication transport failure is not a reason to rerun implementation or discovery. Queued/uploaded evidence is not PASS.
