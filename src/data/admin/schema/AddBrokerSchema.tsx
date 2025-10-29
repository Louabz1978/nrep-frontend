import VALIDATION_MESSAGES from "@/data/global/validationMessages";
import Joi from "joi";
import { type TString } from "@/data/global/schema";

export type AddBrokerForm = {
  first_name: TString;
  last_name: TString;
  father_name: TString;
  mother_name_surname: TString;
  place_birth: TString;
  date_birth: TString;
  registry: TString;
  national_number: TString;
  email: TString;
  password: TString;
  phone_number: TString;
};

export const addBrokerSchema = Joi.object<AddBrokerForm>({
  first_name: Joi.string()
    .min(2)
    .max(50)
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("الاسم"),

  last_name: Joi.string()
    .min(2)
    .max(50)
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("اسم العائلة"),

  father_name: Joi.string()
    .min(2)
    .max(50)
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("اسم الأب"),

  mother_name_surname: Joi.string()
    .min(2)
    .max(50)
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("اسم الأم"),

  place_birth: Joi.string()
    .min(2)
    .max(100)
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("مكان الولادة"),

  date_birth: Joi.string()
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("تاريخ الولادة"),

  registry: Joi.string()
    .min(2)
    .max(50)
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("السجل"),

  national_number: Joi.string()
    .min(2)
    .max(20)
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("الرقم الوطني"),

  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("البريد الإلكتروني"),

  password: Joi.string()
    .min(6)
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("كلمة المرور"),

  phone_number: Joi.string()
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("رقم الهاتف"),
});

export const addBrokerInitialValues: AddBrokerForm = {
  first_name: null,
  last_name: null,
  father_name: null,
  mother_name_surname: null,
  place_birth: null,
  date_birth: null,
  registry: null,
  national_number: null,
  email: null,
  password: null,
  phone_number: null,
};
