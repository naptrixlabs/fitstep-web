import type { CSSProperties, ReactNode } from 'react';
import { useReveal } from '../hooks/useReveal';

interface Props {
  children: ReactNode;
  /** stagger delay in ms */
  delay?: number;
  as?: 'div' | 'section' | 'li' | 'article';
  className?: string;
  style?: CSSProperties;
}

/** Fade + rise into view on first scroll intersection. */
export function Reveal({ children, delay = 0, as = 'div', className = '', style }: Props) {
  const { ref, shown } = useReveal();
  const Tag = as as 'div';
  return (
    <Tag
      ref={ref as never}
      className={`reveal ${shown ? 'is-shown' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms`, ...style }}
    >
      {children}
    </Tag>
  );
}
