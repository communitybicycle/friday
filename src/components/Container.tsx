import React, { FunctionComponent } from "react";
import { hot } from "react-hot-loader";
import { Box } from "@chakra-ui/core";

const Container: FunctionComponent = ({ children, ...rest }) => {
  return (
    <Box w="1020px" mx="auto" px="50px" {...rest}>
      {children}
    </Box>
  );
};

export default hot(module)(Container);
