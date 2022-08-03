import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import CreateBillModal from "../CreateBillModal";
import UserBills from "../UserBills";
import SideBar from "../Sidebar";
import "./Bills.css";

function Bills() {
  const dispatch = useDispatch();

  const bills = useSelector((state) => {
    return Object.values(state.bills);
  });

  const sessionUser = useSelector((state) => state.session.user);

  const userId = sessionUser.id;

  return (
    <div id='main-div'>
      <SideBar />
      <div className='bills-page'>
        <div className="bills-heading">
          <h1 id="bills-h1">All Expenses</h1>
            <CreateBillModal />
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
