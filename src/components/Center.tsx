import React, { FunctionComponent } from "react";
import { BoxProps, Flex } from "@chakra-ui/core";

const Center: FunctionComponent<BoxProps> = ({ children, ...rest }) => {
  return (
    <Flex justify="center" {...rest}>
      {children}
    </Flex>
  );
};

export default Center;
