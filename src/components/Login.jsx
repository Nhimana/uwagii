import React, { useContext } from "react";
import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ACTIONS, baseUrl, blogContext } from "../App";

export default function Login() {
  const { dispatch } = useContext(blogContext);
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  const login = async (e) => {
    e.preventDefault();
    const userCredentials = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    const req = await fetch(`${baseUrl}/auth/login`, {
      method: "POST",
      body: JSON.stringify(userCredentials),
      headers: {
        "content-type": "application/json",
      },
    });
    const res = await req.json();
    if (req.ok) {
      dispatch({
        type: ACTIONS.LOGIN,
        playload: { token: res.token },
      });
      localStorage.setItem('jwt', res.token)
      navigate("/");
    }
  };
  return (
    <div>
      <form onSubmit={login}>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" ref={emailRef} />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" ref={passwordRef} />
        </div>
        <button className="btn">login</button>
        <Link to="/signup">sign up</Link>
      </form>
    </div>
  );
}
