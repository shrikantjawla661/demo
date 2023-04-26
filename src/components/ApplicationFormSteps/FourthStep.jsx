/** @format */

import {
  Button,
  FormControl,
  FormErrorMessage,
  HStack,
  Input,
  Stack,
  Text,
  VStack,
  Select,
  Checkbox,
  FormHelperText,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fourthHit,
  getDataApi,
} from "../../redux/ApplicationForm/applicationForm.actions";
import TypeModal from "./common/Modal";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useFormik } from "formik";
import { stepFourthSchema } from "../../schemas/fourthStep.schema";

let initialState = {
  step: "4",
  industry_type: "",
  monthly_income: "",
  company_name: "",
  s_work_sector: "",
  total_years_of_experience_in_current_company: "",
  card_display_name: "",
  employmentType: "",
  business_name: "",
  income_source: "",
  ownership_type: "",
  business_nature: "",
  annual_income: "",
  total_year_of_experience_in_current_business: "",
  b_work_sector: "",
  phoneNumber: "9998954053",
  pid: "",
  tid1: "",
  tid2: "",
};

const FourthStep = ({
  inputDataToAppend,
  updateActiveStep,
  formActiveStep,
}) => {
  const dispatch = useDispatch();
  // const [inputState, setInputState] = useState(initialState);
  const [checkUserType, setCheckUserType] = useState("");
  const [isVisible, setIsVisible] = useState(true);
  const [checkBoxStatus, setCheckBoxStatus] = useState(false);
  const toast = useToast();

  const changeUserType = (value) => {
    let type = "";
    if (value === "1") type = "salaried";
    else if (value === "2") type = "selfEmployed";
    setCheckUserType(type);
    setIsVisible(false);
    setValues({
      ...values,
      employmentType: type,
    });
  };
  const {
    hitFourthLoading,
    hitFourthError,
    hitFourthSuccess,
    hiFourthStatus,
    otpToken,
    data,
    userInfo,
  } = useSelector((s) => s.applicationForm);
  const { lastStep, newUserStatus } = userInfo;

  const {
    values,
    handleBlur,
    setValues,
    errors,
    handleChange,
    handleSubmit,
    touched,
  } = useFormik({
    initialValues: initialState,
    validationSchema: stepFourthSchema,
    onSubmit: (values, actions) => {
      if (!checkBoxStatus) return;
      dispatch(fourthHit(values, "9998954053"));
    },
  });

  useEffect(() => {
    setValues({
      ...values,
      industry_type: inputDataToAppend?.aud_industry_type || "",
      monthly_income: inputDataToAppend?.aud_salary_income || "",
      company_name: inputDataToAppend?.aud_company_name || "",
      s_work_sector: inputDataToAppend?.aud_work_sector || "",
      total_years_of_experience_in_current_company:
        inputDataToAppend?.aud_company_experience || "",
      card_display_name: inputDataToAppend?.aud_display_name || "",
      employmentType: "",
      business_name: inputDataToAppend?.aud_business_name || "",
      income_source: inputDataToAppend?.aud_income_source || "",
      ownership_type: inputDataToAppend?.aud_owner_type || "",
      business_nature: inputDataToAppend?.aud_business_nature || "",
      annual_income: inputDataToAppend?.aud_salary_income || "",
      total_year_of_experience_in_current_business:
        inputDataToAppend?.aud_experience_business || "",
      b_work_sector: inputDataToAppend?.aud_occupation_code || "",
    });
    console.log(inputDataToAppend)
  }, [inputDataToAppend]);

  useEffect(() => {
    if (hiFourthStatus && otpToken) {
      updateActiveStep(Number(formActiveStep) + 1);
    }
    if (hitFourthError && !hitFourthLoading) {
      return toast({
        title: "Application Error",
        status: "error",
        position: "top",
      });
    }
  }, [hiFourthStatus, hitFourthError]);

  useEffect(() => {
    dispatch(
      getDataApi({ phoneNumber: "9998954053", step: formActiveStep.toString() })
    );
  }, []);

  const commonProps = {
    handleSubmit,
    values,
    handleChange,
    handleBlur,
    errors,
    touched,
    checkBoxStatus,
    setCheckBoxStatus,
    hitFourthLoading,
    updateActiveStep,
    formActiveStep,
  };
  return (
    <>
      <TypeModal isVisible={isVisible} changeUserType={changeUserType} />
      {(checkUserType === "salaried" && salariedForm({ ...commonProps })) ||
        (checkUserType === "selfEmployed" && selfEmployeed({ ...commonProps }))}
    </>
  );
};

