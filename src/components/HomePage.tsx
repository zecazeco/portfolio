import { areaFilters, general } from "@/data/areas";
import { profile } from "@/data/profile";
import { publishedProjects } from "@/data/projects";
import { HeroShader } from "./hero/HeroShader";
import { ProjectCard } from "./ProjectCard";
import { ProjectFilter } from "./ProjectFilter";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";

// Only areas that have projects get a button
const filters = areaFilters.filter((f) => publishedProjects.some((p) => p.areas.includes(f.id)));

// The filter is applied by CSS on <html data-filter>, so the page is already right on first paint
const css = [
  "[data-hero]{display:none}",
  "html:not([data-filter]) [data-hero=all]{display:block}",
  ...filters.flatMap((f) => [
    `html[data-filter=${f.id}] [data-areas]:not([data-areas~=${f.id}]){display:none}`,
    `html[data-filter=${f.id}] [data-hero=${f.intro ? f.id : "all"}]{display:block}`,
  ]),
].join("\n");

// Runs before the page paints: reads ?front, ?xr… and sets the filter
const params = Object.fromEntries(filters.map((f) => [f.param, f.id]));
const script = `(function(){var m=${JSON.stringify(params)};var f=m[location.search.slice(1).split(/[&=]/)[0]];if(f)document.documentElement.dataset.filter=f;})();`;

export function HomePage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <script dangerouslySetInnerHTML={{ __html: script }} />
      <SiteHeader />
      <main className="container">
        <section className="hero">
          <HeroShader />
          {[{ id: "all", ...general }, ...filters.filter((f) => f.intro)].map((h) => (
            <div key={h.id} data-hero={h.id}>
              <h1>{h.title}</h1>
              <p className="lead">{h.intro}</p>
            </div>
          ))}
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
          <div className="section-head">
            <h2>Projetos</h2>
            <ProjectFilter filters={filters.map(({ id, label, param }) => ({ id, label, param }))} />
          </div>
          <div className="grid">
            {publishedProjects.map((p) => (
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
