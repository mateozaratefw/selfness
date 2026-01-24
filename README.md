# selfness

Personal site and writings.

## Structure

```
selfness/
├── writings/           # markdown files (source of truth)
├── images/             # image assets
├── music/              # audio files
├── covers/             # album covers
└── site/               # Next.js app
    ├── app/
    │   ├── page.tsx        # home - lists all writings
    │   ├── [slug]/         # dynamic routes for each writing
    │   └── components/     # ImageGallery, ImageLink, MusicPlayer
    └── public/
        └── fonts/          # Public Sans, Libre Franklin
```

## How writings work

1. Add a markdown file to `writings/` with frontmatter:
   ```md
   ---
   title: Your Title
   date: 2024-01-15
   ---

   Content here...
   ```

2. The home page reads all `.md` files, extracts frontmatter, and renders a list

3. Each writing gets a route at `/{filename-without-extension}`

4. Markdown is rendered with custom components:
   - Images pointing to folders become galleries
   - Links ending in `.mp3` with `▶` become music players

## Dev

```bash
cd site
yarn dev
```
