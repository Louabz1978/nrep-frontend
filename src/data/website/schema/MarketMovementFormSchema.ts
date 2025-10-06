import { optionSchema, type TOption } from "@/data/global/schema";
import VALIDATION_MESSAGES from "@/data/global/validationMessages";
import Joi from "joi";

export type MarketMovementFormType = {
  area: TOption;
  year: TOption;
  month: TOption;
};

export const MarketMovementFormSchema = Joi.object<MarketMovementFormType>({
  area: optionSchema
    .allow(null, "")
    .messages(VALIDATION_MESSAGES)
    .label("المنطقة"),
  year: optionSchema
    .allow(null, "")
    .messages(VALIDATION_MESSAGES)
    .label("السنة"),
  month: optionSchema
    .allow(null, "")
    .messages(VALIDATION_MESSAGES)
    .label("الشهر"),
});

export const marketMovementFormInitialValues: MarketMovementFormType = {
  area: null,
  year: null,
  month: null,
};
