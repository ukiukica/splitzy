import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { viewComments } from '../../store/comments'

function Comments() {
    const dispatch = useDispatch()

    const comments = useSelector((state) => {
        return Object.values(state.comments)
    })

    useEffect(() => {
        dispatch(viewComments())
    }, [dispatch])

    return (
        <div>
            {comments.map((comment) =>(
                <ul key={comment.id}>
                    <li>{comment.content}</li>
                </ul>
            ))}

        </div>
    )

}

export default Comments
