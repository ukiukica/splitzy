import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { addBill } from "../../store/bills.js";
import { viewBills } from "../../store/bills.js";
import Select from "react-select";
import "./CreateBillForm.css";

function CreateBillForm({ setShowModal }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const sessionUser = useSelector((state) => state.session.user);
  const users = useSelector((state) => Object.values(state.users));

  const [label, setLabel] = useState("");
  const [amount, setAmount] = useState("");
  const [selectedFriends, setSelectedFriends] = useState([]);
  const [errors, setErrors] = useState([]);
  const [showErrors, setShowErrors] = useState(false);

  let friendOptions = [];

  sessionUser?.friends?.forEach((friend) => {
    friendOptions.push({ value: `${friend}`, label: `${friend}` });
  });

  const handleChange = (e) => {
    setSelectedFriends(Array.isArray(e) ? e.map((x) => x.value) : []);
  };

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

    await dispatch(addBill(payload));
    setErrors([]);
    await dispatch(viewBills());
    if (selectedFriends.length) {
      selectedFriends.forEach(async (friend) => {
        const userFriend = users.filter((user) => user.username === friend);
        await fetch(`/api/bills/add-bill-friends/${userFriend[0].id}`);
      });
    }
    await dispatch(viewBills());
    setShowModal(false);
  };

  console.log("SELECTED:", selectedFriends);

  return (
    <div className="bill-modal">
      <form className="bill-form" onSubmit={handleSubmit}>
        <div className="bill-header-div">
          <p id="bill-header">Add an expense</p>
        </div>
        <div className="bill-with-users-container">
          <p id="bill-with-text">Between you and:</p>
          <Select
            placeholder="Select a name"
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

export default CreateBillForm;
