import {
  Box,
  Button,
  Collapse,
  Flex,
  Icon,
  IconButton,
  Input,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  PseudoBox,
  Text,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/core";
import { DEFAULT_CHAKRA_TRANSITION } from "data/constants";
import React, { useRef, useState } from "react";
import { Draggable, DraggableProvided, Droppable } from "react-beautiful-dnd";
import { hot } from "react-hot-loader";
import { useSelector } from "react-redux";
import { setNoteMenu } from "reducers/dataReducer";
import { RootState, useAppDispatch } from "reducers/store";
import { alterNestedMenuItem } from "utils/index";

interface Props {
  text: string;
  id: string;
  index: number;
}

const NoteFolderItem: React.FC<Props> = ({ text, id, index, children }) => {
  const dispatch = useAppDispatch();
  const { isOpen, onToggle } = useDisclosure();
  const { colorMode } = useColorMode();
  const isLightMode = colorMode === "light";
  const { noteMenu } = useSelector((state: RootState) => state.data);
  const [newText, setNewText] = useState(text);
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggle();
  };

  const handleSubmit = () => {
    const newMenu = alterNestedMenuItem(id, noteMenu, (current) => {
      if (current.type === "folder") {
        current.title = newText;
      }
    });

    if (newMenu) {
      dispatch(setNoteMenu(newMenu));
    }

    setIsEditing(false);
  };

  return (
    <Draggable draggableId={id} index={index}>
      {(provided: DraggableProvided) => (
        <Box
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          left="auto !important"
          top="auto !important"
        >
          <PseudoBox
            display="flex"
            alignItems="center"
            color={isLightMode ? "gray.800" : "white"}
            fontSize="lg"
            lineHeight="1.85"
            height="34px"
            px={2}
            _hover={
              {
                backgroundColor: isLightMode ? "white" : "gray.600",
                "& > button": {
                  // visibility: "visible",
                  opacity: 1,
                },
              } as any
            }
            borderRadius={4}
            cursor="pointer"
            onClick={handleClick}
            transition={DEFAULT_CHAKRA_TRANSITION}
            mb={1}
          >
            <Icon name={isOpen ? "chevron-down" : "chevron-right"} mr={3} />
            <Text fontWeight={isLightMode ? 400 : 300} flex={1} isTruncated>
              {text}
            </Text>
            <Popover
              initialFocusRef={inputRef}
              isOpen={isEditing}
              onClose={() => setIsEditing(false)}
            >
              <PopoverTrigger>
                <IconButton
                  icon="settings"
                  variant="ghost"
                  variantColor="blue"
                  aria-label="Edit folder name"
                  opacity={0}
                  // visibility="hidden"
                  size="sm"
                  _hover={{
                    background: "none",
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsEditing(true);
                  }}
                />
              </PopoverTrigger>
              <PopoverContent
                zIndex={4}
                onClick={(e) => {
                  e.stopPropagation();
                }}
                cursor="default"
              >
                <PopoverArrow />
                <PopoverHeader>Change folder name</PopoverHeader>
                <PopoverBody>
                  <Flex>
                    <Input
                      ref={inputRef}
                      value={newText}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setNewText(e.target.value);
                      }}
                      mr={2}
                    />
                    <Button variantColor="blue" onClick={handleSubmit}>
                      Submit
                    </Button>
                  </Flex>
                </PopoverBody>
              </PopoverContent>
            </Popover>
          </PseudoBox>
          <Collapse isOpen={isOpen} ml="28px">
            <Droppable droppableId={id}>
              {(innerProvided) => (
                <Box
                  ref={innerProvided.innerRef}
                  {...innerProvided.droppableProps}
                  minH="10px"
                >
                  {children}
                  {innerProvided.placeholder}
                </Box>
              )}
            </Droppable>
          </Collapse>
        </Box>
      )}
    </Draggable>
  );
};

export default hot(module)(NoteFolderItem);
