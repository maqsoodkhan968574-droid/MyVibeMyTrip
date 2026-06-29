# Project Boundaries

This workspace currently contains two different products. Keep them separate.

## MyVibeMyTrip.com

- Active project in the root Next.js app.
- Travel startup website, compatibility quiz, destinations, group packages, package itineraries, partner page, and contact pages.
- Build command: `pnpm build`
- Dev command: `pnpm dev`
- Assigned local port: `3000`
- GitHub remote: `myvibemytrip`

## Rivanta Realty

- Separate real-estate project.
- Do not mix Rivanta routes, components, or preview code into MyVibeMyTrip commits.
- The `rivanta-preview/` folder is treated as a separate project archive/preview and is excluded from the MyVibeMyTrip TypeScript build.

## Rules

- Do not copy travel features into Rivanta Realty.
- Do not copy real-estate routes into MyVibeMyTrip.
- Stage and commit only files for the project being changed.
- If both projects need work, handle them in separate commits and preferably separate repositories.
