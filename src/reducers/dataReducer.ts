import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialData } from "data/initial";
import moment from "moment";
import { Action } from "types/action";
import { DataState } from "types/index";
import { Instruction } from "types/instructions";
import { ModulesType } from "types/modules";
import { Columns, Note, NoteMenu, PageType } from "types/page";
import { eStore } from "utils/eStore";
import { deleteStringInNestedArray } from "utils/index";

const dataSlice = createSlice({
  name: "data",
  initialState: (eStore.get("data") as DataState) || initialData,
  reducers: {
    addAction: (state: DataState, { payload }: PayloadAction<Action>) => {
      state.actions[payload.id] = payload;
    },
    deleteAction: (
      state: DataState,
      { payload: id }: PayloadAction<string>
    ) => {
      delete state.actions[id];

      // delete any references ot action in an instruction
      Object.keys(state.instructions).forEach((instructionId) => {
        const instructions = state.instructions[instructionId].instructions;
        state.instructions[instructionId].instructions = instructions.filter(
          (actionId) => actionId !== id
        );
      });
    },
    editAction: (state: DataState, { payload }: PayloadAction<Action>) => {
      state.actions[payload.id] = payload;
    },
    addInstruction: (
      state: DataState,
      { payload }: PayloadAction<Instruction>
    ) => {
      state.instructions[payload.id] = payload;
    },
    deleteInstruction: (
      state: DataState,
      { payload: id }: PayloadAction<string>
    ) => {
      delete state.instructions[id];
    },
    editInstruction: (
      state: DataState,
      { payload }: PayloadAction<Instruction>
    ) => {
      state.instructions[payload.id] = payload;
    },
    addModule: (state: DataState, { payload }: PayloadAction<ModulesType>) => {
      state.modules[payload.id] = payload;
    },
    editModule: (state: DataState, { payload }: PayloadAction<ModulesType>) => {
      state.modules[payload.id] = payload;
    },
    deleteModule: (
      state: DataState,
      { payload }: PayloadAction<{ dashboardId: string; moduleId: string }>
    ) => {
      const { dashboardId, moduleId } = payload;
      delete state.modules[moduleId];

      // delete all references in the dashboard
      const dashboard = state.dashboards[dashboardId];

      state.dashboards[dashboardId].columns = deleteStringInNestedArray(
        dashboard.columns,
        moduleId
      );
    },
    setColumns: (
      state: DataState,
      { payload }: PayloadAction<{ id: string; columns: Columns }>
    ) => {
      state.dashboards[payload.id].columns = payload.columns;
    },
    reinitializeDataReducer: (
      _,
      { payload }: PayloadAction<DataState | undefined>
    ) => {
      return payload || initialData;
    },
    updateFeatureImage: (
      state: DataState,
      { payload }: PayloadAction<{ imgSrc: string; id: string; type: PageType }>
    ) => {
      state.dashboards[payload.id].featureImage = payload.imgSrc;
    },
    addNote: (state: DataState, { payload }: PayloadAction<{ id: string }>) => {
      const { id } = payload;
      state.notes[id] = {
        id,
        content: "",
        title: "",
        tags: [],
        createdAt: moment().format(),
        updatedAt: moment().format(),
      } as Note;
      state.noteMenu.push({ id, type: "note" });
    },
    setNoteContent: (
      state: DataState,
      { payload }: PayloadAction<{ id: string; content: string }>
    ) => {
      state.notes[payload.id].content = payload.content;
      state.notes[payload.id].updatedAt = moment().format();
    },
    setTitle: (
      state: DataState,
      {
        payload,
      }: PayloadAction<{ id: string; newTitle: string; pageType: PageType }>
    ) => {
      state[payload.pageType][payload.id].title = payload.newTitle;
    },
    reorderNoteMenu: (
      state: DataState,
      { payload }: PayloadAction<NoteMenu>
    ) => {
      state.noteMenu = payload;
    },
    addFolder: (state: DataState, { payload }: PayloadAction<string>) => {
      state.noteMenu.push({
        id: payload,
        type: "folder",
        subItems: [],
        title: "New Folder",
      });
    },
    setNoteMenu: (state: DataState, { payload }: PayloadAction<NoteMenu>) => {
      state.noteMenu = payload;
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
  addNote,
  setTitle,
  reorderNoteMenu,
  addFolder,
  setNoteMenu,
} = dataSlice.actions;

export default dataSlice.reducer;
