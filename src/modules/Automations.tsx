import React, { FunctionComponent } from "react";
import { Box, Button } from "@chakra-ui/core";
import { automate } from "../utils/automations";

interface IProps {
  data: any;
}

const Automations: FunctionComponent<IProps> = ({ data }) => {
  return (
    <div>
      {data.automations.map((automation: any, index: number) => (
        <Box key={index}>
          <Button
            variantColor="blue"
            onClick={() => automate(automation.instructions)}
          >
            {automation.name}
          </Button>
        </Box>
      ))}
    </div>
  );
};

export default Automations;
