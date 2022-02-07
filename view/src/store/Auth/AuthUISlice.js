import { createSlice } from "@reduxjs/toolkit";

const authUISlice = createSlice({
  name: "authUISlice",
  initialState: {
    isLoading: false,
    emailSent: false,
    activationResponse: undefined,
  },
  reducers: {
    setIsLoading(state, action) {
      state.isLoading = action.payload.isLoading;
    },
    setEmailSent(state) {
      state.emailSent = true;
    },
    setActivationResponse(state, action) {
      state.activationResponse = action.payload.activationResponse;
    },
  },
});

export const authUISliceActions = authUISlice.actions;

export default authUISlice.reducer;
