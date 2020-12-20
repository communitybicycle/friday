import { createSlice } from "@reduxjs/toolkit";

const metaSlice = createSlice({
  name: "meta",
  initialState: {
    isMenuOpen: true,
  },
  reducers: {
    closeMenu: (state) => {
      state.isMenuOpen = false;
    },
    openMenu: (state) => {
      state.isMenuOpen = true;
    },
  },
});

export const { closeMenu, openMenu } = metaSlice.actions;

export default metaSlice.reducer;
