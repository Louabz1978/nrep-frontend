export const StatusParagraph = `عند إنشاء عقار جديد، يمكن تقديمه إما كـ نشط (Active) أو غير مكتمل (Incomplete).\n
  العقار النشط يجب أن يتوافق مع جميع قواعد الإدخال، وبعد تقديمه يصبح متاحًا للجميع ضمن النظام , أما العقار غير المكتمل، فسيحصل على رقم MLS، لكنه لن يكون مرئيًا للجميع.\n
  يمكن إضافة الصور، والمستندات الإضافية، وغيرها من التفاصيل للعقارات غير المكتملة، كما يمكن توليد تقارير لها.\n
  بمجرد استكمال كافة البيانات الخاصة بعقار غير مكتمل وتغيير حالته إلى نشط، يصبح العقار متاحًا للجميع , ولا يمكن تقديم عقار كـ نشط إلا إذا استوفى جميع قواعد الإدخال.
  `;

export const StatusOptions = [
  {
    label: "نشط",
    value: "active",
    chosenClassName: "!bg-success",
  },
  {
    label: "غير مكتمل",
    value: "incomplete",
    chosenClassName: "!bg-error",
  },
];
export const moreFinancialOptions = [
  {
    label: "إلزامية اتحاد المُلّاك",
    value: "ownersUnionMandatory",
  },
];

export const moreRestrictionsOptions = [
  {
    label: "إمكانية التأجير بعد تملّك جديد",
    value: "rentalAllowedAfterNewOwnership",
  },
  {
    label: "وجود حدود على التأجير",
    value: "rentalLimitationsExist",
  },
];
