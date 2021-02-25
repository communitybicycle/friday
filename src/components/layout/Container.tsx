import React, { FunctionComponent } from "react";
import { hot } from "react-hot-loader";
import { Box } from "@chakra-ui/core";

const Container: FunctionComponent = ({ children, ...rest }) => {
  return (
    <Box maxW="1020px" w="100%" h="100%" mx="auto" px="50px" {...rest}>
      {children}
    </Box>
  );
};

export default hot(module)(Container);
