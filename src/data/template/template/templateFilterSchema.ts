import Joi from "joi";

const TEMPLATES_FILTER_SCHEMA = Joi.object({
  search: Joi.string(),
  age: Joi.string(),
  gender: Joi.object({ value: Joi.number().allow(null) }),
});

export const TEMPLATES_FILTER_SCHEMA_INITIAL = {
  search: "",
  age: undefined,
  gender: null,
};

export default TEMPLATES_FILTER_SCHEMA;
