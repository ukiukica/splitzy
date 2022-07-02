import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function Friends() {
  const dispatch = useDispatch();

  const [friends, setFriends] = useState([]);
  const sessionUser = useSelector((state) => state.session.user);

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
      {friends[0]?.length ? friends[0]?.map((friend) => (
        <ul key={friend}>
          <li>{friend}</li>
        </ul>
      )) : "You have no friends!"}
    </div>
  );
}

export default Friends;
