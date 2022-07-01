import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import LogoutButton from "./auth/LogoutButton";
import SearchBar from "./SearchBar";

function NavBar() {
  const sessionUser = useSelector((state) => state.session.user);

  let sessionLinks;
  if (!sessionUser) {
    sessionLinks = (
      <ul>
        <li>
          <NavLink to="/login" exact={true} activeClassName="active">
            Login
          </NavLink>
        </li>
        <li>
          <NavLink to="/sign-up" exact={true} activeClassName="active">
            Sign Up
          </NavLink>
        </li>
      </ul>
    );
  } else {
    sessionLinks = (
      <ul>
        <li>
          <NavLink to="/bills/createbill" exact={true} activeClassName="active">
            Create A Bill
          </NavLink>
        </li>
        <li>
          <NavLink to="/bills" exact={true} activeClassName="active">
            Bills
          </NavLink>
        </li>
        <li>
          <SearchBar />
        </li>
      </ul>
    );
  }

  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/" exact={true} activeClassName="active">
            Home
          </NavLink>
        </li>
        {sessionLinks}
        <li>
          <NavLink to="/users" exact={true} activeClassName="active">
            Users
          </NavLink>
        </li>
        <li>
          <LogoutButton />
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
