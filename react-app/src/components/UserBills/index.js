import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import EditBillFormModal from "../EditBillModal";
import Comments from "../Comments";
import CreateCommentFormModal from "../CreateCommentModal";
import { removeBill, viewBills } from "../../store/bills";
import "./UserBills.css";

function UserBills({ sessionUser, bill }) {
  const dispatch = useDispatch();

  const [userBills, setUserBills] = useState([]);


  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  const onClick = async (e) => {
    e.preventDefault()
    await dispatch(removeBill(bill.id))
    await dispatch(viewBills())

  }


  return (
    <>
      <div>
        <p>{formatDate(bill.created_at)}</p>
        <i className="fa-solid fa-receipt"></i>
        <p>{bill.label}</p>
        <p>${bill.amount}</p>
      </div>
      <>
        <EditBillFormModal bill={bill} />
        <button
          id="delete-bill-btn"
          onClick={(e) => onClick(e)}
        >
          Delete
        </button>
      </>
      {/* <div className="comments-div" id="comments-div">
                <div>
                  <p id="notes-comments-heading">NOTES & COMMENTS:</p>
                  <Comments billId={bill.id} />
                </div>
                <div>
                  <CreateCommentFormModal billId={bill.id} />
                </div>
              </div> */}
    </>
  );
}

export default UserBills;
