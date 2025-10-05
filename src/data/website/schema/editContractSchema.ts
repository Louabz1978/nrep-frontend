import type { TString, TOption } from "@/data/global/schema";
import VALIDATION_MESSAGES from "@/data/global/validationMessages";
import Joi from "joi";

export type EditSeller = {
  id?: string | number | null;
  name: string | TOption | null | undefined;
  signature: TString | null | undefined;
};

export type EditBuyer = {
  id?: string | number | null;
  name: TOption | null | undefined;
  signature: TString | null | undefined;
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
  seller_agent_name?: string | null;
  seller_agent_id?: string | number | null;
  seller_agent_signature?: TString | null;
  buyer_agent_name?: string | null;
  buyer_agent_id?: string | number | null;
  buyer_agent_signature?: TString | null;
};

const EditSellerSchema = Joi.object<EditSeller>({
  id: Joi.any().label("معرّف البائع"),
  name: Joi.alternatives()
    .try(Joi.string(), Joi.object())
    .messages(VALIDATION_MESSAGES)
    .label("اسم البائع"),
  signature: Joi.any()
    .allow(null, "")
    .messages(VALIDATION_MESSAGES)
    .label("توقيع البائع"),
});

const EditBuyerSchema = Joi.object<EditBuyer>({
  id: Joi.any().label("معرّف المشتري"),
  name: Joi.object().messages(VALIDATION_MESSAGES).label("اسم المشتري"),
  signature: Joi.any()
    .allow(null, "")
    .messages(VALIDATION_MESSAGES)
    .label("توقيع المشتري"),
  mother_name_surname: Joi.string().allow("").optional().label("اسم الأم"),
  place_birth: Joi.string().allow("").optional().label("مكان الولادة"),
  national_number: Joi.number().allow(null).optional().label("الرقم الوطني"),
  registry: Joi.string().allow("").optional().label("القيد"),
});

export const EditContractFormSchema = Joi.object<EditContractFormType>({
  contract_file: Joi.string()
    .allow(null, "")
    .optional()
    .messages(VALIDATION_MESSAGES)
    .label("ملف العقد"),
  sellers: Joi.array()
    .items(EditSellerSchema)
    .messages(VALIDATION_MESSAGES)
    .label("البائعون"),
  buyers: Joi.array()
    .items(EditBuyerSchema)
    .messages(VALIDATION_MESSAGES)
    .label("المشترون"),
  mls: Joi.number().allow(null).optional().label("MLS"),
  seller_agent_name: Joi.string()
    .allow(null, "")
    .optional()
    .label("اسم وكيل البائع"),
  seller_agent_id: Joi.any().allow(null).optional().label("معرّف وكيل البائع"),
  seller_agent_signature: Joi.any()
    .allow(null, "")
    .optional()
    .label("توقيع وكيل البائع"),
  buyer_agent_name: Joi.string()
    .allow(null, "")
    .optional()
    .label("اسم وكيل المشتري"),
  buyer_agent_id: Joi.any().allow(null).optional().label("معرّف وكيل المشتري"),
  buyer_agent_signature: Joi.any()
    .allow(null, "")
    .optional()
    .label("توقيع وكيل المشتري"),
});

export const editContractFormInitialValues: EditContractFormType = {
  contract_file: null,
  sellers: [],
  buyers: [],
  mls: null,
  seller_agent_name: undefined,
  seller_agent_id: undefined,
  seller_agent_signature: undefined,
  buyer_agent_name: undefined,
  buyer_agent_id: undefined,
  buyer_agent_signature: undefined,
};
