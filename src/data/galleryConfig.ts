import type { GalleryItem } from '../types/gallery';
import galeria1 from '../assets/gallery/Galeria1.webp';
import galeria2 from '../assets/gallery/Galeria2.webp';
import galeria3 from '../assets/gallery/Galeria3.webp';
import galeria4 from '../assets/gallery/Galeria4.webp';
import galeria5 from '../assets/gallery/Galeria5.webp';
import galeria6 from '../assets/gallery/Galeria6.webp';
import galeria7 from '../assets/gallery/Galeria7.webp';
import galeria8 from '../assets/gallery/Galeria8.webp';
import miniatura1 from '../assets/miniatures/Miniatura1.webp';
import miniatura2 from '../assets/miniatures/Miniatura2.webp';
import miniatura3 from '../assets/miniatures/Miniatura3.webp';
import miniatura4 from '../assets/miniatures/Miniatura4.webp';
import miniatura5 from '../assets/miniatures/Miniatura5.webp';
import miniatura6 from '../assets/miniatures/Miniatura6.webp';
import miniatura7 from '../assets/miniatures/Miniatura7.webp';
import miniatura8 from '../assets/miniatures/Miniatura8.webp';

/**
 * Gallery images, in display order. `thumb` is the small version shown in
 * the grid; `src` is the full-size one shown in the viewer. To add one:
 * put both files in src/assets/gallery/ and src/assets/miniatures/, import
 * them above and add an entry here.
 */
export const GALLERY_ITEMS: GalleryItem[] = [
  { id: 'galeria-1', src: galeria1, thumb: miniatura1 },
  { id: 'galeria-2', src: galeria2, thumb: miniatura2 },
  { id: 'galeria-3', src: galeria3, thumb: miniatura3 },
  { id: 'galeria-4', src: galeria4, thumb: miniatura4 },
  { id: 'galeria-5', src: galeria5, thumb: miniatura5 },
  { id: 'galeria-6', src: galeria6, thumb: miniatura6 },
  { id: 'galeria-7', src: galeria7, thumb: miniatura7 },
  { id: 'galeria-8', src: galeria8, thumb: miniatura8 },
];