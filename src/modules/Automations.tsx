import React from "react";
import { hot } from "react-hot-loader";
import { Box, Button } from "@chakra-ui/core";
import { automate } from "../utils/actions";

interface Props {
  data: any;
}

const Automations: React.FC<Props> = ({ data }) => {
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

export default hot(module)(Automations);
