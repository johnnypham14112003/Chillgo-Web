//Library
import React, { FC, useState, ChangeEvent, useRef } from "react";

import Container from "@mui/material/Container";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Popper from "@mui/material/Popper";
import Slide from "@mui/material/Slide";

//Asset
import Chillgo_LogoLight from "../../assets/images/logo/logo-light-theme.png";
import Chillgo_LogoDark from "../../assets/images/logo/logo-dark-theme.png";

import IconHome from "@mui/icons-material/HomeRounded";
import IconDownload from "@mui/icons-material/DownloadRounded";
import IconContact from "@mui/icons-material/QuestionAnswerRounded";
import IconPricing from "@mui/icons-material/PaidRounded";
import IconQuestion from "@mui/icons-material/LiveHelpRounded";

//Component
import { ButtonToggleTheme } from "../buttons/Button_Toggle_Theme";
import { ButtonToggleNav } from "../buttons/Button_Toggle_Nav";
import { ButtonKeyboard3d } from "../buttons/Button_Keyboard_3d";

//Style
import "../../styles/components/Footer.css";

//=============================================================================
//_____________________[ Declaration ]___________________
interface Header_Vars {
  currentThemeMode: boolean;
  onThemeChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

interface Footer_Vars {
  currentThemeMode: boolean;
}

//_______________________[ Function ]_____________________
export const Header: FC<Header_Vars> = ({
  currentThemeMode,
  onThemeChange,
}) => {
  const [NavOpen_state, setNavOpen_state] = useState(false);
  const anchorRef = useRef<HTMLButtonElement>(null);

  //Nav Menu Toggle
  const toggleNavMenu = () => {
    setNavOpen_state((prevState) => !prevState);
  };
  const handleCloseNav = (event: Event | React.SyntheticEvent) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setNavOpen_state(false);
  };
  const handleListKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Tab") {
      event.preventDefault();
      setNavOpen_state(false);
    } else if (event.key === "Escape") {
      setNavOpen_state(false);
    }
  }; // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(NavOpen_state);
  React.useEffect(() => {
    if (prevOpen.current === true && NavOpen_state === false) {
      anchorRef.current!.focus();
    }

    prevOpen.current = NavOpen_state;
  }, [NavOpen_state]);

  //-------------------------------------------------

  return (
    <header>
      <AppBar
        position="static"
        sx={{ backgroundImage: "var(--header-nav-color)" }}
        elevation={3}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              noWrap
              component="a" //html tag <a>
              href="home"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
              }}
            >
              <img
                style={{
                  maxWidth: "100px",
                  maxHeight: "40px",
                }}
                src={currentThemeMode ? Chillgo_LogoDark : Chillgo_LogoLight}
                alt="chillgo-logo"
              />
            </Typography>

            {/* Mobile Nav Menu Toggle Button*/}
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <Button
                ref={anchorRef}
                id="composition-button"
                aria-controls={NavOpen_state ? "composition-menu" : undefined}
                aria-expanded={NavOpen_state ? "true" : undefined}
                aria-haspopup="true"
                onClick={toggleNavMenu}
              >
                <ButtonToggleNav
                  isToggled={NavOpen_state}
                  onClicked={toggleNavMenu}
                  colorValue="var(--primary-text-color)"
                  sizeValue="2.4em"
                />
              </Button>

              {/* Menu On Mobile Responsive */}
              <Popper
                open={NavOpen_state}
                anchorEl={anchorRef.current}
                role={undefined}
                placement="bottom-start"
                transition
                sx={{zIndex:100}}
              >
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                    style={{
                      transformOrigin:
                        placement === "bottom-start"
                          ? "left top"
                          : "left bottom",
                    }}
                  >
                    <Slide
                      direction="down"
                      in={NavOpen_state}
                      mountOnEnter
                      unmountOnExit
                    >
                      <Paper className="current-theme-form" elevation={3}>
                        <ClickAwayListener onClickAway={handleCloseNav}>
                          <MenuList
                            autoFocusItem={NavOpen_state}
                            id="composition-menu"
                            aria-labelledby="composition-button"
                            onKeyDown={handleListKeyDown}
                            className="current-theme-app"
                          >
                            <MenuItem
                              onClick={handleCloseNav}
                              component="a"
                              href="home"
                            >
                              Trang Chủ
                            </MenuItem>

                            <MenuItem
                              onClick={handleCloseNav}
                              component="a"
                              href="download"
                            >
                              Tải Ứng Dụng
                            </MenuItem>

                            <MenuItem
                              onClick={handleCloseNav}
                              component="a"
                              href="pricing"
                            >
                              Các Gói Trả Phí
                            </MenuItem>

                            <MenuItem
                              onClick={handleCloseNav}
                              component="a"
                              href="contact"
                            >
                              Liên Hệ
                            </MenuItem>

                            <MenuItem
                              onClick={handleCloseNav}
                              component="a"
                              href="faqs"
                            >
                              FAQS
                            </MenuItem>

                            <MenuItem>
                              <ButtonToggleTheme
                                isToggled={currentThemeMode}
                                onClicked={onThemeChange}
                                sizeValue="10px"
                              />
                            </MenuItem>
                          </MenuList>
                        </ClickAwayListener>
                      </Paper>
                    </Slide>
                  </Grow>
                )}
              </Popper>
            </Box>

            {/* Center Logo On Mobile Responsive */}
            <Typography
              noWrap
              component="a" //html tag <a>
              href="home"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
              }}
            >
              <img
                style={{
                  maxWidth: "100px",
                  maxHeight: "40px",
                }}
                src={currentThemeMode ? Chillgo_LogoDark : Chillgo_LogoLight}
                alt="chillgo-logo"
              />
            </Typography>

            {/* Desktop Nav Items */}
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              <Typography
                sx={{ mr: 3, display: "block" }}
                component="a"
                href="home"
              >
                <IconHome sx={{ mr: 0.5 }} />
                Trang Chủ
              </Typography>

              <Typography
                sx={{ mr: 3, display: "block" }}
                component="a"
                href="download"
              >
                <IconDownload sx={{ mr: 0.5 }} />
                Tải Ứng Dụng
              </Typography>

              <Typography
                sx={{ mr: 3, display: "block" }}
                component="a"
                href="pricing"
              >
                <IconPricing sx={{ mr: 0.5 }} />
                Các Gói Trả Phí
              </Typography>

              <Typography
                sx={{ mr: 3, display: "block" }}
                component="a"
                href="contact"
              >
                <IconContact sx={{ mr: 0.5 }} />
                Liên Hệ
              </Typography>

              <Typography
                sx={{ mr: 3, display: "block" }}
                component="a"
                href="faqs"
              >
                <IconQuestion sx={{ mr: 0.5 }} />
                FAQS
              </Typography>
            </Box>

            <Typography
              sx={{
                my: 1,
                mb: 2,
              }}
              component="a"
              href="authentication"
            >
              <ButtonKeyboard3d textDisplay="Đăng Nhập" />
            </Typography>

            {/* Button Toggle Theme On Desktop View */}
            <Box
              sx={{ ml: 1, flexGrow: 0, display: { xs: "none", md: "flex" } }}
            >
              <ButtonToggleTheme
                isToggled={currentThemeMode}
                onClicked={onThemeChange}
                sizeValue="10px"
              />
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </header>
  );
};

