# Abishek's Portfolio

Personal portfolio of **Abishek Anand** — AI/ML Engineer and Full-Stack Developer. Built with Next.js 15, Sanity CMS, and Tailwind CSS.

**Live site:** [https://my-portfolio-abi-0611.vercel.app](https://my-portfolio-abi-0611.vercel.app)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router, Turbopack) |
| Styling | Tailwind CSS v4 |
| CMS | Sanity v3 (with embedded Studio) |
| Animations | Framer Motion, Paper Design Shaders |
| Forms | React Hook Form + Zod |
| Deployment | Vercel |

---

## Features

- **Home** — animated hero with shader background, skills showcase
- **About** — timeline, tech stack, downloadable CV
- **Projects** — dynamic cards pulled from Sanity CMS
- **Experience** — work history from Sanity CMS
- **Blog** — Sanity-powered posts with Portable Text renderer
- **Contact** — WhatsApp + email delivery, social dock
- **Sanity Studio** — embedded CMS at `/studio`
- **SEO** — JSON-LD schema, Open Graph, sitemap, robots.txt
- **Dark/light theme** — system-aware with manual toggle
- **Accessibility** — skip-to-content link, ARIA labels

---

## Local Development

### 1. Clone and install

```bash
git clone https://github.com/abi-0611/my-portfolio.git
cd my-portfolio
npm install
```

### 2. Configure environment variables

Create `.env.local` in the project root:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production

# Social links
NEXT_PUBLIC_GITHUB_URL=https://github.com/abi-0611
NEXT_PUBLIC_LINKEDIN_URL=https://www.linkedin.com/in/abishek-anand-6230782bb/
NEXT_PUBLIC_INSTAGRAM_URL=https://www.instagram.com/abizzzzzzz06/
NEXT_PUBLIC_CONTACT_EMAIL=abivec2006@gmail.com

# Contact (without +)
WHATSAPP_NUMBER=917604919294
```

### 3. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start dev server with Turbopack |
| `npm run build` | Production build |
| `npm run start` | Serve production build |
| `npm run lint` | Run ESLint |

---

## Project Structure

```
app/
  (routes)/          # Page routes — home, about, projects, experience, blog, contact
  studio/            # Embedded Sanity Studio
  layout.tsx         # Root layout with metadata & JSON-LD
components/
  layout/            # Navbar, footer
  sections/          # Page-level section components
  ui/                # Reusable UI primitives
lib/
  sanity.ts          # Sanity client
  queries.ts         # GROQ queries
  contact-action.ts  # Server action for contact form
sanity/
  schemas/           # Sanity content schemas
```

---

## Deploying

This project is deployed on **Vercel**. Every push to `master` triggers an automatic deployment.

To deploy your own fork:
1. Import the repo at [vercel.com/new](https://vercel.com/new)
2. Add the environment variables from `.env.local` in the Vercel dashboard
3. Deploy

---

## License

MIT

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
