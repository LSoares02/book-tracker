import React from "react";
import { useGlobalState } from "../../hooks/globalState";

import { ToastNotification } from "@carbon/react";

import "./style.scss";
export default function Notification() {
  const { notificationText, showNotification, setShowNotification } =
    useGlobalState();
  return (
    showNotification && (
      <ToastNotification
        id="notification"
        caption={notificationText.content}
        iconDescription="click to close"
        timeout={4900}
        onClose={() => {
          setShowNotification(false);
        }}
        kind={notificationText.kind}
        onCloseButtonClick={() => {
          setShowNotification(false);
        }}
        title={notificationText.title}
      />
    )
  );
}
