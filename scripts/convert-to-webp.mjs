import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");
const previewsDir = path.join(projectRoot, "public", "previews");
const linksTsPath = path.join(projectRoot, "src", "data", "links.ts");

async function convertAll() {
  const files = fs.readdirSync(previewsDir).filter(f => f.endsWith(".png"));
  console.log(`Found ${files.length} PNG preview files to convert.`);

  let originalTotalBytes = 0;
  let webpTotalBytes = 0;

  for (const file of files) {
    const pngPath = path.join(previewsDir, file);
    const baseName = path.basename(file, ".png");
    const webpPath = path.join(previewsDir, `${baseName}.webp`);

    const pngStat = fs.statSync(pngPath);
    originalTotalBytes += pngStat.size;

    // Convert with sharp
    await sharp(pngPath)
      .webp({ quality: 82, effort: 5 })
      .toFile(webpPath);

    const webpStat = fs.statSync(webpPath);
    webpTotalBytes += webpStat.size;

    // Delete original PNG
    fs.unlinkSync(pngPath);
    console.log(`Converted: ${file} (${(pngStat.size / 1024).toFixed(1)} KB) -> ${baseName}.webp (${(webpStat.size / 1024).toFixed(1)} KB)`);
  }

  // Update src/data/links.ts
  let linksContent = fs.readFileSync(linksTsPath, "utf-8");
  linksContent = linksContent.replaceAll(".png", ".webp");
  fs.writeFileSync(linksTsPath, linksContent, "utf-8");
  console.log(`Updated all image references in src/data/links.ts to .webp!`);

  const origMB = (originalTotalBytes / (1024 * 1024)).toFixed(2);
  const webpMB = (webpTotalBytes / (1024 * 1024)).toFixed(2);
  const savedMB = ((originalTotalBytes - webpTotalBytes) / (1024 * 1024)).toFixed(2);
  const savedPercent = (((originalTotalBytes - webpTotalBytes) / originalTotalBytes) * 100).toFixed(1);

  console.log("=== RESULTS ===");
  console.log(`Original Total Size (PNG): ${origMB} MB (${originalTotalBytes} bytes)`);
  console.log(`New Total Size (WebP): ${webpMB} MB (${webpTotalBytes} bytes)`);
  console.log(`Saved: ${savedMB} MB (${savedPercent}% reduction!)`);
}

convertAll().catch(err => {
  console.error("Conversion error:", err);
  process.exit(1);
});
