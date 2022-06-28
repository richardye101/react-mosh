import React, { Component } from "react";
import { Link } from "react-router-dom";
import _ from "lodash";
import Like from "./common/like.jsx";
import Table from "./common/table.jsx";
import auth from "../services/authService.js";

class MoviesTable extends Component {
  user = auth.getCurrentUser();

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
    const { movies, onSort, sortColumn } = this.props;

    // Hiding delete column based on whether user is an admin
    if (!this.user?.isAdmin) {
      const colsNoDelete = _([...this.columns])
        .filter((c) => c?.key !== "delete")
        .value();
      this.columns = colsNoDelete;
    }

    return (
      <Table
        columns={this.columns}
        data={movies}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default MoviesTable;
