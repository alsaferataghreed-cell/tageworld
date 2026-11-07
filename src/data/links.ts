export interface LinkItem {
  id: number;
  title: string;
  category: "all" | "eworld" | "portals" | "stores" | "catalog" | "company" | "top-products" | "vitality";
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
  id: "all" | "eworld" | "portals" | "stores" | "catalog" | "company" | "top-products" | "vitality";
  name: string;
  count: number;
}

export const CATEGORIES: CategoryTab[] = [
  {
    "id": "all",
    "name": "جميع الروابط",
    "count": 73
  },
  {
    "id": "eworld",
    "name": "خدمات eWorld",
    "count": 16
  },
  {
    "id": "portals",
    "name": "البوابات الرسمية والإقليمية",
    "count": 11
  },
  {
    "id": "stores",
    "name": "المتاجر حسب الدول",
    "count": 19
  },
  {
    "id": "catalog",
    "name": "كتالوج المنتجات",
    "count": 5
  },
  {
    "id": "company",
    "name": "عن الشركة والفرصة",
    "count": 11
  },
  {
    "id": "top-products",
    "name": "أفضل 5 منتجات",
    "count": 5
  },
  {
    "id": "vitality",
    "name": "تعزيز الحيوية",
    "count": 6
  }
];

export const LINKS_DATA: LinkItem[] = [
  {
    "id": 1,
    "title": "من أفضل 5 منتجات قهوة DXN",
    "category": "top-products",
    "categoryLabel": "أفضل 5 منتجات",
    "url": "https://www.dxn2u.com/topproduct/index-coffee.php",
    "requiresMemberId": false,
    "image": "/previews/link-1.webp",
    "domain": "dxn2u.com",
    "subtitle": "استكشف تشكيلة القهوة الصحية الغنية بفطر الجانوديرما"
  },
  {
    "id": 2,
    "title": "من أفضل 5 منتجات GL . RG",
    "category": "top-products",
    "categoryLabel": "أفضل 5 منتجات",
    "url": "https://www.dxn2u.com/topproduct/index_rg_gl.php",
    "requiresMemberId": false,
    "image": "/previews/link-2.webp",
    "domain": "dxn2u.com",
    "subtitle": "فطر الريشي الأحمر ومسحوق الميسيليوم لتعزيز التوازن الحيوي"
  },
  {
    "id": 3,
    "title": "من أفضل 5 منتجات سبيرولينا",
    "category": "top-products",
    "categoryLabel": "أفضل 5 منتجات",
    "url": "https://www.dxn2u.com/topproduct/index-spirulina.php",
    "requiresMemberId": false,
    "image": "/previews/link-3.webp",
    "domain": "dxn2u.com",
    "subtitle": "الغذاء السوبر الغني بالعناصر الغذائية والمعادن الأساسية"
  },
  {
    "id": 4,
    "title": "من أفضل 5 منتجات كاكاو كوكوزي",
    "category": "top-products",
    "categoryLabel": "أفضل 5 منتجات",
    "url": "https://www.dxn2u.com/topproduct/index-cocozhi.php",
    "requiresMemberId": false,
    "image": "/previews/link-4.webp",
    "domain": "dxn2u.com",
    "subtitle": "مشروب الكاكاو الطبيعي الممزوج بمستخلص فطر الجانوديرما"
  },
  {
    "id": 5,
    "title": "من أفضل 5 منتجات مجموعة جيمبوري",
    "category": "top-products",
    "categoryLabel": "أفضل 5 منتجات",
    "url": "https://www.dxn2u.com/topproduct/index-gempuri.php",
    "requiresMemberId": false,
    "image": "/previews/link-5.webp",
    "domain": "dxn2u.com",
    "subtitle": "مجموعة العناية الفاخرة بالبشرة بتقنيات مستخلصة من الطبيعة"
  },
  {
    "id": 6,
    "title": "تعزيز الحيوية منتجات تساعد على الهضم وإزالة السموم",
    "category": "vitality",
    "categoryLabel": "تعزيز الحيوية",
    "url": "https://www.dxn2u.com/elevate/index-digestive.php",
    "requiresMemberId": false,
    "image": "/previews/link-6.webp",
    "domain": "dxn2u.com",
    "subtitle": "حلول طبيعية لدعم الجهاز الهضمي والتخلص من السموم اليومية"
  },
  {
    "id": 7,
    "title": "تعزيز الحيوية منتجات العناية بالبشرة والجسم",
    "category": "vitality",
    "categoryLabel": "تعزيز الحيوية",
    "url": "https://www.dxn2u.com/elevate/index-skincare.php",
    "requiresMemberId": false,
    "image": "/previews/link-7.webp",
    "domain": "dxn2u.com",
    "subtitle": "منتجات طبيعية للعناية المتكاملة بصحة ونضارة البشرة"
  },
  {
    "id": 8,
    "title": "تعزيز الحيوية المناعة والطاقة",
    "category": "vitality",
    "categoryLabel": "تعزيز الحيوية",
    "url": "https://www.dxn2u.com/elevate/index-immune.php",
    "requiresMemberId": false,
    "image": "/previews/link-8.webp",
    "domain": "dxn2u.com",
    "subtitle": "دعم الجهاز المناعي وزيادة النشاط والقدرة البدنية"
  },
  {
    "id": 9,
    "title": "تعزيز الحيوية التغذية اليومية",
    "category": "vitality",
    "categoryLabel": "تعزيز الحيوية",
    "url": "https://www.dxn2u.com/elevate/index-nutrition.php",
    "requiresMemberId": false,
    "image": "/previews/link-9.webp",
    "domain": "dxn2u.com",
    "subtitle": "المكملات الغذائية اليومية لتلبية احتياجات الجسم الكاملة"
  },
  {
    "id": 10,
    "title": "تعزيز الحيوية منزل سعيد",
    "category": "vitality",
    "categoryLabel": "تعزيز الحيوية",
    "url": "https://www.dxn2u.com/elevate/index-home.php",
    "requiresMemberId": false,
    "image": "/previews/link-10.webp",
    "domain": "dxn2u.com",
    "subtitle": "منتجات العناية المنزلية الصديقة للبيئة والآمنة للأسرة"
  },
  {
    "id": 11,
    "title": "تعزيز الحيوية مطبخ صحي",
    "category": "vitality",
    "categoryLabel": "تعزيز الحيوية",
    "url": "https://www.dxn2u.com/elevate/index-kitchen.php",
    "requiresMemberId": false,
    "image": "/previews/link-11.webp",
    "domain": "dxn2u.com",
    "subtitle": "أوانٍ وحلول مطبخية ذكية تدعم الطبخ الصحي ونمط الحياة السليم"
  },
  {
    "id": 12,
    "title": "إتصل بنا مراكز الخدمة وكالات رسمية في EWORLD",
    "category": "eworld",
    "categoryLabel": "خدمات eWorld",
    "url": "https://www.dxn2u.com/contact/index.php",
    "requiresMemberId": false,
    "image": "/previews/link-12.webp",
    "domain": "dxn2u.com",
    "subtitle": "ليست كل الوكالات موجودة"
  },
  {
    "id": 14,
    "title": "تفعيل الحساب لأول مرة",
    "category": "eworld",
    "categoryLabel": "خدمات eWorld",
    "url": "https://eworld.dxn2u.com/auth/first-login/",
    "requiresMemberId": false,
    "image": "/previews/link-14.webp",
    "domain": "eworld.dxn2u.com",
    "subtitle": "تفعيل الرمز السري للحساب الجديد في بوابة eWorld"
  },
  {
    "id": 16,
    "title": "معلومات العلاوة",
    "category": "eworld",
    "categoryLabel": "خدمات eWorld",
    "url": "https://eworld.dxn2u.com/bonus-information/bonus-statement/monthly/",
    "requiresMemberId": false,
    "image": "/previews/link-16.webp",
    "domain": "eworld.dxn2u.com",
    "subtitle": "كشف الحساب الشهري ومعلومات العمولات والأرباح المباشرة"
  },
  {
    "id": 17,
    "title": "المكافأة المالية خطة SIMP , IOC",
    "category": "eworld",
    "categoryLabel": "خدمات eWorld",
    "url": "https://eworld.dxn2u.com/menu/gain-income/simp-plan/",
    "requiresMemberId": false,
    "image": "/previews/link-17.webp",
    "domain": "eworld.dxn2u.com",
    "subtitle": "بإمكانك اختيار الاقاليم الذي تريد وتظهر معلومات الخطة المالية له"
  },
  {
    "id": 18,
    "title": "نشاط الشراء لأعضاء الشبكة لديك",
    "category": "eworld",
    "categoryLabel": "خدمات eWorld",
    "url": "https://eworld.dxn2u.com/marketing/purchase-activity/",
    "requiresMemberId": false,
    "image": "/previews/link-18.webp",
    "domain": "eworld.dxn2u.com",
    "subtitle": "متابعة حالة الأعضاء: فعال أو غير فعال"
  },
  {
    "id": 19,
    "title": "الشراء عبر الإنترنت داخل موقعك",
    "category": "eworld",
    "categoryLabel": "خدمات eWorld",
    "url": "https://eworld.dxn2u.com/products/?order_mode=regular&cat_id=FB&availability=in_stock",
    "requiresMemberId": false,
    "image": "/previews/link-19.webp",
    "domain": "eworld.dxn2u.com",
    "subtitle": "متجر الشراء المباشر لمنتجات DXN المتوفرة في المخزون"
  },
  {
    "id": 20,
    "title": "المعلومات الشخصية",
    "category": "eworld",
    "categoryLabel": "خدمات eWorld",
    "url": "https://eworld.dxn2u.com/menu/personal-website/",
    "requiresMemberId": false,
    "image": "/previews/link-20.webp",
    "domain": "eworld.dxn2u.com",
    "subtitle": "إدارة وبناء صفحة الموقع الشخصي للموزع داخل النظام"
  },
  {
    "id": 21,
    "title": "رابط الموقع الإلكتروني الشخصي",
    "category": "eworld",
    "categoryLabel": "خدمات eWorld",
    "url": "https://www.dxnturkey.com/pws/876543210",
    "templateUrl": "https://www.dxnturkey.com/pws/{MEMBER_ID}",
    "defaultMemberId": "876543210",
    "requiresMemberId": true,
    "image": "/previews/link-21.webp",
    "domain": "dxnturkey.com",
    "subtitle": "صالح لبعض الأقاليم فقط، يتم تضمين رقم عضويتك تلقائياً"
  },
  {
    "id": 22,
    "title": "رابط تسجيل العضو الجديد معك مباشر (باللغة العربية)",
    "category": "eworld",
    "categoryLabel": "خدمات eWorld",
    "url": "https://eworld.dxn2u.com/r/?c=876543210&l=ar",
    "templateUrl": "https://eworld.dxn2u.com/r/?c={MEMBER_ID}&l=ar",
    "defaultMemberId": "876543210",
    "requiresMemberId": true,
    "image": "/previews/link-22.webp",
    "domain": "eworld.dxn2u.com",
    "subtitle": "يتم تضمين رقم عضويتك تلقائياً في الرابط باللغة العربية"
  },
  {
    "id": 25,
    "title": "رابط تسجيل العضو الجديد معك مباشر (باللغة الإنجليزية)",
    "category": "eworld",
    "categoryLabel": "خدمات eWorld",
    "url": "https://eworld.dxn2u.com/r/?c=876543210&l=en",
    "templateUrl": "https://eworld.dxn2u.com/r/?c={MEMBER_ID}&l=en",
    "defaultMemberId": "876543210",
    "requiresMemberId": true,
    "image": "/previews/link-25.webp",
    "domain": "eworld.dxn2u.com",
    "subtitle": "يتم تضمين رقم عضويتك تلقائياً في الرابط باللغة الإنجليزية"
  },
  {
    "id": 23,
    "title": "إعداد معلومات موقع eWorld الشخصي",
    "category": "eworld",
    "categoryLabel": "خدمات eWorld",
    "url": "https://eworld.dxn2u.com/dashboard/personal-information/personal-web-setting/",
    "requiresMemberId": false,
    "image": "/previews/link-23.webp",
    "domain": "eworld.dxn2u.com",
    "subtitle": "تخصيص البيانات والصور ومعلومات التواصل على موقعك الشخصي"
  },
  {
    "id": 24,
    "title": "مؤهلاتي متابعة الشبكة",
    "category": "eworld",
    "categoryLabel": "خدمات eWorld",
    "url": "https://eworld.dxn2u.com/marketing/ppv-qualification/",
    "requiresMemberId": false,
    "image": "/previews/link-24.webp",
    "domain": "eworld.dxn2u.com",
    "subtitle": "متابعة النقاط الشخصية والتأهيل الشهري لأعضاء الفريق"
  },
  {
    "id": 26,
    "title": "الموقع الرسمي DXN eWorld",
    "category": "eworld",
    "categoryLabel": "خدمات eWorld",
    "url": "https://eworld.dxn2u.com/",
    "requiresMemberId": false,
    "image": "/previews/link-26.webp",
    "domain": "eworld.dxn2u.com",
    "subtitle": "البوابة العالمية الرسمية لنظام eWorld لخدمات الأعضاء والموزعين"
  },
  {
    "id": 27,
    "title": "قصصنا كيف بدأت DXN تاريخياً",
    "category": "company",
    "categoryLabel": "عن الشركة والفرصة",
    "url": "https://www.dxn2u.com/about/",
    "requiresMemberId": false,
    "image": "/previews/link-27.webp",
    "domain": "dxn2u.com",
    "subtitle": "رحلة تأسيس DXN وقصة نجاحها المستمرة منذ عام 1993"
  },
  {
    "id": 28,
    "title": "نبذة عنا تاريخياً (حول بزنس)",
    "category": "company",
    "categoryLabel": "عن الشركة والفرصة",
    "url": "https://www.dxn2u.com/about/index.php",
    "requiresMemberId": false,
    "image": "/previews/link-28.webp",
    "domain": "dxn2u.com",
    "subtitle": "فلسفة العمل، الرؤية العالمية، ومنهجية التوسع في عالم الصحة والثراء"
  },
  {
    "id": 29,
    "title": "الشروط والأحكام مع DXN",
    "category": "eworld",
    "categoryLabel": "خدمات eWorld",
    "url": "https://eworld.dxn2u.com/help/terms/",
    "requiresMemberId": false,
    "image": "/previews/link-29.webp",
    "domain": "eworld.dxn2u.com",
    "subtitle": "السياسات القانونية والتنظيمية وشروط عضوية وتوزيع منتجات DXN"
  },
  {
    "id": 30,
    "title": "الأسئلة الشائعة والمكررة في DXN",
    "category": "eworld",
    "categoryLabel": "خدمات eWorld",
    "url": "https://eworld.dxn2u.com/help/faq/",
    "requiresMemberId": false,
    "image": "/previews/link-30.webp",
    "domain": "eworld.dxn2u.com",
    "subtitle": "إجابات وافية لأهم التساؤلات حول العضوية، النقاط، والطلبات"
  },
  {
    "id": 31,
    "title": "مراكز الخدمة والوكالات الرسمية في eWorld",
    "category": "eworld",
    "categoryLabel": "خدمات eWorld",
    "url": "https://www.dxn2u.com/contact/?lang=ar",
    "requiresMemberId": false,
    "image": "/previews/link-31.webp",
    "domain": "dxn2u.com",
    "subtitle": "دليل الفروع ونقاط البيع المعتمدة مع دعم كامل للغة العربية"
  },
  {
    "id": 32,
    "title": "Dxn Global - فيسبوك",
    "category": "portals",
    "categoryLabel": "البوابات الرسمية",
    "url": "https://www.facebook.com/share/1EhAFjxi43/",
    "requiresMemberId": false,
    "image": "/previews/link-32.webp",
    "domain": "facebook.com",
    "subtitle": "الصفحة الرسمية العالمية لشركة DXN على منصة فيسبوك"
  },
  {
    "id": 33,
    "title": "Dxn Global - إنستاغرام",
    "category": "portals",
    "categoryLabel": "البوابات الرسمية",
    "url": "https://www.instagram.com/dxnglobal_?exln=MXZ0bng2Y3VxcjdvYg==",
    "requiresMemberId": false,
    "image": "/previews/link-33.webp",
    "domain": "instagram.com",
    "subtitle": "الحساب الرسمي العالمي على إنستغرام لمتابعة الفعاليات والتغطيات"
  },
  {
    "id": 34,
    "title": "DXN تركيا",
    "category": "portals",
    "categoryLabel": "البوابات الرسمية",
    "url": "https://www.dxnturkey.com/",
    "requiresMemberId": false,
    "image": "/previews/link-34.webp",
    "domain": "dxnturkey.com",
    "subtitle": "البوابة الرسمية لفرع تركيا لخدمات الأعضاء والمبيعات"
  },
  {
    "id": 35,
    "title": "DXN HQ - المقر الرئيسي العالمي",
    "category": "portals",
    "categoryLabel": "البوابات الرسمية",
    "url": "https://www.dxn2u.com/",
    "requiresMemberId": false,
    "image": "/previews/link-35.webp",
    "domain": "dxn2u.com",
    "subtitle": "الموقع المركزي العالمي لإدارة شركة DXN العالمية"
  },
  {
    "id": 36,
    "title": "DXN أفريقيا",
    "category": "portals",
    "categoryLabel": "البوابات الرسمية",
    "url": "https://www.dxn2uafrica.com/",
    "requiresMemberId": false,
    "image": "/previews/link-36.webp",
    "domain": "dxn2uafrica.com",
    "subtitle": "البوابة الإقليمية الموحدة لفروع وعمليات القارة الأفريقية"
  },
  {
    "id": 37,
    "title": "DXN آسيا",
    "category": "portals",
    "categoryLabel": "البوابات الرسمية",
    "url": "https://www.dxn2uasia.com/",
    "requiresMemberId": false,
    "image": "/previews/link-37.webp",
    "domain": "dxn2uasia.com",
    "subtitle": "البوابة الإقليمية لقارة آسيا لتنسيق الفروع وخدمات الموزعين"
  },
  {
    "id": 38,
    "title": "DXN أوروبا",
    "category": "portals",
    "categoryLabel": "البوابات الرسمية",
    "url": "https://www.dxn2u.eu/",
    "requiresMemberId": false,
    "image": "/previews/link-38.webp",
    "domain": "dxn2u.eu",
    "subtitle": "البوابة الرسمية المعتمدة لدول الاتحاد الأوروبي"
  },
  {
    "id": 39,
    "title": "DXN أمريكا الجنوبية واللاتينية",
    "category": "portals",
    "categoryLabel": "البوابات الرسمية",
    "url": "https://www.dxn2ulatam.com/",
    "requiresMemberId": false,
    "image": "/previews/link-39.webp",
    "domain": "dxn2ulatam.com",
    "subtitle": "بوابة أمريكا اللاتينية لدعم دول أمريكا الجنوبية والوسطى"
  },
  {
    "id": 40,
    "title": "DXN الشرق الأوسط والعالم العربي",
    "category": "portals",
    "categoryLabel": "البوابات الرسمية",
    "url": "https://www.dxnarabia.com/",
    "requiresMemberId": false,
    "image": "/previews/link-40.webp",
    "domain": "dxnarabia.com",
    "subtitle": "بوابة DXN العربية الموحدة: السعودية، الإمارات، الأردن، العراق والمزيد"
  },
  {
    "id": 41,
    "title": "DXN أستراليا",
    "category": "portals",
    "categoryLabel": "البوابات الرسمية",
    "url": "https://www.dxnaus.com.au/",
    "requiresMemberId": false,
    "image": "/previews/link-41.webp",
    "domain": "dxnaus.com.au",
    "subtitle": "البوابة المعتمدة لخدمات التوزيع وشراء المنتجات في أستراليا"
  },
  {
    "id": 42,
    "title": "DXN أمريكا",
    "category": "portals",
    "categoryLabel": "البوابات الرسمية",
    "url": "https://www.dxnusa.com/",
    "requiresMemberId": false,
    "image": "/previews/link-42.webp",
    "domain": "dxnusa.com",
    "subtitle": "البوابة الرسمية للولايات المتحدة الأمريكية لخدمة الأعضاء والطلبات"
  },
  {
    "id": 43,
    "title": "منتجات تركيا",
    "category": "stores",
    "categoryLabel": "المتاجر حسب الدول",
    "url": "https://eworld.dxn2u.com/products/?cat_id=FB&availability=in_stock",
    "requiresMemberId": false,
    "image": "/previews/link-43.webp",
    "domain": "eworld.dxn2u.com",
    "subtitle": "تصفح وشراء المنتجات المتوفرة فورياً في المخزون لتركيا"
  },
  {
    "id": 44,
    "title": "منتجات البحرين",
    "category": "stores",
    "categoryLabel": "المتاجر حسب الدول",
    "url": "https://eworld.dxn2u.com/products/?cat_id=FB&availability=in_stock",
    "requiresMemberId": false,
    "image": "/previews/link-44.webp",
    "domain": "eworld.dxn2u.com",
    "subtitle": "قائمة المنتجات الغذائية والمكملات الجاهزة للطلب في البحرين"
  },
  {
    "id": 45,
    "title": "منتجات مصر",
    "category": "stores",
    "categoryLabel": "المتاجر حسب الدول",
    "url": "https://eworld.dxn2u.com/products/?cat_id=FB&availability=in_stock",
    "requiresMemberId": false,
    "image": "/previews/link-45.webp",
    "domain": "eworld.dxn2u.com",
    "subtitle": "المتجر الإلكتروني لمنتجات DXN المتاحة داخل جمهورية مصر"
  },
  {
    "id": 46,
    "title": "منتجات هونغ كونغ",
    "category": "stores",
    "categoryLabel": "المتاجر حسب الدول",
    "url": "https://eworld.dxn2u.com/products/?cat_id=FB&availability=in_stock",
    "requiresMemberId": false,
    "image": "/previews/link-46.webp",
    "domain": "eworld.dxn2u.com",
    "subtitle": "شراء منتجات DXN الصحية والمكملات في إقليم هونغ كونغ"
  },
  {
    "id": 47,
    "title": "منتجات إندونيسيا",
    "category": "stores",
    "categoryLabel": "المتاجر حسب الدول",
    "url": "https://eworld.dxn2u.com/products/?cat_id=FB&availability=in_stock",
    "requiresMemberId": false,
    "image": "/previews/link-47.webp",
    "domain": "eworld.dxn2u.com",
    "subtitle": "تشكيلة منتجات إندونيسيا المتوفرة للتوصيل والطلب المباشر"
  },
  {
    "id": 48,
    "title": "منتجات ماليزيا",
    "category": "stores",
    "categoryLabel": "المتاجر حسب الدول",
    "url": "https://eworld.dxn2u.com/products/?cat_id=FB&availability=in_stock",
    "requiresMemberId": false,
    "image": "/previews/link-48.webp",
    "domain": "eworld.dxn2u.com",
    "subtitle": "المخزون المركزي والمنتجات الحصرية المتوفرة في ماليزيا"
  },
  {
    "id": 49,
    "title": "منتجات الأردن",
    "category": "stores",
    "categoryLabel": "المتاجر حسب الدول",
    "url": "https://eworld.dxn2u.com/products/?cat_id=FB&availability=in_stock",
    "requiresMemberId": false,
    "image": "/previews/link-49.webp",
    "domain": "eworld.dxn2u.com",
    "subtitle": "كتالوج المنتجات الصحية المتوفرة للطلب المباشر في الأردن"
  },
  {
    "id": 50,
    "title": "منتجات الكويت",
    "category": "stores",
    "categoryLabel": "المتاجر حسب الدول",
    "url": "https://eworld.dxn2u.com/products/?cat_id=FB&availability=in_stock",
    "requiresMemberId": false,
    "image": "/previews/link-50.webp",
    "domain": "eworld.dxn2u.com",
    "subtitle": "قائمة منتجات DXN المتوفرة في فروع ومستودعات دولة الكويت"
  },
  {
    "id": 51,
    "title": "منتجات منغوليا",
    "category": "stores",
    "categoryLabel": "المتاجر حسب الدول",
    "url": "https://eworld.dxn2u.com/products/?cat_id=FB&availability=in_stock",
    "requiresMemberId": false,
    "image": "/previews/link-51.webp",
    "domain": "eworld.dxn2u.com",
    "subtitle": "شراء المكملات والقهوة والمنتجات المتاحة في منغوليا"
  },
  {
    "id": 52,
    "title": "منتجات سلطنة عمان",
    "category": "stores",
    "categoryLabel": "المتاجر حسب الدول",
    "url": "https://eworld.dxn2u.com/products/?cat_id=FB&availability=in_stock",
    "requiresMemberId": false,
    "image": "/previews/link-52.webp",
    "domain": "eworld.dxn2u.com",
    "subtitle": "المنتجات المعتمدة للشراء والتوصيل داخل سلطنة عُمان"
  },
  {
    "id": 53,
    "title": "منتجات قطر",
    "category": "stores",
    "categoryLabel": "المتاجر حسب الدول",
    "url": "https://eworld.dxn2u.com/products/?cat_id=FB&availability=in_stock",
    "requiresMemberId": false,
    "image": "/previews/link-53.webp",
    "domain": "eworld.dxn2u.com",
    "subtitle": "المتجر الرسمي لمنتجات DXN في دولة قطر مع التوفر الفوري"
  },
  {
    "id": 54,
    "title": "منتجات السعودية",
    "category": "stores",
    "categoryLabel": "المتاجر حسب الدول",
    "url": "https://eworld.dxn2u.com/products/?cat_id=FB&availability=in_stock",
    "requiresMemberId": false,
    "image": "/previews/link-54.webp",
    "domain": "eworld.dxn2u.com",
    "subtitle": "المتجر المتكامل لأعضاء المملكة العربية السعودية وكافة المناطق"
  },
  {
    "id": 55,
    "title": "منتجات الإمارات",
    "category": "stores",
    "categoryLabel": "المتاجر حسب الدول",
    "url": "https://eworld.dxn2u.com/products/?cat_id=FB&availability=in_stock",
    "requiresMemberId": false,
    "image": "/previews/link-55.webp",
    "domain": "eworld.dxn2u.com",
    "subtitle": "شراء منتجات DXN في دبي وأبوظبي والإمارات كافة عبر eWorld"
  },
  {
    "id": 56,
    "title": "منتجات المغرب",
    "category": "stores",
    "categoryLabel": "المتاجر حسب الدول",
    "url": "https://eworld.dxn2u.com/products/?cat_id=FB&availability=in_stock",
    "requiresMemberId": false,
    "image": "/previews/link-56.webp",
    "domain": "eworld.dxn2u.com",
    "subtitle": "كتالوج المنتجات الصحية المتوفرة رسمياً في المملكة المغربية"
  },
  {
    "id": 57,
    "title": "منتجات نيجيريا",
    "category": "stores",
    "categoryLabel": "المتاجر حسب الدول",
    "url": "https://eworld.dxn2u.com/products/?cat_id=FB&availability=in_stock",
    "requiresMemberId": false,
    "image": "/previews/link-57.webp",
    "domain": "eworld.dxn2u.com",
    "subtitle": "المخزون المتوفر في أكبر فروع غرب أفريقيا بنيجيريا"
  },
  {
    "id": 58,
    "title": "منتجات جنوب أفريقيا",
    "category": "stores",
    "categoryLabel": "المتاجر حسب الدول",
    "url": "https://eworld.dxn2u.com/products/?cat_id=FB&availability=in_stock",
    "requiresMemberId": false,
    "image": "/previews/link-58.webp",
    "domain": "eworld.dxn2u.com",
    "subtitle": "المنتجات المتاحة للشراء المباشر في جنوب أفريقيا"
  },
  {
    "id": 59,
    "title": "منتجات بلجيكا ودول أوروبا",
    "category": "stores",
    "categoryLabel": "المتاجر حسب الدول",
    "url": "https://eworld.dxn2u.com/products/?cat_id=FB&availability=in_stock",
    "requiresMemberId": false,
    "image": "/previews/link-59.webp",
    "domain": "eworld.dxn2u.com",
    "subtitle": "خدمة دول الاتحاد الأوروبي: بلجيكا، ألمانيا، هولندا، فرنسا، بريطانيا وغيرها"
  },
  {
    "id": 60,
    "title": "منتجات أستراليا",
    "category": "stores",
    "categoryLabel": "المتاجر حسب الدول",
    "url": "https://eworld.dxn2u.com/products/?cat_id=FB&availability=in_stock",
    "requiresMemberId": false,
    "image": "/previews/link-60.webp",
    "domain": "eworld.dxn2u.com",
    "subtitle": "شراء المكملات والمنتجات مع الشحن السريع داخل أستراليا"
  },
  {
    "id": 61,
    "title": "منتجات نيوزيلندا",
    "category": "stores",
    "categoryLabel": "المتاجر حسب الدول",
    "url": "https://eworld.dxn2u.com/products/?cat_id=FB&availability=in_stock",
    "requiresMemberId": false,
    "image": "/previews/link-61.webp",
    "domain": "eworld.dxn2u.com",
    "subtitle": "المخزون المعتمد لأعضاء وموزعي نيوزيلندا"
  },
  {
    "id": 62,
    "title": "كيف يعمل هذا العمل (فرصة DXN)",
    "category": "company",
    "categoryLabel": "عن الشركة والفرصة",
    "url": "https://www.dxn2u.com/business/#",
    "requiresMemberId": false,
    "image": "/previews/link-62.webp",
    "domain": "dxn2u.com",
    "subtitle": "شرح شامل لخطة الأرباح، نسب العمولات، الرتب، ومزايا العضوية"
  },
  {
    "id": 63,
    "title": "مؤسس الشركة: الداتوك د. ليم سيو جين",
    "category": "company",
    "categoryLabel": "عن الشركة والفرصة",
    "url": "https://www.dxn2u.com/founder/index.php",
    "requiresMemberId": false,
    "image": "/previews/link-63.webp",
    "domain": "dxn2u.com",
    "subtitle": "السيرة الذاتية ورؤية مؤسس DXN الرائدة في زراعة الفطر الريشي"
  },
  {
    "id": 64,
    "title": "الجوائز وشهادات التقدير العالمية",
    "category": "company",
    "categoryLabel": "عن الشركة والفرصة",
    "url": "https://www.dxn2u.com/award/index.php",
    "requiresMemberId": false,
    "image": "/previews/link-64.webp",
    "domain": "dxn2u.com",
    "subtitle": "الشهادات الدولية والأوسمة العالمية الممنوحة لجودة منتجات DXN"
  },
  {
    "id": 65,
    "title": "معرض الصور والفعاليات الرسمية",
    "category": "company",
    "categoryLabel": "عن الشركة والفرصة",
    "url": "https://www.dxn2u.com/gallery/index.php",
    "requiresMemberId": false,
    "image": "/previews/link-65.webp",
    "domain": "dxn2u.com",
    "subtitle": "أرشيف الصور الفوتوغرافية للمؤتمرات العالمية والرحلات الدولية"
  },
  {
    "id": 66,
    "title": "قصص نجاح سفراء التاج (Crown Ambassadors)",
    "category": "company",
    "categoryLabel": "عن الشركة والفرصة",
    "url": "https://www.dxn2u.com/success/index.php",
    "requiresMemberId": false,
    "image": "/previews/link-66.webp",
    "domain": "dxn2u.com",
    "subtitle": "قصص ملهمة لأبرز قادة DXN وسفراء التاج حول العالم"
  },
  {
    "id": 67,
    "title": "أخبار الأنشطة والفعاليات عالمياً",
    "category": "company",
    "categoryLabel": "عن الشركة والفرصة",
    "url": "https://www.dxn2u.com/news/index.php",
    "requiresMemberId": false,
    "image": "/previews/link-67.webp",
    "domain": "dxn2u.com",
    "subtitle": "آخر التحديثات والأخبار الرسمية والفعاليات من إدارة DXN العالمية"
  },
  {
    "id": 68,
    "title": "حياة DXN (أسلوب حياة صحي ومستدام)",
    "category": "company",
    "categoryLabel": "عن الشركة والفرصة",
    "url": "https://www.dxn2u.com/dxnlife/index.php",
    "requiresMemberId": false,
    "image": "/previews/link-68.webp",
    "domain": "dxn2u.com",
    "subtitle": "مفاهيم الصحة والثراء وراحة البال في أسلوب حياة أعضاء DXN"
  },
  {
    "id": 69,
    "title": "علاقات المستثمرين والإدارة",
    "category": "company",
    "categoryLabel": "عن الشركة والفرصة",
    "url": "https://www.dxn2u.com/investor-relations/index.php",
    "requiresMemberId": false,
    "image": "/previews/link-69.webp",
    "domain": "dxn2u.com",
    "subtitle": "البيانات المالية والتقارير السنوية ومعلومات حوكمة الشركة للمستثمرين"
  },
  {
    "id": 70,
    "title": "المناقصات وفرص الاستثمار مع DXN",
    "category": "company",
    "categoryLabel": "عن الشركة والفرصة",
    "url": "https://www.dxn2u.com/tender/index.php",
    "requiresMemberId": false,
    "image": "/previews/link-70.webp",
    "domain": "dxn2u.com",
    "subtitle": "بوابة العطاءات والمناقصات الرسمية لشركاء الأعمال والموردين"
  },
  {
    "id": 71,
    "title": "المنتجات الجديدة والمبتكرة",
    "category": "catalog",
    "categoryLabel": "كتالوج المنتجات",
    "url": "https://www.dxn2u.com/product/newprd.php",
    "requiresMemberId": false,
    "image": "/previews/link-71.webp",
    "domain": "dxn2u.com",
    "subtitle": "أحدث ابتكارات DXN في عالم الصحة والتغذية والعناية الطبيعية"
  },
  {
    "id": 72,
    "title": "المكملات الغذائية الصحية",
    "category": "catalog",
    "categoryLabel": "كتالوج المنتجات",
    "url": "https://www.dxn2u.com/product/products.php?cat_id=HDS",
    "requiresMemberId": false,
    "image": "/previews/link-72.webp",
    "domain": "dxn2u.com",
    "subtitle": "مجموعة المكملات الصحية الكاملة: الريشي، السبيرولينا، والكورديسيبس"
  },
  {
    "id": 73,
    "title": "الأغذية والمشروبات الصحية",
    "category": "catalog",
    "categoryLabel": "كتالوج المنتجات",
    "url": "https://www.dxn2u.com/product/products.php?cat_id=FFB",
    "requiresMemberId": false,
    "image": "/previews/link-73.webp",
    "domain": "dxn2u.com",
    "subtitle": "المشروبات العضوية، أنواع القهوة الفاخرة، والعصائر الطبيعية الصحية"
  },
  {
    "id": 74,
    "title": "العناية الشخصية ومستحضرات التجميل",
    "category": "catalog",
    "categoryLabel": "كتالوج المنتجات",
    "url": "https://www.dxn2u.com/product/products.php?cat_id=PCC",
    "requiresMemberId": false,
    "image": "/previews/link-74.webp",
    "domain": "dxn2u.com",
    "subtitle": "منتجات العناية بالبشرة والشعر ومستحضرات التجميل العضوية الطبيعية"
  },
  {
    "id": 75,
    "title": "منتجات ومعدات أخرى",
    "category": "catalog",
    "categoryLabel": "كتالوج المنتجات",
    "url": "https://www.dxn2u.com/product/products.php?cat_id=OTH",
    "requiresMemberId": false,
    "image": "/previews/link-75.webp",
    "domain": "dxn2u.com",
    "subtitle": "أنظمة تنقية المياه، الأواني الصحية، والأجهزة المنزلية الذكية"
  }
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
