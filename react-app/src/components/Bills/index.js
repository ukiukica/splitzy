import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { viewBills, removeBill } from "../../store/bills";
import EditBillFormModal from "../EditBillModal";

function Bills() {
  const dispatch = useDispatch();

  const bills = useSelector((state) => {
    return Object.values(state.bills);
  });

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
          <br />
        </ul>
      ))}
    </div>
  );
}

export default Bills;
