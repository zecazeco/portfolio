import { profile } from "@/data/profile";
import { projectsFor, type Vitrine } from "@/data/vitrines";
import { HeroShader } from "./hero/HeroShader";
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
          <HeroShader />
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

        {profile.clients.length > 0 && (
          <section>
            <h2>Clientes</h2>
            <p className="muted">Pela Govak Reality, de 2023 a 2026.*</p>
            <ul className="list">
              {profile.clients.map((c) => (
                <li key={c.label}>
                  <strong>{c.label}:</strong> {c.names.join(", ")}
                </li>
              ))}
            </ul>
            <p className="footnote">* Vários projetos estão sob acordo de confidencialidade (NDA).</p>
          </section>
        )}

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
