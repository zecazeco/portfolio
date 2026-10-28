// Banco único de projetos. Cada projeto é cadastrado uma vez e aparece
// nas vitrines (src/data/vitrines.ts) conforme as áreas dele.

export type Area = "xr" | "web3d" | "frontend" | "games" | "visuals";

export type CaseStudy = {
  contexto?: string;
  papel?: string;
  desafio?: string;
  solucao?: string;
  resultado?: string;
};

export type Project = {
  slug: string;
  title: string;
  /** Uma frase para o card */
  summary: string;
  year: string;
  areas: Area[];
  stack: string[];
  clients?: string[];
  /** Destaque curto (prêmio, status) mostrado no card */
  badge?: string;
  /** Sob NDA: aparece só em texto, sem imagens nem vídeos */
  nda?: boolean;
  /** Caminho em /public, ex.: "/img/word-fleet.webp" */
  cover?: string;
  links?: { label: string; href: string }[];
  caseStudy?: CaseStudy;
  /** Rascunho: fica fora das vitrines até ter conteúdo */
  draft?: boolean;
};

export const projects: Project[] = [
  {
    slug: "meta-xr-hackathon-2021",
    title: "Filtro vencedor do Meta XR Hackathon",
    summary: "Melhor filtro de realidade aumentada da América Latina no Meta XR Hackathon 2021.",
    year: "2021",
    areas: ["xr"],
    stack: ["Meta Spark AR"],
    badge: "Vencedor · América Latina",
    // TODO: nome do filtro, vídeo e estudo de caso
  },
  {
    slug: "meta-storytelling-ar-2023",
    title: "Meta Storytelling with AR Hackathon",
    summary: "2º lugar geral no hackathon de narrativas em realidade aumentada da Meta.",
    year: "2023",
    areas: ["xr"],
    stack: ["Realidade aumentada"], // TODO: confirmar ferramenta
    badge: "2º lugar geral",
  },
  {
    slug: "filtros-ar-marcas",
    title: "Filtros de AR para marcas",
    summary: "Filtros para Instagram, TikTok e Snapchat, com shaders customizados, desenvolvidos pela Govak Reality.",
    year: "2023–2026",
    areas: ["xr"],
    stack: ["Effect House", "Lens Studio", "Meta Spark AR", "Shaders", "JavaScript"],
    clients: [
      "TikTok UK",
      "Netflix UK",
      "Pinterest UK",
      "LV= Insurance",
      "King's Cross",
      "Financial Conduct Authority",
      "Brooks Running",
      "Sicredi",
    ],
    nda: true, // alguns projetos têm NDA; os liberados podem ganhar página própria
  },
  {
    slug: "webar-3d",
    title: "WebAR e 3D na web",
    summary: "Experiências de realidade aumentada e 3D no navegador, desenvolvidas pela Govak Reality.",
    year: "2023–2026",
    areas: ["web3d", "xr", "frontend"],
    stack: ["Three.js", "8th Wall", "JavaScript"],
    clients: ["Formula E", "Walmart", "Petition for Rehab"],
    nda: true,
  },
  {
    slug: "vr-meta-quest",
    title: "Aplicações de VR para Meta Quest",
    summary: "Experiências de realidade virtual em Unity, desenvolvidas pela Govak Reality.",
    year: "2023–2026",
    areas: ["xr"],
    stack: ["Unity", "C#", "Meta Quest"],
    clients: ["Vivo", "John Deere", "Ancap (Uruguai)"],
    nda: true,
  },
  {
    slug: "word-fleet",
    title: "Word Fleet",
    summary: "Batalha naval encontra Wordle: multiplayer em tempo real no navegador, sem cadastro — é só mandar o link.",
    year: "2026",
    areas: ["games", "frontend"],
    stack: ["Vue"], // TODO: completar (backend do multiplayer)
    badge: "Beta",
    links: [
      { label: "Jogar", href: "https://wordfleet.vangrog.com/" },
      { label: "Página do jogo", href: "https://vangrog.com/games/word-fleet/" },
    ],
  },
  {
    slug: "guided-by-nothing",
    title: "Guided by Nothing",
    summary: "Jogo de exploração para PC: sem mapa, sem guia, ninguém dizendo para onde ir.",
    year: "2026",
    areas: ["games", "xr"],
    stack: ["Unity", "C#"],
    badge: "Em desenvolvimento",
    links: [{ label: "Página do jogo", href: "https://vangrog.com/games/guided-by-nothing/" }],
  },
  {
    slug: "jovem-guerreiro",
    title: "Aventura Solo — Jovem Guerreiro",
    summary: "Aventura em texto escrita aos 14 anos, virou jogo web com motor open source para criar novas aventuras.",
    year: "2021",
    areas: ["games", "frontend"],
    stack: ["JavaScript", "HTML/CSS"],
    badge: "Open source",
    links: [
      { label: "Página do jogo", href: "https://vangrog.com/games/jovem-guerreiro/" },
      { label: "GitHub", href: "https://github.com/zecazeco/aventura-solo-jovem-guerreiro" },
    ],
  },
  {
    slug: "app-controle-de-vendas",
    title: "App de controle de vendas",
    summary: "App Android para o caixa de uma padaria, em uso diário desde 2021 sem precisar de manutenção.",
    year: "2021",
    areas: ["frontend"],
    stack: ["Angular", "Ionic", "Firebase"],
  },
  {
    slug: "spark-ar-open-source",
    title: "Scripts open source de Spark AR",
    summary: "Scripts e patches reutilizáveis para criadores de filtros no Meta Spark AR.",
    year: "2020–2022",
    areas: ["xr"],
    stack: ["Meta Spark AR", "JavaScript"],
    badge: "Open source",
    links: [{ label: "GitHub", href: "https://github.com/zecazeco" }],
  },
  {
    slug: "portfolio",
    title: "Este portfólio",
    summary: "Site estático em Next.js com um banco único de projetos e uma vitrine para cada área.",
    year: "2026",
    areas: ["frontend"],
    stack: ["Next.js", "React", "TypeScript"],
    links: [{ label: "GitHub", href: "https://github.com/zecazeco/portfolio" }],
  },
  {
    slug: "lista-campeonatos",
    title: "Lista de campeonatos",
    summary: "Aplicação em React e TypeScript com testes.",
    year: "",
    areas: ["frontend"],
    stack: ["React", "TypeScript", "Jest", "Testing Library"],
    draft: true, // TODO: consertar a demo (backend no Heroku fora do ar)
  },
  {
    slug: "touchdesigner",
    title: "Live visuals em TouchDesigner",
    summary: "Visuais interativos e audiorreativos.",
    year: "",
    areas: ["visuals"],
    stack: ["TouchDesigner"],
    draft: true, // TODO: vídeos
  },
];

export const publishedProjects = projects.filter((p) => !p.draft);

export function getProject(slug: string) {
  return publishedProjects.find((p) => p.slug === slug);
}
