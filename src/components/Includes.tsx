import FurnishDemo from './FurnishDemo';
import PlanDemo from './PlanDemo';
import galleryImage from '../assets/demo/Galeria.webp';

export default function Includes() {
  return (
    <section id="incluye" className="section section--sand">
      <div className="section-inner">
        <p className="section-eyebrow">Qué puede incluir</p>
        <h2 className="section-title">Herramientas para mostrar mejor cada propiedad</h2>
        <div className="include-grid">
          <article className="include-card">
            <FurnishDemo />
            <h3>Amoblamiento mediante IA</h3>
            <p>Ambientes que pueden verse vacíos y amueblados, haz clic en Amueblar y recorre.</p>
          </article>
          <article className="include-card">
            <PlanDemo />
            <h3>Plano interactivo</h3>
            <p>Un plano en 3D y 2D desde el cual se navega a cada ambiente.</p>
          </article>
          <article className="include-card">
            <div className="demo-media">
              <img className="demo-gallery" src={galleryImage} alt="Galería de imágenes del recorrido" loading="lazy" />
            </div>
            <h3>Galería de imágenes</h3>
            <p>Una selección de fotografías del espacio, para ver cada detalle.</p>
          </article>
        </div>
      </div>
    </section>
  );
}