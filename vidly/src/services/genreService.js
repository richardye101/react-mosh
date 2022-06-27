import http from "./httpService";
import config from "../config.json";

const apiEndpoint = "/api/genres";

// export const genres = [
//   { _id: "5b21ca3eeb7f6fbccd471818", name: "Action" },
//   { _id: "5b21ca3eeb7f6fbccd471814", name: "Comedy" },
//   { _id: "5b21ca3eeb7f6fbccd471820", name: "Thriller" },
// ];

export async function getGenres() {
  const { data: genres } = await http.get(apiEndpoint);
  // didnt need to set headers i guess
  // , {
  //   headers: { "x-auth-token": config["x-auth-token"] },
  // }
  return genres;
}
