import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { eStore } from "utils/eStore";

interface UserState {
  name: string;
  profilePicture: string;
}

const initialState: UserState = (eStore.get("user") as UserState) || {
  name: "",
  profilePicture:
    "https://moonvillageassociation.org/wp-content/uploads/2018/06/default-profile-picture1.jpg",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setProfilePicture: (state, { payload }: PayloadAction<string>) => {
      state.profilePicture = payload;
    },
    deleteProfilePicture: (state) => {
      state.profilePicture =
        "https://moonvillageassociation.org/wp-content/uploads/2018/06/default-profile-picture1.jpg";
    },
    setName: (state, { payload }: PayloadAction<string>) => {
      state.name = payload;
    },
    reinitializeUserReducer: () => {
      return initialState;
    },
  },
});

export const {
  setProfilePicture,
  deleteProfilePicture,
  setName,
  reinitializeUserReducer,
} = userSlice.actions;

export default userSlice.reducer;
