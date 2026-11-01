import { useEffect, useState, type JSX, type RefObject } from 'react';

interface FullscreenToggleProps {
  targetRef: RefObject<HTMLElement | null>;
}

/**
 * Fullscreens Tour's own wrapper element (not Pannellum's internal
 * container) so everything inside it stays visible while in fullscreen.
 */
export default function FullscreenToggle({ targetRef }: FullscreenToggleProps): JSX.Element | null {
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleChange = () => {
      setIsFullscreen(document.fullscreenElement === targetRef.current);
    };

    document.addEventListener('fullscreenchange', handleChange);
    return () => document.removeEventListener('fullscreenchange', handleChange);
  }, [targetRef]);

  if (!document.fullscreenEnabled) return null;

  const handleToggle = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    } else {
      targetRef.current?.requestFullscreen().catch(() => {});
    }
  };

  const label = isFullscreen ? 'Salir de pantalla completa' : 'Pantalla completa';

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-pressed={isFullscreen}
      aria-label={label}
      title={label}
      className="bar-button"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {isFullscreen ? (
          <>
            <path d="M8 3v3a2 2 0 0 1-2 2H3" />
            <path d="M21 8h-3a2 2 0 0 1-2-2V3" />
            <path d="M3 16h3a2 2 0 0 1 2 2v3" />
            <path d="M16 21v-3a2 2 0 0 1 2-2h3" />
          </>
        ) : (
          <>
            <path d="M8 3H5a2 2 0 0 0-2 2v3" />
            <path d="M21 8V5a2 2 0 0 0-2-2h-3" />
            <path d="M3 16v3a2 2 0 0 0 2 2h3" />
            <path d="M16 21h3a2 2 0 0 0 2-2v-3" />
          </>
        )}
      </svg>
    </button>
  );
}