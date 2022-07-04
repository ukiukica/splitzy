import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { addBill, updateBill } from "../../store/bills.js";
import { ValidationError } from "../../utils/validationError";
import "./EditBillForm.css";

function EditBillForm({ setShowModal, bill }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const sessionUser = useSelector((state) => state.session.user);

  const id = bill.id;

  const [label, setLabel] = useState(bill.label);
  const [amount, setAmount] = useState(bill.amount);
  const [errors, setErrors] = useState([]);
  const [users, setUsers] = useState([]);
  const [userBills, setUserBills] = useState([]);
  const userBillsNoSessionUser = userBills[0]?.slice(1);
  console.log("FRIENDS NO SESSION USER", userBillsNoSessionUser);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api/users/");
      const responseData = await response.json();
      setUsers(responseData.users);
    }
    fetchData();
  }, []);

  // Friends for bill
  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`/api/bills/user-bills/${bill.id}`);
      const responseData = await response.json();
      setUserBills(Object.values(responseData));
    }
    fetchData();
  }, []);

  useEffect(() => {
    const errors = [];

    if (label.length > 100) {
      errors.push("Label must be less than 100 characters");
    } else if (label.length <= 0) {
      errors.push("Please provide a label");
    }

    if (amount <= 0) {
      errors.push("Must enter an amount greater than 0");
    }

    setErrors(errors);
  }, [label, amount]);

  const removeFriendFromBill = (friend) => {
    async function fetchData() {
      const userFriend = users.filter((user) => user.username === friend);
      //   console.log("USER FRIEND", userFriend[0].id)
      const response = await fetch(
        `/api/bills/${bill.id}/remove-bill-friend/${userFriend[0].id}`
      );

      //   history.push("/bills")
      window.location.reload(false);
      return response;
    }
    fetchData();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      user_id: sessionUser.id,
      label,
      amount,
    };

    // let updatedBill = await dispatch(updateBill(payload, id));
    let updatedBill;

    try {
      updatedBill = await dispatch(updateBill(payload, id));
    } catch (error) {
      if (error instanceof ValidationError) setErrors(errors.error);
      else setErrors(error.toString().slice(7));
    }

    if (updatedBill) {
      setErrors([]);
      setShowModal(false);
    }
  };

  return (
    <div className="edit-bill-modal">
      <form className="edit-bill-form" onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <h1 id="edit-bill-title">Edit Bill</h1>
        <div className="edit-bill-labels-inputs-container">
          <div className="edit-bill-labels-inputs-div">
            <label id="edit-bill-label">
              Label
              <input
                name="label"
                className="label-input"
                type="text"
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                required
              />
            </label>
            <label id="edit-bill-amount">
              Amount
              <input
                name="amount"
                className="amount-input"
                type="float"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </label>
            <label id="edit-bill-users">
              Associated Users:
              {userBillsNoSessionUser?.length < 1 ? " None" : <></>}
              <div>
                {userBillsNoSessionUser?.map((user) => (
                  <ul key={user}>
                    {/* <a href="/bills"> */}
                    {user}{" "}
                    <button id="edit-bill-remove-btn" onClick={() => removeFriendFromBill(user)}>
                      x
                    </button>
                    {/* </a> */}
                  </ul>
                ))}
              </div>
            </label>
          </div>
          <div className="edit-bill-submit-cancel-btns">
            <button
              id="edit-bill-submit-btn"
              type="submit"
              disabled={errors.length > 0}
            >
              Submit
            </button>
            <button
              id="edit-bill-cancel-btn"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default EditBillForm;
