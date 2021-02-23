import React, { FunctionComponent } from "react";
import { hot } from "react-hot-loader";
import { Box, Flex, Heading, Text } from "@chakra-ui/core";

const Header: FunctionComponent = () => {
  return (
    <Box backgroundColor="#333">
      <Flex
        justify="center"
        w="100%"
        backgroundColor="#fff"
        borderRadius="36px 36px 0 0"
      >
        <Box my={4}>
          <Heading textAlign="center">Welcome!</Heading>
          <Text textAlign="center">How can I help you?</Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default hot(module)(Header);
