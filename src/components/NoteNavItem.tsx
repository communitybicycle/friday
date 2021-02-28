import { PseudoBox, Text, useColorMode } from "@chakra-ui/core";
import { useDraggableInPortal } from "hooks/index";
import React from "react";
import { Draggable, DraggableProvided } from "react-beautiful-dnd";
import { hot } from "react-hot-loader";
import { useHistory } from "react-router";

interface Props {
  to: string;
  text: string;
  id: string;
  index: number;
}

const NoteNavItem: React.FC<Props> = ({ to, id, index, text }) => {
  const { colorMode } = useColorMode();
  const renderDraggable = useDraggableInPortal();
  const history = useHistory();
  const isLightMode = colorMode === "light";

  const handleClick = () => {
    if (history.location.pathname !== to) {
      history.push(to);
    }
  };

  return (
    <Draggable draggableId={id} index={index}>
      {renderDraggable((provided: DraggableProvided) => (
        <PseudoBox
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          display="flex"
          alignItems="center"
          color={isLightMode ? "gray.800" : "white"}
          fontSize="lg"
          lineHeight="1.85"
          height="34px"
          _hover={{
            backgroundColor: isLightMode ? "white" : "gray.600",
          }}
          borderRadius={4}
          cursor="pointer"
          onClick={handleClick}
          px={2}
          mb={1}
        >
          <Text fontWeight={isLightMode ? 400 : 300} isTruncated>
            {text}
          </Text>
        </PseudoBox>
      ))}
    </Draggable>
  );
};

export default hot(module)(NoteNavItem);
