import { object, string, number, date, InferType } from "yup";

export const stepSecondSchema = object({
  motherName: string()
  .matches(/^[a-zA-Z\s.]*$/, "Invalid input type")
  .required("Mother Name is Required"),
  fatherName: string()
  .matches(/^[a-zA-Z\s.]*$/, "Invalid input type")
  .required("Father Name is Required"),
  education: string().required('Education is Required'),
  maritalStatus: string().required('Education is Required'),
});
