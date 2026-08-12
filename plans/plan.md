# Plan: Correlate Nikon camera images with SONU.xlsx and rebuild the Products page with categories + MRP/Offer price

Status: **IMPLEMENTED.** See §9 for the implementation record.

## 1. Sources inspected

- `images/From Capital/SONU.xlsx` → Sheet1 "NIKON CAMERA PRICE LIST", columns `MODEL | MRP | OFFER PRICE`, **46 data rows** (Sheet2/Sheet3 are empty). Read via a stdlib zipfile/XML parse (no openpyxl installed); the file was open in LibreOffice under the user's lock but reading a copy was safe.
- `images/From Capital/imagesofnikoncameras/` → **38 JPEGs**, UUID filenames with no useful metadata (no EXIF, no descriptive names). However, every image has a baked-in yellow-on-black title banner naming the exact product/kit, so I visually opened and transcribed all 38 images to identify them reliably.
- Existing site model: `content/products/*.md` (gray-matter frontmatter: `title, slug, category, subcategory, price, image, featured, releaseDate, tagline, specs[]`), read by `src/lib/products.ts`, rendered by `src/app/products/page.tsx` (grid + category filter tabs) and `src/app/products/[slug]/page.tsx` (detail page). Today there is only a single `price` string field — no MRP/offer distinction. Current categories in use: `Mirrorless Camera`, `Lens`, `Speedlight`, `Binoculars` (with a hardcoded icon/gradient map in `product-image-placeholder.tsx` keyed on category).

## 2. Full image ↔ SONU.xlsx correlation

Every SONU row is `MODEL | MRP | OFFER PRICE`. Match key = product/kit name normalized (ignore spacing/case).

