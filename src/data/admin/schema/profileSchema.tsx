import Joi from "joi";
import type { TNumber, TString } from "@/data/global/schema";
import VALIDATION_MESSAGES from "@/data/global/validationMessages";

export type Profile = {
  full_name: TString;
  email: TString;
  license: TNumber;
  agency_name: TString;
  agency_email: TString;
  agency_license: TNumber;
  agency_address: TString;
  my_active_listings: TString;
  image_url: TString;
};

export const profileSchema = Joi.object<Profile>({
  full_name: Joi.string()
    .label("الاسم الكامل")
    .min(3)
    .max(100)
    .required()
    .messages(VALIDATION_MESSAGES),

  email: Joi.string()
    .label("البريد الإلكتروني")
    .email({ tlds: { allow: false } })
    .required()
    .messages(VALIDATION_MESSAGES),

  license: Joi.number()
    .label("رقم الترخيص")
    .integer()
    .min(10000)
    .max(99999999)
    .required()
    .messages(VALIDATION_MESSAGES),

  agency_name: Joi.string()
    .label("اسم الوكالة")
    .min(2)
    .max(100)
    .required()
    .messages(VALIDATION_MESSAGES),

  agency_email: Joi.string()
    .label("البريد الإلكتروني للوكالة")
    .email({ tlds: { allow: false } })
    .required()
    .messages(VALIDATION_MESSAGES),

  agency_license: Joi.number()
    .label("رقم ترخيص الوكالة")
    .integer()
    .min(10000)
    .max(99999999)
    .required()
    .messages(VALIDATION_MESSAGES),

  agency_address: Joi.string()
    .label("عنوان الوكالة")
    .min(10)
    .max(255)
    .required()
    .messages(VALIDATION_MESSAGES),

  my_active_listings: Joi.string()
    .label("عروضي النشطة")
    .min(1)
    .max(100)
    .optional()
    .allow(null, "")
    .messages(VALIDATION_MESSAGES),

  image_url: Joi.string()
    .label("رابط الصورة")
    .uri()
    .optional()
    .allow(null, "")
    .messages(VALIDATION_MESSAGES),
});

export const profileInitialValues: Profile = {
  full_name: null,
  email: null,
  license: null,
  agency_name: null,
  agency_email: null,
  agency_license: null,
  agency_address: null,
  my_active_listings: null,
  image_url: null,
};
