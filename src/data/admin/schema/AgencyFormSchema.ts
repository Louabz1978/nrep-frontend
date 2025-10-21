import Joi from "joi";
import VALIDATION_MESSAGES from "@/data/global/validationMessages";
import {
  optionSchema,
  type TNumber,
  type TString,
  type TOption,
} from "@/data/global/schema";

export type CreateAgencyForm = {
  name: TString;
  email: TString;
  phone_number: TString;
  brokers_id: TOption[];
  floor: TNumber;
  apt: TNumber;
  area_id: TOption;
  city_id: TOption;
  county_id: TOption;
  building_num: TString;
  street: TString;
};

export const createAgencySchema = Joi.object<CreateAgencyForm>({
  name: Joi.string()
    .min(2)
    .max(120)
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("اسم الشركة"),

  email: Joi.string()
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("البريد الإلكتروني"),

  phone_number: Joi.string()
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("رقم الهاتف"),

  brokers_id: Joi.array()
    .items(optionSchema)
    .min(1)
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("السماسرة"),
  floor: Joi.number()
    .allow(null)
    .optional()
    .messages(VALIDATION_MESSAGES)
    .label("الطابق"),

  apt: Joi.number()
    .allow(null)
    .optional()
    .messages(VALIDATION_MESSAGES)
    .label("الشقة"),
  area_id: optionSchema
    .allow(null)
    .optional()
    .messages(VALIDATION_MESSAGES)
    .label("الحي"),

  city_id: optionSchema
    .allow(null)
    .optional()
    .messages(VALIDATION_MESSAGES)
    .label("المدينة"),

  county_id: optionSchema
    .allow(null)
    .optional()
    .messages(VALIDATION_MESSAGES)
    .label("المحافظة"),

  building_num: Joi.string()
    .allow(null)
    .optional()
    .messages(VALIDATION_MESSAGES)
    .label("رقم المبنى"),

  street: Joi.string()
    .allow(null)
    .optional()
    .messages(VALIDATION_MESSAGES)
    .label("الشارع"),
});

export const createAgencyInitialValues: CreateAgencyForm = {
  name: null,
  email: null,
  phone_number: null,
  brokers_id: [], 
  floor: null,
  apt: null,
  area_id: null,
  city_id: null,
  county_id: null,
  building_num: null,
  street: null,
};
