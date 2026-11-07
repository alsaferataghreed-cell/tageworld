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

// 19 Country Stores Config
const countryStores = [
  { id: 43, cn_id: "TR", name: "TURKEY", printable_name: "Turkey", fcode: "TRY", ar: "تركيا" },
  { id: 44, cn_id: "BH", name: "BAHRAIN", printable_name: "Bahrain", fcode: "BHD", ar: "البحرين" },
  { id: 45, cn_id: "EG", name: "EGYPT", printable_name: "Egypt", fcode: "EGP", ar: "مصر" },
  { id: 46, cn_id: "HK", name: "HONG KONG", printable_name: "Hong Kong", fcode: "HKD", ar: "هونغ كونغ" },
  { id: 47, cn_id: "ID", name: "INDONESIA", printable_name: "Indonesia", fcode: "IDR", ar: "إندونيسيا" },
  { id: 48, cn_id: "MY", name: "MALAYSIA", printable_name: "Malaysia", fcode: "RM", ar: "ماليزيا" },
  { id: 49, cn_id: "JO", name: "JORDAN", printable_name: "Jordan", fcode: "JOD", ar: "الأردن" },
  { id: 50, cn_id: "KW", name: "KUWAIT", printable_name: "Kuwait", fcode: "KWD", ar: "الكويت" },
  { id: 51, cn_id: "MN", name: "MONGOLIA", printable_name: "Mongolia", fcode: "MNT", ar: "منغوليا" },
  { id: 52, cn_id: "OM", name: "OMAN", printable_name: "Oman", fcode: "OMR", ar: "سلطنة عمان" },
  { id: 53, cn_id: "QA", name: "QATAR", printable_name: "Qatar", fcode: "QAR", ar: "قطر" },
  { id: 54, cn_id: "SA", name: "SAUDI ARABIA", printable_name: "Saudi Arabia", fcode: "SAR", ar: "السعودية" },
  { id: 55, cn_id: "AE", name: "UNITED ARAB EMIRATES", printable_name: "United Arab Emirates", fcode: "AED", ar: "الإمارات" },
  { id: 56, cn_id: "MA", name: "MOROCCO", printable_name: "Morocco", fcode: "MAD", ar: "المغرب" },
  { id: 57, cn_id: "NG", name: "NIGERIA", printable_name: "Nigeria", fcode: "NGN", ar: "نيجيريا" },
  { id: 58, cn_id: "ZA", name: "SOUTH AFRICA", printable_name: "South Africa", fcode: "ZAR", ar: "جنوب أفريقيا" },
  { id: 59, cn_id: "BE", name: "BELGIUM", printable_name: "Belgium", fcode: "EUR", ar: "بلجيكا ودول أوروبا" },
  { id: 60, cn_id: "AU", name: "AUSTRALIA", printable_name: "Australia", fcode: "AUD", ar: "أستراليا" },
  { id: 61, cn_id: "NZ", name: "NEW ZEALAND", printable_name: "New Zealand", fcode: "NZD", ar: "نيوزيلندا" }
];

