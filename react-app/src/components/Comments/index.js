import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { viewComments } from '../../store/comments'
import { Modal } from '../../context/Modal';
import EditComment from '../EditComment'
import DeleteComment from '../DeleteComment'
import GetUser from '../GetUser';
import './Comments.css'
import SingleComment from '../SingleComment';
import CreateCommentForm from '../CreateCommentModal/CreateCommentForm';

function Comments({ billId, formatDate }) {
    const dispatch = useDispatch()

    const users = useSelector((state) => state.users)
    const sessionUser = useSelector(state => state.session.user)

    const comments = useSelector((state) => {
        return Object.values(state.comments)
    })

    const billComments = comments.filter((comment) => {
        return comment.bill_id == billId
    })

    return (
        <div className='comments-container'>
            <div className='comments-heading'>
            <i className="fa-solid fa-comment"></i>
            <p>NOTES AND COMMENTS</p>
            </div>
            {billComments?.map((comment) => (
                <SingleComment comment={comment} billId={billId} formatDate={formatDate} key={comment.id} />
            ))}
            <CreateCommentForm billId={billId} />
        </div >
    )

}

export default Comments
