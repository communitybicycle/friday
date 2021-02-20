import { Box, Grid } from "@chakra-ui/core";
import React from "react";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { hot } from "react-hot-loader";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { useParams } from "react-router-dom";
import EditModuleModal from "components/EditModuleModal";
import FeatureImage from "components/FeatureImage";
import Module from "components/Module";
import PageHeader from "components/PageHeader";
import { setColumns } from "reducers/dataReducer";
import { RootState } from "reducers/store";
import { uuid } from "utils/index";
import { move, reorder } from "utils/dnd";

const Dashboard: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams<{ id: string }>();
  const {
    pages: { dashboards },
    modules,
  } = useSelector((state: RootState) => state.data);
  const dashboard = dashboards[id];

  const editPage = () => {
    history.push("/dashboard/edit");
  };

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

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
      <FeatureImage imgSrc={dashboard.featureImage} id={id} />
      <Box px="50px" mt="20px">
        <PageHeader id="dashboard" text="Welcome, Hal!" pageAction={editPage} />
        <DragDropContext onDragEnd={onDragEnd}>
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
        </DragDropContext>
      </Box>
      <EditModuleModal />
    </Box>
  );
};

export default hot(module)(Dashboard);
