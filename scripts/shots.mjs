// Mniejsze wersje zrzutów do srcset (src/assets/projects/<nazwa>-<szerokość>.webp).
// Uruchom po dodaniu lub podmianie zrzutu: node scripts/shots.mjs
import { readdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const dir = fileURLToPath(new URL("../src/assets/projects/", import.meta.url));
// Realizacje: 960×600, w hero: 1120×980 (na komputerze wyświetlany w ok. 516 px).
const widths = { default: [480, 720], "streetshow-hero": [560] };

for (const file of await readdir(dir)) {
    const name = file.match(/^([a-z-]+)\.webp$/)?.[1];
    if (!name) continue;
    for (const w of widths[name] ?? widths.default) {
        await sharp(dir + file).resize(w).webp({ quality: 80 }).toFile(`${dir}${name}-${w}.webp`);
        console.log(`${name}-${w}.webp`);
    }
}
