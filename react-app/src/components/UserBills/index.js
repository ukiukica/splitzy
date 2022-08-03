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
      onClick={(e) =>{
        e.preventDefault()
        showDetails ? setShowDetails(false) : setShowDetails(true)}}
        >
          <div className='base-left'>
        <p id="date-p">{formatDate(bill.created_at)}</p>
        <i id='receipt-icon' className="fa-solid fa-receipt fa-3x "></i>
        <p>{bill.label}</p>
        </div>
        <div id="amount-div">
        <p id='amount-p'>${bill.amount.toFixed(2)}</p>
        </div>
      </div>
      {showDetails && (
        <div>
          <div>
            <i className="fa-solid fa-receipt"></i>
            <p>{bill.label}</p>
            <p>${bill.amount}</p>
            <p>Added on {formatDate(bill.created_at)}</p>
            <p>Last updated on {formatDate(bill.updated_at)}</p>
          </div>
          <EditBillFormModal bill={bill} />
          <div>
            <p>Split between:</p>
            {bill.assigned_users.map(assigned_user => (
              <>
              <img src={`https://ui-avatars.com/api/?name=${assigned_user}&rounded=true&background=random&uppercase=false`} alt='profile'/>
              <p>{assigned_user}</p>
              </>
            ))}
          </div>
          <div>
          <Comments billId={bill.id} />
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
