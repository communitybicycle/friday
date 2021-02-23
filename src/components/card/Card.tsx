import { HeadingProps } from "@chakra-ui/core/dist/Heading";
import React from "react";
import { hot } from "react-hot-loader";
import { BoxProps, Heading, PseudoBox } from "@chakra-ui/core";
import { PseudoBoxProps } from "@chakra-ui/core/dist/PseudoBox";

interface CardProps extends PseudoBoxProps {
  _hover?: BoxProps & {
    [key: string]: BoxProps;
  };
}

export const Card: React.FC<CardProps> = ({ children, _hover, ...rest }) => {
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

export const CardTitle: React.FC<HeadingProps> = ({
  size,
  children,
  ...rest
}) => {
  return (
    <Heading size={size || "lg"} mb={1} {...rest}>
      {children}
    </Heading>
  );
};

export default hot(module)({ Card, CardTitle });
