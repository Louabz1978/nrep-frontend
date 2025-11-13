import { optionSchema, type TOption, type TString } from "@/data/global/schema";
import VALIDATION_MESSAGES from "@/data/global/validationMessages";
import Joi from "joi";

export type NotificationFormType = {
  recipient_id?: TOption;
  title: TString;
  body: TString;
};

export const NotificationFormSchema = Joi.object<NotificationFormType>({
  recipient_id: optionSchema
    .allow(null)
    .messages(VALIDATION_MESSAGES)
    .label("المستلم"),
  title: Joi.string()
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("العنوان"),
  body: Joi.string()
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("نص الإشعار"),
});

export const notificationFormInitialValues: NotificationFormType = {
  recipient_id: 0,
  title: null,
  body: null,
};

