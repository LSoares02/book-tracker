import React from "react";
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard/index";
import GlobalStateProvider from "./hooks/globalState";

export default function Router() {
  return (
    <BrowserRouter id="banana">
      <GlobalStateProvider>
        <Routes>
          <Route path="/" element={<Navigate replace to={"/pt"} />} />
          <Route exact path="/:language" element={<Dashboard />} />
        </Routes>
      </GlobalStateProvider>
    </BrowserRouter>
  );
}
