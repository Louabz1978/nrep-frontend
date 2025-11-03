import Joi from "joi";
import { optionSchema, type TOption } from "@/data/global/schema";

export type TopAgenciesReportFormType = {
  month: TOption;
  year: TOption;
};

export const topAgenciesReportFormSchema = Joi.object<TopAgenciesReportFormType>({
  month: optionSchema.allow(null, ""),
  year: optionSchema.allow(null, ""),
});

const now = new Date();
const currentMonth = String(now.getMonth() + 1);
const currentYear = String(now.getFullYear());

export const topAgenciesReportInitialValues: TopAgenciesReportFormType = {
  month: { value: currentMonth, label: `الشهر: ${Number(currentMonth)}` },
  year: { value: currentYear, label: `السنة: ${Number(currentYear)}` },
};


