import { object, string, number, date, InferType } from "yup";

export const stepFourthSchema = object({
  industry_type: string(),
  monthly_income: number(),
  company_name: string()
    .matches(/^[a-zA-Z\s.]*$/, "Invalid input type")
    ,
  s_work_sector: string(),
  total_years_of_experience_in_current_company: number(),
  card_display_name: string()
    .matches(/^[a-zA-Z\s.]*$/, "Invalid input type")
    ,
  employmentType: string(),
  business_name: string()
    .matches(/^[a-zA-Z\s.]*$/, "Invalid input type")
    ,
  income_source: string(),
  ownership_type: string(),
  business_nature: string(),
  annual_income: number(),
  total_year_of_experience_in_current_business: number(),
  b_work_sector: string(),
});
