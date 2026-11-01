import type { HotspotPlacement } from '../types/room';

/**
 * Hand-tuned hotspot placement, keyed by [from point][to point]. Only list
 * the ones you've tuned: any connection without an entry gets an automatic
 * placeholder placement (spread around the horizon), so the tour is always
 * navigable while you tune.
 *
 * yaw / pitch: where the hotspot sits in the panorama of the `from` point.
 * angle: where the arrow points on screen (0 = up, 90 = right, 180 = down,
 * -90 = left).
 *
 * Example - in the panorama of point 1, the hotspot that leads to point 2:
 *   1: { 2: { yaw: 40, pitch: -25, angle: 0 } },
 */
export const HOTSPOT_PLACEMENTS: Partial<
  Record<number, Partial<Record<number, HotspotPlacement>>>
> = {
  1: {
    2: { yaw: 0, pitch: -40, angle: 0 },
    3: { yaw: -127, pitch: -33, angle: 0 },
    8: { yaw: 131, pitch: -36, angle: 0 },
  },
  2: {
    1: { yaw: -164, pitch: -34, angle: 0 },
    6: { yaw: -114, pitch: -32, angle: 60 },
    7: { yaw: 142, pitch: -30, angle: -60 },
    11: { yaw: 13, pitch: -47, angle: 0 },
  },
  3: {
    1: { yaw: -115, pitch: -35, angle: 0 },
    4: { yaw: -53, pitch: -46, angle: 0 },
    5: { yaw: 75, pitch: -52, angle: 0 },
    6: { yaw: 168, pitch: -38, angle: 0 },
  },
  4: {
    5: { yaw: 146, pitch: -33, angle: 0 },
    3: { yaw: -170, pitch: -46, angle: 0 },
  },
  5: {
    3: { yaw: 154, pitch: -52, angle: 0 },
    4: { yaw: -160, pitch: -36, angle: 0 },
  },
  6: {
    3: { yaw: -170, pitch: -34, angle: 0 },
    2: { yaw: 131, pitch: -35, angle: -60 },
  },
  7: {
    2: { yaw: -95, pitch: -36, angle: 60 },
    8: { yaw: -176, pitch: -42, angle: 0 },
  },
  8: {
    1: { yaw: 97, pitch: -33, angle: 30 },
    7: { yaw: 177, pitch: -44, angle: 0 },
    9: { yaw: -36, pitch: -45, angle: -30 },
    10: { yaw: 36, pitch: -35, angle: 40 },
  },
  9: {
    8: { yaw: 166, pitch: -45, angle: 0 },
    10: { yaw: 89, pitch: -38, angle: 0 },
  },
  10: {
    8: { yaw: -141, pitch: -39, angle: 0 },
    9: { yaw: -84, pitch: -37, angle: 0 },
  },
  11: {
    2: { yaw: 99, pitch: -28, angle: 0 },
    12: { yaw: -99, pitch: -29, angle: 0 },
    15: { yaw: 68, pitch: -37, angle: -70 },
  },
  12: {
    11: { yaw: 100, pitch: -35, angle: 0 },
    13: { yaw: -75, pitch: -34, angle: 70 },
  },
  13: {
    12: { yaw: -84, pitch: -35, angle: -30 },
    14: { yaw: 152, pitch: -36, angle: -15 },
    16: { yaw: -152, pitch: -32, angle: 20 },
  },
  14: {
    13: { yaw: -94, pitch: -38, angle: -10 },
    15: { yaw: 100, pitch: -30, angle: 20 },
    16: { yaw: -167, pitch: -47, angle: 90 },
  },
  15: {
    11: { yaw: 89, pitch: -40, angle: 10 },
    14: { yaw: -147, pitch: -37, angle: 10 },
    16: { yaw: 161, pitch: -33, angle: -10 },
  },
  16: {
    13: { yaw: -80, pitch: -33, angle: 10 },
    14: { yaw: -6, pitch: -34, angle: 0 },
    15: { yaw: 83, pitch: -32, angle: -15 },
  },
};