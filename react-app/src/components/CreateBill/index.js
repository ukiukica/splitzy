import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { addBill, viewBills } from "../../store/bills.js";
import { ValidationError } from "../../utils/validationError";
import "./CreateBill.css";

function CreateBill() {
  const dispatch = useDispatch();
  const history = useHistory();

  const sessionUser = useSelector((state) => state.session.user);

  const [label, setLabel] = useState("");
  const [amount, setAmount] = useState(0);
  const [errors, setErrors] = useState([]);
  const [showErrors, setShowErrors] = useState(false)

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
      return
    }
    const payload = {
      user_id: sessionUser.id,
      label,
      amount,
    };

    await dispatch(addBill(payload))
    setErrors([]);
    await dispatch(viewBills())
    // CLOSE MODAL HERE
  };

  return (
    <div className="page-body">
      <div id="create-bill-form">
        <form onSubmit={handleSubmit}>
          <h1 id="create-bill-header">Create a Bill</h1>
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
                <p className="create-bill-errors-li" key={idx}>{error}</p>
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
            <a href="/bills" className="create-bill-btns">
            </a>
          </div>
        </form>
        <a href='/bills' id="create-cancel" className="create-bill-btns">
          Cancel
        </a>
      </div>
    </div>
  );
}

export default CreateBill;
