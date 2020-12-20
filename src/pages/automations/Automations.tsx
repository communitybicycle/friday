import React, { FunctionComponent } from "react";
import PageHeader from "../../components/PageHeader";
import { Flex } from "@chakra-ui/core";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";
import { RootState } from "../../reducers/store";
import ActionCard from "../../components/ActionCard";

const Automations: FunctionComponent = () => {
  const history = useHistory();
  const { actions } = useSelector((state: RootState) => state.data);

  return (
    <div>
      <PageHeader
        id="automations"
        text="Automations"
        buttonAction={() => history.push("/automations/new")}
        buttonText="Add New"
      />
      <Flex flexWrap="wrap">
        {Object.values(actions).map((action) => (
          <ActionCard action={action} key={action.id} />
        ))}
      </Flex>
    </div>
  );
};

export default Automations;