| # | Image file (uuid.jpg) | Label read from image | SONU row matched | MRP | Offer |
|---|---|---|---|---|---|
| 1 | `5d262dd4` | Z8 (body only) | Z8 BODY | 343995 | 299495 |
| 2 | `644aa731` | Z8 + NIKKOR Z 24-120mm f/4S | Z8 KIT WITH 24-120MM LENS | 441990 | 379495 |
| 3 | `1ef8c9f9` | Z6III (body only) | Z6 III BODY | 249795 | 205995 |
| 4 | `ef683a0f` | Z6III + NIKKOR Z 24-70mm f/4 S | Z6 III KIT WITH 24-70MM LENS | 294795 | 250995 |
| 5 | `e9636143` | Z6III + NIKKOR Z 24-200mm f/4-6.3 VR | Z6 III KIT WITH 24-200MM LENS | 309495 | 265695 |
| 6 | `cdda9a99` | Z6III + NIKKOR Z 24-120mm f/4 S | Z6 III KIT WITH 24-120MM LENS | 332195 | 288395 |
| 7 | `b6e59166` | Z6III + NIKKOR Z 28-75mm f/2.8 | Z6 III KIT WITH 28-75MM LENS | 343395 | 273590 |
| 8 | `ff902284` | Z5II (body only) | Z5II BODY | 164495 | 154495 |
| 9 | `5f789d1d` | Z5II + NIKKOR Z 24-70mm f/4 S | Z5II KIT WITH 24-70MM | 209495 | 199495 |
| 10 | `a3889bf5` | Z5II + NIKKOR Z 24-200mm f/4-6.3 VR | Z5II KIT WITH 24-200MM | 224295 | 214295 |
| — | `64319600` **(corrected mapping, see §3b)** | "Z5" + NIKKOR Z 24-120mm f/4 S → published as Z5 II | Z5II KIT WITH 24-120MM | 266395 | 237695 |
| 11 | `45751573` | Z6II (body only) | Z6 II BODY | 164795 | 133895 |
| 12 | `06f39146` | Z6II + NIKKOR Z 24-70mm f/4 S | Z6II KIT WITH 24-70MM | 209795 | 178895 |
| 13 | `56273721` | Z6II + NIKKOR Z 24-120mm f/4 S | Z6II KIT WITH 24-120MM | 265695 | 216295 |
| 14 | `4874b7b5` **(kept over duplicate `c90b2b2c`, see §3c)** | Z6II + NIKKOR Z 28-75mm f/2.8 | Z6II KIT WITH 28-75MM | 258395 | 201490 |
| 15 | `6fe86202` | Nikon ZR (body only) | NIKON ZR BODY | 186995 | 168296 |
| 16 | `85cd6cb2` | ZR + NIKKOR Z 24-120mm f/4 S | NIKON ZR KIT 24-120MM | 284990 | 266995 |
| 17 | `6deee619` | Z50II (body only) | Z50 II BODY | 83995 | 75596 |
| 18 | `c0976c74` | Z50II + NIKKOR Z DX 16-50mm f/3.5-6.3 VR | Z50 II KIT WITH 16-50MM | 98945 | 89051 |
| 19 | `735a50f5` | Z50II + DX 16-50mm + DX 50-250mm | Z50 II KIT WITH DX16-50MM & 50-250MM | 119895 | 107906 |
| 20 | `7407829a` | Z30 + DX 16-50mm **+ SB-500 Speedlight** (bundle photo) | Z30 KIT WITH 16-50MM | 75695 | 66612 |
| 21 | `8bcd7d7e` | Coolpix P1100 | NIKON COOLPIX P1100 | 86995 | 78296 |
| 22 | `0a62b304` | Coolpix P950 | NIKON COOLPIX P950 | 68995 | 62096 |
| 23 | `d1580a5a` | D7500 + AF-S DX 18-140mm | NIKON D7500 18-140MM | 94950 | 88950 |
| 24 | `3d7b3c0d` | NIKKOR Z 50mm f/1.8 S | Z50 MM F/1.8S | 52995 | 46636 |
| 25 | `9a9e4cb9` | NIKKOR Z 85mm f/1.8 S | Z85 MM F/1.8S | 67550 | 61295 |
| 26 | `0245bfbc` | NIKKOR Z 35mm f/1.8 S | Z35 MM F/1.8S | 69595 | 61244 |
| 27 | `6cfb9f85` | NIKKOR Z 35mm f/1.4 *(image title has no "S")* | Z35 MM F/1.4S | 93595 | 51995 |
| 28 | `aac6624f` | NIKKOR Z 50mm f/1.4 *(image title has no "S")* | Z50 MM F/1.4S | 83195 | 41595 |
| 29 | `67de7698` | NIKKOR Z 180-600mm f/5.6-6.3 VR | Z180-600MM F/5.6-6.3 VR | 176795 | 155580 |
| 30 | `153a6527` | NIKKOR Z 70-200mm f/2.8 VR **S II** | Z70-200MM F/2.8 VR SII | 224095 | 197204 |
| 31 | `9c72af8a` | NIKKOR Z 28-400mm f/4-8 VR | Z28-400MM F/4-SVR *(typo in sheet)* | 134195 | 118092 |
| 32 | `3fb8e4eb` | Prostaff P3 8x42 | PROSTAFF P3 8*42 | 13990 | — (blank) |
| 33 | `3b0d0195` | Battery EN-EL15C(IN)/F | BATTERY EN-EL 15C | 4990 | — (blank) |
| 34 | `a76dc670` | Battery EN-EL25A | BATTERY EN-EL 25A | 5550 | — (blank) |
| 35 | `07ce02c7` | Battery EN-EL20A | BATTERY EN-EL 20A | 5202.74 | — (blank) |

That accounts for 36 distinct SONU rows and 36 of the 38 images (the duplicate `c90b2b2c` and the ambiguous `ef5789e6` are the 2 dropped images — see §3b/§3c).

## 3. Discrepancies to flag (as requested)

### 3a. SONU.xlsx rows with **no matching image** (9 of 46, after §3b's correction)
**Decision: publish these too**, using the category placeholder card (existing `ProductImagePlaceholder` component) rather than omitting them. They're real, currently-priced SKUs a shop customer may be looking for — leaving them off the site understates the catalogue just because a photo wasn't in this drop. Swap in a real photo later with no schema change (just fill in `image:`).
- `Z8 KIT WITH 24-70MM LENS`
- `Z8 KIT WITH 28-55M LENS`
- `Z6 III BODY + Z180-600MM COMBO WITH PROSTAFF P3 8*42` (a bundle SKU — no combined bundle photo, though its 3 components are individually photographed)
- `Z5 II KIT WITH 28-75MM LENS`
- `NIKON ZR KIT 24-70MM`
- `NIKON ZR KIT 24-200MM`
- `Z50 II KIT WITH 16-140MM`
- `Z30 KIT WITH 16-50MM & DX 50-250MM`
- `Z30 KIT WITH 18-140MM LENS`

Two rows originally listed here turned out **not** to be imageless after all — see §3b (`Z5II KIT WITH 24-120MM`, which does have a photo) and §4.3 (`Z24-70MM F/2.8 VR SII`, which is the same lens as an existing hand-written product page).

