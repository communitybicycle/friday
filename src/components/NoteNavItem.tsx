import { PseudoBox, Text, useColorMode } from "@chakra-ui/core";
import React from "react";
import { hot } from "react-hot-loader";
import { useHistory } from "react-router";

interface Props {
  to: string;
  text: string;
}

const NoteNavItem: React.FC<Props> = ({ to, text }) => {
  const { colorMode } = useColorMode();
  const history = useHistory();
  const isLightMode = colorMode === "light";

  const handleClick = () => {
    if (history.location.pathname !== to) {
      history.push(to);
    }
  };

  return (
    <PseudoBox
      display="flex"
      alignItems="center"
      color={isLightMode ? "gray.800" : "white"}
      fontSize="lg"
      lineHeight="1.85"
      height="34px"
      px={2}
      _hover={{
        backgroundColor: isLightMode ? "white" : "gray.600",
      }}
      borderRadius={4}
      cursor="pointer"
      onClick={handleClick}
      mb={1}
    >
      <Text fontWeight={isLightMode ? 400 : 300} isTruncated>
        {text}
      </Text>
    </PseudoBox>
  );
};

export default hot(module)(NoteNavItem);