// All Standard Links to capture
const webLinks = [
  // Top Products (1-5)
  { id: 1, url: "https://www.dxn2u.com/topproduct/index-coffee.php", type: "dxn2u" },
  { id: 2, url: "https://www.dxn2u.com/topproduct/index_rg_gl.php", type: "dxn2u" },
  { id: 3, url: "https://www.dxn2u.com/topproduct/index-spirulina.php", type: "dxn2u" },
  { id: 4, url: "https://www.dxn2u.com/topproduct/index-cocozhi.php", type: "dxn2u" },
  { id: 5, url: "https://www.dxn2u.com/topproduct/index-gempuri.php", type: "dxn2u" },

  // Vitality (6-11)
  { id: 6, url: "https://www.dxn2u.com/elevate/index-digestive.php", type: "dxn2u" },
  { id: 7, url: "https://www.dxn2u.com/elevate/index-skincare.php", type: "dxn2u" },
  { id: 8, url: "https://www.dxn2u.com/elevate/index-immune.php", type: "dxn2u" },
  { id: 9, url: "https://www.dxn2u.com/elevate/index-nutrition.php", type: "dxn2u" },
  { id: 10, url: "https://www.dxn2u.com/elevate/index-home.php", type: "dxn2u" },
  { id: 11, url: "https://www.dxn2u.com/elevate/index-kitchen.php", type: "dxn2u" },

  // eWorld Contact & First-Time Login (12, 14)
  { id: 12, url: "https://www.dxn2u.com/contact/index.php", type: "dxn2u" },
  { id: 14, url: "https://eworld.dxn2u.com/auth/first-login/", type: "eworld-first-login" },

  // eWorld Registration (22, 25)
  { id: 22, url: "https://eworld.dxn2u.com/r/?c=876543210&l=ar", type: "eworld-register" },
  { id: 25, url: "https://eworld.dxn2u.com/r/?c=876543210&l=en", type: "eworld-register" },

  // eWorld Home & Help (26, 29, 30, 31)
  { id: 26, url: "https://eworld.dxn2u.com/", type: "eworld" },
  { id: 27, url: "https://www.dxn2u.com/about/", type: "dxn2u-youtube" },
  { id: 28, url: "https://www.dxn2u.com/about/index.php", type: "dxn2u-youtube" },
  { id: 29, url: "https://eworld.dxn2u.com/help/terms/", type: "eworld-help" },
  { id: 30, url: "https://eworld.dxn2u.com/help/faq/", type: "eworld-help" },
  { id: 31, url: "https://www.dxn2u.com/contact/?lang=ar", type: "dxn2u" },

  // Social (32, 33)
  { id: 32, url: "https://www.facebook.com/share/1EhAFjxi43/", type: "facebook" },
  { id: 33, url: "https://www.instagram.com/dxnglobal_?exln=MXZ0bng2Y3VxcjdvYg==", type: "instagram" },

  // Regional Portals (34-42)
  { id: 34, url: "https://www.dxnturkey.com/", type: "portal-turkey" },
  { id: 35, url: "https://www.dxn2u.com/", type: "dxn2u-hq" },
  { id: 36, url: "https://www.dxn2uafrica.com/", type: "portal" },
  { id: 37, url: "https://www.dxn2uasia.com/", type: "portal-asia" },
  { id: 38, url: "https://www.dxn2u.eu/", type: "portal" },
  { id: 39, url: "https://www.dxn2ulatam.com/", type: "portal" },
  { id: 40, url: "https://www.dxnarabia.com/", type: "portal" },
  { id: 41, url: "https://www.dxnaus.com.au/", type: "portal" },
  { id: 42, url: "https://www.dxnusa.com/", type: "portal" },

  // Corporate & Business (62-70)
  { id: 62, url: "https://www.dxn2u.com/business/", type: "dxn2u" },
  { id: 63, url: "https://www.dxn2u.com/founder/index.php", type: "dxn2u" },
  { id: 64, url: "https://www.dxn2u.com/award/index.php", type: "dxn2u" },
  { id: 65, url: "https://www.dxn2u.com/gallery/index.php", type: "dxn2u" },
  { id: 66, url: "https://www.dxn2u.com/success/index.php", type: "dxn2u" },
  { id: 67, url: "https://www.dxn2u.com/news/index.php", type: "dxn2u" },
  { id: 68, url: "https://www.dxn2u.com/dxnlife/index.php", type: "dxn2u-life" },
  { id: 69, url: "https://www.dxn2u.com/investor-relations/index.php", type: "dxn2u" },
  { id: 70, url: "https://www.dxn2u.com/tender/index.php", type: "dxn2u" },

  // Catalog (71-75)
  { id: 71, url: "https://www.dxn2u.com/product/newprd.php", type: "dxn2u" },
  { id: 72, url: "https://www.dxn2u.com/product/products.php?cat_id=HDS", type: "dxn2u" },
  { id: 73, url: "https://www.dxn2u.com/product/products.php?cat_id=FFB", type: "dxn2u" },
  { id: 74, url: "https://www.dxn2u.com/product/products.php?cat_id=PCC", type: "dxn2u" },
  { id: 75, url: "https://www.dxn2u.com/product/products.php?cat_id=OTH", type: "dxn2u" }
];

