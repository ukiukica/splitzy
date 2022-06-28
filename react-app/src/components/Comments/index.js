import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { viewComments } from '../../store/comments'
import EditComment from '../EditComment'
import DeleteComment from '../DeleteComment'

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
                <div key={comment.id}>
                    <p>{comment.content}</p>
                    {/* if sessionUser.id == comment.user_id: */}
                    <EditComment comment={comment} />
                    <DeleteComment comment={comment} />
                </div>
            ))}
        </div>
    )

}

export default Comments
