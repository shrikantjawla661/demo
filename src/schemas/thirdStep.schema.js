import { object, string, number, date, InferType } from "yup";

export const stepThirdSchema = object({
  p_addressLine1: string()
    .matches(/^[a-zA-Z0-9, ]+$/, "Invalid address")
    .required("Required"),
  p_addressLine2: string()
    .matches(/^[a-zA-Z0-9, ]+$/, "Invalid address")
    .required("Required"),
  p_pincode: string().length(6,`Length can only be 6 values`).required("Required"),
  o_addressLine1: string()
    .matches(/^[a-zA-Z0-9, ]+$/, "Invalid address")
    .required("Required"),
  o_addressLine2: string()
    .matches(/^[a-zA-Z0-9, ]+$/, "Invalid address")
    .required("Required"),
  o_pincode: string().length(6,`Length can only be 6 values`).required("Required"),
});
