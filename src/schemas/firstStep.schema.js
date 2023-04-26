import { object, string, number, date, InferType } from "yup";

export const stepFirstSchema = object({
  title: string().required("Title is Required"),
  firstName: string()
    .matches(/^[a-zA-Z\s.]*$/, "Invalid input type")
    .required("First Name is Required"),
  middleName: string()
    .matches(/^[a-zA-Z\s.]*$/, "Invalid input type"),
  lastName: string()
    .matches(/^[a-zA-Z\s.]*$/, "Invalid input type").required('Last name is required'),
  gender: string().required("Gender is Required"),
  email: string().email("Invalid email type").required("Email is Required"),
  pan: string()
    .matches(/^[A-Z]{3}P[A-Z]{1}[0-9]{4}[A-Z]{1}$/, "Invalid Pan card")
    .required("Required"),
  dob: date()
    .max(new Date(), "Date of birth cannot be in the future")
    .required("Date of birth is required"),
  phoneNumber: string()
    .matches(/^[7-9]\d{9}$/, "Invalid phone number")
    .required("Phone number is required"),
});
