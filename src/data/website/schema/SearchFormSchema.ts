import {
  optionSchema,
  type TNumber,
  type TOption,
  type TString,
} from "@/data/global/schema";
import VALIDATION_MESSAGES from "@/data/global/validationMessages";
import Joi from "joi";

export type SearchFormType = {
  area: TOption;
  city: TOption;
  min_price: TNumber;
  max_price: TNumber;
  mls: TNumber;
};

export const searchFormSchema = Joi.object<SearchFormType>({
  area: optionSchema
    .allow(null, "")
    .messages(VALIDATION_MESSAGES)
    .label("الحي"),
  city: optionSchema
    .allow(null, "")
    .messages(VALIDATION_MESSAGES)
    .label("المدينة"),
  min_price: Joi.number()
    .allow(null, "")
    .messages(VALIDATION_MESSAGES)
    .label("السعر (من)"),
  mls: Joi.number().allow(null, "").messages(VALIDATION_MESSAGES).label("MLS"),
  max_price: Joi.number()
    .allow(null, "")
    .messages(VALIDATION_MESSAGES)
    .label("السعر (إلى)"),
});

export const searchFormInitialValues: SearchFormType = {
  area: null,
  city: null,
  max_price: null,
  min_price: null,
  mls: null,
};
