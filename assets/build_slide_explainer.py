#!/usr/bin/env python3
"""Build the offline slide viewer from rendered PDFs and handwritten per-page notes."""
from pathlib import Path
import json, hashlib
ROOT=Path(__file__).resolve().parent.parent
ASSETS=ROOT/'assets'
SLIDES=ROOT/'slide-explainer'
TITLES={'L17':'Design Systems and CI','L18':'Domain Modelling and Architectures','L19':'Software Testing in Practice','L20':'Designed for Humans','L21':'DevOps and DevSecOps','L22':'Practical Architectural Design','L23':'Architecture in Practice','L24':'Security Testing','L25':'Service Contracts','L27':'Microservices','L28':'Deployment Diagrams','L30':'Software Quality Assurance'}
def build():
    extracted=json.loads((SLIDES/'extracted.json').read_text())
    root_pdfs={p.name for p in ROOT.parent.glob('*.pdf')}
    assert {d['file'] for d in extracted}==root_pdfs, 'PDF inventory changed: re-extract sources and update notes.'
    decks=[];markdown=['# Every slide, explained','', 'Plain-language explanations of every PDF page in the workspace root. Page numbers refer to PDF order, including introductions and closing slides. Examples are teaching illustrations, not extra content claimed to be on the slides.','']
    for d in extracted:
        source=ROOT.parent/d['file']
        sha=hashlib.sha256(source.read_bytes()).hexdigest()
        assert d.get('sourceSha256')==sha, f"Source changed: re-extract {d['file']}"
        lines=(SLIDES/'notes'/f"{d['id']}.txt").read_text().splitlines()
        assert len(lines)==len(d['pages']), f"Explanation count mismatch: {d['id']}"
        deck={'id':d['id'],'title':TITLES[d['id']],'file':d['file'],'sourceSha256':sha,'slides':[]}
        markdown += [f"## {d['id']} - {deck['title']}",'',f"Source: [{d['file']}](../../{d['file'].replace(' ','%20')})",'']
        for page,line in zip(d['pages'],lines):
            fields=line.split(' || ')
            assert len(fields)==4 and all(f.strip() for f in fields), f"Malformed explanation {d['id']}:{page['number']}"
            title,point,meaning,example=fields
            assert (ROOT/page['image']).is_file(), f"Missing image: {page['image']}"
            slide={**page,'key':f"{d['id']}-{page['number']}",'title':title,'point':point,'meaning':meaning,'example':example,'missing':title.startswith('Unavailable Menti')}
            deck['slides'].append(slide)
            markdown += [f"### Slide {page['number']}: {title}",'',f'**The point:** {point}','',meaning,'',f'**Simple example:** {example}','']
        decks.append(deck)
    data={'decks':decks,'slideCount':sum(len(d['slides']) for d in decks)}
    (SLIDES/'explanations.json').write_text(json.dumps(data,ensure_ascii=False,indent=2)+'\n')
    encoded=json.dumps(data,ensure_ascii=False).replace('</','<\\/')
    from build_architecture_atlas import build as build_atlas
    section, atlas_css, atlas_js = build_atlas()
    template=(ASSETS/'slide-explainer.html').read_text()
    template=template.replace('/* SLIDE_CSS */',(ASSETS/'slide-explainer.css').read_text()+atlas_css).replace('/* SLIDE_DATA */',encoded).replace('/* SLIDE_JS */',(ASSETS/'slide-explainer.js').read_text()+atlas_js)
    template=template.replace('<!-- ARCHITECTURE_SECTION -->',section)
    (ROOT/'slide-explainer.html').write_text(template)
    (SLIDES/'all-explanations.md').write_text('\n'.join(markdown)+'\n')
    print(f"Built slide-explainer.html: {len(decks)} PDFs, {data['slideCount']} individually explained pages.")
if __name__=='__main__':build()
