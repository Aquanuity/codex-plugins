#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = p => fs.readFileSync(path.join(root, p), 'utf8');
const bytes = p => Buffer.byteLength(read(p), 'utf8');
const ensure = (ok, msg) => { if (!ok) throw new Error(msg); };

const manifest = JSON.parse(read('.codex-plugin/plugin.json'));
const contract = JSON.parse(read('load-contract.json'));
ensure(manifest.version === '4.1.0', 'manifest version must be 4.0.0');
ensure(contract.version === manifest.version, 'load-contract version mismatch');
ensure(contract.protocol === 'github-gated-development-v3', 'protocol changed unexpectedly');

const skills = {
  workflow: contract.workflow,
  definition: contract.roles.definition.path,
  discovery: contract.roles.discovery.path,
  implementation: contract.roles.implementation.path,
  evidence: contract.roles.evidence.path,
  review: contract.roles.independent_review.path,
  compatibility: contract.compatibility
};
for (const [name,p] of Object.entries(skills)) {
  ensure(fs.existsSync(path.join(root,p)), `missing ${name}: ${p}`);
  const body=read(p);
  ensure(body.includes('version: "4.1.0"'), `${name} frontmatter version mismatch`);
}
ensure(bytes(skills.workflow) <= contract.budgets_bytes.core, 'workflow core exceeds byte budget');

const required = role => [skills.workflow, skills[role], ...(contract.roles[role]?.required || [])];
const standard = ['definition','discovery','implementation'];
const totals = {};
for (const role of standard) {
  const paths=[...new Set(required(role))];
  for (const p of paths) ensure(fs.existsSync(path.join(root,p)), `missing required path: ${p}`);
  totals[role]=paths.reduce((n,p)=>n+bytes(p),0);
  ensure(totals[role] <= contract.budgets_bytes.standard_role_total, `${role} load exceeds budget`);
  if (role === 'implementation') {
    totals.implementation_product_code=totals[role]+bytes('skills/gdo-workflow/references/verification-recipe.md');
    ensure(totals.implementation_product_code <= contract.budgets_bytes.standard_role_total, 'implementation product-code load exceeds budget');
  }
}
{
  const paths=[skills.workflow,skills.review];
  totals.independent_review=paths.reduce((n,p)=>n+bytes(p),0);
  ensure(totals.independent_review <= contract.budgets_bytes.standard_role_total, 'review load exceeds budget');
}
for (const [mode,m] of Object.entries(contract.roles.evidence.modes)) {
  const paths=[...new Set([skills.workflow,skills.evidence,...m.required])];
  for (const p of paths) ensure(fs.existsSync(path.join(root,p)), `missing evidence ${mode} path: ${p}`);
  totals[`evidence_${mode}`]=paths.reduce((n,p)=>n+bytes(p),0);
  ensure(totals[`evidence_${mode}`] <= contract.budgets_bytes.evidence_total, `evidence ${mode} load exceeds budget`);
}
const core=read(skills.workflow);
for (const marker of [
  'gated-development:activation:v3',
  'gated-development:implementation-record:v3',
  'gated-development:evidence:v3',
  'status=pass',
  '- Next round: Implementation',
  'gated-development:actor-override:v1',
  '- Contract effect: NONE',
  'Human actor takeover'
]) ensure(core.includes(marker), `core missing canonical marker/token: ${marker}`);

const impl=read(skills.implementation);
ensure(impl.includes('Recipe: <repository-relative path at ending commit>'), 'Implementation template missing committed recipe');
ensure(impl.includes('Checks actually performed during Implementation'), 'Implementation template conflates checks');
ensure(impl.includes('Verification assigned to Evidence'), 'Implementation template conflates Evidence work');

const evidence=read(skills.evidence);
ensure(evidence.includes('Every Evidence round uses a fresh session'), 'Evidence fresh-session rule missing');
ensure(evidence.includes('After durable queue acknowledgement'), 'Evidence terminal stop rule missing');

const review=read(skills.review);
ensure(review.includes('Only this role may issue checkpoint PASS'), 'Review PASS authority missing');
ensure(review.includes('cannot retroactively redefine that contract'), 'Review contract-fidelity invariant missing');
ensure(review.includes('Contract effect: NONE'), 'Review actor-override non-amendment invariant missing');

const shim=read(skills.compatibility);
ensure(shim.includes('../gdo-workflow/SKILL.md'), 'compatibility shim does not route to v4 core');
ensure(!shim.includes('references/rounds-and-checkpoints.md'), 'compatibility shim loads old monolith references');

const map=read('maintenance/gdo-v4-migration-map.md');
for(let i=1;i<=28;i++) ensure(new RegExp(`\\| I${i} \\|`).test(map), `migration map missing I${i}`);

const roleBodies=['definition','discovery','implementation','evidence','review'];
for (const role of roleBodies) {
  const p=skills[role], body=read(p);
  for (const other of roleBodies) {
    if (other===role) continue;
    const otherPath=skills[other].split('/').slice(-2,-1)[0];
    ensure(!body.includes(`../${otherPath}/SKILL.md`), `${role} directly imports unrelated role ${other}`);
  }
}

console.log(JSON.stringify({
  version: manifest.version,
  core_bytes: bytes(skills.workflow),
  required_load_bytes: totals,
  manifest_bytes: bytes('.codex-plugin/plugin.json'),
  compatibility_bytes: bytes(skills.compatibility)
}, null, 2));
console.log('GDO_V4_PACKAGE_CHECK_OK');
