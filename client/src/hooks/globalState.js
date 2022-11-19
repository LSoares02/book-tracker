import React, { useContext, useState, createContext, useEffect } from "react";

const GlobalStateContext = createContext({});

export default function GlobalStateProvider({ children }) {
  const [language, setLanguage] = useState("en");
  const [lightMode, setLightMode] = useState(false);

  const [books, setBooks] = useState([]);

  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({ user: "example@email.com" });

  return (
    <GlobalStateContext.Provider
      value={{
        language,
        setLanguage,
        lightMode,
        setLightMode,
        books,
        setBooks,
        loading,
        setLoading,
        user,
        setUser,
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
