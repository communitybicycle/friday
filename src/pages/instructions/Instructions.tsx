import { Flex } from "@chakra-ui/core";
import InstructionCard from "components/card/InstructionCard";
import PageHeader from "components/page/PageHeader";
import React from "react";
import { hot } from "react-hot-loader";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { RootState } from "reducers/store";

const Instructions: React.FC = () => {
  const history = useHistory();
  const { instructions } = useSelector((state: RootState) => state.data);

  return (
    <div>
      <PageHeader
        id="instructions"
        text="Instructions"
        buttonAction={() => history.push("/instructions/new")}
        buttonText="Add New"
        isDisabled
      />
      <Flex flexWrap="wrap">
        {Object.values(instructions).map((instruction) => (
          <InstructionCard instruction={instruction} key={instruction.id} />
        ))}
      </Flex>
    </div>
  );
};

export default hot(module)(Instructions);
