import { Link } from 'react-router-dom';

import { Mark } from '../components/Mark';
import { Icon } from '../components/Icon';
import { Reveal } from '../components/Reveal';
import { useReveal } from '../hooks/useReveal';
import { useCountUp } from '../hooks/useCountUp';
import { APP_STORE_URL, PLAY_STORE_URL } from '../lib/config';

const FEATURES = [
  { icon: 'leaf', title: 'Nutrition, made simple', body: 'Log meals against a curated database of 1,000+ Indian dishes and packaged foods. See calories and macros per serving at a glance.' },
  { icon: 'map', title: 'Live workout tracking', body: 'Walk, run, cycle or hike with GPS. Your route, pace and distance are drawn in real time — pause, resume, done.' },
  { icon: 'sync', title: 'Health sync', body: 'Bring in steps and workouts from Apple Health or Health Connect. Duplicates are quietly filtered out.' },
  { icon: 'chart', title: 'Insights that add up', body: 'Weekly and monthly views of energy, steps and weight — real numbers, no vanity dashboards.' },
  { icon: 'bell', title: 'Gentle reminders', body: 'Meal nudges and a Sunday weigh-in, only if you want them. Everything runs on your device.' },
  { icon: 'target', title: 'Goals on your terms', body: 'Set a target, pace it weekly, pause or archive anytime. Your plan adapts as your weight changes.' },
];

const STEPS = [
  { n: '01', title: 'Set your intention', body: 'Tell Vive your goal and target. It works out a realistic weekly pace — nothing punishing.' },
  { n: '02', title: 'Move & log', body: 'Track workouts with GPS, log meals in seconds, or let Health sync do the heavy lifting.' },
  { n: '03', title: 'See it come together', body: 'Watch the ring close and the trends bend the right way. Adjust whenever life changes.' },
];

function Stat({ target, suffix, label, prefix }: { target: number; suffix?: string; prefix?: string; label: string }) {
  const { ref, shown } = useReveal<HTMLDivElement>();
  const value = useCountUp(target, shown);
  return (
    <div className="stat" ref={ref}>
      <div className="stat-value">{prefix}{value.toLocaleString()}{suffix}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

export function HomePage() {
  return (
    <>
      {/* ---------------- Hero ---------------- */}
      <section className="hero">
        <div className="hero-grid">
          <div className="hero-copy">
            <span className="eyebrow anim-fade-1"><Icon name="spark" size={15} /> Meet Vive</span>
            <h1 className="hero-title anim-fade-2">
              Move with <span className="grad-text">intention.</span>
            </h1>
            <p className="hero-sub anim-fade-3">
              A calm, private fitness &amp; nutrition companion. Track what matters,
              understand your trends, and close the ring — without anyone watching over your shoulder.
            </p>
            <div className="hero-cta anim-fade-4">
              <a className="btn btn-primary" href="#get">
                <Icon name="arrow" size={18} /> Get the app
              </a>
              <Link className="btn btn-ghost" to="/nutrition">How our data works</Link>
            </div>
            <p className="hero-note anim-fade-5">
              <Icon name="spark" size={15} /> Thoughtfully designed. You stay in control of your data.
            </p>
          </div>

          {/* Device / ring showpiece */}
          <div className="hero-art anim-pop">
            <div className="orb orb-a" />
            <div className="orb orb-b" />
            <div className="device">
              <div className="device-notch" />
              <div className="device-screen">
                <div className="ring-wrap">
                  <Mark size={150} animate idc="hero" />
                  <div className="ring-center">
                    <div className="ring-big">78%</div>
                    <div className="ring-small">daily goal</div>
                  </div>
                </div>
                <div className="mini-rows">
                  <div className="mini-row"><span><Icon name="flame" size={16} /> Energy</span><b>1,840 kcal</b></div>
                  <div className="mini-row"><span><Icon name="run" size={16} /> Steps</span><b>8,204</b></div>
                  <div className="mini-row"><span><Icon name="leaf" size={16} /> Protein</span><b>96 g</b></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <a className="scroll-cue" href="#trust" aria-label="Scroll down">
          <span /> <span className="scroll-cue-text">Scroll</span>
        </a>
      </section>

      {/* ---------------- Trust strip ---------------- */}
      <section className="trust" id="trust">
        <Reveal className="trust-head">
          <h2>Calm, and in your control.</h2>
          <p>This website sets no cookies and loads no third-party scripts — nothing to accept, nothing following you around. In the app, you decide what you share, and you can export or delete your data whenever you like.</p>
        </Reveal>
        <div className="stats">
          <Stat target={0} label="Cookies on this site" />
          <Stat target={1000} suffix="+" label="Foods in the database" />
          <Stat target={5} label="Open data sources" />
          <Stat target={100} suffix="%" label="Data you can export" />
        </div>
      </section>

      {/* ---------------- Features ---------------- */}
      <section className="features">
        <Reveal className="section-head">
          <span className="section-kicker">What's inside</span>
          <h2>Everything you need. Nothing you don't.</h2>
          <p>Six focused tools that work together — and stay out of your way.</p>
        </Reveal>
        <div className="feature-grid">
          {FEATURES.map((f, i) => (
            <Reveal as="article" className="feature-card" delay={i * 70} key={f.title}>
              <span className="feature-icon"><Icon name={f.icon} size={22} /></span>
              <h3>{f.title}</h3>
              <p>{f.body}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------------- How it works ---------------- */}
      <section className="steps">
        <Reveal className="section-head">
          <span className="section-kicker">How it works</span>
          <h2>Three steps to a calmer routine.</h2>
        </Reveal>
        <div className="step-row">
          {STEPS.map((s, i) => (
            <Reveal as="div" className="step" delay={i * 90} key={s.n}>
              <div className="step-n grad-text">{s.n}</div>
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
            <h2>Numbers you can trust — and check.</h2>
            <p>
              Every calorie and macro traces back to a real, open data source: the ICMR–NIN
              Indian Food Composition Tables, Open Food Facts, and USDA FoodData Central.
              We tell you exactly where each value comes from, and when it was last updated.
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

      {/* ---------------- Privacy band ---------------- */}
      <section className="privacy-band">
        <Reveal className="privacy-inner">
          <span className="privacy-badge"><Icon name="shield" size={30} /></span>
          <h2>Your body. Your data. Your call.</h2>
          <p>
            We collect only what's needed to make the app work, we're clear about what we store,
            and you can export or delete it whenever you like. Read exactly how it works — in plain language.
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
