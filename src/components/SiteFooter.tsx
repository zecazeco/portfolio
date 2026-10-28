import { profile } from "@/data/profile";

export function SiteFooter() {
  const [primary, ...others] = profile.links;
  return (
    <footer className="site-footer" id="contato">
      <div className="container">
        <h2>Contato</h2>
        <p className="muted">Para conversar sobre projetos ou vagas, me chame no LinkedIn.</p>
        <p>
          <a className="btn btn-primary" href={primary.href} target="_blank" rel="noopener">
            {primary.label}
          </a>
        </p>
        <ul className="inline-list">
          {others.map((l) => (
            <li key={l.href}>
              <a href={l.href} target="_blank" rel="noopener">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
