# recorre. — Portfolio

Sitio web de **recorre.** (<https://recorre.com.ar>), emprendimiento de tours virtuales 360° y showrooms digitales.

Una sola página: encabezado con navegación, hero con una panorámica 360° explorable, proyectos destacados, servicios, cómo trabajamos, demos de lo que puede incluir el servicio y contacto por WhatsApp.

## Stack

- Vite + React + TypeScript
- Tailwind CSS 4 (`@import 'tailwindcss';`) con estilos propios en `src/styles/index.css`
- [Pannellum](https://pannellum.org/) 2.5.7 para las panorámicas
- Sin router ni otras dependencias en runtime

## Comandos

```bash
npm install
npm run dev       # desarrollo
npx tsc --noEmit  # chequeo de tipos
npm run lint      # oxlint
npm run build     # tsc -b && vite build  -> dist/
npm run preview
```

`npm run build` falla si falta algún archivo importado de `src/assets` (ver "Assets").

## Estructura

```
public/
  favicon.svg
  og-image.jpg            1200x630, JPG (vista previa al compartir el enlace)
src/
  main.tsx, App.tsx
  components/             Header, Logo, HeroPanorama, FullscreenButton, Projects,
                          Services, Process, Includes (FurnishDemo, PlanDemo),
                          Footer, WhatsAppIcon
  hooks/useOrientation.ts
  utils/device.ts
  data/
    siteConfig.ts         navegación, panorámica del hero, WhatsApp, pasos de "Cómo trabajamos"
    projectsConfig.ts     proyectos destacados, casos y servicios
  assets/
    panoramas/BalconLiving.webp
    screenshots/          BuenosAires68, EntreRios455, La48, ShowroomAlvear (.webp)
    demo/                 Living, LivingAmueblado, Plano, Plano2, Galeria (.webp)
  styles/index.css
```

Los nombres de archivo distinguen mayúsculas y minúsculas (el build corre en Linux): deben coincidir exactamente con los imports.

## Dónde se edita el contenido

| Qué | Dónde |
| --- | --- |
| Navegación, pasos de "Cómo trabajamos" | `src/data/siteConfig.ts` |
| Número y mensaje de WhatsApp | `WHATSAPP_NUMBER` y `WHATSAPP_MESSAGE` en `siteConfig.ts` (número con código de país, solo dígitos) |
| Proyectos, URLs de los recorridos, capturas, servicios | `src/data/projectsConfig.ts` |
| Titular y botones del hero | `src/components/HeroPanorama.tsx` |
| Colores | variables `:root` de `src/styles/index.css` (`--cream`, `--ink`, `--sand`, `--gold`) |

Un proyecto sin `url` muestra «Próximamente» en lugar del enlace.

## Panorámica del hero

Se configura en `HERO_PANORAMA` (`siteConfig.ts`). Detalles que conviene tener presentes:

- **Los límites son los bordes de la vista**, no el centro. `minYaw`/`maxYaw` y `minPitch`/`maxPitch` están en grados.
- El centro de la vista se mueve en `[minYaw + hfov/2, maxYaw − hfov/2]`. `initialYaw` debe quedar dentro de ese rango (con el hfov de escritorio y el de móvil).
- Si la ventana (`maxYaw − minYaw`) no es mayor que el hfov, no hay movimiento horizontal. Con el pitch ocurre lo mismo respecto del fov vertical: si la ventana es menor, el pitch queda fijo en el punto medio y `initialPitch` se ignora. En móvil vertical el fov vertical es grande, por eso suele quedar fijo.
- Para calibrar: en desarrollo, la consola imprime `yaw` y `pitch` del centro al soltar el arrastre. Límite izquierdo = yaw del último punto que quieres mostrar − hfov/2; derecho = yaw + hfov/2.
- `autoRotateSpeed`: valor negativo gira hacia la derecha; se invierte al llegar a un límite. Se detiene al primer toque o clic y no se reanuda.
- Sin zoom: la rueda y el teclado están desactivados y `minHfov = maxHfov = hfov` bloquea también el pellizco.
- El hfov depende de la orientación (`hfovLandscape` / `hfovPortrait`). Al rotar el dispositivo se recrea el visor conservando el yaw.

Las demos de "Qué incluye" usan `DEMO_PANORAMA` (sin auto-rotación ni zoom).

## Comportamientos a tener en cuenta

- En pantallas táctiles el hero mide 85 svh (en vez de 100 svh): el panorama captura los deslizamientos y así queda una franja de la siguiente sección para poder seguir bajando. Verificar en un teléfono real.
- La pantalla completa del hero no está disponible en iPhone Safari (el botón se oculta).
- Las cards de proyectos hacen zoom de la imagen al pasar el mouse (solo dispositivos con hover) y la imagen abre el recorrido en otra pestaña.

## Vista previa al compartir (Open Graph)

`index.html` define las etiquetas `og:*` y `twitter:card`. La imagen es `public/og-image.jpg`:

- JPG, 1200×630 (relación 1,91:1). Mantener logo y texto en la franja central: algunas plataformas recortan los costados.
- La URL de `og:image` debe ser absoluta (`https://recorre.com.ar/og-image.jpg`).
- WhatsApp guarda la vista previa en caché: al probar cambios, compartir el enlace con `?v=2` (o usar el depurador de Facebook).

## Despliegue

- Comando de build: `npm run build`; carpeta de salida: `dist`.
- Variable de entorno recomendada: `NODE_VERSION=22`.
- Dominio: `recorre.com.ar`.
- Límite de 25 MiB por archivo en Cloudflare. Revisar el peso de las panorámicas y las capturas antes de publicar.
