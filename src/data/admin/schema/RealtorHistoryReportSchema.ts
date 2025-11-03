import Joi from "joi";
import { optionSchema, type TOption } from "@/data/global/schema";

export type RealtorHistoryReportFormType = {
  from_month: TOption;
  from_year: TOption;
  to_month: TOption;
  to_year: TOption;
};

export const realtorHistoryReportFormSchema =
  Joi.object<RealtorHistoryReportFormType>({
    from_month: optionSchema.allow(null, ""),
    from_year: optionSchema.allow(null, ""),
    to_month: optionSchema.allow(null, ""),
    to_year: optionSchema.allow(null, ""),
  });

const now = new Date();
const currentMonth = String(now.getMonth() + 1);
const currentYear = String(now.getFullYear());

export const realtorHistoryReportInitialValues: RealtorHistoryReportFormType = {
  from_month: { value: currentMonth, label: `الشهر: ${Number(currentMonth)}` },
  from_year: { value: currentYear, label: `السنة: ${Number(currentYear)}` },
  to_month: { value: currentMonth, label: `الشهر: ${Number(currentMonth)}` },
  to_year: { value: currentYear, label: `السنة: ${Number(currentYear)}` },
};


