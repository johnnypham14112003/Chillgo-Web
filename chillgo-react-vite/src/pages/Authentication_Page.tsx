//Library
import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

import IconVisibility from "@mui/icons-material/VisibilityRounded";
import IconVisibilityOff from "@mui/icons-material/VisibilityOffRounded";

//Components
import { Header, Footer } from "../components/page layouts/Header_Footer";
import {
  validateEmail,
  validatePassword,
  validateFullName,
} from "../components/utils/Form_Validation";

//Assets
import IconFacebook from "../assets/images/facebook50px.png";
import IconGoogle from "../assets/images/google48px.png";

//Context
import { useAuth } from "../contexts/AuthContext";
import { loginFetch, signupFetch } from "../hooks/authService";

//=============================================================================================
const Authentication_Page = () => {
  //---------------------[ Declare ]-----------------------------
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    //assign default value
    const savedTheme = localStorage.getItem("isDarkMode");
    return savedTheme === "true";
  });
  const { loginHandle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [fullNameError, setFullNameError] = useState("");

  // Alert state
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });
  const handleCloseAlert = () => {
    setAlert({ ...alert, open: false });
  };

  const validateForm = (): boolean => {
    let isValid = true;

    // Reset errors
    setEmailError("");
    setPasswordError("");
    setFullNameError("");

    // Validate email
    if (!validateEmail(email)) {
      setEmailError("Email không hợp lệ");
      isValid = false;
    }

    // Validate password
    if (!validatePassword(password)) {
      setPasswordError("Mật khẩu phải có ít nhất 6 ký tự");
      isValid = false;
    }

    // Validate full name for signup
    if (isSignUp && !validateFullName(fullName)) {
      setFullNameError("Họ tên phải có ít nhất 2 ký tự");
      isValid = false;
    }

    return isValid;
  };

  // Lấy route muốn redirect về sau khi login
  const from = (location.state as { from?: Location })?.from?.pathname || "/";

  // ----------------------------------------------------------------
  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      isDarkMode ? "dark" : "light"
    );
  }, [isDarkMode]);

  const handleThemeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newTheme = event.target.checked;
    setIsDarkMode(newTheme);
    localStorage.setItem("isDarkMode", newTheme.toString());
  };

  // ----------------------------------------------------------------
  const handleToggleForm = () => {
    setIsSignUp(!isSignUp);
    setFullName("");
    setEmail("");
    setPassword("");
    setShowPassword(false);

    // Reset errors
    setEmailError("");
    setPasswordError("");
    setFullNameError("");
  };

  // ----------------------------------------------------------------
  const handleTogglePassword = () => setShowPassword((show) => !show);

  // ----------------------------------------------------------------
  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const response = await loginFetch({ email, password });
      loginHandle(response["account-info"]);

      setAlert({
        open: true,
        message: "Đăng nhập thành công!",
        severity: "success",
      });

      // Chuyển hướng dựa vào role
      if (
        ["Admin", "Nhân Viên Quản Lý"].includes(response["account-info"].role)
      ) {
        // navigate('/admin');
        navigate(from === "/authentication" ? "/admin/dashboard" : from);
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("Login failed:", error);
      setAlert({
        open: true,
        message: "Đăng nhập thất bại. Vui lòng kiểm tra lại email và mật khẩu.",
        severity: "error",
      });
    }
  };

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      await signupFetch({
        "full-name": fullName,
        email,
        password,
      });

      setAlert({
        open: true,
        message: "Đăng ký thành công! Vui lòng đăng nhập.",
        severity: "success",
      });

      // Switch to login form after successful registration
      setIsSignUp(false);

      // Reset form
      setFullName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      setAlert({
        open: true,
        message: "Đăng ký thất bại. Email có thể đã được sử dụng.",
        severity: "error",
      });
    }
  };

  // ----------------------------------------------------------------
  return (
    <div>
      <Header currentThemeMode={isDarkMode} onThemeChange={handleThemeChange} />

      <Container
        sx={{
          height: "90vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            borderRadius: "30px",
            boxShadow: "0 5px 15px rgba(0, 0, 0, 0.35)",
            width: "768px",
            maxWidth: "100%",
            minHeight: "530px",
            overflow: "hidden",
            position: "relative",
            display: "flex",
            flexDirection: "row",
            justifyContent: isSignUp ? "flex-end" : "flex-start",
          }}
        >
          {/* Sign In Form */}
          <Box
            sx={{
              width: { xs: "70%", sm: "50%" },
              padding: "40px",
              display: { xs: isSignUp ? "none" : "flex", sm: "flex" },
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              backgroundColor: "var(--secondary-text-color)",
            }}
          >
            <Typography variant="h5">
              <b>Đăng Nhập</b>
            </Typography>
            <TextField
              label="Email"
              placeholder="example@gmail.com"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!!emailError}
              helperText={emailError}
              sx={{
                my: 1,
                width: "100%",
                color: "var(--primary-text-color)",
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "var(--primary-text-color)",
                  },
                  "&:hover fieldset": {
                    borderColor: "var(--primary-button-color)",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#EEA0FF",
                  },
                  "& input": {
                    color: "var(--primary-text-color)", // Màu chữ trong TextField
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "var(--primary-text-color)", // Màu của label mặc định
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "var(--primary-text-color)", // Màu của label khi focus
                },
              }}
            />
            <TextField
              label="Mật Khẩu"
              type={showPassword ? "text" : "password"}
              placeholder="123456..."
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={!!passwordError}
              helperText={passwordError}
              InputProps={{
                endAdornment: password && (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleTogglePassword}
                      edge="end"
                    >
                      {showPassword ? (
                        <IconVisibilityOff />
                      ) : (
                        <IconVisibility />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                my: 1,
                width: "100%",
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "var(--primary-text-color)",
                  },
                  "&:hover fieldset": {
                    borderColor: "var(--primary-button-color)",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#EEA0FF",
                  },
                  "& input": {
                    color: "var(--primary-text-color)", // Màu chữ trong TextField
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "var(--primary-text-color)", // Màu của label mặc định
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "var(--primary-text-color)", // Màu của label khi focus
                },
              }}
            />
            <Button href="#">Quên Mật Khẩu?</Button>

            <Button
              variant="contained"
              onClick={handleLogin}
              sx={{
                my: 2,
                color: "var(--background-color)",
                backgroundColor: "var(--primary-button-color)",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: 4,
                  backgroundColor: "var(--secondary-button-color)",
                  color: "var(--primary-text-color)",
                },
              }}
            >
              Đăng nhập ngay
            </Button>

            <Typography variant="body2" sx={{ mt: 2 }}>
              Hoặc tiếp tục với
            </Typography>
            <Box>
              <IconButton
                href="#"
                sx={{
                  Width: "48px",
                  Height: "48px",
                  mx: "10px",
                }}
              >
                <img src={IconGoogle} alt="Icon Login Google" />
              </IconButton>
              <IconButton
                href="#"
                sx={{
                  Width: "48px",
                  Height: "48px",
                  mx: "10px",
                }}
              >
                <img src={IconFacebook} alt="Icon Login Facebook" />
              </IconButton>
            </Box>
          </Box>

          {/* Sign Up Form */}
          <Box
            sx={{
              width: { xs: "70%", sm: "50%" },
              padding: "40px",
              display: { xs: isSignUp ? "flex" : "none", sm: "flex" },
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              backgroundColor: "var(--secondary-text-color)",
            }}
          >
            <Typography variant="h5">
              <b>Tạo Tài Khoản</b>
            </Typography>
            <TextField
              label="Họ Và Tên"
              placeholder="Nguyễn Văn A"
              variant="outlined"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              error={!!fullNameError}
              helperText={fullNameError}
              sx={{
                my: 1,
                width: "100%",
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "var(--primary-text-color)",
                  },
                  "&:hover fieldset": {
                    borderColor: "var(--primary-button-color)",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#EEA0FF",
                  },
                  "& input": {
                    color: "var(--primary-text-color)", // Màu chữ trong TextField
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "var(--primary-text-color)", // Màu của label mặc định
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "var(--primary-text-color)", // Màu của label khi focus
                },
              }}
            />
            <TextField
              label="Email"
              placeholder="example@email.com"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!!emailError}
              helperText={emailError}
              sx={{
                my: 1,
                width: "100%",
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "var(--primary-text-color)",
                  },
                  "&:hover fieldset": {
                    borderColor: "var(--primary-button-color)",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#EEA0FF",
                  },
                  "& input": {
                    color: "var(--primary-text-color)", // Màu chữ trong TextField
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "var(--primary-text-color)", // Màu của label mặc định
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "var(--primary-text-color)", // Màu của label khi focus
                },
              }}
            />
            <TextField
              label="Mật Khẩu"
              type={showPassword ? "text" : "password"}
              placeholder="123456..."
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={!!passwordError}
              helperText={passwordError}
              InputProps={{
                endAdornment: password && (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleTogglePassword}
                      edge="end"
                    >
                      {showPassword ? (
                        <IconVisibilityOff />
                      ) : (
                        <IconVisibility />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                my: 1,
                width: "100%",
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "var(--primary-text-color)",
                  },
                  "&:hover fieldset": {
                    borderColor: "var(--primary-button-color)",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#EEA0FF",
                  },
                  "& input": {
                    color: "var(--primary-text-color)", // Màu chữ trong TextField
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "var(--primary-text-color)", // Màu của label mặc định
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "var(--primary-text-color)", // Màu của label khi focus
                },
              }}
            />
            <Button
              variant="contained"
              onClick={handleRegister}
              sx={{
                mt: 2,
                color: "var(--background-color)",
                backgroundColor: "var(--primary-button-color)",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: 4,
                  backgroundColor: "var(--secondary-button-color)",
                  color: "var(--primary-text-color)",
                },
              }}
            >
              Đăng Ký
            </Button>

            <Typography variant="body2" sx={{ mt: 2 }}>
              Hoặc tiếp tục với
            </Typography>
            <Box>
              <IconButton
                href="#"
                sx={{
                  Width: "48px",
                  Height: "48px",
                  mx: "10px",
                }}
              >
                <img src={IconGoogle} alt="Icon Login Google" />
              </IconButton>
              <IconButton
                href="#"
                sx={{
                  Width: "48px",
                  Height: "48px",
                  mx: "10px",
                }}
              >
                <img src={IconFacebook} alt="Icon Login Facebook" />
              </IconButton>
            </Box>

            {/* Alert Component */}
            <Snackbar
              open={alert.open}
              autoHideDuration={6000}
              onClose={handleCloseAlert}
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
              <Alert
                onClose={handleCloseAlert}
                severity={alert.severity}
                variant="filled"
              >
                {alert.message}
              </Alert>
            </Snackbar>
          </Box>

          {/* Toggle Panel */}
          <Box
            sx={{
              width: { xs: "30%", sm: "50%" },
              position: "absolute",
              top: 0,
              right: 0,
              height: "100%",
              zIndex: 1,
              backgroundImage: "var(--header-nav-color)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              transition: {
                xs: "transform 0.15s ease-in-out",
                sm: "transform 0.6s ease-in-out",
              },
              transform: {
                xs: isSignUp ? "translateX(-234%)" : "translateX(0)",
                sm: isSignUp ? "translateX(-100%)" : "translateX(0)",
              },
            }}
          >
            <Box sx={{ textAlign: "center" }}>
              <Typography variant="h5">
                {isSignUp ? "Xin Chào!" : "Chào Mừng Trở Lại!"}
              </Typography>
              <Typography sx={{ my: 4, mx: 5 }}>
                {isSignUp
                  ? "Nếu bạn đã có tài khoản thì có thể đăng nhập ngay"
                  : "Nếu bạn chưa có tài khoản thì có thể tạo tài khoản mới"}
              </Typography>
              <Button
                onClick={handleToggleForm}
                sx={{
                  mt: 1,
                  fontSize: 22,
                  color: "#cdee00",
                }}
              >
                <b>{isSignUp ? "Đăng Nhập" : "Đăng Ký"}</b>
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>

      <Footer currentThemeMode={isDarkMode} />
    </div>
  );
};

export default Authentication_Page;
