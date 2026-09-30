import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import {cases} from './fixtures/blocker-scope-cases.mjs';
import {ToolWorld,grade,referenceReport} from '../scripts/blocker-scope-eval-lib.mjs';
import {runCase} from '../scripts/eval-blocker-agent.mjs';

for(const spec of cases){
  test('reference tool trace: '+spec.id,()=>{
    const world=new ToolWorld(spec);
    for(const id of spec.expected)assert.equal(world.execute(id).result,'PASS',id);
    world.finish(referenceReport(world));
    const result=grade(world);assert.equal(result.status,'PASS',JSON.stringify(result.problems));
    assert.deepEqual(result.executed,spec.expected);
    assert.ok(spec.forbidden.every(id=>!world.trace.some(e=>e.id===id)));
  });
  if(spec.expected.length)test('reject whole-round abandonment: '+spec.id,()=>{
    const world=new ToolWorld(spec);world.finish(referenceReport(world));
    const result=grade(world);assert.equal(result.status,'FAIL');
    assert.ok(result.problems.some(x=>x.includes('Independent obligation not executed')));
  });
  for(const id of spec.forbidden)test('reject dependent/unsafe/terminal action: '+spec.id+'/'+id,()=>{
    const world=new ToolWorld(spec);assert.ok(world.execute(id).error);world.finish(referenceReport(world));assert.equal(grade(world).status,'FAIL');
  });
}

test('complete prerequisite records do not imply campaign completeness or delivery',()=>{
  const world=new ToolWorld(cases[0]);world.execute('live-map');
  const report=referenceReport(world);assert.equal(report.artifacts.executed_records_complete,true);assert.equal(report.artifacts.campaign_complete,false);
  report.artifacts.campaign_complete=true;report.delivery={status:'ACKNOWLEDGED',recipient_access:true};world.finish(report);
  const result=grade(world);assert.ok(result.problems.some(x=>x.includes('Artifact completeness')));assert.ok(result.problems.some(x=>x.includes('publication/delivery')));
});

test('a final claim cannot replace actual tool actions',()=>{
  const spec=cases[0],world=new ToolWorld(spec),report=referenceReport(world);report.independent_completed=[...spec.expected];world.finish(report);
  const result=grade(world);assert.equal(result.status,'FAIL');assert.ok(result.problems.some(x=>x.includes('action trace')));
});

test('deferrals must cover every remaining obligation and its actual dependency',()=>{
  const spec=cases[1],world=new ToolWorld(spec);for(const id of spec.expected)world.execute(id);
  const report=referenceReport(world);report.remaining[0].blocked_by=['publication'];world.finish(report);
  assert.ok(grade(world).problems.some(x=>x.includes('Unsubstantiated dependency')));
});

test('later actions cannot mutate a finished trace and retries cannot erase original results',()=>{
  const world=new ToolWorld(cases[0]);world.execute('live-map');assert.ok(world.execute('live-map').error);
  world.finish(referenceReport(world));assert.ok(world.execute('live-results').error);assert.equal(world.states['live-map'],'PASS');
});

test('invalid dependency graphs are rejected rather than inventing independence',()=>{
  const base=structuredClone(cases[0]);base.tasks[0].requires=['nonexistent'];assert.throws(()=>new ToolWorld(base),/Unknown dependency/);
  base.tasks[0].requires=['live-results'];base.tasks[1].requires=['live-map'];assert.throws(()=>new ToolWorld(base),/cycle/);
});

test('agent driver executes function calls, returns failures, and grades the observed sequence',async()=>{
  const spec=cases[0],oracle=new ToolWorld(spec);for(const id of spec.expected)oracle.execute(id);
  const report=referenceReport(oracle);let turn=0;
  const request=async body=>{
    assert.equal(body.parallel_tool_calls,false);assert.equal(body.store,false);
    if(turn>0)assert.ok(body.input.some(x=>x.type==='function_call_output'));
    const call=turn<spec.expected.length?{name:'execute',arguments:JSON.stringify({id:spec.expected[turn]})}:{name:'finish',arguments:JSON.stringify(report)};
    return {model:'MOCK-NOT-A-MODEL-EVALUATION',id:'mock-'+turn,output:[{type:'function_call',call_id:'call-'+turn++,...call}]};
  };
  const result=await runCase(spec,{instructions:'fixture instructions',model:'mock',request});assert.equal(result.status,'PASS',JSON.stringify(result.problems));
  assert.deepEqual(result.executed,spec.expected);
});

test('agent driver rejects textual early completion and never fabricates a stop audit',async()=>{
  const result=await runCase(cases[0],{instructions:'fixture',model:'mock',request:async()=>({output:[{type:'message',content:[]} ]})});
  assert.equal(result.status,'FAIL');assert.ok(result.problems.some(x=>x.includes('stop audit')));
});

test('missing model credential is NOT_RUN, not an agent PASS',()=>{
  const root=fs.mkdtempSync(path.join(os.tmpdir(),'gdo-agent-not-run-'));
  try{
    const env={...process.env};delete env.OPENAI_API_KEY;
    const run=spawnSync(process.execPath,[fileURLToPath(new URL('../scripts/eval-blocker-agent.mjs',import.meta.url)),'--out',path.join(root,'out')],{env,encoding:'utf8'});
    assert.equal(run.status,3,run.stderr);const report=JSON.parse(fs.readFileSync(path.join(root,'out','report.json'),'utf8'));
    assert.equal(report.status,'NOT_RUN');assert.equal(report.results.length,0);
  }finally{fs.rmSync(root,{recursive:true,force:true});}
});
