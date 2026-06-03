import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.resolve(__dirname, "..", "public");

const targets = [
  { source: "icon.svg", output: "icon-192.png", size: 192 },
  { source: "icon.svg", output: "icon-512.png", size: 512 },
  { source: "icon-maskable.svg", output: "icon-maskable-512.png", size: 512 },
];

await mkdir(publicDir, { recursive: true });

for (const { source, output, size } of targets) {
  const svgPath = path.join(publicDir, source);
  const svg = await readFile(svgPath);
  const png = await sharp(svg, { density: 384 })
    .resize(size, size, { fit: "cover" })
    .png({ compressionLevel: 9 })
    .toBuffer();
  await writeFile(path.join(publicDir, output), png);
  console.log(`wrote ${output} (${size}x${size}, ${png.length} bytes)`);
}
