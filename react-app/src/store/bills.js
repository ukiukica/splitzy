const ADD_BILL = "bills/ADD_BILL";
const VIEW_BILLS = "bills/VIEW_BILLS";
const REMOVE_BILL = "bills/REMOVE_BILL";

const create = (newBill) => ({
  type: ADD_BILL,
  newBill,
});

const view = (bills) => ({
  type: VIEW_BILLS,
  bills,
});

const remove = (billId) => {
  return {
    type: REMOVE_BILL,
    billId,
  }
}

export const addBill = (payload) => async (dispatch) => {

  const response = await fetch("/api/bills/createbill", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const newBill = await response.json();

  if (newBill) {
    dispatch(create(newBill));
  }

  return newBill;
};

export const viewBills = () => async (dispatch) => {
  const response = await fetch("/api/bills");

  if (response.ok) {
    const bills = await response.json();
    console.log(bills)
    dispatch(view(bills));
  }
};

export const updateBill = (payload, id) => async (dispatch) => {
  const response = await fetch(`/api/bills/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  })


  if (response.ok) {
    const editedBill = await response.json();
    dispatch(create(editedBill));
    return editedBill;
  }

}

export const removeBill = (id) => async (dispatch) => {
  const response = await fetch(`/api/bills/${id}`, {
    method: "DELETE",
  })

  if (response.ok) {
    dispatch(remove(id));
  }

  return response;
};

const billsReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_BILL:
      const addState = { ...state, [action.newBill.id]: action.newBill };
      return addState;
    case VIEW_BILLS:
      const normalizedBills = {};
      action.bills.bills.forEach((bill) => {
        normalizedBills[bill.id] = bill;
      });
      return { ...normalizedBills };
    case REMOVE_BILL:
      const deleteState = { ...state }
      // delete deleteState[action.id]
      return deleteState;
    default:
      return state;
  }
};

export default billsReducer;
