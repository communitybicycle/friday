import { createSlice } from "@reduxjs/toolkit";
import { eStore } from "utils/eStore";

interface SettingsState {
  terminalPlugin: boolean;
  calendarPlugin: boolean;
}

const initialState: SettingsState = (eStore.get("user") as SettingsState) || {
  terminalPlugin: false,
  calendarPlugin: false,
};

const settingSlice = createSlice({
  name: "setting",
  initialState,
  reducers: {
    toggleTerminalPlugin: (state) => {
      state.terminalPlugin = !state.terminalPlugin;
    },
    toggleCalendarPlugin: (state) => {
      state.calendarPlugin = !state.calendarPlugin;
    },
  },
});

export const {
  toggleTerminalPlugin,
  toggleCalendarPlugin,
} = settingSlice.actions;

export default settingSlice.reducer;
