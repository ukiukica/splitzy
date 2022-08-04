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
    <div className="bill-modal">
      <form className="bill-form" onSubmit={handleSubmit}>
        <div className="bill-header-div">
          <p id="bill-header">Edit expense</p>
        </div>
        <div className="bill-with-users-container">
          <p id="bill-with-text">With:</p>
          {userBillsNoSessionUser?.length < 1 ? " None" : <></>}
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
                {/* </a> */}
              </ul>
            ))}
          </div>
          </div>
        <div className="bill-receipt-inputs-container">
        <i id='bill-receipt-icon' className="fa-solid fa-receipt fa-5x"></i>
        <div className="bill-inputs-container">
          <input
            name="label"
            className="bill-input"
            type="text"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            required
          />
          <input
            name="amount"
            className="bill-input"
            id="bill-amount"
            type="float"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            />
            </div>
            </div>
          <ul>
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
          <div className="bill-btns-container">
            <button
              id="bill-cancel-btn"
              className="bill-btns"
              onClick={() => setShowModal(false)}
              >
              Cancel
            </button>
            <button
              id="bill-save-btn"
              className="bill-btns"
              type="submit"
              disabled={errors.length > 0}
            >
              Save
            </button>
        </div>
      </form>
    </div>
  );
}

export default EditBillForm;
