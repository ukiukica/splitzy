import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { viewBills, removeBill } from "../../store/bills";
// import EditBillFormModal from "../EditBillModal";
// import Comments from '../Comments';
import CreateCommentFormModal from "../CreateCommentModal";
import UserBills from "../UserBills";
import Friends from "../Friends";
import SideBar from "../Sidebar";
// import { Modal } from "../../context/Modal";
import "./Bills.css";

function Bills() {
  const dispatch = useDispatch();

  const bills = useSelector((state) => {
    return Object.values(state.bills);
  });

  const sessionUser = useSelector((state) => state.session.user);
  const [billsWithUsers, setBillsWithUsers] = useState({});

  const userId = sessionUser.id;

  return (
    <div id='main-div'>
      <SideBar />
      <div className="bills-container">
        <h1 id="bills-heading">Your Bills</h1>
        {/* <div id="bills-side-bar">
          <Friends />
        </div> */}
        {bills?.map((bill) => (
          <ul className="bills-ul" key={bill.id}>
            <UserBills sessionUser={sessionUser} bill={bill} />
            <br />
          </ul>
        ))}
      </div>
    </div>
  );
}

export default Bills;
