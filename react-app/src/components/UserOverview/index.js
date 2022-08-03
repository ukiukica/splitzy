import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "./useroverview.css";

function UserOverview({ friend }) {
  const [friends, setFriends] = useState([]);
  const [user, setUser] = useState([]);

  const sessionUser = useSelector((state) => state.session.user);
  const users = useSelector((state) => state.users)
  const usersList = useSelector((state) => Object.values(state.users));

  const currentUser = usersList.filter((user) => user.username == friend);


  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`/api/users/${currentUser[0]?.id}`);
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
      <div id="useroverview-ctnr-one">

      <img
        id="profile-img-user-overview"
        src={`https://ui-avatars.com/api/?name=${user?.first_name}&rounded=true&background=random&uppercase=false&size=40`}
        alt="profile"
        />
        {friends.includes(user.username) ? (
          <>
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
      <div id="user-details-useroverview">

      <p className="user-overview-label">Username: </p>
      <p className="user-detail-useroverview">{user.username}</p>
      <p className="user-overview-label">
        Full Name:
      </p>
      <p className="user-detail-useroverview">
        {user.first_name} {user.last_name}
      </p>
      <p className="user-overview-label">
        Email Address:
      </p>
      <p className="user-detail-useroverview">
        {user.email}
      </p>
      </div>

      {/*~~~~~~~~~~~~~~~~~~ USER'S FRIENDS LIST ~~~~~~~~~~~~~~~~~~*/}

      {/* <div id="useroverview-friends">

      <div id="friends-section-useroverview">
        <p>Friends: </p>
        {user?.friends?.length > 0 ? user?.friends?.map((friend) => (
          <div>{friend}</div>
          )) : <div>None</div>}
      </div>

      </div> */}
    </div>
  );
}

export default UserOverview;
