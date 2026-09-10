This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploying

Pushing to `main` publishes the site. [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)
lints, builds and only then deploys, so a commit that does not compile stops
in CI instead of on the public URL. Every other branch and pull request gets
a preview deployment on the same pipeline.

The live site is **<https://lucas-marley.vercel.app/>**. That is the link to
share. The per-deployment URLs the CLI prints sit behind Vercel's login wall,
so they look fine to whoever is signed in and show a login page to everyone
else.

### One-time setup

The workflow needs three repository secrets, under
*Settings → Secrets and variables → Actions*:

| Secret | Where it comes from |
| --- | --- |
| `VERCEL_TOKEN` | <https://vercel.com/account/tokens> — scope it to the team that owns the project |
| `VERCEL_ORG_ID` | the `orgId` in `.vercel/project.json`, created by `vercel link` |
| `VERCEL_PROJECT_ID` | the `projectId` in the same file |

Nothing else needs copying into GitHub. `vercel pull` fetches the project's
environment variables at build time, so `RESEND_API_KEY` and `CONTACT_TO`
stay in Vercel and never exist in this repo.

### Deploying by hand

Still works, and does not go through CI:

```bash
npx vercel deploy --prod --yes
```
