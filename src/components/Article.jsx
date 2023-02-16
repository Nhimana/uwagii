import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { blogContext } from "../App";

export default function Article() {
  const [blog, setBlog] = useState({});
  const { id } = useParams();
  const { blogs } = useContext(blogContext);
  useEffect(() => {
    setBlog(blogs.find((blog) => blog._id == id));
  }, [blogs]);

  return (
    <div>
      <h1>{blog?.title}</h1>
      <h2>{blog?.subTitle}</h2>
      <img src={blog?.image} alt="" />
      <p>{blog?.body}</p>
    </div>
  );
}
