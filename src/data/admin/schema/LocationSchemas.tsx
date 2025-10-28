import { optionSchema, type TNumber, type TOption, type TString } from "@/data/global/schema";
import VALIDATION_MESSAGES from "@/data/global/validationMessages";
import Joi from "joi";

// County Schema
export type CountyForm = {
  title: TString;
};

export const countySchema = Joi.object<CountyForm>({
  title: Joi.string()
    .min(2)
    .max(100)
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("اسم المحافظة"),
});

export const countyInitialValues: CountyForm = {
  title: "",
};

// City Schema
export type CityForm = {
  title: TString;
  county_id: TNumber;
};

export const citySchema = Joi.object<CityForm>({
  title: Joi.string()
    .min(2)
    .max(100)
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("اسم المدينة"),

  county_id: Joi.number()
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("المحافظة"),
});

export const cityInitialValues: CityForm = {
  title: null,
  county_id: null,
};

// Area Schema
export type AreaForm = {
  title: TString;
  city_id: TOption;
};

export const areaSchema = Joi.object<AreaForm>({
  title: Joi.string()
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
  title: null,
  city_id: null,
};

// Update Schemas
export type UpdateCountyForm = {
  title: TString;
};

export const updateCountySchema = Joi.object<UpdateCountyForm>({
  title: Joi.string()
    .min(2)
    .max(100)
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("اسم المحافظة"),
});

export type UpdateCityForm = {
  name: TString;
  county_id: TOption;
};

export const updateCitySchema = Joi.object<UpdateCityForm>({
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

export type UpdateAreaForm = {
  name: TString;
  city_id: TOption;
};

export const updateAreaSchema = Joi.object<UpdateAreaForm>({
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
