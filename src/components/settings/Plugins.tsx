import { Switch } from "@chakra-ui/core";
import Item from "components/settings/Item";
import React, { Fragment } from "react";
import { hot } from "react-hot-loader";

const PluginsSettings: React.FC = () => {
  return (
    <Fragment>
      <Item
        name="Calendar"
        description="The calendar plugin allows you to view your own calendars."
      >
        <Switch isDisabled={true} />
      </Item>
    </Fragment>
  );
};

export default hot(module)(PluginsSettings);
