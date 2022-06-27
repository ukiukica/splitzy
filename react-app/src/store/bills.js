import { ValidationError } from "../utils/validationError"

const ADD_BILL = 'bills/ADD_BILL'

const create = (newBill) => ({
    type: ADD_BILL,
    newBill,
})

export const addBill = (payload) => async(dispatch) => {
    const response = await fetch('/api/bills', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    })

    const newBill = await response.json()

    if (newBill) {
        dispatch(create(newBill))
    }

    return newBill
}

const billsReducer = (state = {}, action) => {
    switch (action.type) {
        case ADD_BILL:
            const addState = { ...state, [action.newBill.id]: action.newBill }
            return addState;
        default:
            return state
    }
}

export default billsReducer;
