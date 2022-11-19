import Header from "../../components/Header";
import { Theme, Grid, Column, Loading } from "@carbon/react";

import "./style.scss";
import BookCard from "../../components/BookCard";
import { useGlobalState } from "../../hooks/globalState";
import { useEffect } from "react";
import { getUserBookList } from "../../helpers/apiCalls";
import AddBooksCard from "../../components/AddBooksCard";
import BookInfoModal from "../../components/BookInfoModal";

export default function Dashboard() {
  const { lightMode, user, books, setBooks, loading, setLoading } =
    useGlobalState();

  useEffect(() => {
    saveBooksOnState();
  }, []);

  async function saveBooksOnState() {
    setLoading(true);
    const books = await getUserBookList(user);
    if (books.length > 0) {
      setBooks(books);
    }
    setLoading(false);
  }

  return (
    <Theme theme={lightMode ? "white" : "g100"}>
      <Header />
      <BookInfoModal />
      <Grid>
        {books.length > 0 ? (
          books
            .map((book) => (
              <Column className={"mainColumn"} sm={2} md={4} lg={8} xlg={8}>
                <BookCard bookData={book} />
              </Column>
            ))
            .concat(
              <Column className={"mainColumn"} sm={4} md={8} lg={16} xlg={32}>
                <AddBooksCard
                  message={{
                    title: "Uma bela coleção!",
                    description: "Quer adicionar mais algum livro?",
                  }}
                />
              </Column>
            )
        ) : (
          <Column className={"mainColumn"} sm={4} md={8} lg={16} xlg={32}>
            {loading ? (
              <Loading />
            ) : (
              <AddBooksCard
                message={{
                  title: "Não foi encontrado nenhum Livro...",
                  description: "Cadastre seu primeiro livro 😉",
                }}
              />
            )}
          </Column>
        )}
      </Grid>
    </Theme>
  );
}
