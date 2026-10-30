import type { Area } from "./projects";

// Filtros da lista de projetos. A ordem dos projetos é a de projects.ts;
// o filtro só esconde os que não são da área.
// - param: o link filtrado, ex.: vangrog.com/jlhaas/?front
// - title/intro (opcionais): trocam o topo da página; sem eles, fica o texto geral
export type AreaFilter = { id: Area; label: string; param: string; title?: string; intro?: string };

export const general = {
  title: "Creative Developer",
  intro:
    "Desenvolvedor criativo trabalhando com tecnologia desde 2005. Crio experiências interativas para web, realidade aumentada e realidade virtual, com Three.js, 8th Wall, Unity e shaders, para marcas como Netflix, TikTok, Formula E, John Deere e Walmart.",
};

export const areaFilters: AreaFilter[] = [
  {
    id: "xr",
    label: "XR",
    param: "xr",
    title: "XR & Unity Developer",
    intro:
      "Desenvolvo realidade aumentada e virtual desde 2020: filtros para Instagram, TikTok e Snapchat, WebAR com 8th Wall e VR para Meta Quest em Unity, para marcas como TikTok, Netflix, Vivo e John Deere. Também crio jogos no meu estúdio, a VanGrog.",
  },
  { id: "games", label: "Games", param: "games" },
  { id: "web3d", label: "WebGL", param: "webgl" },
  {
    id: "frontend",
    label: "Front-end",
    param: "front",
    title: "Front-end Developer",
    intro:
      "Desenvolvo para a web desde 2005, do Flash ao front-end atual. Tenho aplicações em produção em Vue e Angular, entre elas um app de vendas em uso desde 2021 sem precisar de manutenção, e uso React, TypeScript e Three.js em projetos próprios.",
  },
  { id: "visuals", label: "Visuals", param: "visuals" },
];
