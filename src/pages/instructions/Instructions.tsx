import { Flex, useDisclosure } from "@chakra-ui/core";
import InstructionCard from "components/card/InstructionCard";
import PageHeader from "components/page/PageHeader";
import NewInstruction from "pages/instructions/NewInstruction";
import React from "react";
import { hot } from "react-hot-loader";
import { useSelector } from "react-redux";
import { RootState } from "reducers/store";

const Instructions: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { instructions } = useSelector((state: RootState) => state.data);

  return (
    <div>
      <PageHeader
        id="instructions"
        text="Instructions"
        buttonAction={onOpen}
        buttonText="Add New"
        isDisabled
      />
      <Flex flexWrap="wrap">
        {Object.values(instructions).map((instruction) => (
          <InstructionCard instruction={instruction} key={instruction.id} />
        ))}
      </Flex>
      <NewInstruction isOpen={isOpen} onClose={onClose} />
    </div>
  );
};

export default hot(module)(Instructions);
