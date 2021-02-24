import { Box, Heading, PseudoBox, useColorMode } from "@chakra-ui/core";
import Center from "components/layout/Center";
import { BG_COLOR } from "data/constants";
import React, { Fragment } from "react";
import { Draggable } from "react-beautiful-dnd";
import { hot } from "react-hot-loader";
import { ModuleTypes } from "types/modules";

interface Props {
  type: ModuleTypes;
  index: number;
}

const ModuleCard: React.FC<Props> = ({ type, index }) => {
  const { colorMode } = useColorMode();

  return (
    <Draggable draggableId={type} index={index}>
      {(provided, snapshot) => (
        <Fragment>
          <Box
            ref={provided.innerRef}
            borderRadius="8px"
            minW={240}
            minH={100}
            p="16px"
            borderWidth={1}
            bg={BG_COLOR[colorMode]}
            mr={4}
            {...provided.dragHandleProps}
            {...provided.draggableProps}
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
            <PseudoBox
              borderRadius="8px"
              minW={240}
              minH={100}
              p="16px"
              borderWidth={1}
              bg={BG_COLOR[colorMode]}
              mr={4}
              transform="none"
              style={{ "& + div": { display: "none !important" } } as any}
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
            </PseudoBox>
          )}
        </Fragment>
      )}
    </Draggable>
  );
};

export default hot(module)(ModuleCard);
