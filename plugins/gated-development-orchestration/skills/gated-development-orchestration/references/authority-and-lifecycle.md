# Authority and Lifecycle Reference

## Authority order

The human/product owner retains product authority.

For a checkpoint, authority normally resolves in this order:
1. explicit current human instruction;
2. activated checkpoint contract and approved amendments;
3. approved source-of-truth / architecture-lock artifacts;
4. accepted predecessor checkpoints;
5. current repository/native behavior where not superseded;
6. worker interpretation.

Worker thread/session memory never outranks GitHub-authoritative records. Ordinary ChatGPT workers must also inspect their current connected capabilities before declaring an authorized operation unavailable; see chatgpt-capabilities.md.

## Worker authority

### Governance ChatGPT thread

Owns Definition, Discovery, and Independent Review.

It may:
- shape parent/checkpoints;
- investigate source/native behavior;
- create/amend source-of-truth;
- create architecture-lock artifacts;
- author activation/re-authorization records;
- independently review implementation/evidence;
- route the next round.

It must not use governance/review authority to silently perform the substantive implementation it will later judge.

### Implementation ChatGPT thread

Owns substantive product implementation and substantial correction.

It may:
- edit production/test/docs within checkpoint authority;
- commit/push when authorized;
- perform ordinary implementation reasoning under locked architecture;
- report discovered uncertainty;
- hand off an exact ending commit.

It must not:
- redefine product intent;
- rewrite architecture authority to fit its code;
- issue PASS;
- treat its own tests as independent acceptance.

Implementation must also leave necessary durable tests, fixtures, observations, the original AC-to-proof map and a runnable verification recipe evidence-ready. Missing runtime/test execution access is disclosed, but missing local shell/worktree access alone is not an implementation blocker when authorized GitHub repository-write capability is available. Implementation does not approve its own coverage or dictate acceptance. See chatgpt-capabilities.md and evidence-execution-contract.md.

### Evidence / Testing Codex

Each Evidence / Testing round starts a fresh Codex session.

It may:
- run required build/test/live/E2E verification;
- collect durable evidence;
- inspect the exact implementation commit;
- make tightly bounded tiny repair and rerun affected checks.

It must not:
- perform substantive implementation;
- decide material product/architecture questions;
- issue PASS;
- reuse a prior Codex session as the next evidence worker.

Evidence is primarily independent execution/proof, not substantive test authoring. A missing/materially inadequate durable test returns IMPLEMENTATION REQUIRED; a material question about the expected behavior returns DISCOVERY REQUIRED. Recipe/helper checks never outrank GitHub authority or replace semantic review. Tiny mechanical repair remains allowed under the existing boundary.

### Independent Review

Independent Review is performed in the Governance ChatGPT thread but is independent from the Implementation ChatGPT thread and fresh Codex evidence session.

It independently fetches the authoritative case and remote repository state before deciding an outcome.

## Checkpoint lifecycle

Conceptual lifecycle:

~~~text
DRAFT
  -> READY
  -> ACTIVATED
  -> active rounds
  -> UNDER_REVIEW
       -> PASS
       -> CORRECTION_REQUIRED -> Implementation
       -> VERIFICATION_BLOCKED -> Evidence / Testing
       -> DISCOVERY_REQUIRED -> Discovery
       -> DEFINITION_REQUIRED -> Definition + human re-authorization
~~~

A checkpoint can also be CANCELLED or SUPERSEDED by authorized human/governance action.

## Activation

Activation is a human authority event, not merely a transport message.

It approves the current:
- intent;
- scope;
- authoritative inputs;
- acceptance criteria;
- verification expectations;
- worker routing;
- next executable round.

For v3, both persistent ChatGPT thread IDs must be established before an executable activation.

## Amendments

Do not silently rewrite an activated checkpoint.

Non-material clarification may be recorded without reopening product intent when it does not alter the contract.

Material changes to intent, scope, architecture, acceptance meaning, or checkpoint decomposition require a Definition return and explicit human re-authorization before execution resumes.

## Review-base and history

Preserve the original checkpoint review base through ordinary implementation corrections and Evidence / Testing reruns.

When a tiny Codex repair occurs, Independent Review evaluates the full checkpoint range plus the repair delta.

If Definition materially replaces the checkpoint objective, supersede or re-authorize truthfully rather than disguising a new objective as a correction.

## Thread authority

Routing markers identify worker destinations only.

They do not:
- activate work;
- widen scope;
- prove identity beyond the surrounding authorized transport checks;
- validate evidence;
- issue PASS.

The persistent routing markers are:

~~~text
<!-- gated-development:governance-thread:v1 id=<UUID> -->
<!-- gated-development:implementation-thread:v1 id=<UUID> -->
~~~

Every v3 lifecycle record that may lead to another worker dispatch propagates both markers.

## Thread rebind

A persistent ChatGPT thread may be replaced because of context rollover, loss, or deliberate reset.

Use a durable thread-rebind record containing:
- role: governance or implementation;
- previous thread ID;
- new thread ID;
- reason;
- human authorization;
- effective point.

The new ID applies prospectively. Do not edit earlier records.

Thread rebind is routing metadata and does not by itself require checkpoint re-authorization unless product authority also changed.

## Completion

Implementation complete is not checkpoint complete.

Evidence complete is not checkpoint complete.

Only Independent Review may issue PASS after checking the full checkpoint claim.
