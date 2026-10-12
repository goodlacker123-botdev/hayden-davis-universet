export type AlbumPalette = 'star' | 'summer' | 'goodbyes' | 'memories' | 'days';
export interface AlbumEdition {
  title: string;
  tracks: string[];
  formats: ('Digital download' | 'CD' | 'Vinyl')[];
  streamingAvailable: boolean;
  purchaseUrl?: string;
}
export interface Album {
  slug: string;
  title: string;
  status: 'released';
  palette: AlbumPalette;
  theme: string;
  description: string;
  note: string;
  // Replace the concept study with a genuine cover path when supplied.
  artworkPath?: string;
  artworkIsPlaceholder: boolean;
  tracks?: string[];
  edition?: AlbumEdition;
  links: { website?: string; streaming?: string; purchase?: string; deluxeStreaming?: string; bandcamp?: string; physical?: string; tunegoody?: string; appleMusic?: string; spotify?: string; amazonMusic?: string };
}

export const artist = {
  name: 'Hayden Davis',
  tagline: 'Stories without words.',
  bio: 'Independent instrumental music shaped around memories, stories, and the feelings that linger.',
  extendedBio: 'Each release inhabits its own world: the bittersweet light of summer, the quiet of a goodbye, the pull of a memory, or the final moments beneath a fading spotlight. These are stories told through instrumental music, with room for the listener to find their own meaning.',
  // Add a real inbox here to remove the recipient field on the contact page.
  contactEmail: '',
  // Add verified URLs only. Empty entries are not rendered.
  socials: [] as { label: string; url: string }[],
  // Set only once the actual public domain is known (no trailing slash).
  siteUrl: '',
  musicLinksUrl: 'https://hyperfollow.com/haydendavis12',
  spotifyUrl: 'https://open.spotify.com/artist/2KkUezJZiTh9ooy5Fuzv3B',
  appleMusicUrl: 'https://music.apple.com/us/artist/hayden-davis/1446486188',
  bandcampUrl: 'https://haydendavisoff.bandcamp.com/',
};

export const albums: Album[] = [
  {
    slug: 'the-death-of-a-star', title: 'The Death of a Star', status: 'released', palette: 'star',
    theme: 'Fame. Fire. The final curtain.',
    description: 'A cinematic world of marquee lights, ambition, and the cost of being seen. Told in acts, The Death of a Star follows the spectacle of a rise, the silence of a fall, and what remains when the lights go out.',
    note: 'An instrumental story in three acts. From the opening performance to the ashes left on the stage.',
    artworkIsPlaceholder: true,
    tracks: ['The Opening Performance (Act I)', 'Under the Marquee Lights', 'Talk of the Town', 'Rise of a Spectacle (Interlude)', 'The Fading Spotlight (Act II)', 'Battle For the Lead', 'Fall From Fame', 'Pull the Plug (Interlude)', 'The Comeback (Act III)', 'When the Lights Go Out', 'Finale in Flames', 'Embers of the Mistakes', 'Ashes on the Stage', 'The Death of a Star'],
    edition: {
      title: 'The Final Bow Edition',
      tracks: ['Once the Dust Settles (Interlude)', 'The Final Bow (Act IV)', 'After the Applause', 'Play It Back', 'Keep the Show Going', 'Exit Stage Left'],
      formats: ['Digital download', 'CD', 'Vinyl'], streamingAvailable: false,
    },
    links: {website: 'https://hd5album.netlify.app', bandcamp: 'https://haydendavisoff.bandcamp.com/album/the-death-of-a-star', appleMusic: 'https://music.apple.com/us/album/the-death-of-a-star/1868886199', amazonMusic: 'https://music.amazon.com/albums/B0GGL3QX76' },
  },
  {
    slug: 'summer-blues', title: 'Summer Blues', status: 'released', palette: 'summer',
    theme: 'A season. A feeling. A little blue.',
    description: 'Soft light, distant horizons, and the bittersweet feeling of a summer that cannot stay. A world of vacation memories and warmth touched by melancholy.',
    note: 'For the moments between the sunshine and the leaving.',
    artworkIsPlaceholder: true, links: {streaming: 'https://distrokid.com/hyperfollow/haydendavis3/summer-blues', deluxeStreaming: 'https://distrokid.com/hyperfollow/haydendavis3/summer-blues-the-low-tide-edition', bandcamp: 'https://haydendavisoff.bandcamp.com/album/summer-blues', physical: 'https://haydendavisoff.bandcamp.com/album/summer-blues', appleMusic: 'https://music.apple.com/us/album/summer-blues-the-low-tide-edition/1832402539', amazonMusic: 'https://music.amazon.com/albums/B0FLW6PJFS' },
  },
  {
    slug: 'silent-goodbyes', title: 'Silent Goodbyes', status: 'released', palette: 'goodbyes',
    theme: 'Some endings have no words.',
    description: 'A deep-green world of friendships, distance, and farewell. Silent Goodbyes sits with the space between people, and the feelings that remain when their paths split.',
    note: 'The quiet weight of growing apart.',
    artworkIsPlaceholder: true, links: {appleMusic: 'https://music.apple.com/us/album/silent-goodbyes-the-echoes-of-friendships-edition/1764688025', amazonMusic: 'https://music.amazon.com/albums/B0DDX5RMMP' },
  },
  {
    slug: 'lost-in-the-memories', title: 'Lost in the Memories', status: 'released', palette: 'memories',
    theme: 'The past, after dark.',
    description: 'Night thoughts and the pull of reminiscence. A dark-blue world where old moments return, familiar yet changed, and memories become somewhere to get lost.',
    note: 'For the thoughts that stay awake with you.',
    artworkIsPlaceholder: true, links: {appleMusic: 'https://music.apple.com/us/album/lost-in-the-memories-the-intrusive-thoughts-edition/1757778706',  },
  },
  {
    slug: 'these-days', title: 'These Days', status: 'released', palette: 'days',
    theme: 'Between daylight and deep space.',
    description: 'Mustard yellow meets black in a world of day, night, and space. These Days finds a story in shifting light and the ordinary moments held between it.',
    note: 'A different perspective on the everyday.',
    artworkIsPlaceholder: true, links: {deluxeStreaming: 'https://distrokid.com/hyperfollow/haydendavis3/these-days-the-insomnia-edition-2', appleMusic: 'https://music.apple.com/us/album/these-days-the-insomnia-edition/1756410049',  },
  },
];


export function getAlbum(slug: string) { return albums.find(album => album.slug === slug); }
export function getEditionTracks(album: Album, expanded: boolean) {
  return [...(album.tracks ?? []), ...(expanded ? album.edition?.tracks ?? [] : [])];
}

export function createMailDraft(recipient: string, name: string, subject: string, message: string) {
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(recipient.trim())) return undefined;
  return `mailto:${encodeURIComponent(recipient.trim())}?subject=${encodeURIComponent(subject.trim())}&body=${encodeURIComponent(`${message.trim()}\n\n${name.trim()}`)}`;
}