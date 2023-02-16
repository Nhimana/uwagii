import { createContext, useEffect, useReducer, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import Header from "./components/Header";
import BlogList from "./components/BlogList";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ErrorPage from "./components/ErrorPage";
import Dashoard from "./components/Dashoard";
import Article from "./components/Article";
import Login from "./components/Login";
import Signup from "./components/Signup";
export const baseUrl = "http://localhost:5500/api/v1";
export const blogContext = createContext();
const initialState = {
  blogs: [],
  token: localStorage.getItem("jwt"),
};
export const ACTIONS = {
  SET_BLOGS: "set-blogs",
  ADD_BLOG: "add-blog",
  DELETE_BLOG: "delete-blog",
  UPDATE_BLOG: "update-blog",
  LOGIN: "login",
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_BLOGS: {
      return { blogs: action.playload.blogs };
    }
    case ACTIONS.ADD_BLOG: {
      return { blogs: [action.playload.blog, ...state.blogs] };
    }
    case ACTIONS.DELETE_BLOG: {
      return {
        blogs: state.blogs.filter(({ _id }) => _id !== action.playload.id),
      };
    }
    case ACTIONS.UPDATE_BLOG: {
      const blogs = state.blogs.filter(
        ({ _id }) => _id !== action.playload.blog._id
      );
      return { blogs: [...blogs, action.playload.blog] };
    }
    case ACTIONS.LOGIN: {
      return { ...state, token: action.playload.token };
    }
  }
};

const fetchBlogs = async () => {
  const res = await fetch(`${baseUrl}/blogs`);
  const data = await res.json();
  return data;
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    return () => {
      fetchBlogs().then((data) => {
        dispatch({
          type: ACTIONS.SET_BLOGS,
          playload: { blogs: data },
        });
      });
    };
  }, []);
  return (
    <div className="App">
      <blogContext.Provider value={{ state, dispatch }}>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" exact element={<BlogList />} />

            <Route path="/dashboard" exact element={<Dashoard />} />
            <Route path="/dashboard/:id" exact element={<Dashoard />} />

            <Route path="/blogs/:id" exact element={<Article />} />
            <Route path="/login" exact element={<Login />} />
            <Route path="/signup" exact element={<Signup />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </BrowserRouter>
      </blogContext.Provider>
    </div>
  );
}

export default App;
