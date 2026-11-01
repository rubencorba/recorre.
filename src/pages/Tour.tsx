import { useRef, useState, type JSX } from 'react';
import BackToLandingButton from '../components/BackToLandingButton';
import FloorPlan from '../components/FloorPlan';
import FloorPlanToggle from '../components/FloorPlanToggle';
import FullscreenToggle from '../components/FullscreenToggle';
import OnboardingToast from '../components/OnboardingToast';
import PanoramaViewer from '../components/PanoramaViewer';
import RotateHint from '../components/RotateHint';
import { useOrientation } from '../hooks/useOrientation';
import { usePannellumViewer } from '../hooks/usePannellumViewer';
import { TOUR_CONFIG } from '../services/pannellumService';
import { isMobileUserAgent } from '../utils/device';
import type { RoomId } from '../types/room';
import Gallery from '../components/Gallery';
import GalleryButton from '../components/GalleryButton';
import { GALLERY_ITEMS } from '../data/galleryConfig';

interface TourProps {
  onExitTour: () => void;
}

export default function Tour({ onExitTour }: TourProps): JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null);
  const tourWrapperRef = useRef<HTMLDivElement>(null);
  const { viewerRef, currentRoomId, isLoaded } = usePannellumViewer(containerRef, TOUR_CONFIG);
  const [isPlanOpen, setIsPlanOpen] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const isPortrait = useOrientation();
  const isMobile = isMobileUserAgent();
  const floorPlanSizeClass = isMobile ? 'floor-plan-panel--mobile' : '';

  const handleSelectRoom = (roomId: RoomId) => {
    viewerRef.current?.loadScene(roomId);
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
        <FloorPlanToggle isOpen={isPlanOpen} onToggle={() => setIsPlanOpen((open) => !open)} />
        <GalleryButton onOpen={() => setIsGalleryOpen(true)} />
      </div>
      <FloorPlan
        currentRoomId={currentRoomId}
        onSelectRoom={handleSelectRoom}
        className={`${floorPlanSizeClass} ${isPlanOpen ? 'block' : 'hidden'}`}
      />
      {isGalleryOpen && <Gallery items={GALLERY_ITEMS} onClose={() => setIsGalleryOpen(false)} />}
    </div>
  );
}