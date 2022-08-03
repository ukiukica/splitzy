import React, { useContext, useRef, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './SignUpFormModal.css';

const SignUpFormModalContext = React.createContext();
export const useModalContext = () => useContext(SignUpFormModalContext)

export function SignUpFormModalProvider({ children }) {
  const modalRef = useRef();
  const [value, setValue] = useState();

  useEffect(() => {
    setValue(modalRef.current);
  }, [])

  return (
    <>
      <SignUpFormModalContext.Provider value={value}>
        {children}
      </SignUpFormModalContext.Provider>
      <div ref={modalRef} />
    </>
  );
}

export function SignUpFormModal({ onClose, children }) {
  const modalNode = useContext(SignUpFormModalContext);
  if (!modalNode) return null;

  return ReactDOM.createPortal(
    <div id="signup-modal">
      <div id="signup-modal-background" onClick={onClose} />
      <div id="signup-modal-content" className='signup-modal-content'>
        {children}
      </div>
    </div>,
    modalNode
  );
}
