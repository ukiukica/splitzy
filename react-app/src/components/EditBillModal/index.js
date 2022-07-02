import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditBillForm from './EditBillForm';
import "./EditBillForm.css"

function EditBillFormModal({bill}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button id="edit-bill-btn" onClick={() => setShowModal(true)}>Edit bill</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditBillForm setShowModal={setShowModal} bill={bill}/>
        </Modal>
      )}
    </>
  );
}

export default EditBillFormModal;
