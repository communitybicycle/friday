import {Box, PseudoBox, Text, useColorMode} from "@chakra-ui/core";
import React from "react";
import {hot} from "react-hot-loader";

interface Props {
  name: string;
  description?: string;
}

const Item: React.FC<Props> = ({ name, description, children }) => {
  const { colorMode } = useColorMode();

  return (
    <PseudoBox
      d="flex"
      justifyContent="space-between"
      alignItems="center"
      py={2}
      borderTop={`1px solid ${colorMode === "light" ? "#efefef" : "#555"}`}
      _first={{ borderTop: "none" }}
    >
      <Box>
        <Text fontWeight="bold">{name}</Text>
        {description && <Text color="gray">{description}</Text>}
      </Box>
      {children}
    </PseudoBox>
  );
};

export default hot(module)(Item);
