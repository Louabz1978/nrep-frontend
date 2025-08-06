const news = [
  {
    title: "إطلاق مشروع إسكاني جديد في دمشق بتمويل صيني",
    desc: "أعلنت وزارة الأشغال العامة عن بدء العمل في مشروع سكني جديد في منطقة دمشق الجديدة، بتمويل صيني وباستثمارات تصل إلى 500 مليون دولار، يتضمن 2500 وحدة سكنية موجهة للأسر المتوسطة الدخل.",
  },
  {
    title: "تسهيلات جديدة لترميم المنازل المتضررة في حلب",
    desc: "أصدرت محافظة حلب تعميماً يسمح بإعفاء تراخيص البناء لترميم المنازل المتضررة من الرسوم الحكومية لمدة عام كامل، مع تقديم قروض ميسرة من المصرف العقاري بنسبة فائدة 3%.",
  },
  {
    title: "انخفاض أسعار الإسمنت المحلي بنسبة 15% بعد افتتاح خط إنتاج جديد",
    desc: "سجلت أسعار مواد البناء انخفاضاً ملحوظاً في السوق السوري بعد افتتاح خط الإنتاج الجديد في مصنع اسمنت عدرا، حيث وصل سعر الطن إلى 120 ألف ليرة سورية بعد أن كان 140 ألفاً.",
  },
  {
    title: "إطلاق منصة إلكترونية جديدة لتسجيل عقود الإيجار",
    desc: "أعلنت وزارة الإدارة المحلية عن إطلاق منصة إلكترونية تتيح للمواطنين تسجيل عقود الإيجار إلكترونياً، بهدف تسهيل الإجراءات وتقليل الازدحام في الدوائر الحكومية.",
  },
];

const NewsNotificationsCard = () => (
  <div className="bg-tertiary-bg shadow-primary-shadow rounded-[var(--spacing-2xl)]  p-[var(--spacing-xl)] h-full flex flex-col justify-between">
    <h2 className="text-size24 font-semibold text-right mb-[var(--spacing-lg)] text-secondary-fg">
      أخبار عقارية سورية
    </h2>
    <div className="flex-1 flex flex-col gap-6">
      {news.map((item, idx) => (
        <div
          key={idx}
          className="text-right border-b border-quaternary-border pb-4 last:border-0"
        >
          <div className="font-bold text-lg mb-2 text-secondary-fg">{item.title}</div>
          <div className="text-sm text-quaternary-border leading-relaxed mb-3 text-justify">
            {item.desc}
          </div>
          <div className="flex justify-between items-center">
            <span className="text-quaternary-border text-xs">
              {new Date().toLocaleDateString("ar-SY", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            <a
              href="#"
              className="text-digital-green-bg text-xs font-medium hover:underline flex items-center"
            >
              التفاصيل الكاملة
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3 w-3 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </a>
          </div>
        </div>
      ))}
    </div>
    <button className="mt-6 text-digital-green-bg text-sm font-semibold hover:underline self-end flex items-center">
      المزيد من الأخبار
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4 mr-1"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M10 19l-7-7m0 0l7-7m-7 7h18"
        />
      </svg>
    </button>
  </div>
);

export default NewsNotificationsCard;
