import type { Room, RoomId } from '../types/room';
import { FIRST_ROOM_ID, ROOMS } from '../data/roomsConfig';
import { isMobileUserAgent } from '../utils/device';

/** Degrees per second used for the idle auto-rotation of each scene. */
const AUTO_ROTATE_SPEED = -2;
/** Milliseconds of inactivity before auto-rotation starts. */
const AUTO_ROTATE_INACTIVITY_DELAY = 7000;
/** Milliseconds after load before auto-rotation stops (0 = never stops automatically). */
const AUTO_ROTATE_STOP_DELAY = 0;

const HOTSPOT_CSS_CLASS = isMobileUserAgent() ? 'tour-hotspot tour-hotspot--mobile' : 'tour-hotspot';

interface HotspotContentArgs {
  label: string;
  angle: number;
}

const CHEVRON_SVG =
  '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="m3 16.5 9-9 9 9" /></svg>';

/**
 * Builds a hotspot's inner content: a floating chevron, its floor
 * shadow, and its label. `hotSpotDiv` is Pannellum's own hotspot element
 * - it gets repositioned every frame via inline `transform`, so rotation
 * and flattening are applied to the inner elements only.
 */
function createHotspotContent(hotSpotDiv: HTMLDivElement, args: unknown): void {
  const { label, angle } = args as HotspotContentArgs;

  const arrow = document.createElement('span');
  arrow.className = 'tour-hotspot-arrow';
  arrow.style.setProperty('--hotspot-angle', `${angle}deg`);
  arrow.innerHTML =
    `<span class="tour-hotspot-arrow-shadow">${CHEVRON_SVG}</span>` +
    `<span class="tour-hotspot-arrow-icon">${CHEVRON_SVG}</span>`;
  hotSpotDiv.appendChild(arrow);

  const labelEl = document.createElement('div');
  labelEl.className = 'tour-hotspot-label';
  labelEl.textContent = label;
  hotSpotDiv.appendChild(labelEl);

  hotSpotDiv.setAttribute('role', 'button');
  hotSpotDiv.setAttribute('aria-label', label);
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
    title: room.title,
    yaw: room.initialYaw,
    pitch: room.initialPitch,
    hfov: room.initialHfov,
    hotSpots: room.hotspots.map((hotspot) => ({
      type: 'scene',
      sceneId: hotspot.target,
      yaw: hotspot.yaw,
      pitch: hotspot.pitch,
      cssClass: HOTSPOT_CSS_CLASS,
      createTooltipFunc: createHotspotContent,
      createTooltipArgs: { label: hotspot.label, angle: hotspot.angle ?? 0 },
    })),
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