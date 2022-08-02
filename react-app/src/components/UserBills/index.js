import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import EditBillFormModal from "../EditBillModal";
import Comments from "../Comments";
import CreateCommentFormModal from "../CreateCommentModal";
import billsReducer, { removeBill } from "../../store/bills";
import "./UserBills.css";

function UserBills({ sessionUser, bill }) {
  const dispatch = useDispatch();

  const [userBills, setUserBills] = useState([]);


  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
}
  // useEffect(() => {
  //   async function fetchData() {
  //     const response = await fetch(`/api/bills/user-bills/${bill.id}`);
  //     const responseData = await response.json();
  //     setUserBills(Object.values(responseData));
  //   }
  //   fetchData();
  // }, []);

  console.log("BILL: ", bill)
  return (
    <>
      <div className="">
        <p id="">{bill.label}</p>
        <p id="">${bill.amount}</p>
        <p id="">{formatDate(bill.created_at)}</p>
      </div>
      <>
        <EditBillFormModal bill={bill} />
        <a href="/bills">
          <button
            id="delete-bill-btn"
            onClick={() => dispatch(removeBill(bill.id))}
          >
            <i class="fa-solid fa-x"></i>
          </button>
        </a>
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
