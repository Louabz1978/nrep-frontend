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
  building_num: TString;
  street: TString;
  floor: TNumber;
  apt: TNumber;
  county_id: TOption;
  city_id: TOption;
  area_id: TOption;
  property_type: TOption;
  area_space: TNumber;
  bedrooms: TNumber;
  bathrooms: TNumber;
  price: TNumber;
  property_realtor_commission: TNumber;
  buyer_realtor_commission: TNumber;
  year_built: TNumber;
  status: TOption;
  description: TString;
  exp_date: TString;
  show_inst: TString;
  sellers: TOption[];
  livable: boolean;
  trans_type: TOption;
};

export const generalStepSchema = Joi.object<GeneralStepType>({
  building_num: Joi.string()
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("رقم البناء"),
  street: Joi.string()
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("اسم الشارع"),
  floor: Joi.number().required().messages(VALIDATION_MESSAGES).label("الطابق"),
  apt: Joi.number().required().messages(VALIDATION_MESSAGES).label("رقم الشقة"),
  county_id: optionSchema
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("المحافظة"),
  city_id: optionSchema
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("المدينة"),
  area_id: optionSchema
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("الحي/المنطقة"),
  property_type: optionSchema
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("نوع العقار"),
  area_space: Joi.number()
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
  property_realtor_commission: Joi.number()
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("عمولة وكيل البائع"),
  buyer_realtor_commission: Joi.number()
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("عمولة وكيل المشتري"),
  year_built: Joi.number()
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("سنة البناء"),
  status: optionSchema.required().messages(VALIDATION_MESSAGES).label("الحالة"),
  description: Joi.string()
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("وصف العقار"),
  show_inst: Joi.string()
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("تعليمات المعاينة"),
  exp_date: Joi.string()
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("تاريخ انتهاء العقد"),
  sellers: Joi.array()
    .items(optionSchema)
    .min(1)
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("البائعون"),
  livable: Joi.boolean()
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("العقار قابل للسكن"),
  trans_type: optionSchema
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("نوع العقد"),
});

export const generalStepInitialValues: GeneralStepType = {
  building_num: null,
  street: null,
  floor: null,
  apt: null,
  county_id: null,
  city_id: null,
  area_id: null,
  property_type: null,
  area_space: null,
  bedrooms: null,
  bathrooms: null,
  price: null,
  property_realtor_commission: null,
  buyer_realtor_commission: null,
  year_built: null,
  status: null,
  description: null,
  exp_date: null,
  show_inst: null,
  sellers: [],
  livable: false,
  trans_type: null,
};

// additional info step -----------------------------------------------------------
export type AdditionalInfoStepType = {
  hasBalcony: boolean;
  balcony: TNumber;
  hasFans: boolean;
  fan_number: TNumber;
  water: TOption;
  // Individual boolean fields for additional options
  elevator: boolean;
  ac: boolean;
  garage: boolean;
  garden: boolean;
  jacuzzi: boolean;
  solar_system: boolean;
  pool: boolean;
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
  fan_number: Joi.when("hasFans", {
    is: true,
    then: Joi.number().required().messages(VALIDATION_MESSAGES).label("مراوح"),
    otherwise: Joi.number()
      .allow(null, "")
      .messages(VALIDATION_MESSAGES)
      .label("مراوح"),
  }),

  water: optionSchema
    .allow(null)
    .messages(VALIDATION_MESSAGES)
    .label("خط المياه الواصل للعقار"),

  // Additional options as boolean fields
  elevator: Joi.boolean().default(false),
  ac: Joi.boolean().default(false),
  garage: Joi.boolean().default(false),
  garden: Joi.boolean().default(false),
  jacuzzi: Joi.boolean().default(false),
  solar_system: Joi.boolean().default(false),
  pool: Joi.boolean().default(false),
});

export const additionalInfoStepInitialValues: AdditionalInfoStepType = {
  hasBalcony: false,
  balcony: null,
  hasFans: false,
  fan_number: null,
  water: null,
  // Additional options initial values
  elevator: false,
  ac: false,
  garage: false,
  garden: false,
  jacuzzi: false,
  solar_system: false,
  pool: false,
};

