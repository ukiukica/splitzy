import React, { useState } from 'react';
import { BillModal } from '../../context/BillModal';
import EditBillForm from './EditBillForm';
import "./EditBillForm.css"

function EditBillFormModal({bill}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button id="edit-bill-btn" onClick={() => setShowModal(true)}>Edit expense</button>
      {showModal && (
        <BillModal onClose={() => setShowModal(false)}>
          <EditBillForm setShowModal={setShowModal} bill={bill}/>
        </BillModal>
      )}
    </>
  );
}

export default EditBillFormModal;
