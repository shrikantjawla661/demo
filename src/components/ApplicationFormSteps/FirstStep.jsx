/** @format */

import {
  Button,
  FormControl,
  FormErrorMessage,
  HStack,
  Input,
  Select,
  Stack,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  firstHit,
  getDataApi,
} from "../../redux/ApplicationForm/applicationForm.actions";
import { IoIosArrowForward } from "react-icons/io";
import { useFormik } from "formik";
import { stepFirstSchema } from "../../schemas/firstStep.schema";

let initialState = {
  step: "1",
  title: "",
  firstName: "",
  middleName: "",
  lastName: "",
  email: "",
  pan: "",
  dob: "",
  gender: "",
  phoneNumber: "",
};

const FirstStep = ({ inputDataToAppend, updateActiveStep, formActiveStep }) => {
  const dispatch = useDispatch();
  const toast = useToast();
  const {
    hitFirstLoading,
    hitFirstError,
    hitFirstSuccess,
    hitFirstStatus,
    hitFirstErrorMessage,
    data,
    userInfo,
  } = useSelector((s) => s.applicationForm);
  const [dobBlur, setDobBlur] = useState(false);
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
    validationSchema: stepFirstSchema,
    onSubmit: (values, actions) => {
      console.log(errors);
      dispatch(firstHit(values));
    },
  });

  useEffect(() => {
    setValues({
      step: "1",
      title: inputDataToAppend?.aud_title || "",
      firstName: inputDataToAppend?.aud_first_name || "",
      middleName: inputDataToAppend?.aud_middle_name || "",
      lastName: inputDataToAppend?.aud_last_name || "",
      email: inputDataToAppend?.aud_email || "",
      pan: inputDataToAppend?.aud_pancard || "",
      dob: inputDataToAppend?.aud_dob || "",
      gender: inputDataToAppend?.aud_gender || "",
      phoneNumber: inputDataToAppend?.aud_phone_number || "",
    });
  }, [inputDataToAppend]);

  useEffect(() => {
    if (hitFirstStatus) {
      updateActiveStep(Number(formActiveStep) + 1);
    }
    if (hitFirstError && !hitFirstLoading) {
      toast({
        title: "Application Error",
        description: hitFirstErrorMessage,
        position: "top",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  }, [hitFirstStatus, hitFirstError, hitFirstLoading]);

  useEffect(() => {
    dispatch(
      getDataApi({ phoneNumber: "9998954053", step: formActiveStep.toString() })
    );
  }, []);

  return (
    <VStack w={"full"} as="form" onSubmit={handleSubmit}>
      {/* Title */}
      <Text
        w="100%"
        ml={"25px"}
        fontSize={{ base: 15, lg: 18 }}
        fontWeight={650}
        color={"#009ef7"}
        mt={"20px"}
        mb={"15px"}
      >
        Present Address
      </Text>
      <VStack
        w={"full"}
        h={"full"}
        gap={"10px"}
        style={{ marginBottom: "15px" }}
        align={{ lg: "flex-start" }}
      >
        <Stack w={"full"} direction={{ base: "column", lg: "row" }}>
          <FormControl w={"100%"} isInvalid={errors.title && touched.title}>
            <Select
              name="title"
              value={values.title}
              onChange={handleChange}
              color={"gray.600"}
              onBlur={handleBlur}
            >
              <option disabled value="">
                Title*
              </option>
              <option value="MR">Mr</option>
              <option value="MRS">Mrs</option>
              <option value="MS">Ms</option>
            </Select>
            <FormErrorMessage>
              {errors.title && touched.title && errors.title}
            </FormErrorMessage>
          </FormControl>
          <FormControl
            isInvalid={errors.firstName && touched.firstName}
            w={"100%"}
          >
            <Input
              name="firstName"
              value={values.firstName}
              onChange={handleChange}
              color={"gray.600"}
              placeholder="First Name *"
              onBlur={handleBlur}
            />
            <FormErrorMessage>
              {errors.firstName && touched.firstName && errors.firstName}
            </FormErrorMessage>
          </FormControl>
          <FormControl
            w={"100%"}
            isInvalid={errors.middleName && touched.middleName}
          >
            <Input
              name="middleName"
              value={values.middleName}
              onChange={handleChange}
              color={"gray.600"}
              placeholder="Middle Name"
              onBlur={handleBlur}
            />
            <FormErrorMessage>
              {errors.middleName && touched.middleName && errors.middleName}
            </FormErrorMessage>
          </FormControl>
          <FormControl
            w={"100%"}
            isInvalid={errors.lastName && touched.lastName}
          >
            <Input
              name="lastName"
              value={values.lastName}
              onChange={handleChange}
              color={"gray.600"}
              placeholder="Last Name *"
              onBlur={handleBlur}
            />
            <FormErrorMessage>
              {errors.lastName && touched.lastName && errors.lastName}
            </FormErrorMessage>
          </FormControl>
        </Stack>
        <Stack w={"full"} direction={{ base: "column", lg: "row" }}>
          <FormControl w={"100%"} isInvalid={errors.gender && touched.gender}>
            <Select
              name="gender"
              value={values.gender}
              onChange={handleChange}
              color={"gray.600"}
              onBlur={handleBlur}
            >
              <option disabled value="">
                Select Gender *
              </option>
              <option value="MALE">Male *</option>
              <option value="FEMALE">Female</option>
              <option value="OTHERS">Others</option>
            </Select>
            <FormErrorMessage>
              {errors.gender && touched.gender && errors.gender}
            </FormErrorMessage>
          </FormControl>
          <FormControl w={"100%"} isInvalid={errors.email && touched.email}>
            <Input
              name="email"
              value={values.email}
              onChange={handleChange}
              color={"gray.600"}
              placeholder="Email *"
              onBlur={handleBlur}
            />
            <FormErrorMessage>
              {errors.email && touched.email && errors.email}
            </FormErrorMessage>
          </FormControl>
        </Stack>
        <Stack w={"full"} direction={{ base: "column", lg: "row" }}>
          <FormControl w={"100%"} isInvalid={dobBlur && errors.dob}>
            <Input
              name="dob"
              value={values.dob}
              onChange={handleChange}
              type="text"
              color={"gray.600"}
              placeholder="Date of Birth *"
              onBlur={({ target }) => {
                target.type = "text";
                setDobBlur(true);
              }}
              onFocus={({ target }) => {
                target.type = "date";
                setDobBlur(false);
              }}
            />
            <FormErrorMessage>
              {errors.dob && dobBlur && errors.dob}
            </FormErrorMessage>
          </FormControl>
          <FormControl w={"100%"} isInvalid={errors.pan && touched.pan}>
            <Input
              name="pan"
              value={values.pan}
              onChange={handleChange}
              color={"gray.600"}
              placeholder="PAN Number *"
              onBlur={handleBlur}
            />
            <FormErrorMessage>
              {errors.pan && touched.pan && errors.pan}
            </FormErrorMessage>
          </FormControl>
        </Stack>
        <Stack w={"full"} direction={{ base: "column", lg: "row" }}>
          <FormControl
            w={{ base: "100%", lg: "50%" }}
            isInvalid={errors.phoneNumber && touched.phoneNumber}
          >
            <Input
              name="phoneNumber"
              value={values.phoneNumber}
              onChange={handleChange}
              type="text"
              color={"gray.600"}
              placeholder="Phone number *"
            />
            <FormErrorMessage>
              {errors.phoneNumber && touched.phoneNumber && errors.phoneNumber}
            </FormErrorMessage>
          </FormControl>
        </Stack>
      </VStack>
      {/* Continue Button */}
      <HStack w={"full"} justify={"end"}>
        <Button
          rightIcon={<IoIosArrowForward />}
          isLoading={hitFirstLoading}
          isDisabled={hitFirstLoading}
          type="submit"
          bg="#009ef7"
          rounded={"3xl"}
          color={"white"}
          mt={"10px"}
          _hover={{ bg: "blue" }}
        >
          Continue
        </Button>
      </HStack>
    </VStack>
  );
};

export default FirstStep;
