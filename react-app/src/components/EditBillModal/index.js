import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditBillForm from './EditBillForm';

function EditBillFormModal({bill}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Edit</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditBillForm setShowModal={setShowModal} bill={bill}/>
        </Modal>
      )}
    </>
  );
}

export default EditBillFormModal;
