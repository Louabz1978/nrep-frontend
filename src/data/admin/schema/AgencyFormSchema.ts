import Joi from "joi";
import VALIDATION_MESSAGES from "@/data/global/validationMessages";

export type CreateAgencyForm = {
  name: string | null;
  email: string | null;
  phone_number: string | null;
  brokers_id: string | string[] | null;
  floor?: number | null;
  apt?: number | string | null;
  area_id?: number | null;
  city_id?: number | null;
  county_id?: number | null;
  building_num?: string | null;
  street?: string | null;
};

export const createAgencySchema = Joi.object<CreateAgencyForm>({
  name: Joi.string()
    .min(2)
    .max(120)
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("اسم الشركة"),

  email: Joi.string()
    .email({ tlds: false })
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("البريد الإلكتروني"),

  phone_number: Joi.string()
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("رقم الهاتف"),

  brokers_id: Joi.alternatives()
    .try(Joi.string(), Joi.array().items(Joi.string()))
    .allow(null)
    .optional()
    .messages(VALIDATION_MESSAGES)
    .label("معرّفات السماسرة"),
  floor: Joi.number()
    .allow(null)
    .optional()
    .messages(VALIDATION_MESSAGES)
    .label("الطابق"),

  apt: Joi.alternatives()
    .try(Joi.number(), Joi.string())
    .allow(null)
    .optional()
    .messages(VALIDATION_MESSAGES)
    .label("الشقة"),

  area_id: Joi.number()
    .allow(null)
    .optional()
    .messages(VALIDATION_MESSAGES)
    .label("الحي"),

  city_id: Joi.number()
    .allow(null)
    .optional()
    .messages(VALIDATION_MESSAGES)
    .label("المدينة"),

  county_id: Joi.number()
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
