import http from "./httpService";
import config from "../config.json";
const apiEndpoint = "/users";

function movieUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export async function register(user) {
  return await http.post(apiEndpoint, {
    email: user.username,
    password: user.password,
    name: user.name,
    phone: user.phone,
  });
}
