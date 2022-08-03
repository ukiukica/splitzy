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
    const options = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  const onDelete = async (e) => {
    e.preventDefault()
    await dispatch(removeBill(bill.id))
    await dispatch(viewBills())

  }


  return (
    <>
      <div onClick={(e) =>{
        e.preventDefault()
        showDetails ? setShowDetails(false) : setShowDetails(true)}}
        >
        <p>{formatDate(bill.created_at)}</p>
        <i className="fa-solid fa-receipt"></i>
        <p>{bill.label}</p>
        <p>${bill.amount}</p>
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
          
          {/* <CreateCommentFormModal billId={bill.id} /> */}
          </div>
        </div>
      )}

      <>
        <EditBillFormModal bill={bill} />

        <button
          id="delete-bill-btn"
          onClick={(e) => onDelete(e)}
        >
        <i class="fa-solid fa-x"></i>
        </button>

      </>
      {/* <div className="comments-div" id="comments-div">
                <div>
                  <p id="notes-comments-heading">NOTES & COMMENTS:</p>
                  <Comments billId={bill.id} />
                </div>
                <div>
                  <CreateCommentFormModal billId={bill.id} />
                </div>
              </div> */}
    </>
  );
}

export default UserBills;
