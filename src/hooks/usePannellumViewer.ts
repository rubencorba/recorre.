import { useEffect, useRef, useState, type RefObject } from 'react';
import type { RoomId } from '../types/room';

interface PannellumViewerState {
  viewerRef: RefObject<Pannellum.Viewer | null>;
  currentRoomId: RoomId | null;
  isLoaded: boolean;
}

/**
 * Initializes a Pannellum tour viewer on the given container, tears it
 * down on unmount, and tracks which scene is currently displayed - so any
 * UI that needs to know "where is the user right now" (e.g. the floor
 * plan) doesn't have to duplicate Pannellum's event wiring.
 */
export function usePannellumViewer(
  containerRef: RefObject<HTMLDivElement | null>,
  tourConfig: Pannellum.TourOptions,
): PannellumViewerState {
  const viewerRef = useRef<Pannellum.Viewer | null>(null);
  const [currentRoomId, setCurrentRoomId] = useState<RoomId | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    const viewer = window.pannellum.viewer(container, tourConfig);
    viewerRef.current = viewer;

    const handleSceneChange = (sceneId: string) => {
      setCurrentRoomId(sceneId);
    };

    const handleLoad = () => {
      setIsLoaded(true);
    };

    // The first scene is already known synchronously (it's set from
    // tourConfig.default.firstScene), so we don't need to wait for
    // 'load' to know where the user starts.
    setCurrentRoomId(viewer.getScene());
    viewer.on('scenechange', handleSceneChange);
    viewer.on('load', handleLoad);

    return () => {
      viewer.off('scenechange', handleSceneChange);
      viewer.off('load', handleLoad);
      viewer.destroy();
      viewerRef.current = null;
    };
    // Tour config is treated as static for the lifetime of this component;
    // it is built once from the centralized room configuration.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [containerRef]);

  return { viewerRef, currentRoomId, isLoaded };
}