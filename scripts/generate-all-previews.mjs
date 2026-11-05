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

// Clean helper to remove modals/popovers from live eWorld pages
async function cleanEWorldPage(page) {
  await page.evaluate(() => {
    const removeSelectors = [
      "[data-radix-portal]",
      "[data-radix-popper-content-wrapper]",
      "[role='alertdialog']",
      "[role='dialog']",
      ".fixed.inset-0",
      ".modal-backdrop",
      ".modal",
      "#countrySwitchModal",
      ".swal2-container"
    ];
    removeSelectors.forEach(sel => {
      document.querySelectorAll(sel).forEach(el => el.remove());
    });
    document.body.classList.remove("modal-open");
    document.body.style.overflow = "auto";
    document.body.style.filter = "none";
    document.querySelectorAll("*").forEach(el => {
      if (el.style && el.style.filter && el.style.filter.includes("blur")) {
        el.style.filter = "none";
      }
    });
  });
}

// Capture real live pages for 13, 14, 15, 19, 22
async function captureLivePage(page, url, outputPath, cleanModals = false) {
  console.log(`Navigating to: ${url}`);
  await page.goto(url, { waitUntil: "networkidle", timeout: 25000 });
  await page.waitForTimeout(2500);
  if (cleanModals) {
    await cleanEWorldPage(page);
    await page.waitForTimeout(1000);
  }
  await page.screenshot({ path: outputPath, type: "png" });
  console.log(`Saved screenshot: ${path.basename(outputPath)}`);
}

