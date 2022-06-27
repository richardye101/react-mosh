import React from "react";
import { useLocation, useParams } from "react-router-dom";

// need this function to get the url query params such as sortBy
const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

// all new react routes are functions instead of classes
const Posts = () => {
  const params = useParams();
  const query = useQuery();
  return (
    <div>
      <h1>Posts</h1>
      Year: {params.year}, Month: {params.month}, Params: {query.get("sortBy")}
    </div>
  );
};

export default Posts;
