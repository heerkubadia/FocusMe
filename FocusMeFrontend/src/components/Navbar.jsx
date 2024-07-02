import React from "react";
import { NavLink } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { blue } from "@mui/material/colors";

const pages = [
  ["Home", ""],
  ["Upload Images", "images"],
  ["Get Images", "get"],
  ["Get All Images","getall"]
];

function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const linkStyle = ({ isActive }) => ({
    textDecoration: "none",
    color: isActive ?"#c5d8f4": "#81a4d5"  , // Darker blue for active links, dark blue for others
    marginRight: "1rem",
    fontWeight: isActive ? "bold" : "normal",
  });

  return (
    <AppBar position="static" sx={{ bgcolor: "#323a99" }}>
      {" "}
      {/* Pastel blue */}
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <img src="/logo.png" height={45} alt="" />
          <Typography
            variant="h6"
            noWrap
            component={NavLink}
            to="/"
            sx={{
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "#c5d8f4" /* Dark blue */,
              textDecoration: "none",
              marginLeft: "1rem",
              mr: 4 /* Adding space after FocusMe */,
            }}
          >
            FocusMe
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              sx={{ color: "#0D47A1" }} /* Dark blue */
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page[0]}
                  onClick={handleCloseNavMenu}
                  component={NavLink}
                  to={page[1]}
                  style={linkStyle}
                >
                  <Typography textAlign="center">{page[0]}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon
            sx={{
              display: { xs: "flex", md: "none" },
              mr: 1,
              color: "#0D47A1",
            }}
          />
          <Typography
            variant="h5"
            noWrap
            component={NavLink}
            to="/"
            sx={{
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "#0D47A1" /* Dark blue */,
              textDecoration: "none",
            }}
          >
            FocusMe
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page[0]}
                onClick={handleCloseNavMenu}
                component={NavLink}
                to={page[1]}
                style={linkStyle}
                sx={{ my: 2, display: "block" }}
              >
                {page[0]}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="heer.kubadia@iitgn.ac.in">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar sx={{ bgcolor: "#0D47A1", color: "#ffffff" }}>H</Avatar>{" "}
                {/* Dark blue with white text */}
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
