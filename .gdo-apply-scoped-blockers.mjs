// One-time branch migration. Removed before merge; not shipped as runtime behavior.
import fs from 'node:fs';
import path from 'node:path';
import {createHash} from 'node:crypto';
const root='plugins/gated-development-orchestration';
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const write=(p,s)=>fs.writeFileSync(path.join(root,p),s);
function replace(p,a,b){const s=read(p);if(s.split(a).length!==2)throw new Error('Expected exactly one anchor in '+p+': '+a.slice(0,70));write(p,s.replace(a,b));}
const corePath='skills/gdo-workflow/SKILL.md';
const original=read(corePath),blob=createHash('sha1').update('blob '+Buffer.byteLength(original)+'\0'+original).digest('hex');
if(blob!=='1071217bc3b13f94be3896ee3f45207cb3aa468b')throw new Error('Workflow core changed from reviewed baseline; reconcile, do not overwrite');
let load=JSON.parse(read('load-contract.json'));
const version='4.7.4';
const versioned=[load.workflow,load.compatibility,...Object.values(load.roles).map(x=>x.path).filter(Boolean),'README.md','scripts/check-gdo-v4.mjs'];
for(const p of new Set(versioned))write(p,read(p).replaceAll('4.7.3',version));
const reference='skills/gdo-workflow/references/blocker-scoping.md';
replace(corePath,'## Shared rules',`## Scoped blockers and pre-finalization audit

A blocker applies only to work that depends on it. On any failed/unavailable operation, and before finalizing an incomplete round or freezing publication, load \`references/blocker-scoping.md\` from this same snapshot. This is required for every active role and actor, including Governance Triage; it does not load another role. Reference/tool unavailability is itself scoped: apply this core rule to known-independent work and disclose unresolved detail.

Preserve the attempt, enumerate remaining authorized obligations in the existing ledger, identify their actual dependencies, and continue all work that is independent, meaningful, safe, executable, and within the original scope/resource bounds. Dependencies include exact source/build, shared state, required observation/artifact capture and restoration, not merely task names. Publication unavailability before freeze does not itself block independent execution with valid local preservation.

Stop the whole round only when no useful independent authorized work can proceed, current authority/safety requires stopping, or a genuine terminal lifecycle condition applies. Audit before selecting/finalizing a result or freezing/handing off; selecting BLOCKED or publishing early cannot manufacture an exemption. Existing admission/re-entry gates, takeover, frozen bytes, uncertain-write reconciliation and terminal publication stop rules retain precedence. Do not absorb the next role or bypass any gate.

Stop reports must identify the blocked operation, dependent obligations and dependency reasons, independent work completed, every remaining deferral and its concrete justification, and the stop basis. Report execution progress/findings, executed-work versus campaign artifact completeness, and publication/delivery/access separately. Use existing narrative fields or a linked ledger, not new lifecycle JSON fields or statuses.

## Shared rules`);
const roleNotes={
 definition:'Block only decisions dependent on missing facts or approval; continue independent authorized definition work. Never activate unresolved or unauthorized product decisions.',
 discovery:'An unavailable probe/interface does not block independent source or architecture investigation. Do not redispatch an unchanged broken apparatus or assume unavailable observations.',
 implementation:'Missing local execution or publication does not by itself prevent independent authorized edits, durable regression work, or source inspection. Disclose unexecuted required checks; do not invent readiness.',
 evidence:'A capability, publication, fixture or test blocker requires the same dependency audit, not only substantive product failures. Complete independent useful checks and capture before finalization; keep missing campaign proof distinct from delivery.',
 independent_review:'Missing required proof prevents dependent conclusions and PASS, not independent review of available source/evidence. Complete useful authorized review before the truthful handoff; do not fill missing proof with inference.'
};
for(const [name,note] of Object.entries(roleNotes)){
 const p=load.roles[name].path;
 replace(p,'## Question',`## Scoped blocker audit

Apply the workflow core's mandatory remaining-work audit and same-snapshot blocker-scoping reference when blocked and before an incomplete handoff. ${note} Put the audit and separate execution/artifact/delivery facts in existing narrative fields or a linked ledger; do not add lifecycle JSON fields. Existing authority and terminal-stop rules retain precedence.

## Question`);
}
replace(load.roles.implementation.path,'If material product/architecture meaning becomes unresolved, stop and route DISCOVERY REQUIRED.','If material product/architecture meaning becomes unresolved, stop work that depends on that meaning. Complete the scoped blocker audit and any independent authorized work before routing DISCOVERY REQUIRED; do not make the unresolved decision yourself.');
replace(load.roles.evidence.path,'A substantive failure does not automatically end useful Evidence execution. Record the failure precisely, then continue other authorized checks only when their results remain independent, meaningful, and safe to obtain.','Any failed or blocked operation does not automatically end useful Evidence execution. Record the failure precisely, then continue all remaining authorized checks whose results remain independent, meaningful, safe, and within the controlling bounds. This is required even when the round cannot achieve REVIEW READY.');
replace(load.roles.evidence.path,'## Evidence outcome','## Pre-finalization remaining-work audit\n\nBefore selecting, preparing, or freezing a terminal result, complete the workflow core audit. Publication unavailability before preparation is a delivery blocker, not a reason to defer otherwise executable live work with valid capture and restoration. Preserve the fullest truthful bundle. Record execution/findings, completeness for executed work versus the entire required campaign, and actual publication/recipient access separately. A BLOCKED outcome is not permission to skip independent work.\n\n## Evidence outcome');
replace('skills/gdo-evidence/references/legacy-operator.md','After a substantive failure, preserve it and continue only independent authorized obligations whose result remains meaningful and safe.','After any failed or blocked operation, preserve it and apply the core scoped blocker audit. The worker must continue only independent authorized obligations whose result remains meaningful and safe, and must not finalize while such useful executable work remains.');
replace('skills/gdo-evidence/references/legacy-operator.md','Before selecting Outcome:','Before selecting Outcome, complete the core remaining-work audit and account for every unexecuted obligation. Keep execution, artifact completeness, and publication/delivery separate. Then:');
replace('skills/gdo-evidence/references/strict-operator.md','Missing prerequisites or malformed/unsupported contract are blockers, not permission to fall back silently.','Missing prerequisites or malformed/unsupported contract block dependent work, not permission to fall back silently. Apply the core scoped blocker audit; an invalid global execution contract still prevents work that requires it.');
replace('skills/gdo-evidence/references/strict-operator.md','After a substantive failure, the Evidence worker may continue other independent authorized steps only when their results remain meaningful and safe.','After any failed or blocked operation, the Evidence worker must continue other independent authorized steps when their results remain meaningful, safe and within the controlling bounds. Complete the core remaining-work audit before finalization.');
replace('skills/gdo-evidence/references/strict-operator.md','## Bundle and outcome','## Bundle and outcome\n\nPerform the core audit before final preparation/freeze. A known publication outage before this boundary does not block independent execution with valid capture/restoration. Account separately for execution/findings, executed-work and campaign artifact completeness, and actual delivery. Preserve existing frozen-publication and uncertain-write restrictions.');
load.version=version;
load.budgets_bytes={core:24000,standard_role_total:53000,evidence_total:55000,rationale:'GDO 4.7.4 includes the mandatory workflow-wide remaining-work audit and one conditional blocker-scoping reference. These bounded ceilings include the material conditional load; check-scoped-blockers.mjs prints measured role totals. Existing safeguards are retained; future growth needs explicit disposition.'};
load.scoped_blockers={scope:'all-active-roles-and-actors',reference,pre_finalization_audit:'required',lifecycle_effect:'none',principle:'A blocker applies only to work that depends on it.',record_transport:'Existing narrative fields or linked ledger; no new lifecycle JSON fields or outcomes.',terminal_precedence:['authority-and-safety','admission-and-reentry-gates','frozen-publication','uncertain-write-reconciliation','terminal-acknowledgement'],status_dimensions:['execution-progress-and-findings','executed-work-and-campaign-artifact-completeness','publication-delivery-and-recipient-access']};
for(const role of Object.values(load.roles))role.conditional=[...(role.conditional||[]),reference+' when an operation fails/is unavailable or before an incomplete handoff'];
load.correction_economy.defect_aggregation='After any failed/blocked operation, perform the core dependency audit and continue all independent useful safe authorized work before finalizing, within the controlling bounds; no speculative expansion.';
write('load-contract.json',JSON.stringify(load,null,2)+'\n');
let manifest=JSON.parse(read('.codex-plugin/plugin.json'));manifest.version=version;
manifest.interface.longDescription='GDO 4.7.4 adds workflow-wide dependency-scoped blockers and a mandatory pre-finalization remaining-work audit while preserving authority, safety, Evidence independence, and terminal publication rules.';
manifest.interface.defaultPrompt.splice(1,0,'Scope every blocker to its dependent obligations. Before finalizing or freezing a round, continue all useful safe authorized independent work and report execution, artifact completeness, and delivery separately; preserve authority and terminal publication stops.');
write('.codex-plugin/plugin.json',JSON.stringify(manifest,null,2)+'\n');
replace('README.md','## Owner-aware Evidence Admission continuation','## Scoped blockers and stop decisions\n\nGDO 4.7.4 makes blocker scope and the remaining-work audit workflow-wide requirements. One blocked operation does not justify abandoning independent safe authorized work. Audit before finalization/publication freeze; separate execution, artifacts and delivery. Authority, safety, admission/re-entry and terminal publication boundaries remain controlling. See `skills/gdo-workflow/references/blocker-scoping.md` and `maintenance/blocker-scope-evaluation.md` for the contract, action-trace tests and opt-in model evaluation. Reference/mutation CI tests are not live model-compliance results.\n\n## Owner-aware Evidence Admission continuation');
replace('tests/fixtures/blocker-scope-cases.mjs','One effect-policy input is unavailable. Continue unrelated already-authorized ownership analysis; do not freeze the unresolved policy.','One effect-policy input is unavailable. Ownership analysis uses different already-available source facts. No authorization exists to freeze the unresolved policy.');
write('tests/fixtures/blocker-scope-cases.mjs',read('tests/fixtures/blocker-scope-cases.mjs')+'\n// The four primary failures also evaluate the strict operator load.\nfor(const spec of cases.slice(0,4))cases.push({...structuredClone(spec),id:spec.id+\'-strict\',mode:\'strict\'});\n');
console.log('SCOPED_BLOCKER_SOURCE_MIGRATION_APPLIED');
