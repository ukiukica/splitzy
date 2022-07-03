import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { viewBills, removeBill } from "../../store/bills";
// import EditBillFormModal from "../EditBillModal";
// import Comments from '../Comments';
import CreateCommentFormModal from "../CreateCommentModal";
import UserBills from "../UserBills";
// import { Modal } from "../../context/Modal";
import "./Bills.css";

function Bills() {
  const dispatch = useDispatch();

  const bills = useSelector((state) => {
    return Object.values(state.bills);
  });

  const sessionUser = useSelector((state) => state.session.user);
  const [billsWithUsers, setBillsWithUsers] = useState({})

  const userId = sessionUser.id

  useEffect(() => {
    dispatch(viewBills());
  }, [dispatch]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`/api/bills/get-bill-users`);
      const responseData = await response.json();
      setBillsWithUsers(responseData)
    }
    fetchData();
  }, []);

  return (
    <>
      <div className="bills-container">
        {(billsWithUsers[userId] !== undefined) ? bills?.map((bill) => (
          <ul className="bills-ul" key={bill.id}>
            <UserBills sessionUser={sessionUser} bill={bill} />
            <br />
          </ul>
        )) : <h1>You have no bills!</h1>}
      </div>
    </>
  );
}

export default Bills;
