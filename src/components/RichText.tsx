import type { ReactNode } from 'react';

// The content API returns plain text (not markdown): blank-line-separated
// blocks, occasional "1. Heading" section titles, and "•"/"-" bullet lines.
// This renders that into clean, readable HTML without a markdown dependency.

function isHeading(line: string): boolean {
  const t = line.trim();
  if (t.length === 0 || t.length > 80) return false;
  // "1. Eligibility", "12. Something"
  if (/^\d+\.\s+\S/.test(t) && !t.endsWith('.')) return true;
  return false;
}

export function RichText({ text }: { text: string }): ReactNode {
  const blocks = text.replace(/\r\n/g, '\n').split(/\n{2,}/).map((b) => b.trim()).filter(Boolean);
  return (
    <>
      {blocks.map((block, i) => {
        const lines = block.split('\n').map((l) => l.trim()).filter(Boolean);

        // Bulleted block
        const bulletLines = lines.filter((l) => /^[•\-*]\s+/.test(l));
        if (bulletLines.length && bulletLines.length === lines.length) {
          return (
            <ul className="rt-list" key={i}>
              {lines.map((l, j) => <li key={j}>{l.replace(/^[•\-*]\s+/, '')}</li>)}
            </ul>
          );
        }

        // Single heading line
        if (lines.length === 1 && isHeading(lines[0])) {
          return <h3 className="rt-h" key={i}>{lines[0]}</h3>;
        }

        // Heading followed by paragraph text
        if (lines.length > 1 && isHeading(lines[0])) {
          return (
            <div key={i}>
              <h3 className="rt-h">{lines[0]}</h3>
              <p className="rt-p">{lines.slice(1).join(' ')}</p>
            </div>
          );
        }

        return <p className="rt-p" key={i}>{lines.join(' ')}</p>;
      })}
    </>
  );
}
