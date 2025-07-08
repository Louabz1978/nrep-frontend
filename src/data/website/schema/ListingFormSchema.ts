import VALIDATION_MESSAGES from "@/data/global/validationMessages";
import Joi from "joi";

// status step -----------------------------------------------------------
export type ListingStatusType = "active" | "incomplete";

export const statusStepSchema = Joi.object({
  status: Joi.string(),
});

export type StatusStepType = {
  status: ListingStatusType;
};

export const statusStepInitialValues = {
  status: "active",
};

// general step -----------------------------------------------------------
export const generalStepSchema = Joi.object({
  // first accordion fields
  propertyId: Joi.number()
    .required()
    .min(1)
    .max(1000)
    .messages(VALIDATION_MESSAGES)
    .label("رقم تعريف العقار"),
  hiddenPropertyId: Joi.object({ value: Joi.string() })
    .unknown()
    .required()
    .min(1)
    .max(1000)
    .messages(VALIDATION_MESSAGES)
    .label("إخفاء رقم العقار"),
  city: Joi.object({ value: Joi.string() })
    .unknown()
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("المدينة"),
  streetName: Joi.string()
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("اسم الشارع"),
  streetNumber: Joi.string()
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("رقم الشارع"),
  streetType: Joi.object({ value: Joi.string() })
    .unknown()
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("نوع الشارع"),
  previousGeoDirection: Joi.object({ value: Joi.string() })
    .unknown()
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("الاتجاه الجغرافي السابق"),
  nextGeoDirection: Joi.object({ value: Joi.string() })
    .unknown()
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

  // second accordion fields
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

  // third accordion fields
  landAreaSource: Joi.any(),
  landDimensionsSource: Joi.any(),
  totalAreaSource: Joi.any(),
  residentialAreaSource: Joi.any(),
  latitude: Joi.number(),
  longitude: Joi.number(),
});

export type GeneralStepType = {
  // first accordion
  propertyId: number;
  hiddenPropertyId: string;
  city: string;
  streetName: string;
  streetNumber: string;
  streetType: string;
  previousGeoDirection: string;
  nextGeoDirection: string;
  postalCode: string;
  buildingDesign: string;
  buildingNumber: string;
  apartmentNumber: string;
  geoArea: string;
  regulatoryCode: string;
  projectName: string;
  projectCode: string;
  projectHomeName: string;
  unitType: string;
  developerName: string;

  // second accordion
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

  // third accordion
  landAreaSource: string;
  landDimensionsSource: string;
  totalAreaSource: string;
  residentialAreaSource: string;
  latitude: number;
  longitude: number;
};

export const generalStepInitialValues = {
  // first accordion
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

  // second accordion
  propertyStatus: "",
  offeredPrice: "",
  yearBuilt: "",
  totalArea: "",
  livingArea: "",
  furnished: "",
  bedrooms: "",
  bathroomsWithShower: "",
  bathroomsWithoutShower: "",
  ceilingFans: "",
  elevator: "",
  garageSpaces: "",
  cableAvailable: "",

  // third accordion
  landAreaSource: "",
  landDimensionsSource: "",
  totalAreaSource: "",
  residentialAreaSource: "",
  latitude: "",
  longitude: "",
};

// rooms step -----------------------------------------------------------
export const roomsStepSchema = Joi.object({});

export type RoomsStepType = {};

export const roomsStepInitialValues = {};

// features step -----------------------------------------------------------

const selectElementSchema = Joi.object({
  value: Joi.string(),
}).unknown();

export const featuresStepSchema = Joi.object({
  guestRoom: Joi.array()
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("غرف إضافية"),
  safty: Joi.array()
    .items(selectElementSchema)
    .min(1)
    .messages(VALIDATION_MESSAGES)
    .label("الأمان"),

  hasPrivatePool: Joi.boolean(),
  privatePool: Joi.when("hasPrivatePool", {
    is: true,
    then: Joi.array()
      .items(selectElementSchema)
      .min(1)
      .messages(VALIDATION_MESSAGES)
      .label("مسبح خاص"),
    otherwise: Joi.array().messages(VALIDATION_MESSAGES).label("مسبح خاص"),
  }),

  hasJaccuzi: Joi.boolean(),
  jaccuzi: Joi.when("hasJaccuzi", {
    is: true,
    then: Joi.array()
      .items(selectElementSchema)
      .min(1)
      .messages(VALIDATION_MESSAGES)
      .label("جاكوزي"),
    otherwise: Joi.array().messages(VALIDATION_MESSAGES).label("جاكوزي"),
  }),

  facilities: Joi.array()
    .items(selectElementSchema)
    .min(1)
    .messages(VALIDATION_MESSAGES)
    .label("الخدمات و المرافق"),
  bedroomDetailes: Joi.array()
    .items(selectElementSchema)
    .min(1)
    .messages(VALIDATION_MESSAGES)
    .label("تفاصيل غرف النوم"),
  approvalInfo: Joi.array()
    .items(selectElementSchema)
    .min(1)
    .messages(VALIDATION_MESSAGES)
    .label("معلومات الموافقة"),
  view: Joi.array()
    .items(selectElementSchema)
    .min(1)
    .messages(VALIDATION_MESSAGES)
    .label("الأطلالة"),
  stormProtiction: Joi.array()
    .items(selectElementSchema)
    .min(1)
    .messages(VALIDATION_MESSAGES)
    .label("الحماية من العواصف"),
  portInfo: Joi.array()
    .items(selectElementSchema)
    .min(1)
    .messages(VALIDATION_MESSAGES)
    .label("معلومات الميناء/القارب"),
  terms: Joi.array()
    .items(selectElementSchema)
    .min(1)
    .messages(VALIDATION_MESSAGES)
    .label("الشروط"),
});

type SelectElement = {
  label: string;
  value: string;
};

export type FeaturesStepType = {
  guestRoom: SelectElement[];
  safty: SelectElement[];
  hasPrivatePool: boolean;
  privatePool: SelectElement[];
  hasJaccuzi: boolean;
  jaccuzi: SelectElement[];
  facilities: SelectElement[];
  bedroomDetailes: SelectElement[];
  approvalInfo: SelectElement[];
  view: SelectElement[];
  stormProtiction: SelectElement[];
  portInfo: SelectElement[];
  terms: SelectElement[];
};

export const featuresStepInitialValues = {
  guestRoom: [],
  safty: [],
  hasPrivatePool: false,
  privatePool: [],
  hasJaccuzi: false,
  jaccuzi: [],
  facilities: [],
  bedroomDetailes: [],
  approvalInfo: [],
  view: [],
  stormProtiction: [],
  portInfo: [],
  terms: [],
};

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
