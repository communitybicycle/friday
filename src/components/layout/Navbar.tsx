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
import { NavItem } from "components/NavItem";
import Settings from "components/settings/Settings";
import {
  DEFAULT_CHAKRA_TRANSITION,
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
  const { dashboards } = useSelector((state: RootState) => state.data);
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
        <Flex mb={2} position="relative">
          <Heading fontSize="md" textTransform="uppercase" color="white">
            Home
          </Heading>
          <IconButton
            position="absolute"
            top={0}
            right={0}
            variantColor="veryWhite"
            aria-label="Add new dashboard"
            icon="add"
            borderRadius={100}
            size="sm"
            variant="link"
          />
        </Flex>
        <Box mb={3}>
          {Object.values(dashboards).map((dashboard) => (
            <NavItem
              to={`/dashboard/${dashboard.id}`}
              key={dashboard.id}
              icon="sun"
            >
              {dashboard.title}
            </NavItem>
          ))}
        </Box>
        <Heading fontSize="md" textTransform="uppercase" color="white" mb={2}>
          Automations
        </Heading>
        <Box mb={3}>
          <NavItem to="/actions" icon="star">
            Actions
          </NavItem>
          <NavItem to="/instructions" icon="moon">
            Instructions
          </NavItem>
        </Box>

        <Heading fontSize="md" textTransform="uppercase" color="white" mb={2}>
          Plugins
        </Heading>
        {settings.notesPlugin && (
          <NavItem to="/notes" icon="edit">
            Notes
          </NavItem>
        )}
        {settings.calendarPlugin && (
          <NavItem to="/calendar" icon="calendar">
            Calendar
          </NavItem>
        )}
        {settings.terminalPlugin && (
          <NavItem to="/terminal" icon="info">
            Terminal
          </NavItem>
        )}
      </Box>

      {/* Bottom section */}
      <Flex direction="column">
        <Box px={5} mb={2}>
          <NavItem to="/" icon="help">
            Help
          </NavItem>
        </Box>
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
            transition={DEFAULT_CHAKRA_TRANSITION}
            onClick={handleNewNote}
            mr={2}
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
            transition={DEFAULT_CHAKRA_TRANSITION}
            _hover={{
              background: "none",
              backgroundColor:
                colorMode === "light" ? NAVBAR_BORDER_COLOR : "gray.700",
            }}
          />
        </Flex>
      </Flex>
      <Settings isOpen={isOpen} onClose={onClose} />
    </Flex>
  );
};

export default hot(module)(Navbar);
