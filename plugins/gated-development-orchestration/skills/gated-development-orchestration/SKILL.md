---
name: gated-development-orchestration
description: Compatibility entrypoint for GDO. Routes current work to the lean GDO workflow core plus exactly one active role skill.
compatibility: Preserves the historical skill URL. Do not treat this shim or the old references directory as a second normative v4 workflow.
metadata:
  version: "4.1.0"
  workflow: "github-gated-development-v3"
---

# GDO Compatibility Entrypoint

This path is retained so old links and installed references do not break.

For current GDO work:
1. resolve the package snapshot once;
2. load `../gdo-workflow/SKILL.md`;
3. identify the active round/role from the human instruction and authoritative lifecycle trigger;
4. load exactly one matching role:
   - Definition -> `../gdo-definition/SKILL.md`
   - Discovery -> `../gdo-discovery/SKILL.md`
   - Implementation -> `../gdo-implementation/SKILL.md`
   - Evidence / Testing -> `../gdo-evidence/SKILL.md`
   - Independent Review -> `../gdo-independent-review/SKILL.md`
5. load only conditional references required by that role/mode.

Do not recursively load this directory's historical `references/` set for new v4 work. Those files remain available to interpret frozen v3-era records and provenance.

Governance Triage loads the workflow core first and classifies the BLOCKED return; it is not a sixth round and cannot PASS. GDO 4.1 also permits a non-dispatch Human TAKEOVER of Definition, Discovery, Implementation, or Evidence / Testing; load the core for its actor semantics and never treat takeover as a contract amendment.

If role is unknown or contradictory, report the routing ambiguity rather than guessing.
