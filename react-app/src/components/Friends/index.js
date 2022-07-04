import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function Friends() {
  const dispatch = useDispatch();

  // const [friends, setFriends] = useState([]);
  const sessionUser = useSelector((state) => state.session.user);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`/api/friends/${sessionUser.id}`);
      const responseData = await response.json();
      setFriends(Object.values(responseData));
    }
    fetchData();
  }, []);

  // fetch friend id
  const [users, setUsers] = useState([]);
  const [friends, setFriends] = useState([]);

  // fetches all users
  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api/users/");
      const responseData = await response.json();
      setUsers(responseData.users);
    }
    fetchData();
  }, []);

  // fetches friends
  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`/api/friends/${sessionUser.id}`);
      const responseData = await response.json();
      setFriends(Object.values(responseData));
    }
    fetchData();
  }, []);


  return (
    <div>
      <h2 id="friends-label">Friends List</h2>
      {friends[0]?.length
        ? friends[0]?.map((friend) => (
            <ul key={friend}>
              <a href={`/user-overview/${users.filter((user) => user.username === friend)[0]?.id}`}>
                <li>{friend}</li>
              </a>
            </ul>
          ))
        : "You have no friends!"}
    </div>
  );
}

export default Friends;
