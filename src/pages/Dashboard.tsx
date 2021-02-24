import { Box, Grid, PseudoBox, useColorMode } from "@chakra-ui/core";
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

const Dashboard: React.FC = () => {
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  const { colorMode } = useColorMode();
  const {
    pages: { dashboards },
    modules,
  } = useSelector((state: RootState) => state.data);
  const [isEditing, setIsEditing] = useState(true);
  const dashboard = dashboards[id];

  const editPage = () => {
    setIsEditing(true);
  };

  const onDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result;

    console.log("Result:", result);
    console.log("Source:", source);
    console.log("Destination:", destination);

    if (!destination || !dashboard) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      // same column
      const columnIndex = parseInt(source.droppableId);
      const items = reorder(
        dashboard.columns[columnIndex],
        source.index,
        destination.index
      );

      const newColumns = [...dashboard.columns];
      newColumns[columnIndex] = items;

      dispatch(setColumns({ id, columns: newColumns }));
    } else if (source.droppableId === "new-modules") {
      const destinationColumnIndex = parseInt(destination.droppableId);

      const newColumns = [...dashboard.columns];
      const newColumn = Array.from(newColumns[destinationColumnIndex]);

      const newModule = createModule(draggableId as ModuleTypes);

      if (newModule) {
        dispatch(addModule(newModule));

        newColumn.splice(destination.index, 0, newModule.id);
        newColumns[destinationColumnIndex] = newColumn;

        dispatch(setColumns({ id, columns: newColumns }));
      }
    } else {
      const sourceColumnIndex = parseInt(source.droppableId);
      const destinationColumnIndex = parseInt(destination.droppableId);
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
          <Droppable droppableId="new-modules" isDropDisabled={true}>
            {(provided) => (
              <PseudoBox
                ref={provided.innerRef}
                borderRadius={4}
                width="90vw"
                position="fixed"
                top="60px"
                right="5vw"
                p="16px"
                zIndex={100}
                boxShadow="rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"
                bg={BG_COLOR[colorMode]}
                d="flex"
              >
                <ModuleCard type="text" index={0} />
                <ModuleCard type="notes" index={1} />
                {provided.placeholder}
              </PseudoBox>
            )}
          </Droppable>
        )}
        <FeatureImage imgSrc={dashboard.featureImage} id={id} />
        <Box px="50px" mt="20px">
          <PageHeader
            id="dashboard"
            text="Welcome, Hal!"
            pageAction={editPage}
          />
          <Grid
            templateColumns={`repeat(${dashboard.columns.length}, 1fr)`}
            gap={4}
          >
            {dashboard.columns.map((column: any, index: number) => (
              <Droppable droppableId={index.toString()} key={uuid()}>
                {(provided) => (
                  <Box
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    // style={{
                    //   backgroundColor: snapshot.isDraggingOver
                    //     ? "#eaeaea"
                    //     : "fff",
                    // }}
                    // style={{ position: "static" }}
                  >
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
