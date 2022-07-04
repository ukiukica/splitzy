import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { signUp } from "../../store/session";
import "./SignUpForm.css";

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(
        signUp(firstName, lastName, username, email, password)
      );
      if (data) {
        setErrors(data);
      }
    }
  };

  useEffect(() => {
    const errors = [];

    // if (firstName.length < 1) {
    //   errors.push("Please provide a first name")
    // }

    // if (lastName.length < 1) {
    //   errors.push("Please provide a last name")
    // }

    // if (username.length < 1) {
    //   errors.push("Please provide a username")
    // }

    // if (email.length < 1) {
    //   errors.push("Please provide an email")
    // }

    // if (password.length < 1) {
    //   errors.push("Please provide a password")
    // }

    if (repeatPassword.length < password.length) {
      errors.push("Please confirm your password");
    } else if (repeatPassword !== password) {
      errors.push("Passwords must match");
    }

    setErrors(errors);
  }, [repeatPassword, password, firstName, lastName, username]);

  const updateFirstName = (e) => {
    setFirstName(e.target.value);
  };

  const updateLastName = (e) => {
    setLastName(e.target.value);
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <div className="signup-form-div">
      <div className="signup-form-inner-div">
        <h1 id="signup-form-heading">Sign Up for Free</h1>
        <form className="signup-form" onSubmit={onSignUp}>
          <div className="signup-form-labels-inputs-container">
          <div className="signup-form-labels-inputs-div">
            <div className="signup-form-labels-inputs">
              <label className="signup-form-labels">First Name</label>
              <input
                className="signup-form-inputs"
                type="text"
                name="first_name"
                onChange={updateFirstName}
                value={firstName}
              ></input>
            </div>
            <div className="signup-form-labels-inputs">
              <label className="signup-form-labels">Last Name</label>
              <input
                className="signup-form-inputs"
                type="text"
                name="last_name"
                onChange={updateLastName}
                value={lastName}
              ></input>
            </div>
            <div className="signup-form-labels-inputs">
              <label className="signup-form-labels">User Name</label>
              <input
                className="signup-form-inputs"
                type="text"
                name="username"
                onChange={updateUsername}
                value={username}
              ></input>
            </div>
            <div className="signup-form-labels-inputs">
              <label className="signup-form-labels">Email</label>
              <input
                className="signup-form-inputs"
                type="text"
                name="email"
                onChange={updateEmail}
                value={email}
              ></input>
            </div>
            <div className="signup-form-labels-inputs">
              <label className="signup-form-labels">Password</label>
              <input
                className="signup-form-inputs"
                type="password"
                name="password"
                onChange={updatePassword}
                value={password}
                required={true}
              ></input>
            </div>
            <div className="signup-form-labels-inputs">
              <label className="signup-form-labels">Confirm Password</label>
              <input
                className="signup-form-inputs"
                type="password"
                name="repeat_password"
                onChange={updateRepeatPassword}
                value={repeatPassword}
                required={true}
              ></input>
            </div>
            <div className="signup-form-errors-div">
              {errors.map((error, ind) => (
                <div className="signup-form-errors-li" key={ind}>
                  {error}
                </div>
              ))}
            </div>
          </div>
          <div id="signup-form-btn-div">
            <button id="signup-form-btn" disabled={errors.length} type="submit">
              Sign Up
            </button>
          </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
