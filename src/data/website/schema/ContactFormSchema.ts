import { type TNumber, type TString } from "@/data/global/schema";
import VALIDATION_MESSAGES from "@/data/global/validationMessages";
import Joi from "joi";

// additional info step -----------------------------------------------------------
export type ContactFormType = {
  name: TString;
  father_name : TString,
  surname : TString,
  mother_name_and_surname : TString,
  place_and_date_of_birth : TString,
  registry : TString,
  national_number : TNumber,
};

export const ContactFormSchema = Joi.object<ContactFormType>({
  name: Joi.string()
  .required()
  .messages(VALIDATION_MESSAGES)
  .label("الاسم"),
  father_name: Joi.string()
  .required()
  .messages(VALIDATION_MESSAGES)
  .label("اسم الأب"),
  surname: Joi.string()
  .required()
  .messages(VALIDATION_MESSAGES)
  .label("النسبة"),
  mother_name_and_surname: Joi.string()
  .required()
  .messages(VALIDATION_MESSAGES)
  .label("اسم و نسة الأم"),
  place_and_date_of_birth: Joi.string()
  .required()
  .messages(VALIDATION_MESSAGES)
  .label("مكان و تاريخ الولادة"),
  registry: Joi.string()
  .required()
  .messages(VALIDATION_MESSAGES)
  .label("القيد"),
  national_number: Joi.number()
  .required()
  .messages(VALIDATION_MESSAGES)
  .label("الرقم الوطني"),
});

export const contactFormInitialValues: ContactFormType = {
  name:null,
  father_name: null,
  surname:null,
  mother_name_and_surname: null,
  place_and_date_of_birth:null,
  registry:null,
  national_number:null ,
};
