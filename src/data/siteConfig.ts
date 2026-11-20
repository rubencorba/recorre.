export const NAV_ITEMS = [
  { label: 'Proyectos', href: '#proyectos' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Cómo trabajamos', href: '#como-trabajamos' },
  { label: 'Contacto', href: '#contacto' },
];

// Hero panorama: starting values, tune on screen / real phone.
// All limits are the EDGES of the visible area, in degrees.
export const HERO_PANORAMA = {
  initialYaw: 0, // must be inside [minYaw + hfov/2, maxYaw - hfov/2]
  initialPitch: -15, // negative = looks down
  minYaw: -50,
  maxYaw: 140,
  minPitch: -70, // if (maxPitch - minPitch) < vertical fov, pitch is fixed at the midpoint
  maxPitch: 40,
  hfovLandscape: 100,
  hfovPortrait: 70,
  autoRotateSpeed: -1.5, // deg/s, very slow; reverses at the yaw limits
};

// Small panorama in the "Qué incluye" section (no auto-rotate, no zoom)
export const DEMO_PANORAMA = { initialYaw: -105, initialPitch: -20, hfov: 90 };

export const WHATSAPP_NUMBER = '5493856971908'; // placeholder: country + area + number, digits only
export const WHATSAPP_MESSAGE = 'Hola, quiero consultar por un recorrido 360° para mi propiedad.';
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

export const STEPS = [
  { title: 'Nos contás sobre tu proyecto', text: 'Conocemos la propiedad, sus características y qué querés conseguir con la presentación.' },
  { title: 'Coordinamos la visita', text: 'Organizamos la captura de imágenes y relevamos los ambientes.' },
  { title: 'Desarrollamos la experiencia', text: 'Procesamos las fotografías, creamos el recorrido y diseñamos la presentación digital.' },
  { title: 'Publicamos y entregamos', text: 'Recibís un enlace para compartir con potenciales compradores o interesados.' },
];