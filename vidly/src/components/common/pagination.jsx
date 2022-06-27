import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";

const Paginator = ({ curPage, pageSize, onPageChange, totalMovies }) => {
  const numPages = Math.ceil(totalMovies / pageSize);

  //   can use lodash instead
  //   const pages = [...Array(numPages).keys()].map((i) => i + 1);
  const pages = _.range(1, numPages + 1);
  if (numPages === 1) return null;
  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        {pages.map((page) => (
          <li
            className={page === curPage ? "page-item active" : "page-item"}
            key={page}
          >
            <a className="page-link" onClick={() => onPageChange(page)}>
              {page}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

Paginator.propTypes = {
  curPage: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  totalMovies: PropTypes.number.isRequired,
};

export default Paginator;
