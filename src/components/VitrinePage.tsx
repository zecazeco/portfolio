import { profile } from "@/data/profile";
import { projectsFor, type Vitrine } from "@/data/vitrines";
import { ProjectCard } from "./ProjectCard";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";

export function VitrinePage({ vitrine }: { vitrine: Vitrine }) {
  const list = projectsFor(vitrine);
  return (
    <>
      <SiteHeader active={vitrine.slug} />
      <main className="container">
        <section className="hero">
          <p className="eyebrow">{profile.name}</p>
          <h1>{vitrine.title}</h1>
          <p className="lead">{vitrine.intro}</p>
          <p>
            <a className="btn btn-primary" href="#projetos">
              Ver projetos
            </a>
            <a className="btn" href="#contato">
              Contato
            </a>
          </p>
        </section>

        <section id="projetos">
          <h2>Projetos</h2>
          <div className="grid">
            {list.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
        </section>

        <section>
          <h2>Prêmios</h2>
          <ul className="list">
            {profile.awards.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
