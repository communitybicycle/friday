import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ModulesType } from "../types/modules";

interface MetaState {
  isMenuOpen: boolean;
  isEditModuleModalOpen: boolean;
  editModuleModal: ModulesType | null;
}

const initialState: MetaState = {
  isMenuOpen: true,
  isEditModuleModalOpen: false,
  editModuleModal: null,
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
  },
});

export const {
  closeMenu,
  openMenu,
  closeEditModuleModal,
  openEditModuleModal,
  setEditModuleModal,
} = metaSlice.actions;

export default metaSlice.reducer;
