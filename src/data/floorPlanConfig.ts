import floorPlanImage from '../assets/Plano.webp';
import type { FloorPlanRoom } from '../types/floorPlan';
import type { RoomId } from '../types/room';
import { ROOM_IDS } from './roomsConfig';

/** Floor plan image shown in the plan panel (src/assets/Plano.webp). */
export const FLOOR_PLAN_IMAGE = floorPlanImage;

/**
 * One clickable point per room. x / y are percentages of the plan image
 * (0-100, from its top-left corner), so points stay aligned at any
 * rendered size. Placeholder values: move each one to its place on the plan.
 */
export const FLOOR_PLAN_ROOMS: FloorPlanRoom[] = [
  { id: ROOM_IDS.living, x: 30, y: 35 },
  { id: ROOM_IDS.dormitorio2, x: 69, y: 80 },
  { id: ROOM_IDS.banio, x: 70, y: 41 },
  { id: ROOM_IDS.cocina, x: 34, y: 70 },
  { id: ROOM_IDS.dormitorio1, x: 69, y: 11 },
];

export const FLOOR_PLAN_ROOMS_BY_ID: Record<RoomId, FloorPlanRoom> = Object.fromEntries(
  FLOOR_PLAN_ROOMS.map((room) => [room.id, room]),
) as Record<RoomId, FloorPlanRoom>;