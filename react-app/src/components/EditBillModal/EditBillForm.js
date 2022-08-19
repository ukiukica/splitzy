import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { removeBill, updateBill, viewBills } from "../../store/bills.js";
import { ValidationError } from "../../utils/validationError";
import Select from "react-select";
import "./EditBillForm.css";

function EditBillForm({ setShowModal, bill }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const sessionUser = useSelector((state) => state.session.user);
  const users = useSelector((state) => Object.values(state.users));

  const id = bill.id;

  const [label, setLabel] = useState(bill.label);
  const [amount, setAmount] = useState(bill.amount);
  const [selectedFriends, setSelectedFriends] = useState(bill.assigned_users);
  const [errors, setErrors] = useState([]);
  const [showErrors, setShowErrors] = useState(false);
  // const [users, setUsers] = useState([]);
  const [userBills, setUserBills] = useState([]);
  const userBillsNoSessionUser = userBills[0]?.slice(1);

  // useEffect(() => {
  //   async function fetchData() {
  //     const response = await fetch("/api/users/");
  //     const responseData = await response.json();
  //     setUsers(responseData.users);
  //   }
  //   fetchData();
  // }, []);

  // Friends for bill
  // useEffect(() => {
  //   async function fetchData() {
  //     const response = await fetch(`/api/bills/user-bills/${bill.id}`);
  //     const responseData = await response.json();
  //     setUserBills(Object.values(responseData));
  //   }
  //   fetchData();
  // }, []);

  let friendOptions = [];

  sessionUser?.friends?.forEach((friend) => {
    friendOptions.push({ value: `${friend}`, label: `${friend}` });
  });

  const handleChange = (e) => {
    setSelectedFriends(Array.isArray(e) ? e.map((x) => x.value) : []);
  };

  const removeFriendFromBill = async (friend) => {
    const userFriend = users?.filter((user) => user?.username === friend);
    await fetch(`/api/bills/${bill.id}/remove-bill-friend/${userFriend[0]?.id}`);
  };

  const addFriendToBill = async (friend) => {
    const userFriend = users?.filter((user) => user?.username === friend);
    await fetch(`/api/bills/${bill.id}/add-bill-friend/${userFriend[0]?.id}`);
  };

  const removeUsers = () => {
    const newUsers = new Set(selectedFriends);
    bill.assigned_users.forEach((user) => {
      if (user !== sessionUser.username && !newUsers.has(user)) {
        removeFriendFromBill(user);
      }
    });
  };

  const addUsers = () => {
    const assignedUsers = new Set(bill.assigned_users);
    selectedFriends.forEach((friend) => {
      if (!assignedUsers.has(friend)) {
        addFriendToBill(friend);
      }
    });
  };

  useEffect(() => {
    const errors = [];

    if (label.length > 100) {
      errors.push("Label must be less than 100 characters.");
    } else if (label.length <= 0) {
      errors.push("Please provide a label.");
    }

    if (amount <= 0) {
      errors.push("Must enter an amount greater than zero.");
    }

    setErrors(errors);
  }, [label, amount]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (errors.length) {
      setShowErrors(true);
      return;
    }

    const payload = {
      user_id: sessionUser.id,
      label,
      amount,
    };

    await dispatch(updateBill(payload, id));
    setErrors([]);
    await removeUsers();
    await addUsers();
    // logic for assigning users from bill
    await dispatch(viewBills());
    setShowModal(false);
  };

  return (
    <div className="bill-modal">
      <form className="bill-form" onSubmit={handleSubmit}>
        <div className="bill-header-div">
          <p className="bill-header">Edit expense</p>
          <p className="bill-header" id="bill-x-btn" onClick={() => setShowModal(false)}>
            x
          </p>
        </div>
        <div className="bill-with-users-container">
          <p id="bill-with-text">Between you and:</p>
          <div>
            <Select
              placeholder="Select a friend"
              value={friendOptions.filter((obj) =>
                selectedFriends.includes(obj.value)
              )}
              options={friendOptions}
              onChange={handleChange}
              isMulti
              isClearable
              name="colors"
              className="basic-multi-select"
              classNamePrefix="select"
            />
          </div>
          <div className="bill-users-ul-div">
            {userBillsNoSessionUser?.map((user) => (
              <ul className="bill-users-ul" key={user}>
                {user}{" "}
                <button
                  id="bill-delete-btn"
                  onClick={() => removeFriendFromBill(user)}
                >
                  x
                </button>
              </ul>
            ))}
          </div>
        </div>
        <div className="bill-receipt-inputs-container">
          <i id="bill-receipt-icon" className="fa-solid fa-receipt fa-5x"></i>
          <div className="bill-inputs-container">
            <input
              name="label"
              className="bill-input"
              type="text"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              placeholder="Label"
              required
            />
            <input
              name="amount"
              className="bill-input"
              id="bill-amount"
              type="float"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Amount"
              required
            />
          </div>
        </div>
        {showErrors && (
          <div>
            {errors.map((error, idx) => (
              <p className="bill-errors-p" key={idx}>
                {error}
              </p>
            ))}
          </div>
        )}
        <div className="bill-btns-container">
          <button
            id="bill-delete-btn"
            className="bill-btns"
            onClick={() => dispatch(removeBill(bill.id))}
          >
            Delete
          </button>
          <button
            id="bill-save-btn"
            className="bill-btns"
            type="submit"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditBillForm;
