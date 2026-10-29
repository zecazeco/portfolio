import type { Area } from "./projects";

export const profile = {
  name: "José Luís Haas",
  links: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/joseluishaas" },
    { label: "GitHub", href: "https://github.com/zecazeco" },
    { label: "Instagram @zeco.lab", href: "https://www.instagram.com/zeco.lab" },
    { label: "VanGrog", href: "https://vangrog.com" },
  ],
  awards: [
    "Vencedor do Meta XR Hackathon 2021 — melhor filtro de AR da América Latina",
    "2º lugar geral no Meta Storytelling with AR Hackathon 2023",
    "Láurea Acadêmica — FTEC 2012",
  ],
  // Trabalhos pela Govak Reality (2023–2026), muitos sob NDA: aparecem só como nomes.
  // Cada vitrine mostra os grupos das áreas dela.
  clients: [
    {
      label: "Filtros de AR (Instagram, TikTok, Snapchat)",
      areas: ["xr"],
      names: [
        "TikTok UK",
        "Netflix UK",
        "Pinterest UK",
        "LV= Insurance",
        "King's Cross",
        "Financial Conduct Authority",
        "Brooks Running",
        "Sicredi",
      ],
    },
    {
      label: "WebAR e 3D na web",
      areas: ["xr", "web3d"],
      names: ["Formula E", "Walmart", "Petition for Rehab"],
    },
    {
      label: "VR para Meta Quest",
      areas: ["xr"],
      names: ["Vivo", "John Deere", "Ancap (Uruguai)"],
    },
  ] satisfies { label: string; areas: Area[]; names: string[] }[],
};
