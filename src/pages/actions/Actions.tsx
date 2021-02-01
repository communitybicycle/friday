import React from "react";
import { hot } from "react-hot-loader";
import PageHeader from "../../components/PageHeader";
import { Flex } from "@chakra-ui/core";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";
import { RootState } from "../../reducers/store";
import ActionCard from "../../components/ActionCard";

const Actions: React.FC = () => {
  const history = useHistory();
  const { actions } = useSelector((state: RootState) => state.data);

  return (
    <div>
      <PageHeader
        id="actions"
        text="Actions"
        buttonAction={() => history.push("/actions/new")}
        buttonText="Add New"
        isDisabled
      />
      <Flex flexWrap="wrap">
        {Object.values(actions)
          .sort((a, b) => (a.name && b.name && a.name > b.name ? 1 : -1))
          .map((action) => (
            <ActionCard action={action} key={action.id} />
          ))}
      </Flex>
    </div>
  );
};

export default hot(module)(Actions);
