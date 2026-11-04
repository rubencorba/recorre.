import { useEffect, useRef, useState, type JSX } from 'react';
import BackToLandingButton from '../components/BackToLandingButton';
import FloorPlan from '../components/FloorPlan';
import FloorPlanToggle from '../components/FloorPlanToggle';
import FullscreenToggle from '../components/FullscreenToggle';
import FurnitureToggle from '../components/FurnitureToggle';
import OnboardingToast from '../components/OnboardingToast';
import PanoramaViewer from '../components/PanoramaViewer';
import RotateHint from '../components/RotateHint';
import WindowViewer from '../components/WindowViewer';
import { useHotspotLabelSides } from '../hooks/useHotspotLabelSides';
import { useOrientation } from '../hooks/useOrientation';
import { usePannellumViewer } from '../hooks/usePannellumViewer';
import { useOrientationHfov } from '../hooks/useOrientationHfov';
import { TOUR_CONFIG } from '../services/pannellumService';
import { isMobileUserAgent } from '../utils/device';
import { subscribeToWindowViewRequests } from '../utils/windowViewEvents';
import type { RoomId } from '../types/room';
import Gallery from '../components/Gallery';
import GalleryButton from '../components/GalleryButton';
import { GALLERY_ITEMS } from '../data/galleryConfig';
import {
  getBaseRoomId,
  getFurnishedRoomId,
  hasFurnishedVariant,
  isFurnishedRoomId,
} from '../data/roomsConfig';
import { loadSceneKeepingView } from '../utils/pannellumView';

interface TourProps {
  onExitTour: () => void;
}

export default function Tour({ onExitTour }: TourProps): JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null);
  const tourWrapperRef = useRef<HTMLDivElement>(null);
  const { viewerRef, currentRoomId, isLoaded } = usePannellumViewer(containerRef, TOUR_CONFIG);
  useHotspotLabelSides(containerRef, viewerRef);
  const [isPlanOpen, setIsPlanOpen] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [windowViewImage, setWindowViewImage] = useState<string | null>(null);
  const isPortrait = useOrientation();
  useOrientationHfov(viewerRef, isPortrait);
  const isMobile = isMobileUserAgent();
  const floorPlanSizeClass = isMobile ? 'floor-plan-panel--mobile' : '';

  const baseRoomId = currentRoomId ? getBaseRoomId(currentRoomId) : null;
  const isFurnished = currentRoomId ? isFurnishedRoomId(currentRoomId) : false;
  const canFurnish = currentRoomId ? hasFurnishedVariant(currentRoomId) : false;

  useEffect(() => subscribeToWindowViewRequests(setWindowViewImage), []);

  const handleSelectRoom = (roomId: RoomId) => {
    viewerRef.current?.loadScene(roomId);
  };

  const handleToggleFurniture = () => {
    const viewer = viewerRef.current;
    if (!viewer || !currentRoomId) return;

    // Keep the current framing so the switch reads as furniture appearing in place.
    const target = isFurnished ? getBaseRoomId(currentRoomId) : getFurnishedRoomId(currentRoomId);
    loadSceneKeepingView(viewer, target, {
      pitch: viewer.getPitch(),
      yaw: viewer.getYaw(),
      hfov: viewer.getHfov(),
    });
  };

  const handleBackToLanding = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => { });
    }
    onExitTour();
  };

  return (
    <div ref={tourWrapperRef} className="relative h-dvh w-dvw overflow-hidden bg-black">
      <PanoramaViewer containerRef={containerRef} />
      <RotateHint visible={isMobile && isPortrait} />
      {isLoaded && <OnboardingToast />}
      <div className="tour-controls-bar" role="toolbar" aria-label="Controles del recorrido">
        <BackToLandingButton onBack={handleBackToLanding} />
        <FullscreenToggle targetRef={tourWrapperRef} />
        {canFurnish && <FurnitureToggle isFurnished={isFurnished} onToggle={handleToggleFurniture} />}
        <FloorPlanToggle isOpen={isPlanOpen} onToggle={() => setIsPlanOpen((open) => !open)} />
        <GalleryButton onOpen={() => setIsGalleryOpen(true)} />
      </div>
      <FloorPlan
        currentRoomId={baseRoomId}
        onSelectRoom={handleSelectRoom}
        onClose={() => setIsPlanOpen(false)}
        className={`${floorPlanSizeClass} ${isPlanOpen ? 'block' : 'hidden'}`}
      />
      {isGalleryOpen && <Gallery items={GALLERY_ITEMS} onClose={() => setIsGalleryOpen(false)} />}
      {windowViewImage && <WindowViewer image={windowViewImage} onClose={() => setWindowViewImage(null)} />}
    </div>
  );
}