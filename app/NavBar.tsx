"use client";
import { auth } from "./firebase/config.js";
import { signOut } from "firebase/auth";
import React, { useState } from "react";
import {
  AppBar,
  Box,
  Button,
  CircularProgress,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import { logout as OWlogout } from "@open-web/react-sdk";
import MenuIcon from "@mui/icons-material/Menu";
import OWProgress from "./components/OWProgress";

const NavBar = () => {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  const drawerWidth = 240;
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        WilliamTest
      </Typography>
      <Divider />
      <List>
        <ListItem disablePadding sx={{textTransform: "none"}}>
          <ListItemButton
            sx={{ textAlign: "center", textTransform: "none" }}
            onClick={() => router.push("/")}
          >
            <ListItemText primary="Home" sx={{textTransform: "none"}}/>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            sx={{ textAlign: "center" }}
            onClick={() => router.push("/articles")}
          >
            <ListItemText primary="Articles" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        component="nav"
        position="static"
        sx={{ backgroundColor: "var(--brand-color)" }}
      >
        <Toolbar className="w-1/2 max-[1000px]:w-11/12 m-auto">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            WilliamTest
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <Button sx={{ color: "#fff",  textTransform: "none" }} onClick={() => router.push("/")}>
              Home
            </Button>
            <Button
              sx={{ color: "#fff",  textTransform: "none" }}
              onClick={() => router.push("/articles")}
            >
              Articles
            </Button>

            {loading ? (
              <>
                &ensp;||&ensp;
                <CircularProgress sx={{ paddingLeft:"8px", color: "white" }} size="22px" />
              </>
            ) : (
              <>
                {user?.uid ? (
                  <>
                    &ensp;||&ensp;
                    <Button
                      sx={{ color: "#fff",  textTransform: "none" }}
                      onClick={() => {
                        router.push("/profile/" + user?.uid);
                      }}
                    >
                      Profile
                    </Button>
                    <Button
                      sx={{ color: "#fff",  textTransform: "none" }}
                      onClick={() => {
                        router.push("/");
                        OWlogout();
                        signOut(auth);
                        sessionStorage.removeItem("user");
                      }}
                    >
                      Log Out
                    </Button>
                  </>
                ) : (
                  <>
                    &ensp;||&ensp;
                    <Button
                      sx={{ color: "#fff",  textTransform: "none" }}
                      onClick={() => router.push("/register")}
                    >
                      Register
                    </Button>
                    <Button
                      sx={{ color: "#fff",  textTransform: "none" }}
                      onClick={() => router.push("/signin")}
                    >
                      Sign In
                    </Button>
                  </>
                )}{" "}
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
  {
    /*     
    // <nav className="w-screen p-10 flex justify-around">
    //   <Link href="/">OliviaWeb SSO</Link>
    //   {loading ? <OWProgress /> : <div className="flex flex-row">
    //     {user?.uid ? (
    //       <>
    //         <Button
    //           className="mx-5"
    //           onClick={() => {
    //             router.push("/profile/" + user?.uid);
    //           }}
    //           variant="outlined"
    //           sx={{
    //             color: 'var(--brand-color)',
    //             borderColor: 'var(--brand-color)',
    //             "&:hover": {
    //               backgroundColor: "rgba(150, 113, 174, 0.1)",
    //               borderColor: "var(--brand-color)"
    //             }
    //           }}
    //         >
    //           Profile
    //         </Button>
    //         <Button
    //           onClick={() => {
    //             router.push('');
    //             OWlogout();
    //             signOut(auth);
    //             sessionStorage.removeItem("user");
    //           }}
    //           variant="text"
    //           color="error"
    //         >
    //           Log Out
    //         </Button>
    //       </>
    //     ) : (
    //       <>
    //         <Link href="/register">Register</Link>&emsp;||&emsp;
    //         <Link href="/signin">Sign In</Link>
    //       </>
    //     )}
    //   </div>}
    // </nav> */
  }
};

export default NavBar;
