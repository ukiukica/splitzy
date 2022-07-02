import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import LogoutButton from "./auth/LogoutButton";
import SearchBar from "./SearchBar";
import "./NavBar.css"

function NavBar() {
  const sessionUser = useSelector((state) => state.session.user);

  let sessionLinks;
  if (!sessionUser) {
    sessionLinks = (
      <div>
        <div>
          <NavLink to="/login" exact={true} activeClassName="active">
            Login
          </NavLink>
        </div>
        <div>
          <NavLink to="/sign-up" exact={true} activeClassName="active">
            Sign Up
          </NavLink>
        </div>
      </div>
    );
  } else {
    sessionLinks = (
      <div className="nav-bar-session">
        <div>

          <NavLink to="/bills/createbill" exact={true} activeClassName="active">
            Create A Bill
          </NavLink>
        </div>

      <div>

          <NavLink to="/bills" exact={true} activeClassName="active" className="logged-in-links">
            Bills
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
          <NavLink to="/" exact={true} activeClassName="active">
            Home
          </NavLink>
        </div>
        <div>
        {sessionLinks}
        </div>
        <div>
          <NavLink to="/users" exact={true} activeClassName="active">
            Users
          </NavLink>
        </div>
        <div>
          <LogoutButton />
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
