/** @format */

import { Text, VStack } from "@chakra-ui/react";
import React from "react";
import Lottie from "react-lottie";
import anim1 from "../../assets/animations/anim1.json";
import anim4 from "../../assets/animations/anim4.json";

function ApplicationSubmitStep() {
	const defaultOptions = {
		loop: true,
		autoplay: true,
		rendererSettings: {
			preserveAspectRatio: "xMidYMid slice",
		},
	};
	return (
		<VStack
			w={"full"}
			pos={"relative"}
			h={"500px"}
			pt={"20px"}
			align={"center"}
		>
			<Lottie
				options={{ ...defaultOptions, animationData: anim4 }}
				height={250}
				width={250}
				isClickToPauseDisabled
			/>
			<Lottie
				options={{ ...defaultOptions, animationData: anim1 }}
				height={50}
				width={200}
				isClickToPauseDisabled
			/>
			<Text fontSize={21} color="gray.500">
				We are getting the response from the bank...
			</Text>
		</VStack>
	);
}

export default ApplicationSubmitStep;
