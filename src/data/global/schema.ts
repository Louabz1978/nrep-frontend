import Joi from "joi";

// option schema
export const optionSchema = Joi.object({ value: Joi.string() }).unknown();

// url schema
export const urlSchema = Joi.string().regex(
  /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/,
  { name: "https://any-domain.com" }
);

// general schema types
export type TEmpty = null | undefined;
export type TString = string | null | undefined;
export type TNumber = number | null | undefined;
export type TOption = { value: string; [key: string]: unknown } | TEmpty;
