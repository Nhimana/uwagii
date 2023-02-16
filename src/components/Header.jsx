import React from "react";
import "./header.css";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { Link, useHref } from "react-router-dom";

export default function Header() {
  return (
    <header style={{ height: `${location.pathname !== "/" ? "70px" : ""}` }}>
      <div className="container">
        <ul className="social-links">
          <a href="#">
            <FaFacebook />
          </a>
          <a href="#">
            <FaInstagram />
          </a>
          <a href="#">
            <FaTwitter />
          </a>
          <a href="#">
            <FaYoutube />
          </a>
        </ul>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>

            <li>
              <Link to="/dashboard">dashboard</Link>
            </li>
            <li>
              <Link to="/login">login</Link>
            </li>
          </ul>
        </nav>
      </div>
      {location.pathname === "/" ? (
        <div className="banner">
          <img id="img" src="/banner.jpg" alt="" />

          <div>
            <h1>Lorem ipsum dolor sit amet.</h1>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quod
              nostrum sunt tenetur.
            </p>
          </div>
        </div>
      ) : (
        ""
      )}
    </header>
  );
}
