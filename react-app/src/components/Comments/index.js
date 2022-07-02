import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { viewComments } from '../../store/comments'
import { Modal } from '../../context/Modal';
import EditComment from '../EditComment'
import DeleteComment from '../DeleteComment'
import GetUser from '../GetUser';
import './Comments.css'

function Comments({ billId }) {
    const dispatch = useDispatch()

    const comments = useSelector((state) => {
        return Object.values(state.comments)
    })

    const billComments = comments.filter((comment) => {
        return comment.bill_id == billId
    })

    const [showModal, setShowModal] = useState(false);

    const sessionUser = useSelector(state => state.session.user)

    useEffect(() => {
        dispatch(viewComments())
    }, [dispatch])

    return (
        <div className='comments-container'>
            {(billComments) ? billComments.map((comment) =>(
                <div className='each-comment-div' key={comment.id}>
                    <div className="username-and-comment">
                    <GetUser userId={comment.user_id} />
                    <p id="all-comments">{comment.content}</p>
                    </div>
                    <div >
                    {(sessionUser.id == comment.user_id) ? (
                        <div className='edit-delete-comment-btns'>
                            <button id="edit-comment-btn" onClick={() => setShowModal(true)}>Edit</button>
                            {showModal && (
                                <Modal onClose={() => setShowModal(false)}>
                                    <EditComment setShowModal={setShowModal} comment={comment} billId={billId} />
                                </Modal>
                            )}
                            <DeleteComment comment={comment} />
                        </div>
                    ) : null }
                    </div>
                </div>
            )) : null }
        </div>
    )

}

export default Comments
