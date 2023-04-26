import { oneOf } from "prop-types";
import { object, string, number, date, InferType } from "yup";

export const loginSchema = object({
  phone: string()
    .length(10, "Length can not exceed 10 characters")
    .required("Required"),
});
