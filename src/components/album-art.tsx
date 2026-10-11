import { type Album, artist } from '@/data/artist';

export function AlbumArt({ album, eager = false }: { album: Album; eager?: boolean }) {
  if (album.artworkPath) return <img className="album-art real-art" src={album.artworkPath} alt={`${album.title} album artwork`} width={600} height={600} loading={eager ? 'eager' : 'lazy'} />;
  // Bespoke typographic visual studies, NOT genuine official album artwork.
  return (
    <div className={`album-art art-${album.palette}`} role="img" aria-label={`${album.title} — conceptual artwork study`}>
      <span className="art-artist">{artist.name}</span>
      <div className="art-motif" aria-hidden="true"><span /><span /><span /></div>
      <span className="art-title">{album.title}</span>
      <span className="art-caption">Instrumental / visual study</span>
    </div>
  );
}