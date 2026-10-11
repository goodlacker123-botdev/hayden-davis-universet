import { describe, expect, it } from 'vitest';
import { albums, createMailDraft, getEditionTracks } from './artist';

describe('confirmed artist release rules', () => {
  it('keeps all five released albums in the supplied order', () => {
    expect(albums.map(a => a.title)).toEqual(['The Death of a Star', 'Summer Blues', 'Silent Goodbyes', 'Lost in the Memories', 'These Days']);
    expect(albums.every(a => a.status === 'released')).toBe(true);
  });
  it('keeps the standard tracklist exactly as confirmed', () => {
    expect(albums[0]?.tracks).toEqual(['The Opening Performance (Act I)', 'Under the Marquee Lights', 'Talk of the Town', 'Rise of a Spectacle (Interlude)', 'The Fading Spotlight (Act II)', 'Battle For the Lead', 'Fall From Fame', 'Pull the Plug (Interlude)', 'The Comeback (Act III)', 'When the Lights Go Out', 'Finale in Flames', 'Embers of the Mistakes', 'Ashes on the Stage', 'The Death of a Star']);
  });
  it('keeps the six deluxe tracks within the same album', () => {
    const album = albums[0]; if (!album) throw new Error('Missing latest album');
    expect(getEditionTracks(album, true).slice(14)).toEqual(['Once the Dust Settles (Interlude)', 'The Final Bow (Act IV)', 'After the Applause', 'Play It Back', 'Keep the Show Going', 'Exit Stage Left']);
    expect(getEditionTracks(album, false)).toHaveLength(14);
    expect(getEditionTracks(album, true)).toHaveLength(20);
  });
  it('never offers Final Bow as streaming and limits it to the three confirmed formats', () => {
    expect(albums[0]?.edition?.streamingAvailable).toBe(false);
    expect(albums[0]?.edition?.formats).toEqual(['Digital download', 'CD', 'Vinyl']);
  });
  it('excludes unannounced projects from the site entirely', () => {
    expect(albums.every(a => a.status === 'released')).toBe(true);
  });
  it('uses the supplied microsite only as an album website', () => {
    expect(albums[0]?.links).toEqual({ website: 'https://hd5album.netlify.app' });
  });
  it('omits unconfirmed tracklists for other albums', () => {
    expect(albums.slice(1).every(a => a.tracks === undefined)).toBe(true);
  });
});
describe('local email draft', () => {
  it('rejects a missing or invalid recipient', () => {
    expect(createMailDraft('', 'Listener', 'Music', 'Hello')).toBeUndefined();
    expect(createMailDraft('not-an-email', 'Listener', 'Music', 'Hello')).toBeUndefined();
  });
  it('encodes the draft and requires the recipient to be supplied', () => {
    expect(createMailDraft('artist@example.test', 'Listener', 'Music & stories', 'Hello Hayden')).toBe('mailto:artist%40example.test?subject=Music%20%26%20stories&body=Hello%20Hayden%0A%0AListener');
  });
});