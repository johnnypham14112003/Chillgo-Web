//Library
import { useState, useEffect, useRef, ChangeEvent, FormEvent } from "react";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

import IconLocationOn from "@mui/icons-material/LocationOnRounded";
import IconPhone from "@mui/icons-material/PhoneRounded";
import IconAlternateEmail from "@mui/icons-material/AlternateEmailRounded";

//Components
import { Header, Footer } from "../components/page layouts/Header_Footer";
import emailjs from "@emailjs/browser";
import ReCAPTCHA from "react-google-recaptcha";

const Contact_Page: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    //assign default value
    const savedTheme = localStorage.getItem("isDarkMode");
    return savedTheme === "true";
  });
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [recaptchaToken, setRecaptchaToken] = useState<string | number>("");
  const form = useRef<HTMLFormElement | null>(null);
  const [isLoading, setIsLoading] = useState(false);

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

  const validateEmail = (email: string) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setIsEmailValid(validateEmail(e.target.value));
  };

  // Xử lý khi người dùng hoàn thành reCAPTCHA
  const handleRecaptchaChange = (token: string | number) => {
    setRecaptchaToken(token);
  };

  //=============== Sent Mail =============================
  const handleSentMail = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!recaptchaToken) {
      alert("Vui lòng tích vào reCAPTCHA trước khi gửi");
      return;
    }

    const templateParams = {
      from_email: email,
      subject: subject,
      message: message,
      "g-recaptcha-response": recaptchaToken,
    };
    if (form.current) {
      setIsLoading(true);
      emailjs
        .send(
          "service_exe201",
          "template_exe201",
          templateParams,
          "5Kz1cm7Krze-triGA"
        )
        .then(
          () => {
            alert("Gửi thành công!");
            setIsLoading(false);
          },
          (error) => {
            alert(`Lỗi: ${error.text}`);
            setIsLoading(false);
          }
        );
    } else {
      alert("Form rỗng!");
    }
  };

  return (
    <div>
      <Header currentThemeMode={isDarkMode} onThemeChange={handleThemeChange} />

      <Container
        maxWidth="lg"
        component={"main"}
        sx={{
          position: "relative",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 4,
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `radial-gradient(circle at 10% 20%, rgba(216, 181, 255, 0.3) 0%, rgba(231, 172, 235, 0.3) 25%, rgba(218, 171, 235, 0.3) 50%, rgba(223, 157, 255, 0.3) 100%)`,
            filter: "blur(100px)",
            zIndex: -1,
          },
        }}
      >
        <Box
          sx={{
            borderRadius: "10px",
            boxShadow: 10,
            padding: 4,
            display: "flex",
            backgroundColor: "var(--secondary-text-color)",
            flexDirection: { xs: "column", md: "row" },
          }}
        >
          {/* Contact Info */}
          <Box
            sx={{
              marginBottom: 4,
              marginRight: 4,
              flex: 1,
            }}
          >
            <Typography
              variant="h5"
              sx={{
                color: isDarkMode
                  ? "var(--primary-text-color)"
                  : "var(--primary-button-color)",
              }}
              gutterBottom
            >
              <b>Phản Hồi Chúng Tôi</b>
            </Typography>
            <Box display="flex" alignItems="center" mb={2}>
              <IconLocationOn
                sx={{
                  color: "var(--primary-button-color)",
                  fontSize: "inherit",
                  marginRight: "8px",
                }}
              />
              <Typography
                sx={{
                  color: "var(--primary-text-color)",
                }}
              >
                Thủ Đức, Thành Phố Hồ Chí Minh
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" mb={2}>
              <IconPhone
                sx={{
                  color: "var(--primary-button-color)",
                  fontSize: "inherit",
                  marginRight: "8px",
                }}
              />
              <Typography
                sx={{
                  color: "var(--primary-text-color)",
                }}
              >
                (+84) 97 813 86 05
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" mb={2}>
              <IconAlternateEmail
                sx={{
                  color: "var(--primary-button-color)",
                  fontSize: "inherit",
                  marginRight: "8px",
                }}
              />
              <Typography
                sx={{
                  color: "var(--primary-text-color)",
                }}
              >
                support@chillgo.travel
              </Typography>
            </Box>
          </Box>

          {/* Form Sent Mail*/}
          <form ref={form} onSubmit={handleSentMail} style={{ flex: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  value={email}
                  onChange={handleEmailChange}
                  error={!isEmailValid}
                  helperText={!isEmailValid ? "Hãy nhập email hợp lệ" : ""}
                  inputProps={{ "aria-label": "Email" }}
                  sx={{
                    marginBottom: 2,
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
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Tiêu Đề"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  inputProps={{ "aria-label": "Tiêu Đề" }}
                  sx={{
                    marginBottom: 2,
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
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Nội Dung"
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  inputProps={{ "aria-label": "Nội Dung" }}
                  sx={{
                    marginBottom: 2,
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
              </Grid>

              <Grid item xs={12}>
                <ReCAPTCHA
                  sitekey="6LeABVwqAAAAAMG9xGXO0F48UaINfSznaON4XnQU"
                  onChange={handleRecaptchaChange}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={
                isLoading || !subject || !email || !message || !isEmailValid
              }
              sx={{
                marginTop: 2,
                padding: "1, 2",
                transition: "all 0.3s ease-in-out",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: 4,
                  backgroundColor: "var(--secondary-button-color)",
                  color: "var(--primary-text-color)",
                },
                color: "var(--background-color)",
                backgroundColor: "var(--primary-button-color)",
              }}
            >
              <b>{isLoading ? <CircularProgress size={24} /> : "Gửi Mail"}</b>
            </Button>
          </form>
        </Box>
      </Container>

      <Footer currentThemeMode={isDarkMode} />
    </div>
  );
};

export default Contact_Page;
