import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  PseudoBox,
  useColorMode,
} from "@chakra-ui/core";
import ModuleCard from "components/card/ModuleCard";
import EditModuleModal from "components/EditModuleModal";
import FeatureImage from "components/FeatureImage";
import Module from "components/Module";
import PageHeader from "components/page/PageHeader";
import { BG_COLOR } from "data/constants";
import React, { useState } from "react";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { hot } from "react-hot-loader";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addModule, setColumns } from "reducers/dataReducer";
import { RootState } from "reducers/store";
import { ModuleTypes } from "types/modules";
import { move, reorder } from "utils/dnd";
import { uuid } from "utils/index";
import { createModule } from "utils/module";

const moduleCards: ModuleTypes[] = ["text", "notes", "automations"];

const Dashboard: React.FC = () => {
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  const { colorMode } = useColorMode();
  const { dashboards, modules } = useSelector((state: RootState) => state.data);
  const [isEditing, setIsEditing] = useState(false);
  const dashboard = dashboards[id];

  const editPage = () => {
    setIsEditing(true);
  };

  const onDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result;

    if (!destination || !dashboard) {
      return;
    }

    const start = source.droppableId;
    const finish = destination.droppableId;

    if (start === finish) {
      // same column
      if (start === "new-modules") return;
      const columnIndex = parseInt(start);
      const items = reorder(
        dashboard.columns[columnIndex],
        source.index,
        destination.index
      );

      const newColumns = [...dashboard.columns];
      newColumns[columnIndex] = items;

      dispatch(setColumns({ id, columns: newColumns }));
    } else if (start === "new-modules") {
      const destinationColumnIndex = parseInt(finish);

      const newColumns = [...dashboard.columns];
      const newColumn = Array.from(newColumns[destinationColumnIndex]);

      const newModule = createModule(draggableId as ModuleTypes, id);

      if (newModule) {
        dispatch(addModule(newModule));

        newColumn.splice(destination.index, 0, newModule.id);
        newColumns[destinationColumnIndex] = newColumn;

        dispatch(setColumns({ id, columns: newColumns }));
      }
    } else {
      const sourceColumnIndex = parseInt(start);
      const destinationColumnIndex = parseInt(finish);
      const result = move(
        dashboard.columns[sourceColumnIndex],
        dashboard.columns[destinationColumnIndex],
        source,
        destination
      );

      const newColumns = [...dashboard.columns];
      newColumns[sourceColumnIndex] = result[sourceColumnIndex];
      newColumns[destinationColumnIndex] = result[destinationColumnIndex];

      dispatch(setColumns({ id, columns: newColumns }));
    }
  };

  if (!dashboard) return <></>;

  return (
    <Box>
      <DragDropContext onDragEnd={onDragEnd}>
        {isEditing && (
          <PseudoBox
            borderRadius={4}
            width="60vw"
            position="fixed"
            top="16px"
            right="20vw"
            p="16px"
            zIndex={100}
            boxShadow="rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"
            bg={BG_COLOR[colorMode]}
          >
            <Heading size="sm" mb={4}>
              Drag and drop your new modules!
            </Heading>
            <Flex justify="space-between" flex={1}>
              <Droppable
                droppableId="new-modules"
                direction="horizontal"
                isDropDisabled={true}
              >
                {(provided) => (
                  <Flex ref={provided.innerRef}>
                    {moduleCards.map((type, index) => (
                      <ModuleCard type={type} index={index} key={type} />
                    ))}
                    {provided.placeholder}
                  </Flex>
                )}
              </Droppable>

              <Flex flex={1} justifyContent="flex-end" align="flex-end">
                <Button variantColor="blue" onClick={() => setIsEditing(false)}>
                  Close
                </Button>
              </Flex>
            </Flex>
          </PseudoBox>
        )}
        <FeatureImage imgSrc={dashboard.featureImage} id={id} />
        <Box px="50px" mt="20px">
          <PageHeader
            type="dashboards"
            id={dashboard.id}
            pageAction={editPage}
          />
          <Grid
            templateColumns={`repeat(${dashboard.columns.length}, 1fr)`}
            gap={8}
          >
            {dashboard.columns.map((column: any, index: number) => (
              <Droppable droppableId={index.toString()} key={uuid()}>
                {(provided) => (
                  <Box ref={provided.innerRef} {...provided.droppableProps}>
                    {column.map((moduleId: string, index: number) => (
                      <Module
                        module={modules[moduleId]}
                        index={index}
                        key={moduleId}
                      />
                    ))}
                    {provided.placeholder}
                  </Box>
                )}
              </Droppable>
            ))}
          </Grid>
        </Box>
      </DragDropContext>
      <EditModuleModal />
    </Box>
  );
};

export default hot(module)(Dashboard);
