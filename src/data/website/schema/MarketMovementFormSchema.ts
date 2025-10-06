import { type TString } from "@/data/global/schema";
import VALIDATION_MESSAGES from "@/data/global/validationMessages";
import Joi from "joi";

export type MarketMovementFormType = {
  area: TString;
  year: number;
  month: number;
};

export const MarketMovementFormSchema = Joi.object<MarketMovementFormType>({
  area: Joi.string()
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("المنطقة"),
  year: Joi.number()
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("السنة"),
  month: Joi.number()
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("الشهر"),
});

export const marketMovementFormInitialValues: MarketMovementFormType = {
  area: null, 
  year: 0,
  month: 0,
};
