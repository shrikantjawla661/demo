import {
  Button,
  Center,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { finalAppSubmitReq } from "../../redux/ApplicationForm/applicationForm.actions";
import ApplicationSubmitStep from "./ApplicationSubmitStep";
import { useNavigate } from "react-router-dom";

const SendOtp = ({ updateActiveStep, formActiveStep }) => {
  const [otp, setOtp] = useState("");
  const [errorMsg, setErroMsg] = useState("");
  const [blurStatus, setBlurStatus] = useState(false);
  const dispatch = useDispatch();
  const toast = useToast();
  const navigate = useNavigate();
  const {
    finalReqLoading,
    finalReqError,
    finalReqStatus,
    finalReqSuccess,
    finalReqErrorMessage,
    userInfo,
    otpToken,
  } = useSelector((s) => s.applicationForm);
  const { lastStep, newUserStatus } = userInfo;
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!errorMsg) {
      dispatch(finalAppSubmitReq(otp, otpToken, "9998954053"));
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setOtp(value);
  };
  useEffect(() => {
    if (isNaN(otp)) setErroMsg("Otp can only be number!");
    else if (otp.length > 6 || otp.length < 6) {
      setErroMsg("Otp can only be 6 digit long!");
    } else {
      setErroMsg("");
    }
  }, [otp]);

  //Just to check if user has not been sent otp to verify...
  useEffect(() => {
    if (!otpToken) updateActiveStep(4);
  }, []);

  //Handling response to redirect user
  useEffect(() => {
    if (finalReqStatus) {
      navigate("/app-congrats-page");
    }
    if (
      finalReqError &&
      !finalReqLoading &&
      finalReqErrorMessage !== "INVALID_OTP"
    ) {
      navigate("/app-rejected-page");
    }
    if (finalReqErrorMessage === "INVALID_OTP") {
      toast({
        title: "Invalid OTP ERROR",
        description: "Invalid otp reenter otp",
        position: "top",
        status:'error',
        isClosable: "true",
        duration: 4000,
      });
    }
  }, [finalReqStatus, finalReqError, finalReqLoading]);
  const propsToPass = {
    blurStatus,
    errorMsg,
    handleChange,
    otp,
    setBlurStatus,
    finalReqLoading,
  };
  return (
    <Center minH={"65vh"} w={"full"} as="form" onSubmit={handleSubmit}>
      {!finalReqSuccess && !finalReqLoading && <TakeOtpUI {...propsToPass} />}
      {finalReqLoading && <ApplicationSubmitStep />}
    </Center>
  );
};

export default SendOtp;

function TakeOtpUI(props) {
  const {
    blurStatus,
    errorMsg,
    handleChange,
    otp,
    setBlurStatus,
    finalReqLoading,
  } = props;
  return (
    <VStack
      w={"450px"}
      h={"fit-content"}
      rounded={"15px"}
      boxShadow={"rgba(0, 0, 0, 0.16) 0px 1px 4px"}
      p={"7px"}
      py={"48px"}
      justify={"center"}
    >
      <Text fontSize={"18px"} fontWeight={600}>
        Verify OTP
      </Text>
      <VStack w={"75%"} spacing={"20px"}>
        <VStack w={"full"}>
          <Text fontSize={14} textAlign={"center"} color={"gray.500"}>
            Otp has been sent to mobile number
          </Text>
          <FormControl isInvalid={blurStatus && errorMsg}>
            <Input
              placeholder="Six digits otp"
              name="otp"
              onChange={handleChange}
              value={otp}
              onBlur={() => setBlurStatus(true)}
            />
            <FormErrorMessage>
              {blurStatus && errorMsg && errorMsg}
            </FormErrorMessage>
          </FormControl>
        </VStack>
        <Button
          isDisabled={finalReqLoading}
          isLoading={finalReqLoading}
          rightIcon={<IoIosArrowForward />}
          // isLoading={hitFirstLoading}
          // isDisabled={hitFirstLoading}
          type="submit"
          bg="#009ef7"
          rounded={"3xl"}
          color={"white"}
          mt={"10px"}
          _hover={{ bg: "blue" }}
        >
          Continue
        </Button>
      </VStack>
    </VStack>
  );
}
