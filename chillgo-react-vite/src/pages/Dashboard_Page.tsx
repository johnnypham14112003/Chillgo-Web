// import { lazy, Suspense } from "react";

//Library
import { useState, useEffect, ChangeEvent } from "react";

//Components
import { Header, Footer } from "../components/page layouts/Header_Footer";

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
    <div>
      {/* <Suspense fallback={}>
      </Suspense> */}
      <Header currentThemeMode={isDarkMode} onThemeChange={handleThemeChange} />
      <Footer currentThemeMode={isDarkMode} />
    </div>
  );
};

export default Dashboard_Page;
