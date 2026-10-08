// Generuje public/og-image.png (podgląd linku na Facebooku, Messengerze, LinkedInie).
// Uruchom: node scripts/og-image.mjs
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#2a3036"/>
  <rect y="618" width="1200" height="12" fill="#7fcfc6"/>
  <rect x="80" y="80" width="64" height="64" rx="6" fill="#7fcfc6"/>
  <text x="112" y="122" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-weight="700" font-size="26" fill="#10302d">TR</text>
  <text x="168" y="122" font-family="Consolas, monospace" font-size="26" fill="#a9b0b7">Tomasz Rymarczyk · web developer</text>
  <text x="80" y="268" font-family="Segoe UI, Arial, sans-serif" font-weight="700" font-size="76" fill="#eef0f1">Strony internetowe</text>
  <text x="80" y="356" font-family="Segoe UI, Arial, sans-serif" font-weight="700" font-size="76" fill="#eef0f1">i sklepy dla małych firm</text>
  <text x="80" y="440" font-family="Segoe UI, Arial, sans-serif" font-size="32" fill="#d3d8dc">Elbląg · zdalnie w całej Polsce</text>
  <rect x="80" y="490" width="330" height="64" rx="4" fill="#7fcfc6"/>
  <text x="245" y="532" text-anchor="middle" font-family="Consolas, monospace" font-weight="700" font-size="28" fill="#10302d">tel. 731 050 097</text>
</svg>`;

await sharp(Buffer.from(svg)).png().toFile(fileURLToPath(new URL("../public/og-image.png", import.meta.url)));
console.log("public/og-image.png gotowe");
