import { useEffect, useRef, useState, type JSX, type TouchEvent } from 'react';
import type { GalleryItem } from '../types/gallery';

interface GalleryProps {
  items: GalleryItem[];
  onClose: () => void;
}

const SWIPE_THRESHOLD_PX = 50;

/** Accessible name for an item: its title when it has one, otherwise a generic "Foto N de M". */
function getItemLabel(item: GalleryItem, index: number, total: number): string {
  return item.title ?? `Foto ${index + 1} de ${total}`;
}

/**
 * Full-screen gallery: a thumbnail grid and, when one is picked, a viewer
 * with previous/next. Esc steps back (viewer -> grid -> closed), arrows
 * navigate, and swiping works on touch screens.
 */
export default function Gallery({ items, onClose }: GalleryProps): JSX.Element {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const touchStartX = useRef<number | null>(null);

  const selected = selectedIndex === null ? null : items[selectedIndex];

  const goTo = (index: number) => setSelectedIndex((index + items.length) % items.length);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (selectedIndex === null) onClose();
        else setSelectedIndex(null);
      } else if (selectedIndex !== null && event.key === 'ArrowRight') {
        setSelectedIndex((selectedIndex + 1) % items.length);
      } else if (selectedIndex !== null && event.key === 'ArrowLeft') {
        setSelectedIndex((selectedIndex - 1 + items.length) % items.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, items.length, onClose]);

  const handleTouchStart = (event: TouchEvent) => {
    touchStartX.current = event.touches[0].clientX;
  };

  const handleTouchEnd = (event: TouchEvent) => {
    const start = touchStartX.current;
    touchStartX.current = null;
    if (start === null || selectedIndex === null) return;

    const delta = event.changedTouches[0].clientX - start;
    if (Math.abs(delta) < SWIPE_THRESHOLD_PX) return;
    goTo(delta < 0 ? selectedIndex + 1 : selectedIndex - 1);
  };

  return (
    <div className="gallery-overlay" role="dialog" aria-modal="true" aria-label="Galería de imágenes">
      <div className="gallery-header">
        {selected ? (
          <button
            type="button"
            className="bar-button"
            onClick={() => setSelectedIndex(null)}
            aria-label="Volver a la galería"
            title="Volver a la galería"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
          </button>
        ) : (
          <h2 className="gallery-title">Galería</h2>
        )}
        <button type="button" className="bar-button" onClick={onClose} aria-label="Cerrar galería" title="Cerrar" autoFocus>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      {selected ? (
        <div className="gallery-viewer">
          <div className="gallery-stage" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
            {items.length > 1 && (
              <button
                type="button"
                className="bar-button gallery-nav gallery-nav--prev"
                onClick={() => goTo((selectedIndex ?? 0) - 1)}
                aria-label="Imagen anterior"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
            )}
            <img src={selected.src} alt={getItemLabel(selected, selectedIndex ?? 0, items.length)} />
            {items.length > 1 && (
              <button
                type="button"
                className="bar-button gallery-nav gallery-nav--next"
                onClick={() => goTo((selectedIndex ?? 0) + 1)}
                aria-label="Imagen siguiente"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            )}
          </div>
          <div className="gallery-caption">
            {selected.title && <h3>{selected.title}</h3>}
            {selected.description && <p>{selected.description}</p>}
            <span className="gallery-counter">
              {(selectedIndex ?? 0) + 1} / {items.length}
            </span>
          </div>
        </div>
      ) : (
        <div className="gallery-grid">
          {items.map((item, index) => (
            <button
              key={item.id}
              type="button"
              className="gallery-thumb"
              onClick={() => setSelectedIndex(index)}
              aria-label={getItemLabel(item, index, items.length)}
            >
              <img src={item.thumb ?? item.src} alt="" loading="lazy" decoding="async" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}