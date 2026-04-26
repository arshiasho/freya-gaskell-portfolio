# Project Page Template — Freya Gaskell Portfolio

This document describes how to build an individual project page that matches the pattern established by `projects/the-feminine-dandy.html`. Follow it when adding detail pages for the other five projects (Between Seasons, Familiar Spaces, Modern Dandy, After Hours, Commercial Design).

---

## 1. Input the designer provides

For each project you will usually receive:

1. A **PDF** (landscape, one "page" per conceptual spread: intro, mood board, research, development, tech packs, line-up, final photos).
2. An **image folder** under `img/<project-slug>/` containing either:
   - Pre-flattened full-page spreads (PNG exports from the PDF), AND/OR
   - Raw photographs used on the intro / line-up / final pages.

The numbers stamped in the bottom corner of each PDF page line up with image filenames in the folder (e.g. PDF page label `3` = `IMAGE 3.png`).

---

## 2. Asset preparation (do this first, once per project)

Before writing any HTML, clean the asset folder so URLs are reliable.

1. Rename the folder to lowercase kebab-case: `img/The Project Name/` → `img/the-project-name/`.
2. Delete `.DS_Store`.
3. Rename files to a predictable scheme:
   - Photographs: `01.jpg`, `02.jpg`, `03.jpg`, … (matching the numbers stamped in the PDF)
   - Full flattened spreads: `spread-NN.png` (NN = the PDF page label stamped on that spread)
4. Lowercase all extensions (`.JPG` → `.jpg`, `.PNG` → `.png`).

Reasons: spaces in filenames break some hosts, `IMAGE 1O.JPG` uses a capital letter O instead of a zero, and inconsistent case breaks on case-sensitive servers.

---

## 3. Map PDF pages → sections

Inspect the PDF page by page and classify each into one of four templates:

| Template | When to use | Implementation |
|---|---|---|
| **`project-hero`** | PDF page 1 (title + intro copy + one or two hero photos) | Text column + photo column grid |
| **`spread-section`** | Any PDF page that is already a designed spread (mood board, research collage, tech pack, line-up) | Single `spread` div wrapping `<img src="spread-NN.png">`, rendered at 16:9 max-width 1600px |
| **`photo-pair-section`** | A PDF page that is just two photos side-by-side | Two-up grid of `photo` divs |
| **`photo-single-section`** | A PDF page with one full-bleed photo (add if needed; copy `photo-pair` styling with one column) | Single centred photo |

**One PDF page = one `<section>` on the web page.** Never split or merge. The goal is a continuous scroll where each PDF spread reads as its own moment.

Produce a table before coding, like:

```
Page 1  → project-hero       (intro copy + 01.jpg, 02.jpg)
Page 2  → spread-section     (spread-03.png, label "Colour & Mood Board")
Page 3  → spread-section     (spread-04.png, label "Soft Power · Gendered Accessories")
…
Page 9  → photo-pair-section (10.jpg, 11.jpg, label "Final Look — In Studio")
```

---

## 4. File structure

```
projects/
  <project-slug>.html      ← new file
img/
  <project-slug>/          ← cleaned asset folder
    01.jpg
    02.jpg
    spread-03.png
    …
docs/
  project-page-template.md ← this document
```

Update the portfolio card in `index.html` for this project:

```html
<!-- BEFORE -->
<div class="portfolio-card reveal" data-project="<slug>">
  …
</div>

<!-- AFTER -->
<a class="portfolio-card reveal" href="projects/<slug>.html">
  …
</a>
```

The existing click-handler in `index.html` already checks `if (card.tagName === 'A' && card.getAttribute('href')) return;` so converted cards will navigate instead of opening the overlay. Other cards stay on the overlay until they're migrated.

---

## 5. HTML skeleton

Copy `projects/the-feminine-dandy.html` and edit. The structure is:

