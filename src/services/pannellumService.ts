import type { Room, RoomId } from '../types/room';
import { FIRST_ROOM_ID, ROOMS, getBaseRoomId } from '../data/roomsConfig';
import { WINDOW_HOTSPOT_LABEL, WINDOW_VIEWS_BY_ROOM } from '../data/windowViewsConfig';
import { requestWindowView } from '../utils/windowViewEvents';
import { PORTRAIT_QUERY, isMobileUserAgent } from '../utils/device';

/** Degrees per second used for the idle auto-rotation of each scene. */
const AUTO_ROTATE_SPEED = -2;
/** Milliseconds of inactivity before auto-rotation starts. */
const AUTO_ROTATE_INACTIVITY_DELAY = 7000;
/** Milliseconds after load before auto-rotation stops (0 = never stops automatically). */
const AUTO_ROTATE_STOP_DELAY = 0;

/** Initial horizontal FOV (degrees) on a phone held in portrait. Every other case uses the room's own initialHfov. */
const PORTRAIT_MOBILE_HFOV = 80;

export function resolveInitialHfov(defaultHfov: number): number {
  const isPortraitPhone = isMobileUserAgent() && window.matchMedia(PORTRAIT_QUERY).matches;
  return isPortraitPhone ? PORTRAIT_MOBILE_HFOV : defaultHfov;
}

const HOTSPOT_CSS_CLASS = isMobileUserAgent() ? 'tour-hotspot tour-hotspot--mobile' : 'tour-hotspot';

/**
 * Builds a hotspot's inner content: a pulsing dot and its visible label.
 * `hotSpotDiv` is Pannellum's own hotspot element - it gets repositioned
 * every frame via inline `transform`, so visuals live on inner children only.
 */
function createHotspotContent(hotSpotDiv: HTMLDivElement, args: unknown): void {
  const label = String(args);

  const dot = document.createElement('span');
  dot.className = 'tour-hotspot-dot';
  hotSpotDiv.appendChild(dot);

  const labelEl = document.createElement('div');
  labelEl.className = 'tour-hotspot-label';
  labelEl.textContent = label;
  hotSpotDiv.appendChild(labelEl);

  hotSpotDiv.setAttribute('role', 'button');
  hotSpotDiv.setAttribute('aria-label', label);
}

interface WindowHotspotArgs {
  image: string;
}

const WINDOW_ICON_SVG =
  '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><g stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="3" width="16" height="18" rx="1.5" /><line x1="12" y1="3" x2="12" y2="21" /><line x1="4" y1="12" x2="20" y2="12" /></g></svg>';

/** Window hotspot: same dot as the navigation ones, with a window icon, opening the window photo on tap. */
function createWindowHotspotContent(hotSpotDiv: HTMLDivElement, args: unknown): void {
  const { image } = args as WindowHotspotArgs;

  const dot = document.createElement('span');
  dot.className = 'tour-hotspot-dot';
  dot.innerHTML = WINDOW_ICON_SVG;
  hotSpotDiv.appendChild(dot);

  const labelEl = document.createElement('div');
  labelEl.className = 'tour-hotspot-label';
  labelEl.textContent = WINDOW_HOTSPOT_LABEL;
  hotSpotDiv.appendChild(labelEl);

  hotSpotDiv.setAttribute('role', 'button');
  hotSpotDiv.setAttribute('aria-label', WINDOW_HOTSPOT_LABEL);

  // Same pattern Pannellum uses for its scene hotspots: returning false cancels the
  // synthesized click after a touch, so the handler doesn't run twice on phones.
  hotSpotDiv.onclick = hotSpotDiv.ontouchend = () => {
    requestWindowView(image);
    return false;
  };
}

/**
 * Builds a single Pannellum scene configuration from a Room definition.
 * Hotspots are always rendered as native Pannellum `scene` hot spots
 * (never floating HTML buttons), positioned via yaw/pitch.
 */
function buildSceneConfig(room: Room): Pannellum.ConfigOptions {
  return {
    type: 'equirectangular',
    panorama: room.image,
    title: `Estás en ${room.title}`,
    yaw: room.initialYaw,
    pitch: room.initialPitch,
    // Getter on purpose: Pannellum re-reads the scene config on every scene load,
    // so the zoom follows the orientation at that moment.
    get hfov() {
      return resolveInitialHfov(room.initialHfov);
    },
    hotSpots: [
      ...room.hotspots.map((hotspot) => ({
        type: 'scene' as const,
        sceneId: hotspot.target,
        yaw: hotspot.yaw,
        pitch: hotspot.pitch,
        cssClass: HOTSPOT_CSS_CLASS,
        createTooltipFunc: createHotspotContent,
        createTooltipArgs: hotspot.label,
      })),
      // Keyed by base room so the furnished variant shows the same windows.
      ...(WINDOW_VIEWS_BY_ROOM[getBaseRoomId(room.id)] ?? []).map((view) => ({
        type: 'info' as const,
        yaw: view.yaw,
        pitch: view.pitch,
        cssClass: `${HOTSPOT_CSS_CLASS} tour-hotspot--window`,
        createTooltipFunc: createWindowHotspotContent,
        createTooltipArgs: { image: view.image },
      })),
    ],
  };
}

/**
 * Builds the full Pannellum tour configuration (all scenes + defaults)
 * from the centralized room list. This is the only place that knows how
 * to translate our domain model into Pannellum's expected shape.
 */
export function buildTourConfig(rooms: Room[], firstSceneId: RoomId): Pannellum.TourOptions {
  const scenes: Record<string, Pannellum.ConfigOptions> = {};

  for (const room of rooms) {
    scenes[room.id] = buildSceneConfig(room);
  }

  return {
    default: {
      firstScene: firstSceneId,
      autoLoad: true,
      autoRotate: AUTO_ROTATE_SPEED,
      autoRotateInactivityDelay: AUTO_ROTATE_INACTIVITY_DELAY,
      autoRotateStopDelay: AUTO_ROTATE_STOP_DELAY,
      showFullscreenCtrl: false,
      showZoomCtrl: false,
      compass: false,
      draggable: true,
      minHfov: 50,
      maxHfov: 120,
      sceneFadeDuration: 1000,
      /* hotSpotDebug: import.meta.env.DEV, */
    },
    scenes,
  };
}

// Built once from the centralized room configuration - every scene and
// hotspot the viewer knows about comes from src/data/roomsConfig.ts.
export const TOUR_CONFIG = buildTourConfig(ROOMS, FIRST_ROOM_ID);