import { createFileRoute, Link } from '@tanstack/react-router';
import { ArrowRight, ArrowUpRight, MoveDownRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AlbumArt } from '@/components/album-art';
import { albums, artist } from '@/data/artist';
import { pageHead } from '@/lib/metadata';
import theaterStudy from '@/assets/theater-study.jpg';

export const Route = createFileRoute('/')({
  head: () => pageHead('Official artist website', 'Explore the instrumental worlds of Hayden Davis. Discover The Death of a Star, Summer Blues, Silent Goodbyes, and the complete discography.', '/'),
  component: Index,
});

function Index() {
  return <div className="cinematic-home">
    <div className="home-opening page-width"><div className="home-opening-top"><span className="micro">An archive of sound & feeling</span><span className="micro">Hayden Davis / Est. in music</span></div><div className="home-opening-name"><span>HAYDEN</span><span>DAVIS<span className="home-name-star">✳</span></span></div><div className="home-opening-bottom"><span>Independent instrumental artist</span><span>{artist.tagline}</span><MoveDownRight size={27} aria-hidden="true" /></div></div>
    <section className="stage-hero" aria-labelledby="latest-title">
      {/* Generated stage concept, not an artist photograph or official album cover. */}
      <img className="stage-image" src={theaterStudy} alt="Burgundy theater curtains opening onto an empty, softly lit stage — visual concept" width={1600} height={1008} fetchPriority="high" />
      <div className="stage-content"><div className="stage-top"><span className="micro">Now showing / The fifth record</span><span className="micro">An instrumental motion picture</span></div><h2 id="latest-title" className="stage-title">The Death<br />of a Star<span>.</span></h2><div className="stage-bottom"><div><p>Fame. Fire. The final curtain.</p><Button asChild className="stage-action"><Link to="/music/$slug" params={{ slug: "the-death-of-a-star" }}>Enter the album <ArrowUpRight size={16} /></Link></Button><Link to="/music/$slug" params={{ slug: "the-death-of-a-star" }} className="text-link" style={{ marginLeft: "1rem" }}>Listen now <ArrowUpRight size={16} /></Link></div><p className="stage-side-note">A cinematic instrumental world.<br />An ending that echoes.</p></div></div>
    </section>
    <div className="stage-under page-width"><span className="micro">Act I — The latest release</span><Link to="/music/$slug" params={{ slug: 'the-death-of-a-star' }} className="text-link">Step inside the album <ArrowRight size={15} /></Link></div>
    <section className="releases-section page-width"><div className="section-heading"><div><span className="micro">The discography / Five chapters</span><h2>Every record is<br /><em>another world.</em></h2></div><Link to="/music" className="text-link">Full discography <ArrowUpRight size={17} /></Link></div><div className="era-exhibition">{albums.map((album,index) => <Link key={album.slug} to="/music/$slug" params={{ slug: album.slug }} className={`era-exhibition-item era-${album.palette} era-exhibition-${index}`}><div className="era-exhibition-image"><AlbumArt album={album} /></div><div className="era-exhibition-info"><span className="micro">Record {String(albums.length-index).padStart(2,"0")} / {album.palette}</span><h3>{album.title}</h3><p>{album.theme}</p><span className="era-exhibition-enter">Enter this era <ArrowUpRight size={17}/></span></div></Link>)}</div></section>
    <section className="artist-note page-width home-listen-section" aria-labelledby="listen-title"><span className="micro">Listen everywhere</span><div><h2 id="listen-title">Your next listen<br />starts here.</h2><p>Explore the music on your favorite platform, or find streaming, downloads, and physical editions in one place.</p><div className="flex flex-wrap gap-5 mt-5"><a href={artist.spotifyUrl} className="text-link" target="_blank" rel="noopener noreferrer">Spotify <ArrowUpRight size={17} /></a><a href={artist.appleMusicUrl} className="text-link" target="_blank" rel="noopener noreferrer">Apple Music <ArrowUpRight size={17} /></a><a href={artist.bandcampUrl} className="text-link" target="_blank" rel="noopener noreferrer">Shop music <ArrowUpRight size={17} /></a><a href={artist.musicLinksUrl} className="text-link" target="_blank" rel="noopener noreferrer">All music links <ArrowUpRight size={17} /></a></div></div></section>
    <section className="artist-note page-width home-manifesto"><span className="micro">Behind the music</span><div><h2>No words.<br />Plenty left to say.</h2><p>{artist.bio}</p><Link to="/about" className="text-link">Meet {artist.name} <ArrowUpRight size={17} /></Link></div></section>
  </div>;
}
