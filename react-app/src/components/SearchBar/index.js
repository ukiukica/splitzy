import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink } from 'react-router-dom';
import FriendsModal from "../Friends";
import './searchbar.css'

function SearchBar() {
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState("");
  const [friends, setFriends] = useState([]);
  const [toggleButtons, setToggleButtons] = useState(false);


  const sessionUser = useSelector((state) => state.session.user);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api/users/");
      const responseData = await response.json();
      setUsers(responseData.users);
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`/api/friends/${sessionUser.id}`);
      const responseData = await response.json();
      setFriends(Object.values(responseData)[0]);
    }
    fetchData();
  }, []);

  const addFriend = (id) => {
    async function fetchData() {
      const response = await fetch(`/api/friends/${sessionUser.id}/add/${id}`);
      return response;
    }
    fetchData();
    setToggleButtons(false);
  };


  return (
    <div>
      <div className="nav-search-div">
        <input
          id="nav-search"
          placeholder="Search Users"
          onChange={(e) => setQuery(e.target.value)}
        />
        {query
          ? users
              .filter((user) => {
                if (user?.username.toLowerCase().includes(query.toLowerCase())) {
                  return user;
                } else if (
                  user?.first_name.toLowerCase().includes(query.toLowerCase())
                ) {
                  return user;
                } else if (
                  user?.last_name.toLowerCase().includes(query.toLowerCase())
                ) {
                  return user;
                }
              })
              .map((user) => (
                <div className="username-search-result" key={user.id}>
                  {user.id === +sessionUser.id ? <></> :

                  // ~~~~~~~~~~~~~~~~~~~~~~~~ INSERT USER OVERVIEW MODAL HERE ~~~~~~~~~~~~~~~~~~~~~~~~~~
                    <p className="username-result"><FriendsModal friend={user.username}/></p>
                  }

                  {sessionUser.friends.includes(user.username) && <></>}
                </div>
              ))
          : null}
      </div>
    </div>
  );
}

export default SearchBar;
