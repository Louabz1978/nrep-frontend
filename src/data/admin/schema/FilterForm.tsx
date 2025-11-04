import { optionSchema, type TOption, type TString } from "@/data/global/schema";
import VALIDATION_MESSAGES from "@/data/global/validationMessages";
import Joi from "joi";

export type FilterForm = {
  user_id: TOption;
  start_month: TOption;
  start_year: TOption;
  end_month: TOption;
  end_year: TOption;
};

export const filterFormSchema = Joi.object<FilterForm>({
  user_id: optionSchema.allow(null).messages(VALIDATION_MESSAGES),
  start_month: optionSchema
    .allow(null)
    .messages(VALIDATION_MESSAGES)
    .label("الشهر الإبتدائي"),
  start_year: optionSchema
    .allow(null)
    .messages(VALIDATION_MESSAGES)
    .label("السنة الإبتدائية"),
  end_month: optionSchema
    .allow(null)
    .messages(VALIDATION_MESSAGES)
    .label("الشهر الختامي"),
  end_year: optionSchema
    .allow(null)
    .messages(VALIDATION_MESSAGES)
    .label("السنة الختامية"),
});

export const filterFormInitialValues: FilterForm = {
  user_id: null,
  start_month: null,
  start_year: null,
  end_month: null,
  end_year: null,
};
