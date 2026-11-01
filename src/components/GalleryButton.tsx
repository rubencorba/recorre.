import type { JSX } from 'react';

interface GalleryButtonProps {
  onOpen: () => void;
}

export default function GalleryButton({ onOpen }: GalleryButtonProps): JSX.Element {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-haspopup="dialog"
      aria-label="Abrir galería"
      title="Galería"
      className="bar-button"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <path d="m21 15-5-5L5 21" />
      </svg>
    </button>
  );
}