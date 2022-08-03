import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { viewComments } from '../../store/comments'
import { Modal } from '../../context/Modal';
import EditComment from '../EditComment'
import DeleteComment from '../DeleteComment'
import GetUser from '../GetUser';
// import './Comments.css'

function SingleComment({ comment, billId, formatDate }) {
    const dispatch = useDispatch()

    const users = useSelector((state) => state.users)
    const sessionUser = useSelector(state => state.session.user)

    const [showEdit, setShowEdit] = useState(false);


    const onEdit = (e) => {
        e.preventDefault()
        showEdit ? setShowEdit(false) : setShowEdit(true)
    }

    return (
        <>
            <div className='comment'>
                <div className='comment-top'>
                    <div>
                        <div className='comment-heading'>
                            <p id="comm-username-p">{users[comment.user_id].username}</p>
                            <p id="comm-date-p">{formatDate(comment.updated_at)}</p>
                        </div>
                    </div>
                    {sessionUser.id == comment.user_id && (
                        <>
                            <button onClick={(e) => onEdit(e)}>{showEdit ? "Cancel" : "Edit"}</button>

                        </>
                    )}
                </div>
                {showEdit ?
                            <div className='comment-bottom'>
                                <EditComment comment={comment} billId={billId} setShowEdit={setShowEdit} />
                            </div>
                            :
                            <p id="comm-content-p">{comment.content}</p>
                        }


            </div>
        </>
    )
}

export default SingleComment;
