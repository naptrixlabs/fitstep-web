import { useEffect, useState } from 'react';

import { api, type ContentDoc } from '../lib/api';
import { RichText } from '../components/RichText';
import { Reveal } from '../components/Reveal';
import { CONTACT_EMAIL } from '../lib/config';

interface Props { slug: string; fallbackTitle: string }

// Strip a leading "Title" / "Last updated:" preamble from the body so we can
// render them in the page header instead of duplicating them in the prose.
function splitPreamble(doc: ContentDoc): { updated: string | null; body: string } {
  const lines = doc.body.replace(/\r\n/g, '\n').split('\n');
  let updated: string | null = null;
  let start = 0;
  const titleL = doc.title.trim().toLowerCase();
  for (let i = 0; i < Math.min(4, lines.length); i++) {
    const l = lines[i].trim();
    if (!l) { start = i + 1; continue; }
    const low = l.toLowerCase();
    if (low.startsWith('last updated')) { updated = l.replace(/^last updated:?\s*/i, ''); start = i + 1; continue; }
    // Strip a leading title line even when it's brand-prefixed, e.g.
    // "Vive — Terms of Service" vs the doc title "Terms of Service".
    if (low.includes(titleL) || titleL.includes(low)) { start = i + 1; continue; }
    break;
  }
  return { updated, body: lines.slice(start).join('\n').trim() };
}

export function DocPage({ slug, fallbackTitle }: Props) {
  const [doc, setDoc] = useState<ContentDoc | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    setDoc(null); setError(null);
    api.contentDoc(slug)
      .then((d) => { if (alive) setDoc(d); })
      .catch(() => { if (alive) setError('We couldn’t load this page right now. Please try again shortly.'); });
    return () => { alive = false; };
  }, [slug]);

  const parsed = doc ? splitPreamble(doc) : null;

  return (
    <div className="doc-page">
      <div className="doc-hero">
        <div className="doc-hero-inner">
          <span className="section-kicker">Legal</span>
          <h1>{doc?.title ?? fallbackTitle}</h1>
          {parsed?.updated && <p className="doc-updated">Last updated {parsed.updated}</p>}
        </div>
      </div>

      <div className="doc-body">
        {!doc && !error && (
          <div className="doc-skeleton">
            {Array.from({ length: 6 }).map((_, i) => <span key={i} style={{ width: `${90 - i * 6}%` }} />)}
          </div>
        )}
        {error && (
          <div className="doc-error">
            <p>{error}</p>
            <p className="muted">If it keeps happening, email <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.</p>
          </div>
        )}
        {parsed && (
          <Reveal className="prose">
            <RichText text={parsed.body} />
          </Reveal>
        )}
      </div>
    </div>
  );
}
