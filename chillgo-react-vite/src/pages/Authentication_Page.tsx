//Library
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";

//Components
import { Header, Footer } from "../components/page layouts/Header_Footer";

//Assets
import IconFacebook from "../assets/images/facebook50px.png";
import IconGoogle from "../assets/images/google48px.png";

// URL server từ biến môi trường
const Server_URL = import.meta.env.VITE_SERVER_URL;

//=============================================================================================
const Authentication_Page = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    //assign default value
    const savedTheme = localStorage.getItem("isDarkMode");
    return savedTheme === "true";
  });
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);

  // ----------------------------------------------------------------
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

  // ----------------------------------------------------------------
  const handleToggleForm = () => {
    setIsSignUp(!isSignUp);
    setFullName("");
    setEmail("");
    setPassword("");
  };

  // ----------------------------------------------------------------
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Thực hiện gọi API
      const response = await fetch(`${Server_URL}/api/accounts/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (!response.ok) {
        alert(`Đã có lỗi xảy ra: ${response.body}`);
      }

      const data = await response.json();

      // Kiểm tra role trong response và chuyển hướng nếu cần
      const role = data["account-info"].role;
      if (role === "Admin" || role === "Nhân Viên") {
        // Chuyển hướng đến trang Dashboard
        navigate("/dashboard");
      } else {
        // Nếu role không phải là Admin hoặc Nhân Viên thì có thể xử lý logic khác
        setError("Bạn không có quyền truy cập trang Dashboard.");
      }

    } catch (err) {
      alert("Đăng nhập thất bại. Vui lòng kiểm tra lại email và mật khẩu.");
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
              onChange={(e) => setEmail(e.target.value)}
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
              type="password"
              placeholder="Password"
              variant="outlined"
              onChange={(e) => setPassword(e.target.value)}
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

            <Typography variant="body2" sx={{ mt: 2 }}>Hoặc tiếp tục với</Typography>
            <Box >
              <IconButton
                href="#"
                sx={{
                  Width: "48px",
                  Height: "48px",
                  mx:"10px"
                }}
              >
                <img src={IconGoogle} alt="Icon Login Google" />
              </IconButton>
              <IconButton href="#" sx={{
                  Width: "48px",
                  Height: "48px",
                  mx:"10px"
                }}>
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
              onChange={(e) => setFullName(e.target.value)}
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
              onChange={(e) => setEmail(e.target.value)}
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
              type="password"
              placeholder="123456..."
              variant="outlined"
              onChange={(e) => setPassword(e.target.value)}
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

            <Typography variant="body2" sx={{ mt: 2 }}>Hoặc tiếp tục với</Typography>
            <Box >
              <IconButton
                href="#"
                sx={{
                  Width: "48px",
                  Height: "48px",
                  mx:"10px"
                }}
              >
                <img src={IconGoogle} alt="Icon Login Google" />
              </IconButton>
              <IconButton href="#" sx={{
                  Width: "48px",
                  Height: "48px",
                  mx:"10px"
                }}>
                <img src={IconFacebook} alt="Icon Login Facebook" />
              </IconButton>
            </Box>

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
