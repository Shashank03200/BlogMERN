import { Box, CircularProgress, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { signUser } from "../../store/Auth/AuthActions";

function ActivationPage() {
  const isLoading = useSelector((state) => state.authUI.isLoading);
  const activationResponse = useSelector(
    (state) => state.authUI.activationResponse
  );
  const { verificationToken } = useParams();
  const navigate = useNavigate();
  console.log(activationResponse);
  const dispatch = useDispatch();
  console.log(verificationToken);

  useEffect(() => {
    if (verificationToken) {
      console.log("Sending request");
      const requestObj = {
        method: "GET",
        url: "/api/auth/verify-user/" + verificationToken,
      };
      dispatch(signUser(requestObj));
    }
  }, [verificationToken]);

  useEffect(() => {
    if (activationResponse) {
      navigate("/dashboard", { replace: true });
    }
  }, [activationResponse]);

  if (activationResponse === undefined) {
    return (
      <Box textAlign="center">
        <Typography variant="h3">Processing your link</Typography>
      </Box>
    );
  }

  if (isLoading) {
    return (
      <Box
        sx={{
          width: "100%",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h3">Verifying your Email</Typography>
        <br />
        <CircularProgress color="secondary" size={40} />
      </Box>
    );
  }

  return activationResponse === true ? (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography variant="h3">Email Verified Successfully.</Typography>
      <br />
      <CircularProgress color="secondary" size={40} />
    </Box>
  ) : (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography variant="h3">Invalid confirmation link</Typography>
      <br />
      <CircularProgress color="secondary" size={40} />
    </Box>
  );
}

export default ActivationPage;
