import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, NavLink } from "react-router-dom";
import SignUpModal from "./SignUpModal"
import { login, demouser } from "../../store/session";
import "./LoginForm.css";

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      console.log("DATA", data)
      setErrors(data);
    }
  };

  const demoOnClick = async (e) => {
    e.preventDefault();
    await dispatch(demouser("demo@aa.io", "password"));
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <div id="login-html-body">
      <video id="video-header" autoPlay playsInline loop>
        <source
          type="video/mp4"
          src="https://res.cloudinary.com/matchaprince/video/upload/v1656800970/220509_04_London_Student_4k_017_preview_muequc.mp4"
        />
      </video>
      <div>
        <h2 className="login-title-header">Going</h2>
        <h2 id="login-title-splitzy">splitzy</h2>
        <h2 className="login-title-header">made easy.</h2>
      </div>
      <form id="login-form" onSubmit={onLogin}>
        <div>
          {errors.map((error, ind) => (
            <div key={ind}>{error.split(":")[1]}</div>

          ))}
        </div>
        <div id="login-auth-container">
          <label className="login-label" htmlFor="email">
            Email
          </label>
          <input
            name="email"
            type="text"
            className="login-input"
            // placeholder="Email"
            required
            value={email}
            onChange={updateEmail}
          />
          <label className="login-label" htmlFor="password">
            Password
          </label>
          <input
            name="password"
            type="password"
            className="login-input"
            required
            // placeholder="Password"
            value={password}
            onChange={updatePassword}
          />
        </div>
        <div id="login-btns-container">
          <button id="login-btn" type="submit">
            Log in
          </button>
          <div id="or-text-container">
            <p>———————&nbsp;&nbsp;</p>
            <p>or</p>
            <p>&nbsp;&nbsp;———————</p>
          </div>
          <button onClick={demoOnClick} id="demo-btn">
            Demo
          </button>
        </div>
        <div id="not-registered-text-container">
          <p id="not-registered-text">Not a registered user?</p>
          <NavLink id="sign-up-link" to="/sign-up" component={SignUpModal}>Sign up</NavLink>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
