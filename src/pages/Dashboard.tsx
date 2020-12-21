import React from "react";
import { hot } from "react-hot-loader";
import { Box, Grid, Image, PseudoBox } from "@chakra-ui/core";
import PageHeader from "../components/PageHeader";
import { useSelector } from "react-redux";
import Module from "../components/Module";
import { RootState } from "../reducers/store";
import { DEFAULT_IMAGE_URL } from "../data/constants";
import { useHistory } from "react-router";
import EditModuleModal from "../components/EditModuleModal";

const Dashboard: React.FC = () => {
  const history = useHistory();
  const {
    pages: { dashboard },
    modules,
  } = useSelector((state: RootState) => state.data);

  const editPage = () => {
    history.push("/dashboard/edit");
  };

  return (
    <Box>
      <Box>
        <Image
          height="300px"
          width="100%"
          objectFit="cover"
          src={DEFAULT_IMAGE_URL}
          alt=""
        />
      </Box>
      <Box px="50px" mt="20px">
        <PageHeader id="dashboard" text="Welcome, Hal!" pageAction={editPage} />
        <Grid
          templateColumns={`repeat(${dashboard.columns.length}, 1fr)`}
          gap={4}
        >
          {dashboard.columns.map((column: any, index: number) => (
            <Box key={index}>
              {column.map((moduleId: string, index: number) => (
                <Module module={modules[moduleId]} key={index} />
              ))}
            </Box>
          ))}
        </Grid>
      </Box>
      <EditModuleModal />
    </Box>
  );
};

export default hot(module)(Dashboard);
