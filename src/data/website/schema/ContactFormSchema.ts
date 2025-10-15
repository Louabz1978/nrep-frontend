import { type TNumber, type TString } from "@/data/global/schema";
import VALIDATION_MESSAGES from "@/data/global/validationMessages";
import Joi from "joi";

// additional info step -----------------------------------------------------------
export type ContactFormType = {
  name: TString;
  father_name: TString;
  surname: TString;
  mother_name_surname: TString;
  place_birth: TString;
  date_birth: TString;
  registry: TString;
  national_number: TNumber;
  email: TString;
  phone_number: TString;
  password : TString;
};

export const ContactFormSchema = Joi.object<ContactFormType>({
  name: Joi.string().required().messages(VALIDATION_MESSAGES).label("الاسم"),
  father_name: Joi.string()
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("اسم الأب"),
  surname: Joi.string()
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("النسبة"),
  mother_name_surname: Joi.string()
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("اسم و نسة الأم"),
  place_birth: Joi.string()
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("مكان الولادة"),
  date_birth: Joi.string()
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("تاريخ الولادة"),
  registry: Joi.string()
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("القيد"),
  national_number: Joi.number()
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("الرقم الوطني"),
  email: Joi.string()
    .trim()
    // Updated pattern to allow any valid domain, not just gmail.com
    .pattern(/^[a-zA-Z0-9][a-zA-Z0-9._-]*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
    .allow(null)
    .messages({
      ...VALIDATION_MESSAGES,
      "string.pattern.base": `الحقل {{#label}} يجب أن يطابق النمط المطلوب , مثل: example@domain.com.`,
      "string.email": `الحقل {{#label}} يجب أن يكون بريدًا إلكترونيًا صالحًا , مثل: example@domain.com.`, // New message for the .email() rule
    })
    .label("البريد الإلكتروني"),
  phone_number: Joi.string()
    .trim()
    .required()
    .pattern(/^(09)(\d{8})$/)
    .messages({
      ...VALIDATION_MESSAGES,
      "string.pattern.base": `الحقل {{#label}} يجب أن يطابق النمط المطلوب , مثل: 09XXXXXXXX.`,
    })
    .label("رقم الهاتف"),
    password: Joi.string()
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("كلمة المرور"),
});

export const contactFormInitialValues: ContactFormType = {
  name: null,
  father_name: null,
  surname: null,
  mother_name_surname: null,
  place_birth: null,
  date_birth: null,
  registry: null,
  national_number: null,
  email: null,
  phone_number: null,
  password : null,
};
