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
  propertyId: Joi.number()
    .required()
    .min(1)
    .max(1000)
    .messages(VALIDATION_MESSAGES)
    .label("رقم تعريف العقار"),
  hiddenPropertyId: Joi.string()
    .required()
    .min(1)
    .max(1000)
    .messages(VALIDATION_MESSAGES)
    .label("إخفاء رقم العقار"),
  city: Joi.string().required().messages(VALIDATION_MESSAGES).label("المدينة"),
  streetName: Joi.string()
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("اسم الشارع"),
  streetNumber: Joi.string()
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("رقم الشارع"),
  streetType: Joi.string()
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("نوع الشارع"),
  previousGeoDirection: Joi.string()
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("الاتجاه الجغرافي السابق"),
  nextGeoDirection: Joi.string()
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("الاتجاه الجغرافي اللاحق"),
  postalCode: Joi.string()
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("الرمز البريدي"),
  buildingDesign: Joi.string()
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("نوع تصميم المبنى"),
  buildingNumber: Joi.string()
    .allow(null, "")
    .messages(VALIDATION_MESSAGES)
    .label("رقم المبنى"),
  apartmentNumber: Joi.string()
    .allow(null, "")
    .messages(VALIDATION_MESSAGES)
    .label("رقم الشقة"),
  geoArea: Joi.string()
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("المنطقة الجغرافية"),
  regulatoryCode: Joi.string()
    .allow(null, "")
    .messages(VALIDATION_MESSAGES)
    .label("كود التنظيم(العقاري)"),
  projectName: Joi.string()
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("المشروع العقاري"),
  projectCode: Joi.string()
    .allow(null, "")
    .messages(VALIDATION_MESSAGES)
    .label("رمز المجمع"),
  projectHomeName: Joi.string()
    .allow(null, "")
    .messages(VALIDATION_MESSAGES)
    .label("اسم المجمع السكني"),
  unitType: Joi.string()
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("نوع الوحدة العقارية"),
  developerName: Joi.string()
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("اسم المطور العقاري"),
});

export type GeneralStepType = {};

export const generalStepInitialValues = {
  propertyId: null,
  hiddenPropertyId: "",
  city: "",
  streetName: "",
  streetNumber: "",
  streetType: "",
  previousGeoDirection: "",
  nextGeoDirection: "",
  postalCode: "",
  buildingDesign: "",
  buildingNumber: "",
  apartmentNumber: "",
  geoArea: "",
  regulatoryCode: "",
  projectName: "",
  projectCode: "",
  projectHomeName: "",
  unitType: "",
  developerName: "",
};

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
