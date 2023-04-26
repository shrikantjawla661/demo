/** @format */

import React from "react";
import { HStack, Text, VStack } from "@chakra-ui/react";
import Navbar from "../components/Navbar/Navbar";
import FooterMain from "../components/Footer/FooterMain";
import comingSoon from '../assets/animations/comingSoon.json'
import Lottie from 'react-lottie'
const defaultOptions = {
	loop: true,
	autoplay: true,
	rendererSettings: {
		preserveAspectRatio: "xMidYMid slice",
	},
};


const HomePage = () => {
	return (
		<VStack w={"100%"} minH={"100vh"}>
			<Navbar />
			<VStack
				h={"90vh"}
				w={"full"}
				pt={"110px"}
				justify={"center"}
				align={"center"}
			>
				<Lottie
					isClickToPauseDisabled
					options={{ ...defaultOptions, animationData: comingSoon }}
					height={480}
					// width={700}
					width={'40vw'}
				/>
			</VStack>
			<FooterMain />
		</VStack>
	);
};

export default HomePage;
