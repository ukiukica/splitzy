import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { viewBills } from '../../store/bills';

function Bills() {
    const dispatch = useDispatch();

    const bills = useSelector((state) => {
        return Object.values(state.bills);
    });

    useEffect(() => {
        dispatch(viewBills())
    }, [dispatch])

    return (
        <div>
            {bills.map((bill) =>(
                <ul key={bill.id}>
                    <li>{bill.label}</li>
                    <li>{bill.amount}</li>
                    <li>{bill.settled}</li>
                    <br />
                </ul>
            ))}
        </div>

    )


}

export default Bills;
