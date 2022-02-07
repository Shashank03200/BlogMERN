import { configureStore } from "@reduxjs/toolkit";

import authUISliceReducer from "./Auth/AuthUISlice";

import authDataSliceReducer from "./Auth/AuthDataSlice";

import globalUISliceReducer from "./Global/GlobalUISlice";

const store = configureStore({
  reducer: {
    authUI: authUISliceReducer,
    authData: authDataSliceReducer,
    globalUI: globalUISliceReducer,
  },
});

export default store;
