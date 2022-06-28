import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { removeComment } from '../../store/comments'

function DeleteComment({ comment }) {
    const dispatch = useDispatch()
    const history = useHistory()

    const handleDelete = async (e) => {
        e.preventDefault()

        let commentDeleted = await dispatch(removeComment(comment.id))
        console.log('COMMENT DELETED -->', commentDeleted)
        if (commentDeleted) {
            return history.push('/comments')
        }
    }

    return (
        <button onClick={handleDelete}>Delete</button>
    )
}

export default DeleteComment
