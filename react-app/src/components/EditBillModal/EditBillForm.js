import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from 'react-router-dom';
import { addBill, updateBill } from '../../store/bills.js'
import { ValidationError } from "../../utils/validationError";

function EditBillForm({setShowModal, billId}) {
    // const { id } = useParams()
    const dispatch = useDispatch()
    const history = useHistory()

    const sessionUser = useSelector(state => state.session.user)

    const bills = Object.values(useSelector((state) => state.bills))

    const selectBill = bills.filter((bill) => {
        return bill.id == +billId
    })[0]
    console.log("SELECT BILL------", selectBill)

    const id = selectBill.id

    const [label, setLabel] = useState(selectBill?.label)
    const [amount, setAmount] = useState(selectBill?.amount)
    const [settled, setSettled] = useState(false)
    // const [id, setId] = useState()
    const [errors, setErrors] = useState([])

    // console.log(id)


    // useEffect(() => {
    //     const errors = []

    //     if (label.length > 100) {
    //         errors.push('Label must be less than 100 characters')
    //     }
    //     if (amount <= 0) {
    //         errors.push('Must enter an amount greater than 0')
    //     }
    //     setErrors(errors)
    // }, [label, amount])

    const handleSubmit = async (e) => {
        e.preventDefault()

        const payload = {
            user_id: sessionUser.id,
            id,
            label,
            amount,
            settled
        }
        console.log(payload)

        let updatedBill = await dispatch(updateBill(payload));

        // try {
        //     createdBill = await dispatch(addBill(payload))
        // } catch (error) {
        //     if (error instanceof ValidationError) setErrors(errors.error)
        //     else setErrors(error.toString().slice(7))
        // }

        if (updatedBill) {
            setErrors([])
            setShowModal(false);
            // return history.push('/bills')
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                {/* <ul>
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul> */}
                <h1>Edit Bill</h1>
                <div>
                    <label>Label
                        <input
                            name="label"
                            className='label-input'
                            type='text'
                            value={label}
                            onChange={(e) => setLabel(e.target.value)}
                            required
                        />
                    </label>
                    <label>Amount
                        <input
                            name="amount"
                            className='amount-input'
                            type='float'
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            required
                        />
                    </label>
                    <label>Settled
                        <input
                            name="settled"
                            className='settled-input'
                            type='checkbox'
                            value={settled}
                            onChange={(e) => setSettled(e.target.value)}
                        />
                    </label>
                </div>
                <div>
                    <button type='submit'>Submit</button>
                </div>
            </form>
            <button onClick={() => setShowModal(false)}>Cancel</button>
        </div>
    )

}

export default EditBillForm;
