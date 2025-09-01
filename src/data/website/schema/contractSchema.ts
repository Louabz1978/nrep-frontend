import type { TNumber, TString } from "@/data/global/schema";
import VALIDATION_MESSAGES from "@/data/global/validationMessages";
import Joi from "joi";

export type ContractFormType = {
  mls: TNumber;
  TheSeller?: TString;
  sellerName?: TString;
  sellerMother?: TString;
  sellerBirth?: TString;
  sellerNationalId?: TString;
  buyerName?: TString;
  buyerMother?: TString;
  buyerBirth?: TString;
  buyerNationalId?: TString;
  buildingNumber?: TString;
  streetName?: TString;
  floor?: TString;
  apartment?: TString;
};

export const ContractFormSchema = Joi.object<ContractFormType>({
  mls: Joi.number().messages(VALIDATION_MESSAGES).label("mls"),
  TheSeller: Joi.string().messages(VALIDATION_MESSAGES).label("البائع"),
  sellerName: Joi.string().optional().messages(VALIDATION_MESSAGES).label("البائع"),
  sellerMother: Joi.string().optional().messages(VALIDATION_MESSAGES).label("والدته"),
  sellerBirth: Joi.string().optional().messages(VALIDATION_MESSAGES).label("تولد"),
  sellerNationalId: Joi.string().optional().messages(VALIDATION_MESSAGES).label("الرقم الوطني"),
  buyerName: Joi.string().optional().messages(VALIDATION_MESSAGES).label("المشتري"),
  buyerMother: Joi.string().optional().messages(VALIDATION_MESSAGES).label("والدته"),
  buyerBirth: Joi.string().optional().messages(VALIDATION_MESSAGES).label("تولد"),
  buyerNationalId: Joi.string().optional().messages(VALIDATION_MESSAGES).label("الرقم الوطني"),
  buildingNumber: Joi.string().optional().messages(VALIDATION_MESSAGES).label("رقم البناء"),
  streetName: Joi.string().optional().messages(VALIDATION_MESSAGES).label("اسم الشارع"),
  floor: Joi.string().optional().messages(VALIDATION_MESSAGES).label("الطابق"),
  apartment: Joi.string().optional().messages(VALIDATION_MESSAGES).label("الشقة"),
});

export const contractFormInitialValues: ContractFormType = {
  mls: null,
  TheSeller: "",
  sellerName: "",
  sellerMother: "",
  sellerBirth: "",
  sellerNationalId: "",
  buyerName: "",
  buyerMother: "",
  buyerBirth: "",
  buyerNationalId: "",
  buildingNumber: "",
  streetName: "",
  floor: "",
  apartment: "",
};
