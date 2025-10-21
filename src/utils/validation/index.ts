import * as yup from "yup";

export const requiredString = yup.string().required("This field is required");
