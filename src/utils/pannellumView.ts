import type { RoomId } from '../types/room';

interface RestoredView {
  pitch: number;
  yaw: number;
  hfov?: number;
}

/**
 * Loads a scene and restores the given view without passing pitch/hfov to
 * loadScene. Pannellum captures its "home" view (used by the idle
 * return-to-center) from the values loadScene applies, so passing the
 * current pitch would turn it into the new center. Applying it in the
 * 'load' handler happens after that capture and before the first render.
 */
export function loadSceneKeepingView(viewer: Pannellum.Viewer, sceneId: RoomId, view: RestoredView): void {
  // loadScene is ignored while another scene is loading.
  if (!viewer.isLoaded()) return;

  const restoreView = () => {
    viewer.off('load', restoreView);
    viewer.setPitch(view.pitch, false);
    if (view.hfov !== undefined) viewer.setHfov(view.hfov, false);
  };

  viewer.on('load', restoreView);
  viewer.loadScene(sceneId, undefined, view.yaw);
}