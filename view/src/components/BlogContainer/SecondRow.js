import { Box } from "@mui/system";
import PostCard from "./PostCard";
import React from "react";
import { Container } from "@mui/material";

function SecondRow() {
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
        }}
      >
        <PostCard minHeight={200} />
      </Container>

      <Container
        sx={{
          flexGrow: {
            md: 1,
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
        }}
      >
        <PostCard minHeight={200} />
      </Container>
    </Box>
  );
}

export default SecondRow;
