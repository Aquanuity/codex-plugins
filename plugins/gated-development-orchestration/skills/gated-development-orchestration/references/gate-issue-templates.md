# Gate and Issue Templates

These templates are normative shapes for v3 records. Adapt wording to the actual feature; do not copy placeholders as facts.

## Parent feature

~~~markdown
# <Feature>

## Product intent
<what the user/product should gain>

## Architecture / constraints
<known constraints and important non-goals>

## Human-verifiable checkpoint plan
- CP1 — <meaningful product state>
- CP2 — <meaningful product state>
- CP3 — <meaningful product state>

## Source-of-truth
<document/location or discovery plan>
~~~

Top-level checkpoints must be product milestones, not class/file/layer milestones.

## Top-level checkpoint

~~~markdown
<!-- gated-development:checkpoint:v3 -->
# <CP ID> — <human-verifiable product milestone>

## Intent
<what becomes true for the product>

## Human verification seam
<what the human can inspect/exercise in UI/product>

## Scope
IN:
- ...

OUT:
- ...

## Authoritative inputs
- Parent: ...
- Source-of-truth: ...
- Architecture lock: ...
- Accepted predecessors: ...

## Acceptance criteria
- AC-1 — ...
- AC-2 — ...

## Verification expectations
- ...

## Engineering decomposition
- CPxA — ...
- CPxB — ...
<only when useful>
~~~

## Activation

Use distinct v3 marker; do not reuse activation:v1.

~~~markdown
<!-- gated-development:activation:v3 -->
<!-- gated-development:governance-thread:v1 id=<UUID> -->
<!-- gated-development:implementation-thread:v1 id=<UUID> -->
## Checkpoint activation

- Checkpoint: <ID>
- Work-order version: <n>
- Next round: <Discovery | Implementation>
- Round number: <n>
- Dispatch ID: <stable id>
- Human authorization: <explicit reference>
- Starting SHA / branch: <when applicable>
- Approved source-of-truth: <ref>
- Verification contract: <ref>

This activation authorizes the current checkpoint contract for the declared next round.
~~~

Both persistent ChatGPT IDs are required before executable activation.

## Implementation record

~~~markdown
<!-- gated-development:implementation-record:v3 -->
<!-- gated-development:governance-thread:v1 id=<UUID> -->
<!-- gated-development:implementation-thread:v1 id=<UUID> -->
## Implementation Round <n>

- Checkpoint: <ID>
- Sub-checkpoint: <optional>
- Dispatch ID: <id>
- Starting commit: <sha>
- Ending commit: <sha>
- Branch: <branch>
- Changed paths: ...
- Acceptance criteria implemented: ...
- Known limitations: ...
- Outcome: <READY FOR EVIDENCE / TESTING | DISCOVERY REQUIRED | DEFINITION REQUIRED | BLOCKED>
- Requested next round: <...>

### Implementation summary
...

### Verification performed during implementation
<supporting only; not independent evidence>

### Required Evidence / Testing continuation
Retain/reuse:
- <specific still-valid proof that must not be rerun merely because the session is fresh>

Fresh execution required:
- E<n>-1 — <exact action> -> required proof: <artifact/result/provenance>
- E<n>-2 — ...

Execution constraints:
- <timeouts/retries/fixtures/environment/renderer requirements that must not drift>

Closure condition:
- REVIEW READY only when every listed fresh requirement is satisfied with the named proof and the original acceptance criteria remain fully mapped.
~~~

## Evidence / Testing record

~~~markdown
<!-- gated-development:evidence:v3 -->
<!-- gated-development:governance-thread:v1 id=<UUID> -->
<!-- gated-development:implementation-thread:v1 id=<UUID> -->
## Evidence / Testing Round <n>

