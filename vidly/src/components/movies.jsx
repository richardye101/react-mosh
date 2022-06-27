import React, { useEffect, useReducer } from "react";
import MoviesTable from "./moviesTable.jsx";
import Paginator from "./common/pagination.jsx";
import { deleteMovie, getMovies } from "../services/movieService.js";
import { getGenres } from "../services/genreService.js";
import { paginate } from "../utils/paginate.js";
import ListGroup from "./common/listGroup.jsx";
import SearchBox from "./common/searchBox.jsx";
import _ from "lodash";
import { Link, useNavigate } from "react-router-dom";
import { getMovie } from "../services/movieService.js";
import { toast } from "react-toastify";

const Movies = (props) => {
  const [state, setState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      movies: [],
      genres: [],
      selectedGenre: null,
      curPage: 1,
      pageSize: 4,
      sortColumn: { path: "title", order: "asc" },
      searchQuery: "",
    }
  );
  const user = props.user;

  const navigate = useNavigate();

  useEffect(() => {
    const setStates = async () => {
      const genres = await getGenres();
      const movies = await getMovies();
      setState({
        movies: movies,
        genres: [{ _id: "", name: "All Genres" }, ...genres], //...getGenres()],
        selectedGenre: null,
      });
    };

    setStates();
  }, []);

  const handleDelete = async (movie) => {
    // pessimistic update
    const originalMovies = state.movies;
    const movies = originalMovies.filter((m) => m._id !== movie._id);
    setState({ movies: movies });

    try {
      await deleteMovie(movie._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        toast.error("This movie has already been deleted.");
      }
      setState({ movies: originalMovies });
    }
  };

  const handleLike = (movie) => {
    const movies = [...state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    setState({ movies });
  };

  const handlePageChange = (page) => {
    setState({ curPage: page });
  };

  const handleGenreSelect = (genre) => {
    setState({ selectedGenre: genre, curPage: 1, searchQuery: "" });
  };

  const handleSort = (sortColumn) => {
    console.log(
      `Sorting by ${state.sortColumn.path} in ${state.sortColumn.order}`
    );
    setState({ sortColumn });
  };

  const handleSearch = (query) => {
    setState({ selectedGenre: null, curPage: 1, searchQuery: query });
  };

  const getPagedData = () => {
    const {
      curPage,
      pageSize,
      movies: allMovies,
      selectedGenre,
      sortColumn,
      searchQuery,
    } = state;

    let filtered = allMovies;
    if (selectedGenre && selectedGenre._id) {
      // if we have an id as well (single genre), then we filter, if not then dont
      filtered = allMovies.filter((m) => m.genre._id === selectedGenre._id);
    }
    if (searchQuery) {
      filtered = filtered.filter((movie) =>
        movie.title.toLowerCase().includes(searchQuery)
      );
    }
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const movies = paginate(sorted, curPage, pageSize);

    return { totalCount: filtered.length, data: movies };
  };

  const { length: count } = state.movies;
  const { curPage, pageSize, genres, selectedGenre, sortColumn, searchQuery } =
    state;

  if (count === 0) {
    return <p>There are no movies in the database.</p>;
  }

  const { totalCount, data: movies } = getPagedData();

  return (
    <div className="row">
      <div className="col-3">
        <ListGroup
          items={genres}
          selectedItem={selectedGenre}
          onItemSelect={handleGenreSelect}
        />
      </div>
      <div className="col">
        {user && (
          <Link className="btn btn-primary" to="/movies/new">
            New Movie
          </Link>
        )}
        <p>Showing {totalCount} movies in the database</p>
        <SearchBox value={searchQuery} onChange={handleSearch} />
        <MoviesTable
          movies={movies}
          sortColumn={sortColumn}
          onLike={handleLike}
          onDelete={handleDelete}
          onSort={handleSort}
        />
        <Paginator
          curPage={curPage}
          pageSize={pageSize}
          totalMovies={totalCount}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

// class MoviesOld extends Component {
// state = {
//   movies: [],
//   genres: [],
//   selectedGenre: [],
//   curPage: 1,
//   pageSize: 4,
//   sortColumn: { path: "title", order: "asc" },
// };
// constructor(props) {
//   super(props);
//   this.state.movies.map((movie) => {
//     movie.liked = false;
//   });
// }
// componentDidMount() {
//   this.setState({
//     movies: getMovies(),
//     genres: [{ _id: "", name: "All Genres" }, ...getGenres()],
//     selectedGenre: getGenres(),
//   });
// }
// handleDelete = (movie) => {
//   console.log(movie);
//   const movies = this.state.movies.filter((m) => m._id !== movie._id);
//   this.setState({ movies: movies });
// };

// handleLike = (movie) => {
//   const movies = [...this.state.movies];
//   const index = movies.indexOf(movie);
//   movies[index] = { ...movies[index] };
//   movies[index].liked = !movies[index].liked;
//   this.setState({ movies });
// };

// handlePageChange = (page) => {
//   this.setState({ curPage: page });
// };

// handleGenreSelect = (genre) => {
//   this.setState({ selectedGenre: genre, curPage: 1 });
// };

// handleSort = (sortColumn) => {
//   this.setState({ sortColumn });
// };
// getPagedData = () => {
//   const {
//     curPage,
//     pageSize,
//     movies: allMovies,
//     selectedGenre,
//     sortColumn,
//   } = this.state;

//   const filtered =
//     selectedGenre && selectedGenre._id // if we have an id as well, then we filter, if not then dont
//       ? allMovies.filter((m) => m.genre._id === selectedGenre._id)
//       : allMovies;
//   const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
//   const movies = paginate(sorted, curPage, pageSize);

//   return { totalCount: filtered.length, data: movies };
// };

// render() {
//   object destructuring and renaming at onces
// const { length: count } = this.state.movies;
// const { curPage, pageSize, genres, selectedGenre, sortColumn } = this.state;

// if (count === 0) {
//   return <p>There are no movies in the database.</p>;
// }

// const { totalCount, data: movies } = this.getPagedData();

// return (
//   <div className="row">
//     <div className="col-3">
//       <ListGroup
//         items={genres}
//         selectedItem={selectedGenre}
//         onItemSelect={this.handleGenreSelect}
//       />
//     </div>
//     <div className="col">
//       <button className="btn btn-primary" onClick={() => navigate("/new")}>
//         New Movie
//       </button>
//       <p>Showing {totalCount} movies in the database</p>
//       <MoviesTable
//         movies={movies}
//         sortColumn={sortColumn}
//         onLike={this.handleLike}
//         onDelete={this.handleDelete}
//         onSort={this.handleSort}
//       />
//       <Paginator
//         curPage={curPage}
//         pageSize={pageSize}
//         totalMovies={totalCount}
//         onPageChange={this.handlePageChange}
//       />
//     </div>
//   </div>
// );
//   }
// }

export default Movies;
