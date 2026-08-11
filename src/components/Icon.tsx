// A small inline-SVG icon set (stroke-based, 24×24). Names cover the site's
// feature cards and the server-driven data-source section icons.
const paths: Record<string, string> = {
  // features
  leaf: 'M11 20A7 7 0 0 1 4 13c0-4 3-8 9-9 1 6-1 12-6 14M4 13c6 0 10-3 12-7',
  map: 'M9 4 3 6v14l6-2 6 2 6-2V4l-6 2-6-2Zm0 0v14m6-12v14',
  sync: 'M4 12a8 8 0 0 1 13.6-5.7L20 8M20 4v4h-4M20 12a8 8 0 0 1-13.6 5.7L4 16m0 4v-4h4',
  chart: 'M4 20V6M4 20h16M8 20v-6M12 20V9M16 20v-9M20 20v-4',
  bell: 'M18 16v-5a6 6 0 1 0-12 0v5l-2 2h16l-2-2ZM10 20a2 2 0 0 0 4 0',
  target: 'M12 12m-8 0a8 8 0 1 0 16 0a8 8 0 1 0-16 0M12 12m-4 0a4 4 0 1 0 8 0a4 4 0 1 0-8 0M12 12h.01',
  // data-source section icons (map API names)
  flame: 'M12 3c1 3-2 4-2 7a2 2 0 0 0 4 0c0-1 0-1-.5-2 2 1 3.5 3 3.5 6a5 5 0 1 1-10 0c0-4 4-6 5-11Z',
  gauge: 'M12 13l4-3M4 18a8 8 0 1 1 16 0M12 13m-1 0a1 1 0 1 0 2 0a1 1 0 1 0-2 0',
  bolt: 'M13 2 4 14h7l-1 8 9-12h-7l1-8Z',
  run: 'M13 5a2 2 0 1 0 0-.01M8 21l3-5 3 2 1-5m-6 0-2-3 5-3 3 3 3 1',
  heart: 'M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.5-7 10-7 10Z',
  // ui
  shield: 'M12 3 5 6v5c0 5 3 8 7 10 4-2 7-5 7-10V6l-7-3Z',
  lock: 'M6 11V8a6 6 0 0 1 12 0v3M5 11h14v10H5V11Z',
  eyeoff: 'M3 3l18 18M10.6 10.6A2 2 0 0 0 12 14a2 2 0 0 0 1.4-.6M6.7 6.7C4.6 8 3 10 2 12c2 4 6 7 10 7 1.6 0 3.2-.4 4.5-1.1M9.9 5.2A9.8 9.8 0 0 1 12 5c4 0 8 3 10 7a16 16 0 0 1-2.3 3.3',
  spark: 'M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18',
  arrow: 'M5 12h14M13 6l6 6-6 6',
  external: 'M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5',
  check: 'M4 12l5 5L20 6',
};

interface Props { name: string; size?: number; className?: string }

export function Icon({ name, size = 24, className = '' }: Props) {
  const d = paths[name] ?? paths.spark;
  return (
    <svg
      className={`icon ${className}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d={d} />
    </svg>
  );
}