export const Footer: FC<Footer_Vars> = ({ currentThemeMode }) => {
  return (
    <footer className="site-footer">
      <Container maxWidth="xl">
        <div className="site-footer-inner has-top-divider">
          <div className="brand footer-brand">
            <a href="home">
              <img
                style={{
                  maxWidth: "100px",
                  maxHeight: "40px",
                }}
                src={currentThemeMode ? Chillgo_LogoDark : Chillgo_LogoLight}
                alt="chillgo-logo"
              />
            </a>
          </div>

          <ul
            className="footer-links"
            style={{ listStyle: "none", padding: 0 }}
          >
            <li>
              <a href="contact">
                <b>Liên Hệ</b>
              </a>
            </li>
            <li>
              <a href="pricing">
                <b>Các Gói Trả Phí</b>
              </a>
            </li>
            <li>
              <a href="faqs">
                <b>Câu Hỏi Thường Gặp</b>
              </a>
            </li>
          </ul>

          <ul className="footer-social-links">
            <li className="facebook-icon">
              <a href="https://www.facebook.com/people/ChillGo/61566057806584/">
                <span className="tooltip">
                  <b>Facebook</b>
                </span>
                <svg
                  height="2em"
                  style={{ marginBottom: "-0.7em" }}
                  fill="currentColor"
                  viewBox="0 0 320 512"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"></path>
                </svg>
              </a>
            </li>

            <li className="threads-icon">
              <a href="">
                <span className="tooltip">
                  <b>Threads</b>
                </span>
                <svg
                  height="1.9em"
                  fill="currentColor"
                  viewBox="0 0 512 512"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M331.5 235.7c2.2 .9 4.2 1.9 6.3 2.8c29.2 14.1 50.6 35.2 61.8 61.4c15.7 36.5 17.2 95.8-30.3 143.2c-36.2 36.2-80.3 52.5-142.6 53h-.3c-70.2-.5-124.1-24.1-160.4-70.2c-32.3-41-48.9-98.1-49.5-169.6V256v-.2C17 184.3 33.6 127.2 65.9 86.2C102.2 40.1 156.2 16.5 226.4 16h.3c70.3 .5 124.9 24 162.3 69.9c18.4 22.7 32 50 40.6 81.7l-40.4 10.8c-7.1-25.8-17.8-47.8-32.2-65.4c-29.2-35.8-73-54.2-130.5-54.6c-57 .5-100.1 18.8-128.2 54.4C72.1 146.1 58.5 194.3 58 256c.5 61.7 14.1 109.9 40.3 143.3c28 35.6 71.2 53.9 128.2 54.4c51.4-.4 85.4-12.6 113.7-40.9c32.3-32.2 31.7-71.8 21.4-95.9c-6.1-14.2-17.1-26-31.9-34.9c-3.7 26.9-11.8 48.3-24.7 64.8c-17.1 21.8-41.4 33.6-72.7 35.3c-23.6 1.3-46.3-4.4-63.9-16c-20.8-13.8-33-34.8-34.3-59.3c-2.5-48.3 35.7-83 95.2-86.4c21.1-1.2 40.9-.3 59.2 2.8c-2.4-14.8-7.3-26.6-14.6-35.2c-10-11.7-25.6-17.7-46.2-17.8H227c-16.6 0-39 4.6-53.3 26.3l-34.4-23.6c19.2-29.1 50.3-45.1 87.8-45.1h.8c62.6 .4 99.9 39.5 103.7 107.7l-.2 .2zm-156 68.8c1.3 25.1 28.4 36.8 54.6 35.3c25.6-1.4 54.6-11.4 59.5-73.2c-13.2-2.9-27.8-4.4-43.4-4.4c-4.8 0-9.6 .1-14.4 .4c-42.9 2.4-57.2 23.2-56.2 41.8l-.1 .1z"/>
                </svg>
              </a>
            </li>
            
            <li className="instagram-icon">
              <a href="https://www.instagram.com/chillgo.vn/">
                <span className="tooltip">
                  <b>Instagram</b>
                </span>
                <svg
                  height="1.9em"
                  fill="currentColor"
                  viewBox="0 0 461.001 461.001"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"
                  />
                </svg>
              </a>
            </li>

            <li className="tiktok-icon">
              <a href="https://www.tiktok.com/@chillgo.vn">
                <span className="tooltip">
                  <b>TikTok</b>
                </span>
                <svg
                  height="1.7em"
                  fill="currentColor"
                  viewBox="0 0 512 512"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M412.19,118.66a109.27,109.27,0,0,1-9.45-5.5,132.87,132.87,0,0,1-24.27-20.62c-18.1-20.71-24.86-41.72-27.35-56.43h.1C349.14,23.9,350,16,350.13,16H267.69V334.78c0,4.28,0,8.51-.18,12.69,0,.52-.05,1-.08,1.56,0,.23,0,.47-.05.71,0,.06,0,.12,0,.18a70,70,0,0,1-35.22,55.56,68.8,68.8,0,0,1-34.11,9c-38.41,0-69.54-31.32-69.54-70s31.13-70,69.54-70a68.9,68.9,0,0,1,21.41,3.39l.1-83.94a153.14,153.14,0,0,0-118,34.52,161.79,161.79,0,0,0-35.3,43.53c-3.48,6-16.61,30.11-18.2,69.24-1,22.21,5.67,45.22,8.85,54.73v.2c2,5.6,9.75,24.71,22.38,40.82A167.53,167.53,0,0,0,115,470.66v-.2l.2.2C155.11,497.78,199.36,496,199.36,496c7.66-.31,33.32,0,62.46-13.81,32.32-15.31,50.72-38.12,50.72-38.12a158.46,158.46,0,0,0,27.64-45.93c7.46-19.61,9.95-43.13,9.95-52.53V176.49c1,.6,14.32,9.41,14.32,9.41s19.19,12.3,49.13,20.31c21.48,5.7,50.42,6.9,50.42,6.9V131.27C453.86,132.37,433.27,129.17,412.19,118.66Z"></path>
                </svg>
              </a>
            </li>
          </ul>

          <div className="footer-copyright">
            Copyrights &copy; 2024 Chillgo, all rights reserved
          </div>
        </div>
      </Container>
    </footer>
  );
};
