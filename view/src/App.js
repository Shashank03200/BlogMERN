import "./App.css";

import { Snackbar, Alert, Paper } from "@mui/material";

import LoaderGif from "../src/images/loader.gif";
import { Routes, Route } from "react-router-dom";

import SignUp from "./pages/Authentication/SignUp";
import SignIn from "./pages/Authentication/SignIn";
import HomePage from "./pages/HomePage";
import ActivationPage from "./pages/Authentication/ActivationPage";
import AddIcon from "@mui/icons-material/Add";
import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { globalUISliceActions } from "./store/Global/GlobalUISlice";
import ProfilePage from "./pages/ProfilePage";

import ProtectedPage from "./components/ProtectedPage";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar/Navbar";

function App() {
  const isLoggedIn = useSelector((state) => state.authData.isLoggedIn);
  const globalLoadingState = useSelector((state) => state.globalUI.isLoading);
  const isAlert = useSelector((state) => state.globalUI.isAlert);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(globalUISliceActions.disableAlert());
  };

  return (
    <Fragment>
      {globalLoadingState && (
        <Paper
          sx={{
            color: "#fff",
            zIndex: 22,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100vh",
          }}
        >
          <img
            src={LoaderGif}
            style={{
              width: "100px",
            }}
          />
        </Paper>
      )}
      {/* <Fab color="primary" aria-label="add">
        <AddIcon />
      </Fab> */}
      <Snackbar
        open={isAlert.status}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={isAlert.type}
          sx={{ width: "100%" }}
        >
          {isAlert.msg}
        </Alert>
      </Snackbar>

      <Navbar />
      <Routes>
        <Route
          path="/dashboard"
          element={
            <ProtectedPage>
              <Dashboard />
            </ProtectedPage>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedPage>
              <ProfilePage />
            </ProtectedPage>
          }
        />

        <Route
          path="/register"
          element={isLoggedIn ? <HomePage /> : <SignUp />}
        />
        <Route path="/login" element={<SignIn />} />

        <Route
          path="/verify-account/:verificationToken"
          element={<ActivationPage />}
        />

        <Route path="*" element={<HomePage />} />
      </Routes>
    </Fragment>
  );
}

export default App;
