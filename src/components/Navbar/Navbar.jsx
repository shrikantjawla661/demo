/** @format */

import {
	Button,
	HStack,
	Icon,
	Image,
	Input,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Stack,
	useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { BiSearch } from "react-icons/bi";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";
import logo from "../../assets/images/card-insider-logo.webp";
import NavDrawer from "./NavDrawer";
import { Link } from "react-router-dom";

export default function Navbar() {
	const [searchWidth, setSearchWidth] = useState(false);
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [searchDivVisibility, setSearchDivVisibility] = useState(false);

	useEffect(() => {
		document.addEventListener("click", ({ target }) => {
			const { id } = target;
			const ids = [
				"searchInput",
				"searchContainer",
				"searchIconContainer",
				"searchIcon",
				"onpenSearchDiv",
			];
			if (!ids.includes(id)) {
				setSearchDivVisibility(false);
			}
		});
	});

	return (
		<Stack
			direction={"row"}
			pos={"fixed"}
			top={0}
			left={0}
			w="full"
			h={"90px"}
			boxShadow={"rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;"}
			align={"center"}
			bg={"white"}
			zIndex={1000}
		>
			{/* Container to hold the width of content on 4k screens above '2xl' */}
			<HStack
				w={{ base: "full", "2xl": "1500px" }}
				m={"auto"}
				justify="space-between"
				px={"30px"}
			>
				<Icon
					boxSize={"20px"}
					cursor={"pointer"}
					display={{ lg: "none" }}
					as={GiHamburgerMenu}
					onClick={onOpen}
				/>
				<Link to={"/"}>
					<Image
						style={{ userSelect: "none" }}
						src={logo}
						h={{ base: "32px", lg: "50px" }}
						w={{ base: "135px", lg: "fit-content" }}
						cursor={"pointer"}
					/>
				</Link>
				<HStack
					display={{ base: "none", lg: "flex" }}
					w={"fit-content"}
					h={"full"}
				>
					<DropDownButton title={"Card Categories"} />
					<DropDownButton title={"Card Issuer"} />
					<DropDownButton title={"Blog"} />
					<DropDownButton title={"Resources"} />
				</HStack>
				{/* This search bar will be visible on large screens */}
				<HStack
					display={{ base: "none", lg: "flex" }}
					transitionProperty={"all"}
					transitionDuration={"0.6"}
					w={searchWidth ? "400px" : "60px"}
					h={"40px"}
					border={"1px solid #ced4da"}
					rounded={"20px"}
					overflow={"hidden"}
				>
					{searchWidth && <Input outline={"none"} border={"none"} />}
					<HStack
						onClick={() => setSearchWidth(!searchWidth)}
						transitionProperty={"all"}
						transitionDuration={"0.6"}
						cursor={"pointer"}
						h={"full"}
						bg="blue.500"
						w={"60px"}
						rounded={"full"}
						justify={"center"}
						align={"center"}
					>
						<Icon as={BiSearch} boxSize={"26px"} color={"white"} />
					</HStack>
				</HStack>

				{/* This search bar will be visible on small and medium screens */}
				<HStack display={{ lg: "none" }}>
					<HStack
						cursor={"pointer"}
						bg="blue.500"
						w={"32px"}
						h={"32px"}
						rounded={"full"}
						justify={"center"}
						align={"center"}
					>
						<Icon
							as={BiSearch}
							boxSize={"17px"}
							color={"white"}
							onClick={() => {
								setSearchDivVisibility(!searchDivVisibility);
							}}
							id="onpenSearchDiv"
						/>
					</HStack>
				</HStack>

				{/* This search div will open on click of search icon */}
				{searchDivVisibility && (
					<HStack
						minW="320px"
						h={"40px"}
						border={"1px solid #ced4da"}
						rounded={"20px"}
						overflow={"hidden"}
						position={"absolute"}
						top={"94px"}
						right={0}
						bg={'white'}
						style={{ transition: "all 0.5s ease-in-out" }}
						id="searchContainer"
					>
						<Input outline={"none"} border={"none"} id="searchInput" />
						<HStack
							cursor={"pointer"}
							h={"full"}
							bg="blue.500"
							w={"60px"}
							rounded={"full"}
							justify={"center"}
							align={"center"}
							id="searchIconContainer"
						>
							<BiSearch id="searchIcon" />
							{/* <Icon
								as={BiSearch}
								boxSize={"26px"}
								color={"white"}
								id="searchIcon"
							/> */}
						</HStack>
					</HStack>
				)}

				{/* Drawer will open on click of hamBurger menu icon */}
				<NavDrawer isOpen={isOpen} onClose={onClose} />
			</HStack>
		</Stack>
	);
}

function DropDownButton(props) {
	const { title } = props;
	return (
		<Menu>
			{({ isOpen }) => (
				<>
					<MenuButton
						isActive={isOpen}
						as={Button}
						rightIcon={
							<Icon
								boxSize={"30px"}
								ml={"-7px"}
								as={isOpen ? RiArrowDropUpLine : RiArrowDropDownLine}
							/>
						}
						bg={"white"}
						fontSize={"19px"}
						color={"gray.500"}
						fontWeight={"400"}
						_active={{ bg: "inherit" }}
						_hover={{ bg: "inherit" }}
					>
						{title}
					</MenuButton>
					<MenuList
						w={"350px"}
						h={"200px"}
						boxShadow={"rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;"}
					>
						<MenuItem>Download</MenuItem>
						<MenuItem onClick={() => alert("Kagebunshin")}>
							Create a Copy
						</MenuItem>
					</MenuList>
				</>
			)}
		</Menu>
	);
}
