export interface GalleryItem {
  /** Unique id, used as the React key. */
  id: string;
  /** Full-size image shown in the viewer. */
  src: string;
  /** Optional smaller version for the grid. Falls back to `src`. */
  thumb?: string;
  title: string;
  /** Optional extra line, e.g. artist, year, technique. */
  description?: string;
}