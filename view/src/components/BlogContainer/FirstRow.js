import {
  Container,
  Card,
  CardContent,
  Grid,
  Typography,
  Box,
} from "@mui/material";
import React from "react";
import PostCard from "./PostCard";

function FirstRow() {
  return (
    <Box
      sx={{
        display: { md: "flex" },
        justifyContent: "space-around",
      }}
    >
      <Container
        sx={{
          flexGrow: {
            md: 1,
          },
          flex: {
            md: 7,
          },
          flexShrink: {
            md: 12,
          },
        }}
      >
        <PostCard minHeight={200} />
      </Container>
      <Container
        sx={{
          flexGrow: {
            md: 1,
          },
          flex: {
            md: 5,
          },
          flexShrink: {
            md: 1,
          },
        }}
      >
        <PostCard minHeight={200} />
      </Container>
    </Box>
  );
}

export default FirstRow;
