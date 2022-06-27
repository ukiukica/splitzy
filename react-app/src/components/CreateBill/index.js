import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import addBill from '../../store/bills.js'
import { ValidationError } from "../../utils/validationError";

function CreateBill() {
    const dispatch = useDispatch()
    const history = useHistory()

    const sessionUser = useSelector(state => state.session.user)

    const [label, setLabel] = useState('')
    const [amount, setAmount] = useState(0)
    const [settled, setSettled] = useState(false)
    const [errors, setErrors] = useState([])

    useEffect(() => {
        const errors = []

        if (label.length > 100) {
            errors.push('Label must be less than 100 characters')
        }
        if (amount <= 0) {
            errors.push('Must enter an amount greater than 0')
        }
        setErrors(errors)
    }, [label, amount])

    const handleSubmit = async (e) => {
        e.preventDefault()

        const user_id = sessionUser.id

        const payload = {
            user_id,
            label,
            amount,
            settled
        }

        let createdBill
        try {
            createdBill = await dispatch(addBill(payload))
        } catch (error) {
            if (error instanceof ValidationError) setErrors(errors.error)
            else setErrors(error.toString().slice(7))
        }

        if (createdBill) {
            setErrors([])
            return history.push('/bills')
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className='add-campus-form'>
                {/* <ul>
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul> */}
                <h1>Add a BILL</h1>
                <div>
                    <label>Label
                        <input
                            className='label-input'
                            type='text'
                            value={label}
                            onChange={(e) => setLabel(e.target.value)}
                            required
                        />
                    </label>
                    <label>Amount
                        <input
                            className='amount-input'
                            type='float'
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            required
                        />
                    </label>
                    <label>Settled
                        <input
                            className='settled-input'
                            type='checkbox'
                            value={settled}
                            onChange={(e) => setSettled(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <div>
                    <button type='submit'>Submit</button>
                </div>
            </form>
            <button>Cancel</button>
        </div>
    )

}

export default CreateBill;
