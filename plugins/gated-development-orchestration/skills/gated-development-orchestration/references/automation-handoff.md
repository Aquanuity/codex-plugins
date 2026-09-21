# Automation Handoff Reference

## v3 transport principle

The runner is deliberately dumb transport.

It reads authoritative GitHub lifecycle records, extracts routing/provenance metadata, dispatches the correct worker, records dispatch identity, and exits.

It does not judge architecture, implementation quality, evidence sufficiency, or PASS.

Lifecycle routing fields are machine-readable serialization. Worker-authored enumerated values must be emitted as the canonical plain token from the GDO template, without Markdown emphasis, backticks, quotes, or trailing punctuation. Example: `- Next round: Implementation`, not `- Next round: **Implementation**.` The same rule applies to `Outcome` and other machine-consumed enum fields.

## 3.1 execution contract (prospective opt-in)

See [Evidence execution contract](evidence-execution-contract.md). A real post-commit recipe marker in a new frozen request selects the strict local helper and compact prompt. Existing requests without that marker retain legacy behavior; malformed/unsupported markers or missing strict prerequisites fail closed. Do not rewrite saved requests or borrow historical thread identities.

The dispatcher still exits after worker startup. The separate local Evidence helper owns test-child lifecycle, attempt records, artifact collection and mechanical closure; it is not the dispatcher and cannot grant PASS. Strict mode uses its machine ledger plus a short worker ACTIVE TASK note, not a duplicate handwritten attempt ledger.

Strict Evidence supplies the narrative, independent coverage assessment, redaction decision and outcome; the execution helper assembles the bundle. `prepare-gdo-v31-publication.mjs` validates it before delegating the existing freeze/queue protocol. AquaTwin's publisher re-fetches the validator from the exact dispatch-runtime repository revision and checks the staged ZIP. No `validated=true` flag replaces raw checks. Partial outcomes remain reportable; REVIEW READY additionally requires mechanical closure.

No new rounds, changed destinations, resumed Evidence sessions, model mandate or automatic product acceptance are introduced. Deployment must be independently validated before strict activation; the plugin version alone is not deployment evidence.

## Persistent routing state

Every dispatchable v3 lifecycle record carries exactly one of each:

~~~text
<!-- gated-development:governance-thread:v1 id=<UUID> -->
<!-- gated-development:implementation-thread:v1 id=<UUID> -->
~~~

The runner reads current routing from GitHub. It must not depend on hidden runner memory for worker destination.

The Governance ID is used for Definition, Discovery, and Independent Review returns.

The Implementation ID is used for substantive implementation/correction returns.

## Round-scoped identities

Every dispatch has a durable dispatch identity, for example:

~~~text
issue-353-cp4c-implementation-r2
~~~

The runner suppresses duplicate delivery of the same dispatch ID.

For publisher-created `evidence:v3` records, downstream dispatch identity is based on the original Evidence publication request ID carried in the publisher receipt, not the resulting GitHub comment ID. If the same Evidence request is accidentally published twice, both comments therefore collapse to the same exactly-once downstream dispatch identity.

Every Evidence / Testing round starts a fresh Codex session. Record its session/run identity for provenance where available, but do not reuse it as persistent routing.

## v3 first-line markers

### Human activation

~~~text
<!-- gated-development:activation:v3 -->
~~~

Destination is determined by the declared next round:
- Implementation -> Implementation ChatGPT thread;
- Discovery -> Governance ChatGPT thread.

Activation is not sent to Codex.

### Implementation record

~~~text
<!-- gated-development:implementation-record:v3 -->
~~~

Typical outcomes:
- READY FOR EVIDENCE / TESTING -> start a fresh Codex session;
- DISCOVERY REQUIRED -> Governance ChatGPT thread;
- DEFINITION REQUIRED -> Governance ChatGPT thread and require human re-authorization before substantive continuation;
- BLOCKED -> Governance thread for triage unless checkpoint-specific transport says otherwise.

### Evidence / Testing record

~~~text
<!-- gated-development:evidence:v3 -->
~~~

Typical outcomes:
- REVIEW READY -> Governance ChatGPT thread for Independent Review;
- IMPLEMENTATION REQUIRED -> Implementation ChatGPT thread;
- DISCOVERY REQUIRED -> Governance ChatGPT thread.

A fresh Codex session authors each evidence record. When automated publication is enabled, the publisher transports the authored record and artifacts to the durable GitHub ledger; Codex does not bypass that publication path. Manual/direct publication is used only when the active checkpoint explicitly authorizes it.

### Independent review records

