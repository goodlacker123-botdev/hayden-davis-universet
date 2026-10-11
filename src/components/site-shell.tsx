import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Link, useRouterState } from '@tanstack/react-router';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { artist } from '@/data/artist';

const navigation = [{ to: '/', label: 'Home' }, { to: '/music', label: 'Music' }, { to: '/about', label: 'About' }, { to: '/contact', label: 'Contact' }] as const;

export function SiteShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: state => state.location.pathname });
  const menuRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => {
    if (!open) return;
    menuRef.current?.querySelector<HTMLAnchorElement>('a')?.focus();
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setOpen(false); toggleRef.current?.focus(); }
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [open]);
  return (
    <>
      <a href="#main-content" className="skip-link">Skip to content</a>
      <header className="site-header page-width">
        <Link to="/" className="wordmark" aria-label={`${artist.name} home`}>HD<span className="wordmark-dot">.</span></Link>
        <nav aria-label="Main navigation" className="desktop-nav">
          {navigation.map(item => <Link key={item.to} to={item.to} activeOptions={{ exact: item.to === '/' }} activeProps={{ className: 'nav-active' }}>{item.label}</Link>)}
        </nav>
        <span className="header-note micro">Independent instrumental artist</span>
        <Button ref={toggleRef} variant="ghost" size="icon" className="mobile-toggle" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</Button>
      </header>
      {open && <nav ref={menuRef} id="mobile-navigation" className="mobile-nav page-width" aria-label="Mobile navigation">{navigation.map(item => <Link key={item.to} to={item.to} activeOptions={{ exact: item.to === '/' }} activeProps={{ className: 'nav-active' }}>{item.label}<ArrowUpRight size={24} /></Link>)}</nav>}
      <main id="main-content">{children}</main>
      <footer className="site-footer page-width">
        <div className="footer-top"><Link to="/" className="footer-name">{artist.name}<span>.</span></Link><p>Independent music.<br />A world of its own.</p><Link to="/contact" className="text-link">Get in touch <ArrowUpRight size={17} /></Link></div>
        <div className="footer-bottom"><span>© {new Date().getFullYear()} {artist.name}</span><span>Instrumental music. Emotional storytelling.</span><nav aria-label="Footer navigation"><Link to="/music">Music</Link><Link to="/about">About</Link><Link to="/contact">Contact</Link>{artist.socials.map(social => <a key={social.label} href={social.url} target="_blank" rel="noopener noreferrer">{social.label}</a>)}</nav></div>
      </footer>
    </>
  );
}