import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { viewBills, removeBill } from "../../store/bills";
import { NavLink } from "react-router-dom";
// import EditBillFormModal from "../EditBillModal";
// import Comments from '../Comments';
import CreateCommentFormModal from "../CreateCommentModal";
import UserBills from "../UserBills";
import Friends from "../Friends/Friends";
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
      <div className='bills-page'>
        <div className="bills-heading">
          <h1 id="bills-h1">All Expenses</h1>
          <button id='add-bill-btn'>
            <NavLink to="/bills/createbill" exact={true} style={{color:'inherit',textDecoration:'inherit'}}>
              Add an expense
            </NavLink>
          </button>
        </div>
        <div>
          {bills?.map((bill) => (
            <div key={bill.id}>
              <UserBills sessionUser={sessionUser} bill={bill} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Bills;
