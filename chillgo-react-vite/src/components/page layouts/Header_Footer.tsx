//Library
import React, { FC, useState, ChangeEvent, useRef } from "react";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuList from "@mui/material/MenuList";

//Asset
import ChillgoLogoLight from "../../assets/images/logo/logo-light-theme.png";
import ChillgoLogoDark from "../../assets/images/logo/logo-dark-theme.png";

import IconHome from "@mui/icons-material/HomeRounded";
import IconDownload from "@mui/icons-material/DownloadRounded";
import IconContact from "@mui/icons-material/QuestionAnswerRounded";
import IconPricing from "@mui/icons-material/PaidRounded";
import IconQuestion from "@mui/icons-material/LiveHelpRounded";

//Component
import { ButtonToggleTheme } from "../buttons/Button_Toggle_Theme";
import { ButtonToggleNav } from "../buttons/Button_Toggle_Nav";
import { ButtonKeyboard3d } from "../buttons/Button_Keyboard_3d";

//=============================================================================
//_____________________[ Declaration ]___________________
interface Header_Vars {
  currentThemeMode: boolean;
  onThemeChange: (event: ChangeEvent<HTMLInputElement>) => void;
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
                src={currentThemeMode ? ChillgoLogoDark : ChillgoLogoLight}
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
                disablePortal
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
                    <Paper className="current-theme-form">
                      <ClickAwayListener onClickAway={handleCloseNav}>
                        <MenuList
                          autoFocusItem={NavOpen_state}
                          id="composition-menu"
                          aria-labelledby="composition-button"
                          onKeyDown={handleListKeyDown}
                        >
                          <MenuItem
                            onClick={handleCloseNav}
                            className="current-theme-text"
                            component="a"
                            href="home"
                          >
                            Trang Chủ
                          </MenuItem>

                          <MenuItem
                            className="current-theme-text"
                            onClick={handleCloseNav}
                            component="a"
                            href="download"
                          >
                            Tải Ứng Dụng
                          </MenuItem>

                          <MenuItem
                            className="current-theme-text"
                            onClick={handleCloseNav}
                            component="a"
                            href="pricing"
                          >
                            Các Gói Trả Phí
                          </MenuItem>

                          <MenuItem
                            className="current-theme-text"
                            onClick={handleCloseNav}
                            component="a"
                            href="contact"
                          >
                            Liên Hệ
                          </MenuItem>

                          <MenuItem
                            className="current-theme-text"
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
                src={currentThemeMode ? ChillgoLogoDark : ChillgoLogoLight}
                alt="chillgo-logo"
              />
            </Typography>

            {/* Desktop Nav Items */}
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              <Typography
                className="current-theme-text"
                onClick={toggleNavMenu}
                sx={{ mr: 3, display: "block" }}
                component="a"
                href="home"
              >
                <IconHome sx={{ mr: 0.5 }} />
                Trang Chủ
              </Typography>

              <Typography
                className="current-theme-text"
                onClick={toggleNavMenu}
                sx={{ mr: 3, display: "block" }}
                component="a"
                href="download"
              >
                <IconDownload sx={{ mr: 0.5 }} />
                Tải Ứng Dụng
              </Typography>

              <Typography
                className="current-theme-text"
                onClick={toggleNavMenu}
                sx={{ mr: 3, display: "block" }}
                component="a"
                href="pricing"
              >
                <IconPricing sx={{ mr: 0.5 }} />
                Các Gói Trả Phí
              </Typography>

              <Typography
                className="current-theme-text"
                onClick={toggleNavMenu}
                sx={{ mr: 3, display: "block" }}
                component="a"
                href="contact"
              >
                <IconContact sx={{ mr: 0.5 }} />
                Liên Hệ
              </Typography>

              <Typography
                className="current-theme-text"
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
              className="current-theme-text"
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

export const Footer = () => {
  return (
    <footer>
      <p>&copy; 2024 Chillgo</p>
      <p>Theo </p>
      <ul>
        <li>
          <a href="#privacy">Chính Sách Bảo Mật</a>
        </li>
        <li>
          <a href="#terms">Terms of Service</a>
        </li>
      </ul>
    </footer>
  );
};
