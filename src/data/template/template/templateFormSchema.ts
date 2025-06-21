import VALIDATION_MESSAGES from "@/data/global/validationMessages";
import Joi from "joi";

export interface TemplateFormType {
  arabic_name: string;
  english_name: string;
  gender: string;
  phone_number: string;
  level: string;
  email: string;
  note: string;
}
export const TEMPLATE_FORM_SCHEMA = Joi.object({
  arabic_name: Joi.string()
    .required()
    .min(2)
    .max(50)
    .trim()
    .messages(VALIDATION_MESSAGES)
    .label("الاسم بالعربية"),
  english_name: Joi.string()
    .min(2)
    .max(50)
    .trim()
    .messages(VALIDATION_MESSAGES)
    .label("الاسم بالإنجليزية"),
  gender: Joi.string()
    .required()
    .trim()
    .messages(VALIDATION_MESSAGES)
    .label("الجنس"),
  phone_number: Joi.string()
    .trim()
    .required()
    .pattern(/^(09)(\d{8})$/)
    .messages({
      ...VALIDATION_MESSAGES,
      "string.pattern.base": `الحقل {{#label}} يجب أن يطابق النمط المطلوب , مثل: 09XXXXXXXX.`,
    })
    .label("رقم الهاتف"),
  level: Joi.string()
    .required()
    .trim()
    .messages(VALIDATION_MESSAGES)
    .label("المرحلة التدريسية"),
  email: Joi.string()
    .trim()
    .pattern(/[a-zA-Z0-9\_\.]+(@gmail\.com)$/)
    .allow(null)
    .messages({
      ...VALIDATION_MESSAGES,
      "string.pattern.base": `الحقل {{#label}} يجب أن يطابق النمط المطلوب , مثل: account@gmail.com.`,
    })
    .label("البريد الإلكتروني"),
  note: Joi.string()
    .allow(null, "")
    .trim()
    .max(255)
    .messages(VALIDATION_MESSAGES)
    .label("ملاحظات"),
});

export const TEMPLATE_FORM_SCHEMA_INITIAL_VALUES = {
  arabic_name: "",
  english_name: "",
  gender: "",
  phone_number: "",
  level: "",
  email: "",
  note: "",
};

export default TEMPLATE_FORM_SCHEMA;
