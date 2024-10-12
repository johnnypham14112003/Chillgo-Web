//Library
import { useState, useEffect } from "react";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

//Components
import { Header, Footer } from "../components/page layouts/Header_Footer";

//Assets
import ImageChillgoMascosBot from "../assets/images/mascos/sad-mascos.png";
import ImageDesertMountain from "../assets/images/not-found.png";

const NotFound_Page= () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    //assign default value
    const savedTheme = localStorage.getItem("isDarkMode");
    return savedTheme === "true";
  });

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
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",

            position: "relative",
            minHeight: "100vh",
            backgroundImage: `url(${ImageDesertMountain})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundAttachment: "fixed",
            backgroundPosition: "center",
            //Overlay
            "::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "var(--secondary-special-color)",
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              zIndex: 1,
              alignItems: "center",
              mt: "2em",
              padding: "0 2em 2em",
              borderRadius: "50% 50% 50% 50% / 85% 85% 15% 15% ",
              backgroundImage:
                "linear-gradient(transparent 40% ,var(--background-color) 75%)",
            }}
          >
            <img
              src={ImageChillgoMascosBot}
              alt="sad-chillgo-robot"
              style={{ maxWidth: "200px", filter: "saturate(3) brightness(0.87)" }}
            />
            <Typography
              component="h1"
              sx={{ fontSize: { xs: 20, md: 27, lg: 34 } }}
              gutterBottom
            >
              <b>Lỗi : Không Tìm Thấy</b>
            </Typography>
            <Typography
              component="h4"
              sx={{ fontSize: { xs: 14, md: 17, lg: 20 } }}
              gutterBottom
            >
              <b>Mã Lỗi: 404</b>
            </Typography>
            <Typography
              component="p"
              sx={{ fontSize: { xs: 14, md: 17, lg: 20 } , textAlign:"center"}}
              gutterBottom
            >
              Địa chỉ trang mà bạn đang cố gắng truy cập tới không đúng hoặc
              không tồn tại
            </Typography>
          </Box>
        </Container>
      </main>
      <Footer currentThemeMode={isDarkMode} />
    </div>
  );
};

export default NotFound_Page;
