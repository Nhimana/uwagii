import React, { useContext } from "react";
import SingleBlog from "./SingleBlog";
import { blogContext } from "../App";

const BlogList = () => {
  const {
    state: { blogs },
  } = useContext(blogContext);

  console.log(blogs);
  return (
    <section>
      <div className="container">
        <h1>all our blogs</h1>
        {blogs.map((blog) => (
          <SingleBlog key={blog._id} {...blog} />
        ))}
      </div>
    </section>
  );
};
export default BlogList;
