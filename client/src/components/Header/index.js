import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { Light, Asleep, Login, Logout, User, Book } from "@carbon/icons-react";
import {
  Header,
  HeaderName,
  HeaderGlobalAction,
  HeaderNavigation,
  HeaderGlobalBar,
  Search,
} from "@carbon/react";

import { useGlobalState } from "../../hooks/globalState";

import "./style.scss";
import { handleSearch } from "../../helpers/fuzzySearch";

export default function SimpleHeader() {
  const {
    books,
    setFiltered,
    user,
    lightMode,
    setLightMode,
    searchString,
    setSearchString,
    filterByTitle,
    setFilterByTitle,
  } = useGlobalState();

  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Header aria-label="IBM Platform Name">
      <HeaderName prefix="LSoares">Book Tracker</HeaderName>
      <HeaderNavigation aria-label="Carbon Tutorial"></HeaderNavigation>
      <HeaderGlobalBar>
        {!location.pathname.includes("/login") && (
          <>
            <Search
              id="searchBar"
              value={searchString}
              light
              placeholder={
                filterByTitle
                  ? "Pesquise por título do livro"
                  : "Pesquise por nome do autor"
              }
              disabled={books.length === 0}
              style={{ borderBottom: "0" }}
              onChange={(e) => {
                setSearchString(e.target.value);
              }}
            />
            <HeaderGlobalAction
              aria-label={
                filterByTitle ? "Filtrar por Autor" : "Filtrar Título"
              }
              onClick={() => {
                setFilterByTitle(!filterByTitle);
                setSearchString("");
                setFiltered(books);
              }}
            >
              {filterByTitle ? <User /> : <Book />}
            </HeaderGlobalAction>
          </>
        )}
        <HeaderGlobalAction
          aria-label="Change Theme"
          onClick={() => {
            setLightMode(!lightMode);
          }}
        >
          {lightMode ? <Asleep /> : <Light />}
        </HeaderGlobalAction>
        {!location.pathname.includes("/login") && (
          <HeaderGlobalAction
            aria-label={user ? "Logout" : "Login"}
            onClick={() => {
              navigate("/login");
            }}
          >
            {user ? <Logout /> : <Login />}
          </HeaderGlobalAction>
        )}
      </HeaderGlobalBar>
    </Header>
  );
}