~~~text
<!-- gated-development:review:v3 status=correction-required -->
<!-- gated-development:review:v3 status=verification-blocked -->
<!-- gated-development:review:v3 status=discovery-required -->
<!-- gated-development:review:v3 status=definition-required -->
<!-- gated-development:review:v3 status=pass -->
~~~

Routing:
- correction-required -> Implementation ChatGPT thread;
- verification-blocked -> fresh Codex Evidence / Testing session;
- discovery-required -> Governance ChatGPT thread;
- definition-required -> Governance ChatGPT thread; human re-authorization required before execution;
- pass -> ledger only, no worker dispatch.

## Why v3 markers are new

Do not reuse v2 executable first-line markers for new v3 work.

The existing v2 AquaTwin automation sends activation:v1 and correction-required review:v2 to Codex implementation. GDO v3 changes worker ownership, so distinct markers are required to fail closed until transport is migrated.

Historical v2 records remain historical.

## ChatGPT dispatch contract

The local ChatGPT bridge receives:
- target thread ID;
- compact message identifying issue/checkpoint/comment/round/dispatch ID;
- instruction to resolve current GDO source;
- instruction to fetch GitHub authority fresh;
- no copied worker summary treated as proof.

The bridge must support arbitrary authorized target UUIDs rather than one hard-coded thread.

Implementation dispatch goes only to the Implementation thread ID.

Governance/review/discovery dispatch goes only to the Governance thread ID.

## Codex Evidence / Testing dispatch contract

Each Evidence / Testing dispatch starts a new Codex session with:
- exact checkpoint issue/comment;
- exact commit to test;
- acceptance criteria and required verification source;
- explicit tiny-repair boundary;
- both persistent ChatGPT routing IDs for the resulting record;
- dispatch ID;
- deterministic publication-helper location/instructions when automated publication is enabled;
- instruction to create and maintain a closure ledger before expensive execution;
- instruction to perform a fresh authority/ledger closure audit before selecting an outcome;
- instruction to author evidence, publish through the helper/publisher path, and stop.

Do not resume a previous Codex session for a new Evidence / Testing round.

Fresh session means fresh worker context, not mandatory re-execution of every earlier valid check. Apply the canonical evidence-reuse and bounded-rerun rules from evidence-and-review.md and the latest authoritative lifecycle record. Reuse only proof whose inputs and provenance remain valid; execute only affected, missing, invalid, stale, ambiguous, explicitly-fresh, or otherwise non-reusable verification.

The Evidence worker must externalize completion state in its closure ledger rather than relying on conversation memory. Before every expensive action it identifies the ledger item being closed; after the action it records the result and secures the required artifacts before moving on. Before `REVIEW READY`, it re-fetches authority and verifies every mandatory ledger item is actually satisfied.

When automated publication is enabled, Codex must not hand-author `evidence.md` transport headers or `ready.json`. It authors the evidence body and, in legacy mode, the review bundle (strict mode uses helper assembly), chooses one allowed Evidence outcome, completes redaction review, and invokes the deterministic publication helper. The helper derives routing from the frozen request, serializes the canonical record, computes digests, validates locally, and queues the publisher. The publisher remains the only component that posts the durable `evidence:v3` GitHub comment.

The helper also owns publication state. It freezes the selected bytes/outcome, records a queue attempt before the external queue call, records queue acknowledgement on success, and treats queued/published state as terminal for the Evidence worker. Codex must never invoke `gdo-v3-artifact-publish.yml` directly. An uncertain queue attempt is reconciled, not blindly repeated.

## Tiny-repair routing

Codex may keep the round internal only for a qualifying tiny repair.

After tiny repair:
- record original tested commit;
- record repair commit;
- rerun affected verification;
- Independent Review sees the full delta.

If repair is substantive, Codex posts IMPLEMENTATION REQUIRED and stops.

## Discovery routing

Any worker may identify material Discovery need.

Implementation -> Governance thread.
Evidence / Testing -> Governance thread.
Independent Review -> remains Governance thread context but still posts the discovery-required ledger record.

Discovery results may:
- resume Implementation;
- go to Independent Review if discovery itself is the checkpoint deliverable;
- return to Definition when expected direction materially changes.

## Definition routing

Definition is human/governance work.

A material Definition change after activation requires a human re-authorization record before a new executable dispatch.

## Thread rebind transport

Use:

~~~text
<!-- gated-development:thread-rebind:v3 -->
~~~

Record previous/new ID, role, reason, and human authorization.

The runner uses the latest valid rebind prospectively.

## Security and durability

Never publish cookies, tokens, private app credentials, or named-pipe secrets.

Repository-backed transport code is preferred over machine-only scripts.

Machine-local state should contain only secrets, runtime receipts, and environment-specific configuration that cannot safely live in git.

A fresh machine should be recoverable from repository code plus documented authentication/setup.
