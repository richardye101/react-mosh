import * as genresAPI from "./genreService";
import http from "./httpService";
const apiEndpoint = "/movies";

function movieUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export async function getMovies() {
  const { data: movies } = await http.get(apiEndpoint);
  console.log("GET movies " + movies);
  return movies;
}

export async function getMovie(id) {
  const res = await http.get(movieUrl(id));
  console.log(res.status);
  const movie = res.data;
  return movie;
}

export async function saveMovie(movie) {
  const movieUpdated = { ...movie };
  if (movie._id) {
    delete movieUpdated._id;
    return await http.put(movieUrl(movie._id), movieUpdated);
    // Header set in httpService
    // , {
    //   headers: { "x-auth-token": config["xAuthToken"] },
    // }
  }
  // if we are creating a new movie
  return await http.post(apiEndpoint, movieUpdated);
}

export async function deleteMovie(movieId) {
  await http.delete(movieUrl(movieId));
  // let movieInDb = movies.find((m) => m._id === id);
  // movies.splice(movies.indexOf(movieInDb), 1);
  // return movieInDb;
}
