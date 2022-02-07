import { createSlice } from "@reduxjs/toolkit";

const authDataSlice = createSlice({
  name: "authDataSlice",
  initialState: {
    isLoggedIn: false,
    userData: {
      username: undefined,
      userId: undefined,
      profilePicture: undefined,
    },
  },
  reducers: {
    loginUser(state, action) {
      state.isLoggedIn = action.payload.isLoggedIn;
    },
    logoutUser(state) {
      state.isLoggedIn = false;
      state.userData.username = undefined;
      state.userData.userId = undefined;
      state.userData.profilePicture = undefined;
    },
    setUserData(state, action) {
      state.userData.username = action.payload.username;
      state.userData.userId = action.payload._id;
      state.userData.profilePicture = action.payload.profilePicture;
    },
  },
});

export const authDataSliceActions = authDataSlice.actions;

export default authDataSlice.reducer;
