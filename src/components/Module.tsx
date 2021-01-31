import React, { CSSProperties, Fragment } from "react";
import { hot } from "react-hot-loader";
import {
  Divider,
  Flex,
  Heading,
  Icon,
  IconButton,
  PseudoBox,
} from "@chakra-ui/core";
import Text from "../modules/Text/Text";
import Notes from "../modules/Notes/Notes";
import Automations from "../modules/Automations/Automations";
import { ModulesType } from "../types/modules";
import { useDispatch } from "react-redux";
import {
  openEditModuleModal,
  setEditModuleModal,
} from "../reducers/metaReducer";
import {
  Draggable,
  DraggableProvided,
  DraggableStateSnapshot,
  DraggingStyle,
  NotDraggingStyle,
} from "react-beautiful-dnd";
import { useDraggableInPortal } from "../hooks";

interface Props {
  module: ModulesType;
  index: number;
}

const Module: React.FC<Props> = ({ module, index }) => {
  const dispatch = useDispatch();
  const renderDraggable = useDraggableInPortal();

  const handleOpen = () => {
    dispatch(setEditModuleModal(module));
    dispatch(openEditModuleModal());
  };

  const getItemStyle = (
    isDragging: boolean,
    draggableStyle: DraggingStyle | NotDraggingStyle | undefined
  ): CSSProperties => ({
    // some basic styles to make the items look a bit nicer
    // width: isDragging ? "400px" : "100%",
    // overflow: "visible",
    borderRadius: "8px",
    userSelect: "none",
    // border: isDragging ? "1px solid #efefef" : "none",
    maxWidth: isDragging ? "300px" : "3000px",
    minHeight: isDragging ? "100px" : "auto",
    padding: isDragging ? "16px" : "0",
    boxShadow: isDragging ? "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px" : "none",
    // change background colour if dragging
    // background: "#fff",

    // styles we need to apply on draggables
    ...draggableStyle,
  });

  const renderModule = () => {
    switch (module.type) {
      case "text":
        return <Text module={module} />;
      case "notes":
        return <Notes module={module} />;
      case "automations":
        return <Automations module={module} />;
      default:
        return;
    }
  };

  return (
    <Draggable draggableId={module.id} index={index}>
      {renderDraggable(
        (provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
          <Flex
            direction="column"
            mb={4}
            ref={provided.innerRef}
            {...provided.draggableProps}
            style={getItemStyle(
              snapshot.isDragging,
              provided.draggableProps.style
            )}
            width={snapshot.isDragging ? "300px" : "auto"}
          >
            {!module.hideHeader && (
              <Fragment>
                <PseudoBox
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  _hover={
                    {
                      "& > div": {
                        transform: "translate(0, 0)",
                      },
                      "& > div > div": {
                        opacity: 1,
                      },
                      "& > button#page-action": { opacity: 1 },
                    } as any
                  }
                >
                  <Flex
                    align="center"
                    transform="translate(-16px, 0)"
                    transition="all 0.16s linear"
                  >
                    <Flex
                      {...provided.dragHandleProps}
                      align="center"
                      px={2}
                      color="grey"
                      opacity={0}
                    >
                      <Icon name="drag-handle" />
                    </Flex>
                    <Heading fontSize="2xl">{module.header}</Heading>
                  </Flex>
                  <IconButton
                    id="page-action"
                    aria-label="edit module"
                    icon="settings"
                    onClick={handleOpen}
                    variantColor="ghostGray"
                    variant="ghost"
                    opacity={0}
                  />
                </PseudoBox>
                <Divider />
              </Fragment>
            )}
            {renderModule()}
          </Flex>
        )
      )}
    </Draggable>
  );
};

export default hot(module)(Module);
