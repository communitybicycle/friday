import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialData } from "../data/initial";
import { Instruction } from "../types/instructions";
import { ModulesType } from "../types/modules";
import { Action } from "../types/action";
import { Columns } from "../types/page";

const dataSlice = createSlice({
  name: "data",
  initialState: {
    actions: initialData.actions,
    instructions: initialData.instructions,
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
    addInstruction: (state, { payload }: PayloadAction<Instruction>) => {
      state.instructions[payload.id] = payload;
    },
    deleteInstruction: (state, { payload: id }: PayloadAction<string>) => {
      delete state.actions[id];
    },
    editInstruction: (state, { payload }: PayloadAction<Instruction>) => {
      state.instructions[payload.id] = payload;
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
    setColumns: (
      state,
      { payload }: PayloadAction<{ id: string; columns: Columns }>
    ) => {
      const pageIndex = state.pages.dashboards.findIndex(
        (dashboard) => dashboard.id === payload.id
      );
      state.pages.dashboards[pageIndex].columns = payload.columns;
    },
  },
});

export const {
  addAction,
  editAction,
  deleteAction,
  addInstruction,
  editInstruction,
  deleteInstruction,
  addModule,
  editModule,
  deleteModule,
  setColumns,
} = dataSlice.actions;

export default dataSlice.reducer;
