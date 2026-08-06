# Capital Chowringhee Pvt Ltd — Nikon Experience Zone

Static Next.js website for Capital Chowringhee Pvt Ltd, Nikon Experience Zone in Kolkata.

## Stack

- Next.js (App Router, static export via `output: "export"`)
- Tailwind CSS + shadcn/ui (Base UI primitives)
- Framer Motion for animations
- Product catalogue as markdown files (`content/products/*.md`), parsed with `gray-matter` + `remark`

## Development

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Adding a product

Add a new markdown file to `content/products/`, following the frontmatter shape of an existing product (title, slug, category, price, specs, etc). It's picked up automatically — no code changes needed. Product images currently use a placeholder graphic; set the `image` frontmatter field to a path under `public/images/products/` once real photos are available.

## Build

```bash
pnpm build
```

Outputs a fully static site to `out/`.
