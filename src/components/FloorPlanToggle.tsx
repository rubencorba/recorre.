import type { JSX } from 'react';

interface FloorPlanToggleProps {
  isOpen: boolean;
  onToggle: () => void;
}

export default function FloorPlanToggle({ isOpen, onToggle }: FloorPlanToggleProps): JSX.Element {
  const label = isOpen ? 'Ocultar plano' : 'Mostrar plano';

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={isOpen}
      aria-label={label}
      title={label}
      className="bar-button bar-button--labeled"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="1.5" />
        <line x1="12" y1="3" x2="12" y2="13" />
        <line x1="3" y1="13" x2="21" y2="13" />
        <line x1="12" y1="13" x2="12" y2="21" />
      </svg>
      <span className="bar-button-label">Plano</span>
    </button>
  );
}