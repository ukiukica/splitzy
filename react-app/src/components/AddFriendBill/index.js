import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { addBill, viewBills } from "../../store/bills.js";
import { ValidationError } from "../../utils/validationError";
import "./AddFriendBill.css";

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

  const addFriendToBill = (friend) => {
    async function fetchData() {
      const userFriend = users.filter((user) => user.username === friend);
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
      const response = await fetch(
        `/api/bills/remove-bill-friends/${userFriend[0].id}`
      );

      //   history.push("/bills")
      window.location.reload(false);
      return response;
    }
    fetchData();
  };

  return (
    <div>
      <div id="assign-friends-container">
        <div id="inner-assign-friends-container">
          {friends[0]?.length > 0 ? (
            <>
              <div className="assign-friends-list-div">
                <h2 className="assign-friend-headings">
                  Assign friends to bill:
                </h2>
                {
                  <div>
                    {friends[0]?.map((friend) => (
                      <div
                        id="friend-and-add-btn-div"
                        className={
                          userBills[0]?.includes(friend) ? "hidden" : ""
                        }
                        key={friend}
                      >
                        <button
                          className="new-bill-friends-btn-add"
                          onClick={async (e) => {
                            // e.preventDefault()
                            await addFriendToBill(friend);
                            // setFriendIsAdded(true)
                            window.location.reload(false);
                          }}
                        >
                          +
                        </button>
                        <div className="add-to-bill-friend-name">{friend}</div>
                      </div>
                    ))}
                  </div>
                }
              </div>
              <div className="friends-added-div">
                <div>
                  <h2 className="assign-friend-headings">
                    Friends added to bill:
                  </h2>

                  <div id="remove-friends-btn-container">
                    {userBills[0]?.slice(1).map((userBill) => (
                      <div className="add-bill-remove-friends-div">
                        <button
                          className="new-bill-friends-btn-remove"
                          onClick={() => removeFriendFromBill(userBill)}
                        >
                          x
                        </button>
                        <div className="add-to-bill-friend-name">
                          {userBill}
                        </div>
                      </div>
                    ))}
                    <a id="continue-btn-a-tag" href="/bills">
                      <button className="continue-btn">Continue</button>
                    </a>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div>
              <p>You have no friends! Click continue to view your bills.</p>
              <a href="/bills">
                <button className="continue-btn">Continue</button>
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AddFriendBill;
