import React, { FunctionComponent } from "react";
import { Box, Flex } from "@chakra-ui/core";
import Navbar from "./components/Navbar";
import Router from "./Router";
import { useSelector } from "react-redux";
import { RootState } from "./reducers/store";

const App: FunctionComponent = () => {
  const { isMenuOpen } = useSelector((state: RootState) => state.meta);

  return (
    <Flex backgroundColor="#333" h="100%" overflow="hidden">
      <Navbar />
      <Box
        backgroundColor="white"
        flex={1}
        borderRadius={isMenuOpen ? "25px 0 0 0" : "0"}
        boxShadow="-2px 15px 22px 0 rgba(0,0,0,0.35)"
      >
        <Router />
      </Box>
    </Flex>
  );
};

export default App;
