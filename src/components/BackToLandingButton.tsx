import type { JSX } from 'react';

interface BackToLandingButtonProps {
  onBack: () => void;
}

/** Exits the tour and returns to the landing page. */
export default function BackToLandingButton({ onBack }: BackToLandingButtonProps): JSX.Element {
  return (
    <button
      type="button"
      onClick={onBack}
      aria-label="Volver al inicio"
      title="Volver al inicio"
      className="bar-button bar-button--labeled"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
      <span className="bar-button-label">Inicio</span>
    </button>
  );
}