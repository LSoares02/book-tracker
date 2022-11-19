import React from "react";
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard/index";
import GlobalStateProvider, { useGlobalState } from "./hooks/globalState";
import LoginPage from "./pages/Login";

export default function Router() {
  const RequireAuth = ({ children }) => {
    const { user } = useGlobalState();
    if (!user) {
      return <Navigate replace to={"/login"} />;
    }
    return children;
  };

  return (
    <BrowserRouter id="banana">
      <GlobalStateProvider>
        <Routes>
          <Route path="/" element={<Navigate replace to={"/login"} />} />
          <Route exact path="/login" element={<LoginPage />} />
          <Route
            exact
            path="/books"
            element={
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            }
          />
        </Routes>
      </GlobalStateProvider>
    </BrowserRouter>
  );
}
