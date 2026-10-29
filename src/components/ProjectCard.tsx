import Link from "next/link";
import { projectMedia } from "@/data/media";
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
  // NDA projects never show images: same graph paper with an NDA tag in the middle
  if (project.nda) {
    return (
      <div className="cover cover-placeholder cover-nda" aria-hidden="true">
        <span>NDA</span>
      </div>
    );
  }
  // Projects without a cover get a placeholder.
  // Read on every render so a new media folder shows up without restarting the dev server.
  const { cover } = projectMedia(project.slug);
  if (cover) {
    return <img className="cover" src={`/jlhaas${cover}`} width={1280} height={720} alt="" loading="lazy" />;
  }
  return (
    <div className="cover cover-placeholder" aria-hidden="true">
      <span>{project.title}</span>
    </div>
  );
}
