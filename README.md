# AIBA — AI Business Applications

The club website, built with Next.js and hosted on GitHub Pages at https://aiba-club.github.io.

## Edit the content

Everything you'll want to change is in `src/data/`:

| File | What it controls |
| --- | --- |
| `club.ts` | Club name, school, meeting day/time/room, email, Instagram, Discord |
| `lessons.ts` | The seven lessons, their tutorials and resources |
| `tools.ts` | The tools list and logos |
| `challenge.ts` | AIBA Cup rules, dates, prizes, standings |
| `projects.ts` | Projects and case studies |
| `faq.ts` | FAQ (also powers the chat assistant) |
| `about.ts`, `benefits.ts`, `home.ts` | About page and homepage copy |

Photos and images go in `public/`. Anything in `[BRACKETS]` is a placeholder to replace.

## Run it locally

```bash
npm install
npm run dev      # http://localhost:3000
```

## Deploy

Every push to `main` builds the site (`npm run build`, a static export to `out/`) and publishes it with
the GitHub Actions workflow in `.github/workflows/deploy.yml`.

One-time setup: in the repository go to **Settings → Pages → Build and deployment → Source** and choose **GitHub Actions**.
