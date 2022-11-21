import { Tile, Grid, Column, Stack } from "@carbon/react";

export default function NoBooks() {
  return (
    <Tile className="bookCard">
      <Grid>
        <Column sm={4} md={8} lg={16}>
          <Stack>
            <h3>Sem Resultados para a busca :(</h3>
          </Stack>
        </Column>
      </Grid>
    </Tile>
  );
}
