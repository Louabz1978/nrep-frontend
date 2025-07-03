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
  //first step in general

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
  adjacentGeoDirection: Joi.string()
    .required()
    .label("الاتجاه الجغرافي الملاصق"),
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

  //second step in general
  propertyStatus: Joi.string()
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("حالة العقار"),
  offeredPrice: Joi.number()
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("السعر المعروض"),
  yearBuilt: Joi.number()
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("سنة البناء"),
  totalArea: Joi.number()
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("المساحة الإجمالية التقريبية"),
  livingArea: Joi.number()
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("المساحة التقريبية للمعيشة"),
  furnished: Joi.string()
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("مفروشة"),
  bedrooms: Joi.number()
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("عدد غرف النوم"),
  bathroomsWithShower: Joi.number()
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("عدد دورات المياه (مع دش)"),
  bathroomsWithoutShower: Joi.number()
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("عدد دورات المياه (بدون دش)"),
  ceilingFans: Joi.number()
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("عدد مراوح السقف"),
  elevator: Joi.string().required().messages(VALIDATION_MESSAGES).label("مصعد"),
  garageSpaces: Joi.number()
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("عدد مواقف الكراج"),
  cableAvailable: Joi.string()
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("الكابل متوفر (التلفزيون/الإنترنت)"),
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

export type PropertyCategoryStepType = {
  propertyStatus: string;
  offeredPrice: number;
  yearBuilt: number;
  totalArea: number;
  livingArea: number;
  furnished: string;
  bedrooms: number;
  bathroomsWithShower: number;
  bathroomsWithoutShower: number;
  ceilingFans: number;
  elevator: string;
  garageSpaces: number;
  cableAvailable: string;
};

export const propertyCategoryStepInitialValues = {
  propertyStatus: "",
  offeredPrice: 0,
  yearBuilt: 0,
  totalArea: 0,
  livingArea: 0,
  furnished: "",
  bedrooms: 0,
  bathroomsWithShower: 0,
  bathroomsWithoutShower: 0,
  ceilingFans: 0,
  elevator: "",
  garageSpaces: 0,
  cableAvailable: "",
};
