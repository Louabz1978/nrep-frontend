import VALIDATION_MESSAGES from "@/data/global/validationMessages";
import Joi from "joi";
import { optionSchema, type TString, type TOption } from "@/data/global/schema";

export type AddBrokerForm = {
  agency_id: TOption;
  first_name: TString;
  last_name: TString;
  email: TString;
  phone_number: TString;
};

export const addBrokerSchema = Joi.object<AddBrokerForm>({
  agency_id: optionSchema
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("الشركة العقارية"),

  first_name: Joi.string()
    .min(2)
    .max(50)
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("الإسم"),

  last_name: Joi.string()
    .min(2)
    .max(50)
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("اسم العائلة"),

  email: Joi.string()
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("البريد الإلكتروني"),

  phone_number: Joi.string()
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("رقم الهاتف"),
});

export const addBrokerInitialValues: AddBrokerForm = {
  agency_id: null,
  first_name: null,
  last_name: null,
  email: null,
  phone_number: null,
};
