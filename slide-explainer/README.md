# Every slide, explained

Open [the HTML viewer](../slide-explainer.html). It works directly from disk without a server or internet connection. Keep the `slide-explainer/images/` directory beside the HTML page in its existing location.

The viewer covers **every page of all 12 PDFs currently in the workspace root: 358 pages**. It displays an unchanged raster rendering of each original PDF page beside an individually written plain-language point, explanation and example. PDF page numbering includes title, company, exercise, repeated-diagram and closing pages; printed slide numbers may differ.

Use the lecture selector and slide list, search across all lectures, jump to a number or use previous/next and the arrow keys. Enlarge a slide for diagrams and code, or open the original PDF for deeper zoom. Text-size controls affect explanations. Understood markers and the last slide save locally in this browser; they do not sync or send information elsewhere.

| PDF | Pages |
|---|---:|
| L17 - Design Systems and CI.pdf | 32 |
| L18 - Domain Modelling and Architectures(1).pdf | 34 |
| L19 - Software testing in Practice.pdf | 22 |
| L20 - Designed for Humans.pdf | 30 |
| L21 - DevOps and DevSecOps.pdf | 29 |
| L22_Practical_Architectural_Design.pdf | 40 |
| L23 - Architecture in Practice.pdf | 22 |
| L24 - Security Testing.pdf | 10 |
| L25 - Service Contracts.pdf | 14 |
| L27 - Microservices.pdf | 43 |
| L28 - Deployment.pdf | 40 |
| L30 - Software Quality Assurance.pdf | 42 |
| **Total** | **358** |

## Source limits

Nine L21 pages (2, 4, 5, 10, 11, 19, 20, 23 and 24) contain only a Menti loading error. Their original interactive material is not in the PDF. The viewer preserves each page and explains that limit instead of inventing its contents.

The L24 PDF introduces a live red/blue-team demonstration but does not document its steps, vulnerabilities or findings. The explanation defines those team labels as background and does not claim to reconstruct the demonstration. Company introductions, recruitment pages and further-reading slides are explained as such.

Explanations are teaching paraphrases based on the supplied pages and their diagrams. Simple examples are original illustrations, not claims about examples printed on the slides. Where a slide oversimplifies a guarantee, uses unsupported presentation figures or has a diagram ambiguity, the explanation identifies the practical limit. Vendor names, policy references and opportunities remain original lecture context rather than verified current recommendations or legal guidance.

L22 is named by its workspace filename; the internal title calls it Lecture 13. No PDFs for absent lecture numbers are invented. This viewer follows actual root PDFs, rather than the broader ST2 topic list.

## Maintaining the viewer

- `notes/L##.txt` contains one handwritten record per PDF page in exact order: title, point, explanation and example, separated by ` || `.
- `extracted.json` stores PDF text, page dimensions, rendered-image paths and source SHA-256 fingerprints.
- `images/L##/###.png` contains the 1,600-pixel-wide original-page renderings. Image-only pages were visually inspected.
- `explanations.json` and [all-explanations.md](all-explanations.md) are generated complete content exports.
- `../assets/slide-explainer.html`, `.css` and `.js` provide the viewer template and behaviour.
- `../assets/build_slide_explainer.py` validates source inventory/fingerprints, page/note counts and image paths before generating the HTML and exports. The main study-guide builder also invokes it.

Rebuild after editing explanations or viewer assets:

```sh
python3 study-guides/assets/build_slide_explainer.py
```

For changed/new source PDFs, render/extract using macOS PDFKit (no package download required):

```sh
SWIFT_MODULECACHE_PATH=/private/tmp/ct3-swift-cache \
CLANG_MODULE_CACHE_PATH=/private/tmp/ct3-clang-cache \
swift study-guides/assets/extract_slides.swift /absolute/path/to/CT3
```

Then visually inspect the pages, update the explanation records and lecture-title mapping as necessary, and rebuild. The source-fingerprint check prevents silently attaching old explanations to changed PDFs.
