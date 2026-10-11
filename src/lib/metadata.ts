import { artist } from '@/data/artist';

export function pageHead(title: string, description: string, path: string) {
  return {
    meta: [
      { title: `${title} — ${artist.name}` },
      { name: 'description', content: description },
      { property: 'og:title', content: `${title} — ${artist.name}` },
      { property: 'og:description', content: description },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: artist.siteUrl ? `${artist.siteUrl}${path}` : path },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
    // Never guess a public domain. No canonical until the owner supplies it.
    links: artist.siteUrl ? [{ rel: 'canonical', href: `${artist.siteUrl}${path}` }] : [],
  };
}