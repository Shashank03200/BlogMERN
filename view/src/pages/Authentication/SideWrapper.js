import { Box, Paper, Typography } from "@mui/material";
import React from "react";

const SideWrapper = (props) => {
  return (
    <Paper elevation={4}>
      <Box
        sx={{ height: "100vh" }}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="h3" align="center">
          {props.heading}
        </Typography>

        <Typography variant="h5" align="center" mt={4}>
          {props.subheading}
        </Typography>

        {props.children}
      </Box>
    </Paper>
  );
};
export default SideWrapper;
