import { createSlice } from "@reduxjs/toolkit";

const globalUISlice = createSlice({
  name: "globalUISlice",
  initialState: {
    isLoading: false,
    isAlert: {
      status: false,
      type: undefined,
      msg: undefined,
    },
    newPostModalOpen: false,
    showEditPage: false,
  },
  reducers: {
    setIsLoading(state, action) {
      state.isLoading = action.payload.isLoading;
    },
    setAlert(state, action) {
      state.isAlert.status = action.payload.status;
      const { success } = action.payload;
      state.isAlert.type = success === true ? "success" : "warning";
      state.isAlert.msg = action.payload.msg;
    },
    disableAlert(state) {
      state.isAlert.status = false;
      state.isAlert.type = undefined;
      state.isAlert.msg = undefined;
    },
    setEditPageVisibility(state, action) {
      state.showEditPage = action.payload.showEditPage;
    },
    toggleNewPostModal(state) {
      state.newPostModalOpen = !state.newPostModalOpen;
    },
  },
});

export const globalUISliceActions = globalUISlice.actions;

export default globalUISlice.reducer;
