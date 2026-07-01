# NOVA Storefront

A production-style storefront slice built fas a practical testing. It implements the NOVA listing and product-detail designs using [Next.js 16](https://nextjs.org) (App Router), TypeScript, and Tailwind CSS v4, with product data from the public [DummyJSON](https://dummyjson.com) API.

The brief asked for a focused listing, detail flow with search/filter, proper loading/error/empty states, and design fidelity. This repo delivers that core scope and adds several stretch-level features (pagination, cart, accessibility, performance-minded patterns) plus a few deliberate extras that improve navigation and polish.

---

## How to run

**Prerequisites:** Node.js 20+ and npm.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the development server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |

No environment variables are required. DummyJSON is a public API with no API key.

---

## Routes

| Route | Description |
|-------|-------------|
| `/` | Product listing with search, category filter, and pagination |
| `/products/[id]` | Product detail page |
| `/cart` | Shopping cart |

**URL query params on the listing page:**

- `?category=beauty` — pre-selects a category filter (slug from DummyJSON)
- `?page=2` — pagination (20 products per page)

These params compose: e.g. `/?category=beauty&page=2`.

---

## What the brief asked for

### 1. Product listing (`/`)

- Responsive, mobile-first product grid
- Fetches products from DummyJSON
- Shows image, title, price, and rating
- Cards link through to the detail page

### 2. Search or filter

- Header text search (title, description, category)
- Category filter chips on the listing page
- Search and category filters work together as a single pipeline

### 3. Product detail (`/products/[id]`)

- Dynamic App Router route
- Full product information with a clear way back to the listing
- Image gallery, pricing, description, availability, and specs

### 4. States

- **Loading** — route-level skeletons for listing and detail
- **Error** — route-level error UI with retry
- **Empty** — dedicated empty state when filters return no results

### 5. Design & quality

- Layout, spacing, typography, and hover states aligned with the provided NOVA designs
- Semantic HTML, labels, focus states, and `aria-*` attributes where it matters
- `next/image` for product imagery

---

## Beyond the brief (implemented extras)

These were stretch goals in the PDF or natural extensions that were built out fully.

### Pagination

- Client-side pagination: **20 products per page**
- Page state synced to the URL (`?page=N`) so pages are bookmarkable and back/forward friendly
- Resets to page 1 when search or category changes

### Shopping cart

- **Add to cart** from the product grid and detail page (with quantity on detail)
- **Cart page** (`/cart`) — review items, adjust quantities, remove lines, see subtotal
- **Header cart icon** with live item-count badge
- Cart persisted in **localStorage** (survives refresh) via `useSyncExternalStore` for safe SSR hydration
- Product cards show an **In cart** state when an item is already selected

### Navigation & breadcrumbs

- Clickable **breadcrumbs** on the detail page: `Shop / Category / Product`
- The middle category segment links back to the listing with that category pre-filtered (`/?category=…`)
- **Back to products** link, header logo, and Shop nav all return to the listing

### URL-driven category filter

- Category chip selection updates the URL (`?category=slug`)
- Arriving from a breadcrumb or shared link restores the correct filter without extra clicks

### Product detail enhancements

- Thumbnail **image gallery** with selectable images
- **Quantity selector** before add-to-cart
- Discount display (original price, percentage badge) when DummyJSON reports a discount
- Availability and shipping copy formatted from API fields

### Data layer

- Typed API models (`types/api.ts`) mapped once in `services/products.ts` into shared domain types (`Product`, `Category`)
- Server fetches with **1-hour revalidation** (`next: { revalidate: 3600 }`)
- Listing page loads products and categories in parallel

### UI architecture

```
app/                  Routes, layouts, loading/error boundaries
components/
  layout/             Header, Logo, Navigation, CartLink
  product/            Cards, grid, listing, detail, breadcrumbs, skeletons
  cart/               Cart view, line items, checkout modal
  ui/                 Search, filters, pagination, icons, shared states
hooks/                useSearch, useProductFilters, usePagination, useCart
services/             DummyJSON fetch + mapping
utils/                filterProducts, formatPrice, formatCategoryName, …
types/                Product, Category, Cart, API shapes
```

### Other polish

- Shared **skeleton**, **error**, and **empty** components
- Centralised **icons** and **formatting utilities** to avoid duplication
- **Favicon** and app icon (purple NOVA “N”)
- Wishlist button on cards (UI placeholder; no persistence yet)

---

## Key technical decisions

### Server components for data, client components for interactivity

Listing and detail **pages** fetch on the server. Search, filters, pagination, and cart live in client components wrapped by providers in the root layout (`SearchProvider`, `CartProvider`). This keeps the initial HTML meaningful while still allowing rich client-side interaction.

### Single fetch + client-side filtering

All products (~194) are loaded once, then search, category, and pagination run on the filtered set. For this catalog size that keeps combined filters simple, avoids waterfall requests, and makes “search then filter” (or the reverse) behave predictably. A larger catalog would warrant server-driven search/pagination (see improvements below).

### One filter pipeline

`utils/filterProducts.ts` applies **search first, then category** in a single function. Both `useProductFilters` and the listing UI depend on this one path, which prevented the common bug where category chips filter an already-narrowed list incorrectly.

### Cart state without hydration issues

Cart uses a module-level store + `useSyncExternalStore` with a **cached empty snapshot** for `getServerSnapshot`. That satisfies React’s snapshot stability rules, avoids infinite re-render loops, and loads persisted items from localStorage only on the client.

### External images

DummyJSON serves images from its CDN. `next/image` is used with `unoptimized` for those remote URLs to avoid extra image optimisation config while still getting layout and `sizes` benefits.

---

## What I’d improve with more time

### Product discovery & UX

- **Sorting** — price (low → high / high → low), alphabetical, rating, and “on sale only”
- **Recently viewed** — store last N product IDs in sessionStorage and surface a carousel on listing or detail
- **Similar products** — same-category recommendations on the detail page (or lightweight embedding similarity later)
- **Fuzzy search** — tolerate typos (e.g. Fuse.js) and **highlight matching terms** in titles/descriptions
- **Wishlist** — persist favourites alongside cart, with a dedicated view

### Performance & architecture

- **Virtualised product grid** — render only visible rows/columns (e.g. TanStack Virtual) when the catalog outgrows client-side filtering; keeps DOM size and scroll performance more stable, although given the fact that pagination has been implemented it might not be neccessary.
- **Server-driven pagination and search** — move `?page`, `?q`, and `?category` to DummyJSON’s `limit` / `skip`, `/products/search`, and `/products/category/:slug` endpoints so the client never holds the full catalog; pair with shallow URL updates and stale-while-revalidate caching
- **Full URL state for filters** — sync search query to `?q=` for shareable filtered views and analytics; debounce writes to avoid history spam
- **Observability** — Web Vitals reporting, structured logging for API failures, and error boundaries with digest IDs for production debugging

## Tech stack

| Layer | Choice |
|-------|--------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Data | DummyJSON Products API |
| State | React context + `useSyncExternalStore` (cart), URL search params (pagination/category) |

---

## Project structure (quick reference)

```
app/
  page.tsx                    Listing (server fetch)
  loading.tsx / error.tsx
  cart/page.tsx
  products/[id]/page.tsx      Detail (server fetch)
  products/[id]/loading.tsx / error.tsx
  layout.tsx                  Root layout, providers, header
  globals.css                 Design tokens
components/                   UI by feature (see architecture above)
hooks/                        Client state hooks
services/products.ts          API access + mapping
utils/                        Pure helpers
types/                        Shared TypeScript types
```

---

## Notes for reviewers

- **Design fidelity** was prioritised over feature count; spacing, typography, and component states follow the reference layouts.
- **Stretch items from the PDF** (pagination, cart, `next/image`, accessibility) are implemented, not just listed as TODOs.
- **Checkout** is deliberately a no-op with a tongue-in-cheek message.
- The codebase favours **small, readable modules** over abstraction layers there is no evidence for yet (no Redux, no UI kit dependency).


❁❁❁❁❁❁❁❁Made by: Lisa Ramizi❁❁❁❁❁❁❁❁❁❁❁❁❁❁❁❁❁❁❁❁❁❁❁
