# FASHION HUB

A luxury fashion, beauty and lifestyle storefront built as a **static, frontend-only** site:
Next.js (static export) · TypeScript · Tailwind CSS v4 · Framer Motion · Lucide React · LocalStorage · GitHub Pages.

**Palette:** `#F9F3ED` cream · `#E7D8CA` sand · `#AC9185` taupe · `#531C22` burgundy · `#220707` ink (plus derived tints for accessible text and depth). Tokens live in `app/globals.css` and `config/theme.ts`.

There is no backend, database, authentication or payment processing. Checkout is an **order enquiry**: it prepares
a message for WhatsApp or email and states clearly that nothing is sent, stored or paid by the website.

> **Status: first delivery, not yet built or tested in a real Node environment.**
> This project was written in a sandbox with no network access, so `npm install`, `next build`, `next lint`,
> the Vitest run and the Playwright run have **not** been executed. See [What has and has not been verified](#what-has-and-has-not-been-verified).
> Run `npm install && npm run verify` first and fix anything it reports.

## Quick start

```bash
npm install
npm run dev            # http://localhost:3000
npm run verify         # typecheck + lint + unit tests + production build + export check
npm run serve:export   # serve out/ at http://127.0.0.1:4173/fashion-hub/ (like GitHub Pages)
npx playwright install chromium && npm run test:e2e   # end-to-end tests against the export
```

Requires Node 20.9 or newer. After the first `npm install`, commit `package-lock.json` (the workflow then uses `npm ci`).

## Design source and photography

The landing page, header, mobile bottom tab bar, product cards and category banners follow the supplied mockups
(desktop and mobile). The photography in `public/images/hero`, `landing`, `categories` (10 tiles + `women-hero`) and
`products/photos` was **cropped from those mockups**: baked-in badges and hearts were removed and the hero backgrounds were
extended to full width. They are **low resolution placeholders** (some only ~300px). Replace them with real, high-resolution
photography at the same paths (see `data/photos.ts` for the list; `npm run images` never overwrites them).

Deliberate differences from the mockups:
- **No star ratings or "Best Seller" badges by default.** Your brief says not to invent reviews or sales claims. Cards support them: set `rating: { value, count }` on a product (real reviews only) or add text to `badges`.
- **Landing page sections** are exactly those in the mockup (hero, categories, new arrivals, signature banner, featured collections, newsletter, footer); the extra sections from the earlier version were removed.
- **"Careers"** is not linked (no page exists); the footer has "How to Order" instead.
- **Account** is a short honest page (accounts are not available yet), not a login.
- **"Complimentary Delivery on Orders Above GHS 500"** and the contact location come from the mockup: confirm the offer or change it in `config/site.ts`.

## Mobile UX

Phones and tablets (below the `lg` breakpoint) use a bottom-first layout:
- **Header:** one centred logo and a search button (the menu, bag and wishlist are in the bottom bar).
- **Bottom bar (5 items, Home in the middle):** Bag, Wishlist, **Home**, Shop, Menu.
- **Shop** opens a sheet with dropdowns: Fashion, Accessories, Hair & Beauty, Discover (from `data/navigation.ts`).
- **Menu** opens a sheet with dropdowns for Collections, Women, Men, Beauty, Accessories and a Journal link, with Bag, Wishlist and Search at the bottom.
- **Search** shows recent searches (kept in this browser, clearable) and popular searches; the field is 16px so iOS does not zoom.
- **Quick view, filters and menus** are bottom sheets that always fit the screen (max 88-90% of the viewport height) with a sticky primary button.
- **Product page:** Add to Bag is a fixed bar above the tab bar.
- **Checkout:** three single-screen steps (Details, Delivery, Review) with a collapsible order summary.

How the usability laws were applied: touch targets are at least 44px (tab bar, swatches, chips, quantity, filters, footer links); primary actions sit in the lower half of the screen; the tab bar has 5 destinations and menus have 4 to 6 groups; interactions confirm instantly ("Added" state, skeleton loaders); related details share one card; and burgundy is reserved for primary actions.
Type: body and form text is 14-16px (inputs 16px), captions are 12px or larger, and the decorative logo tagline is 10px. This is slightly under the 16px body-text guideline on purpose, to keep the layout compact as requested.
`tests/e2e/mobile.spec.ts` checks 320px layouts for sideways scrolling, one logo, the tab bar order and sizes, the sheets, search and quick view.

## Hero

`data/hero.ts` defines three photo slides. Each has its own copy, desktop and mobile photograph, text side and tone, and a transition:
`fade`, `fade-right`, `fade-left`, `drop`, `rise` or `flip` (photo and copy animate in that style).
The photo, copy and sparkles sit on separate CSS 3D depth layers that follow the mouse (desktop only).
Autoplay pauses on hover/focus and with the pause button, supports arrow keys and swipe, and with "reduce motion" the
hero starts paused and uses plain cross-fades. Replace `public/images/hero/slide-N-desktop.webp` (about 1920x650) and `slide-N-mobile.webp` (about 1100x740) with real photography.

## Configure the business (no hard-coded details)

Edit **`config/site.ts`**. Empty strings are clearly marked placeholders and the UI says so until you fill them in:

| Setting | Effect |
| --- | --- |
| `contact.whatsapp`, `contact.email` | Enable the WhatsApp and email buttons on checkout and the contact form |
| `contact.phone/address/hours`, `social.*` | Footer, contact page, structured data |
| `announcements` | Announcement bar messages |
| `delivery.defaultMessage` | Delivery text on product pages |
| `newsletter.formAction` | Set a provider form URL to enable real sign-ups (otherwise the form is an honest demo) |
| `sampleCatalogue.enabled` | Shows the "sample catalogue" notices. Set to `false` at launch |

When a WhatsApp number is set, a floating chat button appears. Product pages always offer "Ask about this product" (or "Notify me when available" for unavailable and pre-order items), which prepare a WhatsApp/email message.

Other central files: `config/business.ts` (Ghana regions), `config/deployment.ts` (repo name / base path / site URL),
`config/theme.ts` (brand colours; Tailwind tokens live in `app/globals.css`).

## Import your real catalogue from a spreadsheet

1. Copy `data/catalogue.template.csv` to `data/catalogue.csv` and fill it in (Excel or Google Sheets, saved as CSV). Lists use `|`; attributes are `Key:Value|Key:Value`; extra options are `id~Label~value|value+price;...`.
2. `npm run catalogue:import` validates every row (unknown categories, bad prices, duplicate names...) and writes `data/products.imported.ts`. Nothing is written if any row has a problem.
3. Put photos at the paths in the `images` column, run `npm run images:optimize`, then build. `npm run catalogue:import -- --clear` returns to the sample catalogue.

Imported products are not marked as samples, so product structured data (JSON-LD) is emitted for them.

## Replace the sample catalogue

All 48 products are **sample content** (`sample: true`, brands named "Sample ..."). Images are generated placeholder artwork.

1. Edit `data/products.ts` (compact seed helpers in `data/seed.ts`) or supply full `Product` objects.
2. Put real photos at the paths in each product's `images` (default: `public/images/products/<group>/<slug>-1.webp`, 3:4, ~900x1200).
3. Edit `data/categories.ts`, `data/collections.ts`, `data/journal.ts`, `data/faqs.ts`, `data/policies.ts`, `data/homepage.ts`.
4. `npm run images` regenerates the placeholder artwork for sample products only (it never overwrites photos of imported products).
5. `npm run images:optimize` creates a 480px `name-480.webp` next to each `.webp`; product cards and category tiles use it through `srcset`. `npm run check:export` fails if a referenced variant is missing.

Products support category-specific `attributes` (specification rows) and generic purchase `options`
(colour, size, length, texture, lace, shade, finish...) with optional `priceAdjustment`. Components read the catalogue
only through `lib/products.ts`, so the data source can later move to an API.

## Deploy to GitHub Pages

1. Create a GitHub repository (the base path defaults to `/fashion-hub`; the workflow uses your real repo name automatically).
2. In **Settings → Pages**, set **Source: GitHub Actions**.
3. Push to `main`. `.github/workflows/deploy.yml` runs lint, typecheck, unit tests, the build/export, the export check and the
   Playwright tests, then publishes `out/`.
4. For a user/organisation site (repo named `<owner>.github.io`), enable `NEXT_PUBLIC_USE_ROOT_PATH` in the workflow.
5. **Custom domain:** add `public/CNAME` containing your domain, enable `NEXT_PUBLIC_USE_ROOT_PATH: "true"` and set `NEXT_PUBLIC_SITE_URL: https://your-domain` in the workflow, then set the custom domain in Settings → Pages. The base path must be `/` for a custom domain.

`next.config.ts` sets `output: "export"`, `trailingSlash`, `images.unoptimized` and the production `basePath`.
Raw `<img>` tags go through `components/ui/Img.tsx` (`withBasePath`) because `next/image` does not add the base path when unoptimised.
`public/.nojekyll` is copied into the export. `npm run check:export` fails the build if any local reference lacks the base path or points to a missing file.

## Architecture

```
app/            routes (all statically generated; dynamic routes use generateStaticParams)
components/     layout, home, catalogue, product, cart, wishlist, checkout, editorial, forms, ui
context/        UI, Cart, Wishlist, RecentlyViewed providers (React Context + localStorage)
data/           categories, products, collections, navigation, homepage, journal, faqs, policies, size guide
config/         site, business, theme, deployment
lib/            pure logic: products service, filters, search, cart, validation, whatsapp, payments boundary, seo
tests/          Vitest unit tests + Playwright e2e (tests/e2e)
scripts/        image generator, export checker, static server
```

Future integration boundary: `lib/payments.ts` defines a `PaymentGateway` interface (not implemented). Real payments
(e.g. Paystack) require a backend or hosted checkout; a static site must never hold secret keys or claim a payment succeeded.

## Deliberate deviations from the blueprint

- **Purchase options** use one generic `options` model (colour/size/length/texture/lace/shade/finish) instead of a flat `variants[]`; it is a superset and supports per-value price adjustments.
- **Secondary text colour** is `#6B635D`, not `#827A73` (3.8:1 contrast fails WCAG AA for small text). `#827A73` remains available as `stone` for decoration.
- **No separate `SearchContext`**: overlay state lives in `UIContext`; search is a pure function in `lib/search.ts`.
- **`/order-enquiry/`** is an explanatory page, and the "enquiry ready" step happens on `/checkout/` in memory. Customer details are deliberately never written to localStorage.
- **Desktop navigation** omits a separate "Home" link (the logo is Home) to avoid crowding; Home is in the mobile drawer.
- **Sample products** do not emit Product structured data (it would describe fake offers).
- **Custom 404** is `app/not-found.tsx` (exported as `404.html`), not a `/404/` route.
- **Pagination** is "Load more". "Popularity" sorting is not offered because there is no real sales data; "Featured" uses the `featured/trending/newArrival` flags.

## Launch checklist

- [ ] Fill in `config/site.ts` (WhatsApp/email/phone/social) and confirm the repo name/site URL
- [ ] Replace sample products, images and journal articles; set `sampleCatalogue.enabled = false`
- [ ] Complete `data/policies.ts` (shipping, returns, privacy, terms), reviewed by the business or a legal adviser
- [ ] Confirm size charts against your suppliers (`data/size-guide.ts`)
- [ ] Connect a newsletter provider (`newsletter.formAction`) or remove the section
- [ ] Review `app/robots.ts` / indexing once real content is live
- [ ] `npm run verify` and `npm run test:e2e` pass; check the live site under `/<repo>/`

## What has and has not been verified

Verified in the build sandbox (actually executed):
- 41 unit tests for catalogue data integrity, filtering, facets, sorting, search, currency, cart maths, wishlist, Ghana phone/email validation, enquiry messages, CSV import and srcset building: all passed (run through a minimal stand-in for Vitest's `describe/it/expect`, because Vitest itself could not be installed).
- Strict TypeScript compilation of `config/`, `types/`, `data/`, `lib/`: clean (only `process` was unknown, since `@types/node` was unavailable).
- Strict TypeScript compilation of all pages, components, contexts and hooks against **hand-written stub declarations** for React, Next.js, Framer Motion and Lucide: clean. This checks imports, props and internal types, not the real library typings.
- `scripts/check-export.mjs` and `scripts/serve-export.mjs` against a small fake export (good and bad cases).
- All sample images (and their 480px variants) generate and every referenced path exists. The CSV import script was run end to end (template in, imported, cleared; bad CSV rejected).
- Static HTML approximations of the desktop and 390px mobile landing page, built from the same images and measurements, were rendered in Chromium and compared with your mockups. The real components (Tailwind styling, Framer Motion transitions) have not been rendered.

**Not executed:** the real animated hero in a browser (Framer Motion transitions, 3D tilt, autoplay timing), `npm install`, `next build`/static export, `next lint`, real Vitest, Playwright (`tests/e2e`), visual/responsive review in a browser, keyboard/screen-reader testing, Lighthouse, the GitHub Actions workflow. Treat all of those as outstanding until you have run them.
