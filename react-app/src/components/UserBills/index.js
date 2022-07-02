import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import EditBillFormModal from "../EditBillModal";
import Comments from "../Comments";
import CreateCommentFormModal from "../CreateCommentModal";
import { removeBill } from "../../store/bills";
import "./UserBills.css";

function UserBills({ sessionUser, bill }) {
  const dispatch = useDispatch();

  const [userBills, setUserBills] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`/api/bills/user-bills/${bill.id}`);
      const responseData = await response.json();
      setUserBills(Object.values(responseData));
    }
    fetchData();
  }, []);

  return (
    <>
      <div className="userbills-container">
        {userBills[0]?.map((userBill) => (
          <ul className="userbills-ul">
            {sessionUser.username == userBill ? (
              <div className="info-comments-div">
                <div className="userbills-info-div">
                  <li id="userbills-label">{bill.label}</li>
                  <li id="userbills-amount">${bill.amount}</li>
                  <li id="userbills-time">{bill.created_at}</li>
                  <li>
                    <br></br>
                    <>
                      <EditBillFormModal bill={bill} />
                      <a href="/bills">
                        <button
                          id="delete-bill-btn"
                          onClick={() => dispatch(removeBill(bill.id))}
                        >
                          Delete
                        </button>
                      </a>
                    </>
                      <br></br>

                    <div className="associated-users">Associated users:
                    {userBills[0]?.map((userBill) => (
                      <div className="userbills-users-div">
                        <ul className="userbills-users">
                          <li>{userBill}</li>
                        </ul>
                      </div>
                    ))}
                    </div>
                  </li>
                </div>

                <div className="comments-div">
                  <div>
                    <p id="notes-comments-heading">NOTES & COMMENTS:</p>
                    <Comments billId={bill.id} />
                  </div>
                  <div>
                  <CreateCommentFormModal billId={bill.id} />
                  </div>
                </div>
              </div>
            ) : null}
          </ul>
        ))}
      </div>
    </>
  );
}

export default UserBills;
