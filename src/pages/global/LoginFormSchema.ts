import VALIDATION_MESSAGES from "@/data/global/validationMessages";
import Joi from "joi";

export interface LoginFormType {
  username: string;
  password: string;

}
export const LOGIN_FORM_SCHEMA = Joi.object({
  username: Joi.string()
    .required()
    .min(2)
    .max(50)
    .trim()
    .messages(VALIDATION_MESSAGES)
    .label("اسم المستخدم"),
  password: Joi.string()
    .required()
    .min(6)
    .max(50)
    .messages(VALIDATION_MESSAGES)
    .label("كلمة المرور"),

});

export const LOGIN_FORM_SCHEMA_INITIAL_VALUES = {
  username: "",
  password: "",

};

export default LOGIN_FORM_SCHEMA;
