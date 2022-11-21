import Fuse from "fuse.js";

export function handleSearch(searchValue, filterByTitle, books, setFiltered) {
  console.log(books);
  if (searchValue != "") {
    const fuse = new Fuse(books, {
      keys: filterByTitle ? ["title"] : ["author"],
      threshold: 0.4,
    });
    const searchResult = fuse.search(searchValue).map((result) => {
      return result.item;
    });
    setFiltered(searchResult);
  } else {
    setFiltered(books);
  }
}
