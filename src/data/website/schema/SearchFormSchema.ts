import { optionSchema, type TOption, type TString } from "@/data/global/schema";
import VALIDATION_MESSAGES from "@/data/global/validationMessages";
import Joi from "joi";

export type SearchFormType = {
  governorate: TOption;
  city: TOption;
  street_name: TString;
  postal_code: TString;
  street_direction: TOption;
  street_suffix: TOption;
};

export const searchFormSchema = Joi.object<SearchFormType>({
  governorate: optionSchema
    .allow(null, "")
    .messages(VALIDATION_MESSAGES)
    .label("المحافظة"),
  city: optionSchema
    .allow(null, "")
    .messages(VALIDATION_MESSAGES)
    .label("المدينة"),
  street_name: Joi.string()
    .allow("")
    .messages(VALIDATION_MESSAGES)
    .label("اسم الشارع"),
  postal_code: Joi.string()
    .allow("")
    .messages(VALIDATION_MESSAGES)
    .label("الرمز البريدي"),
  street_direction: optionSchema
    .allow(null, "")
    .messages(VALIDATION_MESSAGES)
    .label("اتجاه الشارع"),
  street_suffix: optionSchema
    .allow(null, "")
    .messages(VALIDATION_MESSAGES)
    .label("لاحقة الشارع"),
});

export const searchFormInitialValues: SearchFormType = {
  governorate: null,
  city: null,
  street_name: "",
  postal_code: "",
  street_direction: null,
  street_suffix: null,
};
