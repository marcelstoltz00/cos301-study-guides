(function () {
 'use strict';
 const paper = JSON.parse(document.getElementById('mock-data').textContent);
 const autoMarks = q => q.type==='essay' ? q.parts.reduce((sum,p)=>sum+(p.checks||[]).reduce((n,c)=>n+c.marks,0),0) : q.marks;
 const selfMax = p => p.marks-(p.checks||[]).reduce((n,c)=>n+c.marks,0);
 const hasObjective = paper.questions.some(q=>autoMarks(q)>0);
 document.getElementById('mark-all').hidden = !hasObjective;
 const node = (tag, cls, text) => {const n=document.createElement(tag);if(cls)n.className=cls;if(text!==undefined)n.textContent=text;return n;};
 const normal = s => String(s ?? '').trim().toLowerCase().replace(/\s+/g,' ').replace(/\.$/,'');
 const fmt = n => Number(n.toFixed(2)).toString();
 let state = {};
 try {const saved=JSON.parse(localStorage.getItem(paper.storageKey));if(saved && typeof saved==='object'&&!Array.isArray(saved))state=saved;}catch{}
 const status=document.getElementById('storage-status');
 const markViews=new Map();const memoElements=[];const wordViews=[];
 function save(){try{localStorage.setItem(paper.storageKey,JSON.stringify(state));status.textContent='Drafts, selections and self-assessment save locally for this paper.';}catch{status.textContent='Browser storage is unavailable. You can still practise, but this session’s work may not survive a reload.';}}
 function current(q){
  if(!state[q.id]||typeof state[q.id]!=='object'||Array.isArray(state[q.id]))state[q.id]={};
  const s=state[q.id];
  for(const key of ['answers','drafts','selfMarks'])if(!Array.isArray(s[key]))s[key]=[];
  if(!s.checkAnswers||typeof s.checkAnswers!=='object'||Array.isArray(s.checkAnswers))s.checkAnswers={};
  if(q.options&&['single','multi'].includes(q.type)){
   s.answers=[...new Set(s.answers.filter(x=>Number.isInteger(x)&&x>=0&&x<q.options.length))];
   if(q.type==='single')s.answers=s.answers.slice(0,1);
  }
  return s;
 }
 function checkCorrect(check,value){
  if(check.type!=='number')return (check.answers||[check.answer]).some(a=>normal(a)===normal(value));
  const raw=String(value??'').trim();
  if(!/^[+-]?(?:(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?$/i.test(raw))return false;
  const parsed=Number(raw.replace(/,/g,''));
  return Number.isFinite(parsed)&&Math.abs(parsed-check.answer)<=(check.tolerance||0)+Number.EPSILON*Math.max(1,Math.abs(check.answer))*4;
 }
 function score(q){
  const s=current(q);
  if(q.type==='essay')return q.parts.reduce((sum,p,i)=>sum+(p.checks||[]).reduce((n,c,j)=>n+(checkCorrect(c,s.checkAnswers[`${i}-${j}`])?c.marks:0),0),0);
  if(q.type==='single')return s.answers.length===1&&s.answers[0]===q.correct[0]?q.marks:0;
  if(q.type==='multi'){
   const hits=s.answers.filter(i=>q.correct.includes(i)).length;
   return Math.max(0,(hits-(s.answers.length-hits))*q.marks/q.correct.length);
  }
  return q.items.reduce((sum,item,i)=>sum+(q.type==='matching'?s.answers[i]===item.answer:item.answers.some(a=>normal(a)===normal(s.answers[i]))) * q.marks/q.items.length,0);
 }
 function updateScore(){
  const objective=paper.questions.filter(q=>autoMarks(q)>0),written=paper.questions.filter(q=>q.type==='essay'&&q.parts.some(p=>selfMax(p)>0));
  const objectiveMax=objective.reduce((s,q)=>s+autoMarks(q),0);const writtenMax=written.reduce((s,q)=>s+q.parts.reduce((n,p)=>n+selfMax(p),0),0);
  const graded=objective.filter(q=>current(q).marked===true);const obj=graded.reduce((s,q)=>s+score(q),0);
  let self=0, assessed=0,partCount=0;
  written.forEach(q=>q.parts.forEach((p,i)=>{const max=selfMax(p);if(max<=0)return;partCount++;const value=current(q).selfMarks[i];if(typeof value==='number'&&Number.isFinite(value)&&value>=0&&value<=max&&Number.isInteger(value*2)){self+=value;assessed++;}}));
  const target=document.getElementById('paper-score');target.replaceChildren(node('div','',`Automatically marked: ${fmt(obj)} / ${fmt(objectiveMax)} marks · ${graded.length} / ${objective.length} questions marked`));
  if(!hasObjective)target.replaceChildren();
  if(written.length){target.append(node('div','',`Written answers (self-assessed): ${fmt(self)} / ${fmt(writtenMax)} marks · ${assessed} / ${partCount} parts assessed`),node('strong','',`Combined practice total: ${fmt(obj+self)} / ${paper.totalMarks}`),node('div','mock-note','Unmarked work contributes zero to this running total. Written-answer marks are your assessment, not an automated judgement.'));}
 }
 function mark(q){current(q).marked=true;save();markViews.get(q.id)?.();updateScore();}
 function change(q){current(q).marked=false;save();markViews.get(q.id)?.();updateScore();}
 function addText(parent,text){parent.append(node('p','',text));}
 function addMemo(card,q){
  const memo=node('details','mock-memo');memo.append(node('summary','','Model answer and marking guide'));
  if(q.type==='essay')q.parts.forEach((part,i)=>{
   memo.append(node('h3','',`Part ${i+1} · ${part.marks} marks`));addText(memo,part.answer);
   const list=node('ul');part.rubric.forEach(text=>list.append(node('li','',text)));memo.append(list);
   (part.checks||[]).forEach(check=>addText(memo,`${check.prompt}: ${check.answer} · ${fmt(check.marks)} marks. ${check.explanation}`));
   const max=selfMax(part);if(max<=0)return;
   const self=node('div','mock-self');const label=node('label','',`Your self-assessed reasoning/drawing mark for part ${i+1} (0–${max}; automatic marks are counted separately)`);const input=node('input');Object.assign(input,{type:'number',min:'0',max:String(max),step:'0.5',id:`${q.id}-mark-${i}`});label.htmlFor=input.id;
   const value=current(q).selfMarks[i];if(typeof value==='number'&&Number.isFinite(value)&&value>=0&&value<=max&&Number.isInteger(value*2))input.value=String(value);
   const msg=node('p','mock-note');msg.setAttribute('role','status');
   input.addEventListener('input',()=>{const valid=input.value!==''&&input.validity.valid&&Number.isFinite(input.valueAsNumber);current(q).selfMarks[i]=valid?input.valueAsNumber:null;input.setAttribute('aria-invalid',String(input.value!==''&&!valid));msg.textContent=input.value!==''&&!valid?`Enter 0 to ${max} in half-mark steps. Invalid marks are not counted.`:'';save();updateScore();});
   self.append(label,input,msg);memo.append(self);
  });
  else if(q.type==='single'||q.type==='multi'){
   addText(memo,`Correct option${q.correct.length>1?'s':''}: ${q.correct.map(i=>String.fromCharCode(65+i)).join(', ')}.`);q.correct.forEach(i=>addText(memo,`${String.fromCharCode(65+i)}. ${q.options[i]}`));addText(memo,q.explanation);
   (q.optionExplanations||[]).forEach((text,i)=>addText(memo,`${String.fromCharCode(65+i)}. ${q.correct.includes(i)?'Correct':'Incorrect'}: ${text}`));
   if(q.type==='multi')addText(memo,`Scoring: +${fmt(q.marks/q.correct.length)} per correct selection, −${fmt(q.marks/q.correct.length)} per incorrect selection; minimum 0, maximum ${q.marks}.`);
  }else q.items.forEach((item,i)=>{memo.append(node('h3','',`${i+1}. ${q.type==='matching'?item.answer:item.answers.join(' / ')} · ${fmt(q.marks/q.items.length)} marks`));addText(memo,item.explanation);});
  card.append(memo);memoElements.push(memo);
 }
 function renderQuestion(q){
  const s=current(q),card=node('section','mock-question');card.id=q.id;
  const head=node('div','mock-qhead');head.append(node('h2','',`Question ${q.number}`),node('span','mock-marks',`${fmt(q.marks)} mark${q.marks===1?'':'s'}`));card.append(head);
  const names={single:q.options?.length===2?'True / False':'Single answer',multi:'Select all that apply · negative marking',matching:'Matching',cloze:'Sentence completion',short:'Short answer / letter',essay:'Structured written response'};
  card.append(node('p','mock-type',names[q.type]),node('p','mock-prompt',q.prompt));
  if(q.diagram){const figure=node('div','mock-diagram');figure.innerHTML=q.diagram;card.append(figure);addText(card,'Diagram is part of the question. On a narrow screen, scroll it horizontally to read all labels.');}
  if(['single','multi'].includes(q.type)){
   const fieldset=node('fieldset');fieldset.append(node('legend','',q.type==='multi'?'Select all correct options':'Select one option'));
   q.options.forEach((text,i)=>{const label=node('label','mock-option');const input=node('input');input.type=q.type==='single'?'radio':'checkbox';input.name=q.id;input.checked=s.answers.includes(i);input.addEventListener('change',()=>{s.answers=q.type==='single'?[i]:input.checked?[...new Set([...s.answers,i])]:s.answers.filter(x=>x!==i);change(q);});label.append(input,node('span','',`${String.fromCharCode(65+i)}. ${text}`));fieldset.append(label);});card.append(fieldset);
  }else if(q.type==='essay'){
   q.parts.forEach((part,i)=>{
    const block=node('div','mock-part');block.append(node('p','',part.prompt));
    (part.checks||[]).forEach((check,j)=>{
     const row=node('div','mock-row'),label=node('label','',`${check.prompt} · ${fmt(check.marks)} automatic marks`);let input;
     if(check.type==='select'){input=node('select');const blank=node('option','','Choose an answer');blank.value='';input.append(blank);check.options.forEach(text=>{const opt=node('option','',text);opt.value=text;input.append(opt);});}
     else{input=node('input');input.type='text';input.autocomplete='off';if(check.type==='number')input.inputMode='decimal';}
     const key=`${i}-${j}`;input.id=`${q.id}-check-${key}`;label.htmlFor=input.id;input.value=typeof s.checkAnswers[key]==='string'?s.checkAnswers[key]:'';
     input.addEventListener(check.type==='select'?'change':'input',()=>{s.checkAnswers[key]=input.value;change(q);});
     row.append(label,input);if(check.options)row.append(node('p','mock-print-bank',`Choices: ${check.options.join(' · ')}`));row.append(node('div','mock-print-space'));block.append(row);
    });
    const label=node('label','','Working / explanation (kept for review)'),textarea=node('textarea');textarea.id=`${q.id}-draft-${i}`;label.htmlFor=textarea.id;textarea.value=typeof s.drafts[i]==='string'?s.drafts[i]:'';textarea.addEventListener('input',()=>{s.drafts[i]=textarea.value;save();wordViews.forEach(fn=>fn());});block.append(label,textarea,node('div','mock-print-space'));card.append(block);
   });
   const word=node('p','mock-word-count');const update=()=>{const count=s.drafts.join(' ').trim().split(/\s+/).filter(Boolean).length;word.textContent=`${count} words${q.wordLimit?` · suggested maximum ${q.wordLimit}; no automatic penalty`:''}`;word.classList.toggle('mock-invalid',Boolean(q.wordLimit&&count>q.wordLimit));};wordViews.push(update);update();card.append(word);
  }else{
   if(q.type==='matching'){
    addText(card,'Choose the most precise match for each prompt. Each answer is intended to be used once; each row is marked independently.');
    card.append(node('p','mock-print-bank',`Answer bank: ${q.options.map((x,i)=>`${String.fromCharCode(65+i)}. ${x}`).join(' · ')}`));
   }
   q.items.forEach((item,i)=>{const row=node('div','mock-row'),label=node('label','',item.prompt);let input;
    if(q.type==='matching'){input=node('select');const blank=node('option','','Choose an answer');blank.value='';input.append(blank);q.options.forEach(text=>{const option=node('option','',text);option.value=text;input.append(option);});}
    else {input=node('input');input.type='text';input.autocomplete='off';}
    input.id=`${q.id}-answer-${i}`;label.htmlFor=input.id;input.value=typeof s.answers[i]==='string'?s.answers[i]:'';input.addEventListener(q.type==='matching'?'change':'input',()=>{s.answers[i]=input.value;change(q);});row.append(label,input,node('div','mock-print-space'));card.append(row);
   });
  }
  if(autoMarks(q)>0){
   const check=node('button','btn','Mark this question');check.type='button';check.addEventListener('click',()=>mark(q));const feedback=node('div','mock-result');feedback.setAttribute('role','status');
   const update=()=>{
    feedback.hidden=s.marked!==true;feedback.replaceChildren();if(s.marked!==true)return;
    feedback.append(node('p','',`${fmt(score(q))} / ${fmt(autoMarks(q))} automatic marks. Changing an answer clears this marking result.`));
    if(q.type==='essay')q.parts.forEach((p,i)=>(p.checks||[]).forEach((c,j)=>addText(feedback,`Part ${i+1} · ${c.prompt}: ${checkCorrect(c,s.checkAnswers[`${i}-${j}`])?'Correct':'Incorrect or unanswered'}. Answer: ${c.answer}. ${c.explanation}`)));
    else addText(feedback,'Open the marking guide for every answer and explanation.');
   };markViews.set(q.id,update);update();card.append(check,feedback);
  }
  addMemo(card,q);document.getElementById('paper-questions').append(card);
  const jump=node('a','',`Q${q.number} · ${fmt(q.marks)}`);jump.href='#'+q.id;document.getElementById('question-links').append(jump);
 }
 document.getElementById('paper-scope').textContent=`Scope: ${paper.scope}`;
 document.getElementById('paper-meta').textContent=`${paper.questions.length} questions · ${paper.totalMarks} marks · attempt all questions. ${paper.notes}`;
 const instructions=document.getElementById('instructions');
 addText(instructions,`Style reference: ${paper.reference}. The questions and diagrams in this paper are newly authored. Saved responses in the reference export were not treated as an authoritative memorandum.`);
 addText(instructions,paper.multiRule);
 if(hasObjective)addText(instructions,'Matching rows and short-answer subparts share their question’s marks equally. Short answers ignore case, extra spaces and a final full stop; accepted alternatives are shown in the marking guide. Equivalent written reasoning may earn credit under the rubric. Use the rubric to review a defensible alternative the exact-match marker does not recognise.');
 addText(instructions,'Fixed-answer calculation fields are automatically marked where supplied. Enter numbers in the units shown, without unit suffixes; properly grouped thousands commas are accepted. Rounding instructions and tolerances are stated in the paper. Automatic marks assess entered results, not the method in your working. Open-ended reasoning and drawings use separate self-assessed marks and are not automatically judged. Any word maximum is practice guidance. Blank printing omits saved answers and marking guides; marking-guide printing includes answers without private drafts.');
 addText(instructions,'Some topic guides are general coverage because lecture notes were unavailable. CT4 is limited to L28–L33 plus L35 revision. ST2 samples L17–L33 and L35, including existing SOA and Microservices material.');
 paper.questions.forEach(renderQuestion);updateScore();status.textContent='Drafts, selections and self-assessment save locally for this paper.';
 document.getElementById('mark-all').textContent='Auto-mark answers';
 document.getElementById('mark-all').addEventListener('click',()=>{paper.questions.filter(q=>autoMarks(q)>0).forEach(q=>{current(q).marked=true;markViews.get(q.id)();});save();updateScore();});
 document.getElementById('show-memos').addEventListener('click',()=>memoElements.forEach(m=>m.open=true));
 document.getElementById('hide-memos').addEventListener('click',()=>memoElements.forEach(m=>m.open=false));
 document.getElementById('reset-paper').addEventListener('click',()=>{if(window.confirm('Clear only this paper’s answers, drafts and self-assessed marks?')){state={};save();location.reload();}});
 let printState=null;
 function restorePrint(){if(!printState)return;memoElements.forEach((m,i)=>m.open=printState[i]);document.body.classList.remove('print-memo');printState=null;}
 function printPaper(withMemo){printState=memoElements.map(m=>m.open);document.body.classList.toggle('print-memo',withMemo);memoElements.forEach(m=>m.open=withMemo);window.print();}
 addEventListener('afterprint',restorePrint);
 document.getElementById('print-paper').addEventListener('click',()=>printPaper(false));
 document.getElementById('print-memo').addEventListener('click',()=>printPaper(true));
})();
