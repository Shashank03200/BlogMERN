import axios from "axios";

import { authUISliceActions } from "./AuthUISlice";
import { globalUISliceActions } from "../Global/GlobalUISlice";
import { authDataSliceActions } from "./AuthDataSlice";
import routeInstance from "../../apis/axiosInstance";

export const signUser = (requestObj) => {
  return (dispatch) => performRequest(dispatch, requestObj);
};

const performRequest = async (dispatch, requestObj) => {
  try {
    dispatch(authUISliceActions.setIsLoading({ isLoading: true }));

    const response = await axios(requestObj);

    dispatch(authUISliceActions.setIsLoading({ isLoading: false }));

    if (requestObj.url === "/api/auth/register") {
      dispatch(authUISliceActions.setEmailSent());
    } else if (requestObj.url === "/api/auth/login") {
      localStorage.setItem("accessToken", response.data.data.accessToken);
      localStorage.setItem("refreshToken", response.data.data.refreshToken);
      dispatch(authDataSliceActions.loginUser({ isLoggedIn: true }));
    } else if (requestObj.method === "GET") {
      localStorage.setItem("accessToken", response.data.data.accessToken);
      localStorage.setItem("refreshToken", response.data.data.refreshToken);

      dispatch(
        authUISliceActions.setActivationResponse({ activationResponse: true })
      );
      dispatch(authDataSliceActions.loginUser({ isLoggedIn: true }));
    }

    dispatch(
      globalUISliceActions.setAlert({
        status: true,
        ...response.data,
      })
    );
  } catch (err) {
    const errorObj = err.response.data;
    console.log(errorObj);
    if (requestObj.method === "GET") {
      dispatch(
        authUISliceActions.setActivationResponse({ activationResponse: false })
      );
    }
    dispatch(
      globalUISliceActions.setAlert({
        status: true,
        ...errorObj,
      })
    );
    dispatch(authUISliceActions.setIsLoading({ isLoading: false }));
  }
};

export const checkAccessToken = () => async (dispatch) => {
  try {
    dispatch(globalUISliceActions.setIsLoading({ isLoading: true }));
    const response = await routeInstance({
      method: "GET",
      url: "/api/users/user",
    });
    let data = {};
    if (response) {
      data = await response.data;
    }

    if (data !== {}) {
      console.log(data);
      dispatch(authDataSliceActions.loginUser({ isLoggedIn: true }));
      dispatch(authDataSliceActions.setUserData(data.data));
      dispatch(globalUISliceActions.setIsLoading({ isLoading: false }));
    }
  } catch (err) {
    console.log(err);
    dispatch(globalUISliceActions.setIsLoading({ isLoading: false }));
    dispatch(authDataSliceActions.loginUser({ isLoggedIn: false }));
  }
};
