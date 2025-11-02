import { optionSchema, type TOption, type TString } from "@/data/global/schema";
import Joi from "joi";

export type FilterForm = {
  start_month: TOption;
  start_year: TOption;
  end_month: TOption;
  end_year: TOption;
};

export const filterFormSchema = Joi.object<FilterForm>({
  start_month: optionSchema,
  start_year: optionSchema,
  end_month: optionSchema,
  end_year: optionSchema,
});

export const filterFormInitialValues: FilterForm = {
  start_month: null,
  start_year: null,
  end_month: null,
  end_year: null,
};
