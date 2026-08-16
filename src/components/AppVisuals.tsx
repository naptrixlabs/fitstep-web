import { useEffect, useMemo, useRef, useState } from 'react';

import { Icon } from './Icon';
import { useReveal, prefersReducedMotion } from '../hooks/useReveal';

/* ============================================================
   Live miniatures of what the app actually shows.

   Every one of these is real UI reduced to its essence — a route being
   drawn, a week of energy, a ring closing — rather than a stock icon. They
   animate once on scroll-in, and render in their finished state immediately
   when the visitor prefers reduced motion.
   ============================================================ */

/** Closing activity ring — the app's Today screen in one mark. */
export function RingViz({ pct = 78, size = 132 }: { pct?: number; size?: number }) {
  const { ref, shown } = useReveal<HTMLDivElement>();
  const r = size / 2 - 10;
  const c = 2 * Math.PI * r;
  return (
    <div className="viz-ring" ref={ref} style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden="true">
        <circle cx={size / 2} cy={size / 2} r={r} className="viz-ring-track" strokeWidth="9" fill="none" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          className="viz-ring-value"
          strokeWidth="9"
          fill="none"
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          style={{
            strokeDasharray: c,
            strokeDashoffset: shown ? c - (c * pct) / 100 : c,
          }}
        />
      </svg>
      <div className="viz-ring-label">
        <b>{pct}%</b>
        <span>daily goal</span>
      </div>
    </div>
  );
}

/** A tracked route drawing itself — the GPS workout screen. */
export function RouteViz() {
  const { ref, shown } = useReveal<HTMLDivElement>();
  const d = 'M12 104C30 96 34 70 52 64s28 14 44 6 22-34 40-38 30 10 44 4';
  return (
    <div className={`viz-route ${shown ? 'is-drawn' : ''}`} ref={ref}>
      <svg viewBox="0 0 192 120" aria-hidden="true" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="routeGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#2BB6AC" />
            <stop offset="100%" stopColor="#17817A" />
          </linearGradient>
        </defs>
        {/* faint grid, like the map tiles under the trace */}
        {[24, 48, 72, 96].map((y) => (
          <line key={y} x1="0" y1={y} x2="192" y2={y} className="viz-route-grid" />
        ))}
        {[48, 96, 144].map((x) => (
          <line key={x} x1={x} y1="0" x2={x} y2="120" className="viz-route-grid" />
        ))}
        <path d={d} className="viz-route-ghost" fill="none" strokeWidth="3" />
        <path d={d} className="viz-route-line" fill="none" strokeWidth="3" strokeLinecap="round" />
        <circle className="viz-route-dot" r="5" />
      </svg>
      <div className="viz-route-stats">
        <span><b>5.2</b> km</span>
        <span><b>28</b> min</span>
        <span><b>412</b> kcal</span>
      </div>
    </div>
  );
}

/** A week of energy — bars grow in on reveal. */
export function BarsViz() {
  const { ref, shown } = useReveal<HTMLDivElement>();
  const days = useMemo(() => [52, 74, 61, 88, 70, 96, 80], []);
  return (
    <div className={`viz-bars ${shown ? 'is-shown' : ''}`} ref={ref}>
      {days.map((h, i) => (
        <span key={i} style={{ '--h': `${h}%`, '--i': i } as React.CSSProperties}>
          <i />
          <em>{'MTWTFSS'[i]}</em>
        </span>
      ))}
    </div>
  );
}

