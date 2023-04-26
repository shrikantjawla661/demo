/** @format */

import React, { useState } from "react";
import {
  Center,
  Checkbox,
  FormControl,
  Input,
  Text,
  VStack,
  Box,
  HStack,
  Button,
  FormErrorMessage,
  PinInput,
  PinInputField,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { loginSchema } from "../schemas/login.schema";
import Lottie from "react-lottie";
import otpAnim from "../assets/animations/otpAnim.json";

const Login = () => {
  const [checkedStatus, setCheckedStatus] = useState(false);
  const { handleBlur, handleChange, handleSubmit, values, touched, errors } =
    useFormik({
      initialValues: {
        phone: "",
      },
      validationSchema: loginSchema,
      onSubmit: (values, action) => {
        console.log({ ...values, policy: checkedStatus });
      },
    });
  // console.log(errors);
  const phoneFormPropsToPass = {
    touched,
    errors,
    handleSubmit,
    handleChange,
    handleBlur,
    values,
    checkedStatus,
    setCheckedStatus,
  };
  const verifyOtpPropsToPass = { phone: values.phone };
  return (
    <Center
      as="form"
      onSubmit={handleSubmit}
      w={"100vw"}
      h={"100vh"}
      bg={"blackAlpha.600"}
      pos={"fixed"}
    >
      <EnterPhoneForm {...phoneFormPropsToPass} />
      {/* <VerifyOtpForm {...verifyOtpPropsToPass} /> */}
    </Center>
  );
};

export default Login;

function EnterPhoneForm(props) {
  const {
    touched,
    errors,
    handleChange,
    handleBlur,
    values,
    checkedStatus,
    setCheckedStatus,
  } = props;
  return (
    <VStack
      w={{ base: "96%", md: "450px" }}
      h={"fit-content"}
      bg={"white"}
      rounded={"10px"}
      p={{ md: "10px" }}
      py={{ base: "48px", md: "45px" }}
      boxShadow={"rgba(0, 0, 0, 0.24) 0px 3px 8px"}
      spacing={"20px"}
      pt={"40px"}
    >
      {/* Title text */}
      <VStack w={"full"} spacing={"-3px"}>
        <Text
          w={"full"}
          fontSize={{ base: "25px", md: "30px" }}
          fontWeight={600}
          textAlign={"center"}
          fontFamily={"sans-serif"}
        >
          Login or Sign up
        </Text>
        <Text
          fontSize={{ base: "12", md: "13" }}
          fontWeight={500}
          color={"gray.500"}
        >
          We will send an otp to verify
        </Text>
      </VStack>

      {/* Input form to append... */}
      <VStack w={"full"} h={"200px"} px={"35px"} pt={"10px"} spacing={"20px"}>
        <FormControl isInvalid={touched.phone && errors.phone}>
          <Input
            name="phone"
            placeholder={"Enter Phone"}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.phone}
          />
          <FormErrorMessage>
            {touched.phone && errors.phone && errors.phone}
          </FormErrorMessage>
        </FormControl>
        <FormControl w={"95%"}>
          <Checkbox
            isInvalid={!checkedStatus}
            onChange={(e) => setCheckedStatus(e.target.checked)}
            display={"flex"}
            size={"lg"}
            alignItems={"flex-start"}
            isChecked={checkedStatus}
          >
            <Text fontSize={12} fontWeight={500}>
              By clicking here you are agreeing to our{" "}
              <Box as="span" color={"blue.500"}>
                Terms & Conditions
              </Box>{" "}
              and{" "}
              <Box as="span" color={"blue.500"}>
                Privacy Policy
              </Box>
            </Text>
          </Checkbox>
        </FormControl>
        {/* Continue Button */}
        <HStack w={"95%"}>
          <Button
            w={"full"}
            bg={"rgb(0,158,247)"}
            _hover={{ bg: "rgb(0,128,247)" }}
            color={"white"}
            type={"submit"}
          >
            Continue
          </Button>
        </HStack>
      </VStack>
    </VStack>
  );
}

function VerifyOtpForm(props) {
  const { phone } = props;
  const defaultOptions = {
    loop: true,
    autoplay: true,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <VStack
      w={{ base: "96%", md: "450px" }}
      h={"fit-content"}
      bg={"white"}
      rounded={"10px"}
      p={{ md: "10px" }}
      py={{ base: "48px", md: "40px" }}
      boxShadow={"rgba(0, 0, 0, 0.24) 0px 3px 8px"}
      spacing={"20px"}
      pt={"40px"}
    >
      {/* Title text */}
      <VStack w={"full"} spacing={"8px"}>
        <HStack>
          <Lottie
            options={{ ...defaultOptions, animationData: otpAnim }}
            height={100}
            width={100}
            isClickToPauseDisabled
          />
        </HStack>
        <Text
          w={"full"}
          fontSize={13}
          fontWeight={500}
          textAlign={"center"}
          fontFamily={"sans-serif"}
          userSelect={"none"}
        >
          Two Step Verification
        </Text>
        <Text
          w={"full"}
          fontSize={14}
          color={"gray.400"}
          fontWeight={600}
          textAlign={"center"}
          fontFamily={"sans-serif"}
          userSelect={"none"}
        >
          Enter the verification code we sent to
        </Text>
        <Text
          w={"full"}
          fontSize={16}
          fontWeight={600}
          textAlign={"center"}
          fontFamily={"sans-serif"}
          userSelect={"none"}
        >
          ******{phone.substring(6)}
        </Text>
        <VStack w={"90%"}>
          <Text
            w={"full"}
            ml={"80px"}
            fontSize={{ base: 12, md: 14 }}
            fontWeight={600}
            userSelect={"none"}
          >
            Type your 6 digit code here
          </Text>
          <HStack w={"full"} justify={"center"}>
            <PinInput>
              <PinInputField />
              <PinInputField />
              <PinInputField />
              <PinInputField />
              <PinInputField />
              <PinInputField />
            </PinInput>
          </HStack>
          <HStack w={"full"} justify={"center"} style={{ marginTop: "20px" }}>
            <Button
              // isLoading={hitFourthLoading}
              // isDisabled={hitFourthLoading}
              type="submit"
              bg="#009ef7"
              w={"150px"}
              rounded={"10px"}
              color={"white"}
              mt={"5px"}
              _hover={{ bg: "#1056bf" }}
              userSelect={"none"}
            >
              Submit
            </Button>
          </HStack>
          <VStack w={"full"} style={{ marginTop: "18px" }} spacing={"0"}>
            <Text
              w={"full"}
              textAlign={"center"}
              color={"gray.500"}
              fontSize={{ base: 12, md: 13 }}
              fontWeight={600}
            >
              Didn't get the code?{" "}
              <Box
                as="span"
                color={"black"}
                userSelect={"none"}
                cursor={"pointer"}
                _hover={{ textDecoration: "underline", color: "#1056bf" }}
                fontSize={{ base: 12, md: 14 }}
              >
                Resend OTP in 80 seconds
              </Box>
            </Text>
            <Text
              w={"full"}
              textAlign={"center"}
              color={"gray.500"}
              fontSize={{ base: 13, md: 13 }}
              fontWeight={600}
            >
              Not you?{" "}
              <Box
                as="span"
                color={"black"}
                userSelect={"none"}
                fontSize={{ base: 12, md: 14 }}
                cursor={"pointer"}
                _hover={{ textDecoration: "underline", color: "#1056bf" }}
              >
                Change here
              </Box>
            </Text>
          </VStack>
        </VStack>
      </VStack>
    </VStack>
  );
}
