import { useCallback } from 'react';
import { Link } from 'react-router-dom';

import { Icon } from '../components/Icon';
import { Mark } from '../components/Mark';
import { Reveal } from '../components/Reveal';
import { BarsViz, DeviceShowcase, MacroViz, RingViz, RouteViz } from '../components/AppVisuals';
import { useReveal } from '../hooks/useReveal';
import { APP_STORE_URL, PLAY_STORE_URL } from '../lib/config';

/** Splits a headline into per-word masks so each can rise on its own delay. */
function Kinetic({ text, offset = 0, className = '' }: { text: string; offset?: number; className?: string }) {
  return (
    <>
      {text.split(' ').map((w, i) => (
        <span className="w" key={`${w}-${i}`} style={{ '--w': i + offset } as React.CSSProperties}>
          {/* The gradient/serif class goes on the *inner* span. The outer one is
              the clipping mask, and background-clip:text there paints the wrapper
              while leaving the glyphs transparent — i.e. invisible. */}
          <span className={className}>{w}</span>
          {i < text.split(' ').length - 1 ? ' ' : ''}
        </span>
      ))}
    </>
  );
}

const SOURCES = ['ICMR–NIN Food Composition', 'Open Food Facts', 'USDA FoodData Central', 'Apple Health', 'Health Connect', 'No third-party trackers'];

const FLOW = [
  { n: '01', title: 'Set your intention', body: 'Tell Vive your goal. It reads your BMI and activity, then proposes a pace that is actually sustainable.' },
  { n: '02', title: 'Move and log', body: 'Track a route with GPS, log a meal in seconds, or let Apple Health and Health Connect do the work.' },
  { n: '03', title: 'Watch it add up', body: 'Weekly trends, not vanity numbers. Adjust the target whenever life changes — the plan recalculates.' },
];

