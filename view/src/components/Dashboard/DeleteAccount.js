import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PasswordField from "./PasswordField";

function DeleteAccount() {
  const [showPassword, togglePasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    togglePasswordVisible((prevState) => !prevState);
  };

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel2a-content"
        id="panel2a-header"
      >
        <Typography>Delete Account</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <PasswordField
            size="small"
            placeholder="Enter current password"
            name="passwordInput"
            showPassword={showPassword}
            onPasswordVisibilityToggle={togglePasswordVisibility}
          />
          <Button variant="contained" color="error" sx={{ marginY: "30px" }}>
            Delete account
          </Button>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
}

export default DeleteAccount;