// location step --------------------------------------------------------------------
export type LocationStepType = {
  landAreaSource: TString;
  landDimensionsSource: TString;
  latitude: TNumber;
  longitude: TNumber;
  address: TString;
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
  address: Joi.string()
    .allow("")
    .messages(VALIDATION_MESSAGES)
    .label("العنوان"),
});

export const LocationStepInitialValues: LocationStepType = {
  landAreaSource: null,
  landDimensionsSource: null,
  latitude: null,
  longitude: null,
  address: null,
};

// property images step --------------------------------------------------------------
export type ImageInputFile = {
  id: number;
  path: any;
  mode: string;
  isMain: boolean;
  originalFile?: File;
};
export type PropertyImagesStepType = {
  photos: ImageInputFile[];
  mode: "add" | "edit";
};

export const propertyImagesStepSchema = Joi.object<PropertyImagesStepType>({
  photos: Joi.array()
    .items(
      Joi.object({
        path: Joi.any()
          .when("mode", {
            is: Joi.not("delete"),
            then: Joi.required(),
            otherwise: Joi.optional(),
          })
          .messages(VALIDATION_MESSAGES),
        mode: Joi.string().optional(),
        isMain: Joi.boolean(),
        originalFile: Joi.any().optional(), // Add validation for originalFile
      })
        .unknown()
        .custom((value, helpers) => {
          // Skip validation if this is a deleted item
          if (value.mode === "delete") {
            return value;
          }

          const fileToValidate = value.originalFile || value.path; // Use originalFile for validation if available

          // Validate the path value
          if (
            fileToValidate instanceof File ||
            fileToValidate instanceof Blob
          ) {
            if (fileToValidate.size < 256 * 1024) {
              return helpers.error("file.minSize", { limit: "256KB" });
            }
            if (fileToValidate.size > 5 * 1024 * 1024) {
              return helpers.error("file.maxSize", { limit: "5MB" });
            }
            if (!fileToValidate.type.startsWith("image/")) {
              return helpers.error("file.invalidType");
            }
          } else if (typeof fileToValidate === "string" && !fileToValidate) {
            return helpers.error("any.required");
          }

          return value;
        })
        .messages(VALIDATION_MESSAGES)
    )
    .custom((value, helpers) => {
      // Filter out deleted images before validation
      const activeImages = value?.filter(
        (img: ImageInputFile) => img.mode !== "delete"
      );
      const context = helpers.state.ancestors[0]; // Get parent object to access mode
      console.log({ context });

      // Validate minimum count
      if (activeImages?.length < 1) {
        return helpers.error("array.min", { limit: 1 });
      }

      // Validate maximum count based on mode
      const maxCount = context?.mode === "add" ? 5 : 32;
      if (activeImages?.length > maxCount) {
        return helpers.error("array.max", { limit: maxCount });
      }

      // Validate only one main image
      const mainImagesCount = activeImages.filter(
        (img: ImageInputFile) => img.isMain === true
      ).length;
      if (mainImagesCount > 1) {
        return helpers.error("custom.singleMainImage");
      } else if (mainImagesCount < 1) {
        return helpers.error("custom.MainImageRequired");
      }

      return value;
    })
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("الصور"),
  mode: Joi.string().valid("add", "edit").required(),
});

export const PropertyImagesStepInitialValues: PropertyImagesStepType = {
  photos: [],
  mode: "add",
};

// general step -----------------------------------------------------------
export type StatusFormType = {
  status: TOption;
};

export const statusFormSchema = Joi.object<StatusFormType>({
  status: optionSchema.required().messages(VALIDATION_MESSAGES).label("الحالة"),
});

export const statusFormInitialValues: StatusFormType = {
  status: null,
};

// listing form type
export type ListingFormType = GeneralStepType &
  AdditionalInfoStepType &
  LocationStepType &
  PropertyImagesStepType;
