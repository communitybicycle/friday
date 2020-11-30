import React, { FunctionComponent } from "react";
import PageHeader from "../../components/PageHeader";
import { Button } from "@chakra-ui/core";
import { useHistory } from "react-router";

const Automations: FunctionComponent = () => {
  const history = useHistory();
  return (
    <div>
      <PageHeader id="automations" text="Automations" />
      <Button
        variantColor="blue"
        onClick={() => history.push("/automations/new")}
      >
        Add New
      </Button>
    </div>
  );
};

export default Automations;
