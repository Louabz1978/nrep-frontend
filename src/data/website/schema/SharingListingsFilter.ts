import { optionSchema, type TOption } from "@/data/global/schema";
import VALIDATION_MESSAGES from "@/data/global/validationMessages";
import Joi from "joi";

// Range type for min/max values
export type RangeType = {
  min: number | null;
  max: number | null;
} | null;

export type SharingListingsFilterType = {
  city_id: TOption;
  area_id: TOption;
  area_space: RangeType;
  price: RangeType;
  bedrooms: RangeType;
  bathrooms: RangeType;
};

// Range schema for min/max validation
const rangeSchema = Joi.object({
  min: Joi.number()
    .allow(null, "")
    .min(0)
    .messages(VALIDATION_MESSAGES)
    .label("الحد الأدنى"),
  max: Joi.number()
    .allow(null, "")
    .min(0)
    .messages(VALIDATION_MESSAGES)
    .label("الحد الأعلى"),
})
  .allow(null)
  .custom((value, helpers) => {
    // If range is null or undefined, it's valid (optional field)
    if (!value) {
      return value;
    }

    // If both min and max are provided, ensure max >= min
    if (
      value.min !== null &&
      value.min !== undefined &&
      value.min !== "" &&
      value.max !== null &&
      value.max !== undefined &&
      value.max !== ""
    ) {
      if (Number(value.max) < Number(value.min)) {
        return helpers.error("any.custom", {
          message: "الحد الأعلى يجب أن يكون أكبر من أو يساوي الحد الأدنى",
        });
      }
    }
    return value;
  });

export const sharingListingsFilterSchema =
  Joi.object<SharingListingsFilterType>({
    city_id: optionSchema
      .allow(null, "")
      .messages(VALIDATION_MESSAGES)
      .label("المدينة"),
    area_id: optionSchema
      .allow(null, "")
      .messages(VALIDATION_MESSAGES)
      .label("الحي"),
    area_space: rangeSchema.messages(VALIDATION_MESSAGES).label("المساحة"),
    price: rangeSchema.messages(VALIDATION_MESSAGES).label("السعر"),
    bedrooms: rangeSchema.messages(VALIDATION_MESSAGES).label("غرف النوم"),
    bathrooms: rangeSchema.messages(VALIDATION_MESSAGES).label("دورات المياه"),
  });

export const sharingListingsFilterInitialValues: SharingListingsFilterType = {
  city_id: null,
  area_id: null,
  area_space: null,
  price: null,
  bedrooms: null,
  bathrooms: null,
};
