import { optionSchema, type TOption } from "@/data/global/schema";
import VALIDATION_MESSAGES from "@/data/global/validationMessages";
import Joi from "joi";

export type FilterChartsType = {
  area: TOption;
  date: TOption;
};

export const FilterChartsSchema = Joi.object<FilterChartsType>({
  area: optionSchema
    .allow(null, "")
    .messages(VALIDATION_MESSAGES)
    .label("المنطقة"),
  date: optionSchema
    .allow(null, "")
    .messages(VALIDATION_MESSAGES)
    .label("التاريخ"),
});
export const FilterChartsInitialValues: FilterChartsType = {
  area: { value: "الانشاءات", title: "الانشاءات" },
  date: { value: "1 year", label: "سنة" },
};
