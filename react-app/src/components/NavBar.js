import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import SignUpModal from "./auth/SignUpModal";
import LogoutButton from "./auth/LogoutButton";
import "./NavBar.css";

function NavBar() {
  
  const sessionUser = useSelector((state) => state.session.user);

  let sessionLinks;
  if (!sessionUser) {
    sessionLinks = (
      <div className="nav-bar-logged-out-div">
        <div
          to="/sign-up"
          exact={true}
          activeClassName="active"
          className="logged-out-links"
        >
          <SignUpModal />
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
            to="/about-us"
            exact={true}
            activeClassName="active"
            className="logged-in-links"
            id="about-us-link"
          >
            About us
          </NavLink>
          <LogoutButton />
        </div>
      </div>
    );
  }

  return (
    <nav>
      <NavLink to="/" exact={true} id="home-link" activeClassName="active">
        splitzy
      </NavLink>
      {sessionLinks}
    </nav>
  );
}

export default NavBar;
