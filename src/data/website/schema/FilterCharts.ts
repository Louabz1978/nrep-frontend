import { optionSchema, type TOption, type TString } from "@/data/global/schema";
import VALIDATION_MESSAGES from "@/data/global/validationMessages";
import Joi from "joi";

export type FilterChartsType = {
  area: TOption;
  date : TString
};

export const FilterChartsSchema = Joi.object<FilterChartsType>({
  area: optionSchema
    .allow(null, "")
    .messages(VALIDATION_MESSAGES)
    .label("المنطقة"),
  date: Joi.string()
    .allow("")
    .messages(VALIDATION_MESSAGES)
    .label("التاريح"),
});
export const FilterChartsInitialValues: FilterChartsType = {
  area: null,
  date:""
};
