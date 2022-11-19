import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import {
  Light,
  Asleep,
  Login,
  Logout,
  Notification,
  NotificationNew,
} from "@carbon/icons-react";
import {
  Header,
  HeaderName,
  HeaderGlobalAction,
  HeaderNavigation,
  HeaderGlobalBar,
} from "@carbon/react";

import { useGlobalState } from "../../hooks/globalState";

import "./style.scss";

export default function SimpleHeader() {
  const { user, lightMode, setLightMode } = useGlobalState();

  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Header aria-label="IBM Platform Name">
      <HeaderName prefix="LSoares">Book Tracker</HeaderName>
      <HeaderNavigation aria-label="Carbon Tutorial"></HeaderNavigation>
      <HeaderGlobalBar>
        <HeaderGlobalAction
          aria-label="Change Theme"
          onClick={() => {
            setLightMode(!lightMode);
          }}
        >
          {lightMode ? <Asleep /> : <Light />}
        </HeaderGlobalAction>
        {!location.pathname.includes("/login") && (
          <>
            <HeaderGlobalAction aria-label="Notifications" onClick={() => {}}>
              <Notification />
            </HeaderGlobalAction>
            <HeaderGlobalAction
              aria-label={user ? "Logout" : "Login"}
              onClick={() => {
                navigate("/login");
              }}
            >
              {user ? <Logout /> : <Login />}
            </HeaderGlobalAction>
          </>
        )}
      </HeaderGlobalBar>
    </Header>
  );
}
