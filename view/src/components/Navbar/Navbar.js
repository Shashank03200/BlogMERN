import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CssBaseline from "@mui/material/CssBaseline";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import SideDrawer from "./SideDrawer";
import NavbarAvatar from "./NavbarAvatar";

const categories = [
  "Trending",
  "Latest",
  "Technology",
  "Business",
  "Culture",
  "Poltitics",
  "Health",
  "Style",
  "Travel",
];

const ResponsiveAppBar = () => {
  const [sideDrawerOpen, setSideDrawerOpen] = useState(false);

  const handleOpenNavMenu = (event) => {
    setSideDrawerOpen(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setSideDrawerOpen(null);
  };

  return (
    <CssBaseline>
      <AppBar position="fixed">
        <Container maxWidth="lg">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
            >
              Blog Up
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <SideDrawer
                open={Boolean(sideDrawerOpen)}
                categories={categories}
                handleClose={handleCloseNavMenu}
              />
            </Box>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
            >
              Blog Up
            </Typography>
            <Box
              sx={{
                flexGrow: 1,
                justifyContent: { md: "center" },
                display: { xs: "none", md: "flex" },
              }}
            >
              {categories.map((page) => (
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, mx: 1, color: "white", display: "block" }}
                >
                  {page}
                </Button>
              ))}
            </Box>
            <NavbarAvatar />
          </Toolbar>
        </Container>
      </AppBar>
    </CssBaseline>
  );
};
export default ResponsiveAppBar;