/** Tile that lights up where the cursor points. */
function Tile({ className = '', children }: { className?: string; children: React.ReactNode }) {
  const { ref, shown } = useReveal<HTMLElement>();
  const onMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - r.left}px`);
    el.style.setProperty('--my', `${e.clientY - r.top}px`);
  }, []);
  return (
    <article
      ref={ref as never}
      onMouseMove={onMove}
      className={`tile reveal ${shown ? 'is-shown' : ''} ${className}`}
    >
      {children}
    </article>
  );
}

export function HomePage() {
  return (
    <>
      <div className="home-aura" aria-hidden="true" />
      <div className="home-grain" aria-hidden="true" />

      {/* ---------------- Hero ---------------- */}
      <section className="hero-v2">
        <div>
          <span className="hero-badge"><i /> Built for calm, not streaks</span>

          <h1 className="hero-h1">
            <Kinetic text="Move with" />
            <Kinetic text="intention." offset={2} className="hero-serif grad-text" />
          </h1>

          <p className="hero-lede">
            A private fitness and nutrition companion. Track what matters, understand your
            trends, and close the ring — with nobody watching over your shoulder.
          </p>

          <div className="hero-actions">
            <a className="btn btn-primary" href="#get"><Icon name="arrow" size={18} /> Get the app</a>
            <Link className="btn btn-ghost" to="/nutrition">See where our data comes from</Link>
          </div>

          <div className="hero-proof">
            <div><b>0</b><span>Cookies on this site</span></div>
            <div><b>1,000+</b><span>Foods, sourced &amp; dated</span></div>
            <div><b>100%</b><span>Exportable, always</span></div>
          </div>
        </div>

        <DeviceShowcase />
      </section>

      {/* ---------------- Sources marquee ---------------- */}
      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {[...SOURCES, ...SOURCES].map((s, i) => (
            <span key={i}><Icon name="check" size={15} /> {s}</span>
          ))}
        </div>
      </div>

      {/* ---------------- Bento ---------------- */}
      <Reveal className="section-head">
        <span className="section-kicker">What's inside</span>
        <h2>Six tools that stay out of your way.</h2>
        <p>Each one does a single job properly, and hands the result to the next.</p>
      </Reveal>

      <div className="bento">
        <Tile className="tile-wide">
          <span className="tile-kicker"><Icon name="map" size={14} /> Live tracking</span>
          <h3>Your route, drawn as you move</h3>
          <p>Walk, run, cycle or hike with GPS. Pace, distance and elevation appear in real time — pause, resume, done. The trace is yours, stored with the workout.</p>
          <div className="tile-art"><RouteViz /></div>
        </Tile>

        <Tile className="tile-third">
          <span className="tile-kicker"><Icon name="target" size={14} /> Daily goal</span>
          <h3>One ring to read</h3>
          <p>Energy in, energy out, closed at a glance.</p>
          <div className="tile-art" style={{ display: 'grid', placeItems: 'center' }}><RingViz pct={78} size={118} /></div>
        </Tile>

        <Tile className="tile-half">
          <span className="tile-kicker"><Icon name="chart" size={14} /> Insights</span>
          <h3>A week at a time</h3>
          <p>Real trends for energy, steps and weight — no vanity dashboards.</p>
          <div className="tile-art"><BarsViz /></div>
        </Tile>

        <Tile className="tile-half">
          <span className="tile-kicker"><Icon name="leaf" size={14} /> Nutrition</span>
          <h3>Macros that trace back to a source</h3>
          <p>Log against 1,000+ Indian dishes and packaged foods. Every value carries the database it came from and the date it was last checked.</p>
          <div className="tile-art"><MacroViz /></div>
        </Tile>

        <Tile className="tile-half">
          <span className="tile-kicker"><Icon name="sync" size={14} /> Health sync</span>
          <h3>Import, de-duplicated</h3>
          <p>Steps and workouts from Apple Health or Health Connect. A GPS run you already tracked will not be counted twice.</p>
        </Tile>

        <Tile className="tile-half">
          <span className="tile-kicker"><Icon name="bell" size={14} /> Reminders</span>
          <h3>Only if you want them</h3>
          <p>Meal nudges and a Sunday weigh-in. Scheduled on your device — nothing is sent to a server to fire them.</p>
        </Tile>
      </div>

      {/* ---------------- Flow ---------------- */}
      <section className="flow">
        <Reveal className="section-head">
          <span className="section-kicker">How it works</span>
          <h2>Three steps, then it gets out of the way.</h2>
        </Reveal>
        <div className="flow-list">
          {FLOW.map((s, i) => (
            <Reveal as="div" className="flow-item" delay={i * 110} key={s.n}>
              <div className="flow-n">{s.n}</div>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------------- Nutrition teaser ---------------- */}
      <section className="teaser">
        <Reveal className="teaser-card">
          <div className="teaser-copy">
            <span className="section-kicker">Nutrition database</span>
            <h2>Numbers you can check.</h2>
            <p>
              Every calorie and macro traces back to a real, open data source: the ICMR–NIN
              Indian Food Composition Tables, Open Food Facts, and USDA FoodData Central.
              We show exactly where each value came from, and when it was last updated.
            </p>
            <Link className="btn btn-primary" to="/nutrition">
              Explore the data <Icon name="arrow" size={18} />
            </Link>
          </div>
          <div className="teaser-badges">
            {['ICMR–NIN', 'Open Food Facts', 'USDA FDC'].map((s, i) => (
              <Reveal className="source-chip" delay={i * 90} key={s}>
                <Icon name="check" size={16} /> {s}
              </Reveal>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ---------------- Privacy ---------------- */}
      <section className="privacy-band">
        <Reveal className="privacy-inner">
          <span className="privacy-badge"><Icon name="shield" size={30} /></span>
          <h2>Your body. Your data. Your call.</h2>
          <p>
            We collect only what the app needs to work, we are clear about what we store,
            and you can export or delete it whenever you like — in plain language, not legalese.
          </p>
          <div className="privacy-cta">
            <Link className="btn btn-primary" to="/privacy">Read the Privacy Policy</Link>
            <Link className="btn btn-ghost" to="/terms">Terms of Service</Link>
          </div>
        </Reveal>
      </section>

      {/* ---------------- Get the app ---------------- */}
      <section className="getapp" id="get">
        <Reveal className="getapp-inner">
          <Mark size={64} animate idc="foot-cta" />
          <h2>Ready to move with intention?</h2>
          <p>Vive is coming to iOS and Android. Be among the first.</p>
          <div className="store-badges">
            <a className="store-badge" href={APP_STORE_URL || '#'}>
              <Icon name="arrow" size={18} />
              <span><small>Download on the</small><b>App Store</b></span>
            </a>
            <a className="store-badge" href={PLAY_STORE_URL || '#'}>
              <Icon name="arrow" size={18} />
              <span><small>Get it on</small><b>Google Play</b></span>
            </a>
          </div>
        </Reveal>
      </section>
    </>
  );
}
