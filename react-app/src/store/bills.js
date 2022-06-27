import { ValidationError } from "../utils/validationError"

const ADD_BILL = 'bills/ADD_BILL'

const create = (newBill) => ({
    type: ADD_Bill,
    newBill,
})

export const addBill = (payload) => async(dispatch) => {
    const response = await fetch('/api/bills')
}
