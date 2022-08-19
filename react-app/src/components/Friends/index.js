import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import UserOverview from '../UserOverview'

function FriendsModal({friend}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="friend-a-tag friend-li" onClick={() => setShowModal(true)}><i class="fa-solid fa-user"></i>&nbsp;&nbsp;{friend}</div>
      {console.log("FRIEND", friend)}
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <UserOverview setShowModal={setShowModal} friend={friend}/>
        </Modal>
      )}
    </>
  );
}

export default FriendsModal;
