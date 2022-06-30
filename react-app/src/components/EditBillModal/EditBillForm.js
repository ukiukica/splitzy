import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from 'react-router-dom';
import { addBill, updateBill } from '../../store/bills.js'
import { ValidationError } from "../../utils/validationError";

function EditBillForm({setShowModal, bill}) {
    const dispatch = useDispatch()
    const history = useHistory()

    const sessionUser = useSelector(state => state.session.user)

    const id = bill.id

    const [label, setLabel] = useState(bill.label)
    const [amount, setAmount] = useState(bill.amount)
    const [errors, setErrors] = useState([])


    useEffect(() => {
        const errors = []

        if (label.length > 100) {
            errors.push('Label must be less than 100 characters')
        } else if (label.length <= 0) {
            errors.push('Please provide a label')
        }

        if (amount <= 0) {
            errors.push('Must enter an amount greater than 0')
        }

        setErrors(errors)

    }, [label, amount])

    const handleSubmit = async (e) => {
        e.preventDefault()

        const payload = {
            user_id: sessionUser.id,
            label,
            amount,
        }

        // let updatedBill = await dispatch(updateBill(payload, id));
        let updatedBill

        try {
            updatedBill = await dispatch(updateBill(payload, id))
        } catch (error) {
            if (error instanceof ValidationError) setErrors(errors.error)
            else setErrors(error.toString().slice(7))
        }

        if (updatedBill) {
            setErrors([])
            setShowModal(false);
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <ul>
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>
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
                </div>
                <div>
                    <button type='submit' disabled={errors.length > 0}>Submit</button>
                </div>
            </form>
            <button onClick={() => setShowModal(false)}>Cancel</button>
        </div>
    )

}

export default EditBillForm;
