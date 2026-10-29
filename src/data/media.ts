// Mídia dos projetos, lida da pasta public/midia/<slug>/ na hora do build.
// Basta colocar os arquivos na pasta: não precisa cadastrar nada em projects.ts.
// - cover.* (imagem) vira a capa; sem ela, a primeira imagem da pasta
// - o resto vira a galeria da página do projeto, em ordem de nome (01-, 02-, …)
import fs from "node:fs";
import path from "node:path";

export type Media = { src: string; type: "image" | "video" };

const IMAGE = /\.(webp|avif|jpe?g|png|gif)$/i;
const VIDEO = /\.(mp4|webm)$/i;

export function projectMedia(slug: string): { cover?: string; gallery: Media[] } {
  const dir = path.join(process.cwd(), "public", "midia", slug);
  if (!fs.existsSync(dir)) return { gallery: [] };

  const files = fs
    .readdirSync(dir)
    .filter((f) => IMAGE.test(f) || VIDEO.test(f))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

  const coverFile = files.find((f) => /^cover\./i.test(f) && IMAGE.test(f)) ?? files.find((f) => IMAGE.test(f));
  const gallery = files
    .filter((f) => f !== coverFile)
    .map((f): Media => ({ src: `/midia/${slug}/${f}`, type: VIDEO.test(f) ? "video" : "image" }));

  return { cover: coverFile && `/midia/${slug}/${coverFile}`, gallery };
}
