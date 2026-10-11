import { Link } from '@tanstack/react-router';
import { ArrowUpRight } from 'lucide-react';
import type { Album } from '@/data/artist';
import { AlbumArt } from './album-art';

export function AlbumCard({ album, index }: { album: Album; index: number }) {
  return (
    <Link to="/music/$slug" params={{ slug: album.slug }} className="album-link">
      <div className="album-image-wrap"><AlbumArt album={album} /><span className="album-open" aria-hidden="true"><ArrowUpRight size={23} /></span></div>
      <div className="album-card-meta"><span className="micro">0{index + 1} / ALBUM</span><ArrowUpRight size={16} aria-hidden="true" /></div>
      <h3>{album.title}</h3>
      <p>{album.theme}</p>
    </Link>
  );
}