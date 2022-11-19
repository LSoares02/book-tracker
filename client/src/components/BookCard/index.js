import React, { useState, useEffect } from "react";
import { Tile, Stack } from "@carbon/react";

import "./style.scss";

export default function BookCard({ bookData }) {
  return (
    <Tile className="bookCard">
      <Stack>
        <h1>{bookData?.title}</h1>
        <h4>Autor: {bookData?.autor}</h4>
        <h4>Adição: {bookData?.dateAdded}</h4>
        <h4>Finalização: {bookData?.dateCompleted || "-"}</h4>
        <h4>Status: {bookData?.status}</h4>
        <h4>Nota: {bookData?.score || "-"}</h4>
      </Stack>
    </Tile>
  );
}
