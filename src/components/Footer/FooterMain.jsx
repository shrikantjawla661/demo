/** @format */

import {
	HStack,
	Text,
	VStack,
	List,
	ListItem,
	ListIcon,
	OrderedList,
	UnorderedList,
	Image,
	Stack,
} from "@chakra-ui/react";
import React from "react";
import cardInsiderName from "../../assets/images/logo-white-1.png";

export default function FooterMain() {
	return (
		<VStack w={"100%"} h={"fit-content"} spacing={0} pt={"50px"}>
			{/* Top footer */}
			<Stack
				direction={{ base: "column", md: "row" }}
				w={"100%"}
				minH={{ base: "fit-content", lg: "321px" }}
				bg={"#001d4c"}
				mb={0}
				color={"white"}
				justify={"center"}
				align={"center"}
				py={"21px"}
				px={{ base: "15px", lg: "0px" }}
			>
				{/* First div */}
				<VStack
					h={{ base: "fit-content", md: "223px" }}
					w={{ base: "full", md: "390px" }}
					justify={"flex-start"}
					align={"start"}
					spacing={"0px"}
					p={"15px"}
				>
					<HStack w={"full"}>
						<Image w={"250px"} src={cardInsiderName} />
					</HStack>
					<Text w={"full"} fontSize={16} fontWeight={450}>
						Compare India’s most rewarding credit cards under one roof and pick
						the one that works for you the best.
					</Text>
				</VStack>
				{/* Second div */}
				<VStack
					h={{ base: "fit-content", md: "223px" }}
					w={{ base: "full", md: "390px" }}
					justify={"flex-start"}
					align={"start"}
					spacing={"10px"}
					p={"15px"}
				>
					<Text w={"full"} fontSize={20} fontWeight={700}>
						Company
					</Text>
					<UnorderedList
						w={"full"}
						pl={"20px"}
						fontWeight={450}
						spacing={"6px"}
					>
						<ListItem>About Us</ListItem>
						<ListItem>Contact Us</ListItem>
						<ListItem>Blog</ListItem>
						<ListItem>Privacy Policy</ListItem>
						<ListItem>Terms & Conditions</ListItem>
					</UnorderedList>
				</VStack>
				{/* Third div */}
				<VStack
					h={{ base: "fit-content", md: "223px" }}
					w={{ base: "full", md: "390px" }}
					justify={"flex-start"}
					align={"start"}
					spacing={"15px"}
					p={"15px"}
				>
					<Text w={"full"} fontSize={20} fontWeight={700}>
						Contact Info
					</Text>
					<Text w={"full"} fontWeight={500}>
						SCO 208, 1st Floor, Sector 14, Panchkula,
						<br /> Haryana 134109
					</Text>
				</VStack>
			</Stack>
			{/* Bottom footer */}
			<Stack
				direction={{ base: "column", md: "row" }}
				h={"80px"}
				justify={"center"}
				align={"center"}
				w={"full"}
				bg={"#082555"}
				color="white"
				fontSize={17}
				px={"17px"}
			>
				<Text
					w={{ base: "100%", md: "540px" }}
					textAlign={{ base: "center", md: "left" }}
				>
					© Copyright 2023 Card Insider
				</Text>
				<Text
					w={{ base: "100%", md: "540px" }}
					textAlign={{ base: "center", md: "right" }}
				>
					Made with ❤ in India.
				</Text>
			</Stack>
		</VStack>
	);
}
