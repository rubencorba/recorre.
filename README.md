# Tour Virtual 360° — Buenos Aires 68

Recorrido virtual 360° de un departamento, construido con React + TypeScript + Vite + Pannellum + Tailwind CSS.

## Puesta en marcha

```bash
npm install
npm run dev
```

## Imágenes necesarias

Las imágenes deben estar en estas rutas, con estos nombres exactos. Cloudflare compila en Linux y distingue mayúsculas de minúsculas, así que `Plano.webp` y `plano.webp` no son lo mismo.

- `src/assets/Fachada.webp` — foto de la fachada (landing).
- `src/assets/Plano.webp` — plano en planta del departamento.
- `src/assets/panoramas/` — imágenes equirectangulares 360° (4096×2048 es suficiente):
  - `Living.webp`, `Banio.webp`, `Cocina.webp`, `Dormitorio1.webp`, `Dormitorio2.webp`
  - Variantes amuebladas: `LivingAmueblado.webp`, `Dormitorio1Amueblado.webp`, `Dormitorio2Amueblado.webp`
- `src/assets/gallery/Galeria1.webp … Galeria8.webp` — fotos de la galería.
- `src/assets/miniatures/Miniatura1.webp … Miniatura8.webp` — miniaturas de la grilla.
- `src/assets/window-views/WindowView1.webp … WindowView3.webp` — vista desde cada ventana (módulo opcional).
- `public/og-image.jpg` — imagen para la vista previa del link (1200×630).

Si falta alguna imagen, `npm run build` falla al no encontrar el archivo. Para validar el código sin necesidad de las imágenes, usa:

```bash
npx tsc --noEmit
```

## Estructura del proyecto

```
src/
├── assets/           # Fachada, Plano, panoramas/, gallery/, miniatures/, window-views/
├── components/       # PanoramaViewer, RotateHint, OnboardingToast, FloorPlan, FloorPlanToggle,
│                     # FullscreenToggle, BackToLandingButton, FurnitureToggle, GalleryButton,
│                     # Gallery, WindowViewer
├── pages/            # Landing, Tour
├── data/             # roomsConfig, floorPlanConfig, galleryConfig, windowViewsConfig
├── hooks/            # usePannellumViewer, useOrientation, useOrientationHfov, useHotspotLabelSides
├── services/         # pannellumService.ts — arma la config de Pannellum a partir de roomsConfig
├── types/            # Room, Hotspot, FloorPlanRoom, GalleryItem, declaraciones ambientales
├── utils/            # device, pannellumView, windowViewEvents
└── styles/           # Tailwind + hotspots, barra, plano, galería, safe-area
```

## Qué se configura en cada proyecto

- `src/data/roomsConfig.ts` — habitaciones, títulos, imágenes, hotspots de navegación y cuáles tienen variante amueblada.
- `src/data/floorPlanConfig.ts` — posición (en %) de cada habitación sobre `Plano.webp`.
- `src/data/galleryConfig.ts` — imágenes de la galería y sus miniaturas.
- `src/data/windowViewsConfig.ts` — ventanas de cada habitación y su foto (módulo opcional).
- `src/pages/Landing.tsx` e `index.html` (título, descripción y etiquetas Open Graph).

## Landing

`src/pages/Landing.tsx` expone la prop `onEnterTour: () => void`. Llámala cuando el usuario elija entrar al tour para que la app cambie a la vista del recorrido.

## Navegación entre habitaciones

Los hotspots de cada habitación se escriben a mano en `ROOM_HOTSPOTS`, dentro de `src/data/roomsConfig.ts`. El pasillo que une las habitaciones no tiene panorámica propia, así que los hotspots circulares se apilan en la puerta de cada habitación para conectar todas entre sí.

Las variantes amuebladas son escenas aparte que heredan los hotspots de la habitación base, así que al navegar siempre se llega a la versión vacía de la habitación siguiente.

### Ubicar un hotspot

En `buildTourConfig` (`src/services/pannellumService.ts`) hay una línea comentada con `hotSpotDebug`. Descoméntala mientras desarrollas: al hacer clic en el panorama (solo en escritorio) la consola muestra `Pitch` y `Yaw` de ese punto. Copia esos valores a `roomsConfig.ts` (o a `windowViewsConfig.ts`) y vuelve a comentar la línea.

## Funciones del recorrido

- **Barra de controles:** Inicio, Pantalla completa (no disponible en iPhone Safari), Amueblar / Original (solo en habitaciones con variante), Plano y Galería.
- **Plano:** imagen con un punto navegable por habitación, etiquetas y botón "X" para cerrarlo.
- **Galería:** grilla de miniaturas y visor a pantalla completa.
- **Vistas desde la ventana:** hotspot con ícono de ventana que abre una foto de lo que se ve desde ella.
- **Zoom inicial según orientación:** en teléfonos en vertical se usa un campo de visión menor para reducir la deformación; al girar el teléfono se ajusta.
- **Etiqueta de ubicación:** "Estás en …" arriba a la izquierda.

## Rotar el dispositivo

En teléfonos en vertical se muestra el banner `RotateHint` sugiriendo girar el teléfono. No bloquea la vista: el recorrido se puede usar también en vertical.

## Despliegue (Cloudflare Pages)

- Proyecto conectado al repositorio de GitHub.
- Comando de compilación: `npm run build`. Directorio de salida: `dist`.
- Variable de entorno: `NODE_VERSION=22`.
- La vista previa del link (WhatsApp, etc.) queda en caché: para refrescarla, comparte el link con un parámetro, por ejemplo `?v=2`.