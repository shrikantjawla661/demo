import {
  Button,
  HStack,
  Icon,
  Text,
  VStack,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Badge,
  Divider,
} from "@chakra-ui/react";
import React from "react";
import Navbar from "../components/Navbar/Navbar";
import FooterMain from "../components/Footer/FooterMain";
import Lottie from "react-lottie";
import appRejected from "../assets/animations/rejectedStatus";
import { AiOutlineRight } from "react-icons/ai";
import { Link } from "react-router-dom";
import axisCardImage from "../assets/images/axis card.jpg";

export default function ApplicationRejectedUIPage() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <>
      <Navbar />
      <VStack
        w={"full"}
        minH={{ base: "80vh", md: "75vh" }}
        pt={"100px"}
        pos={"relative"}
      >
        {/* <Lottie
          isClickToPauseDisabled={true}
          style={{
            width: "85vw",
            height: "90vh",
            position: "absolute",
            top: "90px",
          }}
          options={{ ...defaultOptions, animationData: appRejected }}
          height={400}
          width={310}
        /> */}
        <Lottie
          isClickToPauseDisabled={true}
          style={{ position: "absolute", top: "120px" }}
          options={{ ...defaultOptions, animationData: appRejected }}
          height={180}
          width={150}
        />
        <VStack
          w={"full"}
          justify={"center"}
          pos={"absolute"}
          align={"center"}
          top={"300px"}
          spacing={"15px"}
        >
          <Text
            w={{ base: "96%", md: "full" }}
            textAlign={"center"}
            fontSize={{ base: "16px", md: "18px" }}
            color={"gray.600"}
          >
            Sorry Bank can not process your application. <br /> But no worries!
            you can go with other options.
          </Text>
          <Link to={"/track-applications"}>
            <Button
              w={"120px"}
              colorScheme="messenger"
              rightIcon={<Icon mt={"1px"} as={AiOutlineRight} />}
            >
              Next
            </Button>
          </Link>
        </VStack>
      </VStack>
      <VStack w={"full"} spacing={0}>
        <Text
          //   borderBottom={"1px solid gray"}
          fontFamily={"heading"}
          fontSize={"28px"}
          color={"blue.500"}
          fontWeight={600}
          w={"full"}
          pl={{ base: "0", md: "50px" }}
          mb={"10px"}
          textAlign={{ base: "center", md: "left" }}
        >
          Explore More
        </Text>
        <Divider />
        <HStack
          //   border={"1px solid red"}
          w={"100%"}
          overflowX={"scroll"}
          h={"420px"}
          spacing={"20px"}
          px={"10px"}
        >
          {new Array(12).fill(0).map((ele) => (
            <SingleGridItem />
          ))}
        </HStack>
      </VStack>
      <FooterMain />
    </>
  );
}

function SingleGridItem() {
  return (
    <HStack
      overflow={"hidden"}
      h={"380px"}
      minW={{ base: "300px", md: "310px" }}
      boxShadow={"rgba(0, 0, 0, 0.24) 0px 3px 8px"}
      rounded={"12px"}
    >
      <Card w={"full"} h={"full"} p={"10px"}>
        <CardHeader
          rounded={"10px"}
          w={"full"}
          bg={"rgb(228,238,253)"}
          h={"200px"}
          pos={"relative"}
          cursor={"pointer"}
        >
          <Image
            src={axisCardImage}
            style={{
              width: "calc(500px/3)",
              height: "calc(317px/3)",
              transform: "translate(-50%,50%)",
            }}
            pos={"absolute"}
            left={"50%"}
            bottom={"50%"}
          />
        </CardHeader>
        <CardBody p={"8px"} mb={"8px"}>
          <VStack w={"full"} spacing={"6px"}>
            <Text
              w={"full"}
              fontWeight={500}
              textAlign={"center"}
              fontSize={"15px"}
              color={"gray.500"}
            >
              Application Status
            </Text>
            <Badge
              colorScheme="orange"
              w={"fit-content"}
              px={"15px"}
              rounded={"12px"}
              py={"2px"}
              textAlign={"center"}
              fontSize={"1.0em"}
              fontWeight={600}
              boxShadow={"rgba(0, 0, 0, 0.16) 0px 1px 4px"}
            >
              Pending
            </Badge>
          </VStack>
        </CardBody>
        <Divider color={"gray.400"} />
        <CardFooter w={"full"}>
          <HStack w={"full"} justify={"space-between"} align={"center"}>
            <VStack spacing={"1px"}>
              <Text color={"gray.500"} fontSize={15} fontWeight={500}>
                Applied on
              </Text>
              <Text fontWeight={600}>17-Feb-2023</Text>
            </VStack>
            <VStack spacing={"1px"}>
              <Text color={"gray.500"} fontSize={15} fontWeight={500}>
                Last updated on
              </Text>
              <Text fontWeight={600}>17-Feb-2023</Text>
            </VStack>
          </HStack>
        </CardFooter>
      </Card>
    </HStack>
  );
}
