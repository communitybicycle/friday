import React from "react";
import { hot } from "react-hot-loader";
import { Box, Flex, useColorMode } from "@chakra-ui/core";
import ElectronStoreSynchronizer from "./components/ElectronStoreSynchronizer";
import Navbar from "./components/Navbar";
import Router from "./Router";
import { useSelector } from "react-redux";
import { RootState } from "./reducers/store";

const App: React.FC = () => {
  const { colorMode } = useColorMode();
  const { isMenuOpen } = useSelector((state: RootState) => state.meta);
  const bgColor = { light: "white", dark: "gray.800" };

  return (
    <Flex h="100%" bg={bgColor[colorMode]}>
      <Navbar />
      <Box
        flex={1}
        borderRadius={isMenuOpen ? "25px 0 0 0" : "0"}
        w={isMenuOpen ? "calc(100% - 280px)" : "100%"}
        maxW={isMenuOpen ? "calc(100% - 280px)" : "100%"}
        transition="0.25s transform ease-in"
        transform={isMenuOpen ? "translate(280px, 0)" : "translate(0, 0)"}
      >
        <Router />
      </Box>
      <ElectronStoreSynchronizer />
    </Flex>
  );
};

export default hot(module)(App);
