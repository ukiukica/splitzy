import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import LogoutButton from "./auth/LogoutButton";
import SearchBar from "./SearchBar";
import { demouser } from "../store/session";
import "./NavBar.css";

function NavBar() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);

  const demoOnClick = async (e) => {
    e.preventDefault()
    await dispatch(demouser('demo@aa.io', 'password'));
  }

  let sessionLinks;
  if (!sessionUser) {
    sessionLinks = (
      <div className="nav-bar-logged-out-div">
        <div>
          <NavLink
            to="/login"
            exact={true}
            activeClassName="active"
            className="logged-out-links"
            id="login-btn"
          >
            Login
          </NavLink>
        </div>
        <div>
          <NavLink
            to="/sign-up"
            exact={true}
            activeClassName="active"
            className="logged-out-links"
            id="signup-btn"
          >
            Sign Up
          </NavLink>
        </div>
        <div>
          <button
          onClick={demoOnClick}
          activeClassName="active"
          className="logged-out-links"
          id='demo-btn'
          >Demo</button>
        </div>
      </div>
    );
  } else {
    sessionLinks = (
      <div className="nav-bar-session">
        <div>
          <NavLink
            to="/bills/createbill"
            exact={true}
            activeClassName="active"
            className="logged-in-links"
            id="create-bill-link"
          >
            Create a bill
          </NavLink>
        </div>
        <div>
          <NavLink
            to="/bills"
            exact={true}
            activeClassName="active"
            className="logged-in-links"
            id="bills-link"
          >
            Bills
          </NavLink>
        </div>
        <div>
          <NavLink
            to="/friends"
            exact={true}
            activeClassName="active"
            className="logged-in-links"
            id="friends-link"
          >
            Friends
          </NavLink>
        </div>
        <div>
          <SearchBar />
        </div>
      </div>
    );
  }

  return (
    // <nav>
    //   <ul className="nav-bar">
    //     <li>
    //       <NavLink to="/" exact={true} activeClassName="active">
    //         Home
    //       </NavLink>
    //     </li>
    //     <li>
    //     {sessionLinks}
    //     </li>
    //     <li>
    //       <NavLink to="/users" exact={true} activeClassName="active">
    //         Users
    //       </NavLink>
    //     </li>
    //     <li>
    //       <LogoutButton />
    //     </li>
    //   </ul>
    // </nav>
    <nav>
      <div className="nav-bar">
        <div>
          <NavLink to="/" exact={true} id="home-link" activeClassName="active">
            splitzy
          </NavLink>
        </div>
        <div>{sessionLinks}</div>
        {/* <div>
          <NavLink to="/users" exact={true} activeClassName="active">
            Users
          </NavLink>
        </div> */}
        <div>{sessionUser ? <LogoutButton /> : null}</div>
      </div>
    </nav>
  );
}

export default NavBar;
