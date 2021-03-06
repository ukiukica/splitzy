import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import './useroverview.css'

function UserOverview() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { userId } = useParams();

  const [friends, setFriends] = useState([]);
  const [user, setUser] = useState([]);

  const sessionUser = useSelector((state) => state.session.user);

  // const friends = useSelector((state) => {
  //   return Object.values(state.friends)
  // })

  // useEffect(() => {
  //   dispatch(viewFriends(sessionUser.id))
  // }, []);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`/api/users/${userId}`);
      const responseData = await response.json();
      setUser(responseData);
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
  };

  const removeFriend = (id) => {
    async function fetchData() {
      const response = await fetch(`/api/friends/${sessionUser.id}/remove/${id}`);
      return response;
    }
    fetchData();
  };

  return (
    <div className="useroverview-container">
      <p className="friend-name">
        {user.first_name} {user.last_name}
      </p>
      {friends.includes(user.username) ? (
        <>
          <p className="friends-label">(Friends)</p>
          <a href={`/user-overview/${user.id}`}>
        <button
          onClick={(e) => {
            removeFriend(user.id)}}
            className="unfriend-btn"
            >Unfriend</button>
          </a>
        </>
      ) : (
        <a href={`/user-overview/${user.id}`}>
        <button
          onClick={(e) => {
            addFriend(user.id)}}
            className="submit-add-friend"
            >Add Friend</button>
          </a>
      )}
    </div>
  );
}

export default UserOverview;
