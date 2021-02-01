import React from "react";
import { hot } from "react-hot-loader";
import { Box, Grid } from "@chakra-ui/core";
import FeatureImage from "../components/FeatureImage";
import PageHeader from "../components/PageHeader";
import { useDispatch, useSelector } from "react-redux";
import Module from "../components/Module";
import { RootState } from "../reducers/store";
import { useHistory } from "react-router";
import EditModuleModal from "../components/EditModuleModal";
import { useParams } from "react-router-dom";
import {
  DragDropContext,
  DraggableLocation,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import { setColumns } from "../reducers/dataReducer";
import { uuid } from "../utils";

const reorder = (list: any[], startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const move = (
  source: any[],
  destination: any[],
  droppableSource: DraggableLocation,
  droppableDestination: DraggableLocation
) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result: any = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};

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
                {(provided, snapshot) => (
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
