import Link from "next/link";
import type { Project } from "@/data/projects";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link href={`/projetos/${project.slug}/`} className="card">
      <Cover project={project} />
      <div className="card-body">
        <p className="eyebrow">
          {project.year}
          {project.badge && <span className="badge">{project.badge}</span>}
          {project.nda && <span className="badge badge-muted">NDA</span>}
        </p>
        <h3>{project.title}</h3>
        <p className="muted">{project.summary}</p>
        <ul className="chips">
          {project.stack.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      </div>
    </Link>
  );
}

export function Cover({ project }: { project: Project }) {
  // NDA projects never show images; projects without a cover get a placeholder
  if (project.cover && !project.nda) {
    return <img className="cover" src={`/jlhaas${project.cover}`} width={1280} height={720} alt="" loading="lazy" />;
  }
  return (
    <div className="cover cover-placeholder" aria-hidden="true">
      <span>{project.title}</span>
    </div>
  );
}
