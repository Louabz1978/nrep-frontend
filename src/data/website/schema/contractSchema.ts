import type { TNumber } from "@/data/global/schema";
import VALIDATION_MESSAGES from "@/data/global/validationMessages";
import Joi from "joi";

export type ContractFormType = {
  mls: TNumber;
};

export const ContractFormSchema = Joi.object<ContractFormType>({
  mls: Joi.number().messages(VALIDATION_MESSAGES).label("mls"),
});
export const contractFormInitialValues: ContractFormType = {
  mls: null,
};