// High-fidelity portal mockups for authenticated eWorld & PWS pages
const portalMockups = {
  // Link 16: معلومات العلاوة الشهرية
  16: {
    domain: "eworld.dxn2u.com",
    titleAr: "معلومات العلاوة الشهرية",
    titleEn: "Monthly Bonus Information & Statement",
    activeNav: "Bonus Information",
    html: `
      <div class="breadcrumb">eWorld &gt; Bonus Information &gt; Monthly Bonus Statement</div>
      <div class="page-header">
        <div>
          <h2>كشف حساب العلاوة الشهرية</h2>
          <span class="sub">Monthly Bonus Statement Summary</span>
        </div>
        <div class="filter-group">
          <label>السنة / الشهر:</label>
          <select class="form-select"><option>2026 - 10 (أكتوبر)</option><option>2026 - 09 (سبتمبر)</option><option>2026 - 08 (أغسطس)</option></select>
          <button class="btn-navy">عرض التقرير</button>
        </div>
      </div>
      <div class="stats-row">
        <div class="stat-card">
          <div class="stat-label">إجمالي نقاط المجموعة (PGPV)</div>
          <div class="stat-val text-navy">12,450.00 PV</div>
          <div class="stat-trend positive">+14.2% نمو شهري</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">القيمة البيعية للمجموعة (PGSV)</div>
          <div class="stat-val text-navy">4,980.00 SV</div>
          <div class="stat-trend">مؤهل للحصول على العلاوة</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">صافي العلاوة المكتسبة (Net Bonus)</div>
          <div class="stat-val text-emerald">$ 1,842.50 USD</div>
          <div class="stat-trend text-emerald">تم التحويل للحساب المصرفي</div>
        </div>
      </div>
      <table class="data-table">
        <thead>
          <tr>
            <th>الشهر</th>
            <th>رمز الموزع</th>
            <th>الرتبة التأهيلية</th>
            <th>علاوة المجموعة (USD)</th>
            <th>علاوة التطوير (USD)</th>
            <th>علاوة القيادة (USD)</th>
            <th>صافي المبلغ</th>
            <th>ملف الكشف</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>2026-10</strong></td>
            <td>876543210</td>
            <td><span class="badge-sd">Star Diamond (SD)</span></td>
            <td>$ 640.20</td>
            <td>$ 480.00</td>
            <td>$ 722.30</td>
            <td class="font-bold text-navy">$ 1,842.50</td>
            <td><span class="btn-pdf">تحميل PDF</span></td>
          </tr>
          <tr>
            <td><strong>2026-09</strong></td>
            <td>876543210</td>
            <td><span class="badge-sd">Star Diamond (SD)</span></td>
            <td>$ 590.10</td>
            <td>$ 430.50</td>
            <td>$ 690.00</td>
            <td class="font-bold text-navy">$ 1,710.60</td>
            <td><span class="btn-pdf">تحميل PDF</span></td>
          </tr>
        </tbody>
      </table>
    `
  },

  // Link 17: المكافأة المالية خطة SIMP و IOC
  17: {
    domain: "eworld.dxn2u.com",
    titleAr: "خطة المكافآت المالية SIMP و IOC",
    titleEn: "Simplified Income & Marketing Plan (SIMP) / IOC Plan",
    activeNav: "Gain Income",
    html: `
      <div class="breadcrumb">eWorld &gt; Gain Income &gt; SIMP / IOC Marketing Plan</div>
      <div class="page-header">
        <div>
          <h2>الخطة التسويقية وحساب الدخل المتنامي</h2>
          <span class="sub">DXN International Simplified Marketing & Compensation Plan</span>
        </div>
        <div class="filter-group">
          <label>الإقليم المستهدف:</label>
          <select class="form-select"><option>الشرق الأوسط والخليج العربي (Middle East)</option><option>تركيا وأوروبا (Turkey & Europe)</option><option>جنوب شرق آسيا (Global)</option></select>
        </div>
      </div>
      <div class="grid-2">
        <div class="plan-card">
          <div class="plan-badge">نظام SIMP</div>
          <h3>خطة الأرباح الأساسية والتأهيل</h3>
          <p class="plan-desc">تتيح لك الخطة التدرج في نسب الأرباح من 6% إلى 37% وصولاً إلى رتبة النجم الماسي وما فوق.</p>
          <ul class="plan-list">
            <li><span>موزع جديد (Distributor)</span> <strong>6% - 18%</strong></li>
            <li><span>نجم ياقوتي (Star Ruby - SR)</span> <strong>31%</strong></li>
            <li><span>نجم ماسي مؤهل (Qualified Star Diamond)</span> <strong>37%</strong></li>
            <li><span>علاوة التطوير ومشاركة أرباح الشركة الدولية</span> <strong>+15%</strong></li>
          </ul>
        </div>
        <div class="plan-card highlight">
          <div class="plan-badge bg-gold">نظام IOC</div>
          <h3>حزمة Icing On The Cake الفورية</h3>
          <p class="plan-desc">خطة الدخل الفوري بدون اشتراط نقاط شهرية مع عوائد متتالية على الأجيال المباشرة وغير المباشرة.</p>
          <ul class="plan-list">
            <li><span>الجيل الأول (1st Generation)</span> <strong>15% دخل فوري</strong></li>
            <li><span>الجيل الثاني (2nd Generation)</span> <strong>10% دخل فوري</strong></li>
            <li><span>الجيل الثالث إلى الحادي عشر</span> <strong>5% على كل حزمة</strong></li>
            <li><span>الجيل الثاني عشر فما بعد</span> <strong>1.5% حافز دائم</strong></li>
          </ul>
        </div>
      </div>
    `
  },

  // Link 18: نشاط الشراء لأعضاء الشبكة
  18: {
    domain: "eworld.dxn2u.com",
    titleAr: "نشاط الشراء لأعضاء الشبكة",
    titleEn: "Downline Network Purchase Activity",
    activeNav: "Marketing",
    html: `
      <div class="breadcrumb">eWorld &gt; Marketing &gt; Purchase Activity Monitor</div>
      <div class="page-header">
        <div>
          <h2>متابعة نشاط مشتريات فريقك والخطوط النشطة</h2>
          <span class="sub">Real-Time Downline Member Volume & Purchase Tracking</span>
        </div>
        <div class="filter-group">
          <label>تصفية الحالة:</label>
          <select class="form-select"><option>جميع الأعضاء (الكل)</option><option>الأعضاء النشطون فقط (Active)</option><option>الأعضاء المؤهلون (Qualified)</option></select>
          <button class="btn-navy">فلترة</button>
        </div>
      </div>
      <div class="stats-row">
        <div class="stat-card">
          <div class="stat-label">إجمالي الأعضاء المسجلين</div>
          <div class="stat-val text-navy">428 عضواً</div>
          <div class="stat-trend positive">+32 عضو جديد هذا الشهر</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">الأعضاء النشطون (Active Purchases)</div>
          <div class="stat-val text-emerald">294 عضواً</div>
          <div class="stat-trend text-emerald">نسبة النشاط: 68.7%</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">حجم مبيعات الفريق (Team PV)</div>
          <div class="stat-val text-navy">28,640 PV</div>
          <div class="stat-trend positive">تأهيل ماسي مضمون</div>
        </div>
      </div>
      <table class="data-table">
        <thead>
          <tr>
            <th>رمز العضو</th>
            <th>اسم الموزع</th>
            <th>الجيل</th>
            <th>الدولة</th>
            <th>النقاط الشخصية (PPV)</th>
            <th>نقاط المجموعة (PGPV)</th>
            <th>تاريخ آخر طلب</th>
            <th>الحالة</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>819203841</strong></td>
            <td>أحمد خالد المنصوري</td>
            <td>1st Gen</td>
            <td>السعودية</td>
            <td class="font-bold">340 PV</td>
            <td>3,210 PV</td>
            <td>2026-11-04</td>
            <td><span class="badge-active">نشط / مؤهل</span></td>
          </tr>
          <tr>
            <td><strong>820491029</strong></td>
            <td>فاطمة الزهراء علي</td>
            <td>1st Gen</td>
            <td>الإمارات</td>
            <td class="font-bold">210 PV</td>
            <td>1,840 PV</td>
            <td>2026-11-03</td>
            <td><span class="badge-active">نشط / مؤهل</span></td>
          </tr>
          <tr>
            <td><strong>821948201</strong></td>
            <td>محمد سمير إبراهيم</td>
            <td>2nd Gen</td>
            <td>تركيا</td>
            <td class="font-bold">120 PV</td>
            <td>890 PV</td>
            <td>2026-11-01</td>
            <td><span class="badge-active">نشط</span></td>
          </tr>
        </tbody>
      </table>
    `
  },

  // Link 20: الموقع الشخصي للموزع
  20: {
    domain: "eworld.dxn2u.com",
    titleAr: "بوابة الموقع الشخصي للموزع (PWS)",
    titleEn: "Distributor Personal Website Management Portal",
    activeNav: "Personal Website",
    html: `
      <div class="breadcrumb">eWorld &gt; Personal Website &gt; Overview & Management</div>
      <div class="page-header">
        <div>
          <h2>إدارة وتشغيل موقعك الإلكتروني الشخصي PWS</h2>
          <span class="sub">Build, Share and Track Your Official DXN Distributor Landing Page</span>
        </div>
        <div class="filter-group">
          <span class="badge-active" style="padding: 8px 16px; font-size: 13px;">حالة الموقع: متصل ونشط Online</span>
        </div>
      </div>
      <div class="pws-banner">
        <div class="pws-info">
          <div class="pws-tag">رابط موقعك الشخصي الرسمي المعتمد</div>
          <div class="pws-url" dir="ltr">https://www.dxnturkey.com/pws/876543210</div>
          <p>موقعك الشخصي يتيح لزوارك من مختلف الدول التعرف على منتجات DXN والتسجيل كأعضاء تحت رعايتك مباشرة دون الحاجة لشرح خطوات التسجيل يدوياً.</p>
          <div class="btn-group">
            <button class="btn-navy">معاينة الموقع مباشرة</button>
            <button class="btn-outline">تعديل التصميم والألوان</button>
          </div>
        </div>
        <div class="pws-stats-box">
          <div class="pws-stat-item">
            <span class="num">1,480</span>
            <span class="lbl">زيارة هذا الشهر</span>
          </div>
          <div class="pws-stat-item">
            <span class="num">48</span>
            <span class="lbl">طلب تسجيل عضوية</span>
          </div>
          <div class="pws-stat-item">
            <span class="num">19</span>
            <span class="lbl">مشتريات تجزئة مباشرة</span>
          </div>
        </div>
      </div>
    `
  },

  // Link 21: الموقع الإلكتروني الشخصي PWS (DXN Turkey Showcase)
  21: {
    domain: "dxnturkey.com",
    titleAr: "الموقع الإلكتروني الشخصي PWS | تركيا",
    titleEn: "DXN Personal Web Site - Independent Distributor Showcase",
    activeNav: "PWS",
    isPwsStore: true,
    html: `
      <div class="pws-store-header">
        <div class="brand">
          <div class="pws-logo">DXN</div>
          <div>
            <div class="logo-title">DXN TURKEY</div>
            <div class="logo-sub">One World One Market</div>
          </div>
        </div>
        <div class="distributor-chip">
          <div class="chip-avatar">S</div>
          <div>
            <div class="chip-name">الموزع المستقل: سامي المنصور</div>
            <div class="chip-id">رقم العضوية: 876543210 (تركيا & عالمياً)</div>
          </div>
        </div>
      </div>
      <div class="pws-hero">
        <div class="hero-content">
          <span class="hero-tag">الموقع الشخصي المعتمد للمنتجات والعضوية</span>
          <h1>مرحباً بكم في عالم الصحة والريادة مع DXN</h1>
          <p>اكتشف أفضل المكملات الغذائية الطبيعية، فطر الريشي، السبيرولينا، ومشروبات القهوة الصحية، أو انضم لفريقي لتأسيس مشروعك العالمي الخاص.</p>
          <div class="btn-group">
            <button class="btn-gold">انضم الآن تحت رعايتي (عضوية جديدة)</button>
            <button class="btn-pws-shop">تصفح وتسوق المنتجات</button>
          </div>
        </div>
      </div>
      <div class="products-grid-pws">
        <div class="p-card">
          <div class="p-badge">الأكثر مبيعاً</div>
          <div class="p-title">DXN Reishi Gano (RG & GL)</div>
          <div class="p-desc">خلاصة فطر الجانوديرما الأحمر لتعزيز المناعة وطرد السموم</div>
          <div class="p-footer">
            <span class="p-price">₺ 820.00 TL</span>
            <span class="btn-order">اطلب عبر الموقع</span>
          </div>
        </div>
        <div class="p-card">
          <div class="p-badge">طبيعي 100%</div>
          <div class="p-title">DXN Spirulina Tablets</div>
          <div class="p-desc">الغذاء السوبر الكامل الغني بالبروتين والمعادن الحيوية</div>
          <div class="p-footer">
            <span class="p-price">₺ 540.00 TL</span>
            <span class="btn-order">اطلب عبر الموقع</span>
          </div>
        </div>
        <div class="p-card">
          <div class="p-badge">قهوة صحية</div>
          <div class="p-title">DXN Lingzhi 3-in-1 Coffee</div>
          <div class="p-desc">المذاق البرازيلي الفاخر ممزوجاً بخلاصة فطر الريشي</div>
          <div class="p-footer">
            <span class="p-price">₺ 390.00 TL</span>
            <span class="btn-order">اطلب عبر الموقع</span>
          </div>
        </div>
      </div>
    `
  },

  // Link 23: إعداد معلومات موقع eWorld الشخصي
  23: {
    domain: "eworld.dxn2u.com",
    titleAr: "إعداد معلومات وتخصيص موقع eWorld الشخصي",
    titleEn: "Personal Web Settings & Profile Customization",
    activeNav: "Settings",
    html: `
      <div class="breadcrumb">eWorld &gt; Dashboard &gt; Personal Information &gt; Personal Web Setting</div>
      <div class="page-header">
        <div>
          <h2>تخصيص البيانات ومعلومات التواصل لموقعك الشخصي</h2>
          <span class="sub">Configure Profile, Contact Information and Social Links</span>
        </div>
        <div class="filter-group">
          <button class="btn-navy">حفظ التغييرات</button>
        </div>
      </div>
      <div class="form-container">
        <div class="form-row">
          <div class="form-col">
            <label>اسم الموزع المعروض على الموقع (Display Name):</label>
            <input class="form-input" value="Sami Al-Mansoor - سامي المنصور" />
          </div>
          <div class="form-col">
            <label>رقم الواتساب للتواصل المباشر (WhatsApp):</label>
            <input class="form-input" value="+90 555 123 4567" dir="ltr" />
          </div>
        </div>
        <div class="form-row">
          <div class="form-col">
            <label>البريد الإلكتروني التجاري (Business Email):</label>
            <input class="form-input" value="contact@tageworld.com" dir="ltr" />
          </div>
          <div class="form-col">
            <label>اللغة الافتراضية لزوار الموقع:</label>
            <select class="form-input"><option>العربية (Arabic)</option><option>English</option><option>Türkçe</option></select>
          </div>
        </div>
        <div class="form-row">
          <div class="form-col" style="flex: 1;">
            <label>رسالة الترحيب ونبذة عن الموزع (Welcome Bio):</label>
            <textarea class="form-input" rows="3">مرحباً بك! يسعدني تقديم الاستشارات الصحية والدعم التسويقي لكافة أعضاء فريقي في DXN لتحقيق الاستقلال المالي والصحي.</textarea>
          </div>
        </div>
      </div>
    `
  },

  // Link 24: مؤهلاتي ومتابعة شبكة الأعضاء
  24: {
    domain: "eworld.dxn2u.com",
    titleAr: "مؤهلاتي ومتابعة شبكة الأعضاء (PPV Qualification)",
    titleEn: "PPV Qualification & Genealogy Tree Monitoring",
    activeNav: "Marketing",
    html: `
      <div class="breadcrumb">eWorld &gt; Marketing &gt; PPV Qualification Status</div>
      <div class="page-header">
        <div>
          <h2>متابعة التأهيل الشهري ونقاط الشبكة (PPV/PGPV)</h2>
          <span class="sub">Monthly Qualification & Star Diamond Downline Status</span>
        </div>
        <div class="filter-group">
          <span class="badge-active" style="padding: 8px 16px; font-size: 13px;">حالة التأهيل للشهر الحالي: مؤهل Qualified QSD</span>
        </div>
      </div>
      <div class="stats-row">
        <div class="stat-card">
          <div class="stat-label">نقاطك الشخصية (Personal PV)</div>
          <div class="stat-val text-navy">350.00 PV</div>
          <div class="stat-trend positive">تم تحقيق المستهدف (100 PV)</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">نقاط المجموعة الشخصية (PGPV)</div>
          <div class="stat-val text-navy">5,420.00 PV</div>
          <div class="stat-trend positive">مؤهل للعلاوة الماسية</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">الخطوط الماسية المؤهلة (QSD Lines)</div>
          <div class="stat-val text-emerald">6 خطوط مؤهلة</div>
          <div class="stat-trend text-emerald">مستوى القيادة: تاج ماسي قادم</div>
        </div>
      </div>
      <table class="data-table">
        <thead>
          <tr>
            <th>الخط</th>
            <th>رمز القائد الماسي</th>
            <th>الاسم</th>
            <th>الرتبة</th>
            <th>النقاط الشخصية</th>
            <th>نقاط المجموعة الماسية (DGPV)</th>
            <th>حالة الخط</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>الخط 1</td>
            <td><strong>819203810</strong></td>
            <td>عبدالله محمد السعيد</td>
            <td><span class="badge-sd">Senior Star Diamond</span></td>
            <td>310 PV</td>
            <td>8,450 PV</td>
            <td><span class="badge-active">مؤهل Qualified</span></td>
          </tr>
          <tr>
            <td>الخط 2</td>
            <td><strong>820194829</strong></td>
            <td>خالد ناصر الدوسري</td>
            <td><span class="badge-sd">Executive Star Diamond</span></td>
            <td>420 PV</td>
            <td>11,200 PV</td>
            <td><span class="badge-active">مؤهل Qualified</span></td>
          </tr>
          <tr>
            <td>الخط 3</td>
            <td><strong>821940182</strong></td>
            <td>مروان طارق العتيبي</td>
            <td><span class="badge-sd">Star Diamond</span></td>
            <td>280 PV</td>
            <td>5,100 PV</td>
            <td><span class="badge-active">مؤهل Qualified</span></td>
          </tr>
        </tbody>
      </table>
    `
  }
};

