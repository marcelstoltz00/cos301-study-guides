(()=>{
'use strict';
const data=JSON.parse(document.getElementById('slide-data').textContent);
const decks=data.decks, flat=decks.flatMap(d=>d.slides.map(s=>({...s,deck:d}))), $=id=>document.getElementById(id);
const storageKey='cos301-slide-explainer-v1';let saved={};let storageOK=true;
try{saved=JSON.parse(localStorage.getItem(storageKey))||{};if(typeof saved!=='object'||Array.isArray(saved))saved={};}catch{storageOK=false;}
let understood=new Set(Array.isArray(saved.understood)?saved.understood.filter(k=>flat.some(s=>s.key===k)):[]);
let fontSize=Number.isFinite(saved.fontSize)?Math.min(23,Math.max(15,saved.fontSize)):17;
let active=flat[0], query='', listButtons=[];
const searchText=s=>([s.deck.id,s.deck.title,s.number,s.title,s.point,s.meaning,s.example,s.text].join(' ')).toLowerCase();
const hashSlide=()=>{try{return flat.find(s=>s.key===decodeURIComponent(location.hash.slice(1)));}catch{return undefined;}};
function persist(){try{localStorage.setItem(storageKey,JSON.stringify({understood:[...understood],last:active.key,fontSize}));storageOK=true;}catch{storageOK=false;} $('save-status').textContent=storageOK?'Saved on this browser.':'Browser storage unavailable.';}
function progress(){const count=active.deck.slides.filter(s=>understood.has(s.key)).length;$('lecture-progress').textContent=`${count}/${active.deck.slides.length} understood`;$('all-progress').textContent=`${understood.size}/${flat.length} total`;$('progress').max=active.deck.slides.length;$('progress').value=count;$('understood').setAttribute('aria-pressed',String(understood.has(active.key)));$('understood').textContent=understood.has(active.key)?'✓ Understood · click to undo':'○ Mark as understood';}
function buildList(){
const candidates=query?flat.filter(s=>query.split(/\s+/).every(term=>searchText(s).includes(term))):flat.filter(s=>s.deck.id===active.deck.id);
$('list-caption').textContent=query?`${candidates.length} matching slides · all lectures`:`${active.deck.slides.length} slides in ${active.deck.id}`;
$('empty-search').hidden=candidates.length!==0;$('slide-list').replaceChildren();listButtons=[];
for(const s of candidates){const b=document.createElement('button');b.type='button';b.className='slide-item'+(s.key===active.key?' active':'');b.setAttribute('aria-label',`${s.deck.id}, slide ${s.number}: ${s.title}${understood.has(s.key)?', understood':''}`);if(s.key===active.key)b.setAttribute('aria-current','page');const number=document.createElement('span');number.className='slide-number';number.textContent=String(s.number).padStart(2,'0');const title=document.createElement('span');title.className='item-title';if(query){const small=document.createElement('small');small.textContent=s.deck.id;title.append(small);}title.append(document.createTextNode(s.title));const read=document.createElement('span');read.className='read-check';read.textContent=understood.has(s.key)?'✓':'';read.setAttribute('aria-hidden','true');b.append(number,title,read);b.addEventListener('click',()=>show(s));$('slide-list').append(b);listButtons.push(b);}
}
function show(s,updateHash=true){
active=s;const d=s.deck;$('lecture').value=d.id;$('lecture-name').textContent=d.id+' / '+d.title;$('slide-title').textContent=s.title;$('position').textContent=`Slide ${s.number} of ${d.slides.length} · PDF page ${s.number}`;
$('jump').value=s.number;$('jump').max=d.slides.length;$('jump').setAttribute('aria-label',`Go to slide 1 to ${d.slides.length}`);$('jump-total').textContent=`/ ${d.slides.length}`;
$('source-link').href='../'+encodeURIComponent(d.file)+`#page=${s.number}`;$('point').textContent=s.point;$('meaning').textContent=s.meaning;$('example').textContent=s.example;
$('source-text').textContent=s.text.trim()||'No selectable text was extracted. This page was read from its rendered image; use the explanation and original slide above.';
$('source-warning').hidden=!s.missing;$('source-warning').textContent=s.missing?'Source limitation: this PDF page shows a Menti loading error. The original interactive content is not included.':'';
$('image-error').hidden=true;$('slide-image').alt=`${d.id}, original PDF page ${s.number}: ${s.title}`;$('slide-image').src=s.image;
const idx=flat.findIndex(x=>x.key===s.key);$('previous').disabled=idx===0;$('next').disabled=idx===flat.length-1;$('previous').textContent=s.number===1&&idx>0?'← Previous lecture':'← Previous';$('next').textContent=s.number===d.slides.length&&idx<flat.length-1?'Next lecture →':'Next →';
progress();buildList();persist();if(updateHash&&location.hash.slice(1)!==s.key)location.hash=s.key;
const current=$('slide-list').querySelector('[aria-current="page"]');if(current)current.scrollIntoView({block:'nearest'});
}
function move(delta){const idx=flat.findIndex(s=>s.key===active.key);if(flat[idx+delta])show(flat[idx+delta]);}
function jump(){const n=Number($('jump').value);if(Number.isInteger(n)&&n>=1&&n<=active.deck.slides.length){$('jump').setCustomValidity('');show(flat.find(s=>s.deck.id===active.deck.id&&s.number===n));}else{$('jump').setCustomValidity(`Choose a whole slide number from 1 to ${active.deck.slides.length}.`);$('jump').reportValidity();}}
function enlarge(){const d=$('image-dialog');$('enlarged-image').src=active.image;$('enlarged-image').alt=$('slide-image').alt;$('dialog-title').textContent=`${active.deck.id} · Slide ${active.number} · ${active.title}`;$('full-image').href=active.image;if(typeof d.showModal==='function')d.showModal();else window.open(active.image,'_blank','noopener');}
$('library-meta').textContent=`${decks.length} PDFs · ${flat.length} slides · explained individually`;
for(const d of decks){const o=document.createElement('option');o.value=d.id;o.textContent=`${d.id} · ${d.title} (${d.slides.length})`;$('lecture').append(o);}
$('lecture').addEventListener('change',()=>{query='';$('search').value='';$('clear-search').hidden=true;show(flat.find(s=>s.deck.id===$('lecture').value));});
$('search').addEventListener('input',()=>{query=$('search').value.trim().toLowerCase();$('clear-search').hidden=!query;buildList();});
$('clear-search').addEventListener('click',()=>{$('search').value='';query='';$('clear-search').hidden=true;buildList();$('search').focus();});
$('previous').addEventListener('click',()=>move(-1));$('next').addEventListener('click',()=>move(1));$('jump-go').addEventListener('click',jump);$('jump').addEventListener('input',()=>$('jump').setCustomValidity(''));$('jump').addEventListener('keydown',e=>{if(e.key==='Enter')jump();});
$('understood').addEventListener('click',()=>{understood.has(active.key)?understood.delete(active.key):understood.add(active.key);progress();buildList();persist();});
$('enlarge').addEventListener('click',enlarge);$('image-button').addEventListener('click',enlarge);$('close-dialog').addEventListener('click',()=>$('image-dialog').close());
$('image-dialog').addEventListener('click',e=>{if(e.target===$('image-dialog')){$('image-dialog').close();}});
$('slide-image').addEventListener('error',()=>$('image-error').hidden=false);
function font(delta){fontSize=Math.min(23,Math.max(15,fontSize+delta));document.documentElement.style.setProperty('--notes-size',fontSize+'px');persist();}
$('smaller').addEventListener('click',()=>font(-1));$('larger').addEventListener('click',()=>font(1));font(0);
addEventListener('keydown',e=>{if(['INPUT','TEXTAREA','SELECT'].includes(document.activeElement?.tagName)||$('image-dialog').open||e.altKey||e.metaKey||e.ctrlKey)return;if(e.key==='ArrowRight'){e.preventDefault();move(1);}if(e.key==='ArrowLeft'){e.preventDefault();move(-1);}});
addEventListener('hashchange',()=>{const s=hashSlide();if(s&&s.key!==active.key)show(s,false);});
if(matchMedia('(max-width:720px)').matches)document.querySelector('.slide-navigation').open=false;
show(hashSlide()||flat.find(s=>s.key===saved.last)||flat[0]);
})();
