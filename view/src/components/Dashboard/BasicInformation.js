import React from "react";
import {
  TextField,
  Typography,
  Stack,
  Box,
  Paper,
  Avatar,
  Button,
} from "@mui/material";

import "./BasicInformation.css";

function BasicInformation() {
  return (
    <Box
      component="form"
      sx={{
        padding: "4px",
        marginY: "18px",
      }}
    >
      <Box
        display="flex"
        sx={{ margin: "40px auto", justifyContent: "center", padding: "4px" }}
      >
        <Paper
          sx={{ maxWidth: "min-content", borderRadius: 50, padding: "3px" }}
        >
          <Avatar
            alt="Remy Sharp"
            src="https://mui.com/static/images/avatar/1.jpg"
            sx={{ width: 100, height: 100, cursor: "pointer" }}
          />
        </Paper>
        {/* <IconButton children={<EditIcon />} /> */}
      </Box>
      <Typography variant="h5" sx={{ marginBottom: "24px" }}>
        Basic Information
      </Typography>
      <Stack spacing={2}>
        <TextField
          id="firstNameInput"
          label="First Name"
          variant="outlined"
          fullWidth
        />
        <TextField
          id="lastNameInput"
          label="Second Name"
          variant="outlined"
          fullWidth
        />

        <Box display="grid" className="gridRow">
          <TextField
            value="Date of Birth"
            InputProps={{
              readOnly: true,
            }}
          ></TextField>

          <TextField
            hiddenLabel
            type="date"
            id="dateOfBirthInput"
            label=""
            variant="outlined"
            fullWidth
          />
        </Box>

        <Box display="grid" className="gridRow">
          <TextField
            value="Username"
            InputProps={{
              readOnly: true,
            }}
          ></TextField>

          <TextField
            hiddenLabel
            id="usernameInput"
            label=""
            variant="outlined"
            fullWidth
          />
        </Box>
      </Stack>
      <Box textAlign="center" sx={{ marginTop: "30px" }}>
        <Button variant="contained" color="primary" sx={{ marginY: "12px" }}>
          Save Changes
        </Button>
      </Box>
    </Box>
  );
}

export default BasicInformation;
