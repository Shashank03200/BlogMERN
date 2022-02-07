import React from "react";
import { Box, Card, Grid, Typography, IconButton } from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";

function PostCard(props) {
  return (
    <Card
      sx={{
        my: "20px",
        minHeight: { md: props.minHeight },
        maxHeight: { md: props.minHeight },
        padding: {
          xs: "12px",
          md: "12px",
          lg: "16px",
        },
      }}
    >
      <Grid container direction={"column"}>
        <Grid item xs={10}>
          <Grid container>
            <Grid item xs={8}>
              <Typography variant="h6" fontWeight="500">
                Vestibulum ac diam sit amet quam vehicula elementum sed sit amet
                dui.
              </Typography>
            </Grid>
            <Grid
              item
              xs={4}
              sx={{
                overflow: "hidden",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                src="https://mui.com/static/images/cards/paella.jpg"
                style={{
                  width: "100%",
                  objectFit: "contain",
                }}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          xs={2}
          sx={{
            marginTop: {
              xs: "12px",
              md: "2px",
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "end",
            }}
          >
            <Typography sx={{ fontSize: "12px" }}>
              {/* {props.postData.owner === true ? (
                <IconButton>
                  <DeleteSweepIcon />
                </IconButton>
              ) : ( */}
              Author : Shashank Mishra
            </Typography>

            <Typography sx={{ fontSize: "12px" }}>7 hours ago</Typography>
            <IconButton>
              <ShareIcon />
            </IconButton>
          </Box>
        </Grid>
      </Grid>
    </Card>
  );
}

export default PostCard;
