import type { ReactNode } from 'react';
import { CASES, FEATURED_SHOWROOM, type Project } from '../data/projectsConfig';

function ProjectAction({ url }: { url?: string }) {
  return url ? (
    <a className="project-link" href={url} target="_blank" rel="noopener noreferrer">
      Ver recorrido →
    </a>
  ) : (
    <span className="project-soon">Próximamente</span>
  );
}

// Cover that opens the project in a new tab (plain div when there is no url yet)
function CoverLink({ url, className, children }: { url?: string; className: string; children: ReactNode }) {
  if (!url) return <div className={className}>{children}</div>;
  return (
    <a className={className} href={url} target="_blank" rel="noopener noreferrer" tabIndex={-1} aria-hidden="true">
      {children}
    </a>
  );
}

function CaseCard({ project }: { project: Project }) {
  return (
    <article className="case-card">
      {project.cover && (
        <CoverLink url={project.url} className="case-cover-link">
          <img className="case-cover" src={project.cover} alt={`Recorrido ${project.title}`} loading="lazy" />
        </CoverLink>
      )}
      <div className="case-body">
        <p className="project-kind">{project.kind}</p>
        <h3 className="case-title">{project.title}</h3>
        <p className="case-text">{project.description}</p>
        <ProjectAction url={project.url} />
      </div>
    </article>
  );
}

export default function Projects() {
  const showroom = FEATURED_SHOWROOM;
  return (
    <section id="proyectos" className="section">
      <div className="section-inner">
        <p className="section-eyebrow">Proyectos destacados</p>
        <h2 className="section-title">Espacios que ya se pueden recorrer</h2>

        <article className="showroom-card">
          <CoverLink url={showroom.url} className="showroom-cover">
            {showroom.cover ? <img src={showroom.cover} alt={`Showroom ${showroom.title}`} /> : <span aria-hidden="true">360°</span>}
          </CoverLink>
          <div className="showroom-body">
            <p className="project-kind project-kind--light">{showroom.kind}</p>
            <h3 className="showroom-title">{showroom.title}</h3>
            <p className="showroom-text">{showroom.description}</p>
            <ul className="tag-list">
              {showroom.highlights?.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <ProjectAction url={showroom.url} />
          </div>
        </article>

        <div className="case-grid">
          {CASES.map((project) => (
            <CaseCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}