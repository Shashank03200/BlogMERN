import React from "react";

import { CssBaseline } from "@mui/material";
import { Box } from "@mui/material";
import { Grid } from "@mui/material";

function AuthFrame(props) {
  return (
    <CssBaseline>
      <Box>
        <Grid container>
          <Grid
            item
            xs={false}
            sm={false}
            md={6}
            lg={6}
            xl={7}
            sx={{
              backgroundImage: "url(https://source.unsplash.com/random)",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></Grid>
          <Grid item md={6} lg={6} xl={5} height="100vh">
            {props.children}
          </Grid>
        </Grid>
      </Box>
    </CssBaseline>
  );
}

export default AuthFrame;
