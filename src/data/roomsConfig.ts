import type { Hotspot, Room, RoomId } from '../types/room';
import { HOTSPOT_PLACEMENTS } from './hotspotPlacements';

/**
 * The whole museum is one connected graph of panorama points. Point N uses
 * src/assets/panoramas/FotoN.webp and lists the points reachable from it;
 * hotspots are generated from this list. To add a point: drop its image in
 * the folder and add its entry here (and the reverse link in its neighbors).
 */
export const POINT_CONNECTIONS: Record<number, number[]> = {
  1: [2, 3, 8],
  2: [1, 6, 7, 11],
  3: [1, 4, 5, 6],
  4: [5, 3],
  5: [3, 4],
  6: [3, 2],
  7: [2, 8],
  8: [1, 7, 9, 10],
  9: [8, 10],
  10: [8, 9],
  11: [2, 12, 15],
  12: [11, 13],
  13: [12, 14, 16],
  14: [13, 15, 16],
  15: [11, 14, 16],
  16: [13, 14, 15],
};

/** Initial horizontal view per point, in degrees. Defaults to 0 when not listed. */
const INITIAL_YAW: Partial<Record<number, number>> = {};

const INITIAL_HFOV = 120;

/** Placeholder pitch for hotspots without a hand-tuned placement (looking down at the floor). */
const DEFAULT_HOTSPOT_PITCH = -25;

/** Scene/room id for a point number - the same id Pannellum, hotspots and the floor plan share. */
export function toRoomId(point: number): RoomId {
  return String(point);
}

/** Id of the first room shown once the user enters the tour: point 1 (Foto1). */
export const FIRST_ROOM_ID: RoomId = toRoomId(1);

const PANORAMA_IMAGES = import.meta.glob<string>('../assets/panoramas/Foto*.webp', {
  eager: true,
  import: 'default',
});

function getPanoramaImage(point: number): string {
  const image = PANORAMA_IMAGES[`../assets/panoramas/Foto${point}.webp`];
  if (!image) {
    throw new Error(`Falta la imagen src/assets/panoramas/Foto${point}.webp (punto ${point})`);
  }
  return image;
}

/** Dev-only sanity check for the connection list, which is easy to get wrong by hand. */
function validateConnections(): void {
  for (const [fromKey, targets] of Object.entries(POINT_CONNECTIONS)) {
    const from = Number(fromKey);
    for (const to of targets) {
      if (!(to in POINT_CONNECTIONS)) {
        throw new Error(`Punto ${from} conecta con ${to}, pero ${to} no está definido en POINT_CONNECTIONS`);
      }
      if (!POINT_CONNECTIONS[to].includes(from)) {
        console.warn(`Punto ${from} conecta con ${to}, pero ${to} no conecta de vuelta con ${from}`);
      }
    }
  }
}

if (import.meta.env.DEV) {
  validateConnections();
}

function buildHotspots(point: number): Hotspot[] {
  const targets = POINT_CONNECTIONS[point];
  const step = 360 / targets.length;

  return targets.map((target, index) => {
    const placement = HOTSPOT_PLACEMENTS[point]?.[target];

    return {
      target: toRoomId(target),
      yaw: placement?.yaw ?? index * step,
      pitch: placement?.pitch ?? DEFAULT_HOTSPOT_PITCH,
      angle: placement?.angle ?? 0,
      label: `Punto ${target}`,
    };
  });
}

/** Fully assembled room list - what the viewer and the floor plan consume. */
export const ROOMS: Room[] = Object.keys(POINT_CONNECTIONS)
  .map(Number)
  .map((point) => ({
    id: toRoomId(point),
    title: `Punto ${point}`,
    image: getPanoramaImage(point),
    initialYaw: INITIAL_YAW[point] ?? 0,
    initialPitch: 0,
    initialHfov: INITIAL_HFOV,
    hotspots: buildHotspots(point),
  }));

/** Convenience lookup map from room id to its full configuration. */
export const ROOMS_BY_ID: Record<RoomId, Room> = Object.fromEntries(
  ROOMS.map((room) => [room.id, room]),
) as Record<RoomId, Room>;