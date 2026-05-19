# AGENT.md

This file provides guidance to any AI agent working with this repository.

---

## Project Overview

**Dexter Logistics** — a full-stack logistics/shipping website for a Pakistan-based cargo company. Customers can get shipping rates, contact the business, and track parcels. An authenticated admin panel manages orders, country rates, and parcel statuses.

**Stack:** Next.js 16 (App Router) · React 19 · TypeScript 5 · TailwindCSS v4 · shadcn/ui · Supabase · Framer Motion · GSAP

---

## Commands

```bash
npm run dev      # Start development server
npm run build    # Production build
npm run lint     # ESLint
npm run start    # Serve production build
```

No test runner is configured. TypeScript checking: `npx tsc --noEmit`

---

## Routes

| Route | Type | Purpose |
|---|---|---|
| `/` | Server | Home page — assembles all section components |
| `/about` | Server | About page |
| `/services` | Server | Services listing |
| `/contact` | Client | Contact form + Google Maps embed |
| `/contact/whatsapp` | Client | WhatsApp redirect page |
| `/track` | Client | Parcel tracking — search by UUID or phone number |
| `/admin/rates` | Client | Admin panel (auth-gated) — Country Rates + Orders tabs |
| `/api/admin/rates` | API Route | GET/POST JSON file-based legacy rates (still used by this route, verified via Supabase JWT) |
| `/api/meta/conversions` | API Route | Proxies events to Facebook Conversions API with PII hashing |

---

## Supabase Database

**Project:** `jxiubtdeykoonnktfhhk.supabase.co`

All types are in `lib/supabase.ts`. The shared singleton client is `export const supabase` from that file — use it everywhere on the client side. Server components instantiate their own client inline with `createClient(url, anonKey)`.

### Tables & RLS rules

| Table | Public read | Auth write |
|---|---|---|
| `countries` | ✅ (all rows) | ✅ |
| `parcel` | ✅ (all rows) | ✅ |
| `parcel_status` | ✅ | — |
| `feight_type` | ✅ | — |

**`countries`** — stores destination countries shown in the Destinations section and the admin rates tab.
- `country_name`: stores ISO 2-letter country code (e.g. `"GB"`), **not** the full name.
- Display name is derived via `new Intl.DisplayNames(['en'], { type: 'region' }).of(code)`.
- Flag emoji is derived from the ISO code via Unicode: `code.split('').map(c => String.fromCodePoint(0x1F1E6 + c.charCodeAt(0) - 65)).join('')`
- `is_active: false` hides the country from the public Destinations section.

**`parcel`** — shipping orders entered by the admin.
- `id`: UUID (used as customer-facing tracking ID).
- `status_id` → FK to `parcel_status(id)`, `freight_type_id` → FK to `feight_type(id)`.
- Note the typo in the DB: the join relation is `feight_type` (not `freight_type`). The joined field on `Parcel` type is `parcel.feight_type`.

**`parcel_status`** — lookup table. `sort_order` defines the visual progression order in the tracking timeline. Add/reorder rows here to change the timeline on `/track`.

**`feight_type`** — lookup table for freight types (Air, Sea, etc.). `sort_order` controls dropdown order.

### Admin authentication

The admin panel (`/admin/rates`) uses **Supabase Auth** (`signInWithPassword`). The session is persisted in localStorage automatically — page reload does not log out. The `/api/admin/rates` API route verifies requests via `Authorization: Bearer <access_token>` header using `supabase.auth.getUser(token)`.

---

## Key Architecture Patterns

### Server vs. Client components

- **Section components** (`components/sections/`) are mostly **async server components** — they fetch data directly during SSR. `DestinationsSection` calls Supabase inline without the shared client singleton.
- **Page components** under `app/(root)/page.tsx` compose section components.
- **Admin panel** and **Track page** are fully client-side (`"use client"`) and use the shared `supabase` singleton from `lib/supabase.ts`.

### Navigation links across pages

`components/navigation.tsx` uses `usePathname()` to prefix hash links: on `/`, links are `#home`; on any other page they become `/#home`. Always use this pattern — do not hardcode hash-only hrefs in the nav.

### Meta / Facebook Pixel

Every meaningful user action calls `sendMetaEvent()` from `lib/meta-client.ts`. This fires:
1. The browser-side `fbq()` pixel (client-only).
2. A POST to `/api/meta/conversions` which server-side forwards to the Facebook Graph API with PII hashed via SHA-256.

The `event_id` is shared between both calls to deduplicate on Meta's side.

### Flag display

- **Admin table rows:** `ReactCountryFlag` from `react-country-flag` (client component, takes `countryCode` prop).
- **Admin add/edit forms:** `ReactFlagsSelect` from `react-flags-select` (searchable dropdown, `selected`/`onSelect` props use ISO codes).
- **Public Destinations section (server):** emoji derived from ISO code via the Unicode formula above — no library needed.

### Legacy rates system

`lib/rates-store.ts` and `/api/admin/rates` handle a JSON-file-based rate store (`data/country-rates.json`) that predates the Supabase `countries` table. This route is still active but the admin UI no longer uses it for managing rates — it now reads/writes `countries` directly via Supabase. The API route is kept for backwards compatibility.

---

## Environment Variables

```
NEXT_PUBLIC_SUPABASE_URL          # Supabase project URL
NEXT_PUBLIC_SUPABASE_ANON_KEY     # Supabase anon key (public)
NEXT_PUBLIC_META_PIXEL_ID         # Facebook Pixel ID (client-side)
META_PIXEL_ID                     # Facebook Pixel ID (server-side)
META_ACCESS_TOKEN                 # Facebook Graph API token (server-only)
META_GRAPH_VERSION                # Optional, defaults to v20.0
META_TEST_EVENT_CODE              # Optional, for Meta test events
RATES_FILE_PATH                   # Optional override for legacy JSON rates file path
```

---

## Styling

TailwindCSS v4 with PostCSS. Colors use the `oklch` color space via CSS variables. Dark/light theme via `next-themes` (`ThemeProvider` in root layout). Component library is **shadcn/ui** (style: `new-york`, icon library: `lucide-react`). Path alias `@/*` resolves to the project root.

---

## Known Gotchas

- `feight_type` is a typo in the DB table and FK name — it is intentional (matches the actual schema). Do not rename it.
- `country_name` stores ISO 2-letter codes, not full country names, despite the column name.
- `next.config.mjs` has `images: { unoptimized: true }` and `typescript: { ignoreBuildErrors: true }`.
- `parcel_status.lable` and `feight_type.lable` — "label" is misspelled in the DB schema. Match it exactly in queries and types.
- The `/track` page fetches `parcel_status` on mount to build the timeline — adding/reordering rows in that table immediately affects the public tracking UI.