/** Macro split — protein / carbs / fat, drawn as a segmented arc. */
export function MacroViz() {
  const { ref, shown } = useReveal<HTMLDivElement>();
  const segs = [
    { label: 'Protein', v: 96, color: 'var(--m-protein)' },
    { label: 'Carbs', v: 180, color: 'var(--m-carbs)' },
    { label: 'Fat', v: 62, color: 'var(--m-fat)' },
  ];
  const total = segs.reduce((a, s) => a + s.v, 0);
  const r = 46;
  const c = 2 * Math.PI * r;
  let offset = 0;
  return (
    <div className="viz-macro" ref={ref}>
      <svg width="112" height="112" viewBox="0 0 112 112" aria-hidden="true">
        {segs.map((s) => {
          const len = (s.v / total) * c;
          const el = (
            <circle
              key={s.label}
              cx="56"
              cy="56"
              r={r}
              fill="none"
              stroke={s.color}
              strokeWidth="10"
              strokeLinecap="butt"
              transform="rotate(-90 56 56)"
              style={{
                strokeDasharray: `${len} ${c - len}`,
                strokeDashoffset: shown ? -offset : -offset + c,
                transition: 'stroke-dashoffset 1.1s cubic-bezier(.22,.61,.36,1)',
              }}
            />
          );
          offset += len;
          return el;
        })}
      </svg>
      <ul className="viz-macro-key">
        {segs.map((s) => (
          <li key={s.label}>
            <i style={{ background: s.color }} /> {s.label} <b>{s.v}g</b>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ============================================================
   The phone. Cycles through three real screens so the hero shows the
   product moving rather than one frozen frame.
   ============================================================ */

const SCREENS = ['Today', 'Workout', 'Meals'] as const;

export function DeviceShowcase() {
  const [i, setI] = useState(0);
  const paused = useRef(false);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const t = window.setInterval(() => {
      if (!paused.current) setI((n) => (n + 1) % SCREENS.length);
    }, 4200);
    return () => window.clearInterval(t);
  }, []);

  return (
    <div
      className="device-showcase"
      onMouseEnter={() => { paused.current = true; }}
      onMouseLeave={() => { paused.current = false; }}
    >
      <div className="glow glow-a" aria-hidden="true" />
      <div className="glow glow-b" aria-hidden="true" />

      <div className="phone">
        <div className="phone-bezel">
          <div className="phone-speaker" />
          <div className="phone-screen">
            <div className="phone-status">
              <span>9:41</span>
              <span className="phone-status-r"><i /><i /><i /></span>
            </div>

            <div className="phone-stage">
              {/* Today */}
              <div className={`phone-panel ${i === 0 ? 'is-active' : ''}`}>
                <p className="phone-greet">Good morning, Alex</p>
                <div className="phone-ring"><RingViz pct={78} size={148} /></div>
                <div className="phone-rows">
                  <div><span><Icon name="flame" size={15} /> Energy</span><b>1,840 kcal</b></div>
                  <div><span><Icon name="run" size={15} /> Steps</span><b>8,204</b></div>
                  <div><span><Icon name="leaf" size={15} /> Protein</span><b>96 g</b></div>
                </div>
              </div>

              {/* Workout */}
              <div className={`phone-panel ${i === 1 ? 'is-active' : ''}`}>
                <p className="phone-greet">Evening run</p>
                <div className="phone-route"><RouteViz /></div>
                <div className="phone-rows">
                  <div><span>Pace</span><b>5:24 / km</b></div>
                  <div><span>Elevation</span><b>84 m</b></div>
                </div>
              </div>

              {/* Meals */}
              <div className={`phone-panel ${i === 2 ? 'is-active' : ''}`}>
                <p className="phone-greet">Today's meals</p>
                <div className="phone-meals">
                  {[
                    ['Poha & peanuts', 'Breakfast', '320'],
                    ['Dal, rice, salad', 'Lunch', '540'],
                    ['Grilled paneer', 'Dinner', '430'],
                  ].map(([n, m, k]) => (
                    <div className="phone-meal" key={n}>
                      <span className="phone-meal-dot" />
                      <span><b>{n}</b><em>{m}</em></span>
                      <span className="phone-meal-k">{k}</span>
                    </div>
                  ))}
                </div>
                <div className="phone-macro"><MacroViz /></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="phone-tabs" role="tablist" aria-label="App screens">
        {SCREENS.map((s, n) => (
          <button
            key={s}
            role="tab"
            aria-selected={i === n}
            className={i === n ? 'is-on' : ''}
            onClick={() => setI(n)}
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}
