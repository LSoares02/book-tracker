import React, { useContext, useState, createContext, useEffect } from "react";

const GlobalStateContext = createContext({});

export default function GlobalStateProvider({ children }) {
  const [language, setLanguage] = useState("en");
  const [lightMode, setLightMode] = useState(true);

  const [books, setBooks] = useState([]);
  const [bookInfo, setBookInfo] = useState({});
  const [openBookInfoModal, setOpenBookInfoModal] = useState(false);

  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  const [showNotification, setShowNotification] = useState(false);
  const [notificationText, setNotificationText] = useState(false);

  return (
    <GlobalStateContext.Provider
      value={{
        language,
        setLanguage,
        lightMode,
        setLightMode,
        books,
        setBooks,
        bookInfo,
        setBookInfo,
        openBookInfoModal,
        setOpenBookInfoModal,
        loading,
        setLoading,
        user,
        setUser,
        showNotification,
        setShowNotification,
        notificationText,
        setNotificationText,
      }}
    >
      {children}
    </GlobalStateContext.Provider>
  );
}

export function useGlobalState() {
  const context = useContext(GlobalStateContext);

  if (!context) {
    throw new Error("useGlobalState must be used within a GlobalStateProvider");
  }

  return context;
}