// Frame template for authentic portal rendering
function getPortalHtml(mock) {
  return `
    <!DOCTYPE html>
    <html dir="rtl" lang="ar">
    <head>
      <meta charset="utf-8">
      <style>
        * { box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Tajawal", "Noto Sans Arabic", sans-serif; }
        body {
          width: 1280px;
          height: 800px;
          background: #F8FAFC;
          color: #0A192F;
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }
        /* Portal Top Header */
        .portal-header {
          background: #FFFFFF;
          border-bottom: 1px solid #E2E8F0;
          height: 64px;
          padding: 0 40px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .portal-logo-area {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .eworld-badge {
          font-size: 22px;
          font-weight: 800;
          letter-spacing: -0.5px;
          color: #0F2557;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .eworld-badge .red { color: #E11D48; }
        .eworld-badge .sub { font-size: 11px; font-weight: 600; color: #64748B; letter-spacing: 0.5px; margin-right: 4px; }
        .user-chip {
          display: flex;
          align-items: center;
          gap: 12px;
          background: #F1F5F9;
          padding: 6px 16px;
          border-radius: 9999px;
          font-size: 12px;
          border: 1px solid #E2E8F0;
        }
        .user-chip strong { color: #0F2557; }
        .user-chip .dot { width: 8px; height: 8px; border-radius: 50%; background: #10B981; }

        /* Portal Nav Bar */
        .portal-nav {
          background: #0A192F;
          color: #FFFFFF;
          padding: 0 40px;
          height: 44px;
          display: flex;
          align-items: center;
          gap: 28px;
          font-size: 13px;
          font-weight: 500;
        }
        .nav-item {
          color: #94A3B8;
          cursor: pointer;
          padding: 10px 0;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .nav-item.active {
          color: #FFFFFF;
          font-weight: 700;
          border-bottom: 3px solid #38BDF8;
        }

        /* Portal Main Body */
        .portal-content {
          flex: 1;
          padding: 32px 40px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .breadcrumb {
          font-size: 11px;
          color: #64748B;
          font-family: monospace;
          direction: ltr;
          text-align: right;
        }

        .page-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .page-header h2 {
          font-size: 24px;
          font-weight: 800;
          color: #0A192F;
        }
        .page-header .sub {
          font-size: 13px;
          color: #64748B;
        }

        .filter-group {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 12px;
        }
        .form-select {
          padding: 6px 12px;
          border-radius: 8px;
          border: 1px solid #CBD5E1;
          background: #FFFFFF;
          font-size: 12px;
          color: #0F2557;
          font-weight: 600;
        }
        .btn-navy {
          background: #0F2557;
          color: #FFFFFF;
          border: none;
          padding: 8px 18px;
          border-radius: 9999px;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
        }
        .btn-outline {
          background: #FFFFFF;
          color: #0F2557;
          border: 1px solid #CBD5E1;
          padding: 8px 18px;
          border-radius: 9999px;
          font-size: 12px;
          font-weight: 600;
        }
        .btn-pdf {
          display: inline-block;
          background: #EEF2F6;
          color: #0F2557;
          font-size: 11px;
          font-weight: 700;
          padding: 4px 10px;
          border-radius: 6px;
          border: 1px solid #CBD5E1;
        }

        /* Stats Row */
        .stats-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }
        .stat-card {
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: 14px;
          padding: 18px 22px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.03);
        }
        .stat-label {
          font-size: 12px;
          color: #64748B;
          font-weight: 500;
          margin-bottom: 6px;
        }
        .stat-val {
          font-size: 24px;
          font-weight: 800;
          font-family: monospace;
          direction: ltr;
          text-align: right;
        }
        .text-navy { color: #0F2557; }
        .text-emerald { color: #059669; }
        .stat-trend {
          font-size: 11px;
          margin-top: 4px;
          color: #64748B;
        }
        .stat-trend.positive { color: #059669; font-weight: 600; }

        /* Data Tables */
        .data-table {
          width: 100%;
          border-collapse: separate;
          border-spacing: 0;
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: 14px;
          overflow: hidden;
          font-size: 12px;
        }
        .data-table th {
          background: #F8FAFC;
          padding: 12px 16px;
          text-align: right;
          font-weight: 700;
          color: #475569;
          border-bottom: 1px solid #E2E8F0;
        }
        .data-table td {
          padding: 12px 16px;
          border-bottom: 1px solid #F1F5F9;
          color: #334155;
        }
        .badge-sd {
          background: #EFF6FF;
          color: #1D4ED8;
          border: 1px solid #BFDBFE;
          padding: 3px 10px;
          border-radius: 9999px;
          font-size: 11px;
          font-weight: 600;
        }
        .badge-active {
          background: #ECFDF5;
          color: #047857;
          border: 1px solid #A7F3D0;
          padding: 3px 10px;
          border-radius: 9999px;
          font-size: 11px;
          font-weight: 600;
        }

        /* 2-Col Plan Cards */
        .grid-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }
        .plan-card {
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: 18px;
          padding: 24px;
          position: relative;
        }
        .plan-card.highlight {
          border-color: #CBD5E1;
          box-shadow: 0 4px 12px rgba(15, 37, 87, 0.05);
        }
        .plan-badge {
          display: inline-block;
          background: #0F2557;
          color: #FFFFFF;
          font-size: 11px;
          font-weight: 700;
          padding: 4px 12px;
          border-radius: 9999px;
          margin-bottom: 12px;
        }
        .plan-badge.bg-gold {
          background: #D97706;
        }
        .plan-card h3 {
          font-size: 18px;
          font-weight: 800;
          margin-bottom: 8px;
          color: #0A192F;
        }
        .plan-desc {
          font-size: 13px;
          color: #64748B;
          margin-bottom: 16px;
          line-height: 1.5;
        }
        .plan-list {
          list-style: none;
        }
        .plan-list li {
          display: flex;
          justify-content: space-between;
          padding: 8px 0;
          border-bottom: 1px solid #F1F5F9;
          font-size: 13px;
        }
        .plan-list li strong { color: #0F2557; font-family: monospace; font-size: 14px; }

        /* PWS Banner & Stats */
        .pws-banner {
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: 18px;
          padding: 28px;
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 24px;
          align-items: center;
        }
        .pws-tag {
          font-size: 11px;
          font-weight: 700;
          color: #0F2557;
          background: #EEF2F6;
          display: inline-block;
          padding: 4px 12px;
          border-radius: 9999px;
          margin-bottom: 10px;
        }
        .pws-url {
          font-size: 18px;
          font-weight: 800;
          color: #0F2557;
          background: #F8FAFC;
          border: 1px solid #CBD5E1;
          padding: 10px 16px;
          border-radius: 10px;
          margin-bottom: 14px;
          font-family: monospace;
        }
        .pws-info p {
          font-size: 13px;
          color: #64748B;
          line-height: 1.6;
          margin-bottom: 18px;
        }
        .btn-group {
          display: flex;
          gap: 12px;
        }
        .pws-stats-box {
          background: #F8FAFC;
          border: 1px solid #E2E8F0;
          border-radius: 14px;
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .pws-stat-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }
        .pws-stat-item .num {
          font-size: 26px;
          font-weight: 800;
          color: #0F2557;
          font-family: monospace;
        }
        .pws-stat-item .lbl {
          font-size: 11px;
          color: #64748B;
        }

        /* PWS Turkey Showcase (Link 21) */
        .pws-store-header {
          background: #FFFFFF;
          border-bottom: 1px solid #E2E8F0;
          padding: 16px 40px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .pws-logo {
          font-size: 28px;
          font-weight: 900;
          color: #DC2626;
          letter-spacing: -1px;
        }
        .logo-title {
          font-size: 14px;
          font-weight: 800;
          color: #0A192F;
        }
        .logo-sub {
          font-size: 10px;
          color: #64748B;
          letter-spacing: 0.5px;
        }
        .distributor-chip {
          display: flex;
          align-items: center;
          gap: 12px;
          background: #F8FAFC;
          border: 1px solid #E2E8F0;
          padding: 8px 18px;
          border-radius: 9999px;
        }
        .chip-avatar {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background: #0F2557;
          color: #FFFFFF;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
        }
        .chip-name { font-size: 13px; font-weight: 700; color: #0A192F; }
        .chip-id { font-size: 11px; color: #64748B; font-family: monospace; }

        .pws-hero {
          background: linear-gradient(135deg, #0A192F 0%, #0F2557 100%);
          color: #FFFFFF;
          padding: 36px 40px;
          border-radius: 20px;
          margin: 16px 40px 0;
        }
        .hero-tag {
          display: inline-block;
          background: rgba(255,255,255,0.15);
          color: #38BDF8;
          font-size: 11px;
          font-weight: 700;
          padding: 4px 12px;
          border-radius: 9999px;
          margin-bottom: 12px;
        }
        .pws-hero h1 {
          font-size: 28px;
          font-weight: 800;
          margin-bottom: 10px;
          line-height: 1.3;
        }
        .pws-hero p {
          font-size: 14px;
          color: #E2E8F0;
          max-width: 800px;
          line-height: 1.6;
          margin-bottom: 20px;
        }
        .btn-gold {
          background: #D97706;
          color: #FFFFFF;
          border: none;
          padding: 10px 24px;
          border-radius: 9999px;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
        }
        .btn-pws-shop {
          background: rgba(255,255,255,0.15);
          color: #FFFFFF;
          border: 1px solid rgba(255,255,255,0.3);
          padding: 10px 24px;
          border-radius: 9999px;
          font-size: 13px;
          font-weight: 600;
        }

        .products-grid-pws {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          padding: 20px 40px 0;
        }
        .p-card {
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: 14px;
          padding: 18px;
        }
        .p-badge {
          display: inline-block;
          background: #EFF6FF;
          color: #1D4ED8;
          font-size: 10px;
          font-weight: 700;
          padding: 2px 8px;
          border-radius: 9999px;
          margin-bottom: 8px;
        }
        .p-title { font-size: 14px; font-weight: 700; color: #0A192F; margin-bottom: 4px; }
        .p-desc { font-size: 11px; color: #64748B; margin-bottom: 12px; line-height: 1.4; }
        .p-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-top: 1px solid #F1F5F9;
          padding-top: 10px;
        }
        .p-price { font-size: 14px; font-weight: 800; color: #0F2557; font-family: monospace; }
        .btn-order { font-size: 11px; color: #1D4ED8; font-weight: 700; }

        /* Form Container (Link 23) */
        .form-container {
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: 16px;
          padding: 28px;
          display: flex;
          flex-direction: column;
          gap: 18px;
        }
        .form-row {
          display: flex;
          gap: 20px;
        }
        .form-col {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .form-col label {
          font-size: 12px;
          font-weight: 600;
          color: #475569;
        }
        .form-input {
          padding: 10px 14px;
          border-radius: 10px;
          border: 1px solid #CBD5E1;
          background: #F8FAFC;
          font-size: 13px;
          color: #0A192F;
          font-family: inherit;
        }
      </style>
    </head>
    <body>
      ${mock.isPwsStore ? "" : `
        <div class="portal-header">
          <div class="portal-logo-area">
            <div class="eworld-badge">
              <span class="red">e</span>WORLD
              <span class="sub">| ONE WORLD ONE MARKET</span>
            </div>
          </div>
          <div class="user-chip">
            <span class="dot"></span>
            <span>الموزع المستقل: <strong>سامي المنصور</strong></span>
            <span>•</span>
            <span dir="ltr"><strong>ID: 876543210</strong></span>
            <span>•</span>
            <span>الرتبة: <strong>نجم ماسي (SD)</strong></span>
          </div>
        </div>
        <div class="portal-nav">
          <div class="nav-item ${mock.activeNav === 'Home' ? 'active' : ''}">الصفحة الرئيسية</div>
          <div class="nav-item ${mock.activeNav === 'Marketing' ? 'active' : ''}">التسويق ومتابعة الشبكة</div>
          <div class="nav-item ${mock.activeNav === 'Bonus Information' ? 'active' : ''}">معلومات العلاوة والأرباح</div>
          <div class="nav-item ${mock.activeNav === 'Gain Income' ? 'active' : ''}">الخطط المالية SIMP / IOC</div>
          <div class="nav-item ${mock.activeNav === 'Personal Website' ? 'active' : ''}">الموقع الشخصي PWS</div>
          <div class="nav-item ${mock.activeNav === 'Settings' ? 'active' : ''}">إعدادات الحساب</div>
        </div>
      `}
      <div class="${mock.isPwsStore ? '' : 'portal-content'}">
        ${mock.html}
      </div>
    </body>
    </html>
  `;
}

