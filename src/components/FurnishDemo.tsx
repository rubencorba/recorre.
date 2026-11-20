import { useEffect, useRef, useState } from 'react';
import emptyImage from '../assets/demo/Living.webp';
import furnishedImage from '../assets/demo/LivingAmueblado.webp';
import { DEMO_PANORAMA } from '../data/siteConfig';

type SceneId = 'empty' | 'furnished';

export default function FurnishDemo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<ReturnType<typeof pannellum.viewer> | undefined>(undefined);
  const [scene, setScene] = useState<SceneId>('empty');

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const { hfov, initialYaw, initialPitch } = DEMO_PANORAMA;
    const sceneBase = { type: 'equirectangular' as const, yaw: initialYaw, pitch: initialPitch, hfov, minHfov: hfov, maxHfov: hfov };

    const viewer = pannellum.viewer(container, {
      default: {
        firstScene: 'empty',
        sceneFadeDuration: 800,
        autoLoad: true,
        showControls: false,
        showZoomCtrl: false,
        showFullscreenCtrl: false,
        compass: false,
        mouseZoom: false,
        keyboardZoom: false,
        draggable: true,
      },
      scenes: {
        empty: { ...sceneBase, panorama: emptyImage },
        furnished: { ...sceneBase, panorama: furnishedImage },
      },
    });
    viewerRef.current = viewer;

    return () => {
      viewerRef.current = undefined;
      viewer.destroy();
    };
  }, []);

  const handleToggle = () => {
    const viewer = viewerRef.current;
    if (!viewer || !viewer.isLoaded()) return;
    const target: SceneId = scene === 'empty' ? 'furnished' : 'empty';
    // Passing the current view keeps the framing between both versions
    viewer.loadScene(target, viewer.getPitch(), viewer.getYaw(), viewer.getHfov());
    setScene(target);
  };

  const isFurnished = scene === 'furnished';

  return (
    <div className="demo-media demo-panorama">
      <div ref={containerRef} className="demo-panorama-viewer" />
      <button type="button" className="demo-toggle" aria-pressed={isFurnished} onClick={handleToggle}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M4 12V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4" />
          <path d="M3 12h18v5a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1v-1H6v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z" />
          <line x1="5" y1="18" x2="5" y2="21" />
          <line x1="19" y1="18" x2="19" y2="21" />
        </svg>
        {isFurnished ? 'Original' : 'Amueblar'}
      </button>
    </div>
  );
}