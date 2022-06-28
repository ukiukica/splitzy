import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

function DeleteComment({ comment }) {
    const dispatch = useDispatch()
    const history = useHistory()

    const handleDelete = async (e) => {
        e.preventDefault()

        let commentDeleted = await dispatch(deleteComment(comment.id))

        if (commentDeleted) {
            return history.push('/comments')
        }
    }


    return (
        <button onClick={handleDelete}>Delete</button>
    )
}

export default DeleteComment
