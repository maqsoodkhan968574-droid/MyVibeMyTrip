# Rivanta Realty

A production-ready Next.js 15 real-estate marketplace starter with React, TypeScript, Tailwind CSS, PostgreSQL, Prisma ORM, and NextAuth.

## Features

- Premium responsive homepage with buy, rent, and sell search tabs
- Property listings with grid/list views, filters, and pagination UI
- Property detail pages with gallery, amenities, agent panel, WhatsApp CTA, visit scheduling, and SEO metadata
- Auth pages for register, login, forgot password, and social login entry points
- User dashboard for profile, saved properties, listings, leads, and enquiries
- Sell property workflow with image upload UI and verification stages
- Admin panel for users, properties, approvals, rejections, and analytics summary
- Prisma schema for User, Property, PropertyImage, Agent, Inquiry, SavedProperty, plus NextAuth adapter tables
- Dynamic sitemap, robots, Open Graph metadata, and mobile-first Tailwind UI

## Getting Started

1. Install dependencies:

```bash
pnpm install
```

2. Copy environment variables:

```bash
cp .env.example .env
```

3. Update `.env` with PostgreSQL and OAuth credentials:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/property_sphere?schema=public"
NEXTAUTH_SECRET="use-a-long-random-secret"
NEXTAUTH_URL="http://localhost:3000"
GOOGLE_CLIENT_ID="..."
GOOGLE_CLIENT_SECRET="..."
GITHUB_ID="..."
GITHUB_SECRET="..."
```

4. Generate Prisma client and run migrations:

```bash
pnpm prisma:generate
pnpm prisma:migrate
pnpm db:seed
```

5. Start the development server:

```bash
pnpm dev
```

Open `http://localhost:3000`.

## Production Notes

- Replace placeholder auth form buttons with server actions or client `signIn` calls for your preferred UX.
- Configure object storage such as S3, Cloudinary, or UploadThing for property image uploads.
- Add Google Maps or Mapbox credentials for live location maps.
- Protect `/dashboard`, `/sell`, and `/admin` with NextAuth middleware before launch.
- Use managed PostgreSQL and run `pnpm build` in CI before deployment.
