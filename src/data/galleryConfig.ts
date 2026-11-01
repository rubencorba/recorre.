import type { GalleryItem } from '../types/gallery';
import obra01 from '../assets/gallery/galeria1.webp';
import obra02 from '../assets/gallery/galeria2.webp';
import obra03 from '../assets/gallery/galeria3.webp';
import obra04 from '../assets/gallery/galeria4.webp';
import obra05 from '../assets/gallery/galeria5.webp';
import obra06 from '../assets/gallery/galeria6.webp';
import obra07 from '../assets/gallery/galeria7.webp';
import thumb01 from '../assets/miniatures/miniatura1.jpg';
import thumb02 from '../assets/miniatures/miniatura2.jpg';
import thumb03 from '../assets/miniatures/miniatura3.jpg';
import thumb04 from '../assets/miniatures/miniatura4.jpg';
import thumb05 from '../assets/miniatures/miniatura5.jpg';
import thumb06 from '../assets/miniatures/miniatura6.jpg';
import thumb07 from '../assets/miniatures/miniatura7.jpg';

/**
 * Gallery images, in display order. `thumb` is the small version shown in
 * the grid; `src` is the full-size one shown in the viewer. To add one:
 * put both files in src/assets/gallery/ and src/assets/miniatures/, import
 * them above and add an entry here.
 */
export const GALLERY_ITEMS: GalleryItem[] = [
  { id: 'obra-01', src: obra01, thumb: thumb01, title: 'Título de la obra', description: 'Artista, año, técnica' },
  { id: 'obra-02', src: obra02, thumb: thumb02, title: 'Otra obra' },
  { id: 'obra-03', src: obra03, thumb: thumb03, title: 'Otra obra' },
  { id: 'obra-04', src: obra04, thumb: thumb04, title: 'Otra obra' },
  { id: 'obra-05', src: obra05, thumb: thumb05, title: 'Otra obra' },
  { id: 'obra-06', src: obra06, thumb: thumb06, title: 'Otra obra' },
  { id: 'obra-07', src: obra07, thumb: thumb07, title: 'Otra obra' },
];