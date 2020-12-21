import React from "react";
import { hot } from "react-hot-loader";
import { Box, Button } from "@chakra-ui/core";
import { automate } from "../../utils/actions";

interface Props {
  module: any;
}

const Automations: React.FC<Props> = ({ module }) => {
  return (
    <div>
      {module.automations.map((automation: any, index: number) => (
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
