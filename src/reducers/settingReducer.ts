import { createSlice } from "@reduxjs/toolkit";
import { eStore } from "utils/eStore";

interface SettingsState {
  terminalPlugin: boolean;
  calendarPlugin: boolean;
  notesPlugin: boolean;
}

const initialSettings: SettingsState = {
  terminalPlugin: false,
  calendarPlugin: false,
  notesPlugin: true,
};

const settingSlice = createSlice({
  name: "setting",
  initialState: (eStore.get("settings") as SettingsState) || initialSettings,
  reducers: {
    toggleTerminalPlugin: (state) => {
      state.terminalPlugin = !state.terminalPlugin;
    },
    toggleCalendarPlugin: (state) => {
      state.calendarPlugin = !state.calendarPlugin;
    },
    toggleNotesPlugin: (state) => {
      state.notesPlugin = !state.notesPlugin;
    },
    reinitializeSettingsReducer: () => {
      return initialSettings;
    },
  },
});

export const {
  reinitializeSettingsReducer,
  toggleTerminalPlugin,
  toggleCalendarPlugin,
  toggleNotesPlugin,
} = settingSlice.actions;

export default settingSlice.reducer;