export default FourthStep;

function salariedForm(props) {
  const {
    handleSubmit,
    values: inputState,
    handleChange: handleInputChange,
    handleBlur,
    errors,
    touched,
    checkBoxStatus,
    setCheckBoxStatus,
    hitFourthLoading,
    updateActiveStep,
    formActiveStep,
  } = props;
  console.log(errors);
  return (
    <VStack w={"full"} as="form" onSubmit={handleSubmit}>
      <VStack w={"full"} h={"full"} gap={"10px"}>
        {/* Title */}
        <Text
          w="100%"
          ml={"25px"}
          fontSize={{ base: 15, lg: 18 }}
          fontWeight={650}
          color={"#009ef7"}
          mt={"20px"}
        >
          Work Details
        </Text>
        <VStack
          w="100%"
          gap={"14px"}
          //   border={"1px solid black"}
        >
          <Stack w={"full"} direction={{ base: "column", lg: "row" }}>
            <FormControl
              w={"100%"}
              isInvalid={errors.monthly_income && touched.monthly_income}
            >
              <Input
                name="monthly_income"
                autoComplete="off"
                value={inputState.monthly_income}
                onChange={handleInputChange}
                color={"gray.600"}
                placeholder="Monthly Income *"
                onBlur={handleBlur}
                required
              />
              <FormErrorMessage>
                {errors.monthly_income &&
                  touched.monthly_income &&
                  errors.monthly_income}
              </FormErrorMessage>
            </FormControl>
            <FormControl
              w={"100%"}
              isInvalid={errors.industry_type && touched.industry_type}
            >
              <Select
                name="industry_type"
                value={inputState.industry_type}
                onChange={handleInputChange}
                color={"gray.600"}
                onBlur={handleBlur}
                required
              >
                <option value="" disabled>
                  Industry Type *
                </option>
                <option value="ADVERTISING_AND_MEDIA">
                  ADVERTISING AND_MEDIA
                </option>
                <option value="TRAVEL_AND_ENTERTAINMENT">
                  TRAVEL AND ENTERTAINMENT
                </option>
                <option value="BANKING">BANKING</option>
                <option value="REAL_ESTATE">REAL ESTATE</option>
                <option value="MANUFACTURING_ENGINEERING_AND_INFRASTRUCTURE">
                  MANUFACTURING ENGINEERING AND INFRASTRUCTURE
                </option>
                <option value="GOVERNMENT_SERVICE">GOVERNMENT SERVICE</option>
                <option value="INSURANCE">INSURANCE</option>
                <option value="INFORMATION_TECHNOLOGY">
                  INFORMATION TECHNOLOGY
                </option>
                <option value="ADVERTISING_AND_MEDIA">
                  ADVERTISING AND MEDIA
                </option>
                <option value="MUTUAL_FUNDS_BROKING_AND_FIS">
                  MUTUAL FUNDS BROKING AND FIS
                </option>
                <option value="TELECOM">TELECOM</option>
              </Select>
              <FormErrorMessage>
                {errors.industry_type &&
                  touched.industry_type &&
                  errors.industry_type}
              </FormErrorMessage>
            </FormControl>
          </Stack>
          <Stack w={"full"} direction={{ base: "column", lg: "row" }}>
            <FormControl
              w={"100%"}
              isInvalid={errors.company_name && touched.company_name}
            >
              <Input
                name="company_name"
                autoComplete="off"
                value={inputState.company_name}
                onChange={handleInputChange}
                color={"gray.600"}
                placeholder="Company Name *"
                onBlur={handleBlur}
                required
              />
              <FormErrorMessage>
                {errors.company_name &&
                  touched.company_name &&
                  errors.company_name}
              </FormErrorMessage>
            </FormControl>
            <FormControl
              w={"100%"}
              isInvalid={errors.s_work_sector && touched.s_work_sector}
            >
              <Select
                name="s_work_sector"
                value={inputState.s_work_sector}
                onChange={handleInputChange}
                color={"gray.600"}
                onBlur={handleBlur}
                required
              >
                <option value="" disabled>
                  Work Sector *
                </option>
                <option value="PRIVATE_LIMITED">PRIVATE LIMITED </option>
                <option value="PUBLIC_LIMITED">PUBLIC LIMITED </option>
                <option value="PROPRIETOR">PROPRIETOR </option>
                <option value="PARTNERSHIP_FIRM">PARTNERSHIP FIRM </option>
                <option value="PUBLIC_SECTOR">PUBLIC SECTOR </option>
                <option value="GOVERNMENT">GOVERNMENT </option>
                <option value="MULTINATIONAL">MULTINATIONAL </option>
                <option value="TRUST_ASSOCIATION_SOCIETY_AND_CLUB">
                  TRUST ASSOCIATION SOCIETY AND CLUB
                </option>
              </Select>
              <FormErrorMessage>
                {errors.s_work_sector &&
                  touched.s_work_sector &&
                  errors.s_work_sector}
              </FormErrorMessage>
            </FormControl>
          </Stack>
          <Stack w={"full"} direction={{ base: "column", lg: "row" }}>
            <FormControl
              w={"100%"}
              isInvalid={
                errors.total_years_of_experience_in_current_company &&
                touched.total_years_of_experience_in_current_company
              }
            >
              <Input
                required
                name="total_years_of_experience_in_current_company"
                autoComplete="off"
                value={inputState.total_years_of_experience_in_current_company}
                onChange={handleInputChange}
                color={"gray.600"}
                placeholder="Total Years of Experience in Current Company *"
                onBlur={handleBlur}
              />
              <FormErrorMessage>
                {errors.total_years_of_experience_in_current_company &&
                  touched.total_years_of_experience_in_current_company &&
                  errors.total_years_of_experience_in_current_company}
              </FormErrorMessage>
            </FormControl>
            <FormControl
              w={"100%"}
              isInvalid={errors.card_display_name && touched.card_display_name}
            >
              <Input
              required
                name="card_display_name"
                autoComplete="off"
                value={inputState.card_display_name}
                onChange={handleInputChange}
                color={"gray.600"}
                placeholder="Card Display Name *"
                onBlur={handleBlur}
              />
              <FormErrorMessage>
                {errors.card_display_name &&
                  touched.card_display_name &&
                  errors.card_display_name}
              </FormErrorMessage>
            </FormControl>
          </Stack>
        </VStack>
      </VStack>
      {/* Required checkbox */}
      <HStack w={"full"} py="10px" pl={"10px"}>
        <FormControl isInvalid={!checkBoxStatus}>
          <Checkbox
            onChange={({ target: { checked } }) => {
              setCheckBoxStatus(checked);
            }}
          >
            Here text will be added later
          </Checkbox>
          <FormErrorMessage>
            Can not leave this checkbox unchecked!
          </FormErrorMessage>
        </FormControl>
      </HStack>
      {/* Continue Button */}
      <HStack
        w={"full"}
        justify={"space-between"}
        alignItems={"center"}
        pt={"20px"}
      >
        <Button
          leftIcon={<IoIosArrowBack />}
          bg="#009ef7"
          rounded={"3xl"}
          color={"white"}
          _hover={{ bg: "blue" }}
          onClick={() => updateActiveStep(Number(formActiveStep) - 1)}
        >
          Back
        </Button>
        <Button
          rightIcon={<IoIosArrowForward />}
          isLoading={hitFourthLoading}
          isDisabled={hitFourthLoading}
          type="submit"
          bg="#009ef7"
          rounded={"3xl"}
          color={"white"}
          mt={"5px"}
          _hover={{ bg: "blue" }}
        >
          Continue
        </Button>
      </HStack>
    </VStack>
  );
}

