/** ------------------------------
 *  الأنواع (Types)
 *  ------------------------------ */
export type ExperienceItem = {
    id?: number;               // رقم تسلسلي اختياري، وإن لم يُمرّر نحسبه تلقائياً
    role: string;              // المسمّى الوظيفي
    org: string;               // الشركة/الفريق
    location?: string;         // الدولة/المدينة (اختياري)
    durationLabel: string;     // مثال: "سنتان" أو "1 سنة" أو "2021 - 2023"
    featured?: boolean;        // لتلوين الكرت الأول بشكل مميّز
  };
  
  export type ExperienceTimelineProps = {
    title?: string;            // عنوان القسم (افتراضي: "الخبرات")
    subtitle?: string;         // سطر وصفي صغير تحت العنوان (اختياري)
    items: ExperienceItem[];   // بيانات الخبرات
    rtl?: boolean;             // دعم اتجاه RTL عند الحاجة
    className?: string;        // لتمرير كلاسات إضافية
  };
  

  
/** -------------------------------------------
 * الأنواع (Types)
 * ------------------------------------------- */
export type StatItem = {
  /** أيقونة lucide-react (مرّرها كقيمة للخاصية Icon) */
  Icon: typeof LucideIcon;
  /** القيمة (يمكن أن تكون number أو string لو عندك تنسيق خاص) */
  value: number | string;
  /** العنوان أسفل الرقم */
  label: string;
  /** اجعل الرقم بحد أدنى خانتين (مثال: 7 → 07) */
  minDigits?: number;
};

export type StatsStripProps = {
  /** عنوان اختياري فوق الشبكة */
  heading?: string;
  /** عناصر الإحصائيات */
  items: StatItem[];
  /** اتجاه RTL اختياري */
  rtl?: boolean;
  /** كلاسات إضافية للراپر */
  className?: string;
};


/** -------------------------------------------------
 *  الأنواع + البيانات
 *  ------------------------------------------------- */
type Feedback = {
  quote: string;
  name: string;
  title: string;
  image: string;  // يمكن استبدالها بـ next/image لاحقًا
};




/** Types */
type Tech = { name: string; iconClass?: string };
  type Project = {
  name: string;
  imageSrc: string;
  imageAlt?: string;
  description: string;
  liveUrl?: string;
  repoUrl?: string;
  techs: Tech[];
  features: string[];
};
