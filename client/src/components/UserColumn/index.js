import React, { useState, useEffect } from "react";
import { Tile, Stack, Grid, Column } from "@carbon/react";

import "./style.scss";

export default function UserColumn() {
  return (
    <Tile className="bookCard">
      <Stack>
        <h1>Dom Quixote</h1>
        <h4>Autor: </h4>
        <h4>Adição: </h4>
        <h4>Finalização: </h4>
        <h4>Status: </h4>
        <h4>Nota: </h4>
      </Stack>
    </Tile>
  );
}
