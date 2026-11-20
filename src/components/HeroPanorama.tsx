import { useEffect, useRef, useState } from 'react';
import panoramaImage from '../assets/panoramas/BalconLiving.webp';
import FullscreenButton from './FullscreenButton';
import { useOrientation } from '../hooks/useOrientation';
import { HERO_PANORAMA, WHATSAPP_URL } from '../data/siteConfig';
import WhatsAppIcon from './WhatsAppIcon';

export default function HeroPanorama() {
    const heroRef = useRef<HTMLElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const yawRef = useRef(HERO_PANORAMA.initialYaw);
    const interactedRef = useRef(false);
    const [isHintVisible, setIsHintVisible] = useState(true);

    const isPortrait = useOrientation();
    const hfov = isPortrait ? HERO_PANORAMA.hfovPortrait : HERO_PANORAMA.hfovLandscape;

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const viewer = pannellum.viewer(container, {
            type: 'equirectangular',
            panorama: panoramaImage,
            autoLoad: true,
            yaw: yawRef.current,
            pitch: HERO_PANORAMA.initialPitch,
            minYaw: HERO_PANORAMA.minYaw,
            maxYaw: HERO_PANORAMA.maxYaw,
            minPitch: HERO_PANORAMA.minPitch,
            maxPitch: HERO_PANORAMA.maxPitch,
            // No zoom: wheel, double click, keyboard and pinch (min = max = hfov)
            hfov,
            minHfov: hfov,
            maxHfov: hfov,
            mouseZoom: false,
            keyboardZoom: false,
            showControls: false,
            showZoomCtrl: false,
            showFullscreenCtrl: false,
            compass: false,
            draggable: true,
            // No inactivity delay on purpose: once the user interacts it never resumes
            autoRotate: interactedRef.current ? 0 : HERO_PANORAMA.autoRotateSpeed,
        });

        // Capture phase: Pannellum stops propagation of pointer events
        const onFirstInteraction = () => {
            interactedRef.current = true;
            setIsHintVisible(false);
        };
        container.addEventListener('pointerdown', onFirstInteraction, { once: true, capture: true });

        // DEV: log the view after dragging, to pick `initialYaw` / `initialPitch`
        const logView = () => console.log(`yaw: ${viewer.getYaw().toFixed(1)}  pitch: ${viewer.getPitch().toFixed(1)}`);
        if (import.meta.env.DEV) {
            viewer.on('mouseup', logView);
            viewer.on('touchend', logView);
        }

        return () => {
            yawRef.current = viewer.getYaw();
            container.removeEventListener('pointerdown', onFirstInteraction, { capture: true });
            viewer.destroy();
        };
    }, [hfov]);

    return (
        <section id="inicio" ref={heroRef} className="hero">
            <div ref={containerRef} className="hero-panorama" />
            <div className="hero-shade" aria-hidden="true" />

            <div className="hero-content">
                <h1 className="hero-title">
                    Transformamos espacios en experiencias digitales<span className="brand-dot">.</span>
                </h1>
                <div className="hero-actions">
                    <a className="btn btn--primary" href="#proyectos">Explorar proyectos</a>
                    <a className="btn btn--ghost btn--icon" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                        <WhatsAppIcon />
                        Contáctanos
                    </a>
                </div>
            </div>

            <div className="hero-controls">
                <span className="hero-badge" aria-hidden="true">360°</span>
                {isHintVisible && <span className="hero-hint">Arrastrá para explorar</span>}
                <FullscreenButton targetRef={heroRef} />
            </div>
        </section>
    );
}