import Joi from "joi";
import { optionSchema, type TOption } from "@/data/global/schema";

export type TopAgenciesReportFormType = {
  month: TOption;
  year: TOption;
  agency?: TOption;
};

export const topAgenciesReportFormSchema = Joi.object<TopAgenciesReportFormType>({
  month: optionSchema.allow(null, ""),
  year: optionSchema.allow(null, ""),
  agency: optionSchema.allow(null, ""),
});


export const topAgenciesReportInitialValues: TopAgenciesReportFormType = {
  month:null,
  year: null,
  agency: null,
};


