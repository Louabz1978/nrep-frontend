import type { TString, TOption } from "@/data/global/schema";
import VALIDATION_MESSAGES from "@/data/global/validationMessages";
import Joi from "joi";

export type EditSeller = {
  id?: string;
  name: TOption;
  signature: TString;
};

export type EditBuyer = {
  id?: string;
  name: TOption;
  signature: TString;
  mother_name_surname?: string;
  place_birth?: string;
  national_number?: number;
  registry?: string;
};

export type EditContractFormType = {
  contract_file: File | null;
  sellers: EditSeller[];
  buyers: EditBuyer[];
  mls: number | null;
};

const EditSellerSchema = Joi.object<EditSeller>({
  id: Joi.any().label("معرّف البائع"),
  name: Joi.any().messages(VALIDATION_MESSAGES).label("اسم البائع"),
  signature: Joi.any().messages(VALIDATION_MESSAGES).label("توقيع البائع"),
});

const EditBuyerSchema = Joi.object<EditBuyer>({
  id: Joi.any().label("معرّف المشتري"),
  name: Joi.any().messages(VALIDATION_MESSAGES).label("اسم المشتري"),
  signature: Joi.any().messages(VALIDATION_MESSAGES).label("توقيع المشتري"),
  mother_name_surname: Joi.string().allow("").optional().label("اسم الأم"),
  place_birth: Joi.string().allow("").optional().label("مكان الولادة"),
  national_number: Joi.number().allow(null).optional().label("الرقم الوطني"),
  registry: Joi.string().allow("").optional().label("القيد"),
});

export const EditContractFormSchema = Joi.object<EditContractFormType>({
  contract_file: Joi.any().required().messages(VALIDATION_MESSAGES).label("ملف العقد"),
  sellers: Joi.array().items(EditSellerSchema).messages(VALIDATION_MESSAGES).label("البائعون"),
  buyers: Joi.array().items(EditBuyerSchema).messages(VALIDATION_MESSAGES).label("المشترون"),
  mls: Joi.number().allow(null).optional().label("MLS"),
});

export const editContractFormInitialValues: EditContractFormType = {
  contract_file: null,
  sellers: [],
  buyers: [],
  mls: null,
};
