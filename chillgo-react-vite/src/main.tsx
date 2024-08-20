//Import librarys
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";

//Import pages
import Landing_Page from "./pages/Landing_Page";
import Dashboard from "./pages/Dashboard_Page";
import NotFound_Page from "./pages/NotFound_Page";

//Import styles
import "../src/styles/Web_Environment.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing_Page />} />
        <Route path="/home" element={<Landing_Page />} />
        <Route path="/download" element={<NotFound_Page />} />
        <Route path="/pricing" element={<NotFound_Page />} />
        <Route path="/contact" element={<NotFound_Page />} />
        <Route path="/faqs" element={<NotFound_Page />} />
        <Route path="/authentication" element={<NotFound_Page />}/>
        <Route path="/user" />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<NotFound_Page />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);