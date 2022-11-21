import React, { useState, useEffect } from "react";

import { CloseFilled } from "@carbon/icons-react";
import { Tile, Stack, Grid, Column, Button } from "@carbon/react";

import "./style.scss";
import { useGlobalState } from "../../hooks/globalState";
import { deleteBook } from "../../helpers/apiCalls";

export default function BookCard({ bookData }) {
  const {
    books,
    setBooks,
    filtered,
    setFiltered,
    setBookInfo,
    setOpenBookInfoModal,
  } = useGlobalState();

  function handleDeletion() {
    setBooks(books.filter((book) => book._id != bookData._id));
  }

  return (
    <Tile
      className="bookCard"
      onClick={() => {
        setBookInfo(bookData);
        setOpenBookInfoModal(true);
      }}
    >
      <Grid>
        <Column sm={4} md={8} lg={6}>
          <Stack>
            <h3>{bookData?.title}</h3>
            <p>
              <b>Autor:</b> {bookData?.author}
            </p>
            <p>
              <b>Adição:</b> {bookData?.dateAdded}
            </p>
            <p>
              <b>Finalização:</b> {bookData?.dateCompleted || "-"}
            </p>
            <p>
              <b>Status:</b> {bookData?.status}
            </p>
            <p>
              <b>Nota:</b> {bookData?.score || "-"}
            </p>
          </Stack>
        </Column>
        <Column sm={4} md={8} lg={2}>
          <div className="closeIconContainer">
            <CloseFilled
              className="deleteIcon"
              size={24}
              onClick={async (e) => {
                handleDeletion();
                deleteBook(bookData._id);
                e.stopPropagation();
              }}
            />
          </div>
        </Column>
      </Grid>
    </Tile>
  );
}
