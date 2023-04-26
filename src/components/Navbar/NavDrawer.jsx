/** @format */

import {
	CloseButton,
	Drawer,
	DrawerBody,
	DrawerContent,
	DrawerHeader,
	DrawerOverlay,
	Accordion,
	AccordionItem,
	AccordionButton,
	AccordionPanel,
	AccordionIcon,
	Box,
} from "@chakra-ui/react";
import React from "react";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";

export default function NavDrawer({ onClose, isOpen }) {
	return (
		<Drawer placement={"left"} onClose={onClose} isOpen={isOpen}>
			<DrawerOverlay />
			<DrawerContent>
				<DrawerHeader
					borderBottomWidth="1px"
					display={"flex"}
					justifyContent={"end"}
				>
					<CloseButton onClick={onClose} />
				</DrawerHeader>
				<DrawerBody p={"0px"}>
					<Accordion allowMultiple>
						<CustumAccItem title={"Card Categories"} />
						<CustumAccItem title={"Card Issuer"} />
						<CustumAccItem title={"Card Blog"} />
						<CustumAccItem title={"Card Resources"} />
					</Accordion>
				</DrawerBody>
			</DrawerContent>
		</Drawer>
	);
}

function CustumAccItem({ title }) {
	return (
		<AccordionItem>
			<h2>
				<AccordionButton>
					<Box as="span" flex="1" textAlign="left">
						{title}
					</Box>
					<AccordionIcon />
				</AccordionButton>
			</h2>
			<AccordionPanel pb={4}>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
				tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
				veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
				commodo consequat.
			</AccordionPanel>
		</AccordionItem>
	);
}
