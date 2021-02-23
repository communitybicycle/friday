import { Box, Flex } from "@chakra-ui/core";
import ActionCard from "components/card/ActionCard";
import InstructionCard from "components/card/InstructionCard";
import React from "react";
import { hot } from "react-hot-loader";
import { useSelector } from "react-redux";
import { RootState } from "reducers/store";
import { AutomationModule } from "types/modules";

interface Props {
  module: AutomationModule;
}

const Automations: React.FC<Props> = ({ module }) => {
  const { instructions, actions } = useSelector(
    (state: RootState) => state.data
  );

  return (
    <Flex flexWrap="wrap">
      {module.automations.map((automation, index: number) => {
        const { automationId } = automation;

        return (
          <Box key={index}>
            {automation.type === "action" ? (
              <ActionCard action={actions[automationId]} readOnly />
            ) : (
              <InstructionCard
                instruction={instructions[automationId]}
                readOnly
              />
            )}
          </Box>
        );
      })}
    </Flex>
  );
};

export default hot(module)(Automations);
