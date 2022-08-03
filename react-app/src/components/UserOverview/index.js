import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "./useroverview.css";

function UserOverview({ friend }) {
  const { userId } = useParams();

  const [friends, setFriends] = useState([]);
  const [user, setUser] = useState([]);

  const sessionUser = useSelector((state) => state.session.user);
  const usersList = useSelector((state) => Object.values(state.users));

  const friendId = usersList.filter((user) => user.username == friend);
  console.log("USERSLIST", usersList);
  console.log("ID", userId);
  console.log("PARAMS", useParams());
  console.log("FRIEND ID", friendId);
  console.log("sessionUser", sessionUser);
  // const friends = useSelector((state) => {
  //   return Object.values(state.friends)
  // })

  // useEffect(() => {
  //   dispatch(viewFriends(sessionUser.id))
  // }, []);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`/api/users/${friendId[0]?.id}`);
      // const response = await fetch(`/api/users/${userId}`);
      const responseData = await response.json();
      console.log("RESPONSE DATA", responseData);
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
      const response = await fetch(
        `/api/friends/${sessionUser.id}/remove/${id}`
      );
      return response;
    }
    fetchData();
  };

  return (
    <div className="useroverview-container">
      {/* <p className="friend-name">
        Username: {user.username}
        <br/>
        Full Name: {user.first_name} {user.last_name}
      </p> */}
      <img
        id="profile-img-user-overview"
        src={`https://ui-avatars.com/api/?name=${user?.first_name}&rounded=true&background=random&uppercase=false&size=40`}
        alt="profile"
      />
      <div id="user-details-useroverview">

      <p>Username: </p>
      <p>{user.username}</p>
      <p>
        Full Name:
      </p>
      <p>
        {user.first_name} {user.last_name}
      </p>
      <p>
        Email Address:
      </p>
      <p>
        {user.email}
      </p>
      </div>

      {/*~~~~~~~~~~~~~~~~~~ USER'S FRIENDS LIST ~~~~~~~~~~~~~~~~~~*/}
      <div>
        <p>Friends: </p>
        {user?.friends?.map((friend) => (
          <div>{friend}</div>
        ))}
      </div>

      {/* ~~~~~~~~~~~~~~~~~~ USER'S MUTUAL LIST ~~~~~~~~~~~~~~~~~~*/}
      {/* <div>
          Mutual Friends:
        </div>
        {user?.friends?.map((friend) => {
          let mutuals = sessionUser.friends.filter((mutual) => friend === mutual)
          {mutuals.length ? mutuals.map((mutualFriend) => (
            <div>{mutualFriend}</div>
          )) : <div>You have no mutual friends</div>}
          console.log("SESSION USER FRIENDS",sessionUser.friends)
          console.log("FRIEND",friend)
          console.log("MUTUALS", mutuals)
        })} */}

      {friends.includes(user.username) ? (
        <>
          {/* <p className="friends-label">(Friends)</p> */}
          <a href={`/user-overview/${user.id}`}>
            <button
              onClick={(e) => {
                removeFriend(user.id);
              }}
              className="unfriend-btn"
            >
              Unfriend
            </button>
          </a>
        </>
      ) : (
        <a href={`/user-overview/${user.id}`}>
          <button
            onClick={(e) => {
              addFriend(user.id);
            }}
            className="submit-add-friend"
          >
            Add Friend
          </button>
        </a>
      )}
    </div>
  );
}

export default UserOverview;
