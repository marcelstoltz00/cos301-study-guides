#!/usr/bin/env python3
"""Generate matching SVG study diagrams and editable, uncompressed draw.io pages."""
import json,html,math,xml.etree.ElementTree as ET
from pathlib import Path
ROOT=Path(__file__).resolve().parent.parent
OUT=ROOT/'architecture-diagrams'
COLORS={'ui':('#eeeafd','#6751a6'),'app':('#e4f4ee','#257c64'),'db':('#fff2d6','#ad7927'),'infra':('#e6eff9','#3c6d9c')}
def wrapped_label(n):
 import textwrap
 return '\n'.join('\n'.join(textwrap.wrap(line,width=max(12,int((n['w']-20)/9)),break_long_words=False)) for line in n['label'].split('\n'))
def anchor(n,target):
 cx,cy=n['x']+n['w']/2,n['y']+n['h']/2;dx,dy=target[0]-cx,target[1]-cy
 scale=min(n['w']/2/abs(dx) if dx else math.inf,n['h']/2/abs(dy) if dy else math.inf)
 return [cx+dx*scale,cy+dy*scale]
def route(edge,byid):
 a,b=byid[edge['source']],byid[edge['target']]
 mids=edge.get('points',[]);ac=[a['x']+a['w']/2,a['y']+a['h']/2];bc=[b['x']+b['w']/2,b['y']+b['h']/2]
 points=[anchor(a,mids[0] if mids else bc),*mids,anchor(b,mids[-1] if mids else ac)]
 return points
def caption(e,points,byid):
 if 'caption' in e:
  return *e['caption'],min(300,len(e['label'])*7.2+12)
 a,b=max(zip(points,points[1:]),key=lambda p:math.dist(*p))
 x=(a[0]+b[0])/2;y=(a[1]+b[1])/2
 if abs(a[0]-b[0])<15:x+=80
 else:
  y-=10
  if abs(a[1]-b[1])<15 and abs(a[0]-b[0])<len(e['label'])*7.2+28:
   y=min(byid[e['source']]['y'],byid[e['target']]['y'])-17
 w=min(300,len(e['label'])*7.2+12)
 return max(w/2+8,min(960-w/2-8,x)),y,w

def midpoint(points):
 lengths=[math.dist(a,b) for a,b in zip(points,points[1:])];remaining=sum(lengths)/2
 for (a,b),length in zip(zip(points,points[1:]),lengths):
  if remaining<=length:
   f=remaining/length if length else 0
   return a[0]+(b[0]-a[0])*f,a[1]+(b[1]-a[1])*f
  remaining-=length
 return points[-1]

