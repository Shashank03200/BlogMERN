import React from "react";
import InterestManager from "../components/Dashboard/InterestManager";
import AccountSettings from "../components/Dashboard/AccountSettings";
import BasicInformation from "../components/Dashboard/BasicInformation";
import { Box, Typography, Divider, Container } from "@mui/material";

function Dashboard() {
  return (
    <Container maxWidth="md">
      <Box
        sx={{
          padding: "12px",
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontWeight: "500",
            textAlign: {
              xs: "center",
            },
          }}
        >
          Dashboard
        </Typography>

        <BasicInformation />
        <Divider color="success" />
        <InterestManager />
        <Divider color="success" />

        <AccountSettings />
      </Box>
    </Container>
  );
}

export default Dashboard;
