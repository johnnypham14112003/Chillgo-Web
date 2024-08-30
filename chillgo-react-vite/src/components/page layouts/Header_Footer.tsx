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
                onClick={toggleNavMenu}
                sx={{ mr: 3, display: "block" }}
                component="a"
                href="home"
              >
                <IconHome sx={{ mr: 0.5 }} />
                Trang Chủ
              </Typography>

              <Typography
                onClick={toggleNavMenu}
                sx={{ mr: 3, display: "block" }}
                component="a"
                href="download"
              >
                <IconDownload sx={{ mr: 0.5 }} />
                Tải Ứng Dụng
              </Typography>

              <Typography
                onClick={toggleNavMenu}
                sx={{ mr: 3, display: "block" }}
                component="a"
                href="pricing"
              >
                <IconPricing sx={{ mr: 0.5 }} />
                Các Gói Trả Phí
              </Typography>

              <Typography
                onClick={toggleNavMenu}
                sx={{ mr: 3, display: "block" }}
                component="a"
                href="contact"
              >
                <IconContact sx={{ mr: 0.5 }} />
                Liên Hệ
              </Typography>

              <Typography
                onClick={toggleNavMenu}
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
              onClick={toggleNavMenu}
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
            <li className="facebook">
              <a href="">
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
            <li className="youtube">
              <a href="">
                <span className="tooltip">
                  <b>Youtube</b>
                </span>
                <svg
                  height="1.8em"
                  fill="currentColor"
                  viewBox="0 0 461.001 461.001"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M365.257,67.393H95.744C42.866,67.393,0,110.259,0,163.137v134.728 c0,52.878,42.866,95.744,95.744,95.744h269.513c52.878,0,95.744-42.866,95.744-95.744V163.137 C461.001,110.259,418.135,67.393,365.257,67.393z M300.506,237.056l-126.06,60.123c-3.359,1.602-7.239-0.847-7.239-4.568V168.607 c0-3.774,3.982-6.22,7.348-4.514l126.06,63.881C304.363,229.873,304.298,235.248,300.506,237.056z"></path>
                </svg>
              </a>
            </li>

            <li className="tiktok">
              <a href="">
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
