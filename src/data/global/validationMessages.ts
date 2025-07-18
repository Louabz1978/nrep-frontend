const VALIDATION_MESSAGES: Record<string, string> = {
  // General Validation Messages
  "any.required": "حقل {{#label}} مطلوب.",
  "any.custom": "حقل {{#label}} غير صالح.",

  // String Validation Messages
  "string.base": "حقل {{#label}} يجب أن يكون من نوع نص.",
  "string.empty": "حقل {{#label}} يجب أن لا يكون فارغا.",
  "string.min": "طول حقل {{#label}} يجب ألا يقل عن {{#limit}} حرف.",
  "string.max": "طول حقل {{#label}} يجب ألا يزيد عن {{#limit}} حرف.",
  "string.alphanum": "حقل {{#label}} يجب أن يحتوي على أحرف وأرقام فقط.",
  "string.email": "حقل {{#label}} يجب أن يكون بتنسيق بريد إلكتروني صالح.",
  "string.uri": "حقل {{#label}} يجب أن يكون رابط صالح.",
  "string.pattern.base": `حقل {{#label}} يجب  أن يطابق النمط المطلوب {{#regex}}.`,
  "string.pattern.name":
    "الحقل {{#label}} يجب أن يطابق النمط التالي: {{#name}}",
  "string.pattern.invert": "حقل حتوي على أحرف وأرقام وشرطات سفلية فقط.",
  "string.pattern.phone": "حقل {{#label}} يجب أن يكون رقم هاتف صالح.",
  "string.pattern.zip": "حقل {{#label}} يجب أن يكون رقم بريدي صالح.",

  // Number Validation Messages
  "number.base": "حقل {{#label}} يجب أن لا يكون فارغا.",
  "number.empty": "حقل {{#label}} يجب أن لا يكون فارغا.",
  "number.integer": "حقل {{#label}} يجب أن يكون رقم صحيح.",
  "number.positive": "حقل {{#label}} يجب أن يكون رقم موجب.",
  "number.negative": "حقل {{#label}} يجب أن يكون رقم سالب.",
  "number.min": "قيمة حقل {{#label}} يجب ألا تقل عن {{#limit}}.",
  "number.max": "قيمة حقل {{#label}} يجب ألا تزيد عن {{#limit}}.",

  // Date Validation Messages
  "date.base": "حقل {{#label}} يجب أن يكون تاريخ صالح.",
  "date.empty": "حقل {{#label}} يجب أن لا يكون فارغا.",
  "date.min": "التاريخ في حقل {{#label}} يجب أن يكون بعد {{#limit}}.",
  "date.max": "التاريخ في حقل {{#label}} يجب أن يكون قبل {{#limit}}.",

  // Boolean Validation Messages
  "boolean.base": "حقل {{#label}} يجب أن يكون من نوع منطقي (صح/خطأ).",

  // Array Validation Messages
  "array.base": "حقل {{#label}} يجب أن يكون قائمة.",
  "array.min": "طول القائمة في حقل {{#label}} يجب ألا يقل عن {{#limit}} عنصر.",
  "array.max": "طول القائمة في حقل {{#label}} يجب ألا يزيد عن {{#limit}} عنصر.",
  "array.unique": "عناصر القائمة في حقل {{#label}} يجب أن تكون فريدة.",

  // Object Validation Messages
  "object.base": "حقل {{#label}} يجب أن لا يكون فارغا.",
  "object.unknown": "حقل {{#label}} يحتوي على خصائص غير صالحة.",

  // custom messages
  "file.minSize": "حجم الصورة يجب أن يكون على الأقل {{#limit}}",
  "file.maxSize": "حجم الصورة يجب أن لا يتجاوز {{#limit}}",
  "file.invalidType": "يجب أن يكون الملف صورة",
};

export default VALIDATION_MESSAGES;
