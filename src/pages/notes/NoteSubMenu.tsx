import {
  Box,
  Button,
  Flex,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  useColorMode,
} from "@chakra-ui/core";
import Container from "components/layout/Container";
import NoteFolderItem from "components/NoteFolderItem";
import NoteNavItem from "components/NoteNavItem";
import {
  NAVBAR_BORDER_COLOR,
  NAVBAR_WIDTH,
  WINDOW_BAR_HEIGHT,
} from "data/constants";
import _ from "lodash";
import React, { ReactNode } from "react";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import Scrollbars from "react-custom-scrollbars";
import { hot } from "react-hot-loader";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { addFolder, addNote, reorderNoteMenu } from "reducers/dataReducer";
import { RootState } from "reducers/store";
import { NoteOrFolderMenuItem } from "types/page";
import { reorderNotes, uuid } from "utils/index";

const NoteSubMenu: React.FC = ({ children }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { colorMode } = useColorMode();
  const isLight = colorMode === "light";
  const { notes, noteMenu } = useSelector((state: RootState) => state.data);

  const handleNewNote = () => {
    const id = uuid();
    dispatch(addNote({ id }));

    history.push("/notes/" + id);
  };

  const handleNewFolder = () => {
    const id = uuid();
    dispatch(addFolder(id));
  };

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
      <Flex
        height={`calc(100vh - ${WINDOW_BAR_HEIGHT}px)`}
        position="relative"
        overflow="hidden"
      >
        <Box
          bg={isLight ? "gray.100" : "#232a38"}
          minWidth={`${NAVBAR_WIDTH}px`}
          maxWidth={`${NAVBAR_WIDTH}px`}
          height={`calc(100vh - ${WINDOW_BAR_HEIGHT}px)`}
          px="20px"
          pt="56px"
          // boxShadow="7px 0 16px -6px rgba(0, 0, 0, 0.16)"
          borderRight={
            isLight ? "1px solid #ececec" : `1px solid ${NAVBAR_BORDER_COLOR}`
          }
          // position="fixed"
          // top={`${WINDOW_BAR_HEIGHT}px`}
        >
          <Flex justify="space-between" align="center" mb={4}>
            <Box flex={1}>
              <Button
                variant="link"
                display="inline"
                fontSize="1.625rem"
                fontWeight="bold"
                color={isLight ? "black" : "white"}
                onClick={() => history.push("/notes")}
                cursor="pointer"
              >
                Notes
              </Button>
            </Box>
            <Popover>
              <PopoverTrigger>
                <IconButton
                  aria-label="Add new note or folder"
                  icon="add"
                  variant="ghost"
                  borderRadius={100}
                  fontSize="14px"
                  _hover={{
                    backgroundColor: isLight ? "white" : "gray.600",
                  }}
                />
              </PopoverTrigger>
              <PopoverContent w={192} zIndex={4}>
                <PopoverArrow />
                <PopoverHeader>Add a note or a folder</PopoverHeader>
                <PopoverBody d="flex" justifyContent="space-between">
                  <Button variantColor="blue" onClick={handleNewNote}>
                    Note
                  </Button>
                  <Button variantColor="blue" onClick={handleNewFolder}>
                    Folder
                  </Button>
                </PopoverBody>
              </PopoverContent>
            </Popover>
          </Flex>
          <Droppable droppableId="root">
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
        <Scrollbars height="100%" width="100%">
          <Box pt="50px" px="50px" flex={1} pl={NAVBAR_WIDTH}>
            <Container>{children}</Container>
          </Box>
        </Scrollbars>
      </Flex>
    </DragDropContext>
  );
};

export default hot(module)(NoteSubMenu);
