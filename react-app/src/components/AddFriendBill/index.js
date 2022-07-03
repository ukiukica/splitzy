import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { addBill, viewBills } from "../../store/bills.js";
import { ValidationError } from "../../utils/validationError";
import './AddFriendBill.css'

function AddFriendBill() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { billId } = useParams();

  let friendAdded;

  const [friends, setFriends] = useState([]);
  const [users, setUsers] = useState([]);
  const [userBills, setUserBills] = useState([]);
  // const [addedFriends, setAddedFriends] = useState([]);
  const [friendIsAdded, setFriendIsAdded] = useState(false);
  const sessionUser = useSelector((state) => state.session.user);

  let friend = [];
  // console.log("FRIEND", friend)

  const bills = useSelector((state) => {
    return Object.values(state.bills);
  });

  useEffect(() => {
    dispatch(viewBills());
  }, [dispatch]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api/users/");
      const responseData = await response.json();
      setUsers(responseData.users);
    }
    fetchData();
  }, []);

  // console.log("USERS", users);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`/api/friends/${sessionUser.id}`);
      const responseData = await response.json();
      setFriends(Object.values(responseData));
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`/api/bills/user-bills/${billId}`);
      const responseData = await response.json();
      setUserBills(Object.values(responseData));
    }
    fetchData();
  }, []);

  //   console.log(friends)
  const addFriendToBill = (friend) => {
    async function fetchData() {
      const userFriend = users.filter((user) => user.username === friend);
      console.log(userFriend[0].id, "USERFIREND");
      const response = await fetch(
        `/api/bills/add-bill-friends/${userFriend[0].id}`
      );
      // history.push("/bills");
      return response;
    }
    fetchData();
  };

  const removeFriendFromBill = (friend) => {
    async function fetchData() {
      const userFriend = users.filter((user) => user.username === friend);
        console.log("USER FRIEND", userFriend[0].id)
      const response = await fetch(
        `/api/bills/remove-bill-friends/${userFriend[0].id}`
      );

      //   history.push("/bills")
      window.location.reload(false);
      return response;
    }
    fetchData();
  };

  console.log("USER BILLS", userBills[0])

  return (
    <div>
      <h2>Assign friends to bill:</h2>
      {friends[0]?.length > 0 ? (
        <>
        {friends[0]?.map((friend) => (
          <div className={userBills[0]?.includes(friend) ? 'hidden' : ''} key={friend}>
            <button onClick={async (e) => {
              // e.preventDefault()
              await addFriendToBill(friend)
              // setFriendIsAdded(true)
              window.location.reload(false);
              // console.log("FRIEND IS ADDED", friendIsAdded)
            }}
              >{friend}</button>
          </div>
        ))}
      <div>
        <span>Friends Added on This Bill:</span>
        {/* {console.log("FRIENDS", friends[0])} */}

         {

         friends[0]?.forEach((friendOne) => friend.push(friendOne))}
        {userBills[0]?.slice(1).map((userBill) => (
          <div>
          <p>{userBill}</p>
           <button onClick={() => removeFriendFromBill(userBill)}>Remove</button>
          </div>
        ))}
      </div>
      <div>
      <a href="/bills">
            <button>Continue</button>
          </a>
      </div>
      </>
      ) : (
        <div>
          <p>You have no friends! Click continue to view your bills.</p>
          <a href="/bills">
            <button>Continue</button>
          </a>
        </div>
      )}
    </div>
  );
}

export default AddFriendBill;
