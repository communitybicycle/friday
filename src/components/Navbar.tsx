import React, { FunctionComponent } from "react";
import { Box, Heading, Image, PseudoBox, Text } from "@chakra-ui/core";
import { NAVBAR_PHOTO_URL } from "../data/constants";
import Center from "./Center";
import { Link } from "react-router-dom";

interface IProps {
  isOpen: boolean;
}

interface IPropsNavigation {
  to: string;
}

const Navigation: FunctionComponent<IPropsNavigation> = ({ to, children }) => {
  return (
    <PseudoBox
      display="block"
      color="white"
      fontSize="lg"
      fontWeight="light"
      lineHeight="1.85"
      height="34px"
      px={2}
      _hover={{
        backgroundColor: "#555",
      }}
      borderRadius={4}
    >
      <Link to={to}> {children}</Link>
    </PseudoBox>
  );
};

const Navbar: FunctionComponent<IProps> = ({ isOpen }: { isOpen: boolean }) => {
  return (
    <Box
      minW={isOpen ? "280px" : "0px"}
      w={isOpen ? "280px" : "0px"}
      // w="280px"
      px={isOpen ? "20px" : "0px"}
      // px="20px"
      transition="0.35s all ease-in"
      // transform={isOpen ? "translate(0%)" : "translate(-280px)"}
    >
      <Box w="100%">
        <Heading color="white" textAlign="center" fontSize="2xl">
          Friday
        </Heading>
        <Text color="white" textAlign="center">
          Your personal assistant
        </Text>
      </Box>
      <Center py={6}>
        <Image size="160px" src={NAVBAR_PHOTO_URL} borderRadius="100%" />
      </Center>
      <Heading fontSize="md" textTransform="uppercase" color="white" mb={2}>
        Home
      </Heading>
      <Box>
        <Navigation to="/">Dashboard</Navigation>
        <Navigation to="/automations">Automations</Navigation>
        <Navigation to="/notes">Notes</Navigation>
        <Navigation to="/weather">Weather</Navigation>
      </Box>
    </Box>
  );
};

export default Navbar;