async function universalCleanDOM(page) {
  // 1. Click accept on any visible cookie consent buttons
  try {
    const btn = page.locator('.cc-dismiss, .cc-btn, button:has-text("I Agree"), a:has-text("I Agree"), button:has-text("أوافق"), a:has-text("أوافق"), button:has-text("Kabul ediyorum"), a:has-text("Kabul ediyorum")').first();
    if (await btn.count() > 0 && await btn.isVisible()) {
      await btn.click({ timeout: 1000 }).catch(() => {});
      await page.waitForTimeout(300);
    }
  } catch (e) {}

  // 2. Comprehensive DOM cleanup
  await page.evaluate(() => {
    // A. Remove Cookie Consent Banners
    document.querySelectorAll('.cc-window, .cc-banner, [aria-label="cookieconsent"], .popup-modal, .cookie-consent, #cookie-banner, .cookie-banner, [id*="cookie-bar"], [class*="cookie-bar"]').forEach(e => e.remove());

    // B. Remove Preloaders
    document.querySelectorAll('#preloader, .preloader, #loading, .loading, .loader, #spinner, .spinner, .loading-screen').forEach(e => e.remove());

    // C. Remove Modals, Alert Dialogs, Dialogs, Backdrops
    document.querySelectorAll('[role="dialog"], [role="alertdialog"], .modal-backdrop, .modal.show, .swal2-container, #countrySwitchModal, [data-sonner-toaster], [role="status"], [data-slot="alert-dialog-overlay"], [data-slot="dialog-overlay"]').forEach(e => e.remove());

    // D. Remove any lingering fixed/sticky banner with cookie or consent text (guard against removing main containers)
    document.querySelectorAll('div, footer, section').forEach(el => {
      const s = window.getComputedStyle(el);
      if (s.position === 'fixed' || (s.position === 'sticky' && el.offsetHeight < 300)) {
        const text = (el.innerText || '').toLowerCase();
        if (text.length < 350 && (text.includes('cookie') || text.includes('ملفات تعريف') || text.includes('çerez') || text.includes('choose retail'))) {
          el.remove();
        }
      }
    });

    // E. Remove any blur and restore scrolling
    document.querySelectorAll('*').forEach(el => {
      if (el.style.filter && el.style.filter.includes('blur')) el.style.filter = 'none';
      if (el.style.backdropFilter) el.style.backdropFilter = 'none';
    });
    document.body.classList.remove('modal-open');
    document.body.style.filter = 'none';
    document.body.style.overflow = 'auto';
    document.documentElement.style.overflow = 'auto';
    window.scrollTo(0, 0);
  }).catch(() => {});
}

