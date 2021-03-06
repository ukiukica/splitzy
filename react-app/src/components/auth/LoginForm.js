import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { login } from "../../store/session";
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
      <form id="login-form" onSubmit={onLogin}>
        <div>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <h2 id="login-title-header">Going Splitzies made easy.</h2>
        <div id="login-auth-container">
          <div>
            <label className="login-label" htmlFor="email">
              Email
            </label>
            <input
              name="email"
              type="text"
              className="login-input"
              placeholder="Email"
              value={email}
              onChange={updateEmail}
            />
          </div>
          <div>
            <label className="login-label" htmlFor="password">
              Password
            </label>
            <input
              name="password"
              type="password"
              className="login-input"
              placeholder="Password"
              value={password}
              onChange={updatePassword}
            />
          </div>
        </div>
        <button id="login-form-btn" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
