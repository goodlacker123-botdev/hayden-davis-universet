import { ArrowUpRight } from 'lucide-react';
import { artist } from '@/data/artist';
import { createFileRoute } from '@tanstack/react-router';
import { AlbumCard } from '@/components/album-card';
import { albums } from '@/data/artist';
import { pageHead } from '@/lib/metadata';
export const Route = createFileRoute('/music/')({ head: () => pageHead('Music & discography', 'Five distinct instrumental worlds. Explore the complete released discography of Hayden Davis, from The Death of a Star to These Days.', '/music'), component: Music });
function Music() {
 return <div className="page-width"><header className="page-intro"><span className="micro">The complete discography / Newest to oldest</span><h1>The music.</h1><p>Different worlds. Familiar feelings.<br />Find the story that stays with you.</p><a href={artist.musicLinksUrl} target="_blank" rel="noopener noreferrer" className="text-link">Find my music on streaming platforms <ArrowUpRight size={17} /></a></header><div className="album-grid music-grid">{albums.map((album,index) => <AlbumCard key={album.slug} album={album} index={index} />)}</div><p className="artwork-disclaimer">Release visuals are conceptual artwork studies, not official album covers.</p></div>;
}
