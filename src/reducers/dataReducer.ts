import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialData } from "../data/initial";
import { Action } from "../types";

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
    removeAction: (state, { payload }: PayloadAction<string>) => {
      delete state.actions[payload];
    },
    editAction: (state, { payload }: PayloadAction<Action>) => {
      state.actions[payload.id] = payload;
    },
  },
});

export const { addAction, editAction, removeAction } = dataSlice.actions;

export default dataSlice.reducer;
