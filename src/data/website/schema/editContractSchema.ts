import type { TString } from "@/data/global/schema";
import VALIDATION_MESSAGES from "@/data/global/validationMessages";
import Joi from "joi";

export type EditContractFormType = {
  agent_id: TString;
  contract_file: File | null;
  agent_signature: TString;
  seller_name?: TString;
  buyer_name?: TString;
};

export const EditContractFormSchema = Joi.object<EditContractFormType>({
  agent_id: Joi.string().required().messages(VALIDATION_MESSAGES).label("الوكيل العقاري"),
  contract_file: Joi.any().required().messages(VALIDATION_MESSAGES).label("ملف العقد"),
  agent_signature: Joi.string().messages(VALIDATION_MESSAGES).label("توقيع الوكيل"),
  seller_name: Joi.any().optional().label("البائع"),
  buyer_name: Joi.any().optional().label("المشتري"),
});

export const editContractFormInitialValues: EditContractFormType = {
  agent_id: "",
  contract_file: null,
  agent_signature: "",
  seller_name: "",
  buyer_name: "",
};
