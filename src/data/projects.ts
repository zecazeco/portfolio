// Banco único de projetos. Cada projeto é cadastrado uma vez e aparece
// nas vitrines (src/data/vitrines.ts) conforme as áreas dele.
// Capa e galeria vêm da pasta public/midia/<slug>/ (ver media.ts).

export type Area = "xr" | "web3d" | "frontend" | "games" | "visuals";

export type CaseStudy = {
  /** Para projetos próprios, que nascem de uma ideia e não de um problema */
  ideia?: string;
  contexto?: string;
  papel?: string;
  desafio?: string;
  solucao?: string;
  comoFunciona?: string;
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
  links?: { label: string; href: string }[];
  caseStudy?: CaseStudy;
  /** Rascunho: fica fora das vitrines até ter conteúdo */
  draft?: boolean;
};

export const projects: Project[] = [
  {
    slug: "meta-xr-hackathon-2021",
    title: "BoDyGame",
    summary: "Jogo de dança em realidade aumentada, controlado pelo corpo. Vencedor do Meta XR Hackathon 2021.",
    year: "2021",
    areas: ["xr"],
    stack: ["Meta Spark AR"],
    badge: "Vencedor · América Latina",
    caseStudy: {
      contexto:
        "O Meta XR Hackathon desafiou criadores do mundo todo a usar a ferramenta de realidade aumentada da Meta para criar experiências imersivas e efeitos interativos. O BoDyGame concorreu na trilha de Hand & Body Tracking, voltada a experiências controladas só pelos movimentos do corpo ou pelos gestos das mãos.",
      solucao:
        "Um jogo de dança em que cada passo é uma pose definida por pontos na tela. Para pontuar, o jogador se move até que os pontos do corpo rastreados pela câmera coincidam com os da pose.",
      resultado: "Vencedor do hackathon, eleito o melhor filtro de realidade aumentada da América Latina.",
    },
    links: [
      { label: "Instagram", href: "https://www.instagram.com/zeco.lab/" },
    ], 
  },
  {
    slug: "meta-storytelling-ar-2023",
    title: "Reality Explorer",
    summary: "Efeito de AR narrativo em que um robô mostra a pessoa em realidades paralelas. 2º lugar geral no Meta Storytelling with AR Hackathon 2023.",
    year: "2023",
    areas: ["xr"],
    stack: ["Meta Spark AR"],
    badge: "2º lugar geral",
    caseStudy: {
      contexto:
        "Desafio de efeitos de AR narrativos, realizado em 2023 pela Lenslist com a Meta Spark: contar uma história completa no Meta Spark, com objetos 3D interativos e pelo menos três cenas.",
      papel:
        "Efeito criado em parceria com @sarahramos.ar, responsável pelo 3D e pela narração. Fiquei com a programação, a lógica, os shaders e a arquitetura do efeito.",
      solucao:
        "Um robô que mostra à pessoa como seriam as realidades paralelas dela: uma TV exibe mundos diferentes, todos com o rosto de quem está usando o efeito.",
      resultado: "2º lugar geral no hackathon.",
    },
    links: [
      { label: "Instagram", href: "https://www.instagram.com/zeco.lab/" },
    ],    
  },
  {
    slug: "word-fleet",
    title: "Word Fleet",
    summary: "Batalha naval encontra Wordle: game multiplayer em tempo real no navegador, sem cadastro — é só mandar o link.",
    year: "2026",
    areas: ["games", "frontend"],
    stack: ["Vue", "Firebase"], 
    badge: "Beta",
    caseStudy: {
      ideia:
        "Planejei e comecei o Word Fleet há dois anos, para testar a sincronização em tempo real do Firestore do Firebase. Agora, com a ajuda de IA, terminei o jogo e lancei pela VanGrog, o meu estúdio independente.",
      comoFunciona:
        "Cada jogador esconde três palavras secretas, de 3, 4 e 5 letras, num tabuleiro de 10×10. Na sua vez, escolhe uma casa e uma letra, e a cor da resposta (verde, amarelo, roxo ou cinza) serve de pista. Vence quem encontrar primeiro as 12 letras do adversário. Não há servidor nem funções na nuvem: os dois navegadores sincronizam a partida direto pelo Firestore, e para convidar alguém basta mandar o link, sem criar conta.",
    },
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
    caseStudy: {
      ideia:
        "Um jogo sobre caminhar e lembrar. O jogador é um viajante solitário que atravessa um mundo silencioso, guiado só pelo rumo e pelas próprias sensações, sem mapa e sem destino final.",
    },
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
    nda: true,
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
