import { useState, type FormEvent } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { artist, createMailDraft } from '@/data/artist';
import { pageHead } from '@/lib/metadata';
export const Route = createFileRoute('/contact')({ head: () => pageHead('Contact', 'Prepare an email draft for Hayden Davis. For creative conversations and music enquiries, with no data collected by this website.', '/contact'), component: Contact });
function Contact() {
 const [status,setStatus] = useState('');
 const [error,setError] = useState(false);
 function submit(event: FormEvent<HTMLFormElement>) {
  event.preventDefault(); const data = new FormData(event.currentTarget);
  const url = createMailDraft(artist.contactEmail || String(data.get('recipient') ?? ''),String(data.get('name') ?? ''),String(data.get('subject') ?? ''),String(data.get('message') ?? ''));
  if (!url) { setError(true); setStatus('Please enter a valid recipient email address.'); return; }
  setError(false); setStatus('Your email draft is ready. Complete and send it in your mail app. Nothing has been sent by this website.'); window.location.href = url;
 }
 return <div className="page-width"><header className="page-intro"><span className="micro">Start a conversation</span><h1>Get in touch.</h1><p>For music, creative conversations, and everything in between.</p></header><div className="contact-layout"><aside><span className="micro">A note before you write</span><p>{artist.contactEmail ? 'Your message will open as a draft in your preferred mail app.' : 'A public contact address has not been added yet. If you already have Hayden’s email address, enter it to prepare your message.'}</p><p>No messages or personal details are stored here. You choose when to send.</p>{artist.socials.map(social => <a className="text-link" key={social.label} href={social.url} target="_blank" rel="noopener noreferrer">{social.label} <ArrowUpRight size={17} /></a>)}</aside><form className="contact-form" onSubmit={submit}>{!artist.contactEmail && <label>Recipient email<input name="recipient" type="email" autoComplete="off" required placeholder="Hayden’s email address, if you have it" /></label>}<div className="form-row"><label>Your name<input name="name" autoComplete="name" required maxLength={120} /></label><label>Subject<input name="subject" required maxLength={200} /></label></div><label>Your message<textarea name="message" required maxLength={5000} rows={5} /></label><Button type="submit">Open email draft <ArrowUpRight size={16} /></Button><p aria-live="polite" className={`contact-status${error ? ' error' : ''}`}>{status || 'Opens your mail app. Does not submit or send a message.'}</p></form></div></div>;
}
