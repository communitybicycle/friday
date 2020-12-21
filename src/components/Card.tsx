import React from "react";
import { BoxProps, PseudoBox } from "@chakra-ui/core";
import { PseudoBoxProps } from "@chakra-ui/core/dist/PseudoBox";

interface Props extends PseudoBoxProps {
  _hover?: BoxProps & {
    [key: string]: BoxProps;
  };
}

const Card: React.FC<Props> = ({ children, _hover, ...rest }) => {
  return (
    <PseudoBox
      maxW="300px"
      borderWidth="1px"
      rounded="lg"
      overflow="hidden"
      py="4"
      px="4"
      _hover={_hover}
      {...rest}
    >
      {children}
    </PseudoBox>
  );
};

export default Card;
