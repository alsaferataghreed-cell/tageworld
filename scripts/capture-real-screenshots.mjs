import { chromium } from "playwright";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");
const previewsDir = path.join(projectRoot, "public", "previews");

// Real target URLs for links 26 to 75
const targetLinks = [
  { id: 26, url: "https://eworld.dxn2u.com/" },
  { id: 27, url: "https://www.dxn2u.com/about/" },
  { id: 28, url: "https://www.dxn2u.com/about/index.php" },
  { id: 29, url: "https://eworld.dxn2u.com/help/terms/" },
  { id: 30, url: "https://eworld.dxn2u.com/help/faq/" },
  { id: 31, url: "https://www.dxn2u.com/contact/?lang=ar" },
  { id: 32, url: "https://www.facebook.com/share/1EhAFjxi43/" },
  { id: 33, url: "https://www.instagram.com/dxnglobal_?exln=MXZ0bng2Y3VxcjdvYg==" },
  { id: 34, url: "https://www.dxnturkey.com/" },
  { id: 35, url: "https://www.dxn2u.com/" },
  { id: 36, url: "https://www.dxn2uafrica.com/" },
  { id: 37, url: "https://www.dxn2uasia.com/" },
  { id: 38, url: "https://www.dxn2u.eu/" },
  { id: 39, url: "https://www.dxn2ulatam.com/" },
  { id: 40, url: "https://www.dxnarabia.com/" },
  { id: 41, url: "https://www.dxnaus.com.au/" },
  { id: 42, url: "https://www.dxnusa.com/" },
  
  // Products Store
  { id: 43, url: "https://eworld.dxn2u.com/products/?cat_id=FB&availability=in_stock" },
  // 44 - 61 share product store, we can capture 43 live and copy to 44-61 or customize
  
  // Business & Info
  { id: 62, url: "https://www.dxn2u.com/business/" },
  { id: 63, url: "https://www.dxn2u.com/founder/index.php" },
  { id: 64, url: "https://www.dxn2u.com/award/index.php" },
  { id: 65, url: "https://www.dxn2u.com/gallery/index.php" },
  { id: 66, url: "https://www.dxn2u.com/success/index.php" },
  { id: 67, url: "https://www.dxn2u.com/news/index.php" },
  { id: 68, url: "https://www.dxn2u.com/dxnlife/index.php" },
  { id: 69, url: "https://www.dxn2u.com/investor-relations/index.php" },
  { id: 70, url: "https://www.dxn2u.com/tender/index.php" },

  // Catalog
  { id: 71, url: "https://www.dxn2u.com/product/newprd.php" },
  { id: 72, url: "https://www.dxn2u.com/product/products.php?cat_id=HDS" },
  { id: 73, url: "https://www.dxn2u.com/product/products.php?cat_id=FFB" },
  { id: 74, url: "https://www.dxn2u.com/product/products.php?cat_id=PCC" },
  { id: 75, url: "https://www.dxn2u.com/product/products.php?cat_id=OTH" }
];

async function captureAllLive() {
  console.log("Starting Live Real Screenshot capture via Edge...");
  const browser = await chromium.launch({
    executablePath: "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage"]
  });

  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 },
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 Edg/120.0.0.0",
    deviceScaleFactor: 1.5,
    locale: "ar-SA"
  });

  const page = await context.newPage();

  for (const item of targetLinks) {
    const outPath = path.join(previewsDir, `link-${item.id}.png`);
    console.log(`[Link ${item.id}] Navigating to: ${item.url}`);

    try {
      await page.goto(item.url, { waitUntil: "domcontentloaded", timeout: 18000 });
      // Small pause for lazy images and CSS to render
      await page.waitForTimeout(2000);

      // Clean popups or cookie bars if any
      await page.evaluate(() => {
        const removeSelectors = [
          ".cookie-consent",
          "#cookie-banner",
          ".modal.show",
          ".modal-backdrop",
          ".swal2-container",
          "#countrySwitchModal"
        ];
        removeSelectors.forEach(sel => {
          document.querySelectorAll(sel).forEach(el => el.remove());
        });
      }).catch(() => {});

      await page.screenshot({ path: outPath, type: "png" });
      console.log(`✓ [Link ${item.id}] Successfully captured real screenshot: link-${item.id}.png`);
    } catch (err) {
      console.warn(`! [Link ${item.id}] Navigation warning: ${err.message}. Retrying or keeping current.`);
    }
  }

  // Duplicate the live products store screenshot (43) to 44 - 61 if 43 was captured
  const storeImg = path.join(previewsDir, "link-43.png");
  if (fs.existsSync(storeImg)) {
    for (let id = 44; id <= 61; id++) {
      const dest = path.join(previewsDir, `link-${id}.png`);
      fs.copyFileSync(storeImg, dest);
      console.log(`Copied live store preview to link-${id}.png`);
    }
  }

  await browser.close();
  console.log("All real screenshots updated!");
}

captureAllLive().catch(err => {
  console.error("Fatal capture error:", err);
  process.exit(1);
});
