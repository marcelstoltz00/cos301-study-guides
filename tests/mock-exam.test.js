// Run with node study-guides/tests/mock-exam.test.js. No browser dependency.
// A minimal DOM exercises the real renderer, scoring, saved state and controls.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
const source = fs.readFileSync(path.join(root, 'assets/mock-exam.js'), 'utf8');
const banks = ['ct4-example-1', 'ct4-example-2', ...[1,2,3,4,5,6].map(n=>`st2-example-${n}`)];
function text(e) { return [e.textContent, ...e.children.map(text)].join(' '); }
function mount(paper, initial = {}) {
 const ids = new Map(), hooks = {};
 class Element {
  constructor(tag) { this.tag=tag; this.children=[]; this.events={}; this.textContent=''; this.value=''; this.open=false; this.classList={add(){},remove(){},toggle(){}}; }
  set id(value) { this._id=value; ids.set(value,this); }
  get id() { return this._id; }
  append(...items) { this.children.push(...items); }
  replaceChildren(...items) { this.children=items; }
  addEventListener(key,fn) { this.events[key]=fn; }
  setAttribute() {}
 }
 const get = id => { if(!ids.has(id))ids.set(id,new Element('div')); return ids.get(id); };
 get('mock-data').textContent=JSON.stringify(paper);
 let saved=JSON.stringify(initial);
 const context={document:{getElementById:get,createElement:tag=>new Element(tag),body:new Element('body')},localStorage:{getItem:()=>saved,setItem:(k,v)=>saved=v},window:{confirm:()=>false,print(){}},location:{reload(){}},addEventListener:(key,fn)=>hooks[key]=fn};
 // Expose internals only in the VM test copy, never in the shipped page.
 vm.runInNewContext(source.replace(/\}\)\(\);\s*$/, 'globalThis.testing={checkCorrect,current,score,updateScore,autoMarks,selfMax};})();'),context);
 return {get, hooks, api:context.testing, saved:()=>JSON.parse(saved)};
}
function fullState(paper) {
 const state={};
 for(const q of paper.questions) {
  const s=state[q.id]={};
  if(q.type==='essay') {
   s.checkAnswers={};
   q.parts.forEach((p,i)=>(p.checks||[]).forEach((c,j)=>s.checkAnswers[`${i}-${j}`]=String(c.answer)));
  } else s.answers=q.type==='matching'?q.items.map(x=>x.answer):q.items?q.items.map(x=>x.answers[0]):q.correct.slice();
 }
 return state;
}
for(const id of banks) {
 const paper=JSON.parse(fs.readFileSync(path.join(root,`data/${id}.json`),'utf8'));
 const blank=mount(paper);
 blank.get('mark-all').events.click();
 assert.match(text(blank.get('paper-score')), /(?:Automatically marked: 0|Combined practice total: 0)/);
 const run=mount(paper,fullState(paper));
 assert.equal(run.get('paper-questions').children.length,paper.questions.length);
 run.get('mark-all').events.click();
 const max=paper.questions.reduce((n,q)=>n+run.api.autoMarks(q),0);
 if(max)assert(text(run.get('paper-score')).includes(`Automatically marked: ${max} / ${max}`));
 // Complete qualitative rubrics: automatic results plus remaining marks = total.
 for(const q of paper.questions.filter(q=>q.type==='essay'))q.parts.forEach((p,i)=>{run.api.current(q).selfMarks[i]=run.api.selfMax(p);});
 run.api.updateScore();
 if(paper.questions.some(q=>q.type==='essay'))assert(text(run.get('paper-score')).includes(`Combined practice total: ${paper.totalMarks} / ${paper.totalMarks}`));
 const memos=run.get('paper-questions').children.flatMap(c=>c.children.filter(e=>e.tag==='details'));
 run.get('show-memos').events.click();assert(memos.every(m=>m.open));
 run.get('print-paper').events.click();assert(memos.every(m=>!m.open));
 run.hooks.afterprint();assert(memos.every(m=>m.open));
 run.get('hide-memos').events.click();assert(memos.every(m=>!m.open));
 if([5,6].some(n=>id===`st2-example-${n}`)) {
  assert.equal(max,72.5);
  const eq=paper.questions.find(q=>q.id==='q3');
  const input=run.get('q3-check-0-0');input.value='wrong';input.events.input();
  assert.equal(run.api.current(eq).marked,false);
  run.get('mark-all').events.click();assert.equal(run.api.score(eq),23);
  assert.equal(run.saved().q3.checkAnswers['0-0'],'wrong');
  const reload=mount(paper,run.saved());assert.equal(reload.get('q3-check-0-0').value,'wrong');
  assert(text(reload.get('paper-score')).includes('Automatically marked: 71.5 / 72.5'));
  const numeric=run.api.checkCorrect;
  const count={type:'number',answer:30000,tolerance:0};
  for(const good of ['30000','30,000',' 30000 ','3e4','30000.0'])assert(numeric(count,good));
  for(const bad of ['', ' ', '30,00', 'NaN', 'Infinity', '30001','30000 messages'])assert(!numeric(count,bad));
  assert(numeric({type:'number',answer:.145},'.145'));
  assert(!numeric({type:'number',answer:0},''));
  const av=paper.questions.find(q=>q.id==='q11').parts[1].checks[1];
  assert(numeric(av,av.answer.toFixed(2)));
  assert(!numeric(av,String(av.answer+.02)));
  const q8=paper.questions.find(q=>q.id==='q8');
  run.api.current(q8).answers=q8.options.map((_,i)=>i).filter(i=>!q8.correct.includes(i));
  assert.equal(run.api.score(q8),0); // Negative marking is floored.
  run.api.current(q8).answers=[q8.correct[0]];assert.equal(run.api.score(q8),1);
  const parsed=JSON.parse(fs.readFileSync(path.join(root,`${id}.html`),'utf8').match(/<script type="application\/json" id="mock-data">([\s\S]*?)<\/script>/)[1]);
  assert.deepEqual(parsed,paper);
  assert(fs.existsSync(path.join(root,`markdown/${id}-memo.md`)));
 }
 console.log(`${id}: scoring, total marks, rendering and print-state checks passed`);
}
