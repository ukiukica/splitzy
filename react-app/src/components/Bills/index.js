import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { viewBills, removeBill } from "../../store/bills";
import EditBillFormModal from "../EditBillModal";
import Comments from '../Comments';
import CreateComment from '../CreateComment';
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
          <li>{bill.settled}</li>
          <a href="/bills">
            <button onClick={() => dispatch(removeBill(bill.id))}>
              Delete
            </button>
          </a>
          <EditBillFormModal billId={bill.id}/>
          <Comments billId={bill.id}/>
          <button onClick={() => setShowModal(true)}>Add a Comment</button>
          {showModal && (
            <Modal onClose={() => setShowModal(false)}>
              <CreateComment billId={bill.id}/>
            </Modal>
          )}
          <br />
        </ul>
      ))}
    </div>
  );
}

export default Bills;
