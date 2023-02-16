import React, { useContext } from "react";
import "./dashboard.css";
import { ACTIONS, baseUrl, blogContext } from "../App";
import { useRef } from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
export default function Dashoard() {
  const {
    state: { blogs, token },
    dispatch,
  } = useContext(blogContext);
  const titleRef = useRef();
  const imageRef = useRef();
  const subTitleRef = useRef();
  const bodyRef = useRef();
  const [image, setImage] = useState("");
  const { id } = useParams();

  const createImage = async (e) => {
    const fileReader = new FileReader();
    fileReader.onload = (event) => {
      setImage(event.target.result);
    };
    fileReader.readAsDataURL(e.target.files[0]);
  };

  const postBlog = async (e) => {
    e.preventDefault();
    const blog = {
      title: titleRef.current.value,
      image: image,
      body: bodyRef.current.value,
      subTitle: subTitleRef.current.value,
    };
    const req = await fetch(`${baseUrl}/blogs${id ? "/" + id : ""}`, {
      method: `${id ? "PUT" : "POST"}`,
      body: JSON.stringify(blog),
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const res = await req.json();
    if (req.ok) {
      if (id)
        return dispatch({
          type: ACTIONS.UPDATE_BLOG,
          playload: { blog: { ...blog, _id: res._id } },
        });
      dispatch({
        type: ACTIONS.ADD_BLOG,
        playload: { blog: res },
      });
    }
  };
  return (
    <div>
      <div className="container">
        <h1>Admin Dashoard</h1>
        <form onSubmit={postBlog}>
          <div className="control">
            <label htmlFor="title">Title</label>
            <input type="text" ref={titleRef} id="title" />
          </div>

          <div className="control">
            <label htmlFor="subTitle">sub-title</label>
            <input type="text" ref={subTitleRef} id="subTitle" />
          </div>
          <div className="control">
            <label htmlFor="image">Image</label>

            <input
              onChange={createImage}
              type="file"
              ref={imageRef}
              id="image"
            />
          </div>
          <div className="control">
            <label htmlFor="body">Body</label>
            <textarea id="body" ref={bodyRef}></textarea>
          </div>

          <div className="flex">
            <button className="btn">post a blog</button>
            <button className="btn">update a blog</button>
          </div>
        </form>
        <BlogListItems blogs={blogs} dispatch={dispatch} token={token} />
      </div>
    </div>
  );
}

const BlogListItems = ({ blogs, dispatch, token }) => {
  const deleteBlog = async (id) => {
    const req = await fetch(`${baseUrl}/blogs/${id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (req.ok) {
      dispatch({
        type: ACTIONS.DELETE_BLOG,
        playload: { id },
      });
    }
  };
  return (
    <ul className="mt-4 blog-items">
      {blogs.map((blog) => (
        <li key={blog._id}>
          <button onClick={() => deleteBlog(blog._id)} className="btn danger">
            delete a blog
          </button>

          <Link to={`/dashboard/${blog._id}`}>{blog.title}</Link>
        </li>
      ))}
    </ul>
  );
};
