import { Icon, PseudoBox, Text, useColorMode } from "@chakra-ui/core";
import { NAVBAR_BORDER_COLOR } from "data/constants";
import React from "react";
import { useHistory } from "react-router";

interface Props {
  to: string;
  icon?: string;
  lighter?: boolean;
}

export const NavItem: React.FC<Props> = ({ to, icon, lighter, children }) => {
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
      color={isLightMode ? (lighter ? "gray.800" : "white") : "white"}
      fontSize="lg"
      lineHeight="1.85"
      height="34px"
      px={2}
      _hover={{
        backgroundColor: isLightMode
          ? lighter
            ? "white"
            : NAVBAR_BORDER_COLOR
          : lighter
          ? "gray.600"
          : "gray.700",
      }}
      borderRadius={4}
      cursor="pointer"
      onClick={handleClick}
    >
      {icon && <Icon name={icon} mr={3} />}
      <Text fontWeight={isLightMode ? (lighter ? 400 : 300) : 300} isTruncated>
        {children}
      </Text>
    </PseudoBox>
  );
};
