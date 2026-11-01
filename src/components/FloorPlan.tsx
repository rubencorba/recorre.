import type { JSX } from 'react';
import { FLOOR_PLAN_IMAGE, FLOOR_PLAN_ROOMS } from '../data/floorPlanConfig';
import type { RoomId } from '../types/room';

interface FloorPlanProps {
  currentRoomId: RoomId | null;
  onSelectRoom: (roomId: RoomId) => void;
  className?: string;
}

/**
 * Floor plan image with one clickable point per panorama point, placed in
 * % of the image's size. Clicking/tapping a point jumps straight to that
 * panorama, regardless of the hotspot connections.
 */
export default function FloorPlan({ currentRoomId, onSelectRoom, className = '' }: FloorPlanProps): JSX.Element {
  return (
    <div className={`floor-plan-panel ${className}`}>
      <div className="floor-plan-stage">
        <img src={FLOOR_PLAN_IMAGE} alt="Plano del museo" className="floor-plan-image" draggable={false} />
        {FLOOR_PLAN_ROOMS.map((room) => {
          const isActive = room.id === currentRoomId;

          return (
            <button
              key={room.id}
              type="button"
              aria-label={`Ir al punto ${room.id}`}
              aria-current={isActive ? 'location' : undefined}
              onClick={() => onSelectRoom(room.id)}
              className={isActive ? 'floor-plan-point floor-plan-point--active' : 'floor-plan-point'}
              style={{ left: `${room.x}%`, top: `${room.y}%` }}
            />
          );
        })}
      </div>
    </div>
  );
}