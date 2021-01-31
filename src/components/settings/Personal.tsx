import { Switch, useColorMode } from "@chakra-ui/core";
import React, { Fragment } from "react";
import { hot } from "react-hot-loader";
import { eStore } from "../../utils/eStore";
import Item from "./Item";

const PersonalSettings: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  const handleColorModeChange = () => {
    eStore.set("colorMode", colorMode === "light" ? "dark" : "light");
    toggleColorMode();
  };

  return (
    <Fragment>
      <Item
        name="Dark Mode"
        description="Switches the application between light mode and dark mode."
      >
        <Switch
          isChecked={colorMode === "dark"}
          onChange={handleColorModeChange}
        />
      </Item>
    </Fragment>
  );
};

export default hot(module)(PersonalSettings);
