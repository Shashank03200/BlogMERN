import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { checkAccessToken } from "../store/Auth/AuthActions";
import Navbar from "../components/Navbar/Navbar";

import BlogsWrapper from "../components/BlogContainer/BlogsWrapper";
import { Divider } from "@mui/material";

function HomePage() {
  const dispatch = useDispatch();
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    if (accessToken) {
      dispatch(checkAccessToken());
    }
  }, []);

  return (
    <>
      <BlogsWrapper
        wrapperHeading="Trending Now"
        marginTop={{
          xs: 10,
          lg: 14,
        }}
      />
      <Divider />
      <BlogsWrapper
        wrapperHeading="Recent Blogs"
        marginTop={{
          xs: 6,
          lg: 8,
        }}
      />
    </>
  );
}

export default HomePage;
