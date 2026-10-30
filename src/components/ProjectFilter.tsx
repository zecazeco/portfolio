"use client";

import { useEffect, useState } from "react";

type Filter = { id: string; label: string; param: string };

// Botões que filtram a lista de projetos. O filtro fica em <html data-filter> e na URL (?front);
// o CSS gerado em HomePage esconde os cards das outras áreas e troca o texto do topo.
export function ProjectFilter({ filters }: { filters: Filter[] }) {
  const [active, setActive] = useState<string | null>(null);

  function apply(filter: Filter | undefined) {
    const root = document.documentElement;
    if (filter) root.dataset.filter = filter.id;
    else delete root.dataset.filter;
    setActive(filter?.id ?? null);
  }

  // The inline script already applied the URL before paint; this also covers arriving by client navigation
  useEffect(() => {
    const param = location.search.slice(1).split(/[&=]/)[0];
    apply(filters.find((f) => f.param === param));
  }, []);

  function choose(filter: Filter | undefined) {
    apply(filter);
    history.replaceState(null, "", filter ? `?${filter.param}` : location.pathname);
  }

  return (
    <div className="filters" role="group" aria-label="Filtrar projetos por área">
      <button type="button" aria-pressed={active === null} onClick={() => choose(undefined)}>
        Todos
      </button>
      {filters.map((f) => (
        <button key={f.id} type="button" aria-pressed={active === f.id} onClick={() => choose(f)}>
          {f.label}
        </button>
      ))}
    </div>
  );
}
