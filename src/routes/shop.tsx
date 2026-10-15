import { useState } from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import { ArrowUpRight } from 'lucide-react';
import { AlbumArt } from '@/components/album-art';
import { albums, artist } from '@/data/artist';
import { pageHead } from '@/lib/metadata';

type Format = 'All formats' | 'Vinyl' | 'CD' | 'Digital';
type ShopOffer = { albumSlug: string; edition: string; format: Exclude<Format,'All formats'>; store: string; url: string; detail?: string; price?: string };
const offers: ShopOffer[] = [
 { albumSlug:'summer-blues',edition:'Standard edition',format:'Vinyl',store:'Bandcamp',url:'https://haydendavisoff.bandcamp.com/album/summer-blues',detail:'12-inch record + digital album · pressed and shipped by elasticStage',price:'From $37.99' },
 { albumSlug:'summer-blues',edition:'Standard edition',format:'CD',store:'Bandcamp',url:'https://haydendavisoff.bandcamp.com/album/summer-blues',detail:'Compact disc + digital album · made and shipped by elasticStage',price:'From $16.99' },
 { albumSlug:'summer-blues',edition:'Standard edition',format:'Digital',store:'Bandcamp',url:'https://haydendavisoff.bandcamp.com/album/summer-blues',detail:'MP3, FLAC and other high-quality formats',price:'From $7.99' },
 { albumSlug:'the-death-of-a-star',edition:'Standard edition',format:'Digital',store:'Bandcamp',url:'https://haydendavisoff.bandcamp.com/album/the-death-of-a-star',detail:'Visit the release page for current digital options' },
];
const formats:Format[]=['All formats','Vinyl','CD','Digital'];
export const Route = createFileRoute('/shop')({
 head:()=>pageHead('Shop music','Browse Hayden Davis vinyl, CDs and digital downloads in one place, with checkout through official external stores.','/shop'),
 component:Shop,
});
function Shop() {
 const [format,setFormat]=useState<Format>('All formats');
 const visible=offers.filter(offer=>format==='All formats'||offer.format===format);
 return <div className="shop-page"><div className="page-width">
  <header className="shop-intro"><span className="micro">Hayden Davis / Official music store directory</span><h1>Take the music<br/><em>home.</em></h1><p>Vinyl, CDs and digital downloads, gathered in one place. Choose a release, then complete your order directly with the listed store.</p></header>
  <div className="shop-toolbar"><span className="micro">Browse formats</span><div className="shop-filters" role="group" aria-label="Filter shop by format">{formats.map(item=><button type="button" key={item} className={format===item?'is-active':''} aria-pressed={format===item} onClick={()=>setFormat(item)}>{item}</button>)}</div></div>
  {visible.length ? <div className="shop-offers">{visible.map((offer,index)=>{const album=albums.find(a=>a.slug===offer.albumSlug);if(!album)return null;return <article className={`shop-offer era-${album.palette}`} key={offer.albumSlug+offer.format+index}><div className="shop-offer-art"><AlbumArt album={album}/></div><div className="shop-offer-copy"><span className="micro">{offer.format} / {offer.store}</span><h2>{album.title}</h2><p className="shop-edition">{offer.edition}</p><p>{offer.detail}</p><div className="shop-offer-actions">{offer.price&&<span className="shop-price">{offer.price}</span>}<a href={offer.url} target="_blank" rel="noopener noreferrer" className="shop-buy">View on {offer.store} <ArrowUpRight size={17}/></a></div></div></article>})}</div>:<div className="shop-empty"><h2>No verified listings in this format yet.</h2><p>More formats will appear here once their store listings are confirmed.</p><button onClick={()=>setFormat('All formats')}>View all formats</button></div>}
  <section className="shop-more"><div><span className="micro">More releases</span><h2>Explore the full catalog.</h2><p>Not every release has a verified purchase listing here yet. Browse the discography or visit the official stores to check for additional editions.</p><Link to="/music" className="text-link">View all albums <ArrowUpRight size={17}/></Link></div><div className="shop-store-list"><a href={artist.bandcampUrl} target="_blank" rel="noopener noreferrer">Bandcamp <ArrowUpRight size={17}/></a><a href={artist.musicLinksUrl} target="_blank" rel="noopener noreferrer">All official music links <ArrowUpRight size={17}/></a></div></section>
  <p className="shop-disclaimer">Checkout, shipping, taxes and availability are handled by each external store. Listed prices are starting prices observed at the time of verification and may change. This page is a directory, not a combined shopping cart.</p>
 </div></div>;
}