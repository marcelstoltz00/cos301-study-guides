import Foundation
import PDFKit
import AppKit
import CryptoKit
guard CommandLine.arguments.count == 2 else { fatalError("Usage: swift extract_slides.swift /absolute/path/to/CT3") }
let root=URL(fileURLWithPath: CommandLine.arguments[1])
let out=root.appendingPathComponent("study-guides/slide-explainer")
try FileManager.default.createDirectory(at:out,withIntermediateDirectories:true)
var decks:[[String:Any]]=[]
let files=try FileManager.default.contentsOfDirectory(at:root,includingPropertiesForKeys:nil).filter{$0.pathExtension.lowercased()=="pdf"}.sorted{$0.lastPathComponent.localizedStandardCompare($1.lastPathComponent) == .orderedAscending}
for file in files {
 guard let doc=PDFDocument(url:file) else {continue}
 let id=file.lastPathComponent.components(separatedBy:" ")[0].components(separatedBy:"_")[0]
 let images=out.appendingPathComponent("images/\(id)")
 try FileManager.default.createDirectory(at:images,withIntermediateDirectories:true)
 var pages:[[String:Any]]=[]
 for i in 0..<doc.pageCount {
  guard let page=doc.page(at:i) else {continue}
  let text=page.string ?? ""
  let bounds=page.bounds(for:.mediaBox)
  let image=page.thumbnail(of:NSSize(width:1600,height:1600*bounds.height/bounds.width),for:.mediaBox)
  guard let tiff=image.tiffRepresentation,let bitmap=NSBitmapImageRep(data:tiff),let png=bitmap.representation(using:.png,properties:[:]) else {fatalError("Render failed")}
  let name=String(format:"%03d.png",i+1)
  try png.write(to:images.appendingPathComponent(name))
  pages.append(["number":i+1,"text":text,"image":"slide-explainer/images/\(id)/\(name)","width":bounds.width,"height":bounds.height])
 }
 let sourceHash=SHA256.hash(data:try Data(contentsOf:file)).map{String(format:"%02x",$0)}.joined()
 decks.append(["id":id,"file":file.lastPathComponent,"pages":pages,"sourceSha256":sourceHash])
 print("\(id): \(doc.pageCount) pages")
}
let data=try JSONSerialization.data(withJSONObject:decks,options:[.prettyPrinted,.sortedKeys])
try data.write(to:out.appendingPathComponent("extracted.json"))
