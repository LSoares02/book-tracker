import api from "../services/api";

export async function getUserBookList(user) {
  const response = await api.post("/mongo/get", {
    user: false,
    username: user.user,
  });
  console.log(response.data);
  return response.data;
}

export async function insertBook(bookInfo, user) {
  bookInfo.user = user.user;
  const response = await api.post("/mongo/insert", {
    user: false,
    document: bookInfo,
  });
  console.log(response.data);
  return response.data;
}

export async function deleteBook(bookId) {
  const response = await api.post("/mongo/delete", {
    user: false,
    _id: bookId,
  });
  console.log(response.data);
  return response.data;
}
