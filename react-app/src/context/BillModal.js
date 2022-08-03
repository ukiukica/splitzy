import React, { useContext, useRef, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './BillModal.css';

const BillModalContext = React.createContext();
export const useModalContext = () => useContext(BillModalContext)

export function BillModalProvider({ children }) {
  const modalRef = useRef();
  const [value, setValue] = useState();

  useEffect(() => {
    setValue(modalRef.current);
  }, [])

  return (
    <>
      <BillModalContext.Provider value={value}>
        {children}
      </BillModalContext.Provider>
      <div ref={modalRef} />
    </>
  );
}

export function BillModal({ onClose, children }) {
  const modalNode = useContext(BillModalContext);
  if (!modalNode) return null;

  return ReactDOM.createPortal(
    <div id="bill-modal">
      <div id="bill-modal-background" onClick={onClose} />
      <div id="bill-modal-content" className='bill-modal-content'>
        {children}
      </div>
    </div>,
    modalNode
  );
}
