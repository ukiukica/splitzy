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

  const [showModal, setShowModal] = useState(false);

  const sessionUser = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(viewBills());
  }, [dispatch]);

  return (
    <>
      <div className="bills-container">
        {bills.map((bill) => (
          <div className="bills-ul" key={bill.id}>
            <UserBills sessionUser={sessionUser} bill={bill} />
            <br />
          </div>
        ))}
      </div>
    </>
  );
}

export default Bills;
