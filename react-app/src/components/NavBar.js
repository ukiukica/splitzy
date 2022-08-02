import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import LogoutButton from "./auth/LogoutButton";
import SearchBar from "./SearchBar";
import "./NavBar.css";

function NavBar() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);

  let sessionLinks;
  if (!sessionUser) {
    sessionLinks = (
      <div className="nav-bar-logged-out-div">
        <div>
          <NavLink
            to="/sign-up"
            exact={true}
            activeClassName="active"
            className="logged-out-links"
            id="signup-btn"
          >
            Sign up
          </NavLink>
        </div>
        <div>
          <NavLink
            to="/about-us"
            exact={true}
            activeClassName="active"
            className="logged-in-links"
            id="about-us-link"
          >
            About us
          </NavLink>
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
            to="/about-us"
            exact={true}
            activeClassName="active"
            className="logged-in-links"
            id="about-us-link"
          >
            About us
          </NavLink>
        </div>
      </div>
    );
  }

  return (
    <nav>
      <div className="nav-bar">
        <div>
          <NavLink to="/" exact={true} id="home-link" activeClassName="active">
            splitzy
          </NavLink>
        </div>
        {sessionLinks}
        {sessionUser ? <SearchBar /> : <></>}
        {sessionUser ? <LogoutButton /> : <></>}
      </div>
    </nav>
  );
}

export default NavBar;
