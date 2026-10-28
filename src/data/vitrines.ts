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
      "Desenvolvedor criativo trabalhando com tecnologia desde 2005. Crio experiências interativas para web, realidade aumentada e realidade virtual, com Three.js, 8th Wall, Unity e shaders, para marcas como Netflix, TikTok, Formula E e Walmart.",
    areas: ["xr", "web3d", "frontend", "games", "visuals"],
    order: ["meta-xr-hackathon-2021", "webar-3d", "filtros-ar-marcas", "vr-meta-quest", "word-fleet", "guided-by-nothing"],
  },
  {
    slug: "xr",
    label: "XR & Games",
    title: "XR & Unity Developer",
    intro:
      "Desenvolvo realidade aumentada e virtual desde 2020: filtros para Instagram, TikTok e Snapchat, WebAR com 8th Wall e VR para Meta Quest em Unity, para marcas como TikTok, Netflix, Vivo e John Deere. Também crio jogos no meu estúdio, a Vangrog.",
    areas: ["xr", "web3d", "games"],
    order: ["meta-xr-hackathon-2021", "vr-meta-quest", "filtros-ar-marcas", "webar-3d", "guided-by-nothing"],
  },
  {
    slug: "frontend",
    label: "Front-end",
    title: "Front-end Developer",
    intro:
      "Desenvolvo para a web desde 2005, do Flash ao front-end atual. Tenho aplicações em produção em Vue e Angular, entre elas um app de vendas em uso desde 2021 sem precisar de manutenção, e uso React, TypeScript e Three.js em projetos próprios.",
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
