import { type TString } from "@/data/global/schema";
import VALIDATION_MESSAGES from "@/data/global/validationMessages";
import Joi from "joi";

export type MarketMovementFormType = {
  area: TString;
  month: TString;
  year: TString;
};

export const MarketMovementFormSchema = Joi.object<MarketMovementFormType>({
  area: Joi.optional()
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("المنطقة"),
  month: Joi.optional()
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("الشهر"),
  year: Joi.number()
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("السنة"),
});

export const marketMovementFormInitialValues: MarketMovementFormType = {
  area: "",
  month: "",
  year: "",
};
