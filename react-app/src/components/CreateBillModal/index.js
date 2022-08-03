import React, { useState } from 'react';
import { BillModal } from '../../context/BillModal';
import CreateBillForm from './CreateBillForm';
import "./CreateBillForm.css"
import "./CreateBillModal.css"

function CreateBillModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button id="add-an-expense-btn" onClick={() => setShowModal(true)}>Add an expense</button>
      {showModal && (
        <BillModal onClose={() => setShowModal(false)}>
          <CreateBillForm setShowModal={setShowModal} />
        </BillModal>
      )}
    </>
  );
}

export default CreateBillModal;
