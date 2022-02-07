import { Box, Typography } from "@mui/material";
import React from "react";
import verifyEmail from "../../images/logo/verify-email.png";

import "./VerifyAskMessage.css";

function VerifyAskMessage() {
  return (
    <Box sx={{ padding: "40px", textAlign: "center" }}>
      <Box
        sx={{
          marginBottom: "12px",
          mx: "auto",
        }}
      >
        <img
          src={verifyEmail}
          className="verifyEmailLogo"
          style={{
            borderRadius: "50%",
            border: "1px solid #DAD0C2",
            boxShadow: "2px 4px 8px #DAD0C2",
            margin: "8px",
          }}
        />
      </Box>

      <Typography variant="h3" sx={{ fontWeight: 500 }}>
        Check your inbox
      </Typography>
      <Box marginTop="30px">
        <Typography
          variant="p"
          sx={{
            fontSize: {
              xs: "20px",
              lg: "24px",
            },
            fontFamily: "Roboto",
            textAlign: "justify",
          }}
        >
          To start using blog, we need to verify your email.
          <br />
          <br />
          Please confirm your email address by using the verification link sent
          to the email address you provided.
        </Typography>
      </Box>
    </Box>
  );
}

export default VerifyAskMessage;
