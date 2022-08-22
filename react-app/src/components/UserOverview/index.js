import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { viewUsers } from "../../store/users";
import "./useroverview.css";

function UserOverview({ friend, setShowModal }) {

  const sessionUser = useSelector((state) => state.session.user);
  const users = useSelector((state) => state.users);
  const usersList = useSelector((state) => Object.values(state.users));

  const thisUser = users[sessionUser.id];

  // when you click on a friend
  const currentUser = usersList.filter((user) => user.username == friend)[0];

  const addFriend = async (id) => {
    async function fetchData() {
      const response = await fetch(`/api/friends/${sessionUser.id}/add/${id}`);
      return response;
    }
    window.location.reload(false);
    setShowModal(false);
    fetchData();
  };

  const removeFriend = async (id) => {
    async function fetchData() {
      const response = await fetch(
        `/api/friends/${sessionUser.id}/remove/${id}`
      );
      return response;
    }
    window.location.reload(false);
    setShowModal(false);
    fetchData();
  };

  return (
    <div className="useroverview-container">
      {currentUser && thisUser ? (
        <>
          <div id="user-profile-header-cntr">
            <div id="user-profile-header">User Profile</div>
          </div>
          <div id="useroverview-details-below">
            <div id="useroverview-ctnr-one">
              <img
                id="profile-img-user-overview"
                src={`https://ui-avatars.com/api/?name=${currentUser?.first_name}&rounded=true&background=random&uppercase=false&size=40`}
                alt="profile"
              />
              {thisUser?.friends?.includes(currentUser.username) ? (
                <>
                  <button
                    onClick={(e) => {
                      removeFriend(currentUser.id);
                    }}
                    className="unfriend-btn"
                  >
                    Unfriend
                  </button>
                </>
              ) : (
                <button
                  onClick={(e) => {
                    addFriend(currentUser.id);
                  }}
                  className="submit-add-friend"
                >
                  Add Friend
                </button>
              )}
            </div>
            <div id="user-details-useroverview">
              <p className="user-overview-label">Username: </p>
              <p className="user-detail-useroverview">{currentUser.username}</p>
              <p className="user-overview-label">Full Name:</p>
              <p className="user-detail-useroverview">
                {currentUser.first_name} {currentUser.last_name}
              </p>
              <p className="user-overview-label">Email Address:</p>
              <p className="user-detail-useroverview">{currentUser.email}</p>
            </div>
          </div>
        </>
      ) : (
        <h1>...Loading</h1>
      )}
    </div>
  );
}

export default UserOverview;
