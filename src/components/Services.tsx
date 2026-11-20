import { SERVICES } from '../data/projectsConfig';

export default function Services() {
  return (
    <section id="servicios" className="section section--sand">
      <div className="section-inner">
        <p className="section-eyebrow">Servicios</p>
        <h2 className="section-title">Cada espacio, una experiencia a medida</h2>
        <div className="service-grid">
          {SERVICES.map((service) => (
            <article key={service.title} className="service-card">
              <h3>{service.title}</h3>
              <p>{service.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}