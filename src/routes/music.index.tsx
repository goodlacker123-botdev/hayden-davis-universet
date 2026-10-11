import { ArrowUpRight } from 'lucide-react';
import { artist } from '@/data/artist';
import { createFileRoute } from '@tanstack/react-router';
import { AlbumCard } from '@/components/album-card';
import { albums } from '@/data/artist';
import { pageHead } from '@/lib/metadata';
export const Route = createFileRoute('/music/')({ head: () => pageHead('Music & discography', 'Five distinct instrumental worlds. Explore the complete released discography of Hayden Davis, from The Death of a Star to These Days.', '/music'), component: Music });
function Music() {
 return <div className="page-width"><header className="page-intro"><span className="micro">The complete discography / Newest to oldest</span><h1>The music.</h1><p>Different worlds. Familiar feelings.<br />Find the story that stays with you.</p><div className="flex flex-wrap gap-5 mt-5"><a href={artist.spotifyUrl} target="_blank" rel="noopener noreferrer" className="text-link">Spotify <ArrowUpRight size={17} /></a><a href={artist.appleMusicUrl} target="_blank" rel="noopener noreferrer" className="text-link">Apple Music <ArrowUpRight size={17} /></a><a href={artist.bandcampUrl} target="_blank" rel="noopener noreferrer" className="text-link">Bandcamp store <ArrowUpRight size={17} /></a><a href={artist.musicLinksUrl} target="_blank" rel="noopener noreferrer" className="text-link">All streaming & purchase links <ArrowUpRight size={17} /></a></div></header><div className="album-grid music-grid">{albums.map((album,index) => <AlbumCard key={album.slug} album={album} index={index} />)}</div><p className="artwork-disclaimer">Album covers are loaded from the artist’s Apple Music catalog when available. A conceptual visual appears if artwork cannot be loaded.</p></div>;
}
