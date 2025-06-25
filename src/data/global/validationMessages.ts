const VALIDATION_MESSAGES: Record<string, string> = {
  // General Validation Messages
  "any.required": "الحقل {{#label}} مطلوب.",
  "any.custom": "الحقل {{#label}} غير صالح.",

  // String Validation Messages
  "string.base": "الحقل {{#label}} يجب أن يكون من نوع نص.",
  "string.empty": "الحقل {{#label}} يجب أن لا يكون فارغا.",
  "string.min": "طول الحقل {{#label}} يجب ألا يقل عن {{#limit}} حرف.",
  "string.max": "طول الحقل {{#label}} يجب ألا يزيد عن {{#limit}} حرف.",
  "string.alphanum": "الحقل {{#label}} يجب أن يحتوي على أحرف وأرقام فقط.",
  "string.email": "الحقل {{#label}} يجب أن يكون بتنسيق بريد إلكتروني صالح.",
  "string.uri": "الحقل {{#label}} يجب أن يكون رابط صالح.",
  "string.pattern.base": `الحقل {{#label}} يجب  أن يطابق النمط المطلوب {{#regex}}.`,
  "string.pattern.name":
    "الحقل {{#label}} يجب أن يحتوي على أحرف وأرقام وشرطات سفلية فقط.",
  "string.pattern.phone": "الحقل {{#label}} يجب أن يكون رقم هاتف صالح.",
  "string.pattern.zip": "الحقل {{#label}} يجب أن يكون رقم بريدي صالح.",

  // Number Validation Messages
  "number.base": "الحقل {{#label}} يجب أن يكون من نوع رقم.",
  "number.empty": "الحقل {{#label}} يجب أن لا يكون فارغا.",
  "number.integer": "الحقل {{#label}} يجب أن يكون رقم صحيح.",
  "number.positive": "الحقل {{#label}} يجب أن يكون رقم موجب.",
  "number.negative": "الحقل {{#label}} يجب أن يكون رقم سالب.",
  "number.min": "قيمة الحقل {{#label}} يجب ألا تقل عن {{#limit}}.",
  "number.max": "قيمة الحقل {{#label}} يجب ألا تزيد عن {{#limit}}.",

  // Date Validation Messages
  "date.base": "الحقل {{#label}} يجب أن يكون تاريخ صالح.",
  "date.empty": "الحقل {{#label}} يجب أن لا يكون فارغا.",
  "date.min": "التاريخ في الحقل {{#label}} يجب أن يكون بعد {{#limit}}.",
  "date.max": "التاريخ في الحقل {{#label}} يجب أن يكون قبل {{#limit}}.",

  // Boolean Validation Messages
  "boolean.base": "الحقل {{#label}} يجب أن يكون من نوع منطقي (صح/خطأ).",

  // Array Validation Messages
  "array.base": "الحقل {{#label}} يجب أن يكون قائمة.",
  "array.min":
    "طول القائمة في الحقل {{#label}} يجب ألا يقل عن {{#limit}} عنصر.",
  "array.max":
    "طول القائمة في الحقل {{#label}} يجب ألا يزيد عن {{#limit}} عنصر.",
  "array.unique": "عناصر القائمة في الحقل {{#label}} يجب أن تكون فريدة.",

  // Object Validation Messages
  "object.base": "الحقل {{#label}} يجب أن لا يكون فارغا.",
  "object.unknown": "الحقل {{#label}} يحتوي على خصائص غير صالحة.",

  // from hour and to hour custom validation
  "any.twoAtLeast": "يجب أن يكون فرق الوقت على الأقل ساعتين.",
  "any.fromLaterThanTo": "ساعة الإغلاق أقل من ساعة الافتتاح.",
  "any.startTimeLaterThanEnd": "ساعة النهاية يجب أن تكون بعد ساعة البداية.",
  "any.fromSameTo": "ساعة الإغلاق تساوي ساعة الافتتاح.",
};

export default VALIDATION_MESSAGES;
