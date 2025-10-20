import VALIDATION_MESSAGES from "@/data/global/validationMessages";
import Joi from "joi";

export type AddBrokerForm = {
  agency_id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
};

export const addBrokerSchema = Joi.object<AddBrokerForm>({
  first_name: Joi.string()
    .min(2)
    .max(50)
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("الإسم"),

  last_name: Joi.string()
    .min(2)
    .max(50)
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("إسم العائلة"),

  email: Joi.string()
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("البريد الإلكتروني"),

  phone_number: Joi.string()
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("رقم الهاتف"),
});

export const addBrokerInitialValues: AddBrokerForm = {
  first_name: "",
  last_name: "",
  email: "",
  phone_number: "",
};
