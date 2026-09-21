# Gate and Issue Templates

These templates are normative shapes for v3 records. Adapt wording to the actual feature; do not copy placeholders as facts.

### Canonical machine-readable fields

Fields consumed by transport are serialization, not prose. Emit enumerated/token values exactly as plain text, with no Markdown emphasis, backticks, quotes, or trailing punctuation.

Valid examples:
- `- Next round: Implementation`
- `- Outcome: READY FOR EVIDENCE / TESTING`
- `- Outcome: REVIEW READY`

Invalid examples:
- `- Next round: **Implementation**.`
- `- Outcome: **REVIEW READY**`
- `- Outcome: BLOCKED.`

This rule applies to `Next round`, `Outcome`, `Role`, and any other machine-consumed enumerated lifecycle field. Human-facing prose fields may use normal Markdown.

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

Implementation must leave a usable proof surface, not merely a prose testing suggestion. Reuse adequate existing tests; add necessary durable tests/fixtures/observability within the approved scope. Evidence independently checks the mapping. Missing substantial coverage returns to Implementation.

For a newly opted-in strict request, add the real post-commit execution marker defined in [Evidence execution contract](evidence-execution-contract.md), after the existing routing markers. Do not insert an illustrative marker into a real activation, predict the commit SHA inside its own recipe, rewrite an active request, or opt in before compatible tooling is available.

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

### Evidence-ready deliverables
- Durable tests/fixtures/observation paths: <existing and changed paths>
- AC-to-proof map: <each verbatim criterion -> scenario/assertion -> observable result>
- Recipe: <repository-relative path at ending commit; actual SHA-256 when strict>
- Execution inputs: <cwd, command selectors, dependencies, fixture variants, exact constraints>
- Required artifacts: <reports/attachments/package binding; not just success totals>
- Not executed here: <honest environment limitations>

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
- Retained, recovered, fresh, rejected and unresolved proof: <original identities>
- Strict contract/helper and mechanical closure: <actual versions/digests, or legacy mode>
- Semantic coverage assessment: <not inferred from helper success>
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
