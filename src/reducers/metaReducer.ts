import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ModulesType } from "../types/modules";
import { eStore } from "../utils/eStore";

interface MetaState {
  isMenuOpen: boolean;
  isEditModuleModalOpen: boolean;
  editModuleModal: ModulesType | null;
  isSettingsOpen: boolean;
}

const initialState: MetaState = (eStore.get("meta") as MetaState) || {
  isMenuOpen: true,
  isEditModuleModalOpen: false,
  editModuleModal: null,
  isSettingsOpen: false,
};

const metaSlice = createSlice({
  name: "meta",
  initialState,
  reducers: {
    closeMenu: (state) => {
      state.isMenuOpen = false;
    },
    openMenu: (state) => {
      state.isMenuOpen = true;
    },
    openEditModuleModal: (state) => {
      state.isEditModuleModalOpen = true;
    },
    closeEditModuleModal: (state) => {
      state.isEditModuleModalOpen = false;
    },
    setEditModuleModal: (state, { payload }: PayloadAction<ModulesType>) => {
      state.editModuleModal = payload;
    },
    openSettings: (state) => {
      state.isSettingsOpen = true;
    },
    closeSettings: (state) => {
      state.isSettingsOpen = false;
    },
    reinitializeMetaReducer: () => {
      return initialState;
    },
  },
});

export const {
  closeMenu,
  openMenu,
  closeEditModuleModal,
  openEditModuleModal,
  setEditModuleModal,
  openSettings,
  closeSettings,
  reinitializeMetaReducer,
} = metaSlice.actions;

export default metaSlice.reducer;