```html
<nav class="sticky-nav">…back to portfolio + brand…</nav>
<button class="back-to-top">…</button>

<section id="project-hero" class="page-section">
  <a class="breadcrumb" href="../index.html#portfolio">← Portfolio</a>
  <span class="section-label">Freya Gaskell · Final Design</span>
  <h1 class="project-title">Project<br>Title</h1>
  <!-- Optional award/recognition badge: -->
  <div class="award-badge">Award or recognition line</div>
  <div class="hero-grid">
    <div class="hero-copy">
      <p>…intro paragraph 1…</p>
      <p>…intro paragraph 2…</p>
    </div>
    <div class="hero-photos">
      <div class="photo" data-zoom="../img/<slug>/01.jpg">
        <img src="../img/<slug>/01.jpg" alt="…" loading="lazy">
      </div>
      <div class="photo" data-zoom="../img/<slug>/02.jpg">
        <img src="../img/<slug>/02.jpg" alt="…" loading="lazy">
      </div>
    </div>
  </div>
</section>

<!-- One <section class="spread-section"> per designed spread -->
<section class="spread-section">
  <span class="spread-label">Section label</span>
  <div class="spread" data-zoom="../img/<slug>/spread-NN.png">
    <img src="../img/<slug>/spread-NN.png" alt="…" loading="lazy">
  </div>
</section>

<!-- One <section class="photo-pair-section"> per two-photo page -->
<section class="photo-pair-section">
  <span class="spread-label">Section label</span>
  <div class="photo-pair">
    <div class="photo" data-zoom="../img/<slug>/10.jpg">
      <img src="../img/<slug>/10.jpg" alt="…" loading="lazy">
    </div>
    <div class="photo" data-zoom="../img/<slug>/11.jpg">
      <img src="../img/<slug>/11.jpg" alt="…" loading="lazy">
    </div>
  </div>
</section>

<section class="project-footer">
  <span class="section-label">Continue browsing</span>
  <a href="../index.html#portfolio">← Back to Portfolio</a>
</section>

<div class="lightbox" id="lightbox">…</div>
```

The `<script>` block at the bottom is identical across projects — copy it verbatim. It handles reveal-on-scroll, sticky nav, back-to-top, and the lightbox (any element with `data-zoom="…"` opens its image in full-screen).

---

## 6. Copywriting rules

- **Always rewrite the PDF body text into sentence case** (the PDFs use all-caps for headings/body). All-caps looks like a document on screen; sentence case reads as web copy.
- Split long PDF paragraphs into 2–3 shorter web paragraphs. Target ≤ 4 lines per paragraph on desktop.
- Preserve first-person voice where the designer uses it ("My final design explores …").
- Keep the **section label** (`.spread-label`) short — ideally 2–5 words. Pull from the PDF page heading or invent one that describes the contents ("Colour & Mood Board", "Shirt — Construction & Detail").
- For award/recognition lines use the full wording (e.g. "Liberty Fabrics × Graduate Fashion Week 2026 — Top 40 Winner").

---

## 7. Design rules to preserve

- **Gutter:** `padding: … 8%` on every section. Never make spreads full-bleed unless the designer explicitly asks.
- **Spreads** use `max-width: 1600px`, `aspect-ratio: 16/9`, `object-fit: contain` — so exported PDF pages never crop.
- **Alternating background:** `.spread-section:nth-of-type(even)` auto-alternates white/light-grey. Don't hand-override.
- **Subtle shadow** on spreads (`box-shadow: 0 20px 60px -20px rgba(0,0,0,0.15)`) — makes them feel like pages lifted off the surface.
- **Reveal on scroll:** add `reveal` class to every top-level block. The observer picks them up automatically.
- **Every image is zoomable** via `data-zoom="…"` on its wrapper.
- **Typography:** re-use the root tokens (`--heading`, `--body`, `--gold`, etc.) — do not introduce new fonts or colours per project.

---

## 8. Accessibility

- `alt` text on every `<img>` (describe the garment/spread, not "image of …").
- `loading="lazy"` on all images below the fold (i.e. all except the hero's first two).
- The lightbox has `role="dialog"` + `aria-modal="true"` + Escape-to-close + click-backdrop-to-close + a close button.

---

## 9. Before committing

- Check spreads render at full quality — PDF exports should be at least 1920 × 1080 for tech packs.
- Test in mobile viewport (≤ 600px): hero grid collapses to one column; photo pairs stay two-up (they shrink gracefully).
- Click every `data-zoom` element — the lightbox must open the correct image.
- Follow the portfolio link on mobile — sticky nav must remain readable.

---

## 10. Reference implementation

`projects/the-feminine-dandy.html` is the canonical reference. When building a new page, diff against it rather than this document if anything is ambiguous.
