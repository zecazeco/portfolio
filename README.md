# Portfólio — José Luís Haas

**🌐 [vangrog.com/jlhaas](https://vangrog.com/jlhaas/)**

Portfólio de Creative Developer: realidade aumentada, realidade virtual, 3D na web, front-end e jogos.

## O que tem aqui

Um banco único de projetos, com tags por área, numa página só. Botões ao lado do título "Projetos" filtram a lista por área, e o filtro vai junto no link para mandar uma versão focada em cada vaga:

| Link | Mostra |
|---|---|
| [`/jlhaas/`](https://vangrog.com/jlhaas/) | Todos os projetos: Creative Developer |
| [`/jlhaas/?xr`](https://vangrog.com/jlhaas/?xr) | AR e VR, com o topo de XR & Unity Developer |
| [`/jlhaas/?games`](https://vangrog.com/jlhaas/?games) | Jogos |
| [`/jlhaas/?webgl`](https://vangrog.com/jlhaas/?webgl) | 3D no navegador (Three.js, 8th Wall) |
| [`/jlhaas/?front`](https://vangrog.com/jlhaas/?front) | Front-end, com o topo de Front-end Developer |
| [`/jlhaas/?visuals`](https://vangrog.com/jlhaas/?visuals) | Visuais em TouchDesigner |

Os endereços antigos `/jlhaas/xr/` e `/jlhaas/frontend/` redirecionam para `?xr` e `?front`.

Cada projeto vira um estudo de caso curto em `/jlhaas/projetos/<slug>`: contexto, meu papel, desafio técnico, solução, resultado e stack. Projetos sob NDA aparecem só em texto.

## Stack

- [Next.js](https://nextjs.org/) (export estático) + React + TypeScript
- [Three.js](https://threejs.org/): um shader de curvas de nível no fundo do hero, que se curvam em volta do mouse. Roda a até 30 fps, só com o hero na tela. Em telas de toque ou com movimento reduzido, mostra um quadro parado
- Visual: fundo branco, [Roboto Mono](https://fonts.google.com/specimen/Roboto+Mono) e um único destaque laranja (`#ff9d5b`)
- Deploy na [Netlify](https://www.netlify.com/), servido em `vangrog.com/jlhaas` por um proxy do site [vangrog.com](https://vangrog.com)

## Rodar localmente

```bash
npm install
npm run dev     # http://localhost:3000/jlhaas/
npm run build   # gera o site estático em out/
```

Com `?motion` na URL, o shader anima mesmo com o movimento reduzido ligado no sistema.

Os projetos ficam em [`src/data/projects.ts`](src/data/projects.ts), na ordem em que aparecem no site. Os filtros e o texto do topo de cada área ficam em [`src/data/areas.ts`](src/data/areas.ts).

### Imagens e vídeos

Cada projeto lê sozinho a pasta `public/midia/<slug>/`, em que o `<slug>` é o mesmo de `projects.ts`. Não precisa cadastrar os arquivos em lugar nenhum.

```
public/midia/word-fleet/
  cover.webp      → capa do card e do topo da página (16:9, ex.: 1280×720)
  01-jogo.webp    → galeria, na ordem do nome
  02-demo.mp4     → vídeo: toca em loop, sem som
```

- Sem `cover.*`, a primeira imagem da pasta vira a capa. A capa precisa ser imagem.
- A galeria aparece quando a pasta tem mais de um arquivo.
- Formatos: `webp`, `avif`, `jpg`, `png` e `gif` para imagens, `mp4` e `webm` para vídeos.
- Projetos com `nda: true` nunca mostram mídia, mesmo com arquivos na pasta.

## Contato

- LinkedIn: [linkedin.com/in/joseluishaas](https://www.linkedin.com/in/joseluishaas)
- GitHub: [github.com/zecazeco](https://github.com/zecazeco)
- Instagram (AR e live visuals): [@zeco.lab](https://www.instagram.com/zeco.lab)
- Estúdio de jogos: [vangrog.com](https://vangrog.com)
