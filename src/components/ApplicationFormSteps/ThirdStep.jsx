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
  Radio,
  RadioGroup,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDistrict,
  fetchDistrict2,
  getDataApi,
  thirdHit,
} from "../../redux/ApplicationForm/applicationForm.actions";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { stepThirdSchema } from "../../schemas/thirdStep.schema";
import { useFormik } from "formik";

let initialState = {
  step: "3",
  p_addressLine1: "",
  p_addressLine2: "",
  p_pincode: "",
  p_city: "",
  p_state: "",
  o_addressLine1: "",
  o_addressLine2: "",
  o_pincode: "",
  o_city: "",
  o_state: "",
  prefered_address: "present",
  phoneNumber: "9998954053",
};

const ThirdStep = ({ inputDataToAppend, updateActiveStep, formActiveStep }) => {
  const dispatch = useDispatch();
  const toast = useToast();
  const [inputState, setInputState] = useState(initialState);
  const {
    hitThirdLoading,
    hitThirdStatus,
    hitThirdError,
    hitThirdSuccess,
    hitThirdErrorMessage,
    data,
    districtData,
    districtData2,
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
    validationSchema: stepThirdSchema,
    onSubmit: (values, actions) => {
      dispatch(thirdHit(values));
    },
  });

  useEffect(() => {
    // console.log(inputDataToAppend);
    setValues({
      ...values,
      p_addressLine1: inputDataToAppend?.present?.aua_address_one || "",
      p_addressLine2: inputDataToAppend?.present?.aua_address_two || "",
      p_pincode: inputDataToAppend?.present?.aua_pincode || "",
      p_city:
        inputDataToAppend?.present?.aua_city || districtData.district || "",
      p_state:
        inputDataToAppend?.present?.aua_state || districtData.state || "",
      o_addressLine1: inputDataToAppend?.office?.aua_address_one || "",
      o_addressLine2: inputDataToAppend?.office?.aua_address_two || "",
      o_pincode: inputDataToAppend?.office?.aua_pincode || "",
      o_city:
        inputDataToAppend?.office?.aua_city || districtData2.district || "",
      o_state:
        inputDataToAppend?.office?.aua_state || districtData2.district || "",
      prefered_address: inputDataToAppend?.aud_preffered_address || "",
    });
  }, [inputDataToAppend]);

  useEffect(() => {
    if (districtData) {
      setValues({
        ...values,
        p_city: districtData.district,
        p_state: districtData.city,
      });
    }
  }, [districtData]);
  useEffect(() => {
    if (districtData2) {
      setValues({
        ...values,
        o_city: districtData2.district,
        o_state: districtData2.city,
      });
    }
  }, [districtData2]);

  useEffect(() => {
    if (hitThirdStatus) {
      updateActiveStep(Number(formActiveStep) + 1);
    }
    if (hitThirdError && !hitThirdStatus) {
      toast({
        title: "Application Error",
        description: hitThirdErrorMessage,
        position: "top",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  }, [hitThirdStatus, hitThirdError, hitThirdStatus]);

  useEffect(() => {
    dispatch(
      getDataApi({ phoneNumber: "9998954053", step: formActiveStep.toString() })
    );
  }, []);

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
          Present Address
        </Text>
        <VStack
          w="100%"
          gap={"14px"}
          //   border={"1px solid black"}
        >
          <Stack w={"full"} direction={{ base: "column", lg: "row" }}>
            <FormControl
              w={"100%"}
              isInvalid={errors.o_addressLine1 && touched.p_addressLine1}
            >
              <Input
                name="p_addressLine1"
                autoComplete="off"
                value={values.p_addressLine1}
                onChange={handleChange}
                color={"gray.600"}
                placeholder="Address Line 1 *"
                onBlur={handleBlur}
              />
              <FormErrorMessage>
                {errors.o_addressLine1 &&
                  touched.p_addressLine1 &&
                  errors.p_addressLine1}
              </FormErrorMessage>
            </FormControl>
            <FormControl
              w={"100%"}
              isInvalid={touched.p_addressLine2 && errors.p_addressLine2}
            >
              <Input
                name="p_addressLine2"
                maxLength={30}
                autoComplete="off"
                value={values.p_addressLine2}
                onChange={handleChange}
                color={"gray.600"}
                placeholder="Address Line 2 *"
                onBlur={handleBlur}
              />
              <FormErrorMessage>
                {touched.p_addressLine2 &&
                  errors.p_addressLine2 &&
                  errors.p_addressLine2}
              </FormErrorMessage>
            </FormControl>
          </Stack>
          <Stack w={"full"} direction={{ base: "column", lg: "row" }}>
            <FormControl
              w={"100%"}
              isInvalid={touched.p_pincode && errors.p_pincode}
            >
              <Input
                name="p_pincode"
                autoComplete="off"
                value={values.p_pincode}
                onChange={(e) => {
                  if (e.target.value.length === 6) {
                    dispatch(fetchDistrict(e.target.value));
                  } else {
                    setValues({
                      ...values,
                      p_city: "",
                      p_state: "",
                    });
                  }
                  handleChange(e);
                }}
                color={"gray.600"}
                placeholder="Pincode *"
                onBlur={handleBlur}
              />
              <FormErrorMessage>
                {touched.p_pincode && errors.p_pincode && errors.p_pincode}
              </FormErrorMessage>
            </FormControl>
            <FormControl w={"100%"} isInvalid={touched.p_city && errors.p_city}>
              <Input
                name="p_city"
                autoComplete="off"
                value={values.p_city}
                // onChange={handleChange}
                color={"gray.600"}
                placeholder="City *"
                onBlur={handleBlur}
                readOnly
              />
              <FormErrorMessage>
                {touched.p_city && errors.p_city && touched.p_city}
              </FormErrorMessage>
            </FormControl>
            <FormControl
              w={"100%"}
              isInvalid={errors.p_state && touched.p_state}
            >
              <Input
                name="p_state"
                autoComplete="off"
                value={values.p_state}
                // onChange={handleChange}
                color={"gray.600"}
                placeholder="State *"
                onBlur={handleBlur}
                readOnly
              />
              <FormErrorMessage>
                {errors.p_state && touched.p_state && errors.p_state}
              </FormErrorMessage>
            </FormControl>
          </Stack>
        </VStack>
      </VStack>
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
          Office Address
        </Text>
        <VStack
          w="100%"
          gap={"14px"}
          //   border={"1px solid black"}
        >
          <Stack w={"full"} direction={{ base: "column", lg: "row" }}>
            <FormControl
              w={"100%"}
              isInvalid={errors.o_addressLine1 && touched.o_addressLine1}
            >
              <Input
                name="o_addressLine1"
                autoComplete="off"
                value={values.o_addressLine1}
                onChange={handleChange}
                color={"gray.600"}
                placeholder="Address Line 1 *"
                onBlur={handleBlur}
              />
              <FormErrorMessage>
                {errors.o_addressLine1 &&
                  touched.o_addressLine1 &&
                  errors.o_addressLine1}
              </FormErrorMessage>
            </FormControl>
            <FormControl
              w={"100%"}
              isInvalid={errors.o_addressLine2 && touched.o_addressLine2}
            >
              <Input
                name="o_addressLine2"
                maxLength={30}
                autoComplete="off"
                value={values.o_addressLine2}
                onChange={handleChange}
                color={"gray.600"}
                placeholder="Address Line 2 *"
                onBlur={handleBlur}
              />
              <FormErrorMessage>
                {errors.o_addressLine2 &&
                  touched.o_addressLine2 &&
                  errors.o_addressLine2}
              </FormErrorMessage>
            </FormControl>
          </Stack>
          <Stack w={"full"} direction={{ base: "column", lg: "row" }}>
            <FormControl
              w={"100%"}
              isInvalid={errors.o_pincode && touched.o_pincode}
            >
              <Input
                name="o_pincode"
                autoComplete="off"
                value={values.o_pincode}
                onChange={(e) => {
                  if (e.target.value.length === 6) {
                    dispatch(fetchDistrict2(e.target.value));
                  } else {
                    setValues({
                      ...values,
                      o_city: "",
                      o_state: "",
                    });
                  }
                  handleChange(e);
                }}
                color={"gray.600"}
                placeholder="Pincode *"
                onBlur={handleBlur}
              />
              <FormErrorMessage>
                {errors.o_pincode && touched.o_pincode && errors.o_pincode}
              </FormErrorMessage>
            </FormControl>
            <FormControl w={"100%"} isInvalid={errors.o_city && touched.o_city}>
              <Input
                name="o_city"
                autoComplete="off"
                value={values.o_city}
                // onChange={handleChange}
                color={"gray.600"}
                placeholder="City *"
                onBlur={handleBlur}
                readOnly
              />
              <FormErrorMessage>
                {errors.o_city && touched.o_city && errors.o_city}
              </FormErrorMessage>
            </FormControl>
            <FormControl
              w={"100%"}
              isInvalid={errors.o_state && touched.o_state}
            >
              <Input
                name="o_state"
                autoComplete="off"
                value={values.o_state}
                // onChange={handleChange}
                color={"gray.600"}
                placeholder="State *"
                readOnly
              />
              <FormErrorMessage>
                {errors.o_state && touched.o_state && errors.o_state}
              </FormErrorMessage>
            </FormControl>
          </Stack>
        </VStack>
      </VStack>
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
          Preferred Communication Address
        </Text>
        <RadioGroup
          w={"96%"}
          onChange={(val) => {
            setValues({
              ...values,
              prefered_address: val,
            });
            console.log(values);
          }}
          value={values.prefered_address || "present"}
        >
          <Stack direction="row" gap={"25px"} color={"gray.500"}>
            <Radio value="office" size={"lg"}>
              Office
            </Radio>
            <Radio value="present" size={"lg"}>
              Present
            </Radio>
          </Stack>
        </RadioGroup>
      </VStack>
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
          isLoading={hitThirdLoading}
          isDisabled={hitThirdLoading}
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
};

export default ThirdStep;
