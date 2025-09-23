import type { TNumber, TString } from "@/data/global/schema";
import Joi from "joi";

export interface ClosingFormData {
  buyer_agent: TString;
  buyer_agent_commission: TNumber;
  seller_agent_commission: TNumber;
  closing_date: string;
  closing_price: TNumber;
}

export const closingFormSchema = Joi.object<ClosingFormData>({
  buyer_agent: Joi.object({
    label: Joi.string().required(),
    value: Joi.string().required(),
  })
    .required()
    .label("وكيل المشتري")
    .messages({
      "any.required": "حقل وكيل المشتري مطلوب",
      "string.empty": "حقل وكيل المشتري لا يمكن أن يكون فارغًا",
    }),
  buyer_agent_commission: Joi.number()
    .required()
    .min(0)
    .max(100)
    .label("نسبة وكيل المشتري")
    .messages({
      "any.required": "حقل نسبة وكيل المشتري مطلوب",
      "number.base": "حقل نسبة وكيل المشتري يجب أن يكون رقمًا",
      "number.min": "نسبة وكيل المشتري لا يمكن أن تكون أقل من 0",
      "number.max": "نسبة وكيل المشتري لا يمكن أن تكون أكثر من 100",
    }),
  seller_agent_commission: Joi.number()
    .required()
    .min(0)
    .max(100)
    .label("نسبة وكيل البائع")
    .messages({
      "any.required": "حقل نسبة وكيل البائع مطلوب",
      "number.base": "حقل نسبة وكيل البائع يجب أن يكون رقمًا",
      "number.min": "نسبة وكيل البائع لا يمكن أن تكون أقل من 0",
      "number.max": "نسبة وكيل البائع لا يمكن أن تكون أكثر من 100",
    }),
  closing_date: Joi.string().required().label("تاريخ الإغلاق").messages({
    "any.required": "حقل تاريخ الإغلاق مطلوب",
    "string.base": "تاريخ الإغلاق يجب أن يكون تاريخًا صالحًا",
  }),
  closing_price: Joi.number().required().min(0).label("سعر الإغلاق").messages({
    "any.required": "حقل سعر الإغلاق مطلوب",
    "number.base": "حقل سعر الإغلاق يجب أن يكون رقمًا",
    "number.min": "سعر الإغلاق لا يمكن أن يكون أقل من 0",
  }),
});

export const closingFormInitialValues = {
  buyer_agent: null,
  buyer_agent_commission: null,
  seller_agent_commission: null,
  closing_date: new Date().toISOString().split("T")[0],
  closing_price: null,
};
