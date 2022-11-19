import api from "../services/api";

export async function getUserBookList(user) {
  const response = await api.post("/mongo/get", {
    user: false,
    username: user.user,
  });
  console.log(response.data);
  return response.data;
}
