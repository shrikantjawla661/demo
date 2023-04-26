/** @format */

import { Button, HStack, Icon, Text, VStack } from "@chakra-ui/react";
import React from "react";
import Navbar from "../components/Navbar/Navbar";
import FooterMain from "../components/Footer/FooterMain";
import Lottie from "react-lottie";
import confettiCongrats from "../assets/animations/confettiCongrats.json";
import appFilledAnmim from "../assets/animations/applicationFilled.json";
import { AiOutlineRight } from "react-icons/ai";
import { Link } from "react-router-dom";

export default function CongratulationPage() {
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
			<VStack w={"full"} minH={"100vh"} pt={"100px"} pos={"relative"}>
				<Lottie
					isClickToPauseDisabled={true}
					style={{
						width: "85vw",
						height: "90vh",
						position: "absolute",
						top: "90px",
					}}
					options={{ ...defaultOptions, animationData: confettiCongrats }}
					height={400}
					width={310}
				/>
				<Lottie
					isClickToPauseDisabled={true}
					style={{ position: "absolute", top: "90px" }}
					options={{ ...defaultOptions, animationData: appFilledAnmim }}
					height={400}
					width={310}
				/>
				<VStack
					w={"full"}
					justify={"center"}
					pos={"absolute"}
					align={'center'}
					top={"480px"}
					spacing={"12px"}
				>
					<Text textAlign={'center'} w={'full'} fontSize={"16px"} color={"gray.500"}>
						Your credit card application has been received. You will receive a
						confirmation soon.
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
			<FooterMain />
		</>
	);
}
