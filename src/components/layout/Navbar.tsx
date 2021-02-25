import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  IconButton,
  Image,
  PseudoBox,
  Text,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/core";
import {
  NAVBAR_BORDER_COLOR,
  NAVBAR_WIDTH,
  WINDOW_BAR_HEIGHT,
} from "data/constants";
import React, { FunctionComponent } from "react";
import { hot } from "react-hot-loader";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { RootState } from "reducers/store";
import Center from "components/layout/Center";
import Settings from "components/settings/Settings";

interface IPropsNavigation {
  to: string;
  icon?: string;
  lighter?: boolean;
}

export const Navigation: FunctionComponent<IPropsNavigation> = ({
  to,
  icon,
  lighter,
  children,
}) => {
  const { colorMode } = useColorMode();
  const history = useHistory();

  const handleClick = () => {
    if (history.location.pathname !== to) {
      history.push(to);
    }
  };

  return (
    <PseudoBox
      display="flex"
      alignItems="center"
      color="white"
      fontSize="lg"
      fontWeight="light"
      lineHeight="1.85"
      height="34px"
      px={2}
      _hover={{
        backgroundColor:
          colorMode === "light"
            ? NAVBAR_BORDER_COLOR
            : lighter
            ? "gray.600"
            : "gray.700",
      }}
      borderRadius={4}
      cursor="pointer"
      onClick={handleClick}
    >
      {icon && <Icon name={icon} mr={3} />}
      <span>{children}</span>
    </PseudoBox>
  );
};

const Navbar: React.FC = () => {
  const { colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { settings } = useSelector((state: RootState) => state);
  const {
    pages: { dashboards },
  } = useSelector((state: RootState) => state.data);
  const { isMenuOpen } = useSelector((state: RootState) => state.meta);
  const { profilePicture } = useSelector((state: RootState) => state.user);
  const bgColor = { light: "#333", dark: "gray.800" };

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
          {settings.calendarPlugin && (
            <Navigation to="/calendar">Calendar</Navigation>
          )}
          {settings.terminalPlugin && (
            <Navigation to="/terminal">Terminal</Navigation>
          )}
        </Box>

        <Heading fontSize="md" textTransform="uppercase" color="white" mb={2}>
          Notes
        </Heading>
        <Navigation to="/notes" icon="edit">
          Notes
        </Navigation>
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