### 3b. Images with **no clean SONU.xlsx match**
- **`64319600.jpg`** — labelled "**Z5** + NIKKOR Z 24-120mm f/4 S". SONU.xlsx has **no plain "Z5" line at all** — only "Z5II" body/kit rows. **Decision: map it to `Z5II KIT WITH 24-120MM`** — it's overwhelmingly likely the same kit using a manufacturer stock image whose overlay text simply wasn't updated to say "Z5II" (Nikon's press kit frequently reuses body-silhouette shots across a body/successor line, and there is no other candidate photo or SONU row it could plausibly belong to). The on-site product **title reads "Nikon Z5II + NIKKOR Z 24-120mm f/4 S"** regardless of what the image overlay says, so the published copy is correct even though the source photo's caption is stale. (This row is now included in the §2 table — it was mistakenly left out of the table in an earlier pass even though the decision was made; fixed during implementation.)
- **`ef5789e6.jpg`** — labelled "NIKKOR Z 70-200mm f/2.8 **VR S**" (no "II"), while SONU's 70-200mm row (Z70-200MM F/2.8 VR SII) is already covered by a cleanly-labelled image (`153a6527`) attached to the existing `nikkor-z-70-200mm-f28-vr-s.md` page. **Decision: drop this image, do not create a product for it.** SONU only prices the S II version; publishing a second "70-200mm f/2.8" entry from an unpriced, differently-labelled photo would create a confusing duplicate listing with no price to attach. This is one of the 2 unused source images, alongside the dropped `c90b2b2c` duplicate (§3c).

### 3c. Resolved without further confirmation
- **`7407829a.jpg`** — Z30 + 16-50mm kit photographed together with an **SB-500 Speedlight**, but the SONU price for "Z30 KIT WITH 16-50MM" doesn't include a flash. **Decision: use this image for the Z30 kit product**, and add a one-line caption/alt text — "Camera + kit lens shown; Speedlight SB-500 sold separately" — so the bundled flash in the photo never gets misread as included at that price.
- **Naming inconsistency, not a data problem**: SONU.xlsx labels rows for the 35mm and 50mm f/1.4 lenses "...F/1.4**S**", but Nikon's actual lineup (and the product images) call these the non-S **NIKKOR Z 35mm f/1.4** and **NIKKOR Z 50mm f/1.4** (the S-line only goes up to f/1.8 at these focal lengths). **Decision: use the correct non-S lens name as the on-site title**, keep the price linked to SONU's row, and don't surface the "S" typo anywhere in the published copy.
- **Duplicate image — `c90b2b2c.jpg` vs `4874b7b5.jpg`** (both "Z6II + NIKKOR Z 28-75mm f/2.8", pixel-for-pixel the same studio shot): compared directly — `4874b7b5.jpg` is the higher-quality file (1079×1312 vs 1080×1289, ~306KB vs ~296KB, marginally more headroom/less tight crop below the camera). **Decision: keep `4874b7b5.jpg` as the single image for this product; discard `c90b2b2c.jpg` entirely** (no gallery/secondary-image field needed for this — see §6.2).

## 4. Content model changes (`content/products/*.md` + `src/lib/products.ts`)

1. Replace the single `price: string` frontmatter field with structured pricing:
   ```yaml
   mrp: 343995
   offerPrice: 299495   # omit or null when SONU has no offer price (batteries, binoculars)
   ```
   Keep numbers (not pre-formatted strings) so the UI can format currency (`₹`, thousands separator) and compute the discount % consistently.
2. Update the `Product` type and `getAllProducts()` in `src/lib/products.ts` to parse `mrp`/`offerPrice` instead of `price`, and expose a formatted-currency helper (e.g. `formatINR(value)`).
3. Existing 14 hand-written product files (Z8, Z9, Z6III, Zf, lenses, speedlights, binoculars, etc.) already have a `price` field with a single approximate figure. **Decision:** every file whose model has a SONU.xlsx row gets migrated to real `mrp`/`offerPrice` from the sheet, replacing the old estimate — the sheet is the authoritative, current price source. Files with no SONU row keep a single indicative figure under the new schema as `mrp` only (`offerPrice` omitted), rendering exactly as before, just on the new field name.
   - **6 files matched a SONU row and were migrated to real pricing:** `nikon-z8` (Z8 BODY), `nikon-z6iii` (Z6 III BODY), `nikon-z5ii` (Z5II BODY), `nikon-z50ii` (Z50 II BODY), `nikkor-z-70-200mm-f28-vr-s` (Z70-200MM F/2.8 VR SII — this one also got its first real product photo, the previously-unused `153a6527.jpg`), and `nikkor-z-24-70mm-f28-s` (Z24-70MM F/2.8 VR SII). **Correction from the original plan draft:** §3a/§4.3 originally listed "24-70mm f/2.8 S standalone" as having no SONU match and `Z24-70MM F/2.8 VR SII` as one of the 11 imageless rows to publish as a *new* placeholder product — that would have created a confusing duplicate listing for the same lens. Caught and fixed during implementation: it reuses the existing `nikkor-z-24-70mm-f28-s.md` file (price-only migration, still no photo available) instead of spawning a new file.
   - **8 files had no SONU match and kept their existing indicative price**, schema-migrated to `mrp` only: `nikkor-z-24-120mm-f4-s`, `nikkor-z-dx-18-140mm`, `nikon-aculon-binoculars`, `nikon-z30`, `nikon-z9`, `nikon-zf`, `speedlight-sb-5000`, `speedlight-sb-700`.
4. Add/extend `category` taxonomy. Current values: `Mirrorless Camera`, `Lens`, `Speedlight`, `Binoculars`. New content requires:
   - `DSLR Camera` (Nikon D7500)
   - `Point & Shoot Camera` (Coolpix P1100, P950 — bridge/superzoom cameras)
   - `Battery` (EN-EL15C, EN-EL25A, EN-EL20A)
   - (Binoculars already exists for Prostaff P3.)
5. Use the existing `subcategory` field to distinguish **Body only** vs **Kit with lens** vs **Combo** within `Mirrorless Camera`, so the products grid/detail page can show "Mirrorless Camera · Kit with 24-120mm f/4 S" etc. This also lets a future "kit configurator" (pick a body → see its available lens kits) be built without a schema change.
6. `product-image-placeholder.tsx`'s `CATEGORY_STYLES` map needs new entries (icon + gradient) for `DSLR Camera`, `Point & Shoot Camera`, and `Battery` so uncategorized/no-photo rows (§3a) still render a sensible placeholder card instead of falling back to the generic camera icon.

## 5. New product entries created

**40 new markdown files** under `content/products/` (31 image-matched rows from §2 that don't reuse an existing file, + 9 imageless placeholder rows from §3a), each with:
- `title` = cleaned-up product name (fix casing/typos, e.g. "Z28-400MM F/4-SVR" → "NIKKOR Z 28-400mm f/4-8 VR")
- `slug` = kebab-case of the cleaned title
- `category` / `subcategory` per §4
- `mrp` / `offerPrice` from SONU.xlsx
- `image` = path to the copied/cropped asset (§6), or `""` for the 9 imageless placeholder rows
- `tagline` + short body copy, written fresh in the short spec-led tone from §8.6 (2–3 sentences)
- `specs[]` — kit combinations list body + kit lens as separate rows; accessories (batteries, binoculars) get a short spec table (type, compatibility, capacity)

Generated via a data-driven Python script (`gen_products.py`, run once from the scratchpad, not committed) rather than by hand, to keep 40 files consistent and avoid transcription drift from the §2 table. Combined with the 14 existing files (6 price-migrated with real SONU figures, 8 schema-migrated keeping their own estimate), the catalogue now has **54 product pages** total.

## 6. Image asset handling

1. **Cropped and copied 32 of the 36 kept vendor images** (not all 36) from `images/From Capital/imagesofnikoncameras/` into `public/images/products/`, renamed from UUIDs to descriptive slugs (e.g. `nikon-z6iii-kit-24-70mm-f4s.jpg`). The vendor photos all have a yellow-on-black title banner baked into the top of the frame — inconsistent with the existing site's clean, banner-free product photography — so each image was auto-cropped (Python/Pillow, detecting the row where the dark banner transitions to the light product background) before saving, and capped at 1400px wide.
2. **4 of the 36 kept images were intentionally not copied**: the Z8, Z6III, Z5II and Z50II *body-only* vendor photos (`5d262dd4`, `1ef8c9f9`, `ff902284`, `6deee619`) duplicate what those 4 products already show, since `nikon-z8.md`/`nikon-z6iii.md`/`nikon-z5ii.md`/`nikon-z50ii.md` already have their own curated product photos in `public/images/products/` — no reason to replace a known-good existing image.
3. No multi-image gallery field is needed — every product resolves to exactly one chosen image (§3c settles the one duplicate case), so the existing single `image: string` field in the schema is sufficient as-is.
4. Left `images/From Capital/` untouched (source of truth / original vendor drop) — `SONU.xlsx` and the zip were not modified or deleted.

## 7. UI changes

1. **Product card** (`src/components/product-card.tsx`) and **detail page** (`src/app/products/[slug]/page.tsx`): replace the single price line with:
   - Offer price in large amber text (primary)
   - MRP in smaller strikethrough text next to/above it, only when `offerPrice` is present and less than `mrp`
   - Optional "X% off" badge computed from `(mrp - offerPrice) / mrp`
   - When there's no `offerPrice` (batteries, binoculars — SONU leaves that column blank), just show `mrp` as-is, unchanged from today's single-price look.
2. **Category filter tabs** (`src/components/products-grid.tsx`): no structural change needed — `getCategories()` already derives tabs from whatever `category` values exist in the markdown files, so adding `DSLR Camera` / `Point & Shoot Camera` / `Battery` files automatically produces new tabs.
3. **Decision: kit variations of the same body are separate product cards** in the grid (e.g. the 4 different Z6III kit configurations are 4 cards), not grouped under one body page with a lens-kit picker. This matches SONU's row-per-SKU granularity and the individual product photos 1:1, and avoids building new configurator UI for this pass — the smaller, lower-risk change.

## 8. Decisions log (resolved by me, no further owner confirmation needed)

1. `64319600.jpg` ("Z5 + 24-120mm") → mapped to **Z5II KIT WITH 24-120MM**, titled correctly on-site as Z5 II (§3b).
2. `ef5789e6.jpg` (70-200mm "VR S", no "II") → **dropped**, not published; SONU only prices the "VR S II" version, which already has a clean image (§3b).
3. The 9 imageless SONU rows (§3a) → **published** with a category placeholder card, not omitted.
4. Kit variants of the same body → **separate product cards** (§7.3), not grouped/selectable on one page.
5. Duplicate Z6II+28-75mm images (`c90b2b2c.jpg` / `4874b7b5.jpg`) → **kept `4874b7b5.jpg`** (higher resolution, cleaner crop), discarded the other (§3c).
6. Copy tone for the 40 brand-new SKUs: **short, spec-led copy** (tagline + 2–3 sentence description), matching the existing pages' voice but not matching their length — the existing hero pages (Z8, Z6III, 24-70mm f/2.8 S, etc.) keep their fuller marketing copy as-is; new bulk-imported SKUs don't need the same depth to be useful on a catalogue page.
7. Vendor photos all carry a baked-in title banner inconsistent with the site's clean product photography → **auto-cropped before use** (§6), not used as-is.
8. `nikkor-z-24-70mm-f28-s.md` (24-70mm f/2.8) → **caught a plan error and fixed it**: it does have a SONU match (`Z24-70MM F/2.8 VR SII`) that the original draft missed, so it's price-migrated in place instead of getting a duplicate new placeholder page (§4.3).

## 9. Implementation record

Status: **IMPLEMENTED.** Executed in this order:

1. Cropped the banner off 32 vendor images and copied them into `public/images/products/` (§6).
2. Extended the `Product` type + `getAllProducts()` in `src/lib/products.ts` for `mrp`/`offerPrice`, plus `formatINR()` and `discountPercent()` helpers.
3. Updated `product-card.tsx` and `[slug]/page.tsx` to show offer price prominently, MRP struck through, and a "X% off" badge when a discount applies; falls back to a plain price when there's no `offerPrice`.
4. Added `DSLR Camera` / `Point & Shoot Camera` / `Battery` icon+gradient entries to `product-image-placeholder.tsx` (Cctv, ScanLine, BatteryFull icons from lucide-react).
5. Migrated the 6 existing files with a SONU match to real `mrp`/`offerPrice`, and schema-migrated the other 8 to `mrp`-only (§4.3).
6. Generated the 40 new product files via a data-driven script (§5).
7. Fixed 2 gaps found in the original plan draft while implementing: the missing `Z5II KIT WITH 24-120MM` / `64319600.jpg` table row (§2), and the `Z24-70MM F/2.8 VR SII` duplicate-listing risk (§4.3).
8. Verified with `npx tsc --noEmit` — no type errors.

Remaining: manual dev-server QA pass (category tabs, pricing rendering, placeholder cards, sample detail pages).
