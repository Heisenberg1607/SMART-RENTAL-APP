import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Container,
  Link,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const Navbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <AppBar position="static" color="primary">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Smart Rental App Logo
          </Typography>
          <Link href="/" color="inherit">
            <Typography variant="subtitle1" sx={{ ml: 2 }}>
              About Us
            </Typography>
          </Link>
          <Link href="SignUp" color="inherit">
            <Typography variant="subtitle1" sx={{ ml: 2 }}>
              Sign Up
            </Typography>
          </Link>
          <Link href="/Login" color="inherit">
            <Typography variant="subtitle1" sx={{ ml: 2, mr: 2 }}>
              Login
            </Typography>
          </Link>
          <div>
            <input type="text" placeholder="Search" />
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
