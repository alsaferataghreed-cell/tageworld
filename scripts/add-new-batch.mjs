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

// 50 New Items Data
export const newLinks = [
  // 1. Official & Help (eWorld)
  {
    id: 26,
    title: "الموقع الرسمي DXN eWorld",
    category: "eworld",
    categoryLabel: "خدمات eWorld",
    url: "https://eworld.dxn2u.com/",
    requiresMemberId: false,
    domain: "eworld.dxn2u.com",
    subtitle: "البوابة العالمية الرسمية لنظام eWorld لخدمات الأعضاء والموزعين",
    badge: "Official Portal",
    flag: "🌐"
  },
  {
    id: 27,
    title: "قصصنا كيف بدأت DXN تاريخياً",
    category: "company",
    categoryLabel: "عن الشركة والفرصة",
    url: "https://www.dxn2u.com/about/",
    requiresMemberId: false,
    domain: "dxn2u.com",
    subtitle: "رحلة تأسيس DXN وقصة نجاحها المستمرة منذ عام 1993",
    badge: "History",
    flag: "📖"
  },
  {
    id: 28,
    title: "نبذة عنا تاريخياً (حول بزنس)",
    category: "company",
    categoryLabel: "عن الشركة والفرصة",
    url: "https://www.dxn2u.com/about/index.php",
    requiresMemberId: false,
    domain: "dxn2u.com",
    subtitle: "فلسفة العمل، الرؤية العالمية، ومنهجية التوسع في عالم الصحة والثراء",
    badge: "Corporate",
    flag: "🏢"
  },
  {
    id: 29,
    title: "الشروط والأحكام مع DXN",
    category: "eworld",
    categoryLabel: "خدمات eWorld",
    url: "https://eworld.dxn2u.com/help/terms/",
    requiresMemberId: false,
    domain: "eworld.dxn2u.com",
    subtitle: "السياسات القانونية والتنظيمية وشروط عضوية وتوزيع منتجات DXN",
    badge: "Legal Terms",
    flag: "⚖️"
  },
  {
    id: 30,
    title: "الأسئلة الشائعة والمكررة في DXN",
    category: "eworld",
    categoryLabel: "خدمات eWorld",
    url: "https://eworld.dxn2u.com/help/faq/",
    requiresMemberId: false,
    domain: "eworld.dxn2u.com",
    subtitle: "إجابات وافية لأهم التساؤلات حول العضوية، النقاط، والطلبات",
    badge: "Help & FAQ",
    flag: "❓"
  },
  {
    id: 31,
    title: "مراكز الخدمة والوكالات الرسمية في eWorld",
    category: "eworld",
    categoryLabel: "خدمات eWorld",
    url: "https://www.dxn2u.com/contact/?lang=ar",
    requiresMemberId: false,
    domain: "dxn2u.com",
    subtitle: "دليل الفروع ونقاط البيع المعتمدة مع دعم كامل للغة العربية",
    badge: "Service Centers",
    flag: "📍"
  },
  {
    id: 32,
    title: "Dxn Global - فيسبوك",
    category: "portals",
    categoryLabel: "البوابات الرسمية",
    url: "https://www.facebook.com/share/1EhAFjxi43/",
    requiresMemberId: false,
    domain: "facebook.com",
    subtitle: "الصفحة الرسمية العالمية لشركة DXN على منصة فيسبوك",
    badge: "Social Media",
    flag: "📘"
  },
  {
    id: 33,
    title: "Dxn Global - إنستاغرام",
    category: "portals",
    categoryLabel: "البوابات الرسمية",
    url: "https://www.instagram.com/dxnglobal_?exln=MXZ0bng2Y3VxcjdvYg==",
    requiresMemberId: false,
    domain: "instagram.com",
    subtitle: "الحساب الرسمي العالمي على إنستغرام لمتابعة الفعاليات والتغطيات",
    badge: "Social Media",
    flag: "📸"
  },

  // Regional Portals
  {
    id: 34,
    title: "DXN تركيا",
    category: "portals",
    categoryLabel: "البوابات الرسمية",
    url: "https://www.dxnturkey.com/",
    requiresMemberId: false,
    domain: "dxnturkey.com",
    subtitle: "البوابة الرسمية لفرع تركيا لخدمات الأعضاء والمبيعات",
    badge: "Official Branch",
    flag: "🇹🇷"
  },
  {
    id: 35,
    title: "DXN HQ - المقر الرئيسي العالمي",
    category: "portals",
    categoryLabel: "البوابات الرسمية",
    url: "https://www.dxn2u.com/",
    requiresMemberId: false,
    domain: "dxn2u.com",
    subtitle: "الموقع المركزي العالمي لإدارة شركة DXN العالمية",
    badge: "Global Headquarters",
    flag: "🏛️"
  },
  {
    id: 36,
    title: "DXN أفريقيا",
    category: "portals",
    categoryLabel: "البوابات الرسمية",
    url: "https://www.dxn2uafrica.com/",
    requiresMemberId: false,
    domain: "dxn2uafrica.com",
    subtitle: "البوابة الإقليمية الموحدة لفروع وعمليات القارة الأفريقية",
    badge: "Regional Hub",
    flag: "🌍"
  },
  {
    id: 37,
    title: "DXN آسيا",
    category: "portals",
    categoryLabel: "البوابات الرسمية",
    url: "https://www.dxn2uasia.com/",
    requiresMemberId: false,
    domain: "dxn2uasia.com",
    subtitle: "البوابة الإقليمية لقارة آسيا لتنسيق الفروع وخدمات الموزعين",
    badge: "Regional Hub",
    flag: "🌏"
  },
  {
    id: 38,
    title: "DXN أوروبا",
    category: "portals",
    categoryLabel: "البوابات الرسمية",
    url: "https://www.dxn2u.eu/",
    requiresMemberId: false,
    domain: "dxn2u.eu",
    subtitle: "البوابة الرسمية المعتمدة لدول الاتحاد الأوروبي",
    badge: "Regional Hub",
    flag: "🇪🇺"
  },
  {
    id: 39,
    title: "DXN أمريكا الجنوبية واللاتينية",
    category: "portals",
    categoryLabel: "البوابات الرسمية",
    url: "https://www.dxn2ulatam.com/",
    requiresMemberId: false,
    domain: "dxn2ulatam.com",
    subtitle: "بوابة أمريكا اللاتينية لدعم دول أمريكا الجنوبية والوسطى",
    badge: "Regional Hub",
    flag: "🇧🇷"
  },
  {
    id: 40,
    title: "DXN الشرق الأوسط والعالم العربي",
    category: "portals",
    categoryLabel: "البوابات الرسمية",
    url: "https://www.dxnarabia.com/",
    requiresMemberId: false,
    domain: "dxnarabia.com",
    subtitle: "بوابة DXN العربية الموحدة: السعودية، الإمارات، الأردن، العراق والمزيد",
    badge: "Regional Hub",
    flag: "🇸🇦"
  },
  {
    id: 41,
    title: "DXN أستراليا",
    category: "portals",
    categoryLabel: "البوابات الرسمية",
    url: "https://www.dxnaus.com.au/",
    requiresMemberId: false,
    domain: "dxnaus.com.au",
    subtitle: "البوابة المعتمدة لخدمات التوزيع وشراء المنتجات في أستراليا",
    badge: "Official Branch",
    flag: "🇦🇺"
  },
  {
    id: 42,
    title: "DXN أمريكا",
    category: "portals",
    categoryLabel: "البوابات الرسمية",
    url: "https://www.dxnusa.com/",
    requiresMemberId: false,
    domain: "dxnusa.com",
    subtitle: "البوابة الرسمية للولايات المتحدة الأمريكية لخدمة الأعضاء والطلبات",
    badge: "Official Branch",
    flag: "🇺🇸"
  },

  // Country Store Links
  {
    id: 43,
    title: "منتجات تركيا",
    category: "stores",
    categoryLabel: "المتاجر حسب الدول",
    url: "https://eworld.dxn2u.com/products/?cat_id=FB&availability=in_stock",
    requiresMemberId: false,
    domain: "eworld.dxn2u.com",
    subtitle: "تصفح وشراء المنتجات المتوفرة فورياً في المخزون لتركيا",
    badge: "Store / Stock",
    flag: "🇹🇷"
  },
  {
    id: 44,
    title: "منتجات البحرين",
    category: "stores",
    categoryLabel: "المتاجر حسب الدول",
    url: "https://eworld.dxn2u.com/products/?cat_id=FB&availability=in_stock",
    requiresMemberId: false,
    domain: "eworld.dxn2u.com",
    subtitle: "قائمة المنتجات الغذائية والمكملات الجاهزة للطلب في البحرين",
    badge: "Store / Stock",
    flag: "🇧🇭"
  },
  {
    id: 45,
    title: "منتجات مصر",
    category: "stores",
    categoryLabel: "المتاجر حسب الدول",
    url: "https://eworld.dxn2u.com/products/?cat_id=FB&availability=in_stock",
    requiresMemberId: false,
    domain: "eworld.dxn2u.com",
    subtitle: "المتجر الإلكتروني لمنتجات DXN المتاحة داخل جمهورية مصر",
    badge: "Store / Stock",
    flag: "🇪🇬"
  },
  {
    id: 46,
    title: "منتجات هونغ كونغ",
    category: "stores",
    categoryLabel: "المتاجر حسب الدول",
    url: "https://eworld.dxn2u.com/products/?cat_id=FB&availability=in_stock",
    requiresMemberId: false,
    domain: "eworld.dxn2u.com",
    subtitle: "شراء منتجات DXN الصحية والمكملات في إقليم هونغ كونغ",
    badge: "Store / Stock",
    flag: "🇭🇰"
  },
  {
    id: 47,
    title: "منتجات إندونيسيا",
    category: "stores",
    categoryLabel: "المتاجر حسب الدول",
    url: "https://eworld.dxn2u.com/products/?cat_id=FB&availability=in_stock",
    requiresMemberId: false,
    domain: "eworld.dxn2u.com",
    subtitle: "تشكيلة منتجات إندونيسيا المتوفرة للتوصيل والطلب المباشر",
    badge: "Store / Stock",
    flag: "🇮🇩"
  },
  {
    id: 48,
    title: "منتجات ماليزيا",
    category: "stores",
    categoryLabel: "المتاجر حسب الدول",
    url: "https://eworld.dxn2u.com/products/?cat_id=FB&availability=in_stock",
    requiresMemberId: false,
    domain: "eworld.dxn2u.com",
    subtitle: "المخزون المركزي والمنتجات الحصرية المتوفرة في ماليزيا",
    badge: "Store / Stock",
    flag: "🇲🇾"
  },
  {
    id: 49,
    title: "منتجات الأردن",
    category: "stores",
    categoryLabel: "المتاجر حسب الدول",
    url: "https://eworld.dxn2u.com/products/?cat_id=FB&availability=in_stock",
    requiresMemberId: false,
    domain: "eworld.dxn2u.com",
    subtitle: "كتالوج المنتجات الصحية المتوفرة للطلب المباشر في الأردن",
    badge: "Store / Stock",
    flag: "🇯🇴"
  },
  {
    id: 50,
    title: "منتجات الكويت",
    category: "stores",
    categoryLabel: "المتاجر حسب الدول",
    url: "https://eworld.dxn2u.com/products/?cat_id=FB&availability=in_stock",
    requiresMemberId: false,
    domain: "eworld.dxn2u.com",
    subtitle: "قائمة منتجات DXN المتوفرة في فروع ومستودعات دولة الكويت",
    badge: "Store / Stock",
    flag: "🇰🇼"
  },
  {
    id: 51,
    title: "منتجات منغوليا",
    category: "stores",
    categoryLabel: "المتاجر حسب الدول",
    url: "https://eworld.dxn2u.com/products/?cat_id=FB&availability=in_stock",
    requiresMemberId: false,
    domain: "eworld.dxn2u.com",
    subtitle: "شراء المكملات والقهوة والمنتجات المتاحة في منغوليا",
    badge: "Store / Stock",
    flag: "🇲🇳"
  },
  {
    id: 52,
    title: "منتجات سلطنة عمان",
    category: "stores",
    categoryLabel: "المتاجر حسب الدول",
    url: "https://eworld.dxn2u.com/products/?cat_id=FB&availability=in_stock",
    requiresMemberId: false,
    domain: "eworld.dxn2u.com",
    subtitle: "المنتجات المعتمدة للشراء والتوصيل داخل سلطنة عُمان",
    badge: "Store / Stock",
    flag: "🇴🇲"
  },
  {
    id: 53,
    title: "منتجات قطر",
    category: "stores",
    categoryLabel: "المتاجر حسب الدول",
    url: "https://eworld.dxn2u.com/products/?cat_id=FB&availability=in_stock",
    requiresMemberId: false,
    domain: "eworld.dxn2u.com",
    subtitle: "المتجر الرسمي لمنتجات DXN في دولة قطر مع التوفر الفوري",
    badge: "Store / Stock",
    flag: "🇶🇦"
  },
  {
    id: 54,
    title: "منتجات السعودية",
    category: "stores",
    categoryLabel: "المتاجر حسب الدول",
    url: "https://eworld.dxn2u.com/products/?cat_id=FB&availability=in_stock",
    requiresMemberId: false,
    domain: "eworld.dxn2u.com",
    subtitle: "المتجر المتكامل لأعضاء المملكة العربية السعودية وكافة المناطق",
    badge: "Store / Stock",
    flag: "🇸🇦"
  },
  {
    id: 55,
    title: "منتجات الإمارات",
    category: "stores",
    categoryLabel: "المتاجر حسب الدول",
    url: "https://eworld.dxn2u.com/products/?cat_id=FB&availability=in_stock",
    requiresMemberId: false,
    domain: "eworld.dxn2u.com",
    subtitle: "شراء منتجات DXN في دبي وأبوظبي والإمارات كافة عبر eWorld",
    badge: "Store / Stock",
    flag: "🇦🇪"
  },
  {
    id: 56,
    title: "منتجات المغرب",
    category: "stores",
    categoryLabel: "المتاجر حسب الدول",
    url: "https://eworld.dxn2u.com/products/?cat_id=FB&availability=in_stock",
    requiresMemberId: false,
    domain: "eworld.dxn2u.com",
    subtitle: "كتالوج المنتجات الصحية المتوفرة رسمياً في المملكة المغربية",
    badge: "Store / Stock",
    flag: "🇲🇦"
  },
  {
    id: 57,
    title: "منتجات نيجيريا",
    category: "stores",
    categoryLabel: "المتاجر حسب الدول",
    url: "https://eworld.dxn2u.com/products/?cat_id=FB&availability=in_stock",
    requiresMemberId: false,
    domain: "eworld.dxn2u.com",
    subtitle: "المخزون المتوفر في أكبر فروع غرب أفريقيا بنيجيريا",
    badge: "Store / Stock",
    flag: "🇳🇬"
  },
  {
    id: 58,
    title: "منتجات جنوب أفريقيا",
    category: "stores",
    categoryLabel: "المتاجر حسب الدول",
    url: "https://eworld.dxn2u.com/products/?cat_id=FB&availability=in_stock",
    requiresMemberId: false,
    domain: "eworld.dxn2u.com",
    subtitle: "المنتجات المتاحة للشراء المباشر في جنوب أفريقيا",
    badge: "Store / Stock",
    flag: "🇿🇦"
  },
  {
    id: 59,
    title: "منتجات بلجيكا ودول أوروبا",
    category: "stores",
    categoryLabel: "المتاجر حسب الدول",
    url: "https://eworld.dxn2u.com/products/?cat_id=FB&availability=in_stock",
    requiresMemberId: false,
    domain: "eworld.dxn2u.com",
    subtitle: "خدمة دول الاتحاد الأوروبي: بلجيكا، ألمانيا، هولندا، فرنسا، بريطانيا وغيرها",
    badge: "Store / Stock",
    flag: "🇪🇺"
  },
  {
    id: 60,
    title: "منتجات أستراليا",
    category: "stores",
    categoryLabel: "المتاجر حسب الدول",
    url: "https://eworld.dxn2u.com/products/?cat_id=FB&availability=in_stock",
    requiresMemberId: false,
    domain: "eworld.dxn2u.com",
    subtitle: "شراء المكملات والمنتجات مع الشحن السريع داخل أستراليا",
    badge: "Store / Stock",
    flag: "🇦🇺"
  },
  {
    id: 61,
    title: "منتجات نيوزيلندا",
    category: "stores",
    categoryLabel: "المتاجر حسب الدول",
    url: "https://eworld.dxn2u.com/products/?cat_id=FB&availability=in_stock",
    requiresMemberId: false,
    domain: "eworld.dxn2u.com",
    subtitle: "المخزون المعتمد لأعضاء وموزعي نيوزيلندا",
    badge: "Store / Stock",
    flag: "🇳🇿"
  },

  // Business & Corporate
  {
    id: 62,
    title: "كيف يعمل هذا العمل (فرصة DXN)",
    category: "company",
    categoryLabel: "عن الشركة والفرصة",
    url: "https://www.dxn2u.com/business/#",
    requiresMemberId: false,
    domain: "dxn2u.com",
    subtitle: "شرح شامل لخطة الأرباح، نسب العمولات، الرتب، ومزايا العضوية",
    badge: "Business Plan",
    flag: "💡"
  },
  {
    id: 63,
    title: "مؤسس الشركة: الداتوك د. ليم سيو جين",
    category: "company",
    categoryLabel: "عن الشركة والفرصة",
    url: "https://www.dxn2u.com/founder/index.php",
    requiresMemberId: false,
    domain: "dxn2u.com",
    subtitle: "السيرة الذاتية ورؤية مؤسس DXN الرائدة في زراعة الفطر الريشي",
    badge: "Founder",
    flag: "🎓"
  },
  {
    id: 64,
    title: "الجوائز وشهادات التقدير العالمية",
    category: "company",
    categoryLabel: "عن الشركة والفرصة",
    url: "https://www.dxn2u.com/award/index.php",
    requiresMemberId: false,
    domain: "dxn2u.com",
    subtitle: "الشهادات الدولية والأوسمة العالمية الممنوحة لجودة منتجات DXN",
    badge: "Awards & Honors",
    flag: "🏆"
  },
  {
    id: 65,
    title: "معرض الصور والفعاليات الرسمية",
    category: "company",
    categoryLabel: "عن الشركة والفرصة",
    url: "https://www.dxn2u.com/gallery/index.php",
    requiresMemberId: false,
    domain: "dxn2u.com",
    subtitle: "أرشيف الصور الفوتوغرافية للمؤتمرات العالمية والرحلات الدولية",
    badge: "Photo Gallery",
    flag: "🖼️"
  },
  {
    id: 66,
    title: "قصص نجاح سفراء التاج (Crown Ambassadors)",
    category: "company",
    categoryLabel: "عن الشركة والفرصة",
    url: "https://www.dxn2u.com/success/index.php",
    requiresMemberId: false,
    domain: "dxn2u.com",
    subtitle: "قصص ملهمة لأبرز قادة DXN وسفراء التاج حول العالم",
    badge: "Success Stories",
    flag: "👑"
  },
  {
    id: 67,
    title: "أخبار الأنشطة والفعاليات عالمياً",
    category: "company",
    categoryLabel: "عن الشركة والفرصة",
    url: "https://www.dxn2u.com/news/index.php",
    requiresMemberId: false,
    domain: "dxn2u.com",
    subtitle: "آخر التحديثات والأخبار الرسمية والفعاليات من إدارة DXN العالمية",
    badge: "Global News",
    flag: "📰"
  },
  {
    id: 68,
    title: "حياة DXN (أسلوب حياة صحي ومستدام)",
    category: "company",
    categoryLabel: "عن الشركة والفرصة",
    url: "https://www.dxn2u.com/dxnlife/index.php",
    requiresMemberId: false,
    domain: "dxn2u.com",
    subtitle: "مفاهيم الصحة والثراء وراحة البال في أسلوب حياة أعضاء DXN",
    badge: "DXN Life",
    flag: "🌱"
  },
  {
    id: 69,
    title: "علاقات المستثمرين والإدارة",
    category: "company",
    categoryLabel: "عن الشركة والفرصة",
    url: "https://www.dxn2u.com/investor-relations/index.php",
    requiresMemberId: false,
    domain: "dxn2u.com",
    subtitle: "البيانات المالية والتقارير السنوية ومعلومات حوكمة الشركة للمستثمرين",
    badge: "Investor Relations",
    flag: "📈"
  },
  {
    id: 70,
    title: "المناقصات وفرص الاستثمار مع DXN",
    category: "company",
    categoryLabel: "عن الشركة والفرصة",
    url: "https://www.dxn2u.com/tender/index.php",
    requiresMemberId: false,
    domain: "dxn2u.com",
    subtitle: "بوابة العطاءات والمناقصات الرسمية لشركاء الأعمال والموردين",
    badge: "Tenders",
    flag: "💼"
  },

  // Official Product Catalog
  {
    id: 71,
    title: "المنتجات الجديدة والمبتكرة",
    category: "catalog",
    categoryLabel: "كتالوج المنتجات",
    url: "https://www.dxn2u.com/product/newprd.php",
    requiresMemberId: false,
    domain: "dxn2u.com",
    subtitle: "أحدث ابتكارات DXN في عالم الصحة والتغذية والعناية الطبيعية",
    badge: "New Products",
    flag: "✨"
  },
  {
    id: 72,
    title: "المكملات الغذائية الصحية",
    category: "catalog",
    categoryLabel: "كتالوج المنتجات",
    url: "https://www.dxn2u.com/product/products.php?cat_id=HDS",
    requiresMemberId: false,
    domain: "dxn2u.com",
    subtitle: "مجموعة المكملات الصحية الكاملة: الريشي، السبيرولينا، والكورديسيبس",
    badge: "Health Supplements",
    flag: "💊"
  },
  {
    id: 73,
    title: "الأغذية والمشروبات الصحية",
    category: "catalog",
    categoryLabel: "كتالوج المنتجات",
    url: "https://www.dxn2u.com/product/products.php?cat_id=FFB",
    requiresMemberId: false,
    domain: "dxn2u.com",
    subtitle: "المشروبات العضوية، أنواع القهوة الفاخرة، والعصائر الطبيعية الصحية",
    badge: "Food & Beverage",
    flag: "☕"
  },
  {
    id: 74,
    title: "العناية الشخصية ومستحضرات التجميل",
    category: "catalog",
    categoryLabel: "كتالوج المنتجات",
    url: "https://www.dxn2u.com/product/products.php?cat_id=PCC",
    requiresMemberId: false,
    domain: "dxn2u.com",
    subtitle: "منتجات العناية بالبشرة والشعر ومستحضرات التجميل العضوية الطبيعية",
    badge: "Personal Care",
    flag: "🧴"
  },
  {
    id: 75,
    title: "منتجات ومعدات أخرى",
    category: "catalog",
    categoryLabel: "كتالوج المنتجات",
    url: "https://www.dxn2u.com/product/products.php?cat_id=OTH",
    requiresMemberId: false,
    domain: "dxn2u.com",
    subtitle: "أنظمة تنقية المياه، الأواني الصحية، والأجهزة المنزلية الذكية",
    badge: "Other Products",
    flag: "📦"
  }
];

