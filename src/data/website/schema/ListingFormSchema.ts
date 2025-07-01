import VALIDATION_MESSAGES from "@/data/global/validationMessages";
import Joi from "joi";

// status step -----------------------------------------------------------
export const statusStepSchema = Joi.object({
  status: Joi.string(),
});

export type StatusStepType = {
  status: string;
};

export const statusStepInitialValues = {
  status: "active",
};

// general step -----------------------------------------------------------
export const generalStepSchema = Joi.object({
  idProperty: Joi.number()
    .required()
    .min(1)
    .max(1000)
    .messages(VALIDATION_MESSAGES)
    .label("رقم تعريف العقار"),
  hideIdproperty: Joi.string()
    .required()
    .min(1)
    .max(1000)
    .messages(VALIDATION_MESSAGES)
    .label("اخفاء رقم العقار"),
  city: Joi.string().required().label("المدينة"),
  streetType: Joi.string().required().label("نوع الشارع"),
  streetNumber: Joi.string().required().label("رقم الشارع"),
  streetName: Joi.string().required().label("اسم الشارع"),
  adjacentGeoDirection: Joi.string().required().label("الاتجاه الجغرافي الملاصق"),
  adjacentGeoStreet: Joi.string().required().label("الشارع الجغرافي الملاصق"),
  postalCode: Joi.string().required().label("الرمز البريدي"),
  buildingNumber: Joi.string().required().label("رقم المبنى"),
  apartmentNumber: Joi.string().required().label("رقم الشقة"),
  designCode: Joi.string().required().label("كود التصميم العقاري"),
  region: Joi.string().required().label("المنطقة الجغرافية"),
  projectName: Joi.string().required().label("اسم المشروع العقاري"),
  unitCode: Joi.string().required().label("كود الوحدة العقارية"),
  residentialComplex: Joi.string().required().label("اسم المجمع السكني"),
  realEstateAxis: Joi.string().required().label("اسم المحور العقاري"),
});

export const LOGIN_FORM_SCHEMA_INITIAL_VALUES = {
  username: "",
  password: "",
};

export type GeneralStepType = {};

export const generalStepInitialValues = {};

// rooms step -----------------------------------------------------------
export const roomsStepSchema = Joi.object({});

export type RoomsStepType = {};

export const roomsStepInitialValues = {};

// features step -----------------------------------------------------------
export const featuresStepSchema = Joi.object({});

export type FeaturesStepType = {};

export const featuresStepInitialValues = {};

// financial step -----------------------------------------------------------
export const financialStepSchema = Joi.object({});

export type FinancialStepType = {};

export const financialStepInitialValues = {};

// compensation step -----------------------------------------------------------
export const compensationStepSchema = Joi.object({});

export type CompensationStepType = {};

export const compensationStepInitialValues = {};

// offices step -----------------------------------------------------------
export const officesStepSchema = Joi.object({});

export type OfficesStepType = {};

export const officesStepInitialValues = {};

// remarks step -----------------------------------------------------------
export const remarksStepSchema = Joi.object({});

export type RemarksStepType = {};

export const remarksStepInitialValues = {};
