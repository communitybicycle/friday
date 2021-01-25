import React from "react";
import { hot } from "react-hot-loader";
import { Box, Flex } from "@chakra-ui/core";
import Navbar from "./components/Navbar";
import Router from "./Router";
import { useSelector } from "react-redux";
import { RootState } from "./reducers/store";

const App: React.FC = () => {
  const { isMenuOpen } = useSelector((state: RootState) => state.meta);

  return (
    <Flex h="100%">
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
    </Flex>
  );
};

export default hot(module)(App);
