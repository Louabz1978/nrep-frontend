import { optionSchema, type TOption } from "@/data/global/schema";
import Joi from "joi";

export type RealtorFilterForm = {
  start_month: TOption;
  start_year: TOption;
  end_month: TOption;
  end_year: TOption;
};

export const realtorFilterFormSchema = Joi.object<RealtorFilterForm>({
  start_month: optionSchema,
  start_year: optionSchema,
  end_month: optionSchema,
  end_year: optionSchema,
});

export const realtorFilterFormInitialValues: RealtorFilterForm = {
  start_month: null,
  start_year: null,
  end_month: null,
  end_year: null,
};
