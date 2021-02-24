import { Box, Heading, useColorMode } from "@chakra-ui/core";
import Center from "components/layout/Center";
import { BG_COLOR } from "data/constants";
import { useDraggableInPortal } from "hooks/index";
import React from "react";
import { Draggable, DraggableProvided } from "react-beautiful-dnd";
import { hot } from "react-hot-loader";
import { ModuleTypes } from "types/modules";

interface Props {
  id: string;
  type: ModuleTypes;
  index: number;
}

const ModuleCard: React.FC<Props> = ({ id, type, index }) => {
  const renderDraggable = useDraggableInPortal();
  const { colorMode } = useColorMode();

  return (
    <Draggable draggableId={id} index={index}>
      {renderDraggable((provided: DraggableProvided) => (
        <Box position="static">
          <Box
            ref={provided.innerRef}
            borderRadius="8px"
            minW="160px"
            minH="56px"
            p="16px"
            borderWidth={1}
            bg={BG_COLOR[colorMode]}
            mr={4}
            {...provided.dragHandleProps}
            {...provided.draggableProps}
          >
            <Center alignItems="center" height="100%">
              <Heading
                size="md"
                fontWeight="bold"
                textTransform="capitalize"
                textAlign="center"
              >
                {type} Module
              </Heading>
            </Center>
          </Box>
        </Box>
      ))}
    </Draggable>
  );
};

export default hot(module)(ModuleCard);
