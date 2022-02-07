import React from "react";

import { Grid } from "@mui/material";
import { TextField } from "@mui/material";
import { Stack } from "@mui/material";
import { Link } from "@mui/material";
import { CircularProgress } from "@mui/material";
import { Slide } from "@mui/material";
import { Button } from "@mui/material";

import SideWrapper from "./SideWrapper";
import { useDispatch, useSelector } from "react-redux";
import AuthFrame from "./AuthFrame";

import { signUser } from "../../store/Auth/AuthActions";
import VerifyAskMessage from "./VerifyAskMessage";

const RegisterForm = () => {
  const isLoading = useSelector((state) => state.authUI.isLoading);
  const dispatch = useDispatch();

  const registerFormSubmitHandler = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const username = event.target.username.value;
    const password = event.target.password.value;
    const confirmPassword = event.target.confirmPassword.value;

    const userRegisterDataObj = {
      email,
      username,
      password,
      confirmPassword,
    };

    const requestObject = {
      method: "POST",
      url: "/api/auth/register",
      data: userRegisterDataObj,
    };

    dispatch(signUser(requestObject));
  };

  return (
    <form action="/" autoComplete="off" onSubmit={registerFormSubmitHandler}>
      <Stack
        spacing={{ xs: 2, lg: 4 }}
        display="inherit"
        sx={{
          paddingX: "60px",
          paddingY: "40px",
          paddingTop: { sm: "0", md: "60px" },
        }}
      >
        <TextField
          type="email"
          id="email"
          label="Enter your email"
          variant="outlined"
          disabled={isLoading}
          required
          fullWidth
          autoFocus
        ></TextField>
        <TextField
          id="username"
          disabled={isLoading}
          name="username"
          label="Provide a username"
          variant="outlined"
          required
          fullWidth
        ></TextField>
        <TextField
          id="password"
          name="password"
          type="password"
          disabled={isLoading}
          label="Enter a password"
          variant="outlined"
          required
          fullWidth
        ></TextField>
        <TextField
          id="confirmPassword"
          name="confirmPassword"
          disabled={isLoading}
          label="Confirm password"
          type="password"
          variant="outlined"
          required
          fullWidth
        ></TextField>
        <Button
          variant="contained"
          fullWidth
          sx={{ padding: "14px" }}
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? <CircularProgress size={24} /> : "Sign Up"}
        </Button>
        <Grid container spacing={{ sm: "2" }}>
          <Grid item xs={12} lg={6} textAlign={{ xs: "center", lg: "left" }}>
            <Link underline="none" sx={{ cursor: "pointer" }} href="login">
              Log in
            </Link>
          </Grid>
          <Grid item xs={12} lg={6} textAlign={{ xs: "center", lg: "left" }}>
            <Link underline="none" sx={{ cursor: "pointer" }} href="/">
              Return to home
            </Link>
          </Grid>
        </Grid>
      </Stack>
    </form>
  );
};

function SignUp() {
  const emailSent = useSelector((state) => state.authUI.emailSent);

  return (
    <AuthFrame>
      {emailSent ? (
        <Slide direction="left" in={emailSent}>
          <div>
            <VerifyAskMessage />
          </div>
        </Slide>
      ) : (
        <SideWrapper
          heading="Register"
          subheading="Join our wonderful community"
        >
          <RegisterForm />
        </SideWrapper>
      )}
    </AuthFrame>
  );
}

export default SignUp;
