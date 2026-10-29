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
    caseStudy: {
      ideia:
        "Aventura solo em texto escrita em 1999, quando eu tinha 14 anos, e publicada sem edições. Por trás do jogo há um sistema simples e de código aberto, feito só com HTML, CSS e JavaScript. Basta copiar o projeto e escrever suas cenas e escolhas em um único arquivo.",
    },    
    links: [
      { label: "Página do jogo", href: "https://vangrog.com/games/jovem-guerreiro/" },
      { label: "GitHub", href: "https://github.com/zecazeco/aventura-solo-jovem-guerreiro" },
      { label: "Jogar", href: "https://zecazeco.github.io/aventura-solo-jovem-guerreiro/" },
    ],
  },
  {
    slug: "app-controle-de-vendas",
    title: "App de controle de vendas",
    summary: "App Android de controle de caixa para uma padaria, em uso diário desde 2021 sem precisar de manutenção.",
    year: "2021",
    areas: ["frontend"],
    stack: ["Angular", "Ionic", "Firebase"],
    nda: true,
    caseStudy: {
      contexto:
        "Uma padaria precisava de um registro simples do caixa: quanto entrava a cada dia e quanto saía em pagamentos a fornecedores.",
      solucao:
        "Um app Android, feito em Angular e Ionic, em que os operadores lançam as entradas do caixa e as compras de produtos. Os lançamentos ficam salvos no Firebase, e o dono passa a ter um histórico de todo o movimento.",
      resultado: "Em uso diário desde 2021, sem precisar de manutenção.",
    },
  },
  {
    slug: "portfolio",
    title: "Este portfólio",
    summary: "Site estático em Next.js com um banco único de projetos, uma vitrine para cada área e um shader de curvas de nível no topo.",
    year: "2026",
    areas: ["frontend"],
    stack: ["Next.js", "React", "TypeScript", "Three.js"],
    caseStudy: {
      ideia:
        "Um portfólio que se adapta à vaga. Cada projeto é cadastrado uma vez, com as áreas a que pertence, e aparece nas vitrines certas: geral, XR & Games e Front-end. Assim cada vaga recebe um link focado no que importa para ela. Desenvolvido com apoio de IA, com a arquitetura e as decisões de design definidas por mim.",
      comoFunciona:
        "O site é gerado como HTML estático em Next.js e TypeScript e publicado na Netlify, em vangrog.com/jlhaas. No topo, um shader em Three.js desenha curvas de nível que se curvam em volta do mouse. Ele roda a no máximo 30 fps, só enquanto está visível na tela, e mostra um quadro parado em celulares ou para quem prefere menos movimento. As imagens e vídeos de cada projeto são lidos sozinhos da pasta dele, e cada projeto tem a própria prévia ao ser compartilhado. Projetos sob NDA aparecem só em texto, com uma capa padrão.",
    },
    links: [{ label: "GitHub", href: "https://github.com/zecazeco/portfolio" }],
  },
  {
    slug: "lista-campeonatos",
    title: "Lista de campeonatos",
    summary: "Aplicação em React e TypeScript que lista campeonatos, times e confrontos, com testes por componente.",
    year: "2021",
    areas: ["frontend"],
    stack: ["React", "TypeScript", "React Router", "Jest", "Testing Library"],
    caseStudy: {
      ideia:
        "Começou em 2021 como um estudo de React e TypeScript: uma aplicação que lista campeonatos, os times de cada um e os confrontos entre eles. Em 2026 voltei ao projeto: a API original tinha saído do ar, então troquei por um backend simulado, refiz o layout com CSS próprio no lugar do Material UI e coloquei a demo de volta no ar.",
      comoFunciona:
        "São três telas com React Router: campeonatos, confrontos e times de cada campeonato. Os dados passam por um hook genérico, o useApi, que cuida dos estados de carregando, erro e lista vazia. O backend simulado responde às mesmas rotas da API antiga, com um pequeno atraso, e as telas funcionam como se falassem com um servidor de verdade. Cada componente tem testes com Jest e Testing Library, e a demo é publicada no GitHub Pages.",
    },
    links: [
      { label: "Ver demo", href: "https://zecazeco.github.io/lista-campeonatos/" },
      { label: "GitHub", href: "https://github.com/zecazeco/lista-campeonatos" },
    ],
  },
  {
    slug: "troca-criptos",
    title: "Troca Criptos",
    summary: "Compara criptomoedas com o bitcoin e o ethereum ao longo do tempo para mostrar o melhor momento de troca.",
    year: "2022",
    areas: ["frontend"],
    stack: ["React", "TypeScript", "Vite", "Recharts", "Vitest"],
    caseStudy: {
      ideia:
        "Eu tinha algumas criptomoedas menores e queria saber quando valia mais a pena trocá-las por bitcoin ou ethereum. Para isso, o que importa não é o preço em dólar, e sim quanto cada moeda vale em BTC ou ETH comparado com o próprio histórico. A primeira versão foi um app em React Native com Firebase, em 2022; em 2026 refiz o projeto como aplicação web em React e Vite.",
      comoFunciona:
        "Para cada moeda, o app mostra quanto ela vale hoje em BTC e em ETH e em quantos % dos dias do período ela valia menos do que hoje. Quando esse percentil passa do limite escolhido, aparece o sinal de bom momento para trocar. Os dados vêm das APIs públicas da Binance e da CoinGecko, com cache no navegador, e a lista de moedas fica salva só no navegador, sem servidor nem login. Os cálculos têm testes com Vitest. O sinal é só uma comparação com o histórico, não uma recomendação de investimento.",
    },
    links: [
      { label: "Ver demo", href: "https://zecazeco.github.io/troca-criptos/" },
      { label: "GitHub", href: "https://github.com/zecazeco/troca-criptos" },
    ],
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