function selfEmployeed(props) {
  const {
    handleSubmit,
    values: inputState,
    handleChange: handleInputChange,
    handleBlur,
    errors,
    touched,
    checkBoxStatus,
    setCheckBoxStatus,
    hitFourthLoading,
    updateActiveStep,
    formActiveStep,
  } = props;
  // console.log(errors);
  return (
    <VStack w={"full"} as="form" onSubmit={handleSubmit}>
      <VStack w={"full"} h={"full"} gap={"10px"}>
        {/* Title */}
        <Text
          w="100%"
          ml={"25px"}
          fontSize={{ base: 15, lg: 18 }}
          fontWeight={650}
          color={"#009ef7"}
          mt={"20px"}
        >
          Work Details
        </Text>
        <VStack
          w="100%"
          gap={"14px"}
          //   border={"1px solid black"}
        >
          <Stack w={"full"} direction={{ base: "column", lg: "row" }}>
            <FormControl
              w={"100%"}
              isInvalid={errors.business_name && touched.business_name}
            >
              <Input
                name="business_name"
                autoComplete="off"
                value={inputState.business_name}
                onChange={handleInputChange}
                color={"gray.600"}
                placeholder="Business Name *"
                onBlur={handleBlur}
                required
              />
              <FormErrorMessage>
                {errors.business_name &&
                  touched.business_name &&
                  errors.business_name}
              </FormErrorMessage>
            </FormControl>
            <FormControl
              w={"100%"}
              isInvalid={errors.income_source && touched.income_source}
            >
              <Select
                name="income_source"
                value={inputState.income_source}
                onChange={handleInputChange}
                color={"gray.600"}
                onBlur={handleBlur}
                required
              >
                <option value="" disabled>
                  Income Source *
                </option>
                <option value="BUSINESS_INCOME">BUSINESS INCOME</option>
                <option value="AGRICULTURE">AGRICULTURE</option>
                <option value="INVESTMENT_INCOME">INVESTMENT INCOME</option>
              </Select>
              <FormErrorMessage>
                {errors.income_source &&
                  touched.income_source &&
                  errors.income_source}
              </FormErrorMessage>
            </FormControl>
          </Stack>
          <Stack w={"full"} direction={{ base: "column", lg: "row" }}>
            <FormControl
              w={"100%"}
              isInvalid={errors.ownership_type && touched.ownership_type}
            >
              <Select
              required
                name="ownership_type"
                value={inputState.ownership_type}
                onChange={handleInputChange}
                color={"gray.500"}
                onBlur={handleBlur}
              >
                <option value="" disabled>
                  Ownership Type *
                </option>
                <option value="SOLE_PROPRIETORSHIP">
                  SOLE PROPRIETORSHIP
                </option>
                <option value="PARTNERSHIP">PARTNERSHIP</option>
                <option value="PRIVATE_LIMITED">PRIVATE LIMITED</option>
              </Select>
              <FormErrorMessage>
                {errors.ownership_type &&
                  touched.ownership_type &&
                  errors.ownership_type}
              </FormErrorMessage>
            </FormControl>
            <FormControl w={"100%"}>
              <Select
                name="business_nature"
                value={inputState.business_nature}
                onChange={handleInputChange}
                color={"gray.500"}
                onBlur={handleBlur}
                required
                isInvalid={errors.business_nature && touched.business_nature}
              >
                <option value="" disabled>
                  Business Nature *
                </option>
                <option value="INFORMATION_TECHNOLOGY">
                  INFORMATION TECHNOLOGY
                </option>
                <option value="PROFESSIONAL_SERVICE_PROVIDER">
                  PROFESSIONAL SERVICE PROVIDER
                </option>
                <option value="AGRICULTURE">AGRICULTURE</option>
                <option value="BULLION_GOLD_JEWELLERY">
                  BULLION GOLD JEWELLERY
                </option>
                <option value="STOCK_BROKER">STOCK_BROKER</option>
                <option value="REAL_ESTATE">REAL ESTATE</option>
                <option value="REATIL_TRADE">REATIL TRADE</option>
                <option value="WHOLESALE_TRADE">WHOLESALE TRADE</option>
                <option value="MONEY_LENDER">MONEY LENDER</option>
              </Select>
              <FormErrorMessage>
                {errors.business_nature &&
                  touched.business_nature &&
                  errors.business_nature}
              </FormErrorMessage>
            </FormControl>
          </Stack>
          <Stack w={"full"} direction={{ base: "column", lg: "row" }}>
            <FormControl
              w={"100%"}
              isInvalid={errors.annual_income && touched.annual_income}
            >
              <Input
                name="annual_income"
                autoComplete="off"
                value={inputState.annual_income}
                onChange={handleInputChange}
                color={"gray.600"}
                placeholder="Annual Income *"
                onBlur={handleBlur}
                required
              />
              <FormErrorMessage>
                {errors.annual_income &&
                  touched.annual_income &&
                  errors.annual_income}
              </FormErrorMessage>
            </FormControl>
            <FormControl
              w={"100%"}
              isInvalid={
                errors.total_year_of_experience_in_current_business &&
                touched.total_year_of_experience_in_current_business
              }
            >
              <Input
                name="total_year_of_experience_in_current_business"
                autoComplete="off"
                value={inputState.total_year_of_experience_in_current_business}
                onChange={handleInputChange}
                color={"gray.600"}
                onBlur={handleBlur}
                required
                placeholder="Total Years of Experience in Current Bussiness *"
              />
              <FormErrorMessage>
                {errors.total_year_of_experience_in_current_business &&
                  touched.total_year_of_experience_in_current_business &&
                  errors.total_year_of_experience_in_current_business}
              </FormErrorMessage>
            </FormControl>
          </Stack>
          <Stack w={"full"} direction={{ base: "column", lg: "row" }}>
            <FormControl
              w={"100%"}
              isInvalid={errors.card_display_name && touched.card_display_name}
            >
              <Input
                name="card_display_name"
                autoComplete="off"
                value={inputState.card_display_name}
                onChange={handleInputChange}
                color={"gray.600"}
                placeholder="Card Display Name *"
                onBlur={handleBlur}
                required
              />
              <FormErrorMessage>
                {errors.card_display_name &&
                  touched.card_display_name &&
                  errors.card_display_name}
              </FormErrorMessage>
            </FormControl>
            <FormControl
              w={"100%"}
              isInvalid={errors.b_work_sector && touched.b_work_sector}
            >
              <Select
                name="b_work_sector"
                value={inputState.b_work_sector}
                onChange={handleInputChange}
                color={"gray.500"}
                onBlur={handleBlur}
                required
              >
                <option value="" disabled>
                  Work Sector *
                </option>
                <option value="N039">Information Technology</option>
                <option value="N068">Professional Service provider</option>
                <option value="N001">Agriculture</option>
                <option value="N027">Bullion/Gold Jewellery</option>
                <option value="N083">Stock Broker</option>
                <option value="N002">Real Estate</option>
                <option value="N075">Retail trade</option>
                <option value="N099">Wholesale trade</option>
                <option value="N052">Money Lender</option>
              </Select>
              <FormErrorMessage>
                {errors.b_work_sector &&
                  touched.b_work_sector &&
                  errors.b_work_sector}
              </FormErrorMessage>
            </FormControl>
          </Stack>
        </VStack>
      </VStack>

      {/* Required checkbox */}
      <HStack w={"full"} py="10px" pl={"10px"}>
        <FormControl isInvalid={!checkBoxStatus}>
          <Checkbox
            onChange={({ target: { checked } }) => {
              setCheckBoxStatus(checked);
            }}
          >
            Here text will be added later
          </Checkbox>
          <FormErrorMessage>
            Can not leave this checkbox unchecked!
          </FormErrorMessage>
        </FormControl>
      </HStack>
      {/* Continue Button */}
      <HStack
        w={"full"}
        justify={"space-between"}
        alignItems={"center"}
        pt={"20px"}
      >
        <Button
          leftIcon={<IoIosArrowBack />}
          bg="#009ef7"
          rounded={"3xl"}
          color={"white"}
          _hover={{ bg: "blue" }}
          onClick={() => updateActiveStep(Number(formActiveStep) - 1)}
        >
          Back
        </Button>
        <Button
          rightIcon={<IoIosArrowForward />}
          isLoading={hitFourthLoading}
          isDisabled={hitFourthLoading}
          type="submit"
          bg="#009ef7"
          rounded={"3xl"}
          color={"white"}
          mt={"5px"}
          _hover={{ bg: "blue" }}
        >
          Continue
        </Button>
      </HStack>
    </VStack>
  );
}
