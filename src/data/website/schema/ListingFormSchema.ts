import VALIDATION_MESSAGES from "@/data/global/validationMessages";
import Joi from "joi";

// optionSchema
export const optionSchema = Joi.object({ value: Joi.string() }).unknown();
export const urlSchema = Joi.string().regex(
  /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/,
  { name: "https://any-domain.com" }
);
export type TEmpty = null | undefined;
export type TString = string | null | undefined;
export type TNumber = number | null | undefined;
export type TOption = { value: string; [key: string]: unknown } | TEmpty;

// general step -----------------------------------------------------------

export type GeneralStepType = {
  buildingNumber: TNumber;
  streetName: TString;
  floor: TString;
  apartmentNumber: TNumber;
  governorate: TOption;
  city: TOption;
  district: TOption;
  propertyType: TOption;
  propertyArea: TNumber;
  bedrooms: TNumber;
  bathrooms: TNumber;
  price: TNumber;
  sellerCommission: TNumber;
  buyerCommission: TNumber;
  buildYear: TNumber;
  latitude: TNumber;
  longitude: TNumber;
  status: TOption;
};

export const generalStepSchema = Joi.object<GeneralStepType>({
  buildingNumber: Joi.number()
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("رقم المبنى"),
  streetName: Joi.string()
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("اسم الشارع"),
  floor: Joi.string().required().messages(VALIDATION_MESSAGES).label("الطابق"),
  apartmentNumber: Joi.number()
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("رقم الشقة"),
  governorate: optionSchema
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("المحافظة"),
  city: optionSchema.required().messages(VALIDATION_MESSAGES).label("المدينة"),
  district: optionSchema.required().messages(VALIDATION_MESSAGES).label("الحي"),
  propertyType: optionSchema
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("نوع العقار"),
  propertyArea: Joi.number()
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("مساحة العقار"),
  bedrooms: Joi.number()
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("عدد غرف النوم"),
  bathrooms: Joi.number()
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("عدد دورات المياه"),
  price: Joi.number().required().messages(VALIDATION_MESSAGES).label("السعر"),
  sellerCommission: Joi.number()
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("عمولة البائع"),
  buyerCommission: Joi.number()
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("عمولة المشتري"),
  buildYear: Joi.number()
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("سنة البناء"),
  latitude: Joi.number()
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("خط العرض"),
  longitude: Joi.number()
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("خط الطول"),
  status: optionSchema.required().messages(VALIDATION_MESSAGES).label("الحالة"),
});

export const generalStepInitialValues: GeneralStepType = {
  buildingNumber: null,
  streetName: null,
  floor: null,
  apartmentNumber: null,
  governorate: null,
  city: null,
  district: null,
  propertyType: null,
  propertyArea: null,
  bedrooms: null,
  bathrooms: null,
  price: null,
  sellerCommission: null,
  buyerCommission: null,
  buildYear: null,
  latitude: null,
  longitude: null,
  status: null,
};

// additional info step -----------------------------------------------------------

export type AdditionalInfoStepType = {
  balcony: TNumber;
  fans: TNumber;
  waterLine: TString;
  additionalOptions: TOption[];
};

export const additionalInfoStepSchema = Joi.object<AdditionalInfoStepType>({
  balcony: Joi.number()
    .allow(null, "")
    .messages(VALIDATION_MESSAGES)
    .label("شرفة"),
  fans: Joi.number()
    .allow(null, "")
    .messages(VALIDATION_MESSAGES)
    .label("مراوح"),
  waterLine: optionSchema
    .allow(null)
    .messages(VALIDATION_MESSAGES)
    .label("خط المياه الواصل للعقار"),
  additionalOptions: Joi.array()
    .items(optionSchema)
    .messages(VALIDATION_MESSAGES)
    .label("جاكوزي"),
});

export const additionalInfoStepInitialValues: AdditionalInfoStepType = {
  balcony: null,
  fans: null,
  waterLine: null,
  additionalOptions: [],
};

export type LocationStepType = {
  landAreaSource: TString;
  landDimensionsSource: TString;
  totalAreaSource: TString;
  residentialAreaSource: TString;
  latitude: TNumber;
  longitude: TNumber;
};

export const LocationStepSchema = Joi.object<LocationStepType>({
  landAreaSource: optionSchema
    .allow(null, "")
    .messages(VALIDATION_MESSAGES)
    .label("مصدر القياسات (مساحة الأرض)"),
  landDimensionsSource: optionSchema
    .allow(null, "")
    .messages(VALIDATION_MESSAGES)
    .label("مصدر القياسات (أبعاد الأرض)"),
  totalAreaSource: optionSchema
    .allow(null, "")
    .messages(VALIDATION_MESSAGES)
    .label("مصدر القياسات (المساحة الكلية)"),
  residentialAreaSource: optionSchema
    .allow(null, "")
    .messages(VALIDATION_MESSAGES)
    .label("مصدر القياسات (المساحة السكنية)"),
  latitude: Joi.number()
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("خط العرض"),
  longitude: Joi.number()
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("خط الطول"),
});

export const LocationStepInitialValues: LocationStepType = {
  landAreaSource: null,
  landDimensionsSource: null,
  totalAreaSource: null,
  residentialAreaSource: null,
  latitude: null,
  longitude: null,
};

export type PropertyImagesStepType = {};

export const propertyImagesStepSchema = Joi.object<PropertyImagesStepType>({});

export const PropertyImagesStepInitialValues: PropertyImagesStepType = {}
