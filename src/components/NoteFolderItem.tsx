import {
  Box,
  Collapse,
  Icon,
  PseudoBox,
  Text,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/core";
import { useDraggableInPortal } from "hooks/index";
import React from "react";
import { Draggable, DraggableProvided, Droppable } from "react-beautiful-dnd";
import { hot } from "react-hot-loader";

interface Props {
  text: string;
  id: string;
  index: number;
}

const NoteFolderItem: React.FC<Props> = ({ text, id, index, children }) => {
  const { isOpen, onToggle } = useDisclosure();
  const renderDraggable = useDraggableInPortal();
  const { colorMode } = useColorMode();
  const isLightMode = colorMode === "light";

  return (
    <Draggable draggableId={id} index={index}>
      {renderDraggable((provided: DraggableProvided) => (
        <Box
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
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
            <Droppable droppableId={id}>
              {(innerProvided) => (
                <Box
                  ref={innerProvided.innerRef}
                  {...innerProvided.droppableProps}
                >
                  {children}
                  {innerProvided.placeholder}
                </Box>
              )}
            </Droppable>
          </Collapse>
        </Box>
      ))}
    </Draggable>
  );
};

export default hot(module)(NoteFolderItem);
