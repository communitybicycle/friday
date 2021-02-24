import { Box, Heading } from "@chakra-ui/core";
import Center from "components/layout/Center";
import React, { Fragment } from "react";
import { Draggable } from "react-beautiful-dnd";
import { hot } from "react-hot-loader";
import { ModuleTypes } from "types/modules";

interface Props {
  type: ModuleTypes;
  index: number;
}

const ModuleCard: React.FC<Props> = ({ type, index }) => {
  return (
    <Draggable draggableId={type} index={index}>
      {(provided, snapshot) => (
        <Fragment>
          <Box
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            borderRadius="8px"
            maxW={240}
            w={240}
            h={100}
            minH={100}
            p="16px"
            borderWidth={1}
            mr={4}
          >
            <Center alignItems="center" height="100%">
              <Heading
                size="lg"
                fontWeight="bold"
                textTransform="capitalize"
                textAlign="center"
              >
                {type} Module
              </Heading>
            </Center>
          </Box>
          {snapshot.isDragging && (
            <Box
              borderRadius="8px"
              maxW={240}
              w={240}
              h={100}
              minH={100}
              p="16px"
              borderWidth={1}
              mr={4}
              transform="none"
            >
              <Center alignItems="center" height="100%">
                <Heading
                  size="lg"
                  fontWeight="bold"
                  textTransform="capitalize"
                  textAlign="center"
                >
                  {type} Module
                </Heading>
              </Center>
            </Box>
          )}
        </Fragment>
      )}
    </Draggable>
  );
};

export default hot(module)(ModuleCard);
