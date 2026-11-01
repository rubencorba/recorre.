import type { JSX } from 'react';

interface RotateHintProps {
  visible: boolean;
}

/**
 * Small, non-blocking banner at the top suggesting to enable rotation and
 * turn the phone. It never intercepts touches, so the tour stays fully
 * usable in portrait. Visibility is driven by the `visible` prop, so it
 * reappears every time the phone goes back to portrait.
 */
export default function RotateHint({ visible }: RotateHintProps): JSX.Element | null {
  if (!visible) {
    return null;
  }

  return (
    <div className="rotate-hint" role="status">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="rotate-hint-icon"
        aria-hidden="true"
      >
        <rect x="7" y="2" width="10" height="20" rx="2" />
        <line x1="11" y1="18" x2="13" y2="18" />
      </svg>
      <p>Activa la rotación y gira el teléfono para una mejor experiencia</p>
    </div>
  );
}