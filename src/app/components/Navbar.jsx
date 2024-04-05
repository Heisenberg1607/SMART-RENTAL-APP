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
import { UserAuth } from "../Context/AuthContext";
import "../Navbar.css";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const theme = useTheme();
  // const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { logOut } = UserAuth();

  const router = useRouter();

  function goToHomeage() {
    router.push("/");
  }

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
            <button onClick={goToHomeage}>Smart Rental App Logo</button>
          </Typography>

          {sessionStorage.getItem("email") ? (
            <>
              <Link href="Owner" color="inherit" className="navbar-link">
                <Typography variant="subtitle1" sx={{ ml: 2 }}>
                  Hello, {sessionStorage.getItem("email").split("@")[0]}
                </Typography>
              </Link>
              <Link
                href="Login"
                color="inherit"
                className="navbar-link"
                onClick={() => {
                  sessionStorage.removeItem("email");
                  logOut();
                }}
              >
                <Typography variant="subtitle1" sx={{ ml: 2 }}>
                  Logout
                </Typography>
              </Link>
            </>
          ) : (
            <div className="navbar-btns">
              <Link href="AboutUs" color="inherit" className="navbar-link">
                <Typography variant="subtitle1" sx={{ ml: 2 }}>
                  About Us
                </Typography>
              </Link>
              <Link href="SignUp" color="inherit" className="navbar-link">
                <Typography variant="subtitle1" sx={{ ml: 2 }}>
                  Sign Up
                </Typography>
              </Link>
              <Link href="/Login" color="inherit" className="navbar-link">
                <Typography variant="subtitle1" sx={{ ml: 2, mr: 2 }}>
                  Login
                </Typography>
              </Link>
            </div>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
