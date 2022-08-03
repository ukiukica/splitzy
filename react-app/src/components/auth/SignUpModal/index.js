import React, { useState } from 'react';
import { SignUpFormModal } from '../../../context/SignUpFormModal';
import SignUpForm from './SignUpForm';
import "./SignUpForm.css"

function SignUpModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <p id="sign-up-modal-link" onClick={() => setShowModal(true)}>Sign up</p>
      {showModal && (
        <SignUpFormModal onClose={() => setShowModal(false)}>
          <SignUpForm setShowModal={setShowModal} />
        </SignUpFormModal>
      )}
    </>
  );
}

export default SignUpModal;
