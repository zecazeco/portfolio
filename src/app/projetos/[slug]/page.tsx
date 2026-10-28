import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Cover } from "@/components/ProjectCard";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { getProject, publishedProjects, type CaseStudy } from "@/data/projects";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return publishedProjects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = getProject((await params).slug);
  return { title: `${project?.title} — José Luís Haas`, description: project?.summary };
}

const sections: { key: keyof CaseStudy; label: string }[] = [
  { key: "contexto", label: "Contexto" },
  { key: "papel", label: "Meu papel" },
  { key: "desafio", label: "Desafio" },
  { key: "solucao", label: "Solução" },
  { key: "resultado", label: "Resultado" },
];

export default async function ProjectPage({ params }: Props) {
  const project = getProject((await params).slug);
  if (!project) notFound();
  const cs = project.caseStudy ?? {};

  return (
    <>
      <SiteHeader />
      <main className="container project">
        <Link href="/" className="back">
          ← todos os projetos
        </Link>
        <p className="eyebrow">
          {project.year}
          {project.badge && <span className="badge">{project.badge}</span>}
          {project.nda && <span className="badge badge-muted">NDA</span>}
        </p>
        <h1>{project.title}</h1>
        <p className="lead">{project.summary}</p>

        {!project.nda && <Cover project={project} />}
        {project.nda && (
          <p className="note">Projeto sob acordo de confidencialidade: descrito só em texto, sem imagens.</p>
        )}

        <div className="project-body">
          <div>
            {sections
              .filter((s) => cs[s.key])
              .map((s) => (
                <section key={s.key}>
                  <h2>{s.label}</h2>
                  <p>{cs[s.key]}</p>
                </section>
              ))}
          </div>
          <aside>
            {project.clients && (
              <>
                <h3>Clientes</h3>
                <ul className="list">
                  {project.clients.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              </>
            )}
            <h3>Stack</h3>
            <ul className="chips">
              {project.stack.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
            {project.links && (
              <p>
                {project.links.map((l) => (
                  <a key={l.href} className="btn" href={l.href} target="_blank" rel="noopener">
                    {l.label}
                  </a>
                ))}
              </p>
            )}
          </aside>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
