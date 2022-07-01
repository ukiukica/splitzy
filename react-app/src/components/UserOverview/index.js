import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function UserOverview() {
  const dispatch = useDispatch();
  const { userId } = useParams();

  const [friends, setFriends] = useState([]);
  const [addedFriend, setAddedFriend] = useState(0);
  const [user, setUser] = useState([]);

  const sessionUser = useSelector((state) => state.session.user);

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
  }, [addedFriend]);

  const addFriend = (id) => {
    async function fetchData() {
      const response = await fetch(`/api/friends/${sessionUser.id}/add/${id}`);
      return response;
    }
    fetchData();
    setAddedFriend(id)
    console.log(addedFriend)
  };

  return (
    <>
      <p>
        {user.first_name} {user.last_name}
      </p>
      {friends.includes(user.username) ? (
        <p>✔</p>
      ) : (
        <button onClick={(e) => addFriend(user.id)}>Add Friend</button>
      )}
    </>
  );
}

export default UserOverview;
