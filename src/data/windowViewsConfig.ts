import type { RoomId } from '../types/room';
import { ROOM_IDS } from './roomsConfig';
import windowView1 from '../assets/window-views/WindowView1.webp';
import windowView2 from '../assets/window-views/WindowView2.webp';
import windowView3 from '../assets/window-views/WindowView3.webp';

/** Text shown above every window hotspot. */
export const WINDOW_HOTSPOT_LABEL = 'Mirar por la ventana';

export interface WindowView {
  /** Photo of what is seen from the window. */
  image: string;
  /** Where the window hotspot sits in the room's panorama. */
  yaw: number;
  pitch: number;
}

/**
 * Window hotspots per BASE room id (furnished variants reuse them).
 * yaw/pitch are placeholders: place them with hotSpotDebug like the navigation hotspots.
 */
export const WINDOW_VIEWS_BY_ROOM: Partial<Record<RoomId, WindowView[]>> = {
  [ROOM_IDS.living]: [{ image: windowView1, yaw: 180, pitch: 0 }],
  [ROOM_IDS.dormitorio1]: [{ image: windowView2, yaw: 170, pitch: -5 }],
  [ROOM_IDS.dormitorio2]: [{ image: windowView3, yaw: 180, pitch: -7 }],
};