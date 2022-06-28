import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditBillForm from './EditBillForm';

function EditBillFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Edit</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditBillForm setShowModal={setShowModal}/>
        </Modal>
      )}
    </>
  );
}

export default EditBillFormModal;
