import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
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
      setErrors(data);
    }
  };

  const demoOnClick = async (e) => {
    e.preventDefault()
    await dispatch(demouser('demo@aa.io', 'password'));
  }

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
          <h2 id="login-title-header">
          Going<br/>
          Splitzies<br/>
          made easy.</h2>
      <form id="login-form" onSubmit={onLogin}>
        <div>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
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
              // placeholder="Password"
              value={password}
              onChange={updatePassword}
            />
        </div>
        <div id="login-btns-container">
        <button id="login-btn" type="submit">
          Log in
        </button>
          <button
          onClick={demoOnClick}
          id='demo-btn'
          >Demo</button>
          </div>
      </form>
    </div>
  );
};

export default LoginForm;
