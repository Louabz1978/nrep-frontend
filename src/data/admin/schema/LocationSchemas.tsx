import { optionSchema, type TOption, type TString } from "@/data/global/schema";
import VALIDATION_MESSAGES from "@/data/global/validationMessages";
import Joi from "joi";

// County Schema
export type CountyForm = {
  name: TString;
};

export const countySchema = Joi.object<CountyForm>({
  name: Joi.string()
    .min(2)
    .max(100)
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("اسم المحافظة"),
});

export const countyInitialValues: CountyForm = {
  name: "",
};

// City Schema
export type CityForm = {
  name: TString;
  county_id: TOption;
};

export const citySchema = Joi.object<CityForm>({
  name: Joi.string()
    .min(2)
    .max(100)
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("اسم المدينة"),

    county_id: optionSchema
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("المحافظة"),
});

export const cityInitialValues: CityForm = {
  name: null ,
  county_id: null,
};

// Area Schema
export type AreaForm = {
  name: TString;
  city_id: TOption;
};

export const areaSchema = Joi.object<AreaForm>({
  name: Joi.string()
    .min(2)
    .max(100)
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("اسم المنطقة"),

    city_id: optionSchema
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("المدينة"),
});

export const areaInitialValues: AreaForm = {
  name: null ,
  city_id: null,
};


