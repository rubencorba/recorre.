import { useEffect, type JSX } from 'react';

interface WindowViewerProps {
  image: string;
  onClose: () => void;
}

/** Full-screen photo of the view from a window. Reuses the gallery overlay styles. */
export default function WindowViewer({ image, onClose }: WindowViewerProps): JSX.Element {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div className="gallery-overlay" role="dialog" aria-modal="true" aria-label="Vista desde la ventana">
      <div className="gallery-header">
        <h2 className="gallery-title">Vista desde la ventana</h2>
        <button type="button" className="bar-button bar-button--labeled" onClick={onClose} aria-label="Cerrar vista" title="Cerrar" autoFocus>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>
      <div className="gallery-viewer">
        <div className="gallery-stage">
          <img src={image} alt="Vista desde la ventana" />
        </div>
      </div>
    </div>
  );
}