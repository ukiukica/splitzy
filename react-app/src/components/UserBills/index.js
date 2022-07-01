import React, { useState, useEffect } from 'react'
import { useDispatch } from "react-redux";
import EditBillFormModal from "../EditBillModal";
import Comments from '../Comments';
import CreateCommentFormModal from '../CreateCommentModal';
import { removeBill } from "../../store/bills";

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

    console.log(userBills)

    return (
        <div>
            {userBills[0]?.map((userBill) => (
                <ul>
                    {(sessionUser.username == userBill) ? (
                        <>
                            <li>{bill.label}</li>
                            <li>{bill.amount}</li>
                            <li>{bill.created_at}</li>
                            <li>
                                {userBills[0]?.map((userBill) => (
                                    <ul>
                                        <li>{userBill}</li>
                                    </ul>
                                ))}
                            </li>
                            <>
                                <a href="/bills">
                                    <button onClick={() => dispatch(removeBill(bill.id))}>
                                        Delete
                                    </button>
                                </a>
                                <EditBillFormModal bill={bill} />
                            </>
                            <Comments billId={bill.id} />
                            <CreateCommentFormModal billId={bill.id} />
                        </>
                    ) : null}
                </ul>
            ))}
        </div>
    )
}

export default UserBills
