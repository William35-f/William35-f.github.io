# Hein Htet Aung · Portfolio

Personal portfolio of Hein Htet Aung (William), Applied AI & Analytics student at Singapore Polytechnic.
Live at **https://william35-f.github.io**.

Built with Next.js (static export), Tailwind CSS, Framer Motion and Lenis smooth scrolling. GitHub Actions deploys it to GitHub Pages on every push to `main`.

## Edit content

Everything on the site (profile, projects, skills, experience, certifications) lives in [`src/data/site.ts`](src/data/site.ts).
To add a project, add an entry to the `projects` array and put its images in `public/projects/<slug>/`.

## Run locally

```bash
npm install
npm run dev    # http://localhost:3000
npm run build  # static site in ./out
```
