//Library
import React, { FC, useState, ChangeEvent } from "react";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";

//Asset
import ChillgoLogoLight from "../../assets/images/logo/logo-light-theme.png";
import ChillgoLogoDark from "../../assets/images/logo/logo-dark-theme.png";

import IconHome from "@mui/icons-material/HomeRounded";
import IconDownload from '@mui/icons-material/DownloadRounded';

//Component
import { ButtonToggleTheme } from "../buttons/Button_Toggle_Theme";
import { ButtonToggleNav } from "../buttons/Button_Toggle_Nav";

//=============================================================================
//_____________________[ Declaration ]___________________
interface Header_Vars {
  currentThemeMode: boolean;
  onThemeChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const drawerWidth = 240;
const pages = ["Products", "Pricing", "Blog"];

//_______________________[ Function ]_____________________
export const Header: FC<Header_Vars> = ({
  currentThemeMode,
  onThemeChange,
}) => {
  const [NavToggle_state, setNavToggle_state] = useState<boolean>(false);

  //Nav Menu Toggle
  const toggleNavMenu = () => {
    setNavToggle_state((prevState) => !prevState);
  };

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
              <IconButton
                size="medium"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
              >
                <ButtonToggleNav
                  isToggled={NavToggle_state}
                  onClicked={toggleNavMenu}
                  colorValue="var(--primary-text-color)"
                  sizeValue="1.75em"
                />
              </IconButton>

              {/* Menu On Mobile Responsive */}
              <Menu
                id="menu-appbar"
                //anchorEl={NavToggle_state}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={NavToggle_state}
                //onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={toggleNavMenu}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
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

            {/* Desktop Nav Item */}
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              <Typography
                className="current-theme-text"
                onClick={toggleNavMenu}
                sx={{ mr: 2, display: "block" }}
                component="a"
                href="home"
              >
                <IconHome />
                Trang Chủ
              </Typography>
              <Typography
                className="current-theme-text"
                onClick={toggleNavMenu}
                sx={{ mr: 2, display: "block" }}
                component="a"
                href="home"
              >
                <IconDownload />
                Tải Ứng Dụng
              </Typography>
            </Box>

            <Button color="inherit">Login</Button>
          </Toolbar>
        </Container>
      </AppBar>

      <ButtonToggleTheme
        isToggled={currentThemeMode}
        onClicked={onThemeChange}
        sizeValue="10px"
      />
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
