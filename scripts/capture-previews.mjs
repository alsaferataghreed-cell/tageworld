import { chromium } from "playwright";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");
const previewsDir = path.join(projectRoot, "public", "previews");

if (!fs.existsSync(previewsDir)) {
  fs.mkdirSync(previewsDir, { recursive: true });
}

// 24 Links Data
const links = [
  { id: 1, title: "قهوة DXN الصحية", domain: "dxn2u.com", url: "https://www.dxn2u.com/topproduct/index-coffee.php" },
  { id: 2, title: "منتجات GL . RG فطر الريشي", domain: "dxn2u.com", url: "https://www.dxn2u.com/topproduct/index_rg_gl.php" },
  { id: 3, title: "سبيرولينا الغذاء السوبر", domain: "dxn2u.com", url: "https://www.dxn2u.com/topproduct/index-spirulina.php" },
  { id: 4, title: "كاكاو كوكوزي الطبيعي", domain: "dxn2u.com", url: "https://www.dxn2u.com/topproduct/index-cocozhi.php" },
  { id: 5, title: "مجموعة جيمبوري الفاخرة", domain: "dxn2u.com", url: "https://www.dxn2u.com/topproduct/index-gempuri.php" },
  { id: 6, title: "منتجات الهضم وإزالة السموم", domain: "dxn2u.com", url: "https://www.dxn2u.com/elevate/index-digestive.php" },
  { id: 7, title: "منتجات العناية بالبشرة والجسم", domain: "dxn2u.com", url: "https://www.dxn2u.com/elevate/index-skincare.php" },
  { id: 8, title: "المناعة والطاقة الحيوية", domain: "dxn2u.com", url: "https://www.dxn2u.com/elevate/index-immune.php" },
  { id: 9, title: "التغذية اليومية المتوازنة", domain: "dxn2u.com", url: "https://www.dxn2u.com/elevate/index-nutrition.php" },
  { id: 10, title: "منزل سعيد وصحي", domain: "dxn2u.com", url: "https://www.dxn2u.com/elevate/index-home.php" },
  { id: 11, title: "مطبخ صحي عالي الجودة", domain: "dxn2u.com", url: "https://www.dxn2u.com/elevate/index-kitchen.php" },
  { id: 12, title: "مراكز الخدمة والوكالات الرسمية", domain: "dxn2u.com", url: "https://www.dxn2u.com/contact/index.php" },
  { id: 13, title: "أصبح موزعا ضم عضو جديد", domain: "eworld.dxn2u.com", url: "https://eworld.dxn2u.com/auth/register/distributor/" },
  { id: 14, title: "تفعيل الحساب لأول مرة eWorld", domain: "eworld.dxn2u.com", url: "https://eworld.dxn2u.com/auth/first-login/" },
  { id: 15, title: "رعاية موزع جديد برقم العضوية", domain: "eworld.dxn2u.com", url: "https://eworld.dxn2u.com/auth/register/distributor/?sponsor_code=123456789" },
  { id: 16, title: "معلومات العلاوة الشهرية", domain: "eworld.dxn2u.com", url: "https://eworld.dxn2u.com/bonus-information/bonus-statement/monthly/" },
  { id: 17, title: "المكافأة المالية خطة SIMP و IOC", domain: "eworld.dxn2u.com", url: "https://eworld.dxn2u.com/menu/gain-income/simp-plan/" },
  { id: 18, title: "نشاط الشراء لأعضاء الشبكة", domain: "eworld.dxn2u.com", url: "https://eworld.dxn2u.com/marketing/purchase-activity/" },
  { id: 19, title: "الشراء عبر الإنترنت eWorld Shop", domain: "eworld.dxn2u.com", url: "https://eworld.dxn2u.com/products/?order_mode=regular&cat_id=FB&availability=in_stock" },
  { id: 20, title: "الموقع الشخصي للموزع", domain: "eworld.dxn2u.com", url: "https://eworld.dxn2u.com/menu/personal-website/" },
  { id: 21, title: "الموقع الإلكتروني الشخصي PWS", domain: "dxnturkey.com", url: "https://www.dxnturkey.com/pws/876543210" },
  { id: 22, title: "رابط رعاية الخط التحتي بالعربية", domain: "eworld.dxn2u.com", url: "https://eworld.dxn2u.com/r/?c=876543210&l=ar" },
  { id: 23, title: "إعداد معلومات موقع eWorld الشخصي", domain: "eworld.dxn2u.com", url: "https://eworld.dxn2u.com/dashboard/personal-information/personal-web-setting/" },
  { id: 24, title: "مؤهلاتي ومتابعة شبكة الأعضاء", domain: "eworld.dxn2u.com", url: "https://eworld.dxn2u.com/marketing/ppv-qualification/" },
];

