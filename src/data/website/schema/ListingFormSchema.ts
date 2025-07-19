import {
  optionSchema,
  type TNumber,
  type TOption,
  type TString,
} from "@/data/global/schema";
import VALIDATION_MESSAGES from "@/data/global/validationMessages";
import Joi from "joi";

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
    .label("عمولة وكيل البائع"),
  buyerCommission: Joi.number()
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("عمولة وكيل المشتري"),
  buildYear: Joi.number()
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("سنة البناء"),
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
  status: null,
};

// additional info step -----------------------------------------------------------
export type AdditionalInfoStepType = {
  hasBalcony: boolean;
  balcony: TNumber;
  hasFans: boolean;
  fans: TNumber;
  waterLine: TString;
  additionalOptions: TOption[];
};

export const additionalInfoStepSchema = Joi.object<AdditionalInfoStepType>({
  hasBalcony: Joi.boolean(),
  balcony: Joi.when("hasBalcony", {
    is: true,
    then: Joi.number().required().messages(VALIDATION_MESSAGES).label("شرفة"),
    otherwise: Joi.number()
      .allow(null, "")
      .messages(VALIDATION_MESSAGES)
      .label("شرفة"),
  }),

  hasFans: Joi.boolean(),
  fans: Joi.when("hasBalcony", {
    is: true,
    then: Joi.number().required().messages(VALIDATION_MESSAGES).label("مراوح"),
    otherwise: Joi.number()
      .allow(null, "")
      .messages(VALIDATION_MESSAGES)
      .label("مراوح"),
  }),

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
  hasBalcony: false,
  balcony: null,
  hasFans: false,
  fans: null,
  waterLine: null,
  additionalOptions: [],
};

// location step --------------------------------------------------------------------
export type LocationStepType = {
  landAreaSource: TString;
  landDimensionsSource: TString;
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
  latitude: null,
  longitude: null,
};

// property images step --------------------------------------------------------------
export type PropertyImagesStepType = {
  images: [];
};

export const propertyImagesStepSchema = Joi.object<PropertyImagesStepType>({
  // Image validation
  images: Joi.array()
    .items(
      Joi.object({
        path: Joi.any()
          .required()
          .custom((value, helpers) => {
            // Existing validation logic for files
            if (value instanceof File || value instanceof Blob) {
              if (value.size < 256 * 1024) {
                console.log(value.size, 256 * 1024);
                return helpers.error("file.minSize", { limit: "256KB" });
              }
              if (value.size > 1024 * 1024) {
                return helpers.error("file.maxSize", { limit: "1MB" });
              }
              if (!value.type.startsWith("image/")) {
                return helpers.error("file.invalidType");
              }
            } else if (typeof value === "string" && !value) {
              return helpers.error("any.required");
            }
            return value;
          })
          .messages(VALIDATION_MESSAGES),
        mode: Joi.string().valid("edit", "delete").optional(),
      }).unknown()
    )
    .custom((value, helpers) => {
      // Filter out deleted images before counting
      const activeImages = value?.filter((img: any) => img.mode !== "delete");

      // Validate minimum count
      if (activeImages?.length < 1) {
        return helpers.error("array.min", { limit: 1 });
      }

      // Validate maximum count
      if (activeImages?.length > 5) {
        return helpers.error("array.max", { limit: 5 });
      }

      return value;
    })
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("الصور"),
});

export const PropertyImagesStepInitialValues: PropertyImagesStepType = {
  images: [],
};
