import React from "react";
import { PseudoBox } from "@chakra-ui/core";
import { PseudoBoxProps } from "@chakra-ui/core/dist/PseudoBox";

const Card: React.FC<PseudoBoxProps> = ({ children, ...rest }) => {
  return (
    <PseudoBox
      maxW="300px"
      borderWidth="1px"
      rounded="lg"
      overflow="hidden"
      py="4"
      px="4"
      {...rest}
    >
      {children}
    </PseudoBox>
  );
};

export default Card;
