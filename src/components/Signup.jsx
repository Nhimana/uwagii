import React, { useContext } from "react";
import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { baseUrl } from "../App";

export default function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  const signup = async (e) => {
    e.preventDefault();
    const userCredentials = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    const req = await fetch(`${baseUrl}/auth/signup`, {
      method: "POST",
      body: JSON.stringify(userCredentials),
      headers: {
        "content-type": "application/json",
      },
    });
    if (req.ok) {
      navigate("/");
    }
  };
  return (
    <div>
      <form onSubmit={signup}>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" ref={emailRef} />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" ref={passwordRef} />
        </div>
        <button className="btn">signup</button>
        <Link to="/login">login</Link>
      </form>
    </div>
  );
}
