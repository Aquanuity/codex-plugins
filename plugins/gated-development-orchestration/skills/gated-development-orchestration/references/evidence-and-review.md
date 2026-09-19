# Evidence and Independent Review Reference

## Separation of proof and judgment

Evidence / Testing and Independent Review are different rounds with different workers.

Evidence / Testing asks:
Can we demonstrate that the implementation works as required?

Independent Review asks:
Did we build the right thing, in the right place, in the intended way, and prove it sufficiently?

Passing tests alone is never checkpoint PASS.

## Evidence / Testing worker

Every Evidence / Testing round starts a fresh Codex session.

The fresh session receives:
- exact checkpoint and authoritative comments;
- exact implementation commit to test;
- acceptance criteria;
- required verification;
- both persistent ChatGPT thread IDs;
- explicit tiny-repair boundary;
- dispatch/round identity.

The session does not inherit authority from a previous Codex conversation.

## Required evidence

Evidence should be proportionate to the checkpoint but may include:
- build result;
- unit/integration tests;
- live AquaTwin/ArcGIS behavior;
- UI interaction;
- E2E;
- screenshots;
- logs;
- output/result snapshots;
- changed-file/diff audit;
- exact acceptance-criterion mapping.

Record exact commands/actions and actual results. Do not report skipped/unavailable proof as PASS.

## Evidence reuse and bounded rerun scope

A fresh Evidence / Testing session means fresh worker context and independent execution authority. It does **not** mean every previously valid verification check must be executed again.

Prior evidence may be retained and reused in a later round only when all of these are true:
- the earlier proof identifies the exact commit, command/action, result, and artifact or durable record needed for independent inspection;
- the worker inspects the delta from the earlier tested commit to the current ending and confirms that no source, dependency, fixture, configuration, environment assumption, or other input relevant to that proof has changed in a way that invalidates it;
- the active checkpoint, implementation handoff, correction, or review record does not explicitly require that check to be executed fresh;
- the proof is sufficiently bound to its inputs and provenance that Independent Review can determine what was actually demonstrated.

If any of those conditions is uncertain, treat the proof as stale, ambiguous, or unbound and rerun the relevant check.

For correction rounds and verification-blocked continuations, execute the smallest sufficient verification set:
- checks affected by the new implementation or tiny-repair delta;
- missing, invalid, stale, ambiguous, or insufficiently bound evidence;
- checks explicitly required fresh by current authority;
- additional regression checks made necessary by failures or material risk exposed by the affected verification.

Do not rerun unaffected expensive suites merely because the Evidence round number changed or because the worker session is fresh.

Every later-round evidence record should distinguish:
- **retained/reused evidence** — identify the earlier round/artifact and explain why it remains applicable;
- **freshly executed evidence** — identify the exact new commands/actions and results;
- **not reused** — identify any prior proof rejected as stale, ambiguous, unbound, or invalid and what replaced it.

## Exact tested commit

Every evidence record identifies the exact commit under test.

If Codex performs a qualifying tiny repair, record:
- implementation commit received;
- tiny-repair commit;
- changed paths;
- reason repair qualified;
- verification rerun;
- final commit submitted for review.

Independent Review then evaluates the full checkpoint through that final commit.

## Tiny repair

Evidence Codex may repair only a directly blocking mechanical defect when the repair is:
- low risk;
- narrowly local;
- no material product behavior decision;
- no architecture/ownership decision;
- no public-contract/persistence/authorization change;
- smallest coherent change;
- followed by rerun.

Examples:
- obvious compile typo;
- missing import/using;
- narrow test-fixture mistake;
- equally small wiring error with unambiguous intended behavior.

If reasonable engineers could debate product/architecture direction, it is not tiny repair.

Substantive repair posts IMPLEMENTATION REQUIRED and returns to the Implementation ChatGPT thread.

## Evidence outcomes

A v3 evidence record uses:

~~~text
<!-- gated-development:evidence:v3 -->
~~~

and one explicit outcome:

- REVIEW READY
- IMPLEMENTATION REQUIRED
- DISCOVERY REQUIRED
- BLOCKED

It propagates both persistent ChatGPT thread IDs.

## Independent Review inputs

Independent Review independently fetches at minimum:
- parent feature;
- top-level checkpoint and relevant sub-checkpoints;
- activation/re-authorization/amendments;
- approved source-of-truth and architecture lock;
- implementation records;
- remote branch/commit;
- complete review-base-to-ending diff;
- evidence record;
- tiny-repair delta if any;
- every acceptance criterion;
- required manual/product-visible verification seam.

Do not accept worker summaries, launcher success, artifact presence, or CI green status as substitutes for the required proof.

## Review scope

Review steps back from the local defect or implementation tactic and looks at the whole checkpoint.

Check:
- intended product behavior;
- placement/ownership/architecture;
- cumulative diff;
- scope creep;
- unintended behavior;
- compatibility/regression risk relevant to the checkpoint;
- evidence sufficiency;
- whether the parent checkpoint is actually human-verifiable as intended.

## Review outcomes

### PASS

Use only when the complete checkpoint claim is satisfied and sufficiently proven.

Only Independent Review may issue PASS.

### correction-required

Use when the checkpoint intent/architecture remains valid but substantive implementation correction is required.

Route to the Implementation ChatGPT thread.

### verification-blocked

Use when implementation may be acceptable but required evidence is missing, invalid, stale, or inconclusive.

Route to a fresh Codex Evidence / Testing round.

The review record must define the smallest bounded continuation that can close the proof gap. Explicitly identify:
- evidence that remains valid and should be retained/reused;
- evidence that is missing, invalid, stale, ambiguous, or insufficiently bound;
- whether each gap can be closed by recovering retained artifacts or requires new execution;
- the specific checks, if any, that must actually be rerun.

Do not request a full verification campaign merely because the next worker is a fresh Codex session. Require broad reruns only when the implementation delta, invalidated provenance, checkpoint contract, or observed failures justify them.

### discovery-required

Use when architecture/source-of-truth/material system behavior is unresolved.

Route to Discovery in the Governance ChatGPT thread.

### definition-required

Use when checkpoint intent/scope/decomposition itself is fundamentally wrong or materially invalidated.

Return to Definition and require human re-authorization before substantive execution.

## Human manual check

A top-level checkpoint must expose a meaningful human-verifiable product state.

Independent Review should identify how the human can manually inspect the checkpoint if desired.

Human manual inspection does not replace required automated/live evidence, and automated evidence does not remove the product-visible checkpoint requirement.
