import fs from 'fs';
import path from 'path';

const ROOT_DIR = process.cwd();
const SRC_DIR = path.join(ROOT_DIR, 'src');
const PUBLIC_DIR = path.join(ROOT_DIR, 'public');
const PREVIEWS_DIR = path.join(PUBLIC_DIR, 'previews');

console.log('=== STARTING QA VERIFICATION SUITE ===\n');

let totalErrors = 0;
let totalWarnings = 0;

// 1. Check package.json dependencies
console.log('--- 1. Checking package.json ---');
const pkgPath = path.join(ROOT_DIR, 'package.json');
const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));

if (pkg.dependencies && pkg.dependencies.playwright) {
  console.error('❌ ERROR: playwright is in dependencies! Move to devDependencies.');
  totalErrors++;
} else if (pkg.devDependencies && pkg.devDependencies.playwright) {
  console.log('✅ PASS: playwright is correctly located in devDependencies.');
} else {
  console.log('ℹ️ NOTE: playwright is not listed in dependencies.');
}

const prodDeps = Object.keys(pkg.dependencies || {});
console.log('Production dependencies:', prodDeps.join(', '));
const heavyLibs = ['puppeteer', 'playwright', 'selenium-webdriver', 'cypress'];
for (const lib of heavyLibs) {
  if (pkg.dependencies && pkg.dependencies[lib]) {
    console.error(`❌ ERROR: Heavy browser automation lib "${lib}" found in production dependencies!`);
    totalErrors++;
  }
}

// 2. Check 24 preview files
console.log('\n--- 2. Checking Preview Files (public/previews/link-1.png .. link-24.png) ---');
if (!fs.existsSync(PREVIEWS_DIR)) {
  console.error('❌ ERROR: public/previews directory does not exist!');
  totalErrors++;
} else {
  let missingPreviews = 0;
  let emptyPreviews = 0;
  for (let i = 1; i <= 24; i++) {
    const filename = `link-${i}.png`;
    const filePath = path.join(PREVIEWS_DIR, filename);
    if (!fs.existsSync(filePath)) {
      console.error(`❌ ERROR: Missing preview file: ${filename}`);
      missingPreviews++;
      totalErrors++;
    } else {
      const stats = fs.statSync(filePath);
      if (stats.size === 0) {
        console.error(`❌ ERROR: Preview file is 0 bytes: ${filename}`);
        emptyPreviews++;
        totalErrors++;
      } else {
        // Size OK
      }
    }
  }
  if (missingPreviews === 0 && emptyPreviews === 0) {
    console.log('✅ PASS: All 24 preview files (link-1.png to link-24.png) exist and have valid file sizes.');
  }
}

// 3. Check src/data/links.ts references
console.log('\n--- 3. Checking src/data/links.ts references ---');
const linksFilePath = path.join(SRC_DIR, 'data', 'links.ts');
const linksContent = fs.readFileSync(linksFilePath, 'utf8');

// Match all link items
const imageMatches = [...linksContent.matchAll(/image:\s*["']([^"']+)["']/g)].map(m => m[1]);
console.log(`Found ${imageMatches.length} link image references in links.ts.`);

if (imageMatches.length !== 24) {
  console.warn(`⚠️ WARNING: Expected 24 image references, found ${imageMatches.length}`);
  totalWarnings++;
}

imageMatches.forEach((imgPath, idx) => {
  const relativeClean = imgPath.startsWith('/') ? imgPath.slice(1) : imgPath;
  const fullPath = path.join(PUBLIC_DIR, relativeClean);
  if (!fs.existsSync(fullPath)) {
    console.error(`❌ ERROR: Image path "${imgPath}" referenced at item ${idx + 1} does not exist on disk!`);
    totalErrors++;
  }
});
if (totalErrors === 0) {
  console.log('✅ PASS: All image paths in links.ts resolve to existing public preview files.');
}

// 4. Strict Zero-Emoji Check across src/
console.log('\n--- 4. Strict Zero-Emoji Check across src/ ---');
// Regex for emoji characters
const emojiRegex = /[\p{Extended_Pictographic}\u{1F300}-\u{1F6FF}\u{1F900}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u;

function checkEmojisInDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      checkEmojisInDir(fullPath);
    } else if (entry.isFile() && /\.(tsx?|jsx?|css|json|md)$/.test(entry.name)) {
      const content = fs.readFileSync(fullPath, 'utf8');
      const lines = content.split('\n');
      lines.forEach((line, lineNum) => {
        const match = line.match(emojiRegex);
        if (match) {
          console.error(`❌ EMOJI DETECTED in ${path.relative(ROOT_DIR, fullPath)}:${lineNum + 1}: found "${match[0]}"`);
          console.error(`   Line content: ${line.trim()}`);
          totalErrors++;
        }
      });
    }
  }
}

checkEmojisInDir(SRC_DIR);
if (totalErrors === 0) {
  console.log('✅ PASS: ZERO emoji characters found across all files in src/.');
}

// 5. Code inspection in src/
console.log('\n--- 5. Checking Component Best Practices in src/ ---');
function checkSourceBestPractices(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      checkSourceBestPractices(fullPath);
    } else if (entry.isFile() && /\.(tsx|jsx)$/.test(entry.name)) {
      const content = fs.readFileSync(fullPath, 'utf8');
      // Check target="_blank" without rel="noopener noreferrer"
      const targetBlankMatches = content.match(/target=["']_blank["']/g) || [];
      const relMatches = content.match(/rel=["'][^"']*noopener[^"']*["']/g) || [];
      if (targetBlankMatches.length > relMatches.length) {
        console.warn(`⚠️ WARNING: Possible target="_blank" without rel="noopener noreferrer" in ${path.relative(ROOT_DIR, fullPath)}`);
        totalWarnings++;
      }
    }
  }
}
checkSourceBestPractices(SRC_DIR);

console.log('\n=======================================');
console.log(`QA VERIFICATION SUMMARY: ${totalErrors} Errors, ${totalWarnings} Warnings`);
console.log('=======================================');

if (totalErrors > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
