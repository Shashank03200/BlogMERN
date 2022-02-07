import { Button, Grid, Link, Stack, TextField } from "@mui/material";
import React from "react";
import { CircularProgress } from "@mui/material";

import AuthFrame from "./AuthFrame";
import SideWrapper from "./SideWrapper";

import { useDispatch, useSelector } from "react-redux";
import { signUser } from "../../store/Auth/AuthActions";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const isLoading = useSelector((state) => state.authUI.isLoading);
  const isLoggedIn = useSelector((state) => state.authData.isLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (isLoggedIn) {
    navigate("/home", { replace: true });
  }

  const loginFormSubmitHandler = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;

    const userLoginDataObj = {
      email,
      password,
    };

    const requestObject = {
      method: "POST",
      url: "/api/auth/login",
      data: userLoginDataObj,
    };

    dispatch(signUser(requestObject));
  };

  return (
    <form action="/" onSubmit={loginFormSubmitHandler}>
      <Stack
        spacing={4}
        display="inherit"
        sx={{ paddingX: "60px", paddingY: "40px", paddingTop: "60px" }}
      >
        <TextField
          id="email"
          type="email"
          disabled={isLoading}
          label="Enter your email"
          variant="outlined"
          required
          fullWidth
          autoFocus
        ></TextField>

        <TextField
          id="password"
          disabled={isLoading}
          type="password"
          label="Enter your password"
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
          {isLoading ? <CircularProgress size={24} /> : "Log In"}
        </Button>
        <Grid container spacing={{ sm: "2" }}>
          <Grid item xs={12} lg={6} textAlign={{ xs: "center", lg: "left" }}>
            <Link underline="none" sx={{ cursor: "pointer" }} href="/register">
              Register
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

function SignIn() {
  return (
    <AuthFrame>
      <SideWrapper heading="Sign In" subheading="Welcome back">
        <LoginForm />
      </SideWrapper>
    </AuthFrame>
  );
}

export default SignIn;
