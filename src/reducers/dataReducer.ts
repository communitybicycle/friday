import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialData } from "data/initial";
import { DataState } from "types/index";
import { Instruction } from "types/instructions";
import { ModulesType } from "types/modules";
import { Action } from "types/action";
import { Columns, PageType } from "types/page";
import { eStore } from "utils/eStore";

const dataSlice = createSlice({
  name: "data",
  initialState: (eStore.get("data") as DataState) || initialData,
  reducers: {
    addAction: (state, { payload }: PayloadAction<Action>) => {
      state.actions[payload.id] = payload;
    },
    deleteAction: (state, { payload: id }: PayloadAction<string>) => {
      delete state.actions[id];
      Object.keys(state.instructions).forEach((instructionId) => {
        const instructions = state.instructions[instructionId].instructions;
        state.instructions[instructionId].instructions = instructions.filter(
          (actionId) => actionId !== id
        );
      });
    },
    editAction: (state, { payload }: PayloadAction<Action>) => {
      state.actions[payload.id] = payload;
    },
    addInstruction: (state, { payload }: PayloadAction<Instruction>) => {
      state.instructions[payload.id] = payload;
    },
    deleteInstruction: (state, { payload: id }: PayloadAction<string>) => {
      delete state.instructions[id];
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
      state.pages.dashboards[payload.id].columns = payload.columns;
    },
    reinitializeDataReducer: (
      _,
      { payload }: PayloadAction<DataState | undefined>
    ) => {
      return payload || initialData;
    },
    updateFeatureImage: (
      state,
      { payload }: PayloadAction<{ imgSrc: string; id: string; type: PageType }>
    ) => {
      state.pages[payload.type][payload.id].featureImage = payload.imgSrc;
    },
    setNoteContent: (
      state,
      { payload }: PayloadAction<{ id: string; content: string }>
    ) => {
      state.pages.notes[payload.id].content = payload.content;
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
  reinitializeDataReducer,
  updateFeatureImage,
  setNoteContent,
} = dataSlice.actions;

export default dataSlice.reducer;
