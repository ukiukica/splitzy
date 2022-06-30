import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { viewBills, removeBill } from "../../store/bills";
import EditBillFormModal from "../EditBillModal";
import Comments from '../Comments';
import CreateCommentFormModal from '../CreateCommentModal';
import { Modal } from "../../context/Modal";

function Bills() {
  const dispatch = useDispatch();

  const bills = useSelector((state) => {
    return Object.values(state.bills);
  });

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    dispatch(viewBills());
  }, [dispatch]);

  return (
    <div>
      {bills.map((bill) => (
        <ul key={bill.id}>
          <li>{bill.label}</li>
          <li>{bill.amount}</li>
          <a href="/bills">
            <button onClick={() => dispatch(removeBill(bill.id))}>
              Delete
            </button>
          </a>
          <EditBillFormModal bill={bill}/>
          <Comments billId={bill.id}/>
          <CreateCommentFormModal billId={bill.id} />
          <br />
        </ul>
      ))}
    </div>
  );
}

export default Bills;
