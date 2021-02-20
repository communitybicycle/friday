import { Flex, Input } from "@chakra-ui/core";
import ActionCard from "components/ActionCard";
import PageHeader from "components/PageHeader";
import React, { useMemo, useState } from "react";
import { hot } from "react-hot-loader";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { RootState } from "reducers/store";

const Actions: React.FC = () => {
  const history = useHistory();
  const { actions } = useSelector((state: RootState) => state.data);
  const [search, setSearch] = useState("");

  const filteredActions = useMemo(() => {
    return Object.values(actions).filter((action) => {
      const q = search.toLowerCase();

      const name = action.name.toLowerCase();
      const desc = action.description ? action.description.toLowerCase() : "";

      return name.includes(q) || desc.includes(q);
    });
  }, [search]);

  return (
    <div>
      <PageHeader
        id="actions"
        text="Actions"
        buttonAction={() => history.push("/actions/new")}
        buttonText="Add New"
        isDisabled
      />
      <Input
        value={search}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setSearch(e.target.value)
        }
        placeholder="Search actions..."
        mb={4}
      />
      <Flex flexWrap="wrap">
        {filteredActions
          .sort((a, b) => (a.name && b.name && a.name > b.name ? 1 : -1))
          .map((action) => (
            <ActionCard action={action} key={action.id} />
          ))}
      </Flex>
    </div>
  );
};

export default hot(module)(Actions);
