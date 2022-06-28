import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditBillForm from './EditBillForm';

function EditBillFormModal({billId}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Edit</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditBillForm setShowModal={setShowModal} billId={billId}/>
        </Modal>
      )}
    </>
  );
}

export default EditBillFormModal;
