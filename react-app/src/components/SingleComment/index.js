import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { viewComments } from '../../store/comments'
import { Modal } from '../../context/Modal';
import EditComment from '../EditComment'
import DeleteComment from '../DeleteComment'
import GetUser from '../GetUser';
// import './Comments.css'

function SingleComment ({comment, billId}) {
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
        <div>
                    <div>
                        <p>{users[comment.user_id].username}</p>
                        <p>{comment.content}</p>
                    </div>
                    {sessionUser.id == comment.user_id && (
                        <>
                            <button onClick={(e) => onEdit(e)}>{showEdit ? "Cancel" : "Edit"}</button>

                        </>
                    )}
                    {showEdit && (
                        <>
                        <EditComment comment={comment} billId={billId} setShowEdit={setShowEdit}/>
                        </>
                    )}

                </div>
        </>
    )
}

export default SingleComment;
