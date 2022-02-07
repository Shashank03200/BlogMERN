import { Box, Container, Typography } from "@mui/material";

import React from "react";
import FirstRow from "./FirstRow";
import SecondRow from "./SecondRow";
import PostCard from "./PostCard";

function BlogsWrapper(props) {
  return (
    <Container maxWidth="lg">
      <Box>
        <Typography
          variant="h3"
          sx={{
            marginTop: props.marginTop,
            marginLeft: {
              xs: "20px",
            },
            fontWeight: "800",
          }}
        >
          {props.wrapperHeading}
        </Typography>
        <FirstRow />
        <SecondRow />
      </Box>
    </Container>
  );
}

export default BlogsWrapper;
