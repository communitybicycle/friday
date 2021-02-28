import {
  Collapse,
  Icon,
  PseudoBox,
  Text,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/core";
import React, { Fragment } from "react";
import { hot } from "react-hot-loader";

interface Props {
  text: string;
}

const NoteFolderItem: React.FC<Props> = ({ text, children }) => {
  const { isOpen, onToggle } = useDisclosure();
  const { colorMode } = useColorMode();
  const isLightMode = colorMode === "light";

  return (
    <Fragment>
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
        onClick={onToggle}
        mb={1}
      >
        <Icon name={isOpen ? "chevron-down" : "chevron-right"} mr={3} />
        <Text fontWeight={isLightMode ? 400 : 300} isTruncated>
          {text}
        </Text>
      </PseudoBox>
      <Collapse isOpen={isOpen} ml="28px">
        {children}
      </Collapse>
    </Fragment>
  );
};

export default hot(module)(NoteFolderItem);
