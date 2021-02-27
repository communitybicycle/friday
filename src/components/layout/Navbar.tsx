import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Image,
  Text,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/core";
import Center from "components/layout/Center";
import { Navigation } from "components/NavItem";
import Settings from "components/settings/Settings";
import {
  NAVBAR_BORDER_COLOR,
  NAVBAR_WIDTH,
  WINDOW_BAR_HEIGHT,
} from "data/constants";
import React from "react";
import { hot } from "react-hot-loader";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { addNote } from "reducers/dataReducer";
import { RootState } from "reducers/store";
import { uuid } from "utils/index";

const Navbar: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { settings } = useSelector((state: RootState) => state);
  const {
    pages: { dashboards },
  } = useSelector((state: RootState) => state.data);
  const { isMenuOpen } = useSelector((state: RootState) => state.meta);
  const { profilePicture } = useSelector((state: RootState) => state.user);
  const bgColor = { light: "#333", dark: "gray.800" };

  const handleNewNote = () => {
    const id = uuid();
    dispatch(addNote({ id }));
    history.push(`/notes/${id}`);
  };

  return (
    <Flex
      bg={bgColor[colorMode]}
      height={`calc(100vh - ${WINDOW_BAR_HEIGHT}px)`}
      transform={
        isMenuOpen ? "translate(0, 0)" : `translate(-${NAVBAR_WIDTH}px, 0)`
      }
      minW={`${NAVBAR_WIDTH}px`}
      w={`${NAVBAR_WIDTH}px`}
      transition="0.25s transform ease-in"
      position="fixed"
      top={`${WINDOW_BAR_HEIGHT}px`}
      left={0}
      flexDir="column"
      justifyContent="space-between"
      borderRight={
        colorMode === "dark"
          ? isMenuOpen
            ? `1px solid ${NAVBAR_BORDER_COLOR}`
            : "none"
          : "none"
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

        {/* Routes */}
        <Heading fontSize="md" textTransform="uppercase" color="white" mb={2}>
          Home
        </Heading>
        <Box mb={3}>
          {Object.values(dashboards).map((dashboard) => (
            <Navigation
              to={`/dashboard/${dashboard.id}`}
              key={dashboard.id}
              icon="sun"
            >
              {dashboard.title}
            </Navigation>
          ))}
        </Box>
        <Heading fontSize="md" textTransform="uppercase" color="white" mb={2}>
          Automations
        </Heading>
        <Box mb={3}>
          <Navigation to="/actions" icon="star">
            Actions
          </Navigation>
          <Navigation to="/instructions" icon="moon">
            Instructions
          </Navigation>
        </Box>

        <Heading fontSize="md" textTransform="uppercase" color="white" mb={2}>
          Plugins
        </Heading>
        <Navigation to="/notes" icon="edit">
          Notes
        </Navigation>
        {settings.calendarPlugin && (
          <Navigation to="/calendar" icon="calendar">
            Calendar
          </Navigation>
        )}
        {settings.terminalPlugin && (
          <Navigation to="/terminal" icon="info">
            Terminal
          </Navigation>
        )}
      </Box>

      {/* Bottom section */}
      <Flex
        justifyContent="space-between"
        p={2}
        borderTop={`1px solid ${NAVBAR_BORDER_COLOR}`}
      >
        <Button
          justifyContent="flex-start"
          w="100%"
          variant="ghost"
          variantColor="veryWhite"
          _hover={{
            background: "none",
            backgroundColor:
              colorMode === "light" ? NAVBAR_BORDER_COLOR : "gray.700",
          }}
          _active={{ background: "none" }}
          transition="none"
          onClick={handleNewNote}
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
          _hover={{
            background: "none",
            backgroundColor:
              colorMode === "light" ? NAVBAR_BORDER_COLOR : "gray.700",
          }}
        />
      </Flex>
      <Settings isOpen={isOpen} onClose={onClose} />
    </Flex>
  );
};

export default hot(module)(Navbar);
