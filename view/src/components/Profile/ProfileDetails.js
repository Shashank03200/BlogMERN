import { Box, Typography } from "@mui/material";
import React from "react";
import { createStyles, makeStyles } from "@mui/styles";

const useStyles = makeStyles((themes) =>
  createStyles({
    userDetailsWrapper: {
      backgroundColor: themes.palette.red,
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
    },
    userDetail: {
      display: "flex",
      alignItems: "end",
      justifyContent: "space-between",
      padding: "8px",
      width: {
        xs: "90%",
        lg: '"60%"',
      },
    },
    userDetailLabel: {
      fontWeight: "500",
      fontSize: {
        xs: "16px",
        lg: "20px",
      },
    },
    userDetailInfo: {
      fontVariant: "body2",
      fontSize: {
        xs: "16px",
        lg: "20px",
      },
    },
  })
);

function ProfileDetails() {
  const classes = useStyles();
  return (
    <Box className={classes.userDetailsWrapper}>
      <Box className={classes.userDetail}>
        <Typography className={classes.userDetailLabel}>Name: </Typography>
        &nbsp;
        <Typography className={classes.userDetailInfo}>
          Shashank Mishra
        </Typography>
      </Box>
      <Box className={classes.userDetail}>
        <Typography className={classes.userDetailLabel}>Interests: </Typography>
        <Typography className={classes.userDetailInfo}>
          Sports History
        </Typography>
      </Box>

      <Box className={classes.userDetail}>
        <Typography className={classes.userDetailLabel}>
          Date Joined:{" "}
        </Typography>
        <Typography className={classes.userDetailInfo}>
          23rd Feb, 2013
        </Typography>
      </Box>

      <Box className={classes.userDetail}>
        <Typography className={classes.userDetailLabel}>Username</Typography>
        <Typography className={classes.userDetailInfo}>shashank0320</Typography>
      </Box>
    </Box>
  );
}

export default ProfileDetails;
