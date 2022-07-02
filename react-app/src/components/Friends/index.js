import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { viewFriends } from "../../store/friends";

function Friends() {
  const dispatch = useDispatch();

  const sessionUser = useSelector((state) => state.session.user);
  const friends = useSelector((state) => {
    return Object.values(state.friends)
  })

  useEffect(() => {
    dispatch(viewFriends(sessionUser.id))
  }, [dispatch]);

  return (
    <div>
      {friends?.map((friend) => (
        <ul key={friend}>
          <li>{friend}</li>
        </ul>
      ))}
    </div>
  );
}

export default Friends;
