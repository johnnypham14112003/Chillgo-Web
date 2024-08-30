//Libraries
import React, { useState, useEffect, SyntheticEvent } from "react";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import { styled } from "@mui/material/styles";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";

//Components
import { Header, Footer } from "../components/page layouts/Header_Footer";
import { ButtonArrowR3d } from "../components/buttons/Button_Arrow_R_3d";

//Assets
import ChillgoMobileMockup from "../assets/images/mockups/chillgo-on-iphone.png";

import IconPermDeviceInformation from "@mui/icons-material/PermDeviceInformationRounded";
import IconChecklist from "@mui/icons-material/ChecklistRounded";
import IconAssistant from "@mui/icons-material/AssistantRounded";
import IconBookOnline from "@mui/icons-material/BookOnlineRounded";
import IconCardGiftcard from "@mui/icons-material/CardGiftcardRounded";
import IconLocationOn from "@mui/icons-material/LocationOnRounded";
import IconExpandMore from "@mui/icons-material/ExpandMore";

//=============================================================================
//------------------------[ Declaration ]------------------------

//------------------------[ Main Implement ]------------------------
const Landing_Page = () => {
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

    const handleResize = () => {
      setFontSize(getFontSize_ButtonR3d());
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isDarkMode]);

  //-------------------------------------------------------------------------------
  //----------------------------[ Handle Toggle Theme ]----------------------------
  const handleThemeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTheme = event.target.checked;
    setIsDarkMode(newTheme);
    localStorage.setItem("isDarkMode", newTheme.toString());
  };

  //---------------------------------------------------------------------
  //----------------------------[ Handle Resize Button 3d ]----------------------------
  const getFontSize_ButtonR3d = (): string => {
    if (window.innerWidth >= 1200) {
      return "23px";
    } else if (window.innerWidth >= 600) {
      return "20px";
    } else {
      return "17px";
    }
  };
  const [fontSize, setFontSize] = useState(getFontSize_ButtonR3d());

  //---------------------------------------------------------------------
  //----------------------------[ Declaration Accordion Component ]----------------------------
  const Accordion = styled((props: AccordionProps) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
  ))(() => ({
    border: `1px solid green`,
    "&:not(:last-child)": {
      borderBottom: 0,
    },
    "&::before": {
      display: "none",
    },
  }));

  const [expanded, setExpanded] = useState<string | false>("panel1");

  const handleChange =
    (panel: string) => (_event: SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  //-------------------------------------------------------------------
  //----------------------------[ UI View ]----------------------------
  return (
    <div
      className="current-theme-app body-wrap  boxed-container"
      style={{ fontFamily: "Montserrat" }}
      data-theme={isDarkMode ? "dark-theme" : "light-theme"}
    >
      <Header currentThemeMode={isDarkMode} onThemeChange={handleThemeChange} />

      <main>
        {/* Hero Section */}
        <Container
          id="hero"
          component="section"
          maxWidth="xl"
          sx={{
            mt: "3em",
            mb: { xs: "5em", md: "7em" },
          }}
        >
          {/* Responsive Container */}
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignItems: "center",
              mx: { xs: "30px", md: "none" },
            }}
          >
            {/* Text Display */}
            <Box
              sx={{
                flex: 1,
                textAlign: { xs: "center", md: "left" },
                ml: { xs: 0, md: "50px", lg: "100px" },
              }}
            >
              <Typography
                component="h1"
                sx={{ fontSize: { xs: 20, md: 27, lg: 34 } }}
                gutterBottom
              >
                <b>
                  Trải Nghiệm Du Lịch Thông Minh Với{" "}
                  <Typography
                    component="span"
                    sx={{
                      display: "inline-flex",
                      color: isDarkMode
                        ? "var(--primary-text-color)"
                        : "var(--primary-button-color)",
                      fontSize: "inherit",
                      fontWeight: "inherit",
                    }}
                  >
                    Chill
                    <span
                      style={{
                        color: "#CDEE00",
                        fontSize: "inherit",
                        fontWeight: "inherit",
                        textShadow: "0 0 1.5px #000000",
                      }}
                    >
                      g
                    </span>
                    o
                  </Typography>
                </b>
              </Typography>
              <Typography
                component="p"
                sx={{ fontSize: { xs: 14, md: 17, lg: 20 } }}
                gutterBottom
              >
                Khám phá, lên kế hoạch và đặt vé du lịch Việt Nam chỉ trong vài
                bước đơn giản với sự hỗ trợ từ AI thông minh. Hãy là người đầu
                tiên trải nghiệm!
              </Typography>

              {/* Action Buttons Container */}
              <Box
                sx={{
                  mt: 4,
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: { xs: "center", md: "flex-end" },
                  alignItems: "center",
                }}
              >
                <Button
                  component="a" //html tag <a>
                  href="#about"
                  disableRipple
                  variant="text"
                  sx={{
                    fontSize: { xs: "14px", md: "15px", lg: "17px" },
                    mr: 4,
                    height: "3em",
                    textTransform: "none",
                    ":hover": {
                      color: "var(--primary-button-color)",
                      backgroundColor:
                        "var(--secondary-button-highlight-lighter-color)",
                    },
                  }}
                >
                  Tìm Hiểu Thêm
                </Button>

                <Typography
                  component="a" //html tag <a>
                  href="download"
                  sx={{
                    fontSize: { xs: "15px", md: "17px", lg: "19px" },
                    height: { xs: "60px", md: "70px", lg: "80px" },
                    width: { xs: "160px", md: "190px", lg: "200px" },
                  }}
                >
                  <ButtonArrowR3d
                    fontSizeValue={fontSize}
                    textDisplay="Thử Ngay"
                    textClickedDisplay="Bắt Đầu"
                  ></ButtonArrowR3d>
                </Typography>
              </Box>
            </Box>

            {/* Mobile Mockup */}
            <Box
              sx={{
                flex: 1,
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                mt: { xs: 4, md: 0 },
              }}
            >
              <Box
                sx={{
                  mr: { xs: -7, md: -4, lg: 0 },
                  flexDirection: "column",
                  alignContent: "flex-start",
                }}
              >
                <svg width="124" height="75" xmlns="http://www.w3.org/2000/svg">
                  <g fill="none" fill-rule="evenodd">
                    <path
                      fill="#FFF"
                      d="M33.392 0l3.624 1.667.984 3.53-1.158 3.36L33.392 10l-3.249-1.639L28 5.196l1.62-3.674z"
                    />
                    <path
                      fill="#7487A3"
                      d="M74.696 3l1.812.833L77 5.598l-.579 1.68L74.696 8l-1.624-.82L72 5.599l.81-1.837z"
                    />
                    <path
                      fill="#556B8B"
                      d="M40.696 70l1.812.833.492 1.765-.579 1.68-1.725.722-1.624-.82L38 72.599l.81-1.837z"
                    />
                    <path
                      fill="#7487A3"
                      d="M4.314 37l2.899 1.334L8 41.157l-.926 2.688L4.314 45l-2.6-1.31L0 41.156l1.295-2.94zM49.314 32l2.899 1.334.787 2.823-.926 2.688L49.314 40l-2.6-1.31L45 36.156l1.295-2.94z"
                    />
                    <path
                      fill="#556B8B"
                      d="M99.696 56l1.812.833.492 1.765-.579 1.68-1.725.722-1.624-.82L97 58.599l.81-1.837zM112.696 37l1.812.833.492 1.765-.579 1.68-1.725.722-1.624-.82L110 39.599l.81-1.837zM82.696 37l1.812.833.492 1.765-.579 1.68-1.725.722-1.624-.82L80 39.599l.81-1.837zM122.618 57l1.087.5.295 1.059-.347 1.008-1.035.433-.975-.492-.643-.95.486-1.101z"
                    />
                  </g>
                </svg>
              </Box>

              <Box
                sx={{
                  width: {
                    xs: "130px",
                    sm: "190px",
                    md: "230px",
                    lg: "250px",
                  },
                  zIndex: 1,
                  justifyContent: "center",
                }}
              >
                <img
                  src={ChillgoMobileMockup}
                  alt="App preview"
                  style={{ width: "100%" }}
                />
              </Box>

              <Box
                sx={{
                  ml: { xs: -7, md: -4, lg: 0 },
                  flexDirection: "column",
                  alignContent: "flex-end",
                }}
              >
                <svg width="124" height="75" xmlns="http://www.w3.org/2000/svg">
                  <g fill="none" fill-rule="evenodd">
                    <path
                      fill="#556B8B"
                      d="M33.392 0l3.624 1.667.984 3.53-1.158 3.36L33.392 10l-3.249-1.639L28 5.196l1.62-3.674zM74.696 3l1.812.833L77 5.598l-.579 1.68L74.696 8l-1.624-.82L72 5.599l.81-1.837zM40.696 70l1.812.833.492 1.765-.579 1.68-1.725.722-1.624-.82L38 72.599l.81-1.837zM4.314 37l2.899 1.334L8 41.157l-.926 2.688L4.314 45l-2.6-1.31L0 41.156l1.295-2.94zM49.314 32l2.899 1.334.787 2.823-.926 2.688L49.314 40l-2.6-1.31L45 36.156l1.295-2.94z"
                    />
                    <path
                      fill="#FFF"
                      d="M99.696 56l1.812.833.492 1.765-.579 1.68-1.725.722-1.624-.82L97 58.599l.81-1.837z"
                    />
                    <path
                      fill="#556B8B"
                      d="M112.696 37l1.812.833.492 1.765-.579 1.68-1.725.722-1.624-.82L110 39.599l.81-1.837z"
                    />
                    <path
                      fill="#FFF"
                      d="M82.696 37l1.812.833.492 1.765-.579 1.68-1.725.722-1.624-.82L80 39.599l.81-1.837z"
                    />
                    <path
                      fill="#556B8B"
                      d="M122.618 57l1.087.5.295 1.059-.347 1.008-1.035.433-.975-.492-.643-.95.486-1.101z"
                    />
                  </g>
                </svg>
              </Box>
            </Box>
          </Box>
        </Container>

        {/* About Section */}
        <Container
          id="about"
          component={"section"}
          maxWidth="lg"
          sx={{ mb: { xs: "5em", md: "7em" } }}
        >
          <Paper
            elevation={5}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              padding: "3em 5em",
              mb: { xs: "5em", md: "7em" },
              border: "1px solid #EEA0FF55",
              borderRadius: "12px",
              backgroundColor: "var(--secondary-text-color)",
            }}
          >
            <Typography
              component="h4"
              sx={{ fontSize: { xs: 20, md: 27, lg: 34 } }}
              gutterBottom
            >
              <b>Ứng Dụng Du Lịch Đột Phá Dành Cho Bạn</b>
            </Typography>
            <Typography
              component="p"
              sx={{ fontSize: { xs: 14, md: 17, lg: 20 } }}
              gutterBottom
            >
              Chúng tôi hiểu rằng việc lên kế hoạch du lịch có thể phức tạp và
              tốn thời gian.
              <br />
              <br />
              <b>
                <Typography
                  component="span"
                  sx={{
                    display: "inline-flex",
                    color: isDarkMode
                      ? "var(--primary-text-color)"
                      : "var(--primary-button-color)",
                    fontSize: "inherit",
                    fontWeight: "inherit",
                  }}
                >
                  Chill
                  <b
                    style={{
                      color: "#CDEE00",
                      textShadow: "0 0 1.5px #000000",
                    }}
                  >
                    g
                  </b>
                  o
                </Typography>
              </b>{" "}
              được thiết kế để giúp bạn dễ dàng khám phá các điểm đến tuyệt vời,
              tìm hiểu thông tin chi tiết và đặt vé chỉ bằng vài thao tác đơn
              giản.
              <br />
              <br />
              Với sự hỗ trợ của công nghệ AI, chúng tôi giúp bạn lên kế hoạch
              một cách tối ưu nhất, không cần phải tìm kiếm nhiều nguồn thông
              tin, mọi thứ đều có trong một ứng dụng duy nhất.
            </Typography>
          </Paper>

          {/* Feature Wrap Container */}
          <Paper
            elevation={5}
            sx={{
              display: "flex",
              flexDirection: "column",
              backgroundImage: "var(--header-nav-color)",
              borderRadius: "12px",
              border: "1px solid #EEA0FF2A",
            }}
          >
            <Typography
              component="h4"
              sx={{
                display: "flex",
                justifyContent: { xs: "center", md: "flex-start" },
                ml: { xs: 0, md: "3em", lg: "2.3em" },
                mt: "1em",
                fontSize: { xs: 20, md: 27, lg: 34 },
              }}
              gutterBottom
            >
              <b>
                Tại sao bạn nên chọn{" "}
                <Typography
                  component="span"
                  sx={{
                    display: "inline-flex",
                    color: isDarkMode
                      ? "var(--primary-text-color)"
                      : "var(--primary-button-color)",
                    fontSize: "inherit",
                    fontWeight: "inherit",
                  }}
                >
                  Chill
                  <b
                    style={{ color: "#CDEE00", textShadow: "0 0 3px #000000" }}
                  >
                    g
                  </b>
                  o
                </Typography>
                {" ?"}
              </b>
            </Typography>

            {/* Feature Containers */}
            <MenuList
              sx={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-evenly",
                fontSize: { xs: 14, md: 17, lg: 20 },
              }}
            >
              <MenuItem
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "30px",
                  mb: "1em",
                  maxWidth: { xs: "90%", md: "45%", lg: "30%" },
                  textWrap: "wrap",
                  fontSize: "inherit",
                  backgroundImage:
                    "linear-gradient(var(--secondary-text-color), transparent)",
                  borderRadius: {
                    xs: "150px 150px 0px 0px",
                    md: "150px 0px 0px 0px",
                    lg: "150px 0px 0px 0px",
                  },
                }}
              >
                <IconPermDeviceInformation
                  sx={{
                    color: "var(--primary-button-color)",
                    fontSize: "inherit",
                  }}
                />
                <Typography
                  component="h6"
                  sx={{
                    color: "var(--primary-button-color)",
                    fontSize: "inherit",
                  }}
                >
                  <b>Thông Tin Chi Tiết</b>
                </Typography>
                <Typography component="p" sx={{ fontSize: "inherit" }}>
                  Mọi thông tin về địa điểm, hướng dẫn viên, điểm dừng chân đều
                  được chúng tôi hiển thị chi tiết và cập nhật liên tục từ nhiều
                  nguồn khác nhằm tiết kiệm thời gian cho bạn.
                </Typography>
              </MenuItem>
              <MenuItem
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "30px",
                  mb: "1em",
                  maxWidth: { xs: "90%", md: "45%", lg: "30%" },
                  textWrap: "wrap",
                  fontSize: "inherit",
                  backgroundImage:
                    "linear-gradient(var(--secondary-text-color), transparent)",
                  borderRadius: {
                    xs: "10px",
                    md: "10px 150px 0px 0px",
                    lg: "10px",
                  },
                }}
              >
                <IconChecklist
                  sx={{
                    color: "var(--primary-button-color)",
                    fontSize: "inherit",
                  }}
                />
                <Typography
                  component="h6"
                  sx={{
                    color: "var(--primary-button-color)",
                    fontSize: "inherit",
                  }}
                >
                  <b>Tạo Kế Hoạch Du Lịch</b>
                </Typography>
                <Typography component="p" sx={{ fontSize: "inherit" }}>
                  Ứng dụng hỗ trợ cho phep bạn tạo và lưu trữ kế hoạch du lịch
                  với thời gian, địa điểm chi tiết để có một hành trình hoàn
                  hảo.
                </Typography>
              </MenuItem>
              <MenuItem
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "30px",
                  mb: "1em",
                  maxWidth: { xs: "90%", md: "45%", lg: "30%" },
                  textWrap: "wrap",
                  fontSize: "inherit",
                  backgroundImage:
                    "linear-gradient(var(--secondary-text-color), transparent)",
                  borderRadius: {
                    xs: "10px",
                    md: "10px",
                    lg: "0px 150px 0px 0px",
                  },
                }}
              >
                <IconAssistant
                  sx={{
                    color: "var(--primary-button-color)",
                    fontSize: "inherit",
                  }}
                />
                <Typography
                  component="h6"
                  sx={{
                    color: "var(--primary-button-color)",
                    fontSize: "inherit",
                  }}
                >
                  <b>AI Hỗ Trợ 24/7</b>
                </Typography>
                <Typography component="p" sx={{ fontSize: "inherit" }}>
                  Ứng dụng tích hợp AI cho phép người dùng hỏi đáp và lên kế
                  hoạch du lịch nhanh chóng chỉ với vài dòng tin nhắn.
                </Typography>
              </MenuItem>
              <MenuItem
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "30px",
                  mb: "1em",
                  maxWidth: { xs: "90%", md: "45%", lg: "30%" },
                  textWrap: "wrap",
                  fontSize: "inherit",
                  backgroundImage:
                    "linear-gradient(var(--secondary-text-color), transparent)",
                  borderRadius: "10px",
                }}
              >
                <IconBookOnline
                  sx={{
                    color: "var(--primary-button-color)",
                    fontSize: "inherit",
                  }}
                />
                <Typography
                  component="h6"
                  sx={{
                    color: "var(--primary-button-color)",
                    fontSize: "inherit",
                  }}
                >
                  <b>Đặt Vé Tiện Lợi</b>
                </Typography>
                <Typography component="p" sx={{ fontSize: "inherit" }}>
                  Đối với các dịch vụ du lịch trả phí, chúng tôi hỗ trợ liên kết
                  các đối tác nhằm cung cấp khả năng thanh toán trực tuyến, an
                  toàn và bảo mật cho người dùng.
                </Typography>
              </MenuItem>
              <MenuItem
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "30px",
                  mb: "1em",
                  maxWidth: { xs: "90%", md: "45%", lg: "30%" },
                  textWrap: "wrap",
                  fontSize: "inherit",
                  backgroundImage:
                    "linear-gradient(var(--secondary-text-color), transparent)",
                  borderRadius: "10px",
                }}
              >
                <IconCardGiftcard
                  sx={{
                    color: "var(--primary-button-color)",
                    fontSize: "inherit",
                  }}
                />
                <Typography
                  component="h6"
                  sx={{
                    color: "var(--primary-button-color)",
                    fontSize: "inherit",
                  }}
                >
                  <b>Hệ Thống Nhiệm Vụ Ưu Đãi</b>
                </Typography>
                <Typography component="p" sx={{ fontSize: "inherit" }}>
                  Với hệ thống tích điểm xu và Voucher giảm giá, người dùng càng
                  du lịch, làm nhiệm vụ nhiều sẽ càng nhận được nhiều ưu đãi
                  giảm giá.
                </Typography>
              </MenuItem>
              <MenuItem
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "30px",
                  mb: "1em",
                  maxWidth: { xs: "90%", md: "45%", lg: "30%" },
                  textWrap: "wrap",
                  fontSize: "inherit",
                  backgroundImage:
                    "linear-gradient(var(--secondary-text-color), transparent)",
                  borderRadius: "10px",
                }}
              >
                <IconLocationOn
                  sx={{
                    color: "var(--primary-button-color)",
                    fontSize: "inherit",
                  }}
                />
                <Typography
                  component="h6"
                  sx={{
                    color: "var(--primary-button-color)",
                    fontSize: "inherit",
                  }}
                >
                  <b>Khu Vực Việt Nam</b>
                </Typography>
                <Typography component="p" sx={{ fontSize: "inherit" }}>
                  Đội ngũ người Việt Nam phát triển và quản lý sẵn sàng hỗ trợ
                  bạn nhanh chóng đồng thời tạo môi trường cho các khu địa điểm,
                  hướng dẫn viên du lịch trong nước hoạt động nhằm góp phần phát
                  triển ngành du lịch trong nước.
                </Typography>
              </MenuItem>
            </MenuList>
          </Paper>
        </Container>

        {/* Media Section */}
        <Container
          component={"section"}
          maxWidth="md"
          sx={{ mb: { xs: "5em", md: "7em" } }}
        >
          <Paper sx={{ fontSize: { xs: 14, md: 17, lg: 20 } }}>
            <Accordion
              defaultExpanded
              expanded={expanded === "panel1"}
              onChange={handleChange("panel1")}
            >
              <AccordionSummary
                id="panel1d-header"
                aria-controls="panel1d-content"
                expandIcon={
                  <IconExpandMore sx={{ color: "var(--primary-text-color)" }} />
                }
                sx={{ backgroundColor: "var(--background-color)" }}
              >
                <Typography
                  component="h6"
                  sx={{
                    color: "var(--primary-button-color)",
                    fontSize: "inherit",
                  }}
                >
                  Figma Content #1
                </Typography>
              </AccordionSummary>
              <AccordionDetails
                sx={{ backgroundColor: "var(--secondary-special-color)" }}
              >
                <Typography component="p">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                  eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                  eget.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={expanded === "panel2"}
              onChange={handleChange("panel2")}
            >
              <AccordionSummary
                id="panel2d-header"
                aria-controls="panel2d-content"
                expandIcon={
                  <IconExpandMore sx={{ color: "var(--primary-text-color)" }} />
                }
                sx={{ backgroundColor: "var(--background-color)" }}
              >
                <Typography
                  component="h6"
                  sx={{
                    color: "var(--primary-button-color)",
                    fontSize: "inherit",
                  }}
                >
                  Figma Content #2
                </Typography>
              </AccordionSummary>
              <AccordionDetails
                sx={{ backgroundColor: "var(--secondary-special-color)" }}
              >
                <Typography component="p">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                  eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                  eget.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={expanded === "panel3"}
              onChange={handleChange("panel3")}
            >
              <AccordionSummary
                id="panel3d-header"
                aria-controls="panel3d-content"
                expandIcon={
                  <IconExpandMore sx={{ color: "var(--primary-text-color)" }} />
                }
                sx={{ backgroundColor: "var(--background-color)" }}
              >
                <Typography
                  component="h6"
                  sx={{
                    color: "var(--primary-button-color)",
                    fontSize: "inherit",
                  }}
                >
                  Figma Content #3
                </Typography>
              </AccordionSummary>
              <AccordionDetails
                sx={{ backgroundColor: "var(--secondary-special-color)" }}
              >
                <Typography component="p">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                  eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                  eget.
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Paper>
        </Container>
      </main>

      <Footer currentThemeMode={isDarkMode} />
    </div>
  );
};

export default Landing_Page;
