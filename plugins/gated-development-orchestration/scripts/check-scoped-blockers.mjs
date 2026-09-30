#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const ensure=(ok,msg)=>{if(!ok)throw new Error(msg);};
const load=JSON.parse(read('load-contract.json'));
const rule=load.scoped_blockers;
ensure(rule?.scope==='all-active-roles-and-actors','Missing workflow-wide blocker scope');
ensure(rule.pre_finalization_audit==='required','Audit must be required');
ensure(rule.lifecycle_effect==='none','Blocker audit must not introduce a round');
const ref=read(rule.reference),core=read(load.workflow);
for(const text of ['A blocker applies only to work that depends on it','before finalizing','no useful independent','terminal'])ensure(core.includes(text),'Core missing '+text);
for(const text of ['Do not manufacture the terminal condition','Artifact completeness for executed work','Uncertain submission requires reconciliation','Durable queue acknowledgement / terminal publication remains STOP','helper is unavailable'])ensure(ref.includes(text),'Reference missing '+text);
const bytes=p=>Buffer.byteLength(read(p));
const totals={};
for(const [name,role] of Object.entries(load.roles)){
  ensure(role.conditional?.some(x=>x.includes(rule.reference)),name+' does not declare the material shared reference');
  const paths=[load.workflow,rule.reference,role.path,...(role.required||[])].filter(Boolean);
  if(role.path)ensure(read(role.path).includes('Scoped blocker audit'),name+' missing role application');
  if(role.modes){for(const [mode,detail] of Object.entries(role.modes)){
    totals[name+'_'+mode]=[...new Set([...paths,...detail.required])].reduce((n,p)=>n+bytes(p),0);
    ensure(totals[name+'_'+mode]<=load.budgets_bytes.evidence_total,name+' conditional load exceeds budget');
  }}else{
    if(name==='implementation')paths.push('skills/gdo-workflow/references/verification-recipe.md');
    totals[name]=[...new Set(paths)].reduce((n,p)=>n+bytes(p),0);
    ensure(totals[name]<=load.budgets_bytes.standard_role_total,name+' conditional load exceeds budget');
  }
}
const evidence=read(load.roles.evidence.path);
ensure(evidence.includes('Before selecting, preparing, or freezing'),'Evidence must audit before finalization');
ensure(evidence.includes('After durable queue acknowledgement / terminal publication state, STOP.'),'Terminal Evidence stop was weakened');
const legacy=read('skills/gdo-evidence/references/legacy-operator.md');
const strict=read('skills/gdo-evidence/references/strict-operator.md');
ensure(legacy.includes('must continue only independent authorized obligations'),'Legacy continuation is not mandatory');
ensure(strict.includes('must continue other independent authorized steps'),'Strict continuation is not mandatory');
ensure(strict.includes('After queue acknowledgement/published terminal receipt, STOP.'),'Strict terminal stop was weakened');
console.log(JSON.stringify({status:'PASS',kind:'PACKAGE_CONTRACT_CHECK',version:load.version,conditional_load_bytes:totals},null,2));
