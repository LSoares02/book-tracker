import Header from "../../components/Header";
import { Theme, Grid, Column, Loading } from "@carbon/react";

import "./style.scss";
import BookCard from "../../components/BookCard";
import { useGlobalState } from "../../hooks/globalState";
import { useEffect } from "react";
import { getUserBookList } from "../../helpers/apiCalls";
import AddBooksCard from "../../components/AddBooksCard";
import BookInfoModal from "../../components/BookInfoModal";
import NoBooks from "../../components/NoBooksCard";

export default function Dashboard() {
  const {
    lightMode,
    user,
    books,
    setBooks,
    filtered,
    setFiltered,
    loading,
    setLoading,
  } = useGlobalState();

  useEffect(() => {
    saveBooksOnState();
  }, []);

  async function saveBooksOnState() {
    setLoading(true);
    const books = await getUserBookList(user);
    if (books.length > 0) {
      setBooks(books);
      setFiltered(books);
    }
    setLoading(false);
  }

  const bookCards = filtered
    .map((book, index) => (
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
    );

  return (
    <Theme theme={lightMode ? "white" : "g100"}>
      <Header />
      <BookInfoModal />
      <Grid>
        {books.length > 0 ? (
          bookCards.length > 1 ? (
            bookCards
          ) : (
            <Column className={"mainColumn"} sm={4} md={8} lg={16} xlg={16}>
              <NoBooks />
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
