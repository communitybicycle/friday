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
      transition="all 0.12s ease"
      _hover={{
        transform: "translate(0, -4px)",
        boxShadow:
          "rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px",
        ..._hover,
      }}
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
