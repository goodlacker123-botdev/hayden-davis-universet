import { createFileRoute, Link } from '@tanstack/react-router';
import { ArrowUpRight } from 'lucide-react';
import { artist } from '@/data/artist';
import { pageHead } from '@/lib/metadata';
import theaterStudy from '@/assets/theater-study.jpg';
export const Route = createFileRoute('/about')({ head: () => pageHead('About the artist', 'Meet Hayden Davis, an independent instrumental musician creating music around memories, emotional storytelling, and the feelings that linger.', '/about'), component: About });
function About() { return <div className="page-width"><header className="page-intro"><span className="micro">Behind the music</span><h1>{artist.name}.</h1><p>Independent artist. Instrumental storyteller.</p></header><section className="about-body"><div><img src={theaterStudy} alt="An empty burgundy theater stage, a visual study of The Death of a Star's world" width={1600} height={1008} loading="lazy" /><p className="artwork-disclaimer">The Death of a Star / Stage concept study</p></div><div><h2>Stories without words.</h2><p>{artist.bio}</p><p>{artist.extendedBio}</p><Link to="/music" className="text-link">Explore the discography <ArrowUpRight size={17} /></Link></div></section></div>; }
