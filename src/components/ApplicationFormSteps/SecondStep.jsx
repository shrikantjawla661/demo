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
  getDataApi,
  secondHit,
} from "../../redux/ApplicationForm/applicationForm.actions";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useFormik } from "formik";
import { stepSecondSchema } from "../../schemas/secodStep.schema";

let initialState = {
  step: "2",
  motherName: "",
  fatherName: "",
  education: "",
  maritalStatus: "",
  phoneNumber: "9998954053",
};

const SecondStep = ({
  inputDataToAppend,
  updateActiveStep,
  formActiveStep,
}) => {
  const dispatch = useDispatch();
  const toast = useToast();
  const [inputState, setInputState] = useState(initialState);
  const {
    hitSecondLoading,
    hitSecondError,
    hitSecondSuccess,
    hitSecondErrorMessage,
    hitSecondStatus,
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
    validationSchema: stepSecondSchema,
    onSubmit: (values, actions) => {
      // console.log(errors);
      dispatch(secondHit(values));
    },
  });

  useEffect(() => {
    setValues({
      ...values,
      motherName: inputDataToAppend?.aud_mother_name || "",
      fatherName: inputDataToAppend?.aud_father_name || "",
      education: inputDataToAppend?.aud_education || "",
      maritalStatus: inputDataToAppend?.aud_marital_status || "",
    });
    console.log('rannnn....')
  }, [inputDataToAppend]);

  useEffect(() => {
    if (hitSecondStatus) {
      updateActiveStep(Number(formActiveStep) + 1);
    }
    if (hitSecondError && !hitSecondStatus) {
      toast({
        title: "Application Error",
        description: hitSecondErrorMessage,
        position: "top",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  }, [hitSecondStatus, hitSecondError, hitSecondStatus]);

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
      <HStack
        flexDirection={{ base: "column", lg: "row" }}
        w={"full"}
        h={"full"}
        gap={"10px"}
      >
        {/* Left side form */}
        <VStack
          w={{ base: "100%", lg: "50%" }}
          gap={"14px"}
          //   border={"1px solid black"}
        >
          <Stack w={"full"} direction={{ base: "column", lg: "row" }}>
            <FormControl
              w={"100%"}
              isInvalid={errors.motherName && touched.motherName}
            >
              <Input
                name="motherName"
                maxLength={30}
                autoComplete="off"
                value={values.motherName}
                onChange={handleChange}
                color={"gray.600"}
                placeholder="Mother's Name *"
                onBlur={handleBlur}
              />
              <FormErrorMessage>
                {errors.motherName && touched.motherName && errors.motherName}
              </FormErrorMessage>
            </FormControl>
          </Stack>
          <Stack w={"full"} direction={{ base: "column", lg: "row" }}>
            <FormControl
              w={"100%"}
              isInvalid={errors.education && touched.education}
            >
              <Select
                name="education"
                value={values.education}
                onChange={handleChange}
                color={"gray.600"}
                onBlur={handleBlur}
              >
                <option disabled value="">
                  Education *
                </option>
                <option value="UNDERGRADUATE">UNDERGRADUATE </option>
                <option value="GRADUATE">GRADUATE </option>
                <option value="POSTGRADUATE">POSTGRADUATE </option>
              </Select>
              <FormErrorMessage>
                {errors.education && touched.education && errors.education}
              </FormErrorMessage>
            </FormControl>
          </Stack>
        </VStack>
        {/* Right side form */}
        <VStack
          justifyContent="center"
          alignItems="center"
          w={{ base: "100%", lg: "50%" }}
          gap={"14px"}
          //   border={"1px solid black"}
        >
          <Stack w={"full"} direction={{ base: "column", lg: "row" }}>
            <FormControl
              w={"100%"}
              isInvalid={errors.fatherName && touched.fatherName}
            >
              <Input
                name="fatherName"
                value={values.fatherName}
                onChange={handleChange}
                color={"gray.600"}
                placeholder="Father's Name *"
                onBlur={handleBlur}
              />
              <FormErrorMessage>
                {errors.fatherName && touched.fatherName && errors.fatherName}
              </FormErrorMessage>
            </FormControl>
          </Stack>
          <Stack w={"full"} direction={{ base: "column", lg: "row" }}>
            <FormControl
              w={"100%"}
              isInvalid={errors.maritalStatus && touched.maritalStatus}
            >
              <Select
                name="maritalStatus"
                value={values.maritalStatus}
                onChange={handleChange}
                color={"gray.600"}
                onBlur={handleBlur}
              >
                <option disabled value="">
                  Marital Status *
                </option>
                <option value="MARRIED">Married</option>
                <option value="UNMARRIED">Unmrried</option>
              </Select>
              <FormErrorMessage>
                {errors.maritalStatus &&
                  touched.maritalStatus &&
                  errors.maritalStatus}
              </FormErrorMessage>
            </FormControl>
          </Stack>
        </VStack>
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
          isLoading={hitSecondLoading}
          isDisabled={hitSecondLoading}
          type="submit"
          bg="#009ef7"
          rounded={"3xl"}
          color={"white"}
          _hover={{ bg: "blue" }}
        >
          Continue
        </Button>
      </HStack>
    </VStack>
  );
};

export default SecondStep;
