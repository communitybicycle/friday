import { Box, Flex, Heading, useColorMode } from "@chakra-ui/core";
import Container from "components/layout/Container";
import NoteFolderItem from "components/NoteFolderItem";
import NoteNavItem from "components/NoteNavItem";
import {
  NAVBAR_BORDER_COLOR,
  NAVBAR_WIDTH,
  WINDOW_BAR_HEIGHT,
} from "data/constants";
import React, { ReactNode } from "react";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { hot } from "react-hot-loader";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { reorderNoteMenu } from "reducers/dataReducer";
import { RootState } from "reducers/store";
import { NoteOrFolderMenuItem } from "types/page";
import { reorderNotes } from "utils/index";
import _ from "lodash";

const NoteSubMenu: React.FC = ({ children }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { colorMode } = useColorMode();
  const { notes, noteMenu } = useSelector((state: RootState) => state.data);

  const renderMenu = (menu: NoteOrFolderMenuItem[]): ReactNode => {
    let index = 0;

    return menu.map((item) => {
      if (item.type === "note") {
        return (
          <NoteNavItem
            to={`/notes/${item.id}`}
            key={item.id}
            text={notes[item.id].title}
            index={index++}
            id={item.id}
          />
        );
      } else {
        return (
          <NoteFolderItem
            key={item.id}
            text={item.title}
            index={index++}
            id={item.id}
          >
            {item.subItems &&
              item.subItems.length > 0 &&
              renderMenu(item.subItems)}
          </NoteFolderItem>
        );
      }
    });
  };

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    console.log("Source:", source);
    console.log("Destination:", destination);

    const newMenu = reorderNotes(
      _.cloneDeep(noteMenu),
      source.droppableId,
      destination.droppableId,
      source.index,
      destination.index
    );

    dispatch(reorderNoteMenu(newMenu));
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Flex>
        <Box
          bg={colorMode === "light" ? "gray.100" : "#232a38"}
          minWidth={`${NAVBAR_WIDTH}px`}
          maxWidth={`${NAVBAR_WIDTH}px`}
          height={`calc(100vh - ${WINDOW_BAR_HEIGHT}px)`}
          px="20px"
          pt="56px"
          // boxShadow="7px 0 16px -6px rgba(0, 0, 0, 0.16)"
          borderRight={
            colorMode === "light"
              ? "1px solid #ececec"
              : `1px solid ${NAVBAR_BORDER_COLOR}`
          }
        >
          <Heading
            size="lg"
            onClick={() => history.push("/notes")}
            cursor="pointer"
            mb={2}
          >
            Notes
          </Heading>
          <Droppable droppableId="notes">
            {(provided) => (
              <Box
                {...provided.droppableProps}
                ref={provided.innerRef}
                h="100%"
              >
                {renderMenu(noteMenu)}
                {provided.placeholder}
              </Box>
            )}
          </Droppable>
        </Box>
        <Box pt="50px" px="50px" flex={1}>
          <Container>{children}</Container>
        </Box>
      </Flex>
    </DragDropContext>
  );
};

export default hot(module)(NoteSubMenu);
