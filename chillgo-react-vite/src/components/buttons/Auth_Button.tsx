//Library
import { useState } from "react";
import { useNavigate } from "react-router-dom";

//Context
import { useAuth } from "../../contexts/AuthContext";

import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

//Components
import ButtonKeyboard3d from "./Button_Keyboard_3d";

export const AuthButton = () => {
  const { isAuthenticated, accountInfo, logoutHandle } = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logoutHandle();
    handleClose();
    navigate("/");
  };

  const handleToAdmin = () => {
    handleClose();
    navigate("/admin");
  };

  if (!isAuthenticated) {
    return (
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
    );
  }

  return (
    <>
      <Button
        onClick={handleClick}
        sx={{
          color: "var(--primary-text-color)",
          "&:hover": {
            backgroundColor: "#cdee00",
            color: "#000",
          },
        }}
      >
        {accountInfo?.["full-name"]}
      </Button>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        MenuListProps={{
          className:"current-theme-form"
        }}
      >
        {(accountInfo?.role === "Admin" ||
          accountInfo?.role === "Nhân Viên Quản Lý") && (
          <MenuItem
            onClick={handleToAdmin}
            sx={{
              "&:hover": {
                backgroundColor: "#cdee00",
                color: "#000",
              },
            }}
          >
            Trang Quản Trị
          </MenuItem>
        )}
        <MenuItem
          onClick={handleLogout}
          sx={{
            "&:hover": {
              backgroundColor: "#cdee00",
              color: "#000",
            },
          }}
        >
          Đăng Xuất
        </MenuItem>
      </Menu>
    </>
  );
};
