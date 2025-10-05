import { type TString } from "@/data/global/schema";
import VALIDATION_MESSAGES from "@/data/global/validationMessages";
import Joi from "joi";

export type MarketMovementFormType = {
  area: TString;
  period: TString;
};

export const MarketMovementFormSchema = Joi.object<MarketMovementFormType>({
  area: Joi.string()
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("المنطقة"),
  period: Joi.string()
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("الفترة"),
});

export const marketMovementFormInitialValues: MarketMovementFormType = {
  area: null,
  period: null,
};
