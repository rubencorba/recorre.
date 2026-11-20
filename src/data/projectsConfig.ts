import showroomCover from '../assets/screenshots/ShowroomAlvear.webp';
import ba68Cover from '../assets/screenshots/BuenosAires68.webp';
import er455Cover from '../assets/screenshots/EntreRios455.webp';
import museoCover from '../assets/screenshots/La48.webp';

export interface Project {
  id: string;
  title: string;
  kind: string;
  description: string;
  highlights?: string[];
  url?: string; // no url = "Próximamente"
  cover?: string;
}

export const FEATURED_SHOWROOM: Project = {
  id: 'forum-tower',
  title: 'Forum Tower',
  kind: 'Showroom',
  description:
    'Un edificio completo en una sola experiencia: animación de ingreso desde la fachada, ficha técnica por departamento y recorridos 360° de cada unidad y de los amenities.',
  highlights: ['3 departamentos', 'Recorrido de amenities', 'Plano interactivo', 'Ambientes amueblables', 'Galería de fotos'],
  url: 'https://alvear435.recorrido360.workers.dev/',
  cover: showroomCover,
};

export const CASES: Project[] = [
  {
    id: 'buenos-aires-68',
    title: 'Buenos Aires 68',
    kind: 'Departamento',
    description: 'Recorrido 360° con ambientes amueblables, plano interactivo, galería y vistas desde las ventanas.',
    url: 'https://buenosaires68.recorrido360.workers.dev/',
    cover: ba68Cover,
  },
  {
    id: 'depto-er455',
    title: 'Entre Ríos 455',
    kind: 'Departamento',
    description: 'Primer recorrido de un departamento: ambientes navegables, plano y portada de ingreso.',
    url: 'https://tour-depto-er455.recorrido360.workers.dev/',
    cover: er455Cover,
  },
  {
    id: 'casa-alcorta',
    title: 'Casa Argañaraz Alcorta',
    kind: 'Espacio cultural',
    description: 'Recorrido 360° de 16 puntos distribuidos en siete salas.',
    url: 'https://exposicionla48.recorrido360.workers.dev/',
    cover: museoCover,
  },
];

export const SERVICES = [
  { title: 'Showrooms', text: 'Edificios y complejos con varias unidades: animación de ingreso, ficha técnica por unidad y recorridos de amenities.' },
  { title: 'Tours 360°', text: 'Departamentos y casas con ambientes navegables, plano interactivo, galería y versiones amuebladas.' },
  { title: 'Espacios singulares', text: 'Museos, locales y otros espacios que merecen ser recorridos a distancia.' },
];