/** @format */

import React from "react";
import {
	Grid,
	GridItem,
	Text,
	VStack,
	Card,
	CardHeader,
	CardBody,
	CardFooter,
	Image,
	Badge,
	HStack,
    Divider,
} from "@chakra-ui/react";
import Navbar from "../components/Navbar/Navbar";
import FooterMain from "../components/Footer/FooterMain";
import axisCardImage from "../assets/images/axis card.jpg";

export default function TrackApplicationPage() {
	return (
		<>
			<Navbar />
			<VStack w={"full"} minH={"100vh"} pt={"110px"} align={"center"}>
				<Text w={"full"} textAlign={"center"} fontSize={28} fontWeight={500} mb={'15px'}>
					Track Applications
				</Text>
				<Grid
					// border={"1px solid red"}
					w={"90%"}
					minH={"80vh"}
					m={"auto"}
					justifyContent={"center"}
					gap={{base:'15p',md:"15px",lg:'20px'}}
					gridTemplateColumns={{
						base: "290px",
						md: "repeat(2,310px)",
						lg: "repeat(4,310px)",
					}}
				>
					{new Array(12).fill(0).map((ele) => (
						<SingleGridItem />
					))}
				</Grid>
			</VStack>
			<FooterMain />
		</>
	);
}

function SingleGridItem() {
	return (
		<GridItem
			overflow={"hidden"}
			h={"380px"}
			w={"full"}
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
                    cursor={'pointer'}
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
				<CardBody p={"8px"} mb={'8px'}>
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
                <Divider color={'gray.400'}/>
				<CardFooter w={"full"}>
					<HStack
						w={"full"}
						justify={"space-between"}
						align={"center"}
					>
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
		</GridItem>
	);
}