def svg(item):
 esc=html.escape;parts=[f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 500" role="img" aria-labelledby="title desc"><title id="title">{esc(item["title"])}</title><desc id="desc">{esc(item["meaning"])}</desc>', '<defs><marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="#566c7d"/></marker></defs><rect width="960" height="500" fill="white"/>']
 for g in item['groups']:
  parts += [f'<rect x="{g["x"]}" y="{g["y"]}" width="{g["w"]}" height="{g["h"]}" rx="12" fill="#f7f9fb" stroke="#91a7b5" stroke-dasharray="6 4"/>',f'<text x="{g["x"]+14}" y="{g["y"]+23}" font-family="Arial,sans-serif" font-size="14" fill="#4b6272">{esc(g["label"])}</text>']
 byid={n['id']:n for n in item['nodes']};labels=[]
 for e in item['edges']:
  points=route(e,byid);path='M '+' L '.join(f'{x:.1f} {y:.1f}' for x,y in points)
  dash=' stroke-dasharray="7 5"' if e.get('asynchronous',False) else ''
  parts.append(f'<path d="{path}" fill="none" stroke="#566c7d" stroke-width="2"{dash}/>')
  tip=points[-1];prev=points[-2];angle=math.atan2(tip[1]-prev[1],tip[0]-prev[0]);bx=tip[0]-12*math.cos(angle);by=tip[1]-12*math.sin(angle)
  arrow=[tip,[bx+5*math.sin(angle),by-5*math.cos(angle)],[bx-5*math.sin(angle),by+5*math.cos(angle)]]
  parts.append('<polygon points="'+' '.join(f'{x:.1f},{y:.1f}' for x,y in arrow)+'" fill="#566c7d"/>')
  if e['label']:
   x,y,w=caption(e,points,byid)
   label=e['label']
   labels += [f'<rect x="{x-w/2:.1f}" y="{y-14:.1f}" width="{w:.1f}" height="22" rx="4" fill="white" opacity=".96"/>',f'<text x="{x:.1f}" y="{y+1:.1f}" text-anchor="middle" font-family="Arial,sans-serif" font-size="14" fill="#42596a">{esc(label)}</text>']
 for n in item['nodes']:
  fill,stroke=COLORS[n['kind']];x,y,w,h=n['x'],n['y'],n['w'],n['h']
  parts.append(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{16 if n["kind"]=="db" else 8}" fill="{fill}" stroke="{stroke}" stroke-width="2"/>')
  lines=wrapped_label(n).split('\n');start=y+h/2-(len(lines)-1)*10+6
  for i,line in enumerate(lines):parts.append(f'<text x="{x+w/2}" y="{start+i*20}" text-anchor="middle" font-family="Arial,sans-serif" font-size="16" font-weight="600" fill="#223c4d">{esc(line)}</text>')
 parts+=labels;parts.append('</svg>');return ''.join(parts)
def drawio_page(item):
 diagram=ET.Element('diagram',id=item['id'],name=item['title'])
 model=ET.SubElement(diagram,'mxGraphModel',dx='960',dy='500',grid='1',gridSize='10',guides='1',tooltips='1',connect='1',arrows='1',fold='1',page='1',pageScale='1',pageWidth='1100',pageHeight='700',math='0',shadow='0')
 root=ET.SubElement(model,'root');ET.SubElement(root,'mxCell',id='0');ET.SubElement(root,'mxCell',id='1',parent='0')
 def vertex(id,label,x,y,w,h,style):
  cell=ET.SubElement(root,'mxCell',id=id,value=label.replace('\n','<br>'),style=style,vertex='1',parent='1');ET.SubElement(cell,'mxGeometry',x=str(x),y=str(y),width=str(w),height=str(h),attrib={'as':'geometry'})
 for i,g in enumerate(item['groups']):vertex('boundary-'+str(i),g['label'],g['x'],g['y'],g['w'],g['h'],'rounded=1;whiteSpace=wrap;html=1;fillColor=#f7f9fb;strokeColor=#91a7b5;dashed=1;verticalAlign=top;align=left;spacingTop=10;spacingLeft=10;fontSize=14;')
 for n in item['nodes']:
  fill,stroke=COLORS[n['kind']]
  vertex(n['id'],wrapped_label(n),n['x'],n['y'],n['w'],n['h'],f'rounded=1;whiteSpace=wrap;html=1;fillColor={fill};strokeColor={stroke};fontColor=#223c4d;fontSize=16;fontStyle=1;strokeWidth=2;')
 for i,e in enumerate(item['edges']):
  style='edgeStyle=none;rounded=0;html=1;endArrow=block;endFill=1;strokeColor=#566c7d;strokeWidth=2;fontSize=14;labelBackgroundColor=#ffffff;'
  if e.get('asynchronous',False):style+='dashed=1;'
  cell=ET.SubElement(root,'mxCell',id='edge-'+str(i),value=e['label'],style=style,edge='1',parent='1',source=e['source'],target=e['target']);geo=ET.SubElement(cell,'mxGeometry',relative='1',attrib={'as':'geometry'})
  if e['label']:
   byid={n['id']:n for n in item['nodes']};points=route(e,byid)
   x,y,_=caption(e,points,byid);mx,my=midpoint(points)
   ET.SubElement(geo,'mxPoint',x=str(round(x-mx,1)),y=str(round(y-my,1)),attrib={'as':'offset'})
  if e['points']:
   arr=ET.SubElement(geo,'Array',attrib={'as':'points'})
   for x,y in e['points']:ET.SubElement(arr,'mxPoint',x=str(x),y=str(y))
 return diagram

def build():
 data=json.loads((ROOT/'data/architecture-atlas.json').read_text());OUT.mkdir(exist_ok=True)
 combined=ET.Element('mxfile',host='app.diagrams.net',type='device')
 cards=[]
 for item in data['items']:
  (OUT/(item['id']+'.svg')).write_text(svg(item))
  page=drawio_page(item);combined.append(page)
  single=ET.Element('mxfile',host='app.diagrams.net',type='device');single.append(drawio_page(item));ET.ElementTree(single).write(OUT/(item['id']+'.drawio'),encoding='utf-8',xml_declaration=True)
  esc=html.escape;id=item['id']
  steps=''.join(f'<li>{esc(s)}</li>' for s in item['steps'])
  responsibilities=''.join(f'<dt>{esc(n["label"].replace(chr(10)," · "))}</dt><dd>{esc(n["responsibility"])}</dd>' for n in item['nodes'])
  refs=item.get('sources',[item['source']])
  source_links=' · '.join(f'<a href="slide-explainer.html#{ref}">Lecture {ref.split("-")[0][1:]} · slide {ref.split("-")[1]}</a>' for ref in refs)
  boundaries=''
  if item['groups']:
   boundaries='<p class="atlas-boundaries"><strong>Dashed enclosures:</strong> '+esc(item['boundaryExplanation'])+'</p>'
  cards.append(f'''<article class="atlas-card" data-architecture-category="{esc(item['category'])}" id="arch-{id}">
<p class="atlas-category">{esc(item['category'])}</p><h3>{esc(item['title'])}</h3><p class="atlas-memory">{esc(item['memory'])}</p>
<a class="atlas-image" href="architecture-diagrams/{id}.svg" target="_blank" rel="noopener" aria-label="Enlarge {esc(item['title'])} diagram"><img src="architecture-diagrams/{id}.svg" alt="{esc(item['title'])}: {esc(item['memory'])}" loading="lazy" width="960" height="500"></a>
<details class="atlas-extra"><summary>Explanation, responsibilities and drawing guide</summary><div class="atlas-explanation"><h4>In easy terms</h4><p>{esc(item['explanation'])}</p><h4>Follow the diagram</h4><p>{esc(item['walkthrough'])}</p><h4>What each part does</h4><dl class="atlas-responsibilities">{responsibilities}</dl>{boundaries}</div>
<div class="atlas-drawing-guide"><h4>Draw in this order</h4><ol>{steps}</ol><h4>Use it when</h4><p>{esc(item['use'])}</p><h4>Cost / trade-off</h4><p>{esc(item['cost'])}</p><h4>Common exam mistake</h4><p>{esc(item['trap'])}</p></div></details>
<div class="atlas-actions"><a href="architecture-diagrams/{id}.drawio" download>Download editable draw.io</a><details class="atlas-source-links"><summary>Related slides</summary><p>{source_links}</p></details></div>
</article>''')
 ET.ElementTree(combined).write(OUT/'all-architectures.drawio',encoding='utf-8',xml_declaration=True)
 jump_options=''.join(f'<option value="{item["id"]}">{html.escape(item["title"])}</option>' for item in data['items'])
 coverage_rows=''.join(f'<tr><td><a href="#arch-{item["id"]}">{html.escape(item["title"])}</a></td><td>{html.escape(item["category"])}</td><td>'+ ' · '.join(f'<a href="slide-explainer.html#{ref}">Lecture {ref.split("-")[0][1:]} / {ref.split("-")[1]}</a>' for ref in item.get('sources',[item['source']]))+'</td></tr>' for item in data['items'])
 coverage=f'<details class="atlas-coverage"><summary>Slide coverage: which diagram covers which topic?</summary><p>{html.escape(data["coverageNote"])}</p><p>The coordinator-and-workers entry is a supplementary comparison. The primary-and-replica entry matches the overview’s master–slave database picture. Model validation is a supporting arrangement for the model component discussed in the slides. Some embedded polling pages in lecture 21 contain only error messages and have no recoverable architecture content.</p><div class="atlas-table-wrap"><table><thead><tr><th>Topic</th><th>Type</th><th>Source slides</th></tr></thead><tbody>{coverage_rows}</tbody></table></div></details>'
 section=f'''<section id="architecture-revision" class="architecture-atlas" aria-labelledby="atlas-heading">
<div class="atlas-intro"><p class="eyebrow">SEMESTER TEST · DRAWING REVISION</p><h2 id="atlas-heading">Remember the shape. Explain the reason.</h2><p>{len(cards)} diagrams covering the architecture styles, user-interface patterns and supporting patterns, deployment arrangements and combined examples in the supplied slides. These are simplified practice diagrams, not copies of the lecture figures.</p><p><a href="architecture-diagrams/all-architectures.drawio" download>Download all diagrams as one draw.io file</a> · <a href="architecture-atlas.html">Open this section on its own ↗</a></p></div>
<div class="atlas-guide"><strong>In draw.io:</strong> Open the downloaded .drawio file using File → Open From → Device. Each diagram is a separate page. For practice, hide the diagrams, redraw from the memory cue, then reveal and compare. Name concepts first; add technologies only if the question asks for implementation/deployment details.<br><strong>Legend:</strong> purple = user interface or client; green = application/domain; amber = data; blue = routing/messaging/infrastructure. Arrowheads indicate the labelled interaction; results may return over the same call. Dashed arrows carry messages without waiting for the receiving business work to finish. Dashed enclosures are boundaries. Colours are optional in an exam.</div>
{coverage}
<div class="atlas-toolbar"><label for="atlas-jump">Find architecture</label><select id="atlas-jump"><option value="">Choose an architecture…</option>{jump_options}</select><label for="atlas-filter">Show</label><select id="atlas-filter"><option value="all">All diagrams</option><option>Architecture</option><option>Architecture example</option><option>Supporting pattern</option><option>Deployment pattern</option></select><button id="atlas-practice" type="button" aria-pressed="false">Hide diagrams to practise</button><span id="atlas-count" role="status">{len(cards)} diagrams</span></div>
<div class="atlas-grid">{''.join(cards)}</div>
<p class="atlas-end">Before submitting: name the responsibilities, label communication, show state ownership, explain a trade-off and connect the design to the scenario. For deployment diagrams also show environment, replica counts, failure domains, trust boundaries and recovery assumptions.</p>
</section>'''
 (OUT/'section.html').write_text(section)
 css=(ROOT/'assets/architecture-atlas.css').read_text();js=(ROOT/'assets/architecture-atlas.js').read_text()
 page=f'''<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Architecture drawing revision</title><style>{css}</style></head><body class="atlas-standalone"><nav class="atlas-nav"><a href="slide-explainer.html">← Slide viewer</a><a href="index.html">Study guides</a></nav><main>{section}</main><script>{js}</script></body></html>'''
 (ROOT/'architecture-atlas.html').write_text(page)
 print(f'Built architecture atlas: {len(cards)} SVG diagrams and {len(cards)} editable draw.io files + combined file.')
 return section,css,js
if __name__=='__main__':build()
