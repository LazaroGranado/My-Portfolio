/* eslint-disable */
import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import Layout from "./pages/Layout";
import { useAuth0 } from "@auth0/auth0-react";
import { ProSidebarProvider } from "react-pro-sidebar";
import Dashboard from "./pages/Dashboard";

export default function App() {
  const [auth0Id, setAuth0Id] = useState();

  const { isAuthenticated, getAccessTokenSilently } = useAuth0();

  const [currentSection, setCurrentSection] = useState();

  function getCurrentSection(currentSection) {
    setCurrentSection(currentSection);
    return currentSection;
  }

  useEffect(() => {}, [currentSection]);

  return (
    <ProSidebarProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="/Dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </ProSidebarProvider>
  );
}
