import React from "react";
import "./blog.css";
import { Link } from "react-router-dom";

export default function SingleBlog({
  _id,
  title,
  subTitle,
  image,
  updateAt,
  body,
}) {
  return (
    <Link to={`/blogs/${_id}`} style={{ color: "inherit" }} className="article">
      <h3>{title}</h3>
      <h4>{subTitle}</h4>
      <img src={image} alt="" />
      <p>{updateAt}</p>
      <div>{body}</div>
    </Link>
  );
}
