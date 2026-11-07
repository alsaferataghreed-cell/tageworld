import fs from 'fs';
import path from 'path';

const content = fs.readFileSync('src/data/links.ts', 'utf8');
const matchData = content.match(/export const LINKS_DATA: LinkItem\[\] = (\[[\s\S]*?\]);/);
const items = JSON.parse(matchData[1]);
const previewsDir = path.join(process.cwd(), 'public', 'previews');

console.log(`Found ${items.length} items in LINKS_DATA.`);

const issues = [];

items.forEach(item => {
  const filename = `link-${item.id}.png`;
  const p = path.join(previewsDir, filename);
  if (!fs.existsSync(p)) {
    issues.push({ id: item.id, issue: 'FILE_MISSING', title: item.title, url: item.url });
    return;
  }
  const size = fs.statSync(p).size;
  if (size < 15000) {
    issues.push({ id: item.id, issue: `SUSPICIOUSLY_SMALL_${(size/1024).toFixed(1)}KB`, title: item.title, url: item.url });
  }
});

console.log(`Found ${issues.length} suspicious or missing images:`);
issues.forEach(i => console.log(`[Link ${i.id}] ${i.issue} - ${i.title} (${i.url})`));
