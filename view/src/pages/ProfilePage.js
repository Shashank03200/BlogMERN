import React from "react";
import Container from "@mui/material/Container";
import PostCard from "../components/BlogContainer/PostCard";
import { Avatar, Box, CssBaseline, Paper } from "@mui/material";
import ProfileDetails from "../components/Profile/ProfileDetails";

const postData = {
  owner: true,
};

function ProfilePage() {
  return (
    <CssBaseline>
      <Box
        sx={{
          padding: 0,
          marginTop: "50px",
        }}
      >
        <Box sx={{ topMargin: "120px" }}>
          <Box
            sx={{
              backgroundColor: "#ccc",
              height: "200px",
              width: "100%",
            }}
          />
          <Box
            sx={{
              width: "100%",
              backgroundColor: "#3cc",
            }}
          >
            <Paper
              sx={{
                maxWidth: "min-content",
                borderRadius: 50,
                padding: "3px",
              }}
              className="ProfileAvatarWrapper"
              elevation={4}
            >
              <Avatar
                alt="Shashank Mishra"
                src="https://mui.com/static/images/avatar/1.jpg"
                sx={{
                  width: "128px",
                  height: "128px",
                }}
              />
            </Paper>
            {/* <ProfileDetails /> */}
          </Box>

          <Box
            sx={{
              marginTop: "30px",
              padding: "12px",
            }}
            className="profilePostsWrapper"
          >
            <PostCard postData={postData} />
            <PostCard postData={postData} />
            <PostCard postData={postData} />
            <PostCard postData={postData} />
          </Box>
        </Box>
      </Box>
    </CssBaseline>
  );
}

export default ProfilePage;
