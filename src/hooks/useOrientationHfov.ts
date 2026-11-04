import { useEffect, useRef, type RefObject } from 'react';
import { ROOMS_BY_ID } from '../data/roomsConfig';
import { resolveInitialHfov } from '../services/pannellumService';
import { isMobileUserAgent } from '../utils/device';
import { loadSceneKeepingView } from '../utils/pannellumView';

/** Differences below this (degrees) are not worth reloading the scene for. */
const HFOV_TOLERANCE = 0.5;

/**
 * On a phone, re-applies the room's initial zoom when the device rotates
 * while a scene is already open. Reloading the same scene (instead of just
 * calling setHfov) makes Pannellum capture the new zoom as its "home" view,
 * so the idle return-to-center doesn't jump back to the previous zoom.
 */
export function useOrientationHfov(viewerRef: RefObject<Pannellum.Viewer | null>, isPortrait: boolean): void {
    const previousIsPortrait = useRef(isPortrait);

    useEffect(() => {
        if (previousIsPortrait.current === isPortrait) return;
        previousIsPortrait.current = isPortrait;

        // Desktop windows flip orientation when resized: never touch the user's zoom there.
        if (!isMobileUserAgent()) return;

        const viewer = viewerRef.current;
        if (!viewer || !viewer.isLoaded()) return;

        const room = ROOMS_BY_ID[viewer.getScene()];
        if (!room) return;

        const hfov = resolveInitialHfov(room.initialHfov);
        if (Math.abs(viewer.getHfov() - hfov) < HFOV_TOLERANCE) return;

        // hfov is not passed: the scene config getter already resolves it for the new orientation.
        loadSceneKeepingView(viewer, room.id, { pitch: viewer.getPitch(), yaw: viewer.getYaw() });
    }, [isPortrait, viewerRef]);
}