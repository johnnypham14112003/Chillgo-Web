//Library
import { useState, useEffect, ChangeEvent } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";

import Typography from "@mui/material/Typography";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";

//Asset
import Chillgo_LogoLight from "../assets/images/logo/logo-light-theme.png";
import Chillgo_LogoDark from "../assets/images/logo/logo-dark-theme.png";

//Components
import { ButtonToggleTheme } from "../components/buttons/Button_Toggle_Theme";
import { useAuth } from "../contexts/AuthContext";

//=============================================================================================
const Admin_Page = () => {
  //---------------------[ Declare ]-----------------------------
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    //assign default value
    const savedTheme = localStorage.getItem("isDarkMode");
    return savedTheme === "true";
  });
  const location = useLocation();
  const navigate = useNavigate();
  // Kiểm tra nếu URL hiện tại là "/admin" (không có child route nào)
  const isAtAdminRoot = location.pathname === "/admin";

  //For Authentication
  const { isAuthenticated, accountInfo, logoutHandle } = useAuth();
  if (!isAuthenticated) {
    navigate("/authentication");
  }

  const navBar = [
    {
      title: "Thống Kê",
      link: "/admin/dashboard",
    },
    {
      title: "Quản Lý Tài Khoản",
      link: "/admin/accounts",
    },
  ];

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
  const handleLandingPage = () => {
    navigate("/");
  };
  const handleLogout = () => {
    logoutHandle();
    navigate("/authentication");
  };

  // ----------------------------------------------------------------
  return (
    <>
      <header className="absolute top-0 w-full z-10 bg-chillgo-secondary-text pb-2">
        <div className="flex flex-col items-center justify-center gap-2">
          {/* Top Bar */}
          <div className="top-bar w-full h-[37px] flex flex-row items-center justify-between py-2 text-chillgo-secondary-text bg-gradient-to-r from-chillgo-background to-chillgo-primary-color">
            {/* Add content for the top bar if needed */}
          </div>

          {/* Navigation Bar */}
          <div className="nav-bar flex flex-row items-center justify-center w-full h-12 px-16">
            {/* Left Section: Avatar and Name */}
            <div className="flex flex-row justify-start items-center space-x-8 w-full">
              <img
                src="data:image/jpeg;base64,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"
                //   src={profile.data?.detail.avatar || "/images/avatar.png"}
                alt="avatar"
                className="w-[51px] h-[51px] rounded-full object-cover"
              />
              <span className="text-chillgo-primary-text font-semibold text-base">
                {accountInfo?.["full-name"]}
              </span>
            </div>

            {/* Center Section: Logo */}
            <div className="flex items-center justify-center -translate-x-1/2 w-full">
              <Typography
                noWrap
                component="a" //html tag <a>
                href="../home"
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
                  className="logo w-[157px]  cursor-pointer"
                  src={isDarkMode ? Chillgo_LogoDark : Chillgo_LogoLight}
                  alt="chillgo-logo"
                />
              </Typography>
            </div>
            <ButtonToggleTheme
              isToggled={isDarkMode}
              onClicked={handleThemeChange}
              sizeValue="10px"
            />
          </div>
        </div>
      </header>

      {/*============================== Sidebar And the other section ==============================*/}
      <div className="flex h-screen max-h-screen">
        {/* sidebar container */}
        <div className="w-[300px] h-full bg-gradient-to-br from-chillgo-background to-chillgo-primary-color flex flex-col justify-between">
          <nav className="flex flex-col items-start justify-center h-full translate-y-1/2 space-y-8">
            {navBar.map((item, index) => (
              <NavLink
                key={index}
                to={item.link}
                className={({ isActive }) =>
                  `${
                    isActive
                      ? "bg-chillgo-secondary-color text-black"
                      : "text-white hover:bg-chillgo-special-color"
                  } 
              hover:no-underline font-bold text-base text-end pr-12 py-4 rounded-r-full border-t-[1px] border-b-[1px] border-r-[1px] w-full`
                }
              >
                {item.title}
              </NavLink>
            ))}
          </nav>
          <div className="h-full pb-12 pl-12 flex items-end">
            <MenuList className="flex flex-col space-y-2">
              <MenuItem
                onClick={handleLandingPage}
                className="flex self-center"
                sx={{
                  borderRadius: "50px",
                  color: "#fff",
                  "&:hover": {
                    backgroundColor: "var(--special-color)",
                  },
                }}
              >
                Về trang Landing
              </MenuItem>

              <MenuItem
                onClick={handleLogout}
                className="flex self-center"
                sx={{
                  borderRadius: "50px",
                  color: "#fff",
                  "&:hover": {
                    backgroundColor: "var(--special-color)",
                  },
                }}
              >
                Đăng Xuất
              </MenuItem>
            </MenuList>
          </div>
        </div>

        {isAtAdminRoot /* From Uiverse.io by ilkhoeri */ ? (
          <div className="text-chillgo-primary-text mx-auto w-full max-w-xs relative flex flex-col items-center justify-center text-center overflow-visible">
            <h3 className="text-3xl font-bold mb-1">Chào Mừng Trở Lại</h3>
            <div className="w-full relative flex flex-col items-center justify-center">
              <div className="absolute inset-x-auto top-0 bg-gradient-to-r from-transparent via-chillgo-secondary-button to-transparent h-[2px] w-full blur-sm"></div>
              <div className="absolute inset-x-auto top-0 bg-gradient-to-r from-transparent via-chillgo-secondary-button to-transparent h-px w-full"></div>
              <div className="absolute inset-x-auto top-0 bg-gradient-to-r from-transparent via-chillgo-secondary-button-highlight to-transparent h-[5px] w-1/2 blur-sm"></div>
              <div className="absolute inset-x-auto top-0 bg-gradient-to-r from-transparent via-chillgo-secondary-button-highlight to-transparent h-px w-1/2"></div>
              <div className="absolute inset-0 w-full h-full bg-background [mask-image:radial-gradient(50%_200px_at_top,transparent_20%,white)]"></div>
            </div>
            <p className="mt-8 text-md">
              Vui lòng chọn một trong các trang điều hướng ở bên trái để tiếp
              tục.
            </p>

            <span className="absolute -z-[1] backdrop-blur-sm inset-0 w-full h-full flex before:content-[''] before:h-3/4 before:w-full before:bg-gradient-to-r before:from-chillgo-background before:to-purple-600 before:blur-[90px] after:content-[''] after:h-1/2 after:w-full after:bg-gradient-to-br after:from-cyan-400 after:to-sky-300 after:blur-[90px]"></span>
          </div>
        ) : null}
        <Outlet />
      </div>
    </>
  );
};

export default Admin_Page;
