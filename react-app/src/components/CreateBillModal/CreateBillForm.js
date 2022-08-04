import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import CreateBillModal from "./index.js";
import { addBill } from "../../store/bills.js";
import { ValidationError } from "../../utils/validationError";
import { viewBills } from "../../store/bills.js";
import Select from 'react-select';
import "./CreateBillForm.css";

function CreateBillForm({setShowModal}) {
  const dispatch = useDispatch();
  const history = useHistory();

  const sessionUser = useSelector((state) => state.session.user);
  const users = useSelector((state) => Object.values(state.users));

  const [label, setLabel] = useState("");
  const [amount, setAmount] = useState(0);
  const [selectedFriends, setSelectedFriends] = useState([]);
  const [errors, setErrors] = useState([]);
  const [showErrors, setShowErrors] = useState(false);

  let friendOptions = [];

  sessionUser?.friends?.forEach((friend) => {
    friendOptions.push({ value: `${friend}`, label: `${friend}` })
  })

  const handleChange = e => {
    setSelectedFriends(Array.isArray(e) ? e.map(x => x.value) : []);
  }

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
      })
    }
    await dispatch(viewBills())
    setShowModal(false)
  };

  console.log("SELECTED:", selectedFriends)

  return (
    <div className="page-body">
      <form className="create-bill-form" onSubmit={handleSubmit}>
        <div className="create-bill-header-div">
          <h1 id="create-bill-header">Add an expense</h1>
        </div>
        <div>
        <p id="bill-with-text">With You and:</p>
          <Select
            placeholder="Split between..."
            value={friendOptions.filter(obj => selectedFriends.includes(obj.value))}
            options={friendOptions}
            onChange={handleChange}
            isMulti
            isClearable
            name="colors"
            className="basic-multi-select"
            classNamePrefix="select" />
        </div>
        <div id="create-bill-input-container">
          <label className="create-bill-labels">
            Label
            <input
              name="label"
              className="create-bill-input"
              type="text"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              placeholder={"Insert label here..."}
              required
            />
          </label>
          <label className="create-bill-labels">
            Amount
            <input
              name="amount"
              className="create-bill-input"
              type="number"
              min="0.01"
              max="999999.99"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder={"Insert amount here..."}
              required
            />
          </label>
        </div>
        {showErrors && (
          <div>
            {errors.map((error, idx) => (
              <p className="create-bill-errors-li" key={idx}>
                {error}
              </p>
            ))}
          </div>
        )}
        <div className="create-bill-btns-div">
          <button
            id="create-bill-submit"
            className="create-bill-btns"
            type="submit"
            disabled={errors.length > 0}
          >
            Submit
          </button>
          <a href="/bills" className="create-bill-btns"></a>
        </div>
      </form>
      <a href="/bills" id="create-cancel" className="create-bill-btns">
        Cancel
      </a>
    </div>
  );
}

export default CreateBillForm;
