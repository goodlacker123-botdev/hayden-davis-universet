<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Artist-site architecture
- Keep artist identity, release details, artwork provenance, and verified outbound URLs in `src/data/artist.ts` so every page uses the same editable source of truth.
- Use `/music` as an Outlet layout with index and dynamic album leaves so album navigation remains type-safe and each content page owns its metadata.
- Keep visual roles and album palettes in `src/styles.css`; concept artwork must remain explicitly distinguished from official covers.
- Contact only prepares a client-side mail draft; never collect or submit visitor data without an explicit new requirement.
- Add canonical links and a generated sitemap only after a real public domain is configured, to avoid misleading search engines.
