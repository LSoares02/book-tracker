import React, { useState, useEffect } from "react";
import { Tile, Stack, Grid, Column } from "@carbon/react";
import { AddAlt } from "@carbon/icons-react";

import "./style.scss";

export default function AddBooksCard({ message }) {
  return (
    <Tile
      id="noBookCard"
      onClick={() => {
        alert("Open Add Book Modal");
      }}
    >
      <Grid>
        <Column sm={3} md={7} lg={15} xlg={31}>
          <h1>{message.title}</h1>
          <h4>{message.description}</h4>
        </Column>
        <Column sm={1} md={1} lg={1} xlg={1}>
          <div id="addIcon">
            <AddAlt size={36} />
          </div>
        </Column>
      </Grid>
    </Tile>
  );
}
