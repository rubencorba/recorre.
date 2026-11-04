import { useEffect, type RefObject } from 'react';

/**
 * Two hotspots in the same column whose vertical gap is below this value
 * (in rem) get their labels moved beside the dot instead of above it.
 */
const MIN_VERTICAL_GAP_REM = 2;

interface MeasuredHotspot {
  element: HTMLElement;
  rect: DOMRect;
}

function measureVisibleHotspots(container: HTMLElement): MeasuredHotspot[] {
  return Array.from(container.querySelectorAll<HTMLElement>('.tour-hotspot'))
    // Pannellum hides off-screen hotspots and only sets `transform` once it has positioned them.
    .filter((element) => element.style.visibility !== 'hidden' && element.style.transform !== '')
    .map((element) => ({ element, rect: element.getBoundingClientRect() }));
}

function updateHotspotLabelSides(container: HTMLElement): void {
  const rem = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
  const maxGap = MIN_VERTICAL_GAP_REM * rem;
  const hotspots = measureVisibleHotspots(container);

  for (const current of hotspots) {
    const hasStackedNeighbor = hotspots.some((other) => {
      if (other === current) return false;
      const centerDistance = Math.abs(
        current.rect.left + current.rect.width / 2 - (other.rect.left + other.rect.width / 2),
      );
      const isSameColumn = centerDistance < current.rect.width;
      const verticalGap = Math.max(other.rect.top - current.rect.bottom, current.rect.top - other.rect.bottom);
      return isSameColumn && verticalGap < maxGap;
    });

    if (hasStackedNeighbor) {
      current.element.dataset.labelSide = 'right';
    } else {
      delete current.element.dataset.labelSide;
    }
  }
}

/**
 * Keeps hotspot labels from overlapping when several hotspots are stacked
 * in the same spot (e.g. three doors in a row on a portrait phone).
 * Must be called after usePannellumViewer so the viewer already exists.
 */
export function useHotspotLabelSides(
  containerRef: RefObject<HTMLDivElement | null>,
  viewerRef: RefObject<Pannellum.Viewer | null>,
): void {
  useEffect(() => {
    const container = containerRef.current;
    const viewer = viewerRef.current;
    if (!container || !viewer) return;

    let frame = 0;
    // Two frames: Pannellum positions hotspots in its own render frame, after the event fires.
    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        frame = requestAnimationFrame(() => updateHotspotLabelSides(container));
      });
    };

    viewer.on('load', schedule);
    viewer.on('zoomchange', schedule);
    viewer.on('animatefinished', schedule);
    viewer.on('mouseup', schedule);
    viewer.on('touchend', schedule);
    window.addEventListener('resize', schedule);
    window.addEventListener('orientationchange', schedule);

    return () => {
      cancelAnimationFrame(frame);
      viewer.off('load', schedule);
      viewer.off('zoomchange', schedule);
      viewer.off('animatefinished', schedule);
      viewer.off('mouseup', schedule);
      viewer.off('touchend', schedule);
      window.removeEventListener('resize', schedule);
      window.removeEventListener('orientationchange', schedule);
    };
  }, [containerRef, viewerRef]);
}