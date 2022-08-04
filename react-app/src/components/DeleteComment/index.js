import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { removeComment, viewComments } from '../../store/comments'
import "./DeleteCommentButton.css"

function DeleteComment({ comment }) {
    const dispatch = useDispatch()
    const history = useHistory()

    const handleDelete = async (e) => {
        e.preventDefault()

        let commentDeleted = await dispatch(removeComment(comment.id))
        if (commentDeleted) {
            await dispatch(viewComments())
        }
    }

    return (
        <button id="delete-cmt-btn" onClick={handleDelete}>Delete</button>
    )
}

export default DeleteComment
