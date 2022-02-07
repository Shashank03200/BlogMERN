import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { checkAccessToken } from "../store/Auth/AuthActions";
import tokens from "../apis/tokens";
import { CircularProgress } from "@mui/material";
import { globalUISliceActions } from "../store/Global/GlobalUISlice";

function ProtectedPage(props) {
  const isLoggedIn = useSelector((state) => state.authData.isLoggedIn);
  const isLoading = useSelector((state) => state.globalUI.isLoading);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(globalUISliceActions.setIsLoading(true));
    if (!isLoggedIn) {
      if (tokens.accessToken && tokens.refreshToken) {
        dispatch(checkAccessToken());
      }
    }
  }, []);

  return isLoggedIn ? props.children : null;
}

export default ProtectedPage;
