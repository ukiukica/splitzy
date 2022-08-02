import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { viewComments } from '../../store/comments'
import { Modal } from '../../context/Modal';
import EditComment from '../EditComment'
import DeleteComment from '../DeleteComment'
import GetUser from '../GetUser';
import './Comments.css'
import SingleComment from '../SingleComment';

function Comments({ billId }) {
    const dispatch = useDispatch()

    const users = useSelector((state) => state.users)
    const sessionUser = useSelector(state => state.session.user)

    const comments = useSelector((state) => {
        return Object.values(state.comments)
    })

    const billComments = comments.filter((comment) => {
        return comment.bill_id == billId
    })

    // const [showEdit, setShowEdit] = useState(false);


    // const onEdit = (e) => {
    //     e.preventDefault()
    //     showEdit ? setShowEdit(false) : setShowEdit(true)
    // }

    return (
        <div className='comments-container'>
            {billComments?.map((comment) => (
                <SingleComment comment={comment} billId={billId} key={comment.id} />
                // <div className='each-comment-div' key={comment.id}>
                //     <div className="username-and-comment">
                //         <p id="comment-username">{users[comment.user_id].username}</p>
                //         <p id="all-comments">{comment.content}</p>
                //     </div>
                //     {sessionUser.id == comment.user_id && (
                //         <>
                //             <button onClick={(e) => onEdit(e)}>{showEdit ? "Cancel" : "Edit"}</button>
                //             <DeleteComment comment={comment} />
                //         </>
                //     )}
                //     {showEdit && (
                //         <>
                //         <EditComment comment={comment} billId={billId}/>
                //         </>
                //     )}

                // </div>
            ))}
        </div >
    )

}

export default Comments
