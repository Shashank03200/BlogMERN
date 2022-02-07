import {
  Typography,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
} from "@mui/material";
import React, { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import PasswordField from "./PasswordField";

const passwordButtonsInfo = [
  {
    name: "currentPasswordInput",
    placeholder: "Current password",
    key: "current",
  },
  {
    name: "newPasswordInput",
    placeholder: "New password",
    key: "new",
  },
  {
    name: "confirmPasswordInput",
    placeholder: "Confirm new password",
    key: "confirm",
  },
];

function ChangePassword() {
  const initialPasswordState = {
    current: false,
    new: false,
    confirm: false,
  };

  const [showPassword, setShowPassword] = useState(initialPasswordState);

  const handleClickShowPassword = (type) => {
    console.log(showPassword);
    setShowPassword({
      ...showPassword,
      [type]: !showPassword[type],
    });
  };

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>Change Password</Typography>
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
          {passwordButtonsInfo.map((passwordButton) => {
            return (
              <PasswordField
                onPasswordVisibilityToggle={() =>
                  handleClickShowPassword(passwordButton.key)
                }
                size="small"
                showPassword={showPassword[passwordButton.key]}
                name={passwordButton.name}
                placeholder={passwordButton.placeholder}
              />
            );
          })}

          <Button variant="contained" color="primary" sx={{ marginY: "30px" }}>
            Update
          </Button>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
}

export default ChangePassword;
