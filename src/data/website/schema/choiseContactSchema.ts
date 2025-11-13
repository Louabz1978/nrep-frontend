import { optionSchema, type TOption } from "@/data/global/schema";
import VALIDATION_MESSAGES from "@/data/global/validationMessages";
import Joi from "joi";

export type ConsumerType = {
  consumer_id: TOption;
};

export const consumerSchema = Joi.object({
  consumer_id: optionSchema
    .messages(VALIDATION_MESSAGES)
    .label("جهة الاتصال"),
})

export const consumerInitialValues: ConsumerType = {
  consumer_id: null,
};
