// import { lazy, Suspense } from "react";

//Library
import { useState, useEffect, ChangeEvent } from "react";

//Components
import { Header, Footer } from "../components/page layouts/Header_Footer";
import AdminHeader from "../components/adminheader";
import AdminSidebar from "../components/adminsidebar";
import { Outlet } from "react-router-dom";

//=============================================================================================
const Dashboard_Page = () => {
  //---------------------[ Declare ]-----------------------------
  //const Users = lazy(() => import ("../components/fetchData/User_List"));
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    //assign default value
    const savedTheme = localStorage.getItem("isDarkMode");
    return savedTheme === "true";
  });

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

  return (
    <>
      <AdminHeader />
      <div className="flex h-screen max-h-screen">
        <AdminSidebar className="w-[300px] h-full bg-[#0055C3] flex flex-col justify-between" />
        <Outlet />
      </div>
    </>
  );
};

export default Dashboard_Page;
