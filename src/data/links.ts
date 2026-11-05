export interface LinkItem {
  id: number;
  title: string;
  category: "top-products" | "vitality" | "eworld";
  categoryLabel: string;
  url: string;
  templateUrl?: string;
  defaultMemberId?: string;
  requiresMemberId: boolean;
  subtitle?: string;
  image: string;
  domain: string;
}

export interface CategoryTab {
  id: "all" | "top-products" | "vitality" | "eworld";
  name: string;
  count: number;
}

export const CATEGORIES: CategoryTab[] = [
  { id: "all", name: "جميع الروابط", count: 24 },
  { id: "top-products", name: "أفضل 5 منتجات", count: 5 },
  { id: "vitality", name: "تعزيز الحيوية", count: 6 },
  { id: "eworld", name: "خدمات eWorld", count: 13 },
];

export const LINKS_DATA: LinkItem[] = [
  // --- أفضل 5 منتجات (1 - 5) ---
  {
    id: 1,
    title: "من أفضل 5 منتجات قهوة DXN",
    category: "top-products",
    categoryLabel: "أفضل 5 منتجات",
    url: "https://www.dxn2u.com/topproduct/index-coffee.php",
    requiresMemberId: false,
    image: "/previews/link-1.png",
    domain: "dxn2u.com",
    subtitle: "استكشف تشكيلة القهوة الصحية الغنية بفطر الجانوديرما",
  },
  {
    id: 2,
    title: "من أفضل 5 منتجات GL . RG",
    category: "top-products",
    categoryLabel: "أفضل 5 منتجات",
    url: "https://www.dxn2u.com/topproduct/index_rg_gl.php",
    requiresMemberId: false,
    image: "/previews/link-2.png",
    domain: "dxn2u.com",
    subtitle: "فطر الريشي الأحمر ومسحوق الميسيليوم لتعزيز التوازن الحيوي",
  },
  {
    id: 3,
    title: "من أفضل 5 منتجات سبيرولينا",
    category: "top-products",
    categoryLabel: "أفضل 5 منتجات",
    url: "https://www.dxn2u.com/topproduct/index-spirulina.php",
    requiresMemberId: false,
    image: "/previews/link-3.png",
    domain: "dxn2u.com",
    subtitle: "الغذاء السوبر الغني بالعناصر الغذائية والمعادن الأساسية",
  },
  {
    id: 4,
    title: "من أفضل 5 منتجات كاكاو كوكوزي",
    category: "top-products",
    categoryLabel: "أفضل 5 منتجات",
    url: "https://www.dxn2u.com/topproduct/index-cocozhi.php",
    requiresMemberId: false,
    image: "/previews/link-4.png",
    domain: "dxn2u.com",
    subtitle: "مشروب الكاكاو الطبيعي الممزوج بمستخلص فطر الجانوديرما",
  },
  {
    id: 5,
    title: "من أفضل 5 منتجات مجموعة جيمبوري",
    category: "top-products",
    categoryLabel: "أفضل 5 منتجات",
    url: "https://www.dxn2u.com/topproduct/index-gempuri.php",
    requiresMemberId: false,
    image: "/previews/link-5.png",
    domain: "dxn2u.com",
    subtitle: "مجموعة العناية الفاخرة بالبشرة بتقنيات مستخلصة من الطبيعة",
  },

  // --- تعزيز الحيوية (6 - 11) ---
  {
    id: 6,
    title: "تعزيز الحيوية منتجات تساعد على الهضم وإزالة السموم",
    category: "vitality",
    categoryLabel: "تعزيز الحيوية",
    url: "https://www.dxn2u.com/elevate/index-digestive.php",
    requiresMemberId: false,
    image: "/previews/link-6.png",
    domain: "dxn2u.com",
    subtitle: "حلول طبيعية لدعم الجهاز الهضمي والتخلص من السموم اليومية",
  },
  {
    id: 7,
    title: "تعزيز الحيوية منتجات العناية بالبشرة والجسم",
    category: "vitality",
    categoryLabel: "تعزيز الحيوية",
    url: "https://www.dxn2u.com/elevate/index-skincare.php",
    requiresMemberId: false,
    image: "/previews/link-7.png",
    domain: "dxn2u.com",
    subtitle: "منتجات طبيعية للعناية المتكاملة بصحة ونضارة البشرة",
  },
  {
    id: 8,
    title: "تعزيز الحيوية المناعة والطاقة",
    category: "vitality",
    categoryLabel: "تعزيز الحيوية",
    url: "https://www.dxn2u.com/elevate/index-immune.php",
    requiresMemberId: false,
    image: "/previews/link-8.png",
    domain: "dxn2u.com",
    subtitle: "دعم الجهاز المناعي وزيادة النشاط والقدرة البدنية",
  },
  {
    id: 9,
    title: "تعزيز الحيوية التغذية اليومية",
    category: "vitality",
    categoryLabel: "تعزيز الحيوية",
    url: "https://www.dxn2u.com/elevate/index-nutrition.php",
    requiresMemberId: false,
    image: "/previews/link-9.png",
    domain: "dxn2u.com",
    subtitle: "المكملات الغذائية اليومية لتلبية احتياجات الجسم الكاملة",
  },
  {
    id: 10,
    title: "تعزيز الحيوية منزل سعيد",
    category: "vitality",
    categoryLabel: "تعزيز الحيوية",
    url: "https://www.dxn2u.com/elevate/index-home.php",
    requiresMemberId: false,
    image: "/previews/link-10.png",
    domain: "dxn2u.com",
    subtitle: "منتجات العناية المنزلية الصديقة للبيئة والآمنة للأسرة",
  },
  {
    id: 11,
    title: "تعزيز الحيوية مطبخ صحي",
    category: "vitality",
    categoryLabel: "تعزيز الحيوية",
    url: "https://www.dxn2u.com/elevate/index-kitchen.php",
    requiresMemberId: false,
    image: "/previews/link-11.png",
    domain: "dxn2u.com",
    subtitle: "أوانٍ وحلول مطبخية ذكية تدعم الطبخ الصحي ونمط الحياة السليم",
  },

  // --- خدمات eWorld (12 - 24) ---
  {
    id: 12,
    title: "إتصل بنا مراكز الخدمة وكالات رسمية في EWORLD",
    category: "eworld",
    categoryLabel: "خدمات eWorld",
    url: "https://www.dxn2u.com/contact/index.php",
    requiresMemberId: false,
    image: "/previews/link-12.png",
    domain: "dxn2u.com",
    subtitle: "ليست كل الوكالات موجودة",
  },
  {
    id: 13,
    title: "أصبح موزعا ضم عضو جديد",
    category: "eworld",
    categoryLabel: "خدمات eWorld",
    url: "https://eworld.dxn2u.com/auth/register/distributor/",
    requiresMemberId: false,
    image: "/previews/link-13.png",
    domain: "eworld.dxn2u.com",
    subtitle: "مع ضرورة إرسال رمز الراعي والدليل",
  },
  {
    id: 14,
    title: "تفعيل الحساب لأول مرة",
    category: "eworld",
    categoryLabel: "خدمات eWorld",
    url: "https://eworld.dxn2u.com/auth/first-login/",
    requiresMemberId: false,
    image: "/previews/link-14.png",
    domain: "eworld.dxn2u.com",
    subtitle: "تفعيل الرمز السري للحساب الجديد في بوابة eWorld",
  },
  {
    id: 15,
    title: "رعاية موزع جديد داخل موقعك eWorld",
    category: "eworld",
    categoryLabel: "خدمات eWorld",
    url: "https://eworld.dxn2u.com/auth/register/distributor/?sponsor_code=123456789",
    templateUrl: "https://eworld.dxn2u.com/auth/register/distributor/?sponsor_code={MEMBER_ID}",
    defaultMemberId: "123456789",
    requiresMemberId: true,
    image: "/previews/link-15.png",
    domain: "eworld.dxn2u.com",
    subtitle: "أدخل رقم عضويتك في الأعلى ليتم وضعه تلقائياً كراعي دليل",
  },
  {
    id: 16,
    title: "معلومات العلاوة",
    category: "eworld",
    categoryLabel: "خدمات eWorld",
    url: "https://eworld.dxn2u.com/bonus-information/bonus-statement/monthly/",
    requiresMemberId: false,
    image: "/previews/link-16.png",
    domain: "eworld.dxn2u.com",
    subtitle: "كشف الحساب الشهري ومعلومات العمولات والأرباح المباشرة",
  },
  {
    id: 17,
    title: "المكافأة المالية خطة SIMP , IOC",
    category: "eworld",
    categoryLabel: "خدمات eWorld",
    url: "https://eworld.dxn2u.com/menu/gain-income/simp-plan/",
    requiresMemberId: false,
    image: "/previews/link-17.png",
    domain: "eworld.dxn2u.com",
    subtitle: "بإمكانك اختيار الاقاليم الذي تريد وتظهر معلومات الخطة المالية له",
  },
  {
    id: 18,
    title: "نشاط الشراء لأعضاء الشبكة لديك",
    category: "eworld",
    categoryLabel: "خدمات eWorld",
    url: "https://eworld.dxn2u.com/marketing/purchase-activity/",
    requiresMemberId: false,
    image: "/previews/link-18.png",
    domain: "eworld.dxn2u.com",
    subtitle: "متابعة حالة الأعضاء: فعال أو غير فعال",
  },
  {
    id: 19,
    title: "الشراء عبر الإنترنت داخل موقعك",
    category: "eworld",
    categoryLabel: "خدمات eWorld",
    url: "https://eworld.dxn2u.com/products/?order_mode=regular&cat_id=FB&availability=in_stock",
    requiresMemberId: false,
    image: "/previews/link-19.png",
    domain: "eworld.dxn2u.com",
    subtitle: "متجر الشراء المباشر لمنتجات DXN المتوفرة في المخزون",
  },
  {
    id: 20,
    title: "الموقع الشخصي",
    category: "eworld",
    categoryLabel: "خدمات eWorld",
    url: "https://eworld.dxn2u.com/menu/personal-website/",
    requiresMemberId: false,
    image: "/previews/link-20.png",
    domain: "eworld.dxn2u.com",
    subtitle: "إدارة وبناء صفحة الموقع الشخصي للموزع داخل النظام",
  },
  {
    id: 21,
    title: "رابط الموقع الإلكتروني الشخصي",
    category: "eworld",
    categoryLabel: "خدمات eWorld",
    url: "https://www.dxnturkey.com/pws/876543210",
    templateUrl: "https://www.dxnturkey.com/pws/{MEMBER_ID}",
    defaultMemberId: "876543210",
    requiresMemberId: true,
    image: "/previews/link-21.png",
    domain: "dxnturkey.com",
    subtitle: "صالح لبعض الأقاليم فقط، يتم تضمين رقم عضويتك تلقائياً",
  },
  {
    id: 22,
    title: "رابط رعاية الخط التحتي مخصص",
    category: "eworld",
    categoryLabel: "خدمات eWorld",
    url: "https://eworld.dxn2u.com/r/?c=876543210&l=ar",
    templateUrl: "https://eworld.dxn2u.com/r/?c={MEMBER_ID}&l=ar",
    defaultMemberId: "876543210",
    requiresMemberId: true,
    image: "/previews/link-22.png",
    domain: "eworld.dxn2u.com",
    subtitle: "يتم تضمين رقم عضويتك تلقائياً في الرابط باللغة العربية",
  },
  {
    id: 23,
    title: "إعداد معلومات موقع eWorld الشخصي",
    category: "eworld",
    categoryLabel: "خدمات eWorld",
    url: "https://eworld.dxn2u.com/dashboard/personal-information/personal-web-setting/",
    requiresMemberId: false,
    image: "/previews/link-23.png",
    domain: "eworld.dxn2u.com",
    subtitle: "تخصيص البيانات والصور ومعلومات التواصل على موقعك الشخصي",
  },
  {
    id: 24,
    title: "مؤهلاتي متابعة الشبكة",
    category: "eworld",
    categoryLabel: "خدمات eWorld",
    url: "https://eworld.dxn2u.com/marketing/ppv-qualification/",
    requiresMemberId: false,
    image: "/previews/link-24.png",
    domain: "eworld.dxn2u.com",
    subtitle: "متابعة النقاط الشخصية والتأهيل الشهري لأعضاء الفريق",
  },
];

/**
 * Resolves the actual URL by replacing {MEMBER_ID} with the user's member ID
 * or falling back to default member ID if not provided.
 */
export function resolveLinkUrl(item: LinkItem, memberId?: string): string {
  if (!item.requiresMemberId || !item.templateUrl) {
    return item.url;
  }
  const cleanId = (memberId && memberId.trim().length > 0) ? memberId.trim() : (item.defaultMemberId || "");
  return item.templateUrl.replace("{MEMBER_ID}", cleanId);
}
