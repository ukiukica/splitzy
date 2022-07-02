import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink } from 'react-router-dom';
import './searchbar.css'

function SearchBar() {
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState("");
  const [friends, setFriends] = useState([]);
  const [toggleButtons, setToggleButtons] = useState(false);

  console.log("TOGGLE BUTTONS", friends);

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
          placeholder="Search"
          onChange={(e) => setQuery(e.target.value)}
        />
        {query
          ? users
              .filter((user) => {
                if (user.username.toLowerCase().includes(query.toLowerCase())) {
                  return user;
                } else if (
                  user.first_name.toLowerCase().includes(query.toLowerCase())
                ) {
                  return user;
                } else if (
                  user.last_name.toLowerCase().includes(query.toLowerCase())
                ) {
                  return user;
                }
              })
              .map((user) => (
                <div key={user.id}>
                  <a href={`/user-overview/${user.id}`}>
                    <p>{`${user.first_name} ${user.last_name}`}</p>
                  </a>
                  {/* <p>{user.last_name}</p>
                    <p>{user.username}</p> */}
                  {/* {(friends.includes(user.username)) ? <p>✔</p> :
                    <a href="/search">
                    <button onClick={(e) => addFriend(user.id)}>Add Friend</button>
                    </a>
                    } */}
                    {/* {(friends.includes(user.username)) ?
                        <p className={toggleButtons ? '' : 'hidden'}>✔</p>
                    : <button className={toggleButtons ? 'hidden' : ''} onClick={(e) => addFriend(user.id)}>Add Friend</button>} */}
                </div>
              ))
          : null}
      </div>
    </div>
  );
}

export default SearchBar;
