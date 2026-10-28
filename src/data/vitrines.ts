import { publishedProjects, type Area, type Project } from "./projects";

// Uma vitrine por área. A vitrine "geral" é a home (/jlhaas/);
// as outras viram /jlhaas/<slug>/.
export type Vitrine = {
  slug: string;
  label: string;
  title: string;
  intro: string;
  areas: Area[];
  /** Projetos em destaque, nesta ordem; os demais vêm depois */
  order: string[];
};

export const vitrines: Vitrine[] = [
  {
    slug: "geral",
    label: "Geral",
    title: "Creative Developer",
    intro:
      "Desenvolvo experiências interativas desde 2005 — hoje, principalmente em realidade aumentada, realidade virtual e 3D na web.",
    areas: ["xr", "web3d", "frontend", "games", "visuals"],
    order: ["meta-xr-hackathon-2021", "webar-3d", "filtros-ar-marcas", "vr-meta-quest", "word-fleet", "guided-by-nothing"],
  },
  {
    slug: "xr",
    label: "XR & Games",
    title: "XR & Unity Developer",
    intro: "Filtros de AR, WebAR, VR para Meta Quest e jogos em Unity.",
    areas: ["xr", "web3d", "games"],
    order: ["meta-xr-hackathon-2021", "vr-meta-quest", "filtros-ar-marcas", "webar-3d", "guided-by-nothing"],
  },
  {
    slug: "frontend",
    label: "Front-end",
    title: "Front-end Developer",
    intro: "Aplicações web em Vue e Angular em produção, React e TypeScript em projetos próprios, e 3D no navegador.",
    areas: ["frontend", "web3d"],
    order: ["word-fleet", "webar-3d", "app-controle-de-vendas", "portfolio"],
  },
];

export const homeVitrine = vitrines[0];

export function getVitrine(slug: string) {
  return vitrines.find((v) => v.slug === slug);
}

export function projectsFor(vitrine: Vitrine): Project[] {
  const list = publishedProjects.filter((p) => p.areas.some((a) => vitrine.areas.includes(a)));
  const rank = (p: Project) => {
    const i = vitrine.order.indexOf(p.slug);
    return i === -1 ? Infinity : i;
  };
  // sort is stable: projects outside "order" keep the order of projects.ts
  return list.sort((a, b) => rank(a) - rank(b));
}
