//Library
import { useState, useEffect, ChangeEvent } from "react";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import OutlinedInput from "@mui/material/OutlinedInput";
import Checkbox from "@mui/material/Checkbox";
import Divider from "@mui/material/Divider";

//Components
import { Header, Footer } from "../components/page layouts/Header_Footer";

const Authentication_Page = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    //assign default value
    const savedTheme = localStorage.getItem("isDarkMode");
    return savedTheme === "true";
  });
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignup, setIsSignup] = useState<boolean>(true);

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      isDarkMode ? "dark" : "light"
    );
  }, [isDarkMode]);

  const handleThemeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTheme = event.target.checked;
    setIsDarkMode(newTheme);
    localStorage.setItem("isDarkMode", newTheme.toString());
  };

  return (
    <div>
      <Header currentThemeMode={isDarkMode} onThemeChange={handleThemeChange} />
      <main>
        <Container
          component={"section"}
          maxWidth="xl"
          className="container"
          id="container"
        >
          <Box
            className="form-container sign-up"
            sx={{ display: "flex", flexDirection: "column" }}
          >
            <form>
              <h1>Create Account</h1>
              <Box className="social-icons" sx={{ margin: "20px 0" }}>
                <Typography
                  component="a"
                  href="#"
                  sx={{
                    color: "#333",
                    fontSize: "13px",
                    textDecoration: "none",
                    border: "1px solid #ccc",
                    borderRadius: "20%",
                    display: "inline-flex",
                    justifyContent: "center",
                    alignItems: "center",
                    margin: "0 3px",
                    width: "40px",
                    height: "40px",
                  }}
                >
                  G
                </Typography>
                <Typography
                  component="a"
                  href="#"
                  sx={{
                    color: "#333",
                    fontSize: "13px",
                    textDecoration: "none",
                    border: "1px solid #ccc",
                    borderRadius: "20%",
                    display: "inline-flex",
                    justifyContent: "center",
                    alignItems: "center",
                    margin: "0 3px",
                    width: "40px",
                    height: "40px",
                  }}
                >
                  F
                </Typography>
                <Typography
                  component="a"
                  href="#"
                  sx={{
                    color: "#333",
                    fontSize: "13px",
                    textDecoration: "none",
                    border: "1px solid #ccc",
                    borderRadius: "20%",
                    display: "inline-flex",
                    justifyContent: "center",
                    alignItems: "center",
                    margin: "0 3px",
                    width: "40px",
                    height: "40px",
                  }}
                >
                  Git
                </Typography>
                <Typography
                  component="a"
                  href="#"
                  sx={{
                    color: "#333",
                    fontSize: "13px",
                    textDecoration: "none",
                    border: "1px solid #ccc",
                    borderRadius: "20%",
                    display: "inline-flex",
                    justifyContent: "center",
                    alignItems: "center",
                    margin: "0 3px",
                    width: "40px",
                    height: "40px",
                  }}
                >
                  Linkedin
                </Typography>
              </Box>
              <span>or use your email for registeration</span>
              <input type="text" placeholder="Name" />
              <input type="email" placeholder="Email" />
              <input type="password" placeholder="Password" />
              <button>Sign Up</button>
            </form>
          </Box>
          <Box className="form-container sign-in">
            <form>
              <h1>Sign In</h1>
              <div className="social-icons">
                <a href="#" className="icon">
                  <i className="fa-brands fa-google-plus-g"></i>
                </a>
                <a href="#" className="icon">
                  <i className="fa-brands fa-facebook-f"></i>
                </a>
                <a href="#" className="icon">
                  <i className="fa-brands fa-github"></i>
                </a>
                <a href="#" className="icon">
                  <i className="fa-brands fa-linkedin-in"></i>
                </a>
              </div>
              <span>or use your email password</span>
              <input type="email" placeholder="Email" />
              <input type="password" placeholder="Password" />
              <a href="#">Forget Your Password?</a>
              <button>Sign In</button>
            </form>
          </Box>
          <div className="toggle-container">
            <div className="toggle">
              <div className="toggle-panel toggle-left">
                <h1>Welcome Back!</h1>
                <p>Enter your personal details to use all of site features</p>
                <button className="hidden" id="login">
                  Sign In
                </button>
              </div>
              <div className="toggle-panel toggle-right">
                <h1>Hello, Friend!</h1>
                <p>
                  Register with your personal details to use all of site
                  features
                </p>
                <button className="hidden" id="register">
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </Container>
      </main>
      <Footer currentThemeMode={isDarkMode} />
    </div>
  );
};

export default Authentication_Page;
