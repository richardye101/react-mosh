import React, { Component } from "react";
import { Link } from "react-router-dom";
import auth from "../services/authService.js";
import Like from "./common/like.jsx";
import Table from "./common/table.jsx";
import _ from "lodash";

class MoviesTable extends Component {
  columns = [
    // { path: "title", label: "Title" },
    {
      path: "title",
      label: "Title",
      content: (item) => <Link to={`${item._id}`}>{item.title}</Link>,
    },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: "like", // these properties are needed so each header has unique key
      content: (item) => (
        <Like liked={item.liked} onLike={() => this.props.onLike(item)} />
      ),
    },
    {
      key: "delete",
      content: (item) => (
        <button
          onClick={() => this.props.onDelete(item)}
          className="btn btn-danger btn-sm"
        >
          Delete
        </button>
      ),
    },
  ];

  render() {
    const { movies, onSort, columns, sortColumn } = this.props;
    if (!auth.isAdmin()) {
      const columns = _.filter(columns, (i) => i.key !== "delete");
      console.log(columns);
    }
    return (
      <Table
        columns={columns}
        data={movies}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default MoviesTable;
