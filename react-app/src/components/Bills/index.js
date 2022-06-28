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

    return bills.map((bill) =>(
        <div key={bill.id}>
            <div>{bill.label}</div>
            <div>{bill.amount}</div>
            <div>{bill.settled}</div>
            <br />
        </div>

    ))

}

export default Bills;
