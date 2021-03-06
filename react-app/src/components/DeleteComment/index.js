import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { removeComment } from '../../store/comments'
import "./DeleteCommentButton.css"

function DeleteComment({ comment }) {
    const dispatch = useDispatch()
    const history = useHistory()

    const handleDelete = async (e) => {
        e.preventDefault()

        let commentDeleted = await dispatch(removeComment(comment.id))
        if (commentDeleted) {
            return history.push('/bills')
        }
    }

    return (
        <button id="delete-comment-btn" onClick={handleDelete}>×</button>
    )
}

export default DeleteComment
