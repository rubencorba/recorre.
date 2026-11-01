import floorPlanImage from '../assets/plano.webp';
import type { FloorPlanRoom } from '../types/floorPlan';
import type { RoomId } from '../types/room';
import { toRoomId } from './roomsConfig';

/** Floor plan image shown in the plan panel (src/assets/plano.webp). */
export const FLOOR_PLAN_IMAGE = floorPlanImage;

/**
 * One clickable point per panorama point. x / y are percentages of the
 * plan image (0-100, from its top-left corner), so points stay aligned
 * at any rendered size. Move each one to its place on the plan.
 */
export const FLOOR_PLAN_ROOMS: FloorPlanRoom[] = [
  { id: toRoomId(1), x: 50, y: 62 },
  { id: toRoomId(2), x: 50, y: 44 },
  { id: toRoomId(3), x: 25, y: 70 },
  { id: toRoomId(4), x: 37, y: 87 },
  { id: toRoomId(5), x: 15, y: 80 },
  { id: toRoomId(6), x: 25, y: 44 },
  { id: toRoomId(7), x: 75, y: 50 },
  { id: toRoomId(8), x: 75, y: 70 },
  { id: toRoomId(9), x: 85, y: 85 },
  { id: toRoomId(10), x: 66, y: 80 },
  { id: toRoomId(11), x: 50, y: 30 },
  { id: toRoomId(12), x: 50, y: 15 },
  { id: toRoomId(13), x: 72, y: 11 },
  { id: toRoomId(14), x: 82, y: 22 },
  { id: toRoomId(15), x: 72, y: 34 },
  { id: toRoomId(16), x: 63, y: 22 },
];

export const FLOOR_PLAN_ROOMS_BY_ID: Record<RoomId, FloorPlanRoom> = Object.fromEntries(
  FLOOR_PLAN_ROOMS.map((room) => [room.id, room]),
) as Record<RoomId, FloorPlanRoom>;