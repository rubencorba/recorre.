import { STEPS } from '../data/siteConfig';

export default function Process() {
  return (
    <section id="como-trabajamos" className="section">
      <div className="section-inner">
        <p className="section-eyebrow">Cómo trabajamos</p>
        <h2 className="section-title">Del primer contacto al enlace listo para compartir</h2>
        <ol className="steps">
          {STEPS.map((step, index) => (
            <li key={step.title} className="step">
              <span className="step-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}