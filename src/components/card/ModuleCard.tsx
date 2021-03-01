import { Box, Heading, useColorMode } from "@chakra-ui/core";
import { BG_COLOR } from "data/constants";
import React from "react";
import { Draggable, DraggableProvided } from "react-beautiful-dnd";
import { hot } from "react-hot-loader";
import { ModuleTypes } from "types/modules";

interface Props {
  type: ModuleTypes;
  index: number;
}

const ModuleCard: React.FC<Props> = ({ type, index }) => {
  const { colorMode } = useColorMode();

  return (
    <Box position="relative">
      <Draggable draggableId={type} index={index}>
        {(provided: DraggableProvided) => {
          return (
            <Box
              ref={provided.innerRef}
              borderRadius="8px"
              p="16px"
              borderWidth={1}
              bg={BG_COLOR[colorMode]}
              mr={4}
              left="auto !important"
              top="auto !important"
              {...provided.dragHandleProps}
              {...provided.draggableProps}
            >
              <Heading
                size="md"
                fontWeight="bold"
                textTransform="capitalize"
                textAlign="center"
              >
                {type} Module
              </Heading>
            </Box>
          );
        }}
      </Draggable>
    </Box>
  );
};

export default hot(module)(ModuleCard);
