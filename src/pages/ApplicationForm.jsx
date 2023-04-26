/** @format */

import { HStack, Text, VStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import FirstStep from "../components/ApplicationFormSteps/FirstStep";
import SecondStep from "../components/ApplicationFormSteps/SecondStep";
import { useDispatch, useSelector } from "react-redux";
import { updateLastStep } from "../redux/ApplicationForm/applicationForm.actions";
import ThirdStep from "../components/ApplicationFormSteps/ThirdStep";
import FourthStep from "../components/ApplicationFormSteps/FourthStep";
import Navbar from "../components/Navbar/Navbar";
import FooterMain from "../components/Footer/FooterMain";
import ApplicationSubmitStep from "../components/ApplicationFormSteps/ApplicationSubmitStep";
import SendOtp from "../components/ApplicationFormSteps/SendOtp";
import { TiTickOutline } from "react-icons/ti";

const ApplicationForm = () => {
  const dispatch = useDispatch();
  const { data, userInfo } = useSelector((s) => s.applicationForm);
  const [formActiveStep, setFromActiveStep] = useState(1);
  const { lastStep, newUserStatus } = userInfo;

  const updateActiveStep = (num) => {
    setFromActiveStep(num);
  };

  useEffect(() => {
    dispatch(
      updateLastStep({
        phoneNumber: "9998954053",
        step: formActiveStep.toString(),
      })
    );
    // setFromActiveStep(lastStep < 5 ? lastStep + 1 : lastStep);
  }, [lastStep]);

  return (
    <>
      <Navbar />
      <VStack w="full" minH={"100vh"} justify={"center"} pt={"100px"}>
        <VStack
          w={{ base: "100%", lg: "1000px" }}
          minH={"680px"}
          boxShadow={"rgba(0, 0, 0, 0.24) 0px 3px 8px;"}
          borderRadius={"15px"}
          p="10px"
        >
          {/* Steps starts here */}
          <HStack
            flexDirection={{ base: "column", md: "row" }}
            w={{ base: "100%", lg: "95%" }}
            mt={"40px"}
            justify={"center"}
            align={"center"}
            gap={{ base: "0px", md: "14px" }}
            mb={"30px"}
          >
            {stepComp(
              1,
              formActiveStep == 1,
              "Eligiblity Details",
              updateActiveStep,
              lastStep
            )}
            {stepComp(
              2,
              formActiveStep == 2,
              "Personal Details",
              updateActiveStep,
              lastStep
            )}
            {stepComp(
              3,
              formActiveStep == 3,
              "Address",
              updateActiveStep,
              lastStep
            )}
            {stepComp(
              4,
              formActiveStep == 4 || formActiveStep === 5,
              "Work Details",
              updateActiveStep,
              lastStep
            )}
          </HStack>
          {/* Eligiablity Form step */}
          <VStack w={"90%"} minH={"100px"}>
            {/* Form inputs are here */}
            {selectStepFormInputs(
              formActiveStep,
              data,
              updateActiveStep,
              formActiveStep
            )}
          </VStack>
        </VStack>
      </VStack>
      <FooterMain />
    </>
  );
};

export default ApplicationForm;

function stepComp(number, status, title, updateActiveStep, lastStep) {
  return (
    <>
      <HStack
        w={{ base: "100%", md: "200px" }}
        h={"40px"}
        gap={"6px"}
        justify={"center"}
      >
        <HStack
          w={{ base: "30px", md: "40px" }}
          h={{ base: "30px", md: "40px" }}
          //   border={'1px solid red'}
          borderRadius={"10px"}
          bg={!status ? "#dde9f0" : "#009ef7"}
          justify={"center"}
          align={"center"}
          cursor={"pointer"}
          onClick={() => {
            updateActiveStep(
              number <= +lastStep ? number : Number(lastStep) + 1
            );
            // console.log(lastStep);
          }}
        >
          <Text
            color={"white"}
            fontSize={{ base: 15, lg: 20 }}
            fontWeight={700}
          >
            {number < Number(lastStep) ? <TiTickOutline /> : number}
          </Text>
        </HStack>
        <Text
          fontSize={{ base: 15, lg: 18 }}
          fontWeight={600}
          color={"gray.500"}
        >
          {title}
        </Text>
      </HStack>
    </>
  );
}

function selectStepFormInputs(num, data, updateActiveStep, formActiveStep) {
  if (num == 1)
    return (
      <FirstStep
        inputDataToAppend={data}
        updateActiveStep={updateActiveStep}
        formActiveStep={formActiveStep}
      />
    );
  if (num == 2)
    return (
      <SecondStep
        inputDataToAppend={data}
        updateActiveStep={updateActiveStep}
        formActiveStep={formActiveStep}
      />
    );
  if (num == 3)
    return (
      <ThirdStep
        inputDataToAppend={data}
        updateActiveStep={updateActiveStep}
        formActiveStep={formActiveStep}
      />
    );
  // if (num == 3)
  // 	return (
  // 		<ApplicationSubmitStep
  // 			inputDataToAppend={data}
  // 			updateActiveStep={updateActiveStep}
  // 			formActiveStep={formActiveStep}
  // 		/>
  // 	);
  if (num == 4)
    return (
      <FourthStep
        inputDataToAppend={data}
        updateActiveStep={updateActiveStep}
        formActiveStep={formActiveStep}
      />
    );
  if (num == 5)
    return (
      <SendOtp
        inputDataToAppend={data}
        updateActiveStep={updateActiveStep}
        formActiveStep={formActiveStep}
      />
    );
}