async function main() {
  console.log("Starting preview capture and generation...");
  const browser = await chromium.launch({
    executablePath: "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
    headless: true,
  });

  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 },
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
    ignoreHTTPSErrors: true,
  });

  const page = await context.newPage();

  // 1. Live captures for links with popups dismissed:
  // Link 13: أصبح موزعا ضم عضو جديد
  await captureLivePage(page, "https://eworld.dxn2u.com/auth/register/distributor/", path.join(previewsDir, "link-13.png"), true);

  // Link 15: رعاية موزع جديد داخل موقعك eWorld
  await captureLivePage(page, "https://eworld.dxn2u.com/auth/register/distributor/?sponsor_code=123456789", path.join(previewsDir, "link-15.png"), true);

  // Link 19: الشراء عبر الإنترنت داخل موقعك
  await captureLivePage(page, "https://eworld.dxn2u.com/products/?order_mode=regular&cat_id=FB&availability=in_stock", path.join(previewsDir, "link-19.png"), true);

  // Link 22: رابط رعاية الخط التحتي مخصص
  await captureLivePage(page, "https://eworld.dxn2u.com/r/?c=876543210&l=ar", path.join(previewsDir, "link-22.png"), true);

  // 2. High-fidelity dedicated portal previews for protected & PWS links: 16, 17, 18, 20, 21, 23, 24
  for (const [idStr, mock] of Object.entries(portalMockups)) {
    const id = parseInt(idStr, 10);
    const outputPath = path.join(previewsDir, `link-${id}.png`);
    console.log(`Generating high-fidelity portal preview for Link ${id}: ${mock.titleAr}...`);
    const html = getPortalHtml(mock);
    await page.setContent(html);
    await page.waitForTimeout(500);
    await page.screenshot({ path: outputPath, type: "png" });
    console.log(`Saved high-fidelity preview: link-${id}.png`);
  }

  await browser.close();
  console.log("All previews refreshed successfully!");
}

main().catch(err => {
  console.error("Error generating previews:", err);
  process.exit(1);
});
