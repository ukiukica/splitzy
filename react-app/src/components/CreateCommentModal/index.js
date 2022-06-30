import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import CreateCommentForm from './CreateCommentForm';

function CreateCommentFormModal({billId}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Add a Comment</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <CreateCommentForm setShowModal={setShowModal} billId={billId}/>
        </Modal>
      )}
    </>
  );
}

export default CreateCommentFormModal;
