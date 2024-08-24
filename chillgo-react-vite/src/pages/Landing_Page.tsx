//Libraries
import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

//Components
import { Header, Footer } from "../components/page layouts/Header_Footer";
import { ButtonArrowR3d } from "../components/buttons/Button_Arrow_R_3d";

//Assets
import ChillgoMobileMockup from "../assets/images/mockups/chillgo-on-iphone.png";

//Style
//import "../styles/pages/Landing_Page.css";

//=============================================================================
//_____________________[ Declaration ]___________________
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
  }, [isDarkMode]);

  const handleThemeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTheme = event.target.checked;
    setIsDarkMode(newTheme);
    localStorage.setItem("isDarkMode", newTheme.toString());
  };

  return (
    <div
      className="current-theme-app body-wrap  boxed-container"
      style={{ fontFamily: "Montserrat" }}
      data-theme={isDarkMode ? "dark-theme" : "light-theme"}
    >
      <Header currentThemeMode={isDarkMode} onThemeChange={handleThemeChange} />

      <main>
        {/* Hero Section */}
        <Container component="section" maxWidth="xl">
          {/* Responsive Container */}
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignItems: "center",
              mt: "3em",
              mx: { xs: "30px", md: "none" },
              mb: { xs: "2em", md: "5em"},
            }}
          >
            {/* Text Display */}
            <Box
              sx={{
                flex: 1,
                textAlign: { xs: "center", md: "left" },
                ml: { xs: "0 auto", md: "80px", lg: "100px" },
              }}
            >
              <Typography variant="h4" component="h1" gutterBottom>
                Trải Nghiệm Du Lịch Thông Minh Với Chillgo
              </Typography>
              <Typography component="p" gutterBottom>
                Khám phá, lên kế hoạch và đặt vé du lịch Việt Nam chỉ trong vài
                bước đơn giản với sự hỗ trợ từ AI thông minh. Hãy là người đầu tiên trải
                nghiệm!
              </Typography>

              {/* Action Buttons Container */}
              <Box
                sx={{
                  mt: 4,
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: { xs: "center", md: "flex-end" },
                  alignContent: "center",
                }}
              >
                <Button
                  component="a" //html tag <a>
                  href="#about"
                  disableRipple
                  variant="text"
                  sx={{
                    mr: 4,
                  }}
                >
                  Tìm Hiểu Thêm
                </Button>

                <Typography
                  component="a" //html tag <a>
                  href="download"
                  sx={{
                    height: "80px",
                    width: "200px",
                  }}
                >
                  <ButtonArrowR3d
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

        <section className="features section">
          <Container>
            <div className="features-inner section-inner has-bottom-divider">
              <h2 className="section-title mt-0">Bold features</h2>
              <div className="features-wrap">
                <div className="feature is-revealing">
                  <div className="feature-inner">
                    <div className="feature-icon">
                      <svg
                        width="64"
                        height="64"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <defs>
                          <linearGradient
                            x1="0%"
                            y1="100%"
                            x2="50%"
                            y2="0%"
                            id="feature-1-a"
                          >
                            <stop
                              stop-color="#F9425F"
                              stop-opacity=".8"
                              offset="0%"
                            />
                            <stop
                              stop-color="#47A1F9"
                              stop-opacity=".16"
                              offset="100%"
                            />
                          </linearGradient>
                          <linearGradient
                            x1="50%"
                            y1="100%"
                            x2="50%"
                            y2="0%"
                            id="feature-1-b"
                          >
                            <stop stop-color="#FDFFDA" offset="0%" />
                            <stop
                              stop-color="#F97059"
                              stop-opacity=".798"
                              offset="49.935%"
                            />
                            <stop
                              stop-color="#F9425F"
                              stop-opacity="0"
                              offset="100%"
                            />
                          </linearGradient>
                        </defs>
                        <g fill="none" fill-rule="evenodd">
                          <path
                            d="M24 48H0V24C0 10.745 10.745 0 24 0h24v24c0 13.255-10.745 24-24 24"
                            fill="url(#feature-1-a)"
                          />
                          <path
                            d="M40 64H16V40c0-13.255 10.745-24 24-24h24v24c0 13.255-10.745 24-24 24"
                            fill="url(#feature-1-b)"
                          />
                        </g>
                      </svg>
                    </div>
                    <h3 className="feature-title mt-24">Discover</h3>
                    <p className="text-sm mb-0">
                      A pseudo-Latin text used in web design, layout, and
                      printing in place of things to emphasise design.
                    </p>
                  </div>
                </div>
                <div className="feature is-revealing">
                  <div className="feature-inner">
                    <div className="feature-icon">
                      <svg
                        width="68"
                        height="64"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <defs>
                          <linearGradient
                            x1="0%"
                            y1="100%"
                            x2="50%"
                            y2="0%"
                            id="feature-2-a"
                          >
                            <stop
                              stop-color="#F9425F"
                              stop-opacity=".8"
                              offset="0%"
                            />
                            <stop
                              stop-color="#47A1F9"
                              stop-opacity=".16"
                              offset="100%"
                            />
                          </linearGradient>
                          <linearGradient
                            x1="50%"
                            y1="100%"
                            x2="50%"
                            y2="0%"
                            id="feature-2-b"
                          >
                            <stop stop-color="#FDFFDA" offset="0%" />
                            <stop
                              stop-color="#F97059"
                              stop-opacity=".798"
                              offset="49.935%"
                            />
                            <stop
                              stop-color="#F9425F"
                              stop-opacity="0"
                              offset="100%"
                            />
                          </linearGradient>
                        </defs>
                        <g fill="none" fill-rule="evenodd">
                          <path
                            d="M9.941 63.941v-24c0-13.255 10.745-24 24-24h24v24c0 13.255-10.745 24-24 24h-24z"
                            fill="url(#feature-2-a)"
                            transform="rotate(45 33.941 39.941)"
                          />
                          <path
                            d="M16 0v24c0 13.255 10.745 24 24 24h24V24C64 10.745 53.255 0 40 0H16z"
                            fill="url(#feature-2-b)"
                          />
                        </g>
                      </svg>
                    </div>
                    <h3 className="feature-title mt-24">Discover</h3>
                    <p className="text-sm mb-0">
                      A pseudo-Latin text used in web design, layout, and
                      printing in place of things to emphasise design.
                    </p>
                  </div>
                </div>
                <div className="feature is-revealing">
                  <div className="feature-inner">
                    <div className="feature-icon">
                      <svg
                        width="64"
                        height="64"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <defs>
                          <linearGradient
                            x1="50%"
                            y1="100%"
                            x2="50%"
                            y2="43.901%"
                            id="feature-3-a"
                          >
                            <stop
                              stop-color="#F97059"
                              stop-opacity=".798"
                              offset="0%"
                            />
                            <stop
                              stop-color="#F9425F"
                              stop-opacity="0"
                              offset="100%"
                            />
                          </linearGradient>
                          <linearGradient
                            x1="58.893%"
                            y1="100%"
                            x2="58.893%"
                            y2="18.531%"
                            id="feature-3-b"
                          >
                            <stop
                              stop-color="#F9425F"
                              stop-opacity=".8"
                              offset="0%"
                            />
                            <stop
                              stop-color="#47A1F9"
                              stop-opacity="0"
                              offset="100%"
                            />
                          </linearGradient>
                          <linearGradient
                            x1="50%"
                            y1="100%"
                            x2="50%"
                            y2="0%"
                            id="feature-3-c"
                          >
                            <stop stop-color="#FDFFDA" offset="0%" />
                            <stop
                              stop-color="#F97059"
                              stop-opacity=".798"
                              offset="49.935%"
                            />
                            <stop
                              stop-color="#F9425F"
                              stop-opacity="0"
                              offset="100%"
                            />
                          </linearGradient>
                        </defs>
                        <g fill="none" fill-rule="evenodd">
                          <path
                            fill="url(#feature-3-a)"
                            opacity=".32"
                            d="M0 24h64v40H0z"
                          />
                          <path
                            fill="url(#feature-3-b)"
                            d="M40 24H24L0 64h64z"
                          />
                          <path
                            d="M10 10v22c0 12.15 9.85 22 22 22h22V32c0-12.15-9.85-22-22-22H10z"
                            fill="url(#feature-3-c)"
                            transform="rotate(45 32 32)"
                          />
                        </g>
                      </svg>
                    </div>
                    <h3 className="feature-title mt-24">Discover</h3>
                    <p className="text-sm mb-0">
                      A pseudo-Latin text used in web design, layout, and
                      printing in place of things to emphasise design.
                    </p>
                  </div>
                </div>
                <div className="feature is-revealing">
                  <div className="feature-inner">
                    <div className="feature-icon">
                      <svg
                        width="64"
                        height="64"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <defs>
                          <linearGradient
                            x1="0%"
                            y1="100%"
                            x2="50%"
                            y2="0%"
                            id="feature-4-a"
                          >
                            <stop
                              stop-color="#F9425F"
                              stop-opacity=".8"
                              offset="0%"
                            />
                            <stop
                              stop-color="#47A1F9"
                              stop-opacity=".16"
                              offset="100%"
                            />
                          </linearGradient>
                          <linearGradient
                            x1="50%"
                            y1="100%"
                            x2="50%"
                            y2="0%"
                            id="feature-4-b"
                          >
                            <stop stop-color="#FDFFDA" offset="0%" />
                            <stop
                              stop-color="#F97059"
                              stop-opacity=".798"
                              offset="49.935%"
                            />
                            <stop
                              stop-color="#F9425F"
                              stop-opacity="0"
                              offset="100%"
                            />
                          </linearGradient>
                        </defs>
                        <g fill="none" fill-rule="evenodd">
                          <path
                            d="M24 64H0V40c0-13.255 10.745-24 24-24h24v24c0 13.255-10.745 24-24 24"
                            fill="url(#feature-4-a)"
                            transform="matrix(-1 0 0 1 48 0)"
                          />
                          <path
                            d="M40 48H16V24C16 10.745 26.745 0 40 0h24v24c0 13.255-10.745 24-24 24"
                            fill="url(#feature-4-b)"
                          />
                        </g>
                      </svg>
                    </div>
                    <h3 className="feature-title mt-24">Discover</h3>
                    <p className="text-sm mb-0">
                      A pseudo-Latin text used in web design, layout, and
                      printing in place of things to emphasise design.
                    </p>
                  </div>
                </div>
                <div className="feature is-revealing">
                  <div className="feature-inner">
                    <div className="feature-icon">
                      <svg
                        width="64"
                        height="64"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <defs>
                          <linearGradient
                            x1="0%"
                            y1="100%"
                            x2="50%"
                            y2="0%"
                            id="feature-5-a"
                          >
                            <stop
                              stop-color="#F9425F"
                              stop-opacity=".8"
                              offset="0%"
                            />
                            <stop
                              stop-color="#47A1F9"
                              stop-opacity=".16"
                              offset="100%"
                            />
                          </linearGradient>
                          <linearGradient
                            x1="50%"
                            y1="100%"
                            x2="50%"
                            y2="0%"
                            id="feature-5-b"
                          >
                            <stop stop-color="#FDFFDA" offset="0%" />
                            <stop
                              stop-color="#F97059"
                              stop-opacity=".798"
                              offset="49.935%"
                            />
                            <stop
                              stop-color="#F9425F"
                              stop-opacity="0"
                              offset="100%"
                            />
                          </linearGradient>
                        </defs>
                        <g fill="none" fill-rule="evenodd">
                          <path
                            d="M24 63H0V39c0-13.255 10.745-24 24-24h24v24c0 13.255-10.745 24-24 24"
                            fill="url(#feature-5-a)"
                            transform="matrix(-1 0 0 1 48 0)"
                          />
                          <path
                            d="M40 48H16V24C16 10.745 26.745 0 40 0h24v24c0 13.255-10.745 24-24 24"
                            fill-opacity=".24"
                            fill="url(#feature-5-a)"
                            transform="matrix(-1 0 0 1 80 0)"
                          />
                          <path
                            d="M10.113 10.113v22c0 12.15 9.85 22 22 22h22v-22c0-12.15-9.85-22-22-22h-22z"
                            fill="url(#feature-5-b)"
                            transform="rotate(45 32.113 32.113)"
                          />
                        </g>
                      </svg>
                    </div>
                    <h3 className="feature-title mt-24">Discover</h3>
                    <p className="text-sm mb-0">
                      A pseudo-Latin text used in web design, layout, and
                      printing in place of things to emphasise design.
                    </p>
                  </div>
                </div>
                <div className="feature is-revealing">
                  <div className="feature-inner">
                    <div className="feature-icon">
                      <svg
                        width="64"
                        height="64"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <defs>
                          <linearGradient
                            x1="50%"
                            y1="100%"
                            x2="50%"
                            y2="0%"
                            id="feature-6-a"
                          >
                            <stop stop-color="#FDFFDA" offset="0%" />
                            <stop
                              stop-color="#F97059"
                              stop-opacity=".798"
                              offset="49.935%"
                            />
                            <stop
                              stop-color="#F9425F"
                              stop-opacity="0"
                              offset="100%"
                            />
                          </linearGradient>
                          <linearGradient
                            x1="58.893%"
                            y1="100%"
                            x2="58.893%"
                            y2="18.531%"
                            id="feature-6-b"
                          >
                            <stop
                              stop-color="#F9425F"
                              stop-opacity=".8"
                              offset="0%"
                            />
                            <stop
                              stop-color="#47A1F9"
                              stop-opacity="0"
                              offset="100%"
                            />
                          </linearGradient>
                        </defs>
                        <g fill="none" fill-rule="evenodd">
                          <path
                            d="M24 48H0V24C0 10.745 10.745 0 24 0h24v24c0 13.255-10.745 24-24 24"
                            fill="url(#feature-6-a)"
                          />
                          <path
                            fill-opacity=".64"
                            fill="url(#feature-6-b)"
                            d="M24 29.229h40V64H0z"
                          />
                        </g>
                      </svg>
                    </div>
                    <h3 className="feature-title mt-24">Discover</h3>
                    <p className="text-sm mb-0">
                      A pseudo-Latin text used in web design, layout, and
                      printing in place of things to emphasise design.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        <section className="media section">
          <Container maxWidth="sm">
            <div className="media-inner section-inner">
              <div className="media-header text-center">
                <h2 className="section-title mt-0">Meet Laurel</h2>
                <p className="section-paragraph mb-0">
                  Lorem ipsum is common placeholder text used to demonstrate the
                  graphic elements of a document or visual presentation.
                </p>
              </div>
              <div className="media-canvas">
                <svg
                  width="800"
                  height="450"
                  viewBox="0 0 800 450"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient
                      x1="100%"
                      y1="0%"
                      x2="0%"
                      y2="100%"
                      id="media-canvas"
                    >
                      <stop stop-color="#06101F" offset="0%" />
                      <stop stop-color="#1D304B" offset="100%" />
                    </linearGradient>
                  </defs>
                  <rect
                    width="800"
                    height="450"
                    rx="8"
                    fill="url(#media-canvas)"
                    fill-rule="evenodd"
                  />
                </svg>
                <div className="media-control">
                  <svg
                    width="96"
                    height="96"
                    viewBox="0 0 96 96"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <defs>
                      <linearGradient
                        x1="87.565%"
                        y1="15.873%"
                        x2="17.086%"
                        y2="80.538%"
                        id="media-control"
                      >
                        <stop
                          stop-color="#FFF"
                          stop-opacity=".64"
                          offset="0%"
                        />
                        <stop stop-color="#FFF" offset="100%" />
                      </linearGradient>
                      <filter
                        x="-500%"
                        y="-500%"
                        width="1000%"
                        height="1000%"
                        filterUnits="objectBoundingBox"
                        id="media-shadow"
                      >
                        <feOffset
                          dy="16"
                          in="SourceAlpha"
                          result="shadowOffsetOuter"
                        ></feOffset>
                        <feGaussianBlur
                          stdDeviation="24"
                          in="shadowOffsetOuter"
                          result="shadowBlurOuter"
                        ></feGaussianBlur>
                        <feColorMatrix
                          values="0 0 0 0 0.024 0 0 0 0 0.064 0 0 0 0 0.12 0 0 0 0.24 0"
                          in="shadowBlurOuter"
                        ></feColorMatrix>
                      </filter>
                    </defs>
                    <g fill="none" fill-rule="evenodd">
                      <circle
                        fill="#FFF"
                        cx="48"
                        cy="48"
                        r="48"
                        style={{
                          mixBlendMode: "multiply",
                          filter: "url(#media-shadow)",
                        }}
                      />
                      <circle
                        fill="url(#media-control)"
                        cx="48"
                        cy="48"
                        r="48"
                      />
                      <path
                        d="M44.6 39.2a1.001 1.001 0 0 0-1.6.8v18a1.001 1.001 0 0 0 1.6.8l12-9a.998.998 0 0 0 0-1.6l-12-9z"
                        fill="#1D304B"
                      />
                    </g>
                  </svg>
                </div>
              </div>
            </div>
          </Container>
        </section>

        <section className="newsletter section">
          <Container maxWidth="sm">
            <div className="newsletter-inner section-inner">
              <div className="newsletter-header text-center">
                <h2 className="section-title mt-0">Stay in the know</h2>
                <p className="section-paragraph">
                  Lorem ipsum is common placeholder text used to demonstrate the
                  graphic elements of a document or visual presentation.
                </p>
              </div>
              <div className="footer-form newsletter-form field field-grouped">
                <div className="control control-expanded">
                  <input
                    className="input"
                    type="email"
                    name="email"
                    placeholder="Your best email&hellip;"
                  />
                </div>
                <div className="control">
                  <a
                    className="button button-primary button-block button-shadow"
                    href="#"
                  >
                    Early access
                  </a>
                </div>
              </div>
            </div>
          </Container>
        </section>
        <Container id="about" maxWidth="xl">
          <Typography></Typography>
        </Container>
      </main>

      <Footer currentThemeMode={isDarkMode} />
    </div>
  );
};

export default Landing_Page;
