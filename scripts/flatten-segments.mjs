// Next 16 static export writes segment prefetch files as nested folders
// (xr/__next.$d$vitrine/__PAGE__.txt), but the client requests them flat
// (xr/__next.$d$vitrine.__PAGE__.txt). Copy each nested file to its flat name.
import { copyFileSync, readdirSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";

const out = "out";

function walk(dir) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (!statSync(path).isDirectory()) continue;
    if (name.startsWith("__next.")) flatten(dir, path);
    else if (name !== "_next") walk(path);
  }
}

function flatten(parent, segDir) {
  for (const name of readdirSync(segDir)) {
    const path = join(segDir, name);
    if (statSync(path).isDirectory()) flatten(parent, path);
    else copyFileSync(path, join(parent, relative(parent, path).split(sep).join(".")));
  }
}

walk(out);