async function generateCleanFallback(page, item, outputPath) {
  const html = `
    <!DOCTYPE html>
    <html dir="rtl" lang="ar">
    <head>
      <meta charset="utf-8">
      <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body {
          width: 1280px;
          height: 800px;
          background: linear-gradient(135deg, #0A192F 0%, #0F2557 50%, #1d345a 100%);
          color: #ffffff;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Noto Sans Arabic", sans-serif;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 60px;
          text-align: center;
        }
        .card {
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(20px);
          border-radius: 28px;
          padding: 60px 80px;
          max-width: 900px;
          box-shadow: 0 30px 60px rgba(0,0,0,0.3);
        }
        .domain-tag {
          display: inline-block;
          background: rgba(255, 255, 255, 0.12);
          color: #93c5fd;
          font-family: ui-monospace, SFMono-Regular, monospace;
          font-size: 18px;
          padding: 8px 24px;
          border-radius: 9999px;
          margin-bottom: 24px;
          letter-spacing: 0.5px;
        }
        h1 {
          font-size: 42px;
          font-weight: 700;
          line-height: 1.3;
          margin-bottom: 20px;
          color: #ffffff;
        }
        p {
          font-size: 20px;
          color: #cbd5e1;
          margin-bottom: 30px;
          max-width: 700px;
          line-height: 1.6;
        }
        .brand-badge {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          font-size: 16px;
          color: #94a3b8;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          padding-top: 24px;
        }
      </style>
    </head>
    <body>
      <div class="card">
        <div class="domain-tag">${item.domain}</div>
        <h1>${item.title}</h1>
        <p>بوابة الخدمات الرسمية والمعلومات لشركة DXN العالمية</p>
        <div class="brand-badge">
          <span>TAG eWorld Official Portal</span>
          <span>•</span>
          <span>معاينة رقمية آمنة</span>
        </div>
      </div>
    </body>
    </html>
  `;
  await page.setContent(html);
  await page.screenshot({ path: outputPath, type: "png" });
}

async function captureAll() {
  console.log(`Starting preview capture for ${links.length} links...`);
  const browser = await chromium.launch({
    executablePath: "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--ignore-certificate-errors"],
  });

  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 },
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36 Edg/124.0.0.0",
    ignoreHTTPSErrors: true,
  });

  const page = await context.newPage();

  for (const item of links) {
    const outputPath = path.join(previewsDir, `link-${item.id}.png`);
    console.log(`[${item.id}/24] Navigating to: ${item.url}`);

    try {
      await page.goto(item.url, {
        waitUntil: "domcontentloaded",
        timeout: 12000,
      });

      // Wait a moment for fonts/images to settle
      await page.waitForTimeout(1500);

      await page.screenshot({
        path: outputPath,
        type: "png",
      });
      console.log(`[SUCCESS] Captured real screenshot for link-${item.id}: ${item.title}`);
    } catch (err) {
      console.warn(`[FALLBACK] Failed/timed out loading ${item.url} (${err.message}). Generating fallback preview...`);
      try {
        await generateCleanFallback(page, item, outputPath);
        console.log(`[SUCCESS] Generated clean fallback preview for link-${item.id}`);
      } catch (fbErr) {
        console.error(`[ERROR] Could not generate fallback for link-${item.id}:`, fbErr);
      }
    }
  }

  await browser.close();
  console.log("All previews capture process completed!");
}

captureAll().catch(err => {
  console.error("Fatal error during preview capture:", err);
  process.exit(1);
});
