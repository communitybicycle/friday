import { Switch } from "@chakra-ui/core";
import Item from "components/settings/Item";
import React, { Fragment } from "react";
import { hot } from "react-hot-loader";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleCalendarPlugin,
  toggleNotesPlugin,
  toggleTerminalPlugin,
} from "reducers/settingReducer";
import { RootState } from "reducers/store";
import { Plugins } from "types/index";

const PluginsSettings: React.FC = () => {
  const dispatch = useDispatch();
  const { settings } = useSelector((state: RootState) => state);

  const togglePlugin = (target: Plugins) => {
    switch (target) {
      case "calendar":
        return dispatch(toggleCalendarPlugin());
      case "terminal":
        return dispatch(toggleTerminalPlugin());
      case "notes":
        return dispatch(toggleNotesPlugin());
      default:
        break;
    }
  };

  return (
    <Fragment>
      <Item
        name="Notes"
        description="Write notes down, create journal entries, and more!"
      >
        <Switch
          isChecked={settings.notesPlugin}
          value={settings.notesPlugin}
          onChange={() => togglePlugin("notes")}
        />
      </Item>
      <Item
        name="Calendar"
        description="The calendar plugin allows you to view your own calendars."
      >
        <Switch
          isChecked={settings.calendarPlugin}
          value={settings.notesPlugin}
          onChange={() => togglePlugin("calendar")}
        />
      </Item>
      <Item
        name="Terminal"
        description="The terminal plugin is still under development."
      >
        <Switch
          isChecked={settings.terminalPlugin}
          value={settings.notesPlugin}
          onChange={() => togglePlugin("terminal")}
        />
      </Item>
    </Fragment>
  );
};

export default hot(module)(PluginsSettings);
