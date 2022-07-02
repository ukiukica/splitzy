import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import { addBill } from '../../store/bills.js'
import { ValidationError } from "../../utils/validationError";
import "./CreateBill.css"

function CreateBill() {
    const dispatch = useDispatch()
    const history = useHistory()

    const sessionUser = useSelector(state => state.session.user)

    const [label, setLabel] = useState('')
    const [amount, setAmount] = useState(0)
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

        // let createdBill = await dispatch(addBill(payload))
        let createdBill

        try {
            createdBill = await dispatch(addBill(payload))
        } catch (error) {
            if (error instanceof ValidationError) setErrors(errors.error)
            else setErrors(error.toString().slice(7))
        }

        if (createdBill) {
            setErrors([])
            return history.push('/add-bill-friends')
        }
    }

    return (
        <div className='page-body'>
            <form onSubmit={handleSubmit}>
                <ul>
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>
                <h1>Add a BILL</h1>
                <div>
                    <label>Label
                        <input
                            name="label"
                            className='label-input'
                            type='text'
                            value={label}
                            onChange={(e) => setLabel(e.target.value)}
                            placeholder={"Insert label here..."}
                            required
                            />
                    </label>
                    <label>Amount
                        <input
                            name="amount"
                            className='amount-input'
                            type='number'
                            min="0.01"
                            max="999999.99"
                            step="0.01"
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
            <button>Cancel</button>
        </div>
    )

}

export default CreateBill;
