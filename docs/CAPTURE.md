# aerotechss.com — Capture for Redesign

Full capture of the live site, taken 2026-09-10. Source of truth for the rebuild.

## Contents

```
raw/                    11 pages of original HTML, exactly as served
assets/                  63 files, 9.8 MB — original CSS, JS, images (paths preserved)
  css/                   style.css (1494 lines), responsive.css (909), style1.css (40)
  js/script.js
  images/                60 photos + logo
content/
  site-content.json      machine-readable: title, meta, headings, paragraphs, lists,
                         links, images+alt, forms, full text — per page
  pages/*.md             human-readable content dump, one file per page
  urls.txt               every discovered route
  assets.txt             every referenced asset path
  css-selectors.txt      248 selectors in style.css
screenshots/
  desktop/*.png          full-page, 1440px wide
  mobile/*.png           full-page, 390px wide
SITEMAP.md               routes, nav tree, page status, contact data, structural problems
DESIGN-AUDIT.md          colors, type, layout, breakpoints, component inventory, code-quality notes
                       + Appendix A: last-updated forensics · Appendix B: code-quality verdict
```

## Fast facts

- 11 routes. 8 real pages, 2 empty stubs (`services.php`, `blog.php`), 1 parked-domain artifact (`hire-a-designer.php`).
- Static PHP includes. Bootstrap 4.5.2 + jQuery 3.5.1 + Font Awesome 4.7 + Magnific Popup. No CMS, no build.
- Brand: navy `#343c5c` + orange `#fb722e`. Poppins — declared but never actually loaded.
- Every page shares one title ("Aerotech"), one meta description, and a canonical pointing at the home page.
- `aircraft-recovery.php` is a real service page missing from the nav.
- `contact-us.php` sits behind a cookie bot-gate (`humans_21909=1`) that forces a JS reload.

## How this was captured

```bash
# pages
curl -s "https://aerotechss.com/<page>.php" -o raw/<page>.php.html
# contact-us needs the bot-gate cookie
curl -s -H 'Cookie: humans_21909=1' https://aerotechss.com/contact-us.php

# assets: every path in content/assets.txt fetched to assets/ with structure preserved

# screenshots: headless Chrome, tall viewport, then autocropped to real page height
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless=new --disable-gpu --hide-scrollbars \
  --window-size=1440,9000 --screenshot=out.png "<url>"
```

## Start here

1. `SITEMAP.md` — decide the new route map (drop 3 routes, add a projects index, add Aircraft Recovery to nav).
2. `DESIGN-AUDIT.md` — pull the token set, then design against it.
3. `content/pages/*.md` — the copy. Note the About page needs a rewrite out of Title Case, and the ORAT nav label has a typo ("Opartional").
4. `assets/images/` — the real value here. 60 client project photos, all unoptimized JPEG/PNG; convert to WebP/AVIF.
