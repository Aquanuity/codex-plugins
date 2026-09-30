#!/usr/bin/env node
// Opt-in, bounded model evaluation. Only mock tools run; no product/repository writes.
import fs from 'node:fs';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {fileURLToPath,pathToFileURL} from 'node:url';
import {cases} from '../tests/fixtures/blocker-scope-cases.mjs';
import {ToolWorld,grade,toolDefinitions} from './blocker-scope-eval-lib.mjs';
const sha=x=>createHash('sha256').update(x).digest('hex');
export function loadInstructions(root,spec){
  root=path.resolve(root);
  const read=p=>{const file=path.resolve(root,p);if(!file.startsWith(root+path.sep))throw new Error('Instruction path escapes package');return fs.readFileSync(file,'utf8');};
  const manifest=JSON.parse(read('.codex-plugin/plugin.json'));
  const load=JSON.parse(read('load-contract.json'));
  if(manifest.version!==load.version)throw new Error('Mixed package metadata');
  const role=load.roles[spec.role];if(!role)throw new Error('Unknown evaluation role');
  const names=[load.workflow,role.path,...(role.required||[])];
  if(spec.role==='evidence')names.push(...role.modes[spec.mode].required);
  // The cases start with an observed blocker, so this conditional reference is material.
  if(load.scoped_blockers?.reference)names.push(load.scoped_blockers.reference);
  const files=[...new Set(names.filter(Boolean))].map(name=>({path:name,text:read(name)}));
  for(const file of files)if(file.path.endsWith('/SKILL.md')&&!file.text.includes('version: "'+manifest.version+'"'))throw new Error('Mixed skill metadata: '+file.path);
  const instructions=files.map(f=>'SOURCE '+f.path+'\n'+f.text).join('\n\n');
  return {version:manifest.version,instructions,sha256:sha(instructions),files:files.map(f=>({path:f.path,sha256:sha(f.text)}))};
}
export async function runCase(spec,{instructions,model,reasoning,request,maxTurns=16}={}){
  const world=new ToolWorld(spec),models=new Set(),requests=[];let providerError=null;
  const input=[{role:'user',content:'Complete the active authorized round in this synthetic environment using only the supplied tools. All operations are simulated. The tool environment records actual attempts; do not claim results without executing them. End with finish and report observed state.\n'+JSON.stringify(world.observation())}];
  for(let turn=0;turn<maxTurns&&!world.closed;turn++){
    let response;
    try{response=await request({model,instructions,input,tools:toolDefinitions(spec),parallel_tool_calls:false,store:false,include:['reasoning.encrypted_content'],max_output_tokens:4096,...(reasoning?{reasoning:{effort:reasoning}}:{})});}
    catch(error){providerError={reason:error.message,global:Boolean(error.global)};world.errors.push('Model request failed: '+error.message);break;}
    if(response.model)models.add(response.model);
    requests.push({id:response.id??null,model:response.model??null,usage:response.usage??null});
    if(!Array.isArray(response.output))throw new Error('Response has no output array');
    input.push(...response.output);
    const calls=response.output.filter(x=>x.type==='function_call');
    if(!calls.length){world.errors.push('Worker ended without tool-backed stop audit');break;}
    for(const call of calls){
      let args;try{args=JSON.parse(call.arguments);}catch{world.errors.push('Invalid tool arguments');break;}
      let observation;
      if(call.name==='execute')observation=world.execute(args.id);
      else if(call.name==='finish'&&!world.closed)observation=world.finish(args);
      else {world.errors.push('Unknown/repeated terminal tool');observation={error:'Invalid tool'};}
      input.push({type:'function_call_output',call_id:call.call_id,output:JSON.stringify(observation)});
    }
  }
  if(!world.closed)world.errors.push('No final audit within turn/output bounds');
  return {case_id:spec.id,requested_model:model,observed_models:[...models],reasoning:reasoning||null,requests,provider_error:providerError,...grade(world)};
}
function options(argv){const o={};for(let i=0;i<argv.length;i+=2){if(!argv[i]?.startsWith('--')||!argv[i+1])throw new Error('Expected --name value pairs');o[argv[i].slice(2)]=argv[i+1];}return o;}
async function main(){
  const o=options(process.argv.slice(2));
  if(!o.out)throw new Error('--out must name a new output directory');
  const out=path.resolve(o.out);if(fs.existsSync(out))throw new Error('Refusing to overwrite an evaluation');fs.mkdirSync(out,{recursive:true});
  const report={schema:'gdo-blocker-agent-evaluation/v1',kind:'MODEL_EVALUATION',started_utc:new Date().toISOString(),status:'NOT_RUN',results:[]};
  const save=()=>fs.writeFileSync(path.join(out,'report.json'),JSON.stringify(report,null,2)+'\n');
  save();
  if(!o.model||!process.env.OPENAI_API_KEY){report.reason='An explicit --model and OPENAI_API_KEY are required. No model call was made.';save();process.exitCode=3;return;}
  const repeat=Number(o.repeat??1),maxCalls=Number(o['max-calls']??128);
  if(!Number.isInteger(repeat)||repeat<1||repeat>5||!Number.isInteger(maxCalls)||maxCalls<1||maxCalls>256)throw new Error('repeat must be 1..5 and max-calls 1..256');
  const root=path.resolve(o['package-root']||path.join(path.dirname(fileURLToPath(import.meta.url)),'..'));
  const selected=o.cases?cases.filter(x=>o.cases.split(',').includes(x.id)):cases;
  if(!selected.length||(o.cases&&selected.length!==new Set(o.cases.split(',')).size))throw new Error('Unknown/empty case selection');
  let count=0;
  const request=async body=>{
    if(count>=maxCalls)throw new Error('Global model-call budget exhausted');count++;
    const res=await fetch('https://api.openai.com/v1/responses',{method:'POST',headers:{Authorization:'Bearer '+process.env.OPENAI_API_KEY,'Content-Type':'application/json'},body:JSON.stringify(body),signal:AbortSignal.timeout(90000)});
    if(!res.ok){const error=new Error('Model endpoint HTTP '+res.status);error.global=[401,403,429].includes(res.status);throw error;}
    return res.json();
  };
  let globalBlock=null;
  for(const spec of selected)for(let repetition=1;repetition<=repeat;repetition++){
    if(globalBlock){report.results.push({case_id:spec.id,repetition,status:'NOT_RUN',reason:globalBlock});continue;}
    try{
      const source=loadInstructions(root,spec);
      const result=await runCase(spec,{...source,model:o.model,reasoning:o.reasoning,request});
      if(result.provider_error?.global||count>=maxCalls)globalBlock=result.provider_error?.reason||'Global model-call budget exhausted';
      report.results.push({...result,repetition,package_version:source.version,loaded_sha256:source.sha256,loaded_files:source.files});
    }catch(error){report.results.push({case_id:spec.id,repetition,status:'ERROR',reason:error.message});if(error.global||count>=maxCalls)globalBlock=error.message;}
    save();
  }
  report.status=report.results.every(x=>x.status==='PASS')?'PASS':'FAIL';report.finished_utc=new Date().toISOString();report.model_calls=count;save();
  console.log(JSON.stringify({status:report.status,cases:report.results.length,model_calls:count,report:path.join(out,'report.json')}));
  process.exitCode=report.status==='PASS'?0:1;
}
if(process.argv[1]&&import.meta.url===pathToFileURL(path.resolve(process.argv[1])).href)main().catch(error=>{console.error(error.message);process.exitCode=2;});
