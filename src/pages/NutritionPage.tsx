import { useEffect, useState } from 'react';

import { api, type DataSourcesPayload } from '../lib/api';
import { Icon } from '../components/Icon';
import { RichText } from '../components/RichText';
import { Reveal } from '../components/Reveal';
import { CONTACT_EMAIL } from '../lib/config';

export function NutritionPage() {
  const [data, setData] = useState<DataSourcesPayload | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    api.dataSources()
      .then((d) => { if (alive) setData(d); })
      .catch(() => { if (alive) setError('We couldn’t load the data sources right now. Please try again shortly.'); });
    return () => { alive = false; };
  }, []);

  return (
    <div className="doc-page">
      <div className="doc-hero">
        <div className="doc-hero-inner">
          <span className="section-kicker">Nutrition database</span>
          <h1>Where our numbers come from.</h1>
          <p className="doc-lede">
            Vive's food values are drawn from trusted, open nutrition datasets. We keep the raw
            source for every food, tag it with a version and an update date, and show it to you.
            Values are a helpful guide — real dishes vary with recipe, brand and portion.
          </p>
        </div>
      </div>

      <div className="doc-body">
        {!data && !error && (
          <div className="ns-grid">
            {Array.from({ length: 4 }).map((_, i) => <div className="ns-card ns-skel" key={i} />)}
          </div>
        )}
        {error && (
          <div className="doc-error">
            <p>{error}</p>
            <p className="muted">Questions about our data? Email <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.</p>
          </div>
        )}
        {data && (
          <div className="ns-grid">
            {data.sections.map((s, i) => (
              <Reveal as="article" className="ns-card" delay={i * 70} key={s.title}>
                <span className="ns-icon"><Icon name={s.icon} size={22} /></span>
                <h2>{s.title}</h2>
                <div className="ns-body"><RichText text={s.body} /></div>
                {s.links && s.links.length > 0 && (
                  <div className="ns-links">
                    {s.links.map((l) => (
                      <a className="ns-link" href={l.url} target="_blank" rel="noreferrer noopener" key={l.url}>
                        <Icon name="external" size={15} /> {l.label}
                      </a>
                    ))}
                  </div>
                )}
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
