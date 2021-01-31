import { Box, PseudoBox, Text } from "@chakra-ui/core";
import React from "react";
import { hot } from "react-hot-loader";

interface Props {
  name: string;
  description?: string;
}

const Item: React.FC<Props> = ({ name, description, children }) => {
  return (
    <PseudoBox d="flex" justifyContent="space-between" alignItems="center">
      <Box>
        <Text fontWeight="bold">{name}</Text>
        {description && <Text color="gray">{description}</Text>}
      </Box>
      {children}
    </PseudoBox>
  );
};

export default hot(module)(Item);