- Checkpoint: <ID>
- Dispatch ID: <id>
- Fresh Codex session/run: <id when available>
- Implementation commit received: <sha>
- Final tested commit: <sha>
- Tiny repair: <none | exact repair commit and justification>
- Outcome: <REVIEW READY | IMPLEMENTATION REQUIRED | DISCOVERY REQUIRED | BLOCKED>

### Verification
- AC-1: ...
- AC-2: ...

### Evidence
...
~~~

## Independent Review — correction

~~~markdown
<!-- gated-development:review:v3 status=correction-required -->
<!-- gated-development:governance-thread:v1 id=<UUID> -->
<!-- gated-development:implementation-thread:v1 id=<UUID> -->
## Independent Review Round <n> — correction required

- Checkpoint: <ID>
- Reviewed ending commit: <sha>
- Dispatch ID for next implementation round: <id>

### Findings
1. ...

### Required correction
- ...

### Required verification after correction
- ...
~~~

## Independent Review — verification blocked

~~~markdown
<!-- gated-development:review:v3 status=verification-blocked -->
<!-- gated-development:governance-thread:v1 id=<UUID> -->
<!-- gated-development:implementation-thread:v1 id=<UUID> -->
## Independent Review Round <n> — verification blocked

- Checkpoint: <ID>
- Commit requiring evidence: <sha>
- Dispatch ID for next fresh Evidence / Testing round: <id>

### Retain/reuse without rerunning
- <specific artifact-bound proof that remains valid>

### Missing/invalid proof and bounded closure ledger
- E<n>-1 — <missing/invalid item> -> required proof: <exact artifact/result/provenance>
- E<n>-2 — ...

### Execution constraints
- <timeouts/retries/fixtures/environment/renderer requirements that must not drift>

### Closure condition
- The next Evidence worker must create its round-local closure ledger from these IDs, secure each required proof before moving on, and may use REVIEW READY only when every mandatory item is satisfied.
~~~

## Independent Review — discovery required

~~~markdown
<!-- gated-development:review:v3 status=discovery-required -->
<!-- gated-development:governance-thread:v1 id=<UUID> -->
<!-- gated-development:implementation-thread:v1 id=<UUID> -->
## Independent Review Round <n> — discovery required

### Material unknown
...

### Discovery questions
- ...
~~~

## Independent Review — definition required

~~~markdown
<!-- gated-development:review:v3 status=definition-required -->
<!-- gated-development:governance-thread:v1 id=<UUID> -->
<!-- gated-development:implementation-thread:v1 id=<UUID> -->
## Independent Review Round <n> — definition required

### Why current checkpoint intent/scope is no longer valid
...

Substantive execution remains stopped pending human re-authorization.
~~~

## PASS

~~~markdown
<!-- gated-development:review:v3 status=pass -->
<!-- gated-development:governance-thread:v1 id=<UUID> -->
<!-- gated-development:implementation-thread:v1 id=<UUID> -->
## Independent Review Round <n> — PASS

- Checkpoint: <ID>
- Accepted ending commit: <sha>
- Human-verifiable product seam: <what can be manually checked>
- Evidence summary: ...
~~~

## Thread rebind

~~~markdown
<!-- gated-development:thread-rebind:v3 -->
<!-- gated-development:governance-thread:v1 id=<current governance UUID> -->
<!-- gated-development:implementation-thread:v1 id=<current implementation UUID> -->
## Thread rebind

- Role: <governance | implementation>
- Previous thread ID: <UUID>
- New thread ID: <UUID>
- Reason: <context rollover/loss/reset>
- Human authorization: <reference>
- Effective after: <comment/id>
~~~

After rebind, propagate the new pair prospectively.

## Routing rules

- Every dispatchable v3 record carries both persistent ChatGPT thread markers.
- Never place two markers for the same role in one record.
- Never infer a missing UUID from an unrelated checkpoint.
- Thread IDs are metadata, not activation or acceptance authority.
- Every fresh Evidence / Testing round gets a new Codex session; Codex session IDs do not replace either persistent ChatGPT ID.
