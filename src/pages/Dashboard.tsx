import React from "react";
import { Box, Grid, Image } from "@chakra-ui/core";
import PageHeader from "../components/PageHeader";
import { useSelector } from "react-redux";
import Module from "../components/Module";
import { RootState } from "../reducers/store";
import { DEFAULT_IMAGE_URL } from "../data/constants";

const Dashboard: React.FC = () => {
  const {
    pages: { dashboard },
    modules,
  } = useSelector((state: RootState) => state.data);

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
        <PageHeader id="dashboard" text="Welcome, Hal!" />
        <Grid
          templateColumns={`repeat(${dashboard.columns.length}, 1fr)`}
          gap={4}
        >
          {dashboard.columns.map((column: any, index: number) => (
            <Box key={index}>
              {column.map((moduleId: string, index: number) => (
                <Module data={modules[moduleId]} key={index} />
              ))}
            </Box>
          ))}
        </Grid>
        asdfasdf
      </Box>
    </Box>
  );
};

export default Dashboard;
