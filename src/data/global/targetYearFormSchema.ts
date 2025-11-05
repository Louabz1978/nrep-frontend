import VALIDATION_MESSAGES from "@/data/global/validationMessages";
import Joi from "joi";
import { optionSchema, type TOption } from "./schema";

export interface TargetYearFormType {
  target_year: TOption
}

export const TARGET_YEAR_FORM_SCHEMA = Joi.object({
  target_year: optionSchema
    .required()
    .messages(VALIDATION_MESSAGES)
    .allow(null),
});

export const TARGET_YEAR_FORM_SCHEMA_INITIAL_VALUES: TargetYearFormType = {
  target_year: null,
};

export default TARGET_YEAR_FORM_SCHEMA;
