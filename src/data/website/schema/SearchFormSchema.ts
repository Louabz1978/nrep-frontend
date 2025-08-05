import { optionSchema, type TNumber, type TOption, type TString } from "@/data/global/schema";
import VALIDATION_MESSAGES from "@/data/global/validationMessages";
import Joi from "joi";

export type SearchFormType = {
  governorate: TOption;
  city: TOption;
  street_name: TString;
  building_number : TNumber;
  MLS : TNumber;
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
  MLS: Joi.number()
    .messages(VALIDATION_MESSAGES)
    .label("MLS"),
  building_number: Joi.number()
    .messages(VALIDATION_MESSAGES)
    .label("رقم االبناء"),
});

export const searchFormInitialValues: SearchFormType = {
  governorate: null,
  city: null,
  street_name: "",
  building_number:null,
  MLS:null,
};
