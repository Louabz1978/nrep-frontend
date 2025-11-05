import { optionSchema, type TOption } from "@/data/global/schema";
import VALIDATION_MESSAGES from "@/data/global/validationMessages";
import Joi from "joi";

export type FilterForm = {
  start_month: TOption;
  start_year: TOption;
  end_month: TOption;
  end_year: TOption;
  broker: TOption;
};

export const filterFormSchema = Joi.object<FilterForm>({
  start_month: optionSchema.messages(VALIDATION_MESSAGES).label("الشهر الإبتدائي").allow(null),
  start_year: optionSchema.messages(VALIDATION_MESSAGES).label("السنة الإبتدائية").allow(null),
  end_month: optionSchema.messages(VALIDATION_MESSAGES).label("الشهر الختامي").allow(null),
  end_year: optionSchema.messages(VALIDATION_MESSAGES).label("السنة الختامية").allow(null),
  broker: optionSchema.messages(VALIDATION_MESSAGES).label("الوسيط").allow(null),
});

export const filterFormInitialValues: FilterForm = {
  start_month: null,
  start_year: null,
  end_month: null,
  end_year: null,
  broker: null,
};
