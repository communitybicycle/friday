import { Box, Flex, Heading, useColorMode } from "@chakra-ui/core";
import Container from "components/layout/Container";
import { Navigation } from "components/layout/Navbar";
import {
  NAVBAR_BORDER_COLOR,
  NAVBAR_WIDTH,
  WINDOW_BAR_HEIGHT,
} from "data/constants";
import React from "react";
import { hot } from "react-hot-loader";
import { useSelector } from "react-redux";
import { RootState } from "reducers/store";

const NoteDashboard: React.FC = () => {
  const { colorMode } = useColorMode();
  const {
    pages: { notes },
  } = useSelector((state: RootState) => state.data);

  return (
    <Flex>
      <Box
        bg={colorMode === "light" ? "gray.100" : "gray.700"}
        width={`${NAVBAR_WIDTH}px`}
        height={`calc(100vh - ${WINDOW_BAR_HEIGHT}px)`}
        px="20px"
        pt="56px"
        // boxShadow="7px 0 16px -6px rgba(0, 0, 0, 0.16)"
        borderRight={
          colorMode === "light"
            ? "1px solid #ececec"
            : `1px solid ${NAVBAR_BORDER_COLOR}`
        }
      >
        <Heading size="lg" mb={2}>
          Notes
        </Heading>
        {Object.values(notes).map((notePage) => (
          <Navigation to={`/notes/${notePage.id}`} key={notePage.id} lighter>
            {notePage.title}
          </Navigation>
        ))}
      </Box>
      <Box pt="50px" px="50px">
        <Container>Dashboard</Container>
      </Box>
    </Flex>
  );
};

export default hot(module)(NoteDashboard);
