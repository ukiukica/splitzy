const ADD_BILL = "bills/ADD_BILL";
const VIEW_BILLS = "bills/VIEW_BILLS";

const create = (newBill) => ({
  type: ADD_BILL,
  newBill,
});

const view = (bills) => ({
  type: VIEW_BILLS,
  bills,
});

export const addBill = (payload) => async (dispatch) => {
  console.log("INSIDE THE THUNK");

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

const billsReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_BILL:
      const addState = { ...state, [action.newBill.id]: action.newBill };
      return addState;
    case VIEW_BILLS:
      const normalizedBills = {};
      action.bills.forEach((bill) => {
        normalizedBills[bill.id] = bill;
      });
      return { ...normalizedBills };
    default:
      return state;
  }
};

export default billsReducer;
