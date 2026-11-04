import type { JSX } from 'react';
import { FLOOR_PLAN_IMAGE, FLOOR_PLAN_ROOMS } from '../data/floorPlanConfig';
import { ROOMS_BY_ID } from '../data/roomsConfig';
import type { RoomId } from '../types/room';

interface FloorPlanProps {
  currentRoomId: RoomId | null;
  onSelectRoom: (roomId: RoomId) => void;
  onClose: () => void;
  className?: string;
}

/**
 * Floor plan image with one clickable, labeled point per room, placed in
 * % of the image's size. Clicking/tapping a point jumps straight to that
 * room, regardless of the hotspot connections.
 */
export default function FloorPlan({ currentRoomId, onSelectRoom, onClose, className = '' }: FloorPlanProps): JSX.Element {
  return (
    <div className={`floor-plan-panel ${className}`}>
      <span className="floor-plan-point-label" aria-hidden="true">
        Haz clic en el punto al que quieras dirigirte
      </span>
      <button type="button" className="floor-plan-close" onClick={onClose} aria-label="Cerrar plano" title="Cerrar plano">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
      <div className="floor-plan-stage">
        <img src={FLOOR_PLAN_IMAGE} alt="Plano del departamento" className="floor-plan-image" draggable={false} />
        {FLOOR_PLAN_ROOMS.map((room) => {
          const isActive = room.id === currentRoomId;
          const title = ROOMS_BY_ID[room.id].title;

          return (
            <button
              key={room.id}
              type="button"
              aria-label={`Ir a ${title}`}
              aria-current={isActive ? 'location' : undefined}
              onClick={() => onSelectRoom(room.id)}
              className={isActive ? 'floor-plan-point floor-plan-point--active' : 'floor-plan-point'}
              style={{ left: `${room.x}%`, top: `${room.y}%` }}
            >
              <span className="floor-plan-point-label" aria-hidden="true">
                {title}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}