// High-fidelity UI generator for fast, gorgeous preview generation
async function renderCardPreviews() {
  console.log("Launching Edge for previews rendering...");
  const browser = await chromium.launch({
    executablePath: "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
    headless: true
  });
  const context = await browser.newContext({
    viewport: { width: 1200, height: 675 },
    deviceScaleFactor: 2
  });
  const page = await context.newPage();

  for (const item of newLinks) {
    const outputPath = path.join(previewsDir, `link-${item.id}.png`);
    if (fs.existsSync(outputPath)) {
      console.log(`Preview already exists: link-${item.id}.png, skipping.`);
      continue;
    }

    const html = `
      <!DOCTYPE html>
      <html dir="rtl" lang="ar">
      <head>
        <meta charset="utf-8">
        <style>
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body {
            width: 1200px;
            height: 675px;
            background: radial-gradient(circle at 15% 15%, #13274F 0%, #0A192F 50%, #050d1a 100%);
            color: #ffffff;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Noto Sans Arabic", "Cairo", sans-serif;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 40px;
            position: relative;
            overflow: hidden;
          }
          .decor-circle {
            position: absolute;
            width: 500px;
            height: 500px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(14, 165, 233, 0.12) 0%, transparent 70%);
            top: -100px;
            right: -100px;
            pointer-events: none;
          }
          .decor-circle-2 {
            position: absolute;
            width: 450px;
            height: 450px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(245, 158, 11, 0.1) 0%, transparent 70%);
            bottom: -80px;
            left: -80px;
            pointer-events: none;
          }
          .card-wrapper {
            width: 100%;
            max-width: 1050px;
            background: rgba(255, 255, 255, 0.04);
            border: 1px solid rgba(255, 255, 255, 0.12);
            border-radius: 32px;
            padding: 55px 65px;
            backdrop-filter: blur(24px);
            box-shadow: 0 25px 60px rgba(0, 0, 0, 0.45);
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            height: 100%;
            position: relative;
            z-index: 2;
          }
          .top-row {
            display: flex;
            align-items: center;
            justify-content: space-between;
          }
          .domain-pill {
            display: inline-flex;
            align-items: center;
            gap: 10px;
            background: rgba(255, 255, 255, 0.08);
            border: 1px solid rgba(255, 255, 255, 0.15);
            padding: 8px 20px;
            border-radius: 9999px;
            font-family: ui-monospace, SFMono-Regular, monospace;
            font-size: 17px;
            color: #93c5fd;
            letter-spacing: 0.5px;
            direction: ltr;
          }
          .badge-pill {
            display: inline-flex;
            align-items: center;
            background: linear-gradient(135deg, rgba(245, 158, 11, 0.2), rgba(245, 158, 11, 0.05));
            border: 1px solid rgba(245, 158, 11, 0.4);
            color: #fbbf24;
            padding: 7px 18px;
            border-radius: 9999px;
            font-size: 15px;
            font-weight: 700;
          }
          .content-mid {
            margin: auto 0;
          }
          .flag-icon {
            font-size: 48px;
            margin-bottom: 12px;
            display: inline-block;
          }
          h1 {
            font-size: 38px;
            font-weight: 800;
            line-height: 1.35;
            color: #ffffff;
            margin-bottom: 16px;
            letter-spacing: -0.5px;
          }
          p {
            font-size: 19px;
            line-height: 1.6;
            color: #cbd5e1;
            max-width: 820px;
          }
          .bottom-bar {
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-top: 1px solid rgba(255, 255, 255, 0.09);
            padding-top: 22px;
          }
          .brand-logo {
            display: flex;
            align-items: center;
            gap: 12px;
          }
          .brand-text {
            font-size: 17px;
            font-weight: 700;
            color: #f8fafc;
            letter-spacing: 1px;
          }
          .brand-sub {
            font-size: 13px;
            color: #64748b;
          }
          .btn-preview {
            background: #ffffff;
            color: #0A192F;
            font-weight: 700;
            font-size: 15px;
            padding: 10px 24px;
            border-radius: 9999px;
            box-shadow: 0 4px 15px rgba(255, 255, 255, 0.2);
            display: inline-flex;
            align-items: center;
            gap: 8px;
          }
        </style>
      </head>
      <body>
        <div class="decor-circle"></div>
        <div class="decor-circle-2"></div>
        <div class="card-wrapper">
          <div class="top-row">
            <div class="domain-pill">
              <span>●</span>
              <span>${item.domain}</span>
            </div>
            <div class="badge-pill">${item.badge}</div>
          </div>
          <div class="content-mid">
            <div class="flag-icon">${item.flag}</div>
            <h1>${item.title}</h1>
            <p>${item.subtitle}</p>
          </div>
          <div class="bottom-bar">
            <div class="brand-logo">
              <div>
                <div class="brand-text">TAG eWorld</div>
                <div class="brand-sub">DXN International Fast Portal</div>
              </div>
            </div>
            <div class="btn-preview">
              <span>فتح الرابط الرسمي</span>
              <span>↗</span>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;

    await page.setContent(html, { waitUntil: "networkidle" });
    await page.screenshot({ path: outputPath, type: "png" });
    console.log(`Generated preview: link-${item.id}.png (${item.title})`);
  }

  await browser.close();
  console.log("All previews generated successfully!");
}

renderCardPreviews().catch(err => {
  console.error("Error generating previews:", err);
  process.exit(1);
});
