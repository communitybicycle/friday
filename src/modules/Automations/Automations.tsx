import React from "react";
import { hot } from "react-hot-loader";
import { Box, Button } from "@chakra-ui/core";
import { useSelector } from "react-redux";
import { RootState } from "../../reducers/store";
import { AutomationModule } from "../../types/modules";
import { automate } from "../../utils/automations";

interface Props {
  module: AutomationModule;
}

const Automations: React.FC<Props> = ({ module }) => {
  const { instructions, actions } = useSelector(
    (state: RootState) => state.data
  );

  return (
    <div>
      {module.automations.map((automation, index: number) => (
        <Box key={index}>
          <Button
            variantColor="blue"
            // TODO
            // Need to identify type and automate accordingly
            // onClick={() => automate(automation.automations)}
          >
            {automation.type === "action"
              ? actions[automation.automationId].name
              : instructions[automation.automationId].name}
          </Button>
        </Box>
      ))}
    </div>
  );
};

export default hot(module)(Automations);
