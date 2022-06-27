import React from "react";
import "@fortawesome/fontawesome-free";

// Input: liked: boolean
// Output: onClick

const Like = (props) => {
  let classes = "fa fa-heart";
  if (!props.liked) classes += "-o";
  return (
    <>
      <a>
        <i
          className={classes}
          aria-hidden="true"
          onClick={props.onLike}
          style={{ cursor: "pointer" }}
        ></i>
      </a>
    </>
  );
};

export default Like;
