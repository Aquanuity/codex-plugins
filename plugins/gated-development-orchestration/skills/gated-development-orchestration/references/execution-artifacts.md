# Execution Artifacts and Publication Reference

## Principle

Execution artifacts support Evidence / Testing and Independent Review. They are not checkpoint authority and are not PASS.

Keep generated logs, screenshots, bundles, and runtime reports outside git unless the checkpoint explicitly requires a repository deliverable.

## v3 producer

The normal artifact producer is the fresh Codex Evidence / Testing session.

Implementation may produce supporting build/test output, but Independent Review should treat the dedicated Evidence / Testing record as the normal proof package for product-code checkpoints.

## Artifact identity

Bind evidence to:
- repository;
- checkpoint;
- Evidence / Testing round number;
- dispatch ID;
- implementation commit received;
- final tested commit;
- Codex session/run identity when available;
- artifact digest/immutable identifier when publication provides one.

Do not reuse an artifact from another round as if it were fresh evidence.

For repeated executions, establish unique output/report locations before launch and preserve/hash the required artifacts from each completed attempt before starting the next attempt. A later run must never overwrite the only copy of an earlier run's required proof.

## Tiny-repair artifacts

If Codex makes a qualifying tiny repair, artifact metadata must identify:
- original implementation commit;
- repair commit;
- repaired paths;
- reason;
- verification rerun;
- final tested commit.

## Publication

The Evidence worker owns:
- evidence substance and acceptance-criterion mapping;
- selection of required proof; for strict 3.1 requests the helper assembles the bundle from validated records;
- redaction review;
- the v3 Evidence outcome.

Deterministic publication preparation owns:
- the `evidence:v3` first-line marker;
- both persistent ChatGPT routing markers copied from the frozen dispatch request;
- canonical `- Outcome:` serialization from the worker-selected outcome;
- SHA-256 digests;
- `ready.json` schema/identity fields;
- local structural preflight;
- queueing the publisher after successful preparation.

Codex authors a body-only evidence file. For historical/manual execution it also assembles the review bundle; for opted-in 3.1 execution the helper assembles it, preserving original reporters, body/path attachments, package bytes and mappings. It must not manually construct or edit generated `evidence.md` / `ready.json` transport metadata after deterministic preparation.

Publication transport then:
- uploads/stores the selected redaction-reviewed evidence;
- posts or augments the authored Evidence / Testing record;
- preserves both persistent ChatGPT routing IDs;
- records actual artifact references/digests;
- does not decide the next workflow outcome beyond transporting the worker-authored result.

The publisher remains strict and independently validates the generated package before upload/posting. Do not weaken publisher validation to accommodate malformed worker output.

Publication state is one-way:

~~~text
evidence body + review bundle
  -> frozen publication identity
  -> queue-attempt claim
  -> queue acknowledgement
  -> published terminal receipt
~~~

After queue acknowledgement, the Evidence worker stops. It may not continue execution, change evidence bytes/outcome, or issue another publisher workflow request.

A queue-attempt claim without acknowledgement is ambiguous external-write state and requires reconciliation before any retry.

A terminal local publication receipt prevents automatic republication even if the matching GitHub comment later disappears. Missing/deleted durable ledger content requires manual reconciliation, not a second Evidence publication.

A publication retry is transport recovery, not another Evidence / Testing round, and must reuse the same frozen request/outcome/digests.

## Strict 3.1 execution artifacts

Read evidence-execution-contract.md for the canonical schema and rollout. The helper owns attempt receipts and the content-addressed inventory. Never hand-edit them. The preparation adapter validates the final ZIP before freezing; the publisher fetches the exact dispatch-runtime validator and revalidates staged bytes. Mechanical closure cannot issue PASS. Original attempt identities survive recovery; legacy proof is not relabelled as freshly executed strict proof. Missing/unsupported strict tooling never silently falls back. Partial blocked/correction/discovery publication remains possible with truthful unresolved items.

## Redaction

Never publish:
- tokens;
- cookies;
- credentials;
- complete user profiles;
- private client data not required for review;
- local app authentication material;
- named-pipe secrets/runtime internals that provide access.

Include only proof needed for the checkpoint.

## Review behavior

Independent Review reads concise evidence first and retrieves raw artifacts only when needed for a material claim or required acceptance check.

Artifact presence is not proof by itself.

Missing essential evidence results in verification-blocked, not PASS.

## Retention

Retain artifacts long enough for independent review and reasonable correction cycles.

Repository/organization retention policy may expire old artifacts. Preserve the durable GitHub evidence record with enough identity to distinguish what was actually reviewed.

## Runner recovery

Critical transport/publication code should be repository-backed.

A self-hosted runner rebuild should require only:
- repository checkout/download;
- documented prerequisites;
- authentication/secrets;
- environment-specific runtime configuration.

Do not make an unrecoverable machine-only script part of the workflow contract.
