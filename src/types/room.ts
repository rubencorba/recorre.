/**
 * A single interactive hotspot placed inside a panorama.
 * Hotspots are always positioned using spherical coordinates
 * (yaw / pitch) and link to another room by its `id`.
 */
export interface Hotspot {
  /** Id of the room this hotspot navigates to. Must match a Room.id. */
  target: string;
  /** Horizontal angle, in degrees, where the hotspot is placed. */
  yaw: number;
  /** Vertical angle, in degrees, where the hotspot is placed. */
  pitch: number;
  /** Text shown to the user when hovering/tapping the hotspot. */
  label: string;
  /**
   * Rotation of the arrow on screen, in degrees. 0 points up, positive
   * values rotate clockwise (90 = right, 180 = down, -90 = left).
   * Defaults to 0.
   */
  angle?: number;
}

/**
 * A single room of the apartment, represented as a 360° equirectangular
 * panorama scene.
 */
export interface Room {
  /** Unique identifier for the room. Used as the Pannellum scene id. */
  id: string;
  /** Human readable name displayed to the user. */
  title: string;
  /** Imported panorama image for this room. */
  image: string;
  /** Initial horizontal viewing angle, in degrees, when the scene loads. */
  initialYaw: number;
  /** Initial vertical viewing angle, in degrees, when the scene loads. */
  initialPitch: number;
  /** Initial horizontal field of view, in degrees, when the scene loads. */
  initialHfov: number;
  /** Hotspots that let the user navigate to neighboring rooms. */
  hotspots: Hotspot[];
}

/** Id of a room, used as the canonical key across the app (config, navigation, scenes). */
export type RoomId = Room['id'];

/** Where a hotspot sits and how its arrow points - the part tuned by hand per connection. */
export type HotspotPlacement = Pick<Hotspot, 'yaw' | 'pitch' | 'angle'>;
