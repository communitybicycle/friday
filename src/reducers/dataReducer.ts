import { createSlice } from "@reduxjs/toolkit";
import { initialData } from "../data/initial";
// import { getItem } from "../utils/storage";

const dataSlice = createSlice({
  name: "data",
  initialState: {
    pages: initialData.pages,
    modules: initialData.modules,
  },
  reducers: {},
});

export const {} = dataSlice.actions;

export default dataSlice.reducer;
