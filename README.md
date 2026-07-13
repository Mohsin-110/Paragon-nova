# Marque — Storefront (Phase 1)

A curated multi-category storefront front-end, built as the first phase of the
full eCommerce platform. This phase covers **Home, Shop, Product Details, and
Cart** — fully working against local mock data, with no backend required yet.

## Stack

- Next.js 16 (App Router) — the spec asked for Next 15; 16 is the current
  stable release and is a drop-in superset for everything used here. Pin to
  15 in `package.json` if you specifically need it.
- TypeScript, Tailwind CSS v4
- Framer Motion (hero + cart drawer animation)
- React Icons
- Swiper.js (product rails)

## Getting started

```bash
cd marque
npm install
npm run dev
```

Visit `http://localhost:3000`.

```bash
npm run build   # production build
npm run lint    # eslint
```

## What's implemented

- **Home** — hero, category strip, flash sale with live countdown, best
  sellers / trending / recently added rails, "why choose us", testimonials,
  newsletter signup.
- **Shop** — search, category/price/rating/brand/availability filters, sort,
  grid/list view toggle, pagination. Reads `?category=` and `?filter=` from
  the URL (used by header mega menu and "view flash sale" links).
- **Product details** — image gallery with hover zoom, variant/finish
  selector, quantity stepper, add to cart, buy now, wishlist, compare link,
  share (copies URL), description/specifications/shipping/reviews tabs,
  related products.
- **Cart** — full page + slide-over drawer, quantity controls, coupon codes
  (`WELCOME10`, `FREESHIP` are wired up as examples), shipping/tax estimate,
  order summary.
- Wishlist and cart persist to `localStorage` client-side (see "Next phase"
  below for why this will move server-side).

## Project structure

```
src/
  app/
    page.tsx                  Home
    shop/page.tsx              Shop
    product/[slug]/page.tsx    Product details
    cart/page.tsx              Cart
    layout.tsx                 Root layout, fonts, providers
    globals.css                Design tokens (colors, fonts) for Tailwind v4
  components/
    layout/                    Header (incl. mega menu, mobile drawer), Footer
    home/                       Hero, category strip, flash sale, product rail, etc.
    shop/                       Filters sidebar, sort bar, list row, pagination
    product/                    Product card/grid, image gallery, reviews
    cart/                       Cart drawer, order summary
    ui/                         Button, Badge, StarRating, PriceTag (signature tag component)
  context/
    cart-context.tsx           Cart state (swap for real API in Phase 3)
    wishlist-context.tsx       Wishlist state
  lib/
    types.ts                    Product/Category/Review types — mirrors the future Mongoose schema
    mock-data.ts                All mock products/categories/reviews — the one file to
                                replace with real API calls later
    format.ts                   Currency + class-name helpers
```

## Design notes

- Palette, type (Fraunces/Inter/JetBrains Mono), and the perforated
  "price tag" component are all deliberate choices — see the design plan
  discussed in the build — not a template default.
- Images are placeholder photos from picsum.photos, seeded by product slug so
  they stay stable across reloads. Swap `src/lib/mock-data.ts`'s `img()`
  helper for real Cloudinary URLs once you have product photography.

## Next phases (not yet built)

This is a large spec (categories page, search page, wishlist page, compare
page, checkout, user dashboard, admin dashboard, full Node/Express + MongoDB
backend, auth, Stripe/PayPal/COD, coupons engine, blog, etc.) — building it
all at once wasn't realistic to do well in one pass. Suggested order from here:

1. **Backend foundation** — Express + MongoDB/Mongoose models (`Product`,
   `Category`, `User`, `Order`, `Review`, `Coupon`), JWT + Google auth, REST
   routes. `src/lib/types.ts` was written to mirror what the schemas should
   look like.
2. **Wire the storefront to the API** — replace `mock-data.ts` calls with
   `fetch`s to the new backend; cart/wishlist move from `localStorage` to
   per-user server state once auth exists.
3. **Checkout & payments** — Stripe, PayPal, and Cash on Delivery; order
   status flow.
4. **User dashboard** — profile, orders, addresses, reviews.
5. **Admin dashboard** — product/category/order/coupon management, analytics.
6. **Remaining storefront pages** — Categories, Search, Wishlist, Compare,
   Blog, Contact, About.
7. **Cross-cutting polish** — dark mode, SEO metadata/schema/sitemap, image
   optimization, security headers, rate limiting.

## Environment variables (for later phases)

No `.env` is needed yet since everything here runs on mock data. When the
backend lands, you'll add a `.env.local` with things like:

```
MONGODB_URI=
JWT_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
STRIPE_SECRET_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
PAYPAL_CLIENT_ID=
PAYPAL_CLIENT_SECRET=
```