async function runMasterCapture() {
  console.log("=== Launching Edge Browser for Master Capture ===");
  const browser = await chromium.launch({
    executablePath: "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage"]
  });

  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 },
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 Edg/120.0.0.0",
    deviceScaleFactor: 1.5,
    locale: "ar-SA"
  });

  // Intercept fonts for Asia portal to prevent hanging
  await context.route(/.*fonts\.googleapis\.com.*/, route => route.abort());
  await context.route(/.*fonts\.gstatic\.com.*/, route => route.abort());

  const page = await context.newPage();

  // SECTION 1: Standard & Special Web Links
  console.log("\n==========================================");
  console.log("--- CAPTURING STANDARD & SPECIAL LINKS ---");
  console.log("==========================================");

  for (const item of webLinks) {
    const outPath = path.join(previewsDir, `link-${item.id}.png`);
    console.log(`\n[Link ${item.id}] [${item.type}] Navigating: ${item.url}`);

    try {
      if (item.type === "facebook") {
        await page.goto(item.url, { waitUntil: "domcontentloaded", timeout: 30000 });
        // Wait for profile picture image inside SVG or pagelet
        await page.waitForTimeout(6000);

        await page.evaluate(() => {
          // Remove modal dialogs
          document.querySelectorAll('[role="dialog"]').forEach(el => el.remove());

          // Remove fixed backdrops / scrims
          document.querySelectorAll('div').forEach(el => {
            const s = window.getComputedStyle(el);
            if (s.position === 'fixed' && (s.zIndex > 10 || s.backgroundColor.includes('rgba(244, 244, 244') || s.backgroundColor.includes('rgba(0, 0, 0'))) {
              if (!el.querySelector('[data-pagelet="ProfileTabs"]') && !el.querySelector('[data-pagelet="root"]')) {
                el.remove();
              }
            }
          });

          // Remove bottom login bar
          document.querySelectorAll('div').forEach(el => {
            if (el.innerText && (el.innerText.includes('قم بتسجيل الدخول') || el.innerText.includes('Log In or Sign Up'))) {
              const s = window.getComputedStyle(el);
              if (s.position === 'fixed') el.remove();
            }
          });

          document.body.style.overflow = "auto";
          window.scrollTo(0, 0);
        });
        await page.waitForTimeout(1000);
      } else if (item.type === "instagram") {
        await page.goto(item.url, { waitUntil: "domcontentloaded", timeout: 30000 });
        await page.waitForTimeout(5000);

        // Click close on modal
        const closeSvg = page.locator('svg[aria-label="Close"], svg[aria-label="إغلاق"]');
        if (await closeSvg.count() > 0) {
          const btn = closeSvg.locator('xpath=..');
          await btn.click().catch(() => {});
          await page.waitForTimeout(1000);
        }

        await page.evaluate(() => {
          document.querySelectorAll('div[role="dialog"], [role="presentation"]').forEach(el => el.remove());
          document.querySelectorAll('div').forEach(el => {
            if (el.innerText && (el.innerText.includes('Log in to see photos') || el.innerText.includes('Sign up to see photos'))) {
              el.remove();
            }
          });
          document.body.style.overflow = 'auto';
          window.scrollTo(0, 0);
        });
        await page.waitForTimeout(1000);
      } else if (item.type === "eworld-first-login") {
        await page.goto(item.url, { waitUntil: "domcontentloaded", timeout: 30000 });
        await page.waitForTimeout(4000);

        // Close any Switch Country or Retail Location dialog
        const closeBtn = page.locator('button:has-text("Close"), button:has-text("إغلاق")');
        while (await closeBtn.count() > 0 && await closeBtn.first().isVisible()) {
          await closeBtn.first().click().catch(() => {});
          await page.waitForTimeout(800);
        }

        await universalCleanDOM(page);
        await page.waitForTimeout(800);
      } else if (item.type === "eworld-register") {
        await page.goto(item.url, { waitUntil: "domcontentloaded", timeout: 30000 });
        await page.waitForTimeout(4000);

        // Close any modal
        const closeBtn = page.locator('button:has-text("Close"), button:has-text("إغلاق")');
        if (await closeBtn.count() > 0 && await closeBtn.first().isVisible()) {
          await closeBtn.first().click().catch(() => {});
          await page.waitForTimeout(800);
        }

        await universalCleanDOM(page);
        await page.waitForTimeout(800);
      } else if (item.type === "dxn2u-hq") {
        await page.goto(item.url, { waitUntil: "domcontentloaded", timeout: 30000 });
        // Wait for carousel background image
        await page.waitForTimeout(6000);
        await universalCleanDOM(page);
        await page.waitForTimeout(800);
      } else if (item.type === "dxn2u-youtube") {
        await page.goto(item.url, { waitUntil: "domcontentloaded", timeout: 30000 });
        // Wait for YouTube poster & controls
        await page.waitForTimeout(6000);
        await universalCleanDOM(page);
        await page.waitForTimeout(800);
      } else if (item.type === "dxn2u-life") {
        await page.goto(item.url, { waitUntil: "domcontentloaded", timeout: 30000 });
        // Wait for header image
        await page.waitForTimeout(6000);
        await universalCleanDOM(page);
        await page.waitForTimeout(800);
      } else if (item.type === "portal-asia" || item.type === "portal-turkey" || item.type === "portal") {
        await page.goto(item.url, { waitUntil: "domcontentloaded", timeout: 30000 });
        await page.waitForTimeout(4500);
        await universalCleanDOM(page);
        await page.waitForTimeout(800);
      } else {
        // Standard dxn2u & eworld
        await page.goto(item.url, { waitUntil: "domcontentloaded", timeout: 30000 });
        await page.waitForTimeout(4000);
        await universalCleanDOM(page);
        await page.waitForTimeout(800);
      }

      await page.screenshot({ path: outPath, type: "png" });
      const sz = (fs.statSync(outPath).size / 1024).toFixed(1);
      console.log(`✓ [Link ${item.id}] Saved: ${sz} KB -> link-${item.id}.png`);
    } catch (err) {
      console.error(`❌ [Link ${item.id}] Error: ${err.message}`);
    }
  }

  // SECTION 2: General Online Store (Link 19)
  console.log("\n==========================================");
  console.log("--- CAPTURING GENERAL ONLINE STORE (19) ---");
  console.log("==========================================");
  try {
    const storePage = await context.newPage();
    await storePage.addInitScript(() => {
      const saudiShop = {
        cn_id: "SA",
        name: "SAUDI ARABIA",
        printable_name: "Saudi Arabia",
        fcode: "SAR",
        decimal_separator: ".",
        thousand_separator: ",",
        decimal_place: 2,
        retail: true
      };
      localStorage.setItem("locale:selectedShopCountry", JSON.stringify(saudiShop));
      localStorage.setItem("locale:selectedCountry", JSON.stringify(saudiShop));
      localStorage.setItem("locale:detectedLocation", JSON.stringify({
        value: { country_code: "SA", country_name: "SAUDI ARABIA", has_retail: true },
        at: Date.now()
      }));
    });

    await storePage.goto("https://eworld.dxn2u.com/products/?cat_id=FB&availability=in_stock", { waitUntil: "domcontentloaded", timeout: 35000 });
    await storePage.waitForTimeout(6000);
    await universalCleanDOM(storePage);
    await storePage.waitForTimeout(800);

    const outPath19 = path.join(previewsDir, "link-19.png");
    await storePage.screenshot({ path: outPath19, type: "png" });
    console.log(`✓ [Link 19] General Store saved: ${(fs.statSync(outPath19).size / 1024).toFixed(1)} KB`);
    await storePage.close();
  } catch (err) {
    console.error(`❌ [Link 19] Error: ${err.message}`);
  }

  // SECTION 3: All 19 Country Stores (43 to 61)
  console.log("\n==========================================");
  console.log("--- CAPTURING ALL 19 COUNTRY STORES (43-61) ---");
  console.log("==========================================");

  for (const c of countryStores) {
    const outPath = path.join(previewsDir, `link-${c.id}.png`);
    console.log(`\n[Link ${c.id}] Capturing ${c.ar} (${c.printable_name} - ${c.fcode})...`);

    try {
      const storePage = await context.newPage();

      // Seed localStorage with exact country parameters before navigation!
      await storePage.addInitScript((country) => {
        const shop = {
          cn_id: country.cn_id,
          name: country.name,
          printable_name: country.printable_name,
          fcode: country.fcode,
          decimal_separator: ".",
          thousand_separator: ",",
          decimal_place: 2,
          retail: true
        };
        localStorage.setItem("locale:selectedShopCountry", JSON.stringify(shop));
        localStorage.setItem("locale:selectedCountry", JSON.stringify(shop));
        localStorage.setItem("locale:detectedLocation", JSON.stringify({
          value: { country_code: country.cn_id, country_name: country.name, has_retail: true },
          at: Date.now()
        }));
      }, c);

      await storePage.goto("https://eworld.dxn2u.com/products/?cat_id=FB&availability=in_stock", { waitUntil: "domcontentloaded", timeout: 35000 });

      // Wait for products & images to hydrate
      await storePage.waitForTimeout(6500);

      // Clean all banners, overlays, modals, and cookie bars
      await universalCleanDOM(storePage);
      await storePage.waitForTimeout(800);

      await storePage.screenshot({ path: outPath, type: "png" });
      const sz = (fs.statSync(outPath).size / 1024).toFixed(1);
      console.log(`✓ [Link ${c.id}] ${c.ar} (${c.printable_name} / ${c.fcode}): ${sz} KB -> link-${c.id}.png`);

      await storePage.close();
    } catch (err) {
      console.error(`❌ [Link ${c.id}] Store capture error: ${err.message}`);
    }
  }

  await browser.close();
  console.log("\n==========================================");
  console.log("=== MASTER CAPTURE COMPLETED SUCCESSFULLY! ===");
  console.log("==========================================");
}

runMasterCapture().catch(err => {
  console.error("Master capture fatal error:", err);
  process.exit(1);
});
