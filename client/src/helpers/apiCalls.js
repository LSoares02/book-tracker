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

export async function login(userData) {
  const response = await api.post("/mongo/login", {
    user: true,
    ...userData,
  });
  return response.data;
}

export async function signup(userData) {
  const response = await api.post("mongo/signup", {
    user: true,
    username: userData.username,
    document: {
      user: userData.username,
      password: userData.password,
    },
  });
  return response.data;
}
