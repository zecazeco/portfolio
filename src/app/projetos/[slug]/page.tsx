import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Cover } from "@/components/ProjectCard";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { projectMedia } from "@/data/media";
import { getProject, publishedProjects, type CaseStudy } from "@/data/projects";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return publishedProjects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = getProject((await params).slug);
  if (!project) return {};
  const title = `${project.title} — José Luís Haas`;
  const { cover } = projectMedia(project.slug);
  // Link preview uses the project cover; NDA or no cover falls back to the site-wide og.png
  // (openGraph here replaces the layout's whole object, so the fallback must be repeated)
  const image =
    cover && !project.nda
      ? { url: `/jlhaas${cover}`, alt: project.title }
      : { url: "/jlhaas/og.png", width: 1200, height: 627, alt: "José Luís Haas, Creative Developer" };
  return {
    title,
    description: project.summary,
    openGraph: {
      type: "article",
      locale: "pt_BR",
      url: `/jlhaas/projetos/${project.slug}/`,
      siteName: "José Luís Haas",
      title,
      description: project.summary,
      images: [image],
    },
  };
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
  const { gallery } = projectMedia(project.slug);

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
            {!project.nda && gallery.length > 0 && (
              <section>
                <h2>Galeria</h2>
                <div className="gallery">
                  {gallery.map((m) =>
                    m.type === "video" ? (
                      <video key={m.src} src={`/jlhaas${m.src}`} autoPlay muted loop playsInline controls preload="metadata" />
                    ) : (
                      <a key={m.src} href={`/jlhaas${m.src}`} target="_blank" rel="noopener">
                        <img src={`/jlhaas${m.src}`} alt="" loading="lazy" />
                      </a>
                    ),
                  )}
                </div>
              </section>
            )}
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
