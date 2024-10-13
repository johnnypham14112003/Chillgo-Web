//Library
import { useState, useEffect, ChangeEvent } from "react";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";

//Components
import { Header, Footer } from "../components/page layouts/Header_Footer";

//Assets
import ImageAppIcon from "../assets/images/logo/app-icon.png";
import ImageAppOnMobile from "../assets/images/mockups/app-on-mobile.png";
import IconGooglePlay from "../assets/svgs/Google_Play.svg";
import IconAndroid from "../assets/svgs/Android.svg";

//=============================================================================================
const Download_Page = () => {
  //---------------------[ Declare ]-----------------------------
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    //assign default value
    const savedTheme = localStorage.getItem("isDarkMode");
    return savedTheme === "true";
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

  const handleDownload = (type: string) => {
    setLoading(true);
    setError("");

    // Simulating download process
    setTimeout(() => {
      const success = Math.random() > 0.2; // 80% success rate
      if (success) {
        setLoading(false);
        alert(`${type} download started successfully!`);
      } else {
        setLoading(false);
        setError(`Failed to start ${type} download. Please try again.`);
      }
    }, 2000);
  };

  return (
    <div>
      <Header currentThemeMode={isDarkMode} onThemeChange={handleThemeChange} />
      
      <Container
        component="main"
        maxWidth="xl"
        sx={{ position: "relative", pb: "50px" }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: -1,
            pointerEvents: "none",
            overflow: "hidden",
            "&::before, &::after": {
              content: '""',
              position: "absolute",
              zIndex: -1,
              width: "300px",
              height: "300px",
              borderRadius: "50%",
              filter: "blur(60px)",
              opacity: 0.4,
            },
            "&::before": {
              background: "var(--special-color)",
              top: "-150px",
              left: "-100px",
            },
            "&::after": {
              background: "var(--secondary-button-highlight-lighter-color)",
              bottom: "-150px",
              right: "-100px",
            },
          }}
        />

        <Container maxWidth="md">
          {/* Display Image */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              mb: "10px",
            }}
          >
            {/* App Screen Mockup */}
            <Box
              sx={{
                maxWidth: "calc(100vw - 70%)",
              }}
            >
              <img
                src={ImageAppOnMobile}
                alt="App-mobile-mockup"
                style={{ width: "100%", maxHeight: "490px" }}
              />
            </Box>

            {/* App Icon */}
            <Box></Box>
            <img
              src={ImageAppIcon}
              alt="App-icon-image"
              style={{
                display: "flex",
                width: "calc(100vw - 99%)",
                maxWidth: "80px",
                borderRadius: "15px",
                border: "1px solid var(--primary-text-color)",
              }}
            />
          </Box>

          {/* Display Main Content */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <Typography
              component="h1"
              gutterBottom
              sx={{
                fontSize: { xs: "22px", sm: "27px" },
              }}
            >
              <b>Chillgo</b>
            </Typography>
            <Typography
              component="p"
              sx={{ mb: 4, fontSize: { xs: "15px", sm: "17px", md: "20px" } }}
            >
              Ứng dụng hỗ trợ du lịch thông minh. Hãy tải về máy bạn để trải
              nghiệm ứng dụng tuyệt vời của chúng tôi!
            </Typography>

            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                gap: 3,
                width: "100%",
                maxWidth: "500px",
              }}
            >
              <Button
                variant="contained"
                fullWidth
                onClick={() => handleDownload("Google Play")}
                disabled={loading}
                aria-label="Download from Google Play"
                sx={{
                  fontSize: { xs: "15px", sm: "17px", md: "20px" },
                  fontWeight: "bold",
                  borderRadius: "10px",
                  boxShadow: ["4"],
                  color: "var(--secondary-text-color)",
                  backgroundColor: "var(--primary-text-color)",
                  transition: "all 0.3s ease-in-out",
                  "&:hover": {
                    transform: "translateY(-3px)",
                    boxShadow: 8,
                    backgroundColor: "#c665dc",
                  },
                }}
              >
                <img
                  src={IconGooglePlay}
                  alt="Google-Play-Icon"
                  style={{ maxWidth: "35px", margin: "5px 5px 5px 0" }}
                />
                Tải từ Google Play
              </Button>
              <Button
                variant="contained"
                color="secondary"
                //startIcon={<FaAndroid />}
                fullWidth
                onClick={() => handleDownload("APK")}
                disabled={loading}
                aria-label="Download APK file"
                sx={{
                  fontSize: { xs: "15px", sm: "17px", md: "20px" },
                  fontWeight: "bold",
                  color: "var(--secondary-text-color)",
                  backgroundColor: "#6F74F0",
                  borderRadius: "10px",
                  boxShadow: ["4"],
                  transition: "all 0.3s ease-in-out",
                  "&:hover": {
                    transform: "translateY(-3px)",
                    boxShadow: 8,
                    backgroundColor: "#c665dc",
                  },
                }}
              >
                <img
                  src={IconAndroid}
                  alt="Google-Play-Icon"
                  style={{ maxWidth: "35px", margin: "5px 10px 5px 0" }}
                />
                Tải file APK
              </Button>
            </Box>

            {loading && (
              <CircularProgress
                sx={{ mt: 3 }}
                aria-label="Download in progress"
              />
            )}

            <Typography
              variant="body2"
              sx={{
                mt: 4,
                fontStyle: "italic",
                fontSize: { xs: "13px", sm: "14px", md: "15px" },
              }}
            >
              File APK là file gốc ban đầu của ứng dụng Chillgo.
              <br />
              Nên đảm bảo 100% an toàn và không có vi-rút để tải nếu bạn không
              thể tải từ Google Play.
            </Typography>

            <Typography
              variant="body2"
              sx={{
                mt: 4,
                fontStyle: "italic",
                fontSize: { xs: "13px", sm: "14px", md: "15px" },
                "& a": {
                  color: "var(--primary-button-color)",
                  textDecoration: "underline",
                },
              }}
            >
              Hướng dẫn cài File APK <a href="/faqs">tại đây</a>
            </Typography>
          </Box>

          <Snackbar
            open={!!error}
            autoHideDuration={6000}
            onClose={() => setError("")}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          >
            <Alert
              onClose={() => setError("")}
              severity="error"
              sx={{ width: "100%" }}
            >
              {error}
            </Alert>
          </Snackbar>
          
        </Container>
      </Container>

      <Footer currentThemeMode={isDarkMode} />
    </div>
  );
};

export default Download_Page;
