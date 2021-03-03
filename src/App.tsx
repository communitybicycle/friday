import { Box, Flex, useColorMode } from "@chakra-ui/core";
import ElectronStoreSynchronizer from "components/ElectronStoreSynchronizer";
import Navbar from "components/layout/Navbar";
import { BG_COLOR, NAVBAR_WIDTH } from "data/constants";
import React from "react";
import { Scrollbars } from "react-custom-scrollbars";
import { hot } from "react-hot-loader";
import { useSelector } from "react-redux";
import { RootState } from "reducers/store";
import Router from "./Router";

const App: React.FC = () => {
  const { colorMode } = useColorMode();
  const { isMenuOpen } = useSelector((state: RootState) => state.meta);

  return (
    <Flex h="100%" bg={BG_COLOR[colorMode]}>
      <Navbar />
      <Box
        flex={1}
        borderRadius={isMenuOpen ? "25px 0 0 0" : "0"}
        w={isMenuOpen ? `calc(100% - ${NAVBAR_WIDTH}px)` : "100%"}
        maxW={isMenuOpen ? `calc(100% - ${NAVBAR_WIDTH}px)` : "100%"}
        transition="0.25s transform ease-in"
        transform={
          isMenuOpen ? `translate(${NAVBAR_WIDTH}px, 0)` : "translate(0, 0)"
        }
      >
        <Scrollbars style={{ width: "100%", height: "100%" }}>
          <Router />
        </Scrollbars>
      </Box>
      <ElectronStoreSynchronizer />
    </Flex>
  );
};

export default hot(module)(App);
