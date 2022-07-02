import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import CreateCommentForm from './CreateCommentForm';
import "./CreateCommentButton.css"

function CreateCommentFormModal({billId}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button id="add-comment-btn" onClick={() => setShowModal(true)}>Add a comment</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <CreateCommentForm setShowModal={setShowModal} billId={billId}/>
        </Modal>
      )}
    </>
  );
}

export default CreateCommentFormModal;
