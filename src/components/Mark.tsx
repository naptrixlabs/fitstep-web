interface Props {
  size?: number;
  /** animate the arc drawing itself + the goal dot settling in */
  animate?: boolean;
  /** unique id suffix so multiple gradients on one page don't collide */
  idc?: string;
  className?: string;
}

/**
 * The Vive logomark — a single open Ember arc with the goal dot set ahead of
 * its leading end. Geometry matches branding/vive-mark.svg and the app's
 * ViveMark. When `animate` is set the arc strokes itself in and the dot pops.
 */
export function Mark({ size = 44, animate = false, className = '' }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      className={`mark ${animate ? 'mark-animate' : ''} ${className}`}
      aria-hidden="true"
      focusable="false"
    >
      <path
        className="mark-arc"
        d="M44.10 16.52 A34 34 0 1 0 83.48 44.10"
        fill="none"
        stroke="#24A29A"
        strokeWidth="9"
        strokeLinecap="round"
      />
      <circle className="mark-dot" cx="72.75" cy="24.73" r="6" fill="#E7EDEC" />
    </svg>
  );
}

export function Wordmark({ size = 44, animate = false, idc = 'w' }: Props) {
  return (
    <span className="wordmark">
      <Mark size={size} animate={animate} idc={idc} />
      <span className="wordmark-text">Vive</span>
    </span>
  );
}
