import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialData } from "../data/initial";
import { Action } from "../types";
import { ModulesType } from "../types/modules";

const dataSlice = createSlice({
  name: "data",
  initialState: {
    actions: initialData.actions,
    pages: initialData.pages,
    modules: initialData.modules,
  },
  reducers: {
    addAction: (state, { payload }: PayloadAction<Action>) => {
      state.actions[payload.id] = payload;
    },
    deleteAction: (state, { payload: id }: PayloadAction<string>) => {
      delete state.actions[id];
    },
    editAction: (state, { payload }: PayloadAction<Action>) => {
      state.actions[payload.id] = payload;
    },
    addModule: (state, { payload }: PayloadAction<ModulesType>) => {
      state.modules[payload.id] = payload;
    },
    editModule: (state, { payload }: PayloadAction<ModulesType>) => {
      state.modules[payload.id] = payload;
    },
    deleteModule: (state, { payload: id }: PayloadAction<string>) => {
      delete state.modules[id];
    },
  },
});

export const {
  addAction,
  editAction,
  deleteAction,
  addModule,
  editModule,
  deleteModule,
} = dataSlice.actions;

export default dataSlice.reducer;
