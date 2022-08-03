import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import EditBillFormModal from "../EditBillModal";
import Comments from "../Comments";
import CreateCommentFormModal from "../CreateCommentModal";
import { removeBill, viewBills } from "../../store/bills";
import CreateCommentForm from "../CreateCommentModal/CreateCommentForm";
import "./UserBills.css";

function UserBills({ sessionUser, bill }) {
  const dispatch = useDispatch();

  const [userBills, setUserBills] = useState([]);
  const [showDetails, setShowDetails] = useState(false)


  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  const onDelete = async (e) => {
    e.preventDefault()
    await dispatch(removeBill(bill.id))
    await dispatch(viewBills())

  }


  return (
    <>
      <div
        className='single-bill-base'
        onClick={(e) => {
          e.preventDefault()
          showDetails ? setShowDetails(false) : setShowDetails(true)
        }}
      >
        <div className='base-left'>
          <p id="date-p">{formatDate(bill.created_at)}</p>
          <i id='receipt-icon' className="fa-solid fa-receipt fa-3x"></i>
          <p id="label-p">{bill.label}</p>
        </div>
        <div id="amount-div">
          <p id='amount-p'>${bill.amount.toFixed(2)}</p>
        </div>
      </div>
      {showDetails && (
        <div className="single-bill-extended">
          <div className='extended-top'>
            <i id='receipt-icon' className="fa-solid fa-receipt fa-6x"></i>
            <div className='extended-info'>
              <p id="label-p-extended">{bill.label}</p>
              <p id="amount-p-extended">${bill.amount.toFixed(2)}</p>
              <p className="dates-p">Added on {formatDate(bill.created_at)}</p>
              <p className="dates-p">Last updated on {formatDate(bill.updated_at)}</p>
              <EditBillFormModal bill={bill} />
            </div>
          </div>
          <div className="extended-bottom">
            <div className="extended-bottom-left">
              <div className="split-heading">
                <i className="fa-solid fa-arrows-split-up-and-left"></i>
                <p>SPLIT BETWEEN</p>
              </div>
              {bill.assigned_users.map(assigned_user => (
                <div className="bill-user-list">
                  <img src={`https://ui-avatars.com/api/?name=${assigned_user}&rounded=true&background=random&uppercase=false&size=40`} alt='profile' />
                  <p>{assigned_user}</p>
                </div>
              ))}
            </div>
            <div className="extended-bottom-right">
              <Comments billId={bill.id} formatDate={formatDate} />
            </div>
          </div>
        </div>
      )}

      <>


        {/* <button
          id="delete-bill-btn"
          onClick={(e) => onDelete(e)}
        >
        <i class="fa-solid fa-x"></i>
        </button> */}

      </>
    </>
  );
}

export default UserBills;
