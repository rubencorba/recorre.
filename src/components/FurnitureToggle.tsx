import type { JSX } from 'react';

interface FurnitureToggleProps {
  isFurnished: boolean;
  onToggle: () => void;
}

/** Switches the current room between its empty and furnished panorama. */
export default function FurnitureToggle({ isFurnished, onToggle }: FurnitureToggleProps): JSX.Element {
  const label = isFurnished ? 'Ver sin muebles' : 'Amueblar';

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={isFurnished}
      aria-label={label}
      title={label}
      className="bar-button bar-button--labeled"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M4 12V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4" />
        <path d="M3 12h18v5a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1v-1H6v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z" />
        <line x1="5" y1="18" x2="5" y2="21" />
        <line x1="19" y1="18" x2="19" y2="21" />
      </svg>
      <span className="bar-button-label">{isFurnished ? 'Original' : 'Amueblar'}</span>
    </button>
  );
}