import VALIDATION_MESSAGES from "@/data/global/validationMessages";
import Joi from "joi";

export interface ResetPasswordFormType {
  password: string;
  confirm: string;
}

export const RESET_PASSWORD_FORM_SCHEMA = Joi.object({
  password: Joi.string()
    .required()
    .min(4)
    .max(50)
    .trim()
    .messages(VALIDATION_MESSAGES)
    .label("كلمة المرور الجديدة"),
  confirm: Joi.any()
    .required()
    .valid(Joi.ref("password"))
    .messages({
      "any.only": "كلمات المرور غير متطابقة",
      "any.required": "تأكيد كلمة المرور مطلوب.",
      ...VALIDATION_MESSAGES,
    })
    .label("تأكيد كلمة المرور"),
});

export const RESET_PASSWORD_FORM_SCHEMA_INITIAL_VALUES: ResetPasswordFormType = {
  password: "",
  confirm: "",
};

export default RESET_PASSWORD_FORM_SCHEMA;
