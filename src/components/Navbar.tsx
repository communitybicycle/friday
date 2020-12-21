import React, { FunctionComponent } from "react";
import { hot } from "react-hot-loader";
import { Box, Heading, Image, PseudoBox, Text } from "@chakra-ui/core";
import { NAVBAR_PHOTO_URL } from "../data/constants";
import Center from "./Center";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";
import { RootState } from "../reducers/store";

interface IPropsNavigation {
  to: string;
}

const Navigation: FunctionComponent<IPropsNavigation> = ({ to, children }) => {
  const history = useHistory();

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
      cursor="pointer"
      onClick={() => history.push(to)}
    >
      <span>{children}</span>
    </PseudoBox>
  );
};

const Navbar: React.FC = () => {
  const { isMenuOpen } = useSelector((state: RootState) => state.meta);

  return (
    <Box
      backgroundColor="#333"
      height="100vh"
      transform={isMenuOpen ? "translate(0, 0)" : "translate(-280px, 0)"}
      minW="280px"
      w="280px"
      px={isMenuOpen ? "20px" : "0px"}
      transition="0.25s all ease-in"
      position="fixed"
      top="30px"
      left={0}
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

export default hot(module)(Navbar);
