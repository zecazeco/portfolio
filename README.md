# Portfólio — José Luís Haas

**🌐 [vangrog.com/jlhaas](https://vangrog.com/jlhaas/)**

Portfólio de Creative Developer: realidade aumentada, realidade virtual, 3D na web, front-end e jogos.

> 🚧 Em construção.

## O que tem aqui

Um banco único de projetos, com tags por área, e uma página para cada área:

| Página | Foco |
|---|---|
| [`/jlhaas/`](https://vangrog.com/jlhaas/) | Visão geral: Creative Developer |
| `/jlhaas/xr` | AR, VR, Unity e shaders |
| `/jlhaas/frontend` | React, Vue, TypeScript e aplicações web |
| `/jlhaas/visuals` | Live visuals em TouchDesigner (em breve) |

Cada projeto vira um estudo de caso curto: contexto, meu papel, desafio técnico, solução, resultado e stack. Projetos sob NDA aparecem só em texto.

## Stack

- [Next.js](https://nextjs.org/) (export estático) + React + TypeScript
- [Three.js](https://threejs.org/) na abertura da página
- Deploy na [Netlify](https://www.netlify.com/), servido em `vangrog.com/jlhaas` por um proxy do site [vangrog.com](https://vangrog.com)

## Rodar localmente

```bash
npm install
npm run dev     # http://localhost:3000/jlhaas/
npm run build   # gera o site estático em out/
```

Os projetos ficam em [`src/data/projects.ts`](src/data/projects.ts), e as vitrines em [`src/data/vitrines.ts`](src/data/vitrines.ts).

## Contato

- LinkedIn: [linkedin.com/in/joseluishaas](https://www.linkedin.com/in/joseluishaas)
- GitHub: [github.com/zecazeco](https://github.com/zecazeco)
- Instagram (AR e live visuals): [@zeco.lab](https://www.instagram.com/zeco.lab)
- Estúdio de jogos: [vangrog.com](https://vangrog.com)
