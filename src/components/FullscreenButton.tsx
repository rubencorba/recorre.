import { useEffect, useState, type RefObject } from 'react';

interface FullscreenButtonProps {
  targetRef: RefObject<HTMLElement | null>;
}

export default function FullscreenButton({ targetRef }: FullscreenButtonProps) {
  const [isFullscreen, setIsFullscreen] = useState(() => document.fullscreenElement !== null);

  useEffect(() => {
    const onChange = () => setIsFullscreen(document.fullscreenElement !== null);
    document.addEventListener('fullscreenchange', onChange);
    return () => document.removeEventListener('fullscreenchange', onChange);
  }, []);

  // iPhone Safari has no element fullscreen
  if (!document.fullscreenEnabled) return null;

  const toggle = () => {
    if (document.fullscreenElement) void document.exitFullscreen();
    else void targetRef.current?.requestFullscreen();
  };

  const label = isFullscreen ? 'Salir de pantalla completa' : 'Ver en pantalla completa';

  return (
    <button type="button" className="hero-icon-button" aria-label={label} title={label} onClick={toggle}>
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