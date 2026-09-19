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

## Tiny-repair artifacts

If Codex makes a qualifying tiny repair, artifact metadata must identify:
- original implementation commit;
- repair commit;
- repaired paths;
- reason;
- verification rerun;
- final tested commit.

## Publication

Publication transport:
- uploads/stores the selected redaction-reviewed evidence;
- posts or augments the authored Evidence / Testing record;
- preserves both persistent ChatGPT routing IDs;
- records actual artifact references/digests;
- does not decide the next workflow outcome beyond transporting the worker-authored result.

A publication retry is transport recovery, not another Evidence / Testing round.

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
