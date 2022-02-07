import React from "react";
import ReactDOM from "react-dom";

import { BrowserRouter } from "react-router-dom";
import {
  createTheme,
  ThemeProvider,
  responsiveFontSizes,
} from "@mui/material/styles";

import App from "./App";
import store from "./store/index";
import { Provider } from "react-redux";

let theme = createTheme();
theme = responsiveFontSizes(theme);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
