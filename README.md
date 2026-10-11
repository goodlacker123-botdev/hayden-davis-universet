# Hayden Davis — Official artist website

## Maintaining the site

All artist copy and albums live in `src/data/artist.ts`. Change `artist.name`, biography, `contactEmail`, and verified social URLs there. The contact page opens a local email draft; it does not send or store anything. With no configured inbox, visitors must supply a recipient themselves.

Albums are in newest-to-oldest order. Add genuine cover images under `src/assets` (import and assign the imported URL to `artworkPath`) or `public/artwork` (assign `/artwork/filename.jpg`). Set `artworkIsPlaceholder` to false once genuine artwork is added. The current CSS covers and generated stage photograph are creative concept studies, not official album artwork or artist photos.

Add verified streaming, purchase, and website URLs to each album's `links`. Absent links remain hidden. The Final Bow Edition's purchase link is separate, and that edition must never be offered as streaming. Unknown tracklists are omitted. Unannounced projects stay off the site entirely until officially announced.

Set `artist.siteUrl` only when the real public domain is available. This enables page canonical URLs. At that point, create `public/sitemap.xml` containing `/`, `/music`, all five `/music/{slug}` pages, `/about`, and `/contact`, and add its absolute URL to `public/robots.txt`. No placeholder sitemap hostname is shipped.

Metadata lives on each content route. Generated bundled images intentionally have no relative OpenGraph image URL. No analytics, tracking cookies, newsletter, or data collection is installed.

## Checks

Run `bunx vitest run src/data/artist.test.ts` for release ordering, tracklist integrity, edition restrictions, and mail-draft validation.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Open your project in the [Lovable editor](https://lovable.dev) and keep building.

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: connect the project to GitHub and every change made in Lovable is committed straight to your repository.
- **Full ownership**: this code is yours. Push to your repository and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

## Built with

- TanStack Start
- TypeScript
- React
- Tailwind CSS
