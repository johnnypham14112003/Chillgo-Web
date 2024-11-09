//Import librarys
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";

//Import pages
import Landing_Page from "./pages/Landing_Page";
import Download_Page from "./pages/Download_Page";
import Pricing_Page from "./pages/Pricing_Page";
import Contact_Page from "./pages/Contact_Page";
import FAQS_Page from "./pages/FAQS_Page";
import Authentication_Page from "./pages/Authentication_Page";
import NotFound_Page from "./pages/NotFound_Page";
import Dashboard_Page from "./pages/Dashboard_Page";
import AdminCustomer from "./components/page layouts/Admin_Accounts";
import AdminDashboard from "./components/page layouts/Admin_Statistic";

//Import styles
import "../src/styles/Web_Environment.css";

import { createTheme, ThemeProvider } from "@mui/material/styles";

//====================================================================
//Public Declare
const theme = createTheme({
  typography: {
    allVariants: {
      fontFamily: "'Montserrat', sans-serif",
      color: "var(--primary-text-color)",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontWeight: 400,
          color: "var(--primary-text-color)",
        },
      },
    },
  },
});

//====================================================================
ReactDOM.createRoot(document.getElementById("root")!).render(
  <ThemeProvider theme={theme}>
    <React.StrictMode>
      {/* Auth whole app */}
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing_Page />} />
            <Route path="/home" element={<Landing_Page />} />
            <Route path="/download" element={<Download_Page />} />
            <Route path="/pricing" element={<Pricing_Page />} />
            <Route path="/contact" element={<Contact_Page />} />
            <Route path="/faqs" element={<FAQS_Page />} />
            <Route path="/authentication" element={<Authentication_Page />} />
            <Route path="/admin" element={<Dashboard_Page />}>
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/accounts" element={<AdminCustomer />} />
            </Route>
            <Route path="*" element={<NotFound_Page />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </React.StrictMode>
  </ThemeProvider>
);
