(()=>{
 'use strict';
 const section=document.getElementById('architecture-revision');
 if(!section)return;
 const cards=[...section.querySelectorAll('.atlas-card')];
 const filter=document.getElementById('atlas-filter');
 const practice=document.getElementById('atlas-practice');
 const jump=document.getElementById('atlas-jump');
 const updateFilter=()=>{
  let count=0;
  for(const card of cards){
   card.hidden=filter.value!=='all'&&card.dataset.architectureCategory!==filter.value;
   if(!card.hidden)count++;
  }
  document.getElementById('atlas-count').textContent=count+' diagrams';
 };
 filter.addEventListener('change',updateFilter);
 practice.addEventListener('click',()=>{
  const hidden=section.classList.toggle('practice');
  practice.setAttribute('aria-pressed',String(hidden));
  practice.textContent=hidden?'Reveal diagrams':'Hide diagrams to practise';
 });
 jump.addEventListener('change',()=>{
  const card=cards.find(card=>card.id==='arch-'+jump.value);
  if(!card)return;
  filter.value='all';
  updateFilter();
  card.querySelector('.atlas-extra').open=true;
  location.hash=card.id;
  card.scrollIntoView({block:'start'});
  card.setAttribute('tabindex','-1');
  card.focus({preventScroll:true});
 });
})();
