import { useEffect, useState } from 'react';
import { type Album, artist } from '@/data/artist';

// Apple Music/iTunes catalog artwork. Only accept releases attributed to this artist ID.
// Prefer the standard album, with its official deluxe artwork as a fallback.
const APPLE_ARTIST_ID = 1446486188;
type CatalogAlbum = { artistId?: number; artistName?: string; collectionName?: string; artworkUrl100?: string; collectionType?: string };
let catalogPromise: Promise<CatalogAlbum[]> | undefined;

function catalogAlbums(): Promise<CatalogAlbum[]> {
  if (!catalogPromise) {
    catalogPromise = fetch(`https://itunes.apple.com/lookup?id=${APPLE_ARTIST_ID}&entity=album&limit=200`)
      .then(response => { if (!response.ok) throw new Error('Artwork catalog unavailable'); return response.json(); })
      .then((data: { results?: CatalogAlbum[] }) => (data.results ?? []).filter(item => item.artistId === APPLE_ARTIST_ID && item.artworkUrl100 && item.collectionName))
      .catch(() => [] as CatalogAlbum[]);
  }
  return catalogPromise;
}

function artworkForAlbum(items: CatalogAlbum[], title: string): string | undefined {
  const normalize = (value: string) => value.toLowerCase().replace(/[^a-z0-9]/g, '');
  const exact = items.find(item => normalize(item.collectionName ?? '') === normalize(title));
  const deluxe = items.find(item => (item.collectionName ?? '').toLowerCase().startsWith(title.toLowerCase() + ' ('));
  const url = (exact ?? deluxe)?.artworkUrl100;
  return url?.replace(/\d+x\d+bb\.(jpg|png)/, '600x600bb.$1');
}

export function AlbumArt({ album, eager = false }: { album: Album; eager?: boolean }) {
  const [catalogArt, setCatalogArt] = useState<string>();
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    let mounted = true;
    setCatalogArt(undefined);
    setFailed(false);
    if (!album.artworkPath) catalogAlbums().then(items => { if (mounted) setCatalogArt(artworkForAlbum(items, album.title)); });
    return () => { mounted = false; };
  }, [album.title, album.artworkPath]);

  const artwork = album.artworkPath ?? catalogArt;
  if (artwork && !failed) return <img className="album-art real-art" src={artwork} alt={`${album.title} album artwork`} width={600} height={600} loading={eager ? 'eager' : 'lazy'} onError={() => setFailed(true)} />;
  return (
    <div className={`album-art art-${album.palette}`} role="img" aria-label={`${album.title} album cover unavailable; title shown instead`}>
      <span className="art-artist">{artist.name}</span>
      <div className="art-motif" aria-hidden="true"><span /><span /><span /></div>
      <span className="art-title">{album.title}</span>
      <span className="art-caption">Hayden Davis / Album</span>
    </div>
  );
}
