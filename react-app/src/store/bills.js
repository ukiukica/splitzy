const ADD_BILL = 'bills/ADD_BILL'

const create = (newBill) => ({
    type: ADD_BILL,
    newBill,
})

export const addBill = (payload) => async(dispatch) => {
    console.log("INSIDE THE THUNK")

    const response = await fetch('/api/bills/createbill', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    })

    const newBill = await response.json()

    // console.log("RESPONSE ->", response)
    // console.log("NEWBILL ->", newBill)

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
            return state;
    }
}

export default billsReducer;
