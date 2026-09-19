# Automation Handoff Reference

## v3 transport principle

The runner is deliberately dumb transport.

It reads authoritative GitHub lifecycle records, extracts routing/provenance metadata, dispatches the correct worker, records dispatch identity, and exits.

It does not judge architecture, implementation quality, evidence sufficiency, or PASS.

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

A fresh Codex session posts each evidence record.

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
- instruction to post evidence and stop.

Do not resume a previous Codex session for a new Evidence / Testing round.

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
