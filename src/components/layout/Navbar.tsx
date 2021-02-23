import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Image,
  PseudoBox,
  Text,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/core";
import React, { FunctionComponent } from "react";
import { hot } from "react-hot-loader";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { RootState } from "reducers/store";
import Center from "components/layout/Center";
import Settings from "components/settings/Settings";

interface IPropsNavigation {
  to: string;
}

const Navigation: FunctionComponent<IPropsNavigation> = ({ to, children }) => {
  const history = useHistory();

  const handleClick = () => {
    if (history.location.pathname !== to) {
      history.push(to);
    }
  };

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
      onClick={handleClick}
    >
      <span>{children}</span>
    </PseudoBox>
  );
};

const Navbar: React.FC = () => {
  const { colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    pages: { dashboards, notes },
  } = useSelector((state: RootState) => state.data);
  const { isMenuOpen } = useSelector((state: RootState) => state.meta);
  const { profilePicture } = useSelector((state: RootState) => state.user);
  const bgColor = { light: "#333", dark: "gray.800" };

  return (
    <Flex
      bg={bgColor[colorMode]}
      height="calc(100vh - 30px)"
      transform={isMenuOpen ? "translate(0, 0)" : "translate(-280px, 0)"}
      minW="280px"
      w="280px"
      transition="0.25s transform ease-in"
      position="fixed"
      top="30px"
      left={0}
      flexDir="column"
      justifyContent="space-between"
      borderRight={
        colorMode === "dark" ? (isMenuOpen ? "1px solid #555" : "none") : "none"
      }
    >
      <Box px={isMenuOpen ? "20px" : "0px"}>
        <Box w="100%">
          <Heading color="white" textAlign="center" fontSize="2xl">
            Friday
          </Heading>
          <Text color="white" textAlign="center">
            Your personal assistant
          </Text>
        </Box>
        <Center py={6}>
          <Image
            size="160px"
            src={profilePicture}
            borderRadius="100%"
            alt=""
            objectFit="cover"
          />
        </Center>
        <Heading fontSize="md" textTransform="uppercase" color="white" mb={2}>
          Home
        </Heading>
        <Box mb={3}>
          {Object.values(dashboards).map((dashboard) => (
            <Navigation to={`/dashboard/${dashboard.id}`} key={dashboard.id}>
              {dashboard.title}
            </Navigation>
          ))}
        </Box>
        <Heading fontSize="md" textTransform="uppercase" color="white" mb={2}>
          Others
        </Heading>
        <Box mb={3}>
          <Navigation to="/actions">Actions</Navigation>
          <Navigation to="/instructions">Instructions</Navigation>
          <Navigation to="/terminal">Terminal</Navigation>
        </Box>

        <Heading fontSize="md" textTransform="uppercase" color="white" mb={2}>
          Notes
        </Heading>
        <Box>
          {Object.values(notes).map((notePage) => (
            <Navigation to={`/notes/${notePage.id}`} key={notePage.id}>
              {notePage.title}
            </Navigation>
          ))}
        </Box>
      </Box>
      <Flex justifyContent="space-between" p={2} borderTop="1px solid #555">
        <Button
          justifyContent="flex-start"
          w="100%"
          variant="ghost"
          variantColor="veryWhite"
          _hover={{ background: "none", backgroundColor: "#555" }}
          _active={{ background: "none" }}
          transition="none"
          mr={1}
        >
          + New Note
        </Button>
        <IconButton
          aria-label="personal settings"
          icon="settings"
          variant="link"
          variantColor="veryWhite"
          h="40px"
          onClick={onOpen}
          transition="none"
          _hover={{ background: "none", backgroundColor: "#555" }}
        />
      </Flex>
      <Settings isOpen={isOpen} onClose={onClose} />
    </Flex>
  );
};

export default hot(module)(Navbar);
