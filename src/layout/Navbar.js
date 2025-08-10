import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  useTheme,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Typography,
  Divider,
  CircularProgress,
  Alert,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import SignupDialog from "../components/SignupDialog";
import axios from "axios";

const Navbar = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

const handleLoginSubmit = async (e) => {
  e.preventDefault();
  setLoginLoading(true);
  setLoginError("");

  // Trim inputs to avoid whitespace issues
  const payload = {
    email: loginData.email?.trim() || "",
    password: loginData.password?.trim() || "",
  };

  if (!payload.email || !payload.password) {
    setLoginError("Email and password are required");
    setLoginLoading(false);
    return;
  }

  try {
    const res = await axios.post(
      "https://cms-backend-dah2.onrender.com/api/customer/signin",
      payload
    );

    if (res.data?.success) {
      // Save token and user info
      localStorage.setItem("cms_token", res.data.token);
      localStorage.setItem(
        "cms_user",
        JSON.stringify(res.data.user) // backend already returns { id, email }
      );

      // For debugging in dev
      if (process.env.NODE_ENV === "development") {
        console.log("Login successful:", res.data.user);
      }

      setLoginOpen(false);
      navigate("/dashboard");
    } else {
      setLoginError(res.data?.message || "Login failed");
    }
  } catch (err) {
    if (process.env.NODE_ENV === "development") {
      console.error("Login error:", err.response?.data || err.message);
    }
    setLoginError(
      err.response?.data?.message ||
      "Login failed. Please try again."
    );
  } finally {
    setLoginLoading(false);
  }
};


  const navItems = ["Home", "Admin", "Pages", "About US", "Contact US"];

  const drawer = (
    <Box
      sx={{
        width: 250,
        background: "rgba(0, 0, 0, 0.9)",
        backdropFilter: "blur(12px)",
        height: "100%",
        color: "white",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          p: 2,
        }}
      >
        <IconButton onClick={handleDrawerToggle}>
          <CloseIcon sx={{ color: "white" }} />
        </IconButton>
      </Box>
      <List>
        {navItems.map((item) => (
          <ListItem
            button
            key={item}
            component={Link}
            to={item === "Home" ? "/" : item.toLowerCase().replace(" ", "-")}
            onClick={handleDrawerToggle}
            sx={{
              "&:hover": {
                backgroundColor: "rgba(255,255,255,0.15)",
              },
            }}
          >
            <ListItemText primary={item} sx={{ textAlign: "center" }} />
          </ListItem>
        ))}
        <ListItem
          button
          onClick={() => {
            setLoginOpen(true);
            handleDrawerToggle();
          }}
          sx={{
            "&:hover": {
              backgroundColor: "rgba(255,255,255,0.15)",
            },
          }}
        >
          <ListItemText primary="Login" sx={{ textAlign: "center" }} />
        </ListItem>
        <ListItem
          button
          onClick={() => {
            setSignupOpen(true);
            handleDrawerToggle();
          }}
          sx={{
            "&:hover": {
              backgroundColor: "rgba(255,255,255,0.15)",
            },
          }}
        >
          <ListItemText primary="Sign Up" sx={{ textAlign: "center" }} />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          height: "80px",
          display: "flex",
          justifyContent: "center",
          backgroundColor: "rgba(0, 0, 0, 0.9)",
          backdropFilter: "blur(12px)",
          color: "white",
          boxShadow: "none",
          borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
          zIndex: theme.zIndex.drawer + 1,
          transition: "all 0.3s ease",
          "&:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.95)",
          },
        }}
      >
        <Toolbar
          sx={{
            minHeight: "80px !important",
            padding: { xs: "0 16px", md: "0 24px" },
          }}
        >
          <Box
            component="img"
            src="/images/CMS_logo.png"
            alt="Company Logo"
            sx={{
              height: 46,
              mr: 2,
              cursor: "pointer",
              transition: "all 0.3s ease",
              filter: "drop-shadow(0 0 8px rgba(255,255,255,0.3))",
              "&:hover": {
                opacity: 0.9,
                transform: "scale(1.05)",
              },
            }}
            onClick={() => navigate("/")}
          />

          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              gap: "12px",
              ml: "auto",
              alignItems: "center",
            }}
          >
            {navItems.map((item) => (
              <Button
                key={item}
                color="inherit"
                component={Link}
                to={
                  item === "Home" ? "/" : item.toLowerCase().replace(" ", "-")
                }
                sx={{
                  fontSize: "0.95rem",
                  letterSpacing: "0.5px",
                  minWidth: "auto",
                  px: 2,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: "rgba(255,255,255,0.15)",
                    transform: "translateY(-2px)",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                  },
                  "&::after": {
                    content: '""',
                    display: "block",
                    width: 0,
                    height: "2px",
                    background: "white",
                    transition: "width 0.3s",
                    position: "absolute",
                    bottom: "8px",
                  },
                  "&:hover::after": {
                    width: "60%",
                  },
                }}
              >
                {item}
              </Button>
            ))}

            <Box sx={{ display: "flex", gap: "8px", ml: 2 }}>
              <Button
                color="inherit"
                onClick={() => setLoginOpen(true)}
                sx={{
                  fontSize: "0.95rem",
                  letterSpacing: "0.5px",
                  minWidth: "auto",
                  px: 2,
                  transition: "all 0.3s ease",
                  border: "1px solid rgba(255,255,255,0.3)",
                  "&:hover": {
                    backgroundColor: "rgba(255,255,255,0.2)",
                    transform: "translateY(-2px)",
                  },
                }}
              >
                Login
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => setSignupOpen(true)}
                sx={{
                  fontSize: "0.95rem",
                  letterSpacing: "0.5px",
                  minWidth: "auto",
                  px: 2,
                  transition: "all 0.3s ease",
                  backgroundColor: "#4361ee",
                  "&:hover": {
                    backgroundColor: "#3a56d4",
                    transform: "translateY(-2px)",
                  },
                }}
              >
                Sign Up
              </Button>
            </Box>
          </Box>

          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerToggle}
            sx={{
              display: { md: "none" },
              ml: "auto",
            }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: 250,
            borderLeft: "1px solid rgba(255, 255, 255, 0.2)",
            background: "rgba(0, 0, 0, 0.9) !important",
            backdropFilter: "blur(12px)",
          },
        }}
      >
        {drawer}
      </Drawer>

      {/* Signup Dialog */}
      <SignupDialog open={signupOpen} onClose={() => setSignupOpen(false)} />

      {/* Login Dialog */}
      <Dialog
        open={loginOpen}
        onClose={() => setLoginOpen(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>
          <Typography variant="h5" align="center">
            Login to Your Account
          </Typography>
        </DialogTitle>
        <Divider />
        <form onSubmit={handleLoginSubmit}>
          <DialogContent>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {loginError && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {loginError}
                </Alert>
              )}

              <TextField
                required
                name="email"
                label="Email"
                type="email"
                variant="outlined"
                fullWidth
                value={loginData.email}
                onChange={handleLoginChange}
                disabled={loginLoading}
              />
              <TextField
                required
                name="password"
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                value={loginData.password}
                onChange={handleLoginChange}
                disabled={loginLoading}
              />
            </Box>
          </DialogContent>
          <DialogActions sx={{ p: 3, pt: 0 }}>
            <Button
              onClick={() => setLoginOpen(false)}
              color="error"
              sx={{ mr: "auto" }}
              disabled={loginLoading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={loginLoading}
              sx={{
                backgroundColor: "#4361ee",
                "&:hover": {
                  backgroundColor: "#3a56d4",
                },
              }}
            >
              {loginLoading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Login"
              )}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default Navbar;